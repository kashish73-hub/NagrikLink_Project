import { Request, Response, NextFunction } from 'express';
import { TrackingService } from '../services/TrackingService';
import { ApiResponse } from '@nagriklink/shared';

export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  public getUserTrackings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { guestToken } = req.params;
      if (!guestToken) {
        res.status(400).json({ success: false, error: 'guestToken parameter is required' });
        return;
      }

      const trackings = await this.trackingService.getUserTrackings(guestToken);
      res.status(200).json({
        success: true,
        data: trackings
      });
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { guestToken, schemeId, status, notes } = req.body;
      if (!guestToken || !schemeId || !status) {
        res.status(400).json({
          success: false,
          error: 'guestToken, schemeId, and status are required'
        });
        return;
      }

      const record = await this.trackingService.updateTrackingStatus(guestToken, schemeId, status, notes);
      res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      next(error);
    }
  };

  public removeTracking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { guestToken, schemeId } = req.params;
      await this.trackingService.removeTracking(guestToken, schemeId);
      res.status(200).json({
        success: true,
        data: { removed: true }
      });
    } catch (error) {
      next(error);
    }
  };
}
