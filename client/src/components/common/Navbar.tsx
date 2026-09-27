import React from 'react';
import { ShieldCheck, Bookmark, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { useTrackingStore } from '../../stores/useTrackingStore';

interface NavbarProps {
  onOpenWizard: () => void;
  onOpenTracking: () => void;
  activeView: 'home' | 'schemes' | 'documents';
  setActiveView: (view: 'home' | 'schemes' | 'documents') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenWizard,
  onOpenTracking,
  activeView,
  setActiveView
}) => {
  const { trackedSchemes } = useTrackingStore();
  const savedCount = Object.keys(trackedSchemes).length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & National Emblem Aesthetic */}
          <div 
            onClick={() => setActiveView('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gov-navy to-gov-primary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <div className="relative flex items-center justify-center">
                {/* Chakra aesthetic rings */}
                <div className="w-7 h-7 rounded-full border-2 border-amber-400/80 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gov-saffron"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-gov-primary transition-colors">
                  Nagrik<span className="text-gov-saffron">Link</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                  National Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Aapka Haq, Aapka Adhikar</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeView === 'home' 
                  ? 'text-gov-primary bg-slate-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Eligibility Engine
            </button>
            <button
              onClick={() => setActiveView('schemes')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeView === 'schemes' 
                  ? 'text-gov-primary bg-slate-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Scheme Directory (25+)
            </button>
            <button
              onClick={() => setActiveView('documents')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeView === 'documents' 
                  ? 'text-gov-primary bg-slate-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Document Checklist
            </button>
          </nav>

          {/* Actions: Saved Tracking & Check Eligibility */}
          <div className="flex items-center gap-3">
            {/* Saved Schemes button */}
            <button
              onClick={onOpenTracking}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Tracked & Saved Schemes"
            >
              <Bookmark className="w-4 h-4 text-gov-primary" />
              <span className="hidden sm:inline">Tracked</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-gov-saffron text-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Check Eligibility Primary CTA */}
            <button
              onClick={onOpenWizard}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-gov-navy to-gov-primary hover:from-gov-dark hover:to-gov-navy shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Evaluate Eligibility</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
