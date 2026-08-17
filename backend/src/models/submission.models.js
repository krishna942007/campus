import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema(
  {
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["SUBMITTED", "LATE", "GRADED"],
      default: "SUBMITTED",
    },
    marksObtained: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: String,
      default: "",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Submission = mongoose.model("Submission", submissionSchema);
