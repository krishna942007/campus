import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import mentorRouter from "./routes/mentor.routes.js";
import studentRouter from "./routes/student.routes.js";
import adminRouter from "./routes/admin.routes.js";
import aiRouter from "./routes/ai.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "50kb" }));
app.use(urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mentor", mentorRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/ai", aiRouter);

// Health check endpoint
app.get("/api/v1/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "vitara-backend",
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };