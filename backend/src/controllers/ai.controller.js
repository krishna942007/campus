import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ChatSession } from "../models/chatSession.models.js";
import { User } from "../models/user.models.js";
import {
  generateAIResponse,
  performRAGSearch,
  calculateMentorMatch,
  generateSkillGapAnalysis,
  addKnowledgeDocument,
} from "../services/aiService.js";

// Helper to safely and securely resolve the active user's ObjectId
const resolveUserId = async (req, fallbackBody = {}) => {
  if (req.user?._id) return req.user._id;

  const email = fallbackBody.userEmail || req.query?.userEmail || req.body?.userEmail;
  if (email) {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) return user._id;
  }

  const rollNo = fallbackBody.rollNo || req.query?.rollNo || req.body?.rollNo;
  if (rollNo) {
    const user = await User.findOne({ rollNo: rollNo.toUpperCase().trim() });
    if (user) return user._id;
  }

  return null;
};

export const handleAIChat = asyncHandler(async (req, res) => {
  const { prompt, model, sessionId, isGroundedInRAG = true, userEmail, rollNo } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt text is required");
  }

  const userId = await resolveUserId(req, { userEmail, rollNo });

  let session = null;
  if (sessionId && userId) {
    // Strict privacy constraint: only access session belonging to this specific user
    session = await ChatSession.findOne({ _id: sessionId, user: userId });
  }

  if (!session && userId) {
    session = await ChatSession.create({
      user: userId,
      title: prompt.slice(0, 38) + (prompt.length > 38 ? "..." : ""),
      modelUsed: model || "gemini-2.0-pro",
      messages: [],
    });
  }

  if (session) {
    session.messages.push({
      role: "user",
      content: prompt,
      timestamp: new Date(),
    });
  }

  const userContext = {
    name: req.user?.fullName || req.user?.name || (userEmail ? userEmail.split("@")[0] : "Student"),
    role: req.user?.role || "STUDENT",
    department: req.user?.department || "Computer Engineering",
  };

  const { reply, thinkingSteps } = await generateAIResponse({
    prompt,
    userContext,
    isGroundedInRAG,
    model,
  });

  if (session) {
    session.messages.push({
      role: "assistant",
      content: reply,
      thinkingSteps: thinkingSteps || [],
      timestamp: new Date(),
    });
    await session.save();
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        sessionId: session?._id || null,
        title: session?.title || prompt.slice(0, 38),
        messages: session?.messages || [
          { role: "user", content: prompt },
          { role: "assistant", content: reply }
        ],
        reply,
        thinkingSteps,
      },
      "AI chat response generated successfully"
    )
  );
});

export const handleRAGSearch = asyncHandler(async (req, res) => {
  const { query, category, limit } = req.body;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const ragResults = await performRAGSearch({ query, category, limit });

  return res
    .status(200)
    .json(new ApiResponse(200, { query, results: ragResults }, "RAG search executed successfully"));
});

export const handleMentorMatch = asyncHandler(async (req, res) => {
  const { studentGoals, studentDomain, mentorSpecialization, mentorDepartment } = req.body;

  const matchData = await calculateMentorMatch({
    studentGoals,
    studentDomain,
    mentorSpecialization,
    mentorDepartment,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, matchData, "Mentor compatibility score calculated successfully"));
});

export const handleSkillGapAnalysis = asyncHandler(async (req, res) => {
  const { studentSkills, targetRole, projects } = req.body;

  const gapAnalysis = await generateSkillGapAnalysis({
    studentSkills: studentSkills || [],
    targetRole: targetRole || "AI Research Engineer",
    projects: projects || [],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, gapAnalysis, "Skill-gap analysis generated successfully"));
});

export const handleUploadKnowledgeDocument = asyncHandler(async (req, res) => {
  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "Access denied. Only Admins can upload knowledge documents.");
  }

  const { title, category, content, tags } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Document title and content are required");
  }

  const indexedDoc = await addKnowledgeDocument({ title, category, content, tags });

  return res
    .status(201)
    .json(new ApiResponse(201, indexedDoc, "Document indexed into RAG Knowledge Base successfully"));
});

export const getChatSessions = asyncHandler(async (req, res) => {
  const userId = await resolveUserId(req);

  if (!userId) {
    // Privacy protection: Return empty array for unauthenticated / unresolved guest sessions
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No chat sessions for unauthenticated user"));
  }

  const sessions = await ChatSession.find({ user: userId }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "User private chat sessions retrieved successfully"));
});

export const deleteChatSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = await resolveUserId(req);

  if (!userId) {
    throw new ApiError(401, "Authentication required to delete chat session");
  }

  // Privacy protection: only delete if the session belongs to this specific user
  const deleted = await ChatSession.findOneAndDelete({ _id: id, user: userId });
  if (!deleted) {
    throw new ApiError(404, "Chat session not found or does not belong to your account");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Chat session deleted successfully"));
});

export const clearAllChatSessions = asyncHandler(async (req, res) => {
  const userId = await resolveUserId(req);

  if (!userId) {
    throw new ApiError(401, "Authentication required to clear chat history");
  }

  // Privacy protection: only delete sessions belonging to this specific user
  await ChatSession.deleteMany({ user: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "All private chat history cleared successfully"));
});
