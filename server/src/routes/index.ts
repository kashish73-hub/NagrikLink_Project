import { Router } from 'express';
import { createEligibilityRouter } from './eligibility.routes';
import { createSchemeRouter } from './scheme.routes';
import { createDocumentRouter } from './document.routes';
import { createTrackingRouter } from './tracking.routes';
import { SchemeRepository } from '../repositories/SchemeRepository';
import { DocumentRepository } from '../repositories/DocumentRepository';
import { TrackingRepository } from '../repositories/TrackingRepository';

export function createApiRouter(): Router {
  const router = Router();

  const schemeRepo = new SchemeRepository();
  const docRepo = new DocumentRepository();
  const trackingRepo = new TrackingRepository();

  router.use('/eligibility', createEligibilityRouter(schemeRepo));
  router.use('/schemes', createSchemeRouter(schemeRepo));
  router.use('/documents', createDocumentRouter(docRepo, schemeRepo));
  router.use('/tracking', createTrackingRouter(trackingRepo, schemeRepo));

  router.get('/health', (req, res) => {
    res.json({
      success: true,
      status: 'UP',
      appName: 'NagrikLink Engine',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  return router;
}
