import { TrackingStatus } from '@nagriklink/shared';
import { TrackingRepository, UserTrackedSchemeRecord } from '../repositories/TrackingRepository';
import { ISchemeRepository } from '../repositories/ISchemeRepository';

export interface UserTrackedSchemeDetail extends UserTrackedSchemeRecord {
  schemeTitle?: string;
  schemeSlug?: string;
  benefitSummary?: string;
  directApplyUrl?: string;
  category?: string;
}

export class TrackingService {
  constructor(
    private trackingRepo: TrackingRepository,
    private schemeRepo: ISchemeRepository
  ) {}

  public async getUserTrackings(guestToken: string): Promise<UserTrackedSchemeDetail[]> {
    const rawTrackings = await this.trackingRepo.getTrackingsByGuest(guestToken);
    const detailed: UserTrackedSchemeDetail[] = [];

    for (const t of rawTrackings) {
      const scheme = await this.schemeRepo.getSchemeById(t.schemeId);
      detailed.push({
        ...t,
        schemeTitle: scheme?.title,
        schemeSlug: scheme?.slug,
        benefitSummary: scheme?.benefitSummary,
        directApplyUrl: scheme?.directApplyUrl,
        category: scheme?.category
      });
    }

    return detailed;
  }

  public async updateTrackingStatus(
    guestToken: string,
    schemeId: string,
    status: TrackingStatus,
    notes?: string
  ): Promise<UserTrackedSchemeRecord> {
    return this.trackingRepo.setTrackingStatus(guestToken, schemeId, status, notes);
  }

  public async removeTracking(guestToken: string, schemeId: string): Promise<boolean> {
    return this.trackingRepo.removeTracking(guestToken, schemeId);
  }
}
