import React from 'react';
import { useTrackingStore } from '../../stores/useTrackingStore';
import { Scheme, TrackingStatus } from '@nagriklink/shared';
import { 
  X, 
  Bookmark, 
  Clock, 
  CheckCircle, 
  ExternalLink, 
  Trash2, 
  FileText 
} from 'lucide-react';

interface TrackingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  allSchemes: Scheme[];
  onOpenScheme: (scheme: Scheme) => void;
}

export const TrackingDrawer: React.FC<TrackingDrawerProps> = ({
  isOpen,
  onClose,
  allSchemes,
  onOpenScheme
}) => {
  const { trackedSchemes, setTrackingStatus, removeTracking } = useTrackingStore();

  if (!isOpen) return null;

  const trackedEntries = Object.entries(trackedSchemes);
  const trackedSchemesWithData = trackedEntries
    .map(([id, status]) => {
      const scheme = allSchemes.find((s) => s.id === id);
      return { scheme, status, id };
    })
    .filter((item): item is { scheme: Scheme; status: TrackingStatus; id: string } => !!item.scheme);

  const savedList = trackedSchemesWithData.filter((i) => i.status === 'SAVED');
  const inProgressList = trackedSchemesWithData.filter((i) => i.status === 'IN_PROGRESS');
  const appliedList = trackedSchemesWithData.filter((i) => i.status === 'APPLIED');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-gov-primary" />
            <h3 className="font-bold text-slate-900 text-base">Application Tracker</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gov-primary text-white">
              {trackedEntries.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          {trackedSchemesWithData.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto stroke-1 mb-2 text-slate-300" />
              <p className="font-semibold text-slate-700">No schemes saved yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "Track" on any scheme card to save it or mark your application progress.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* In Progress Section */}
              {inProgressList.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>In Progress ({inProgressList.length})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {inProgressList.map(({ scheme, status }) => (
                      <TrackingCard
                        key={scheme.id}
                        scheme={scheme}
                        status={status}
                        onUpdateStatus={(s) => setTrackingStatus(scheme.id, s)}
                        onRemove={() => removeTracking(scheme.id)}
                        onOpen={() => onOpenScheme(scheme)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Section */}
              {savedList.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mb-2">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved for Later ({savedList.length})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {savedList.map(({ scheme, status }) => (
                      <TrackingCard
                        key={scheme.id}
                        scheme={scheme}
                        status={status}
                        onUpdateStatus={(s) => setTrackingStatus(scheme.id, s)}
                        onRemove={() => removeTracking(scheme.id)}
                        onOpen={() => onOpenScheme(scheme)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Applied Section */}
              {appliedList.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Applied / Completed ({appliedList.length})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {appliedList.map(({ scheme, status }) => (
                      <TrackingCard
                        key={scheme.id}
                        scheme={scheme}
                        status={status}
                        onUpdateStatus={(s) => setTrackingStatus(scheme.id, s)}
                        onRemove={() => removeTracking(scheme.id)}
                        onOpen={() => onOpenScheme(scheme)}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

interface TrackingCardProps {
  scheme: Scheme;
  status: TrackingStatus;
  onUpdateStatus: (status: TrackingStatus) => void;
  onRemove: () => void;
  onOpen: () => void;
}

const TrackingCard: React.FC<TrackingCardProps> = ({
  scheme,
  status,
  onUpdateStatus,
  onRemove,
  onOpen
}) => {
  return (
    <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h5
            onClick={onOpen}
            className="font-bold text-slate-900 text-xs hover:text-gov-primary cursor-pointer line-clamp-1"
          >
            {scheme.title}
          </h5>
          <div className="text-[11px] text-amber-900 font-bold mt-0.5">
            {scheme.benefitSummary}
          </div>
        </div>

        <button
          onClick={onRemove}
          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
          title="Remove from tracking"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Status Transition Buttons & Direct Apply */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <select
          value={status}
          onChange={(e) => onUpdateStatus(e.target.value as TrackingStatus)}
          className="text-[11px] font-semibold px-2 py-1 rounded-md border border-slate-300 bg-slate-50 text-slate-700"
        >
          <option value="SAVED">Saved</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="APPLIED">Applied</option>
        </select>

        <a
          href={scheme.directApplyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-gov-primary hover:underline flex items-center gap-1"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
