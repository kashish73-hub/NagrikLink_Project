import React from 'react';
import { User, Wallet, Briefcase, Sparkles, Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const STEPS = [
  { id: 0, title: 'Demographics', desc: 'Age, Gender & State', icon: User },
  { id: 1, title: 'Economic Profile', desc: 'Income & Ration Card', icon: Wallet },
  { id: 2, title: 'Occupation', desc: 'Work & Academics', icon: Briefcase },
  { id: 3, title: 'Special Categories', desc: 'Caste, PwD & Minority', icon: Sparkles },
];

export const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep, onSelectStep }) => {
  return (
    <div className="w-full">
      {/* Progress Track Bar */}
      <div className="relative mb-6">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-200">
          <div
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-gov-primary to-gov-saffron transition-all duration-300"
          ></div>
        </div>
      </div>

      {/* Step Pills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCurrent = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                isCurrent
                  ? 'border-gov-primary bg-sky-50/50 shadow-xs ring-2 ring-gov-primary/10'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/40 text-slate-700'
                  : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm transition-colors ${
                  isCurrent
                    ? 'bg-gov-primary text-white'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-bold truncate ${isCurrent ? 'text-gov-primary' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                  Step {step.id + 1}
                </div>
                <div className="text-xs font-medium text-slate-600 truncate">
                  {step.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
