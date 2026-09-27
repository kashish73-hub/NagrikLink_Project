import { TrackingStatus } from '@nagriklink/shared';

export interface UserTrackedSchemeRecord {
  id: string;
  guestToken: string;
  schemeId: string;
  status: TrackingStatus;
  notes?: string;
  appliedAt?: string;
  updatedAt: string;
}

export class TrackingRepository {
  private trackings: Map<string, UserTrackedSchemeRecord> = new Map();

  public async getTrackingsByGuest(guestToken: string): Promise<UserTrackedSchemeRecord[]> {
    const list: UserTrackedSchemeRecord[] = [];
    for (const record of this.trackings.values()) {
      if (record.guestToken === guestToken) {
        list.push(record);
      }
    }
    return list;
  }

  public async setTrackingStatus(
    guestToken: string,
    schemeId: string,
    status: TrackingStatus,
    notes?: string
  ): Promise<UserTrackedSchemeRecord> {
    const key = `${guestToken}:${schemeId}`;
    const existing = this.trackings.get(key);

    const record: UserTrackedSchemeRecord = {
      id: existing ? existing.id : `track-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      guestToken,
      schemeId,
      status,
      notes: notes !== undefined ? notes : existing?.notes,
      appliedAt: status === 'APPLIED' ? (existing?.appliedAt || new Date().toISOString()) : undefined,
      updatedAt: new Date().toISOString()
    };

    this.trackings.set(key, record);
    return record;
  }

  public async removeTracking(guestToken: string, schemeId: string): Promise<boolean> {
    const key = `${guestToken}:${schemeId}`;
    return this.trackings.delete(key);
  }
}
