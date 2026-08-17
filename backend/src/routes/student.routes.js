import { Router } from "express";
import {
  getStudentDashboard,
  getStudentAttendance,
  getStudentAssignments,
  submitAssignment,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/dashboard").get(getStudentDashboard);
router.route("/attendance").get(getStudentAttendance);
router.route("/assignments").get(getStudentAssignments);
router.route("/assignments/:assignmentId/submit").post(submitAssignment);

export default router;
