import { Request, Response, NextFunction } from 'express';
import { EligibilityService } from '../services/EligibilityService';
import { ApiResponse, UserProfileSchema } from '@nagriklink/shared';

export class EligibilityController {
  constructor(private eligibilityService: EligibilityService) {}

  public evaluate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsedProfile = UserProfileSchema.parse(req.body.profile);
      const filters = req.body.filters;

      const result = await this.eligibilityService.evaluateEligibility(parsedProfile, filters);

      const response: ApiResponse = {
        success: true,
        data: result,
        meta: {
          timestamp: result.evaluationTimestamp,
          totalEligible: result.totalEligibleCount,
          totalEstimatedBenefit: result.totalEstimatedBenefitAnnual
        }
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
