import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  }
});

const milestoneSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
    default: "NOT_STARTED",
  },
  completedActivities: {
    type: [String],
    default: [],
  },
  remainingTasks: {
    type: [String],
    default: [],
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
});

const goalSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "ARCHIVED"],
      default: "ACTIVE",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    roadmapGenerationStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    roadmap: {
      type: [milestoneSchema],
      default: [],
    },
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    aiMetadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
goalSchema.index({ student: 1, isPrimary: 1 });
goalSchema.index({ student: 1, title: 1, status: 1 });

export const Goal = mongoose.model("Goal", goalSchema);
