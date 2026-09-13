import { StudentProfileIntelligence } from "../models/studentProfileIntelligence.models.js";
import { User } from "../models/user.models.js";
import { getOrComputeStudentIntelligence } from "./profileIntelligenceService.js";

/**
 * Determine percentile and tier from rank and total count
 */
export function calculateTier(rank, total) {
  if (total <= 1) return { tier: "Top 1%", percentile: 99 };
  const ratio = rank / total;
  const pct = Math.max(1, Math.min(99, Math.round(((total - rank + 1) / total) * 100)));
  
  if (ratio <= 0.01 || rank === 1) return { tier: "Top 1%", percentile: pct };
  if (ratio <= 0.05) return { tier: "Top 5%", percentile: pct };
  if (ratio <= 0.10) return { tier: "Top 10%", percentile: pct };
  if (ratio <= 0.25) return { tier: "Top 25%", percentile: pct };
  if (ratio <= 0.50) return { tier: "Top 50%", percentile: pct };
  return { tier: "Above Average", percentile: pct };
}

/**
 * Calculate deterministic rank for a student across Overall & Categories
 */
export async function getStudentRank(studentId) {
  const currentDoc = await getOrComputeStudentIntelligence(studentId);
  if (!currentDoc) {
    throw new Error("Student intelligence record not found");
  }

  // Count total evaluated students in the system
  const totalStudents = await StudentProfileIntelligence.countDocuments();

  // Deterministic Overall Rank calculation:
  // rank = 1 + count of students with higher score OR (equal score AND higher confidence) OR (equal score & confidence AND earlier analyzedAt)
  const overallHigherCount = await StudentProfileIntelligence.countDocuments({
    $or: [
      { overallScore: { $gt: currentDoc.overallScore } },
      {
        overallScore: currentDoc.overallScore,
        confidence: { $gt: currentDoc.confidence },
      },
      {
        overallScore: currentDoc.overallScore,
        confidence: currentDoc.confidence,
        analyzedAt: { $lt: currentDoc.analyzedAt },
      },
      {
        overallScore: currentDoc.overallScore,
        confidence: currentDoc.confidence,
        analyzedAt: currentDoc.analyzedAt,
        _id: { $lt: currentDoc._id },
      },
    ],
  });

  const overallRank = overallHigherCount + 1;

  // Calculate category ranks deterministically
  const technicalHigher = await StudentProfileIntelligence.countDocuments({
    $or: [
      { "categoryScores.technical": { $gt: currentDoc.categoryScores.technical } },
      {
        "categoryScores.technical": currentDoc.categoryScores.technical,
        overallScore: { $gt: currentDoc.overallScore },
      },
      {
        "categoryScores.technical": currentDoc.categoryScores.technical,
        overallScore: currentDoc.overallScore,
        _id: { $lt: currentDoc._id },
      },
    ],
  });

  const careerReadinessHigher = await StudentProfileIntelligence.countDocuments({
    $or: [
      { "categoryScores.careerReadiness": { $gt: currentDoc.categoryScores.careerReadiness } },
      {
        "categoryScores.careerReadiness": currentDoc.categoryScores.careerReadiness,
        overallScore: { $gt: currentDoc.overallScore },
      },
      {
        "categoryScores.careerReadiness": currentDoc.categoryScores.careerReadiness,
        overallScore: currentDoc.overallScore,
        _id: { $lt: currentDoc._id },
      },
    ],
  });

  const projectsHigher = await StudentProfileIntelligence.countDocuments({
    $or: [
      { "categoryScores.projects": { $gt: currentDoc.categoryScores.projects } },
      {
        "categoryScores.projects": currentDoc.categoryScores.projects,
        overallScore: { $gt: currentDoc.overallScore },
      },
      {
        "categoryScores.projects": currentDoc.categoryScores.projects,
        overallScore: currentDoc.overallScore,
        _id: { $lt: currentDoc._id },
      },
    ],
  });

  const academicHigher = await StudentProfileIntelligence.countDocuments({
    $or: [
      { "categoryScores.academic": { $gt: currentDoc.categoryScores.academic } },
      {
        "categoryScores.academic": currentDoc.categoryScores.academic,
        overallScore: { $gt: currentDoc.overallScore },
      },
      {
        "categoryScores.academic": currentDoc.categoryScores.academic,
        overallScore: currentDoc.overallScore,
        _id: { $lt: currentDoc._id },
      },
    ],
  });

  const competitiveHigher = await StudentProfileIntelligence.countDocuments({
    $or: [
      { "categoryScores.competitive": { $gt: currentDoc.categoryScores.competitive } },
      {
        "categoryScores.competitive": currentDoc.categoryScores.competitive,
        overallScore: { $gt: currentDoc.overallScore },
      },
      {
        "categoryScores.competitive": currentDoc.categoryScores.competitive,
        overallScore: currentDoc.overallScore,
        _id: { $lt: currentDoc._id },
      },
    ],
  });

  const { tier, percentile } = calculateTier(overallRank, Math.max(1, totalStudents));

  // Update previousRank and rankChange on doc if changed
  if (currentDoc.previousRank === null) {
    currentDoc.previousRank = overallRank;
    await currentDoc.save();
  } else if (currentDoc.previousRank !== overallRank) {
    currentDoc.rankChange = currentDoc.previousRank - overallRank;
    currentDoc.previousRank = overallRank;
    await currentDoc.save();
  }

  return {
    overallRank,
    totalStudents: Math.max(1, totalStudents),
    tier,
    percentile,
    overallScore: currentDoc.overallScore,
    profileStrength: currentDoc.profileStrength,
    rankChange: currentDoc.rankChange || 0,
    categoryRanks: {
      technical: technicalHigher + 1,
      careerReadiness: careerReadinessHigher + 1,
      projects: projectsHigher + 1,
      academic: academicHigher + 1,
      competitive: competitiveHigher + 1,
    },
    categoryScores: currentDoc.categoryScores,
  };
}

