import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.models.js";
import { Goal } from "../models/goal.models.js";
import { analyzeEventMetadata } from "../services/aiService.js";

/**
 * Stopwords list for keyword normalization
 */
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
  "did", "do", "does", "doing", "don't", "down", "during", "each", "few", "for",
  "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers",
  "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "it",
  "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no",
  "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
  "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "should",
  "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves",
  "then", "there", "these", "they", "this", "those", "through", "to", "too", "under",
  "until", "up", "very", "was", "wasn't", "we", "were", "weren't", "what", "when",
  "where", "which", "while", "who", "whom", "why", "with", "won't", "would", "you",
  "your", "yours", "yourself", "yourselves", "learn", "master", "build", "create", "start",
  "engineering", "development", "systems", "advanced", "introduction", "program", "workshop",
  "technologies", "topics", "skills", "foundations", "basics", "principles"
]);

function extractKeywords(text) {
  if (!text || typeof text !== "string") return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * POST /api/v1/events
 * Create event (Mentor / Faculty / Admin)
 */
export const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    eventType,
    eventDate,
    endDate,
    location,
    registrationLink,
    capacity,
    department,
  } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "Event title is required");
  }

  if (!description || !description.trim()) {
    throw new ApiError(400, "Event description is required");
  }

  if (!eventDate) {
    throw new ApiError(400, "Event date is required");
  }

  // 1. Analyze Event with AI to extract topics, skills, domains
  let aiMetadata = {};
  try {
    aiMetadata = await analyzeEventMetadata({
      title: title.trim(),
      description: description.trim(),
      eventType: eventType || "WORKSHOP",
    });
  } catch (aiErr) {
    console.warn("AI metadata extraction failed during creation, continuing:", aiErr.message);
  }

  // 2. Create Event document
  const event = await Event.create({
    title: title.trim(),
    description: description.trim(),
    eventType: eventType || "WORKSHOP",
    eventDate: new Date(eventDate),
    endDate: endDate ? new Date(endDate) : undefined,
    location: location ? location.trim() : "Auditorium / Campus",
    registrationLink: registrationLink ? registrationLink.trim() : "",
    capacity: capacity ? Number(capacity) : 100,
    department: department ? department.trim() : "All",
    createdBy: req.user._id,
    aiMetadata,
  });

  const populatedEvent = await Event.findById(event._id).populate(
    "createdBy",
    "name email department designation"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedEvent, "Event created successfully"));
});

/**
 * GET /api/v1/events
 * Get all events with optional filtering
 */
export const getAllEvents = asyncHandler(async (req, res) => {
  const { status, eventType, department, search } = req.query;

  const filter = {};

  if (status && status !== "ALL") {
    filter.status = status;
  }

  if (eventType && eventType !== "ALL") {
    filter.eventType = eventType;
  }

  if (department && department !== "All" && department !== "ALL") {
    filter.$or = [{ department: "All" }, { department: new RegExp(department, "i") }];
  }

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filter.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { "aiMetadata.extractedSkills": searchRegex },
      { "aiMetadata.targetDomains": searchRegex },
    ];
  }

  const events = await Event.find(filter)
    .populate("createdBy", "name email department designation")
    .sort({ eventDate: 1, createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

/**
 * GET /api/v1/events/mentor
 * Get events created by logged-in mentor
 */
export const getMentorEvents = asyncHandler(async (req, res) => {
  const mentorId = req.user._id;

  const events = await Event.find({ createdBy: mentorId })
    .populate("createdBy", "name email department designation")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Mentor events fetched successfully"));
});

/**
 * GET /api/v1/events/:id
 * Get single event by ID
 */
export const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid event ID");
  }

  const event = await Event.findById(id).populate(
    "createdBy",
    "name email department designation"
  );

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event retrieved successfully"));
});

/**
 * PUT /api/v1/events/:id
 * Update event
 */
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    eventType,
    eventDate,
    endDate,
    location,
    registrationLink,
    capacity,
    status,
    department,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid event ID");
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  // Verify ownership or Admin role
  if (
    event.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "ADMIN"
  ) {
    throw new ApiError(403, "You are not authorized to update this event");
  }

  let contentChanged = false;
  if (title && title.trim() !== event.title) {
    event.title = title.trim();
    contentChanged = true;
  }
  if (description && description.trim() !== event.description) {
    event.description = description.trim();
    contentChanged = true;
  }
  if (eventType && eventType !== event.eventType) {
    event.eventType = eventType;
    contentChanged = true;
  }

  if (eventDate) event.eventDate = new Date(eventDate);
  if (endDate) event.endDate = new Date(endDate);
  if (location !== undefined) event.location = location.trim();
  if (registrationLink !== undefined) event.registrationLink = registrationLink.trim();
  if (capacity !== undefined) event.capacity = Number(capacity);
  if (status) event.status = status;
  if (department) event.department = department.trim();

  // Re-run AI analysis if content changed significantly
  if (contentChanged) {
    try {
      event.aiMetadata = await analyzeEventMetadata({
        title: event.title,
        description: event.description,
        eventType: event.eventType,
      });
    } catch (aiErr) {
      console.warn("AI metadata update failed:", aiErr.message);
    }
  }

  await event.save();

  const updated = await Event.findById(id).populate(
    "createdBy",
    "name email department designation"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Event updated successfully"));
});

/**
 * DELETE /api/v1/events/:id
 * Delete event
 */
export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid event ID");
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (
    event.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "ADMIN"
  ) {
    throw new ApiError(403, "You are not authorized to delete this event");
  }

  await Event.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, { deletedId: id }, "Event deleted successfully"));
});

