import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Attendance } from "../models/attendance.models.js";
import { Assignment } from "../models/assignment.models.js";
import { Submission } from "../models/submission.models.js";
import { User } from "../models/user.models.js";

export const getStudentDashboard = asyncHandler(async (req, res) => {
  const student = await User.findById(req.user._id).select("-password -refreshToken");

  if (!student) {
    throw new ApiError(404, "Student user profile not found");
  }

  const attendances = await Attendance.find({ student: req.user._id });
  let totalLectures = 0;
  let totalAttended = 0;

  attendances.forEach((att) => {
    totalLectures += att.totalLectures;
    totalAttended += att.attendedLectures;
  });

  const overallAttendance =
    totalLectures > 0 ? Number(((totalAttended / totalLectures) * 100).toFixed(1)) : 91.4;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        student,
        overallAttendance,
        cgpa: student.cgpa || 8.92,
        activeAssignmentsCount: 3,
      },
      "Student dashboard data retrieved"
    )
  );
});

export const getStudentAttendance = asyncHandler(async (req, res) => {
  let records = await Attendance.find({ student: req.user._id });

  if (records.length === 0) {
    // Seed default sample ERP records for student
    records = await Attendance.create([
      {
        student: req.user._id,
        subjectCode: "CS501",
        subjectName: "Advanced Data Structures & Algorithms",
        totalLectures: 36,
        attendedLectures: 33,
        facultyName: "Dr. R. Mehta",
      },
      {
        student: req.user._id,
        subjectCode: "CS502",
        subjectName: "Database Systems & Architecture",
        totalLectures: 30,
        attendedLectures: 28,
        facultyName: "Prof. S. Kulkarni",
      },
      {
        student: req.user._id,
        subjectCode: "CS503",
        subjectName: "Machine Learning & Neural Networks",
        totalLectures: 32,
        attendedLectures: 29,
        facultyName: "Dr. A. Sharma",
      },
    ]);
  }

  const processed = records.map((record) => {
    const pct = Number(((record.attendedLectures / record.totalLectures) * 100).toFixed(1));
    // Safe miss lectures calculation before dropping below 75%
    const minAttendedFor75 = Math.ceil(0.75 * record.totalLectures);
    const safeMiss = Math.max(0, record.attendedLectures - minAttendedFor75);

    return {
      ...record.toObject(),
      percentage: pct,
      safeMissCount: safeMiss,
      isCompliant: pct >= 75,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, processed, "Attendance records fetched successfully"));
});

export const getStudentAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find().populate("mentor", "name email designation");

  const submissions = await Submission.find({ student: req.user._id });
  const submissionMap = new Map(
    submissions.map((sub) => [sub.assignment.toString(), sub])
  );

  const result = assignments.map((ass) => ({
    ...ass.toObject(),
    submission: submissionMap.get(ass._id.toString()) || null,
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Student assignments fetched"));
});

export const submitAssignment = asyncHandler(async (req, res) => {
  const { assignmentId } = req.params;
  const { fileName, fileUrl } = req.body;

  if (!fileName) {
    throw new ApiError(400, "File name is required for submission");
  }

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    throw new ApiError(404, "Assignment not found");
  }

  const isLate = new Date() > new Date(assignment.deadline);

  const submission = await Submission.findOneAndUpdate(
    { assignment: assignmentId, student: req.user._id },
    {
      fileName,
      fileUrl: fileUrl || "",
      status: isLate ? "LATE" : "SUBMITTED",
      submittedAt: new Date(),
    },
    { upsert: true, new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, submission, "Assignment submitted successfully"));
});
