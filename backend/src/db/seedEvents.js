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

import { User } from "../models/user.models.js";
import { Event } from "../models/event.models.js";
import { analyzeEventMetadata } from "../services/aiService.js";

async function seedEvents() {
  console.log("🌱 Seeding Campus 1 Events...");
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";

  if (!uri) {
    console.error("❌ MONGODB_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName });
  console.log(`Connected to: ${mongoose.connection.host}`);

  // Find a mentor or admin user to be the creator
  const mentor = await User.findOne({ role: "MENTOR" }) || await User.findOne({});
  if (!mentor) {
    console.error("❌ No mentor or user found to assign events to.");
    process.exit(1);
  }

  const sampleEvents = [
    {
      title: "Generative AI & LLM Systems Hands-On Bootcamp",
      description: "Comprehensive 2-day deep dive into building Retrieval-Augmented Generation (RAG) pipelines, fine-tuning open-source models with LoRA, and deploying production LLMs using PyTorch and Hugging Face.",
      eventType: "WORKSHOP",
      eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      location: "Auditorium Hall A & AI Lab 302",
      registrationLink: "https://campus1.vit.edu.in/events/genai-bootcamp",
      capacity: 120,
      department: "Computer Engineering",
      status: "UPCOMING",
    },
    {
      title: "Campus Hackathon 2026: Scalable Cloud & Full-Stack Systems",
      description: "36-hour flagship hackathon focused on architecting resilient microservices, high-throughput backend APIs with Node.js, React frontend dashboards, and Docker/Kubernetes cloud orchestration.",
      eventType: "HACKATHON",
      eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      location: "Central Computing Center",
      registrationLink: "https://campus1.vit.edu.in/hackathon-2026",
      capacity: 250,
      department: "All",
      status: "UPCOMING",
    },
    {
      title: "Mastering Data Structures & System Design for Tier-1 Tech",
      description: "Exclusive guest lecture and interactive problem-solving session with senior engineering leaders from Google and Microsoft covering distributed caching, graph algorithms, and system design interviews.",
      eventType: "GUEST_LECTURE",
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "Seminar Hall 1",
      registrationLink: "https://campus1.vit.edu.in/seminar/dsa-tier1",
      capacity: 180,
      department: "Computer Engineering",
      status: "UPCOMING",
    },
    {
      title: "Computer Vision & Autonomous Robotics Workshop",
      description: "Hands-on experience with OpenCV, YOLOv8 object detection, sensor fusion, and ROS2 for robotic navigation and real-time vision processing on embedded edge devices.",
      eventType: "WORKSHOP",
      eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: "Robotics & Embedded Systems Lab",
      registrationLink: "https://campus1.vit.edu.in/workshops/cv-robotics",
      capacity: 80,
      department: "Information Technology",
      status: "UPCOMING",
    }
  ];

  for (const item of sampleEvents) {
    // Check if event with same title already exists
    const existing = await Event.findOne({ title: item.title });
    if (existing) {
      console.log(`⏩ Event already exists: ${item.title}`);
      continue;
    }

    console.log(`🧠 Generating AI metadata for: ${item.title}...`);
    let aiMetadata = {};
    try {
      aiMetadata = await analyzeEventMetadata({
        title: item.title,
        description: item.description,
        eventType: item.eventType,
      });
    } catch (err) {
      console.warn("AI metadata extraction fallback used.");
    }

    const newEvent = await Event.create({
      ...item,
      createdBy: mentor._id,
      aiMetadata,
    });

    console.log(`✅ Created event: ${newEvent.title} (ID: ${newEvent._id})`);
  }

  console.log("✨ Seeding completed successfully!");
  process.exit(0);
}

seedEvents().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
