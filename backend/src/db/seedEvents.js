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
      title: "Indian Armed Forces Technical & Aviation Entry Orientation",
      description: "Specialized orientation on Indian Air Force (AFCAT, CDS, NDA Technical Entry) pilot training requirements, SSB interview preparation, avionics systems, flight physics, and psychological endurance standards with veteran Wing Commanders.",
      eventType: "SEMINAR",
      eventDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      location: "Main Auditorium & Defense Aptitude Center",
      registrationLink: "https://campus1.vit.edu.in/events/defense-aviation",
      capacity: 200,
      department: "All",
      status: "UPCOMING",
      aiMetadata: {
        targetDomains: ["Defense & Aviation", "Aerospace Engineering", "Avionics", "SSB Preparation"],
        extractedSkills: ["Flight Dynamics", "Aviation Meteorology", "SSB Interview Techniques", "Physical Endurance", "Avionics & Radar", "Pilot Aptitude"],
        keyTopics: ["AFCAT & CDS Technical Syllabus", "Flight Navigation", "Aircraft Systems & Avionics", "Psychological Screening"],
        targetAudienceLevel: "ALL",
        summary: "Comprehensive career orientation for students aiming for Indian Air Force pilot, technical officers, and aerospace engineering defense roles.",
        status: "PROCESSED"
      }
    },
    {
      title: "Generative AI & LLM Systems Hands-On Bootcamp",
      description: "Comprehensive 2-day deep dive into building Retrieval-Augmented Generation (RAG) pipelines, fine-tuning open-source models with LoRA, and deploying production LLMs using PyTorch and Hugging Face.",
      eventType: "WORKSHOP",
      eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: "Auditorium Hall A & AI Lab 302",
      registrationLink: "https://campus1.vit.edu.in/events/genai-bootcamp",
      capacity: 120,
      department: "Computer Engineering",
      status: "UPCOMING",
      aiMetadata: {
        targetDomains: ["Artificial Intelligence", "Machine Learning", "Natural Language Processing"],
        extractedSkills: ["PyTorch", "LoRA Fine-tuning", "RAG Pipelines", "Hugging Face", "Vector Databases", "Prompt Engineering"],
        keyTopics: ["Transformer Architecture", "Embedding Models", "LangChain & LlamaIndex", "Production LLM Serving"],
        targetAudienceLevel: "INTERMEDIATE",
        summary: "Hands-on engineering workshop on fine-tuning and deploying large language models with vector databases.",
        status: "PROCESSED"
      }
    },
    {
      title: "Campus Hackathon 2026: Scalable Cloud & Full-Stack Systems",
      description: "36-hour flagship hackathon focused on architecting resilient microservices, high-throughput backend APIs with Node.js, React frontend dashboards, and Docker/Kubernetes cloud orchestration.",
      eventType: "HACKATHON",
      eventDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      location: "Central Computing Center",
      registrationLink: "https://campus1.vit.edu.in/hackathon-2026",
      capacity: 250,
      department: "All",
      status: "UPCOMING",
      aiMetadata: {
        targetDomains: ["Cloud Computing", "Fullstack Development", "Distributed Systems"],
        extractedSkills: ["React", "TypeScript", "Node.js", "Docker", "Kubernetes", "REST APIs", "Microservices"],
        keyTopics: ["Scalable Architecture", "Container Orchestration", "Real-Time WebSockets", "Cloud Deployment"],
        targetAudienceLevel: "INTERMEDIATE",
        summary: "Flagship 36-hour campus hackathon for building fullstack production systems.",
        status: "PROCESSED"
      }
    },
    {
      title: "Mastering Data Structures & System Design for Tier-1 Tech",
      description: "Exclusive guest lecture and interactive problem-solving session with senior engineering leaders from Google and Microsoft covering distributed caching, graph algorithms, and system design interviews.",
      eventType: "GUEST_LECTURE",
      eventDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      location: "Seminar Hall 1",
      registrationLink: "https://campus1.vit.edu.in/seminar/dsa-tier1",
      capacity: 180,
      department: "Computer Engineering",
      status: "UPCOMING",
      aiMetadata: {
        targetDomains: ["Software Engineering", "Algorithms", "System Architecture"],
        extractedSkills: ["Data Structures & Algorithms", "System Design", "Dynamic Programming", "Distributed Systems", "Concurrency"],
        keyTopics: ["FAANG Interview Strategies", "Scalable Database Sharding", "Caching with Redis", "CAP Theorem"],
        targetAudienceLevel: "ALL",
        summary: "Industry masterclass on algorithmic problem solving and high-scale system design.",
        status: "PROCESSED"
      }
    },
    {
      title: "Computer Vision & Autonomous Robotics Workshop",
      description: "Hands-on experience with OpenCV, YOLOv8 object detection, sensor fusion, and ROS2 for robotic navigation and real-time vision processing on embedded edge devices.",
      eventType: "WORKSHOP",
      eventDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      location: "Robotics & Embedded Systems Lab",
      registrationLink: "https://campus1.vit.edu.in/workshops/cv-robotics",
      capacity: 80,
      department: "Information Technology",
      status: "UPCOMING",
      aiMetadata: {
        targetDomains: ["Robotics", "Computer Vision", "Embedded Systems"],
        extractedSkills: ["OpenCV", "YOLOv8", "ROS2", "Python", "Sensor Fusion", "Edge AI"],
        keyTopics: ["Object Tracking", "Simultaneous Localization and Mapping (SLAM)", "Autonomous Navigation"],
        targetAudienceLevel: "INTERMEDIATE",
        summary: "Practical laboratory workshop building real-time vision processing and obstacle avoidance robots.",
        status: "PROCESSED"
      }
    },
    {
      title: "Aerospace Avionics & Satellite Systems Symposium",
      description: "Technical symposium exploring telemetry, satellite communication protocols, flight computers, and aerospace navigation algorithms in collaboration with ISRO & DRDO scientists.",
      eventType: "SEMINAR",
      eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      location: "Vikram Sarabhai Conference Center",
      registrationLink: "https://campus1.vit.edu.in/events/aerospace-symposium",
      capacity: 150,
      department: "Electronics & Telecommunication",
      status: "UPCOMING",
      aiMetadata: {
        targetDomains: ["Aerospace", "Telecommunications", "Avionics"],
        extractedSkills: ["Telemetry Systems", "Satellite Communication", "Signal Processing", "Flight Control Systems"],
        keyTopics: ["Orbital Mechanics", "Embedded Avionics", "Defense Electronics"],
        targetAudienceLevel: "INTERMEDIATE",
        summary: "Symposium covering cutting-edge avionics, flight control software, and satellite telecommunications.",
        status: "PROCESSED"
      }
    }
  ];

  // Upsert all events
  for (const item of sampleEvents) {
    const existing = await Event.findOne({ title: item.title });
    if (existing) {
      existing.description = item.description;
      existing.eventType = item.eventType;
      existing.eventDate = item.eventDate;
      existing.endDate = item.endDate;
      existing.location = item.location;
      existing.registrationLink = item.registrationLink;
      existing.capacity = item.capacity;
      existing.department = item.department;
      existing.status = item.status;
      existing.aiMetadata = item.aiMetadata;
      await existing.save();
      console.log(`🔄 Updated event: ${item.title}`);
    } else {
      const newEvent = await Event.create({
        ...item,
        createdBy: mentor._id,
      });
      console.log(`✅ Created event: ${newEvent.title} (ID: ${newEvent._id})`);
    }
  }

  console.log("✨ Seeding completed successfully!");
  process.exit(0);
}

seedEvents().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
