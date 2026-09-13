import mongoose, { Schema } from "mongoose";

const studentProfileIntelligenceSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      index: true,
    },
    profileStrength: {
      type: String,
      enum: ["EXCEPTIONAL", "EXCELLENT", "STRONG", "COMPETENT", "DEVELOPING", "EMERGING"],
      default: "COMPETENT",
      index: true,
    },
    categoryScores: {
      technical: { type: Number, min: 0, max: 100, default: 0 },
      academic: { type: Number, min: 0, max: 100, default: 0 },
      projects: { type: Number, min: 0, max: 100, default: 0 },
      competitive: { type: Number, min: 0, max: 100, default: 0 },
      engagement: { type: Number, min: 0, max: 100, default: 0 },
      careerReadiness: { type: Number, min: 0, max: 100, default: 0 },
    },
    strengths: [
      {
        title: { type: String, required: true },
        reason: { type: String, required: true },
      },
    ],
    improvementAreas: [
      {
        title: { type: String, required: true },
        reason: { type: String, required: true },
      },
    ],
    careerReadiness: {
      score: { type: Number, default: 0 },
      targetRole: { type: String, default: "Software Engineer" },
      strengths: { type: [String], default: [] },
      gaps: { type: [String], default: [] },
    },
    evidence: [
      {
        type: { type: String, default: "GENERAL" },
        referenceTitle: { type: String, default: "" },
        reason: { type: String, default: "" },
      },
    ],
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.85,
    },
    summary: {
      type: String,
      default: "",
    },
    profileCompleteness: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    profileDataHash: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["CURRENT", "STALE", "PENDING", "FAILED"],
      default: "CURRENT",
      index: true,
    },
    analyzedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    analysisVersion: {
      type: Number,
      default: 1,
    },
    previousScore: {
      type: Number,
      default: null,
    },
    previousRank: {
      type: Number,
      default: null,
    },
    rankChange: {
      type: Number,
      default: 0,
    },
    rankChangeReasons: [
      {
        change: { type: String, default: "" },
        reason: { type: String, default: "" },
      },
    ],
    history: [
      {
        analyzedAt: { type: Date, default: Date.now },
        overallScore: { type: Number, default: 0 },
        rank: { type: Number, default: 0 },
        strengthsSummary: { type: String, default: "" },
        majorChanges: { type: [String], default: [] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound indexes for high performance leaderboard queries
studentProfileIntelligenceSchema.index({ overallScore: -1, confidence: -1, analyzedAt: -1 });
studentProfileIntelligenceSchema.index({ "categoryScores.technical": -1, overallScore: -1 });
studentProfileIntelligenceSchema.index({ "categoryScores.careerReadiness": -1, overallScore: -1 });
studentProfileIntelligenceSchema.index({ "categoryScores.projects": -1, overallScore: -1 });
studentProfileIntelligenceSchema.index({ "categoryScores.competitive": -1, overallScore: -1 });
studentProfileIntelligenceSchema.index({ "categoryScores.engagement": -1, overallScore: -1 });

export const StudentProfileIntelligence = mongoose.model(
  "StudentProfileIntelligence",
  studentProfileIntelligenceSchema
);
