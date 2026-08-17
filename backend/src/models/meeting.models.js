import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema(
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
    title: {
      type: String,
      required: true,
    },
    agenda: {
      type: String,
      default: "1-on-1 Mentorship Session",
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    meetingLink: {
      type: String,
      default: "https://meet.google.com/abc-defg-hij",
    },
    status: {
      type: String,
      enum: ["REQUESTED", "SCHEDULED", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
