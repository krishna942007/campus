import { Router } from "express";
import {
  handleAIChat,
  handleRAGSearch,
  getChatSessions,
} from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/chat").post(handleAIChat);
router.route("/rag-search").post(handleRAGSearch);
router.route("/sessions").get(getChatSessions);

export default router;
