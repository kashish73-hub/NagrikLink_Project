import { Router } from 'express';
import { EligibilityController } from '../controllers/EligibilityController';
import { EligibilityService } from '../services/EligibilityService';
import { SchemeRepository } from '../repositories/SchemeRepository';

export function createEligibilityRouter(schemeRepo: SchemeRepository): Router {
  const router = Router();
  const service = new EligibilityService(schemeRepo);
  const controller = new EligibilityController(service);

  router.post('/evaluate', controller.evaluate);

  return router;
}
