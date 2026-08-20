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

async function addSimpleUsers() {
  console.log("🌱 Connecting to MongoDB Atlas...");
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";

  if (!uri) {
    console.error("❌ MONGODB_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName });
  console.log(`Connected to: ${mongoose.connection.host}`);

  const simpleUsers = [
    {
      name: "Student One",
      rollNo: "101",
      email: "student1@vit.edu.in",
      password: "pass1",
      role: "STUDENT",
      department: "Computer Engineering",
      cgpa: 0.0,
      attendancePercentage: 100.0,
      semester: 1,
    },
    {
      name: "Student Two",
      rollNo: "102",
      email: "student2@vit.edu.in",
      password: "pass2",
      role: "STUDENT",
      department: "Computer Engineering",
      cgpa: 0.0,
      attendancePercentage: 100.0,
      semester: 1,
    },
    {
      name: "Student Three",
      rollNo: "103",
      email: "student3@vit.edu.in",
      password: "pass3",
      role: "STUDENT",
      department: "Information Technology",
      cgpa: 0.0,
      attendancePercentage: 100.0,
      semester: 1,
    },
    {
      name: "Teacher One",
      rollNo: "T101",
      email: "teacher1@vit.edu.in",
      password: "pass4",
      role: "MENTOR",
      department: "Computer Engineering",
      designation: "Assistant Professor",
    },
    {
      name: "Teacher Two",
      rollNo: "T102",
      email: "teacher2@vit.edu.in",
      password: "pass5",
      role: "MENTOR",
      department: "Information Technology",
      designation: "Assistant Professor",
    }
  ];

  console.log("📝 Adding 5 simple accounts...");
  for (const u of simpleUsers) {
    // Delete if already exists to avoid duplicates
    await User.deleteOne({ email: u.email });
    await User.create(u);
    console.log(`✅ Created: ${u.email} | Roll/ID: ${u.rollNo} | Pass: ${u.password} | Role: ${u.role}`);
  }

  console.log("\n✨ 5 Simple accounts created successfully!");
  process.exit(0);
}

addSimpleUsers().catch(err => {
  console.error("❌ Failed to add simple users:", err);
  process.exit(1);
});
