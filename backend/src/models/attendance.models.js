import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    totalLectures: {
      type: Number,
      required: true,
      default: 30,
    },
    attendedLectures: {
      type: Number,
      required: true,
      default: 27,
    },
    facultyName: {
      type: String,
      default: "Prof. S. Kulkarni",
    },
  },
  {
    timestamps: true,
  }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
