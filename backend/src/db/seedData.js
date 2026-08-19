import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {}

import { User } from "../models/user.models.js";
import { Assignment } from "../models/assignment.models.js";
import { Attendance } from "../models/attendance.models.js";
import { OnlineCourse } from "../models/onlineCourse.models.js";
import { MentorRequest } from "../models/mentorRequest.models.js";
import { Meeting } from "../models/meeting.models.js";

async function seed() {
  console.log("🌱 Starting Database Seeding on MongoDB Atlas...");
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";

  if (!uri) {
    console.error("❌ MONGODB_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName });
  console.log(`Connected to MongoDB Host: ${mongoose.connection.host}`);

  // Clear existing collections
  console.log("🧹 Clearing old mock records...");
  await User.deleteMany({});
  await Assignment.deleteMany({});
  await Attendance.deleteMany({});
  await OnlineCourse.deleteMany({});
  await MentorRequest.deleteMany({});
  await Meeting.deleteMany({});

  const DEFAULT_PASSWORD = "password123";

  // 1. ADMINS
  console.log("👤 Creating Admins...");
  const adminsData = [
    {
      name: "Dr. Rajesh Sharma",
      email: "admin@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "ADMIN",
      department: "Dean Office & Institutional Quality",
      designation: "Dean of Academics",
    },
    {
      name: "Prof. Sneha Patil",
      email: "examcell@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "ADMIN",
      department: "Examination & Evaluation Cell",
      designation: "Controller of Examinations",
    }
  ];

  const admins = [];
  for (const a of adminsData) {
    const admin = await User.create(a);
    admins.push(admin);
  }

  // 2. TEACHERS / FACULTY MENTORS
  console.log("👨‍🏫 Creating Faculty Mentors (Teachers)...");
  const mentorsData = [
    {
      name: "Prof. Sameer Kulkarni",
      email: "s.kulkarni@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "MENTOR",
      department: "Computer Engineering",
      designation: "Associate Professor & Head of AI Lab",
      domainExpertise: ["Artificial Intelligence", "Deep Learning", "Natural Language Processing", "Autonomous Systems"],
    },
    {
      name: "Dr. Priya Sharma",
      email: "p.sharma@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "MENTOR",
      department: "Computer Engineering",
      designation: "Professor & Research Chair",
      domainExpertise: ["Computer Vision", "Medical Image Processing", "Generative AI", "Pattern Recognition"],
    },
    {
      name: "Prof. Amit Deshmukh",
      email: "a.deshmukh@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "MENTOR",
      department: "Information Technology",
      designation: "Assistant Professor",
      domainExpertise: ["Cloud Computing", "Kubernetes", "DevOps & SRE", "Distributed Systems"],
    },
    {
      name: "Dr. Neha Verma",
      email: "n.verma@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "MENTOR",
      department: "Computer Engineering",
      designation: "Associate Professor",
      domainExpertise: ["Cyber Security", "Blockchain & Web3", "Applied Cryptography", "Network Security"],
    },
    {
      name: "Prof. Rahul Gupta",
      email: "r.gupta@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "MENTOR",
      department: "AI & Data Science",
      designation: "Assistant Professor",
      domainExpertise: ["Full Stack Development", "High Performance Systems", "Data Science Pipelines"],
    }
  ];

  const mentors = [];
  for (const m of mentorsData) {
    const mentor = await User.create(m);
    mentors.push(mentor);
  }

  // 3. STUDENTS
  console.log("🎓 Creating Students...");
  const studentsData = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "Computer Engineering",
      rollNo: "2023CSE001",
      cgpa: 8.92,
      attendancePercentage: 91.4,
      semester: 4,
    },
    {
      name: "Ananya Iyer",
      email: "ananya.iyer@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "Computer Engineering",
      rollNo: "2023CSE015",
      cgpa: 9.45,
      attendancePercentage: 96.2,
      semester: 4,
    },
    {
      name: "Rohan Patel",
      email: "rohan.patel@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "Computer Engineering",
      rollNo: "2023CSE042",
      cgpa: 7.68,
      attendancePercentage: 71.5, // Attendance Warning (65-74% bracket)
      semester: 4,
    },
    {
      name: "Sneha Reddy",
      email: "sneha.reddy@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "Information Technology",
      rollNo: "2022IT078",
      cgpa: 9.10,
      attendancePercentage: 88.0,
      semester: 6,
    },
    {
      name: "Vikram Singh",
      email: "vikram.singh@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "Computer Engineering",
      rollNo: "2022CSE104",
      cgpa: 6.40,
      attendancePercentage: 62.0, // Detention Warning (<65%)
      semester: 6,
    },
    {
      name: "Diya Mehta",
      email: "diya.mehta@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "AI & Data Science",
      rollNo: "2023AIDS020",
      cgpa: 8.75,
      attendancePercentage: 94.0,
      semester: 4,
    },
    {
      name: "Karan Malhotra",
      email: "karan.malhotra@vit.edu.in",
      password: DEFAULT_PASSWORD,
      role: "STUDENT",
      department: "Computer Engineering",
      rollNo: "2023CSE055",
      cgpa: 8.20,
      attendancePercentage: 84.5,
      semester: 4,
    }
  ];

  const students = [];
  for (const s of studentsData) {
    const student = await User.create(s);
    students.push(student);
  }

  // 4. ASSIGNMENTS
  console.log("📝 Seeding Course Assignments...");
  const assignmentsData = [
    {
      courseCode: "CS501",
      courseTitle: "Applied Deep Learning & Neural Architectures",
      mentor: mentors[0]._id, // Prof. Sameer Kulkarni
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: "Implement a Vision Transformer (ViT) architecture from scratch in PyTorch on CIFAR-100 dataset.",
      maxMarks: 100
    },
    {
      courseCode: "CS502",
      courseTitle: "Advanced Distributed Database Systems",
      mentor: mentors[2]._id, // Prof. Amit Deshmukh
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      description: "Design a Raft consensus cluster with Byzantine fault tolerance simulation in Go / Python.",
      maxMarks: 100
    },
    {
      courseCode: "CS503",
      courseTitle: "Autonomous Systems & Computer Vision",
      mentor: mentors[1]._id, // Dr. Priya Sharma
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      description: "Build 3D LiDAR point cloud semantic segmentation using PointNet++ with TensorRT acceleration.",
      maxMarks: 100
    }
  ];
  await Assignment.insertMany(assignmentsData);

  // 5. ONLINE COURSES RECOMMENDED BY MENTORS
  console.log("🌐 Seeding Online Courses...");
  const onlineCoursesData = [
    {
      title: "CS229: Machine Learning by Stanford University",
      platform: "Stanford Online",
      url: "https://online.stanford.edu/courses/cs229-machine-learning",
      category: "Artificial Intelligence",
      difficulty: "Advanced",
      mentor: mentors[0]._id,
      student: students[0]._id,
      guidanceNotes: "Focus on Optimization theorems and backpropagation derivation."
    },
    {
      title: "CS231n: Deep Learning for Computer Vision",
      platform: "Stanford OCW",
      url: "https://cs231n.stanford.edu/",
      category: "Computer Vision",
      difficulty: "Advanced",
      mentor: mentors[1]._id,
      student: students[0]._id,
      guidanceNotes: "Study Convolutional architectures and spatial attention mechanisms."
    },
    {
      title: "Distributed Systems & Cloud Architecture (MIT 6.824)",
      platform: "MIT OpenCourseWare",
      url: "https://pdos.csail.mit.edu/6.824/",
      category: "Distributed Systems",
      difficulty: "Advanced",
      mentor: mentors[2]._id,
      student: students[1]._id,
      guidanceNotes: "Complete Lab 2 on Raft consensus algorithm implementation."
    }
  ];
  await OnlineCourse.insertMany(onlineCoursesData);

  // 6. MENTORSHIP REQUESTS & MATCHES
  console.log("🤝 Seeding Mentorship Connections & Match Scores...");
  await MentorRequest.create({
    student: students[0]._id, // Aarav Sharma
    mentor: mentors[0]._id,  // Prof. Sameer Kulkarni
    status: "ACCEPTED",
    matchScore: 96,
    matchReason: "High domain synergy between student goals (Generative AI research) and faculty mentor specialization (Deep Learning, NLP).",
    goals: "Targeting top tier AI Research Engineer roles and publishing IEEE conference paper."
  });

  await MentorRequest.create({
    student: students[1]._id, // Ananya Iyer
    mentor: mentors[1]._id,  // Dr. Priya Sharma
    status: "ACCEPTED",
    matchScore: 94,
    matchReason: "Strong alignment in Computer Vision and Medical Imaging diagnostics capstone.",
    goals: "Direct PhD admissions and top conference publication."
  });

  await MentorRequest.create({
    student: students[2]._id, // Rohan Patel
    mentor: mentors[0]._id,  // Prof. Sameer Kulkarni
    status: "PENDING",
    matchScore: 88,
    matchReason: "Seeking academic recovery plan for attendance condonation and Sem IV coursework.",
    goals: "Bring attendance above 75% cutoff and improve CGPA to >8.0."
  });

  // 7. 1-ON-1 SCHEDULED MEETINGS
  console.log("📅 Seeding Mentorship Meetings...");
  await Meeting.create({
    student: students[0]._id,
    mentor: mentors[0]._id,
    title: "Capstone Milestone 2 Review & Stanford CS229 Sync",
    agenda: "Review Semester IV Capstone Milestone 2 and Stanford CS229 progress.",
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    meetingLink: "https://meet.google.com/vit-ai-kulkarni",
    status: "SCHEDULED",
    notes: "Bring draft architecture diagram of Vision Transformer on CIFAR-100."
  });

  await Meeting.create({
    student: students[1]._id,
    mentor: mentors[1]._id,
    title: "Medical Image Segmentation IEEE Conference Draft",
    agenda: "Discuss Medical Image Segmentation IEEE conference paper draft.",
    scheduledAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    meetingLink: "https://meet.google.com/vit-sharma-research",
    status: "SCHEDULED",
    notes: "Review ablation study results comparing UNet++ vs Swin-UNETR."
  });

  console.log("\n==========================================================");
  console.log("✨ MONGODB DATABASE SEEDED SUCCESSFULLY WITH FULL DATA!");
  console.log("==========================================================");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
