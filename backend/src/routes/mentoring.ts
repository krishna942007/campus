import { Router } from 'express';

export const mentoringRouter = Router();

// Endpoint placeholder for mentor request matching & management
mentoringRouter.get('/requests', (_req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'req-1',
        studentId: '2023CSE001',
        studentName: 'Aarav Sharma',
        cgpa: 8.92,
        attendance: 91.4,
        matchScore: 96,
        status: 'ACCEPTED'
      }
    ]
  });
});