/**
 * Retrieve paginated, deterministic leaderboard without calling LLM
 */
export async function getLeaderboard({
  category = "overall",
  page = 1,
  limit = 10,
  search = "",
  department = "",
  currentStudentId = null,
} = {}) {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  // Match filter
  const filter = {};

  if (search || department) {
    const userQuery = { role: "STUDENT" };
    if (search) {
      userQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNo: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (department && department !== "ALL") {
      userQuery.department = department;
    }

    const matchedUsers = await User.find(userQuery).select("_id").lean();
    const userIds = matchedUsers.map((u) => u._id);
    filter.student = { $in: userIds };
  }

  // Sort configuration per category
  let sortConfig = { overallScore: -1, confidence: -1, analyzedAt: -1, _id: 1 };
  if (category === "technical") {
    sortConfig = { "categoryScores.technical": -1, overallScore: -1, _id: 1 };
  } else if (category === "careerReadiness") {
    sortConfig = { "categoryScores.careerReadiness": -1, overallScore: -1, _id: 1 };
  } else if (category === "academic") {
    sortConfig = { "categoryScores.academic": -1, overallScore: -1, _id: 1 };
  } else if (category === "projects") {
    sortConfig = { "categoryScores.projects": -1, overallScore: -1, _id: 1 };
  } else if (category === "competitive") {
    sortConfig = { "categoryScores.competitive": -1, overallScore: -1, _id: 1 };
  } else if (category === "engagement") {
    sortConfig = { "categoryScores.engagement": -1, overallScore: -1, _id: 1 };
  }

  const [totalRecords, intelligenceDocs] = await Promise.all([
    StudentProfileIntelligence.countDocuments(filter),
    StudentProfileIntelligence.find(filter)
      .sort(sortConfig)
      .skip(skip)
      .limit(limitNum)
      .populate("student", "name email avatar department rollNo semester cgpa")
      .lean(),
  ]);

  // Compute current user rank if logged in
  let currentUserRankInfo = null;
  if (currentStudentId) {
    try {
      currentUserRankInfo = await getStudentRank(currentStudentId);
    } catch {
      currentUserRankInfo = null;
    }
  }

  // Assign deterministic ranks
  const entries = intelligenceDocs
    .filter((doc) => doc.student) // Ignore orphaned records
    .map((doc, index) => {
      const rank = skip + index + 1;
      const { tier, percentile } = calculateTier(rank, Math.max(1, totalRecords));
      const studentObj = doc.student;

      // Extract relevant category score
      let primaryScore = doc.overallScore;
      if (category === "technical") primaryScore = doc.categoryScores?.technical || 0;
      else if (category === "careerReadiness") primaryScore = doc.categoryScores?.careerReadiness || 0;
      else if (category === "academic") primaryScore = doc.categoryScores?.academic || 0;
      else if (category === "projects") primaryScore = doc.categoryScores?.projects || 0;
      else if (category === "competitive") primaryScore = doc.categoryScores?.competitive || 0;
      else if (category === "engagement") primaryScore = doc.categoryScores?.engagement || 0;

      return {
        rank,
        score: primaryScore,
        overallScore: doc.overallScore,
        profileStrength: doc.profileStrength,
        tier,
        percentile,
        categoryScores: doc.categoryScores,
        targetRole: doc.careerReadiness?.targetRole || "Software Engineer",
        topStrength: doc.strengths?.[0]?.title || "Technical Foundation",
        analyzedAt: doc.analyzedAt,
        student: {
          _id: studentObj._id,
          name: studentObj.name,
          rollNo: studentObj.rollNo || "",
          department: studentObj.department || "Computer Engineering",
          semester: studentObj.semester || 4,
          avatar: studentObj.avatar || "",
          cgpa: studentObj.cgpa || 8.5,
        },
        isCurrentUser: currentStudentId ? studentObj._id.toString() === currentStudentId.toString() : false,
      };
    });

  return {
    category,
    entries,
    pagination: {
      total: totalRecords,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalRecords / limitNum) || 1,
    },
    currentUserRankInfo,
  };
}
