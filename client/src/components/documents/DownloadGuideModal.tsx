import React from 'react';
import { DocumentInfo } from '@nagriklink/shared';
import { X, ExternalLink, ShieldCheck, Clock, MapPin, Building, FileCheck } from 'lucide-react';

interface DownloadGuideModalProps {
  document: DocumentInfo | null;
  onClose: () => void;
}

export const DownloadGuideModal: React.FC<DownloadGuideModalProps> = ({
  document,
  onClose
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Issuance & Acquisition Guide
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {document.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-sm text-slate-600">
          {/* Issuing Authority */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Building className="w-5 h-5 text-gov-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-800">Competent Issuing Authority</div>
              <div className="text-xs text-slate-600 mt-0.5">{document.issuingAuthority}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
              Purpose & Significance
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {document.description}
            </p>
          </div>

          {/* Acquisition Steps */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
              How to Obtain This Document
            </h4>
            <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside font-medium">
              <li>Visit your State e-District portal or nearest Common Service Center (CSC / Jan Seva Kendra).</li>
              <li>Provide applicant Aadhaar Card, photograph, and proof of address.</li>
              <li>Pay the standard nominal government processing fee (typically ₹15 - ₹50).</li>
              <li>Verification is carried out by the local Revenue Inspector / Lekhpal / Tehsildar.</li>
              <li>Download the digitally signed certificate with QR verification code via DigiLocker.</li>
            </ol>
          </div>

          {/* DigiLocker Notice */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">DigiLocker Integration:</span> Legally valid under the IT Act 2000. Verified digital documents fetched from DigiLocker are treated at par with original physical copies by all government ministries.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn-outline text-xs"
          >
            Close
          </button>

          {document.downloadGuideUrl && (
            <a
              href={document.downloadGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <span>Visit Official Issuance Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
