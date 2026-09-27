import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '../services/DocumentService';
import { ApiResponse } from '@nagriklink/shared';

export class DocumentController {
  constructor(private docService: DocumentService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const documents = await this.docService.getAllDocuments();
      const response: ApiResponse = {
        success: true,
        data: documents
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { slug } = req.params;
      const document = await this.docService.getDocumentBySlug(slug);

      if (!document) {
        res.status(404).json({
          success: false,
          error: `Document with slug '${slug}' not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: document
      });
    } catch (error) {
      next(error);
    }
  };

  public calculateReadiness = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { schemeIds, checkedDocumentIds } = req.body;
      if (!Array.isArray(schemeIds)) {
        res.status(400).json({
          success: false,
          error: 'schemeIds array is required'
        });
        return;
      }

      const summary = await this.docService.calculateReadiness(
        schemeIds,
        Array.isArray(checkedDocumentIds) ? checkedDocumentIds : []
      );

      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (error) {
      next(error);
    }
  };
}
