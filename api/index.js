import dotenv from "dotenv";
import { app } from "../backend/src/app.js";
import connectDB from "../backend/src/db/index.js";

// Load environment variables in serverless context
dotenv.config({ quiet: true });

// Cache database connection across serverless function warm executions
let isConnected = false;

const ensureDBConnected = async () => {
  if (!isConnected && process.env.MONGODB_URI) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("Serverless MongoDB connection warning:", err.message || err);
    }
  }
};

export default async function handler(req, res) {
  await ensureDBConnected();
  return app(req, res);
}
