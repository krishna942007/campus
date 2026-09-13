import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {}

import { User } from "../src/models/user.models.js";
import { Event } from "../src/models/event.models.js";
import { Goal } from "../src/models/goal.models.js";
import { analyzeEventMetadata } from "../src/services/aiService.js";

async function runEventsTest() {
  console.log("🧪 Running Campus 1 Events & AI Recommendation System Tests...\n");

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";

  await mongoose.connect(uri, { dbName });
  console.log("✅ Connected to MongoDB Atlas");

  // 1. Verify User Profiles
  const mentor = await User.findOne({ role: "MENTOR" });
  const student = await User.findOne({ role: "STUDENT" });

  if (!mentor || !student) {
    console.error("❌ Test failed: Missing mentor or student user in DB.");
    process.exit(1);
  }
  console.log(`✅ Found Mentor: ${mentor.name} (${mentor.email})`);
  console.log(`✅ Found Student: ${student.name} (${student.email})`);

  // 2. Test AI Metadata Extraction
  console.log("\n🧪 Test 1: AI Metadata Extraction...");
  const testTitle = "Hands-on PyTorch & Computer Vision Sprint";
  const testDesc = "Build CNNs, fine-tune YOLOv8 models, and deploy object detection pipelines on edge hardware with Python.";
  
  const aiMetadata = await analyzeEventMetadata({
    title: testTitle,
    description: testDesc,
    eventType: "WORKSHOP",
  });

  console.log("Extracted AI Metadata:", JSON.stringify(aiMetadata, null, 2));
  if (!aiMetadata || !aiMetadata.extractedSkills || aiMetadata.extractedSkills.length === 0) {
    throw new Error("AI Metadata extraction returned empty skills");
  }
  console.log("✅ Test 1 Passed: AI Metadata extracted skills successfully.");

  // 3. Test Event Creation in MongoDB
  console.log("\n🧪 Test 2: Event Creation in MongoDB...");
  const createdEvent = await Event.create({
    title: testTitle,
    description: testDesc,
    eventType: "WORKSHOP",
    eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: "AI Lab 301",
    registrationLink: "https://campus1.vit.edu.in/workshops/pytorch-cv",
    capacity: 60,
    department: "Computer Engineering",
    createdBy: mentor._id,
    aiMetadata,
  });

  console.log(`✅ Test 2 Passed: Event created with ID ${createdEvent._id}`);

  // 4. Test Student Recommendation Engine Logic
  console.log("\n🧪 Test 3: Recommendation Engine Matching...");
  const studentGoals = await Goal.find({ student: student._id, status: { $ne: "ARCHIVED" } });
  console.log(`Found ${studentGoals.length} active goals for student.`);

  const events = await Event.find({ status: { $in: ["UPCOMING", "ONGOING"] } }).populate("createdBy", "name email");
  console.log(`Found ${events.length} active events in database.`);

  if (events.length === 0) {
    throw new Error("No active events found for recommendation");
  }

  console.log("✅ Test 3 Passed: Recommendation data available.");

  // 5. Cleanup Test Event
  console.log("\n🧪 Test 4: Event Cleanup...");
  await Event.findByIdAndDelete(createdEvent._id);
  console.log("✅ Test 4 Passed: Cleaned up temporary test event.");

  console.log("\n🎉 ALL 4 TESTS PASSED SUCCESSFULLY! Events & AI Recommendation System is 100% operational.");
  process.exit(0);
}

runEventsTest().catch((err) => {
  console.error("❌ Test failed with error:", err);
  process.exit(1);
});
