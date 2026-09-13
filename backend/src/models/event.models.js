import mongoose, { Schema } from "mongoose";

const aiMetadataSchema = new Schema(
  {
    targetDomains: {
      type: [String],
      default: [],
    },
    extractedSkills: {
      type: [String],
      default: [],
    },
    keyTopics: {
      type: [String],
      default: [],
    },
    targetAudienceLevel: {
      type: String,
      enum: ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"],
      default: "ALL",
    },
    summary: {
      type: String,
      default: "",
    },
    processedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSED", "FAILED"],
      default: "PENDING",
    },
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: [
        "WORKSHOP",
        "SEMINAR",
        "HACKATHON",
        "GUEST_LECTURE",
        "COMPETITION",
        "CAREER_FAIR",
        "WEBINAR",
        "OTHER",
      ],
      default: "WORKSHOP",
    },
    eventDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
      default: "Auditorium / Campus",
      trim: true,
    },
    registrationLink: {
      type: String,
      default: "",
      trim: true,
    },
    capacity: {
      type: Number,
      default: 100,
    },
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"],
      default: "UPCOMING",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      default: "All",
      trim: true,
    },
    aiMetadata: {
      type: aiMetadataSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for high-performance querying
eventSchema.index({ status: 1, eventDate: 1 });
eventSchema.index({ "aiMetadata.extractedSkills": 1 });
eventSchema.index({ createdBy: 1 });

export const Event = mongoose.model("Event", eventSchema);
