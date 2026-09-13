import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { StudentProfileIntelligence } from "../models/studentProfileIntelligence.models.js";
import {
  aggregateStudentEvidence,
  computeEvidenceHash,
  analyzeStudentProfile,
  getOrComputeStudentIntelligence,
  calculateProfileCompleteness,
} from "../services/profileIntelligenceService.js";
import { getStudentRank, getLeaderboard as fetchLeaderboard } from "../services/rankingService.js";

/**
 * Get current logged-in student's Profile Intelligence and Rank Info
 */
export const getMyProfileIntelligence = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // Retrieve or generate initial intelligence
  const intelligence = await getOrComputeStudentIntelligence(studentId);

  // Compute live deterministic rank
  const rankInfo = await getStudentRank(studentId);

  // Check staleness via current evidence hash
  const currentEvidence = await aggregateStudentEvidence(studentId);
  const currentHash = computeEvidenceHash(currentEvidence);
  const isStale = intelligence.profileDataHash !== currentHash || intelligence.status === "STALE";

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        intelligence,
        rankInfo,
        isStale,
        profileCompleteness: intelligence.profileCompleteness || calculateProfileCompleteness(currentEvidence),
        evidence: {
          skills: currentEvidence.skills,
          projects: currentEvidence.projects,
          competitions: currentEvidence.competitions,
          certifications: currentEvidence.certifications,
          achievements: currentEvidence.achievements,
          targetRole: currentEvidence.targetRole,
        },
      },
      "Student profile intelligence retrieved successfully"
    )
  );
});

/**
 * Force on-demand reanalysis with Google Gemini
 */
export const reanalyzeMyProfile = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  const intelligence = await analyzeStudentProfile(studentId, { forceReanalyze: true });
  const rankInfo = await getStudentRank(studentId);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        intelligence,
        rankInfo,
        isStale: false,
        profileCompleteness: intelligence.profileCompleteness,
      },
      "Profile successfully reanalyzed and intelligence updated"
    )
  );
});

/**
 * Update student profile evidence (Skills, Projects, Competitions, Certifications)
 */
export const updateMyProfileEvidence = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const { skills, projects, competitions, certifications, achievements, bio, github, linkedin } = req.body;

  const user = await User.findById(studentId);
  if (!user) {
    throw new ApiError(404, "Student user not found");
  }

  if (Array.isArray(skills)) user.skills = skills;
  if (Array.isArray(projects)) user.projects = projects;
  if (Array.isArray(competitions)) user.competitions = competitions;
  if (Array.isArray(certifications)) user.certifications = certifications;
  if (Array.isArray(achievements)) user.achievements = achievements;
  if (bio !== undefined) user.bio = bio;
  if (github !== undefined) user.github = github;
  if (linkedin !== undefined) user.linkedin = linkedin;

  await user.save();

  // Mark intelligence STALE so reanalysis can be triggered
  await StudentProfileIntelligence.findOneAndUpdate(
    { student: studentId },
    { status: "STALE" }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        skills: user.skills,
        projects: user.projects,
        competitions: user.competitions,
        certifications: user.certifications,
        achievements: user.achievements,
        bio: user.bio,
        github: user.github,
        linkedin: user.linkedin,
      },
      "Profile evidence updated successfully. Profile marked for reanalysis."
    )
  );
});

/**
 * Get current student's rank across categories
 */
export const getMyRank = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const rankInfo = await getStudentRank(studentId);

  return res.status(200).json(
    new ApiResponse(200, rankInfo, "Student ranking details retrieved")
  );
});

/**
 * Get paginated leaderboard
 */
export const getLeaderboard = asyncHandler(async (req, res) => {
  const { category, page, limit, search, department } = req.query;

  const leaderboardData = await fetchLeaderboard({
    category: category || "overall",
    page: page || 1,
    limit: limit || 10,
    search: search || "",
    department: department || "",
    currentStudentId: req.user?._id,
  });

  return res.status(200).json(
    new ApiResponse(200, leaderboardData, "Leaderboard retrieved successfully")
  );
});