/**
 * GET /api/v1/events/recommendations
 * Personalized AI Event Recommendations for Student
 */
export const getRecommendedEventsForStudent = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // 1. Fetch upcoming / ongoing events
  const events = await Event.find({
    status: { $in: ["UPCOMING", "ONGOING"] },
  })
    .populate("createdBy", "name email department designation")
    .lean();

  if (!events || events.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No upcoming events available"));
  }

  // 2. Fetch student's goals and roadmaps
  const studentGoals = await Goal.find({
    student: studentId,
    status: { $ne: "ARCHIVED" },
  }).lean();

  // Find primary goal or fallback to first goal
  const primaryGoal =
    studentGoals.find((g) => g.isPrimary) || studentGoals[0] || null;

  // 3. Extract Student Keywords Profile
  const studentKeywordSet = new Set();
  const studentSkillsList = [];
  let targetRole = "";

  if (primaryGoal) {
    targetRole = primaryGoal.targetRole || primaryGoal.title || "";
    extractKeywords(primaryGoal.title).forEach((k) => studentKeywordSet.add(k));
    extractKeywords(primaryGoal.description).forEach((k) => studentKeywordSet.add(k));
    extractKeywords(primaryGoal.targetRole).forEach((k) => studentKeywordSet.add(k));

    if (Array.isArray(primaryGoal.roadmap)) {
      primaryGoal.roadmap.forEach((milestone) => {
        extractKeywords(milestone.title).forEach((k) => studentKeywordSet.add(k));
        extractKeywords(milestone.description).forEach((k) => studentKeywordSet.add(k));

        if (Array.isArray(milestone.tasks)) {
          milestone.tasks.forEach((t) => {
            extractKeywords(t.text).forEach((k) => studentKeywordSet.add(k));
          });
        }
      });
    }
  }

  // Also include department keywords
  if (req.user.department) {
    extractKeywords(req.user.department).forEach((k) => studentKeywordSet.add(k));
  }

  const studentKeywords = Array.from(studentKeywordSet);

  // 4. Score and Rank Events
  const scoredEvents = events.map((event) => {
    let score = 55; // Base baseline score for active events
    const matchedSkills = [];
    const matchedTopics = [];
    let matchType = "GENERAL";

    const extractedSkills = event.aiMetadata?.extractedSkills || [];
    const keyTopics = event.aiMetadata?.keyTopics || [];
    const targetDomains = event.aiMetadata?.targetDomains || [];

    // Check extracted skills match
    extractedSkills.forEach((skill) => {
      const skillWords = extractKeywords(skill);
      const isMatch = skillWords.some((w) => studentKeywords.includes(w));
      if (isMatch) {
        matchedSkills.push(skill);
        score += 15;
      }
    });

    // Check key topics match
    keyTopics.forEach((topic) => {
      const topicWords = extractKeywords(topic);
      const isMatch = topicWords.some((w) => studentKeywords.includes(w));
      if (isMatch) {
        matchedTopics.push(topic);
        score += 10;
      }
    });

    // Check target domains match
    targetDomains.forEach((domain) => {
      const domainWords = extractKeywords(domain);
      if (domainWords.some((w) => studentKeywords.includes(w))) {
        score += 12;
      }
    });

    // Title / description direct keyword overlap
    const eventKeywords = [
      ...extractKeywords(event.title),
      ...extractKeywords(event.description),
    ];
    const directMatches = eventKeywords.filter((ew) => studentKeywords.includes(ew));
    if (directMatches.length > 0) {
      score += Math.min(directMatches.length * 4, 16);
    }

    // Department match
    if (
      event.department === "All" ||
      (req.user.department &&
        event.department.toLowerCase().includes(req.user.department.toLowerCase()))
    ) {
      score += 8;
    }

    // Clamp score between 60 and 98
    const finalScore = Math.min(Math.max(score, 60), 98);

    // Formulate a precise, tailored match reason
    let matchReason = "";
    if (matchedSkills.length > 0 && primaryGoal) {
      matchReason = `Matches your focus on ${matchedSkills.slice(0, 2).join(" & ")} in your "${primaryGoal.title}" roadmap`;
      matchType = "SKILL_MATCH";
    } else if (targetRole && score > 75) {
      matchReason = `Directly accelerates your goal to become a ${targetRole}`;
      matchType = "CAREER_GOAL_MATCH";
    } else if (matchedTopics.length > 0) {
      matchReason = `Deep-dive topic aligned with your academic studies: ${matchedTopics[0]}`;
      matchType = "TOPIC_MATCH";
    } else if (event.department !== "All") {
      matchReason = `Curated for ${event.department} students`;
      matchType = "DEPARTMENT_MATCH";
    } else {
      matchReason = `Campus-wide recommended ${event.eventType.toLowerCase().replace("_", " ")} for career growth`;
      matchType = "CAMPUS_GENERAL";
    }

    return {
      ...event,
      relevanceScore: finalScore,
      matchReason,
      matchType,
      matchedSkills: Array.from(new Set(matchedSkills)),
      matchedTopics: Array.from(new Set(matchedTopics)),
    };
  });

  // Sort descending by relevanceScore, then by eventDate ascending
  scoredEvents.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return new Date(a.eventDate) - new Date(b.eventDate);
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        recommendations: scoredEvents,
        studentTargetGoal: primaryGoal ? primaryGoal.title : null,
        totalEvents: scoredEvents.length,
      },
      "Recommended events generated successfully"
    )
  );
});
