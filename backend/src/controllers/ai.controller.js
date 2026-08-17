import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ChatSession } from "../models/chatSession.models.js";

export const handleAIChat = asyncHandler(async (req, res) => {
  const { prompt, model, sessionId } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt text is required");
  }

  let session;
  if (sessionId) {
    session = await ChatSession.findById(sessionId);
  }

  if (!session) {
    session = await ChatSession.create({
      user: req.user._id,
      title: prompt.slice(0, 30) + "...",
      modelUsed: model || "gemini-2.0-pro",
      messages: [],
    });
  }

  // Push user prompt
  session.messages.push({
    role: "user",
    content: prompt,
    timestamp: new Date(),
  });

  // Simulated structured AI Assistant response grounded in VIT context
  const aiResponseContent = `Based on your profile as a ${req.user.role || "STUDENT"} in ${
    req.user.department || "Computer Engineering"
  }, here is the recommended guidance:\n\n1. Ensure your attendance stays above 75%.\n2. Focus on capstone milestone deliverables.\n3. Consult your faculty mentor for domain approval.`;

  session.messages.push({
    role: "assistant",
    content: aiResponseContent,
    thinkingSteps: [
      "Extracted user context (Role, Dept, Academic Status)",
      "Retrieved VIT Autonomous Ordinance 2026 guidelines",
      "Synthesized response for student query",
    ],
    timestamp: new Date(),
  });

  await session.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        sessionId: session._id,
        messages: session.messages,
        reply: aiResponseContent,
      },
      "AI chat response generated"
    )
  );
});

export const handleRAGSearch = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const ragResults = [
    {
      title: "VIT Autonomous Ordinance Section 4.2 — Attendance Regulations",
      snippet:
        "Students maintaining less than 75% aggregate attendance in any theory course are non-eligible for End Semester Examinations without formal Dean Academic approval.",
      relevanceScore: 0.94,
      category: "Academic Rules",
    },
    {
      title: "Placement Policy 2026 — Minimum Eligibility Criteria",
      snippet:
        "Minimum CGPA of 6.75 with no active backlogs required for tier-1 campus placements.",
      relevanceScore: 0.89,
      category: "Placements",
    },
  ];

  return res
    .status(200)
    .json(new ApiResponse(200, { query, results: ragResults }, "RAG search executed"));
});

export const getChatSessions = asyncHandler(async (req, res) => {
  const sessions = await ChatSession.find({ user: req.user._id }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "Chat sessions retrieved"));
});
