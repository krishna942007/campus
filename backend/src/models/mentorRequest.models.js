import mongoose, { Schema } from "mongoose";

const mentorRequestSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchScore: {
      type: Number,
      default: 85,
    },
    matchReason: {
      type: String,
      default: "Goal alignment and domain interest overlap",
    },
    goals: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED", "CHANGE_PENDING"],
      default: "PENDING",
    },
    feedbackNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const MentorRequest = mongoose.model("MentorRequest", mentorRequestSchema);
