import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createApiRouter } from './routes/index';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): express.Application {
  const app = express();

  // Cross-Origin Resource Sharing
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-guest-token']
  }));

  // Logging & body parsing
  app.use(morgan('dev'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use('/api', createApiRouter());

  // Root welcome
  app.get('/', (req, res) => {
    res.json({
      name: 'NagrikLink API Engine',
      description: 'Government Scheme & Welfare Eligibility Engine',
      endpoints: {
        health: '/api/health',
        schemes: '/api/schemes',
        evaluate: '/api/eligibility/evaluate',
        documents: '/api/documents',
        tracking: '/api/tracking'
      }
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
