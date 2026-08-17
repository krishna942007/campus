import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema(
  {
    courseCode: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    maxMarks: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
