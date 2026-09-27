import React from 'react';
import { EvaluatedScheme } from '@nagriklink/shared';
import { 
  X, 
  ExternalLink, 
  FileCheck2, 
  CheckCircle2, 
  Coins, 
  Building2, 
  ShieldCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: EvaluatedScheme | null;
  onClose: () => void;
  onOpenChecklist: (scheme: EvaluatedScheme) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onOpenChecklist
}) => {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                {scheme.level === 'CENTRAL' ? 'Central Government' : `State Government (${scheme.state})`}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {scheme.category.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {scheme.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Administered by {scheme.ministry}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Benefit Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-900">Total Financial / Subsidy Benefit</div>
                <div className="text-sm font-extrabold text-amber-950">{scheme.benefitSummary}</div>
              </div>
            </div>
          </div>

          {/* Full Scheme Description */}
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Scheme Overview</h3>
            <p className="text-slate-600 leading-relaxed">
              {scheme.fullDescription}
            </p>
          </div>

          {/* Eligibility Rules Evaluated */}
          {scheme.evaluation && (
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Evaluated Criteria</h3>
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                {scheme.evaluation.matchedReasons.map((reason, idx) => (
                  <div key={idx} className="text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
                {scheme.evaluation.unmatchedReasons.map((reason, idx) => (
                  <div key={idx} className="text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents List */}
          {scheme.documents && scheme.documents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900">Mandatory Verification Documents</h3>
                <button
                  onClick={() => { onClose(); onOpenChecklist(scheme); }}
                  className="text-xs font-bold text-gov-primary hover:underline flex items-center gap-1"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Checklist Readiness</span>
                </button>
              </div>

              <div className="space-y-2">
                {scheme.documents.map((doc) => (
                  <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.issuingAuthority}</div>
                    </div>
                    {doc.downloadGuideUrl && (
                      <a
                        href={doc.downloadGuideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-gov-primary hover:underline flex items-center gap-1 shrink-0 ml-3"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn-outline text-xs"
          >
            Close
          </button>

          <a
            href={scheme.directApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            <span>Proceed to Official Government Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
