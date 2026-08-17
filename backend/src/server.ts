import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { mentoringRouter } from './routes/mentoring.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Route mounts
app.use('/api/health', healthRouter);
app.use('/api/mentoring', mentoringRouter);

app.listen(PORT, () => {
  console.log(`🚀 VITARA Backend Server running on http://localhost:${PORT}`);
});
