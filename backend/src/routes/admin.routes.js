import { Router } from "express";
import {
  getSystemTelemetry,
  getAllUsers,
  triggerErpSync,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/telemetry").get(getSystemTelemetry);
router.route("/users").get(getAllUsers);
router.route("/erp-sync").post(triggerErpSync);

export default router;
