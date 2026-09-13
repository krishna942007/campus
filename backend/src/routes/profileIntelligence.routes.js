import { Router } from "express";
import {
  getMyProfileIntelligence,
  reanalyzeMyProfile,
  updateMyProfileEvidence,
  getMyRank,
  getLeaderboard,
} from "../controllers/profileIntelligence.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

// Student Intelligence & Rank
router.route("/profile-intelligence").get(getMyProfileIntelligence);
router.route("/profile-intelligence/reanalyze").post(reanalyzeMyProfile);
router.route("/profile-intelligence/evidence").patch(updateMyProfileEvidence);
router.route("/rank").get(getMyRank);
router.route("/leaderboard").get(getLeaderboard);

export default router;
