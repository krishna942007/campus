import { Router } from "express";
import {
  createMentorRequest,
  getMentorRequests,
  respondMentorRequest,
  assignOnlineCourse,
  getAssignedCourses,
  scheduleMeeting,
  getMentorMentees,
} from "../controllers/mentor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

router.route("/request").post(createMentorRequest).get(getMentorRequests);
router.route("/request/:requestId/respond").patch(respondMentorRequest);
router.route("/assign-course").post(assignOnlineCourse).get(getAssignedCourses);
router.route("/schedule-meeting").post(scheduleMeeting);
router.route("/mentees").get(getMentorMentees);

export default router;
