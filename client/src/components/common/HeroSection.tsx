import React from 'react';
import { Sparkles, CheckCircle2, Award, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWizardStore } from '../../stores/useWizardStore';

interface HeroSectionProps {
  onStartWizard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartWizard }) => {
  const { loadPreset } = useWizardStore();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-gov-dark to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle background national gradient mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500 rounded-full filter blur-[120px]"></div>
        <div className="absolute top-20 -right-40 w-96 h-96 bg-emerald-500 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Flagship Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-amber-300 mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Deterministic JSONB Rule Engine • 25+ Central & State Schemes</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Find Every Welfare Scheme <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">
            You Are Legally Entitled To
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
          No guesswork or complex paperwork. Enter your profile in 4 quick steps and our deterministic rule engine reveals your exact eligibility, verified match reasons, and instant document checklists.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartWizard}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-gov-saffron to-amber-600 hover:from-amber-600 hover:to-gov-saffron shadow-glow-saffron hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
          >
            <span>Start 2-Minute Eligibility Check</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Interactive Test Profiles */}
        <div className="mt-10 pt-6 border-t border-slate-800/80">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Quick 1-Click Persona Demos:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => { loadPreset('student'); onStartWizard(); }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-xs font-medium text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              🎓 College Student (UP)
            </button>
            <button
              onClick={() => { loadPreset('farmer'); onStartWizard(); }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-xs font-medium text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              🌾 Small Farmer (Telangana)
            </button>
            <button
              onClick={() => { loadPreset('entrepreneur'); onStartWizard(); }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-xs font-medium text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              💼 Woman Entrepreneur (MH)
            </button>
            <button
              onClick={() => { loadPreset('senior'); onStartWizard(); }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-xs font-medium text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              🧓 Senior Citizen (BPL/PwD)
            </button>
          </div>
        </div>

        {/* Value Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">₹5,00,000+</div>
            <div className="text-xs text-slate-400 mt-1">Cashless Healthcare Cover</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">100% Free</div>
            <div className="text-xs text-slate-400 mt-1">Open Civic Tech Engine</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-bold text-sky-400">25+</div>
            <div className="text-xs text-slate-400 mt-1">Central & State Schemes</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">&lt; 2 ms</div>
            <div className="text-xs text-slate-400 mt-1">Evaluation Response Time</div>
          </div>
        </div>

      </div>
    </div>
  );
};
