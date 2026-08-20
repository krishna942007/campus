import { Router } from "express";
import {
  handleAIChat,
  handleRAGSearch,
  getChatSessions,
  handleMentorMatch,
  handleSkillGapAnalysis,
  handleUploadKnowledgeDocument,
} from "../controllers/ai.controller.js";
import { verifyJWT, softVerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public & student AI routes (with soft authentication for guest or logged in student context)
router.route("/chat").post(softVerifyJWT, handleAIChat);
router.route("/rag-search").post(softVerifyJWT, handleRAGSearch);
router.route("/mentor-match").post(softVerifyJWT, handleMentorMatch);
router.route("/skill-gap").post(softVerifyJWT, handleSkillGapAnalysis);

// Authenticated session & admin management routes
router.route("/sessions").get(verifyJWT, getChatSessions);
router.route("/upload-knowledge").post(verifyJWT, handleUploadKnowledgeDocument);

export default router;
