import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';
import { DocumentService } from '../services/DocumentService';
import { DocumentRepository } from '../repositories/DocumentRepository';
import { SchemeRepository } from '../repositories/SchemeRepository';

export function createDocumentRouter(docRepo: DocumentRepository, schemeRepo: SchemeRepository): Router {
  const router = Router();
  const service = new DocumentService(docRepo, schemeRepo);
  const controller = new DocumentController(service);

  router.get('/', controller.getAll);
  router.get('/:slug', controller.getBySlug);
  router.post('/readiness', controller.calculateReadiness);

  return router;
}
