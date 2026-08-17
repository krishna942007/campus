import mongoose, { Schema } from "mongoose";

const onlineCourseSchema = new Schema(
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
    platform: {
      type: String,
      default: "Stanford Online",
    },
    url: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Computer Science",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    guidanceNotes: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const OnlineCourse = mongoose.model("OnlineCourse", onlineCourseSchema);
