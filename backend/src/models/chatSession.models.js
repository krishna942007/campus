import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thinkingSteps: {
      type: [String],
      default: [],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const chatSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    modelUsed: {
      type: String,
      enum: ["gemini-2.0-pro", "claude-3.5-sonnet", "gpt-4o"],
      default: "gemini-2.0-pro",
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

export const ChatSession = mongoose.model("ChatSession", chatSessionSchema);
