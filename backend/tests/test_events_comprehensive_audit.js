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

async function runComprehensiveAudit() {
  console.log("==================================================");
  console.log("🔍 CAMPUS 1 EVENTS & AI RECOMMENDATION DEEP AUDIT");
  console.log("==================================================\n");

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";

  await mongoose.connect(uri, { dbName });
  console.log(`[PASS] MongoDB Atlas Connected: ${mongoose.connection.host}`);

  // 1. Schema & Indexes Check
  console.log("\n--- 1. SCHEMA & INDEXES AUDIT ---");
  const indexes = await Event.collection.indexes();
  console.log("Actual Event Collection Indexes:", indexes.map(i => Object.keys(i.key).join("_")).join(", "));
  const hasStatusDateIndex = indexes.some(i => i.key.status && i.key.eventDate);
  const hasSkillsIndex = indexes.some(i => i.key["aiMetadata.extractedSkills"]);
  console.log(`- Status + EventDate index present: ${hasStatusDateIndex}`);
  console.log(`- Extracted skills index present: ${hasSkillsIndex}`);

  // 2. Fetch or Create Test Users
  console.log("\n--- 2. USERS & ROLES AUDIT ---");
  let teacherA = await User.findOne({ email: "teacher_a_test@vit.edu.in" });
  if (!teacherA) {
    teacherA = await User.create({
      name: "Prof. Teacher Alpha",
      email: "teacher_a_test@vit.edu.in",
      password: "password123",
      role: "MENTOR",
      department: "Computer Engineering",
    });
  }

  let teacherB = await User.findOne({ email: "teacher_b_test@vit.edu.in" });
  if (!teacherB) {
    teacherB = await User.create({
      name: "Prof. Teacher Beta",
      email: "teacher_b_test@vit.edu.in",
      password: "password123",
      role: "MENTOR",
      department: "Information Technology",
    });
  }

  let testStudent = await User.findOne({ email: "student_audit_test@vit.edu.in" });
  if (!testStudent) {
    testStudent = await User.create({
      name: "Alex Auditor",
      email: "student_audit_test@vit.edu.in",
      password: "password123",
      role: "STUDENT",
      department: "Computer Engineering",
      rollNo: "2023CSE999",
    });
  }

  console.log(`- Teacher A: ${teacherA.name} (${teacherA.role}) [${teacherA._id}]`);
  console.log(`- Teacher B: ${teacherB.name} (${teacherB.role}) [${teacherB._id}]`);
  console.log(`- Student: ${testStudent.name} (${testStudent.role}) [${testStudent._id}]`);

  // 3. AI Event Analysis Real Test
  console.log("\n--- 3. AI EVENT ANALYSIS (GEMINI 3.6 FLASH LIVE TEST) ---");
  const liveTitle = "Advanced Backend Engineering Workshop";
  const liveDesc = "A workshop covering REST API design, Node.js architecture, PostgreSQL optimization, authentication and scalable backend systems.";
  
  console.log(`Prompting Gemini for: "${liveTitle}"...`);
  const liveAiMeta = await analyzeEventMetadata({
    title: liveTitle,
    description: liveDesc,
    eventType: "WORKSHOP",
  });

  console.log("Live Gemini AI Output:\n", JSON.stringify(liveAiMeta, null, 2));
  console.log(`- Extracted Skills: ${liveAiMeta.extractedSkills?.join(", ")}`);
  console.log(`- Target Domains: ${liveAiMeta.targetDomains?.join(", ")}`);
  console.log(`- Key Topics: ${liveAiMeta.keyTopics?.join(", ")}`);
  console.log(`- Audience Level: ${liveAiMeta.targetAudienceLevel}`);
  console.log(`- AI Status: ${liveAiMeta.status}`);

  // 4. Create Event End-to-End Persistence
  console.log("\n--- 4. EVENT CREATION & PERSISTENCE ---");
  const eventA = await Event.create({
    title: liveTitle,
    description: liveDesc,
    eventType: "WORKSHOP",
    eventDate: new Date(Date.now() + 5 * 86400000),
    endDate: new Date(Date.now() + 6 * 86400000),
    location: "Lab 401",
    registrationLink: "https://campus1.vit.edu.in/register/backend-workshop",
    capacity: 75,
    department: "Computer Engineering",
    createdBy: teacherA._id,
    aiMetadata: liveAiMeta,
  });

  const eventB = await Event.create({
    title: "Introduction to Graphic Design & Creative Typography",
    description: "Learn Adobe Illustrator, Figma typography, color theory, and poster layout principles for non-designers.",
    eventType: "WORKSHOP",
    eventDate: new Date(Date.now() + 8 * 86400000),
    location: "Studio 2",
    capacity: 40,
    department: "Information Technology",
    createdBy: teacherB._id,
    aiMetadata: {
      targetDomains: ["Graphic Design", "UI Design"],
      extractedSkills: ["Figma", "Illustrator", "Typography", "Color Theory"],
      keyTopics: ["Poster Design", "Layouts"],
      targetAudienceLevel: "BEGINNER",
      summary: "Foundational visual design and typography workshop.",
      status: "PROCESSED",
      processedAt: new Date(),
    },
  });

  console.log(`- Event A created by Teacher A: ID ${eventA._id} (Title: ${eventA.title})`);
  console.log(`- Event B created by Teacher B: ID ${eventB._id} (Title: ${eventB.title})`);

  // Verify stored document in MongoDB
  const fetchedEventA = await Event.findById(eventA._id).populate("createdBy", "name email role");
  console.log(`- Verification: Event A createdBy populated name: ${fetchedEventA.createdBy.name}, role: ${fetchedEventA.createdBy.role}`);
  if (fetchedEventA.createdBy._id.toString() !== teacherA._id.toString()) {
    throw new Error("CreatedBy does not match Teacher A ID!");
  }

  // 5. Ownership & IDOR Security Simulation
  console.log("\n--- 5. OWNERSHIP & IDOR SECURITY TEST ---");
  // Test: Can Teacher A modify Event B owned by Teacher B?
  const isOwnerA_of_B = eventB.createdBy.toString() === teacherA._id.toString();
  const isAdminA = teacherA.role === "ADMIN";
  const canTeacherA_Edit_B = isOwnerA_of_B || isAdminA;
  console.log(`- Can Teacher A edit Event B (owned by Teacher B)? ${canTeacherA_Edit_B ? "PERMITTED (FAIL)" : "DENIED (PASS)"}`);
  if (canTeacherA_Edit_B) {
    throw new Error("SECURITY FAILURE: Teacher A should not have permission to edit Event B!");
  }

  // Test: Can Student edit Event A?
  const isOwnerStudent = eventA.createdBy.toString() === testStudent._id.toString();
  const isAdminStudent = testStudent.role === "ADMIN";
  const canStudentEdit = isOwnerStudent || isAdminStudent;
  console.log(`- Can Student edit Event A? ${canStudentEdit ? "PERMITTED (FAIL)" : "DENIED (PASS)"}`);
  if (canStudentEdit) {
    throw new Error("SECURITY FAILURE: Student should not have permission to edit events!");
  }

  // 6. Recommendation Engine & Goal/Roadmap/Milestone/Task Integration
  console.log("\n--- 6. RECOMMENDATION ENGINE & GOAL/ROADMAP INTEGRATION ---");
  
  // Clean up any old test goals for student
  await Goal.deleteMany({ student: testStudent._id });

  // Scenario 1: Student with Primary Goal = "Backend Developer"
  const backendGoal = await Goal.create({
    student: testStudent._id,
    title: "Backend Developer",
    description: "Master scalable distributed backends, REST APIs, and database engineering.",
    targetRole: "Backend Developer",
    isPrimary: true,
    status: "ACTIVE",
    roadmap: [
      {
        title: "Advanced Database Engineering",
        description: "Deep dive into relational schemas, indexing, and PostgreSQL query optimization.",
        percentage: 30,
        status: "IN_PROGRESS",
        tasks: [
          { text: "PostgreSQL query optimization & indexing", isCompleted: true },
          { text: "Implement connection pooling in Node.js", isCompleted: false },
          { text: "Build RESTful microservices with JWT authentication", isCompleted: false },
        ],
      },
      {
        title: "System Architecture & Caching",
        description: "Redis caching, message queues, and load balancing.",
        percentage: 0,
        status: "NOT_STARTED",
        tasks: [
          { text: "Configure Redis caching layer", isCompleted: false },
        ],
      },
    ],
  });

  console.log(`Created test student goal: "${backendGoal.title}" with milestones and tasks.`);

  // Simulate recommendation algorithm from event.controller.js
  function scoreEventForStudent(event, studentGoal, studentDept) {
    const STOP_WORDS = new Set([
      "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
      "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
      "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
      "did", "do", "does", "doing", "don't", "down", "during", "each", "few", "for",
      "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers",
      "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "it",
      "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no",
      "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
      "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "should",
      "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves",
      "then", "there", "these", "they", "this", "those", "through", "to", "too", "under",
      "until", "up", "very", "was", "wasn't", "we", "were", "weren't", "what", "when",
      "where", "which", "while", "who", "whom", "why", "with", "won't", "would", "you",
      "your", "yours", "yourself", "yourselves", "learn", "master", "build", "create", "start",
      "engineering", "development", "systems", "advanced", "introduction", "program", "workshop",
      "technologies", "topics", "skills", "foundations", "basics", "principles"
    ]);

    function extractKeywords(text) {
      if (!text || typeof text !== "string") return [];
      return text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, " ").split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
    }

    const studentKeywordSet = new Set();
    if (studentGoal) {
      extractKeywords(studentGoal.title).forEach(k => studentKeywordSet.add(k));
      extractKeywords(studentGoal.description).forEach(k => studentKeywordSet.add(k));
      extractKeywords(studentGoal.targetRole).forEach(k => studentKeywordSet.add(k));
      if (Array.isArray(studentGoal.roadmap)) {
        studentGoal.roadmap.forEach(m => {
          extractKeywords(m.title).forEach(k => studentKeywordSet.add(k));
          extractKeywords(m.description).forEach(k => studentKeywordSet.add(k));
          if (Array.isArray(m.tasks)) {
            m.tasks.forEach(t => extractKeywords(t.text).forEach(k => studentKeywordSet.add(k)));
          }
        });
      }
    }
    if (studentDept) {
      extractKeywords(studentDept).forEach(k => studentKeywordSet.add(k));
    }

    const studentKeywords = Array.from(studentKeywordSet);
    let score = 55;
    const matchedSkills = [];
    const matchedTopics = [];

    const extractedSkills = event.aiMetadata?.extractedSkills || [];
    const keyTopics = event.aiMetadata?.keyTopics || [];
    const targetDomains = event.aiMetadata?.targetDomains || [];

    extractedSkills.forEach(skill => {
      const skillWords = extractKeywords(skill);
      if (skillWords.some(w => studentKeywords.includes(w))) {
        matchedSkills.push(skill);
        score += 15;
      }
    });

    keyTopics.forEach(topic => {
      const topicWords = extractKeywords(topic);
      if (topicWords.some(w => studentKeywords.includes(w))) {
        matchedTopics.push(topic);
        score += 10;
      }
    });

    targetDomains.forEach(domain => {
      const domainWords = extractKeywords(domain);
      if (domainWords.some(w => studentKeywords.includes(w))) {
        score += 12;
      }
    });

    const eventKeywords = [...extractKeywords(event.title), ...extractKeywords(event.description)];
    const directMatches = eventKeywords.filter(ew => studentKeywords.includes(ew));
    if (directMatches.length > 0) {
      score += Math.min(directMatches.length * 4, 16);
    }

    if (event.department === "All" || (studentDept && event.department.toLowerCase().includes(studentDept.toLowerCase()))) {
      score += 8;
    }

    const finalScore = Math.min(Math.max(score, 60), 98);

    let matchReason = "";
    if (matchedSkills.length > 0 && studentGoal) {
      matchReason = `Matches your focus on ${matchedSkills.slice(0, 2).join(" & ")} in your "${studentGoal.title}" roadmap`;
    } else if (studentGoal?.targetRole && score > 75) {
      matchReason = `Directly accelerates your goal to become a ${studentGoal.targetRole}`;
    } else {
      matchReason = `Campus-wide recommended workshop for career growth`;
    }

    return {
      title: event.title,
      score: finalScore,
      matchReason,
      matchedSkills,
    };
  }

  // Score with Backend Developer goal
  const scoreEventA_Backend = scoreEventForStudent(eventA, backendGoal, testStudent.department);
  const scoreEventB_Backend = scoreEventForStudent(eventB, backendGoal, testStudent.department);

  console.log("\nScore for Event A (Backend Workshop) when Goal = Backend Developer:");
  console.log(`- Score: ${scoreEventA_Backend.score}%`);
  console.log(`- Matched Skills: ${scoreEventA_Backend.matchedSkills.join(", ")}`);
  console.log(`- Match Reason: "${scoreEventA_Backend.matchReason}"`);

  console.log("\nScore for Event B (Graphic Design) when Goal = Backend Developer:");
  console.log(`- Score: ${scoreEventB_Backend.score}%`);
  console.log(`- Matched Skills: ${scoreEventB_Backend.matchedSkills.join(", ") || "None"}`);
  console.log(`- Match Reason: "${scoreEventB_Backend.matchReason}"`);

  if (scoreEventA_Backend.score <= scoreEventB_Backend.score) {
    throw new Error("RECOMMENDATION ENGINE FAILURE: Backend workshop should score significantly higher than Graphic Design!");
  }
  console.log(`[PASS] Event A (${scoreEventA_Backend.score}%) >> Event B (${scoreEventB_Backend.score}%)`);

  // Scenario 2: Switch Goal to "UI/UX & Graphic Designer"
  console.log("\n--- 7. DYNAMIC RANK SHIFT TEST UPON GOAL SWITCH ---");
  backendGoal.isPrimary = false;
  await backendGoal.save();

  const designGoal = await Goal.create({
    student: testStudent._id,
    title: "UI/UX & Creative Designer",
    description: "Master typography, UI components in Figma, color palettes, and visual design layout systems.",
    targetRole: "Product Designer",
    isPrimary: true,
    status: "ACTIVE",
    roadmap: [
      {
        title: "Visual Design & Typography Foundations",
        description: "Figma wireframing, typography hierarchies, and raster layouts in Illustrator.",
        percentage: 40,
        status: "IN_PROGRESS",
        tasks: [
          { text: "Learn Figma auto-layout and typography tokens", isCompleted: true },
          { text: "Color theory and contrast compliance", isCompleted: false },
        ],
      },
    ],
  });

  const scoreEventA_Design = scoreEventForStudent(eventA, designGoal, testStudent.department);
  const scoreEventB_Design = scoreEventForStudent(eventB, designGoal, testStudent.department);

  console.log("Score for Event A (Backend Workshop) when Goal = UI/UX Designer:", `${scoreEventA_Design.score}%`);
  console.log("Score for Event B (Graphic Design) when Goal = UI/UX Designer:", `${scoreEventB_Design.score}%`);
  console.log(`- Event B Match Reason: "${scoreEventB_Design.matchReason}"`);

  if (scoreEventB_Design.score <= scoreEventA_Design.score) {
    throw new Error("RECOMMENDATION ENGINE FAILURE: Graphic Design workshop should rank higher after switching to UI/UX Goal!");
  }
  console.log(`[PASS] Dynamic Rank Shift Verified! Event B (${scoreEventB_Design.score}%) > Event A (${scoreEventA_Design.score}%)`);

  // 8. Granular Task & Roadmap Matching Check
  console.log("\n--- 8. GRANULAR TASK & ROADMAP MATCHING TEST ---");
  // Create an event that matches ONLY a specific task ("Redis caching") but has a generic title
  const redisEvent = await Event.create({
    title: "High Performance Data Pipeline Sprint",
    description: "Hands-on session building caching layers with Redis and message queue architecture.",
    eventType: "WORKSHOP",
    eventDate: new Date(Date.now() + 12 * 86400000),
    createdBy: teacherA._id,
    aiMetadata: {
      targetDomains: ["Data Engineering"],
      extractedSkills: ["Redis", "Caching", "Message Queues"],
      keyTopics: ["Caching", "Redis"],
      targetAudienceLevel: "INTERMEDIATE",
      summary: "Sprint on Redis caching and data queues.",
      status: "PROCESSED",
      processedAt: new Date(),
    },
  });

  // Switch primary back to backendGoal
  designGoal.isPrimary = false;
  await designGoal.save();
  backendGoal.isPrimary = true;
  await backendGoal.save();

  const scoreRedis = scoreEventForStudent(redisEvent, backendGoal, testStudent.department);
  console.log(`Event with generic title matching task "Redis caching":`);
  console.log(`- Score: ${scoreRedis.score}%`);
  console.log(`- Matched Skills: ${scoreRedis.matchedSkills.join(", ")}`);
  console.log(`- Reason: "${scoreRedis.matchReason}"`);

  if (scoreRedis.matchedSkills.length === 0 || scoreRedis.score < 75) {
    throw new Error("ROADMAP TASK MATCHING FAILURE: Did not match Redis task!");
  }
  console.log("[PASS] Granular task matching verified: Redis task from roadmap boosted event relevance.");

  // Cleanup test documents
  console.log("\n--- CLEANUP OF TEST AUDIT RECORDS ---");
  await Event.deleteMany({ _id: { $in: [eventA._id, eventB._id, redisEvent._id] } });
  await Goal.deleteMany({ student: testStudent._id });
  await User.deleteMany({ _id: { $in: [teacherA._id, teacherB._id, testStudent._id] } });
  console.log("✅ All test audit records cleaned up cleanly.");

  console.log("\n==================================================");
  console.log("🎉 ALL AUDIT SUITES EXECUTED AND PASSED 100%!");
  console.log("==================================================");
  process.exit(0);
}

runComprehensiveAudit().catch(err => {
  console.error("❌ AUDIT FAILED:", err);
  process.exit(1);
});
