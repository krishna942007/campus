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
import { Goal } from "../src/models/goal.models.js";

async function diagnose() {
  console.log("==========================================");
  console.log("🔍 CAMPUS 1 GOALS DIAGNOSTIC TOOL");
  console.log("==========================================\n");

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";

  await mongoose.connect(uri, { dbName });
  console.log(`Connected to MongoDB host: ${mongoose.connection.host}`);

  // 1. Check Goal collection exists & count
  const collections = await mongoose.connection.db.listCollections().toArray();
  const goalCollectionExists = collections.some(c => c.name === "goals");
  console.log(`\n1. 'goals' collection exists: ${goalCollectionExists}`);

  const totalGoals = await Goal.countDocuments({});
  console.log(`2. Total Goal documents in MongoDB: ${totalGoals}`);

  const allGoals = await Goal.find({}).lean();
  console.log(`\nListing all ${allGoals.length} goals in DB:`);
  for (const g of allGoals) {
    console.log({
      _id: g._id.toString(),
      student: g.student ? g.student.toString() : "NULL",
      title: g.title,
      status: g.status,
      isPrimary: g.isPrimary,
      progress: g.progress,
      milestonesCount: g.roadmap?.length || 0,
      createdAt: g.createdAt
    });
  }

  // 2. Goal Status Distribution
  const activeCount = await Goal.countDocuments({ status: "ACTIVE" });
  const completedCount = await Goal.countDocuments({ status: "COMPLETED" });
  const archivedCount = await Goal.countDocuments({ status: "ARCHIVED" });
  const otherCount = await Goal.countDocuments({ status: { $nin: ["ACTIVE", "COMPLETED", "ARCHIVED"] } });
  console.log(`\nGoal Status Distribution:`);
  console.log(`- ACTIVE: ${activeCount}`);
  console.log(`- COMPLETED: ${completedCount}`);
  console.log(`- ARCHIVED: ${archivedCount}`);
  console.log(`- OTHER / UNKNOWN: ${otherCount}`);

  // 3. List All Students in DB
  const students = await User.find({ role: "STUDENT" }).select("-password -refreshToken").lean();
  console.log(`\nAll Students in MongoDB (${students.length} found):`);
  for (const s of students) {
    const studentGoalCount = await Goal.countDocuments({ student: s._id });
    const activeGoalCount = await Goal.countDocuments({ student: s._id, status: { $ne: "ARCHIVED" } });
    console.log({
      _id: s._id.toString(),
      name: s.name,
      email: s.email,
      rollNo: s.rollNo,
      department: s.department,
      totalGoals: studentGoalCount,
      activeGoals: activeGoalCount
    });
  }

  // 4. Test Student Login Accounts (Default UI Accounts)
  // Usually the student logged in via 3D book or UI quick-fill is 2023CSE001 (Aarav Sharma / 101)
  console.log("\nChecking default demo accounts:");
  const demoRolls = ["2023CSE001", "101", "102", "103"];
  for (const r of demoRolls) {
    const u = await User.findOne({ $or: [{ rollNo: r }, { email: r }] }).lean();
    if (u) {
      const gList = await Goal.find({ student: u._id }).lean();
      console.log(`Demo User [rollNo: ${u.rollNo}, email: ${u.email}, name: ${u.name}, _id: ${u._id}]: has ${gList.length} goals in DB.`);
    } else {
      console.log(`Demo User with identifier '${r}' NOT FOUND in DB.`);
    }
  }

  process.exit(0);
}

diagnose().catch(err => {
  console.error("Diagnostic error:", err);
  process.exit(1);
});
