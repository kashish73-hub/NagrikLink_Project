import { Router } from 'express';
import { SchemeController } from '../controllers/SchemeController';
import { SchemeService } from '../services/SchemeService';
import { SchemeRepository } from '../repositories/SchemeRepository';

export function createSchemeRouter(schemeRepo: SchemeRepository): Router {
  const router = Router();
  const service = new SchemeService(schemeRepo);
  const controller = new SchemeController(service);

  router.get('/', controller.getAll);
  router.get('/:slug', controller.getBySlug);

  return router;
}
