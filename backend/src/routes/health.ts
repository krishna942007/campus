import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'vitara-backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});
