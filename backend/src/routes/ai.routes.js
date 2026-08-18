import { Router } from "express";
import {
  handleAIChat,
  handleRAGSearch,
  getChatSessions,
  handleMentorMatch,
  handleSkillGapAnalysis,
  handleUploadKnowledgeDocument,
} from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/chat").post(handleAIChat);
router.route("/rag-search").post(handleRAGSearch);
router.route("/sessions").get(getChatSessions);
router.route("/mentor-match").post(handleMentorMatch);
router.route("/skill-gap").post(handleSkillGapAnalysis);
router.route("/upload-knowledge").post(handleUploadKnowledgeDocument);

export default router;
