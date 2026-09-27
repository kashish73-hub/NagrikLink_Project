import { Request, Response, NextFunction } from 'express';
import { SchemeService } from '../services/SchemeService';
import { ApiResponse, SchemeFilterOptions } from '@nagriklink/shared';

export class SchemeController {
  constructor(private schemeService: SchemeService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters: SchemeFilterOptions = {
        category: req.query.category as any,
        level: req.query.level as any,
        state: req.query.state as string,
        searchQuery: req.query.q as string,
        minFinancialBenefit: req.query.minBenefit ? Number(req.query.minBenefit) : undefined,
        sortBy: req.query.sortBy as any
      };

      const schemes = await this.schemeService.getSchemes(filters);

      const response: ApiResponse = {
        success: true,
        data: schemes,
        meta: {
          total: schemes.length
        }
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { slug } = req.params;
      const scheme = await this.schemeService.getSchemeBySlug(slug);

      if (!scheme) {
        res.status(404).json({
          success: false,
          error: `Scheme with slug '${slug}' not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: scheme
      });
    } catch (error) {
      next(error);
    }
  };
}
