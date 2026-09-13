import { Router } from "express";
import {
  getStudentDashboard,
  getStudentAttendance,
  getStudentAssignments,
  submitAssignment,
} from "../controllers/student.controller.js";
import {
  getStudentGoals,
  createStudentGoal,
  getStudentGoalById,
  updateStudentGoal,
  deleteStudentGoal,
  setPrimaryGoal,
  toggleTaskCompletion,
  regenerateRoadmap,
} from "../controllers/goal.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/dashboard").get(getStudentDashboard);
router.route("/attendance").get(getStudentAttendance);
router.route("/assignments").get(getStudentAssignments);
router.route("/assignments/:assignmentId/submit").post(submitAssignment);

// Goals
router.route("/goals").get(getStudentGoals).post(createStudentGoal);
router.route("/goals/:goalId").get(getStudentGoalById).patch(updateStudentGoal).delete(deleteStudentGoal);
router.route("/goals/:goalId/primary").patch(setPrimaryGoal);
router.route("/goals/:goalId/milestones/:milestoneId/tasks/:taskId/toggle").patch(toggleTaskCompletion);
router.route("/goals/:goalId/roadmap/regenerate").post(regenerateRoadmap);

export default router;
