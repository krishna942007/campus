import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getMentorEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getRecommendedEventsForStudent,
} from "../controllers/event.controller.js";
import { verifyJWT, softVerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public & Student Recommendation Endpoints
router.route("/").get(softVerifyJWT, getAllEvents);
router.route("/recommendations").get(softVerifyJWT, getRecommendedEventsForStudent);
router.route("/mentor").get(softVerifyJWT, getMentorEvents);
router.route("/:id").get(softVerifyJWT, getEventById);

// Mentor / Admin Management Endpoints
router.route("/").post(softVerifyJWT, createEvent);
router.route("/:id").put(softVerifyJWT, updateEvent);
router.route("/:id").delete(softVerifyJWT, deleteEvent);

export default router;
