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
router.route("/mentor").get(verifyJWT, getMentorEvents);
router.route("/:id").get(softVerifyJWT, getEventById);

// Mentor / Admin Management Endpoints
router.route("/").post(verifyJWT, createEvent);
router.route("/:id").put(verifyJWT, updateEvent);
router.route("/:id").delete(verifyJWT, deleteEvent);

export default router;
