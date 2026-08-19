import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ChatSession } from "../models/chatSession.models.js";
import {
  generateAIResponse,
  performRAGSearch,
  calculateMentorMatch,
  generateSkillGapAnalysis,
  addKnowledgeDocument,
} from "../services/aiService.js";

export const handleAIChat = asyncHandler(async (req, res) => {
  const { prompt, model, sessionId, isGroundedInRAG = true } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt text is required");
  }

  let session;
  if (sessionId && req.user?._id) {
    session = await ChatSession.findById(sessionId);
  }

  if (!session && req.user?._id) {
    session = await ChatSession.create({
      user: req.user._id,
      title: prompt.slice(0, 35) + "...",
      modelUsed: model || "gemini-2.5-flash",
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
    name: req.user?.fullName || req.user?.name || "Student",
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
  const sessions = await ChatSession.find({ user: req.user._id }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "Chat sessions retrieved successfully"));
});
