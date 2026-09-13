import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

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

async function testApi() {
  console.log("==========================================");
  console.log("🌐 TESTING GET /api/v1/student/goals API");
  console.log("==========================================\n");

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "vitara";
  await mongoose.connect(uri, { dbName });

  const BASE_URL = "http://localhost:5000/api/v1";

  // 1. Call GET /student/goals WITHOUT AUTH
  console.log("Test 1: Calling GET /student/goals without auth token...");
  try {
    const res = await axios.get(`${BASE_URL}/student/goals`);
    console.log("Response:", res.status, res.data);
  } catch (err) {
    console.log(`[EXPECTED 401] Response status: ${err.response?.status}, message: "${err.response?.data?.message}"`);
  }

  // 2. Login as Aarav Sharma (2023CSE001)
  console.log("\nTest 2: Logging in as Aarav Sharma (2023CSE001)...");
  let aaravToken = "";
  let aaravCookie = "";
  try {
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      rollNo: "2023CSE001",
      password: "password123",
      role: "STUDENT"
    });
    console.log(`Login status: ${loginRes.status}, User: ${loginRes.data?.data?.user?.name} (ID: ${loginRes.data?.data?.user?._id})`);
    aaravToken = loginRes.data?.data?.accessToken;
    aaravCookie = loginRes.headers['set-cookie'] ? loginRes.headers['set-cookie'].join('; ') : '';
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
  }

  // 3. Call GET /student/goals WITH Aarav's Token / Cookie
  if (aaravToken || aaravCookie) {
    console.log("\nTest 3: Calling GET /student/goals with Aarav's credentials...");
    try {
      const goalsRes = await axios.get(`${BASE_URL}/student/goals`, {
        headers: {
          Authorization: `Bearer ${aaravToken}`,
          Cookie: aaravCookie
        }
      });
      console.log(`Status: ${goalsRes.status}`);
      console.log(`Success: ${goalsRes.data?.success}`);
      console.log(`Message: "${goalsRes.data?.message}"`);
      console.log(`Goals returned count: ${goalsRes.data?.data?.length}`);
      if (goalsRes.data?.data?.length > 0) {
        goalsRes.data.data.forEach((g, i) => {
          console.log(`  Goal [${i + 1}]: "${g.title}" (isPrimary: ${g.isPrimary}, progress: ${g.progress}%, milestones: ${g.roadmap?.length})`);
        });
      }
    } catch (err) {
      console.error("GET /student/goals failed:", err.response?.data || err.message);
    }
  }

  // 4. Check if there are other students like 101, 102, or student1@vit.edu.in
  console.log("\nTest 4: Checking student1@vit.edu.in / rollNo 101...");
  try {
    const login101 = await axios.post(`${BASE_URL}/auth/login`, {
      rollNo: "101",
      password: "pass1",
      role: "STUDENT"
    });
    console.log("101 Login:", login101.status, login101.data?.data?.user?.name);
    const token101 = login101.data?.data?.accessToken;
    const goals101 = await axios.get(`${BASE_URL}/student/goals`, {
      headers: { Authorization: `Bearer ${token101}` }
    });
    console.log(`Goals for user 101: ${goals101.data?.data?.length}`);
  } catch (err) {
    console.log(`User 101 check result: ${err.response?.status} - ${err.response?.data?.message || err.message}`);
  }

  process.exit(0);
}

testApi().catch(err => {
  console.error("Test API error:", err);
  process.exit(1);
});
