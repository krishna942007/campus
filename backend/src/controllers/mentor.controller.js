import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { MentorRequest } from "../models/mentorRequest.models.js";
import { OnlineCourse } from "../models/onlineCourse.models.js";
import { Meeting } from "../models/meeting.models.js";
import { User } from "../models/user.models.js";

export const createMentorRequest = asyncHandler(async (req, res) => {
  const { mentorId, matchScore, matchReason, goals } = req.body;

  if (!mentorId) {
    throw new ApiError(400, "Mentor ID is required");
  }

  const existingRequest = await MentorRequest.findOne({
    student: req.user._id,
    mentor: mentorId,
    status: "PENDING",
  });

  if (existingRequest) {
    throw new ApiError(400, "A pending request already exists for this mentor");
  }

  const request = await MentorRequest.create({
    student: req.user._id,
    mentor: mentorId,
    matchScore: matchScore || 92,
    matchReason: matchReason || "Goal alignment",
    goals: goals || "Academic and career guidance",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, request, "Mentor request sent successfully"));
});

export const getMentorRequests = asyncHandler(async (req, res) => {
  const query = req.user.role === "MENTOR" ? { mentor: req.user._id } : { student: req.user._id };

  const requests = await MentorRequest.find(query)
    .populate("student", "name email rollNo cgpa attendancePercentage department")
    .populate("mentor", "name email designation department domainExpertise");

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "Mentor requests retrieved successfully"));
});

export const respondMentorRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status, feedbackNote } = req.body;

  if (!["ACCEPTED", "DECLINED"].includes(status)) {
    throw new ApiError(400, "Status must be ACCEPTED or DECLINED");
  }

  const request = await MentorRequest.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Mentor request not found");
  }

  request.status = status;
  if (feedbackNote) request.feedbackNote = feedbackNote;
  await request.save();

  return res
    .status(200)
    .json(new ApiResponse(200, request, `Mentor request ${status.toLowerCase()}`));
});

export const assignOnlineCourse = asyncHandler(async (req, res) => {
  const { studentId, title, platform, url, category, difficulty, guidanceNotes } = req.body;

  if (!studentId || !title) {
    throw new ApiError(400, "Student ID and course title are required");
  }

  const course = await OnlineCourse.create({
    student: studentId,
    mentor: req.user._id,
    title,
    platform: platform || "Stanford Online",
    url: url || "",
    category: category || "Computer Science",
    difficulty: difficulty || "Intermediate",
    guidanceNotes: guidanceNotes || "",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course assigned to student successfully"));
});

export const getAssignedCourses = asyncHandler(async (req, res) => {
  const query = req.user.role === "STUDENT" ? { student: req.user._id } : { mentor: req.user._id };

  const courses = await OnlineCourse.find(query)
    .populate("student", "name email rollNo")
    .populate("mentor", "name email designation");

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Assigned courses retrieved successfully"));
});

export const scheduleMeeting = asyncHandler(async (req, res) => {
  const { studentId, title, agenda, scheduledAt, meetingLink } = req.body;

  if (!studentId || !title || !scheduledAt) {
    throw new ApiError(400, "Student ID, title, and scheduled time are required");
  }

  const parsedDate = new Date(scheduledAt);
  if (isNaN(parsedDate.getTime())) {
    throw new ApiError(400, "Invalid scheduledAt date format");
  }

  const meeting = await Meeting.create({
    student: studentId,
    mentor: req.user._id,
    title,
    agenda: agenda || "1-on-1 Mentorship Session",
    scheduledAt: parsedDate,
    meetingLink: meetingLink || "https://meet.google.com/abc-defg-hij",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, meeting, "Meeting scheduled successfully"));
});

export const getMentorMentees = asyncHandler(async (req, res) => {
  const acceptedRequests = await MentorRequest.find({
    mentor: req.user._id,
    status: "ACCEPTED",
  }).populate("student", "name email rollNo cgpa attendancePercentage department avatar");

  const mentees = acceptedRequests.map((req) => req.student);

  return res
    .status(200)
    .json(new ApiResponse(200, mentees, "Mentees list fetched successfully"));
});
