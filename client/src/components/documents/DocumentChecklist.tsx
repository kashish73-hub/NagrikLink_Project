import React, { useState } from 'react';
import { EvaluatedScheme, DocumentInfo } from '@nagriklink/shared';
import { useTrackingStore } from '../../stores/useTrackingStore';
import { ReadinessGauge } from './ReadinessGauge';
import { DownloadGuideModal } from './DownloadGuideModal';
import { 
  FileCheck, 
  HelpCircle, 
  Printer, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  Building, 
  Info 
} from 'lucide-react';

interface DocumentChecklistProps {
  schemes: EvaluatedScheme[];
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ schemes }) => {
  const { checkedDocumentIds, toggleDocumentCheck, setAllDocumentsChecked } = useTrackingStore();
  const [selectedGuideDoc, setSelectedGuideDoc] = useState<DocumentInfo | null>(null);

  // Aggregate unique documents across all provided schemes
  const documentMap = new Map<string, {
    doc: DocumentInfo;
    requiredBy: Array<{ schemeId: string; schemeTitle: string; isMandatory: boolean }>;
  }>();

  for (const s of schemes) {
    if (!s.documents) continue;
    for (const d of s.documents) {
      if (!documentMap.has(d.id)) {
        documentMap.set(d.id, {
          doc: d,
          requiredBy: [{ schemeId: s.id, schemeTitle: s.title, isMandatory: d.isMandatory ?? true }]
        });
      } else {
        documentMap.get(d.id)!.requiredBy.push({
          schemeId: s.id,
          schemeTitle: s.title,
          isMandatory: d.isMandatory ?? true
        });
      }
    }
  }

  const uniqueDocs = Array.from(documentMap.values());
  const totalCount = uniqueDocs.length;
  const readyCount = uniqueDocs.filter(item => checkedDocumentIds.includes(item.doc.id)).length;
  const percentage = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 100;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header & Print Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-gov-primary bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200/60">
            Document Readiness Engine
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Verification Document Checklist</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregated across {schemes.length} matched schemes. Check the certificates you have ready.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="btn-outline text-xs flex items-center gap-1.5"
            title="Print or save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print Checklist</span>
          </button>
        </div>
      </div>

      {/* Circular Readiness Gauge */}
      <ReadinessGauge
        percentage={percentage}
        readyCount={readyCount}
        totalCount={totalCount}
      />

      {/* Checklist Table / Card Grid */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Required Documents ({totalCount})
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAllDocumentsChecked(uniqueDocs.map(d => d.doc.id), true)}
              className="text-xs font-semibold text-gov-primary hover:underline"
            >
              Check All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setAllDocumentsChecked([], false)}
              className="text-xs font-semibold text-slate-500 hover:underline"
            >
              Uncheck All
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {uniqueDocs.map(({ doc, requiredBy }) => {
            const isChecked = checkedDocumentIds.includes(doc.id);

            return (
              <div
                key={doc.id}
                className={`p-4 sm:p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isChecked ? 'bg-emerald-50/30' : 'bg-white hover:bg-slate-50/60'
                }`}
              >
                {/* Checkbox and Document Details */}
                <div 
                  onClick={() => toggleDocumentCheck(doc.id)} 
                  className="flex items-start gap-3 cursor-pointer flex-1"
                >
                  <div className="mt-0.5 shrink-0 text-gov-primary">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-bold ${isChecked ? 'text-emerald-950' : 'text-slate-900'}`}>
                        {doc.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {doc.category || 'Official Proof'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.issuingAuthority}</span>
                    </div>

                    {/* Required By Schemes Pills */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      <span>Needed for:</span>
                      {requiredBy.slice(0, 3).map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100 font-medium truncate max-w-[200px]"
                        >
                          {r.schemeTitle}
                        </span>
                      ))}
                      {requiredBy.length > 3 && (
                        <span className="text-slate-500 font-semibold">
                          +{requiredBy.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Guide & Official Link Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setSelectedGuideDoc(doc)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>How to Obtain</span>
                  </button>

                  {doc.downloadGuideUrl && (
                    <a
                      href={doc.downloadGuideUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-gov-primary hover:bg-slate-100 transition-colors"
                      title="Open issuing portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide Modal */}
      <DownloadGuideModal
        document={selectedGuideDoc}
        onClose={() => setSelectedGuideDoc(null)}
      />

    </div>
  );
};
