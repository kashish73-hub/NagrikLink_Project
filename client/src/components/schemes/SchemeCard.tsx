import React, { useState } from 'react';
import { EvaluatedScheme, TrackingStatus } from '@nagriklink/shared';
import { useTrackingStore } from '../../stores/useTrackingStore';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  FileText, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Building2, 
  Coins 
} from 'lucide-react';

interface SchemeCardProps {
  scheme: EvaluatedScheme;
  onViewDetails: (scheme: EvaluatedScheme) => void;
  onOpenDocuments: (scheme: EvaluatedScheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  onViewDetails,
  onOpenDocuments
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { trackedSchemes, setTrackingStatus, removeTracking } = useTrackingStore();
  const currentTracking = trackedSchemes[scheme.id];

  const formatBenefit = (val: number, summary: string) => {
    if (summary) return summary;
    if (val > 0) return `₹${val.toLocaleString('en-IN')} / year`;
    return 'Subsidized / Grant Assistance';
  };

  const handleTrackingToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentTracking) {
      setTrackingStatus(scheme.id, 'SAVED');
    } else if (currentTracking === 'SAVED') {
      setTrackingStatus(scheme.id, 'IN_PROGRESS');
    } else if (currentTracking === 'IN_PROGRESS') {
      setTrackingStatus(scheme.id, 'APPLIED');
    } else {
      removeTracking(scheme.id);
    }
  };

  const isGuaranteed = scheme.evaluation?.isEligible;
  const confidence = scheme.evaluation?.confidenceScore ?? 100;

  return (
    <div className={`glass-card p-5 sm:p-6 transition-all duration-200 hover:shadow-elevated border ${
      isGuaranteed ? 'border-emerald-200/80 hover:border-emerald-300' : 'border-slate-200 hover:border-slate-300'
    }`}>
      
      {/* Top Bar: Ministry, Level & Benefit Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-slate-500" />
            {scheme.level === 'CENTRAL' ? 'Central Govt' : `State (${scheme.state || 'State'})`}
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
            {scheme.category.replace('_', ' ')}
          </span>
        </div>

        {/* Confidence Badge */}
        <div>
          {isGuaranteed ? (
            <span className="badge-emerald flex items-center gap-1 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Eligible
            </span>
          ) : (
            <span className="badge-saffron flex items-center gap-1 text-xs">
              <span>⚡ {confidence}% Match</span>
            </span>
          )}
        </div>
      </div>

      {/* Scheme Title & Ministry */}
      <h3 
        onClick={() => onViewDetails(scheme)} 
        className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-gov-primary cursor-pointer transition-colors leading-snug"
      >
        {scheme.title}
      </h3>
      <p className="text-xs text-slate-500 font-medium mt-1">
        Administered by {scheme.ministry}
      </p>

      {/* Short Description */}
      <p className="text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
        {scheme.shortDescription}
      </p>

      {/* Benefit Highlight Box */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-50/90 to-orange-50/50 border border-amber-200/60 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
          <Coins className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Financial Benefit:</span>
        </div>
        <span className="text-xs sm:text-sm font-extrabold text-amber-950">
          {formatBenefit(scheme.financialValueAnnual, scheme.benefitSummary)}
        </span>
      </div>

      {/* "Why You Match" Accordion Badge */}
      {scheme.evaluation && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-gov-primary transition-colors py-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Why you match ({scheme.evaluation.matchedReasons.length} criteria satisfied)</span>
            </div>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="mt-2 space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              {scheme.evaluation.matchedReasons.map((reason, idx) => (
                <div key={idx} className="text-emerald-800 flex items-start gap-1.5 font-medium">
                  <span className="shrink-0">{reason}</span>
                </div>
              ))}
              {scheme.evaluation.unmatchedReasons.map((reason, idx) => (
                <div key={idx} className="text-rose-700 flex items-start gap-1.5 font-medium">
                  <span className="shrink-0">{reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        {/* Deadline Indicator */}
        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {scheme.isAlwaysOpen 
              ? 'Always Open (Continuous)' 
              : scheme.deadline 
              ? `Deadline: ${new Date(scheme.deadline).toLocaleDateString()}` 
              : 'Rolling Application'}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {/* Tracking / Bookmark status pill */}
          <button
            onClick={handleTrackingToggle}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-colors ${
              currentTracking === 'APPLIED'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : currentTracking === 'IN_PROGRESS'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : currentTracking === 'SAVED'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
            title="Click to toggle: Saved -> In Progress -> Applied -> Remove"
          >
            <Bookmark className="w-3 h-3" />
            <span>{currentTracking ? currentTracking.replace('_', ' ') : 'Track'}</span>
          </button>

          {/* Document Checklist button */}
          <button
            onClick={() => onOpenDocuments(scheme)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            <span>Checklist</span>
          </button>

          {/* Direct Apply Official Outbound Link */}
          <a
            href={scheme.directApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gov-primary hover:bg-gov-navy transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Direct Apply</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};
