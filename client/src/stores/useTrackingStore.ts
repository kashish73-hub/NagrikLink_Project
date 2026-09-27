import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TrackingStatus } from '@nagriklink/shared';

interface TrackingState {
  guestToken: string;
  trackedSchemes: Record<string, TrackingStatus>;
  checkedDocumentIds: string[];

  // Actions
  setTrackingStatus: (schemeId: string, status: TrackingStatus) => void;
  removeTracking: (schemeId: string) => void;
  toggleDocumentCheck: (docId: string) => void;
  setAllDocumentsChecked: (docIds: string[], checked: boolean) => void;
}

function generateGuestToken(): string {
  return 'gst-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
}

export const useTrackingStore = create<TrackingState>()(
  persist(
    (set) => ({
      guestToken: generateGuestToken(),
      trackedSchemes: {},
      checkedDocumentIds: ['doc-aadhaar', 'doc-bank-passbook'], // Default common docs ready

      setTrackingStatus: (schemeId, status) => set((state) => ({
        trackedSchemes: {
          ...state.trackedSchemes,
          [schemeId]: status
        }
      })),

      removeTracking: (schemeId) => set((state) => {
        const updated = { ...state.trackedSchemes };
        delete updated[schemeId];
        return { trackedSchemes: updated };
      }),

      toggleDocumentCheck: (docId) => set((state) => {
        const exists = state.checkedDocumentIds.includes(docId);
        return {
          checkedDocumentIds: exists
            ? state.checkedDocumentIds.filter(id => id !== docId)
            : [...state.checkedDocumentIds, docId]
        };
      }),

      setAllDocumentsChecked: (docIds, checked) => set(() => ({
        checkedDocumentIds: checked ? [...docIds] : []
      }))
    }),
    {
      name: 'nagriklink_user_tracking'
    }
  )
);
