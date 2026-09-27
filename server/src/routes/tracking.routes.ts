import { Router } from 'express';
import { TrackingController } from '../controllers/TrackingController';
import { TrackingService } from '../services/TrackingService';
import { TrackingRepository } from '../repositories/TrackingRepository';
import { SchemeRepository } from '../repositories/SchemeRepository';

export function createTrackingRouter(trackingRepo: TrackingRepository, schemeRepo: SchemeRepository): Router {
  const router = Router();
  const service = new TrackingService(trackingRepo, schemeRepo);
  const controller = new TrackingController(service);

  router.get('/:guestToken', controller.getUserTrackings);
  router.post('/', controller.updateStatus);
  router.delete('/:guestToken/:schemeId', controller.removeTracking);

  return router;
}
