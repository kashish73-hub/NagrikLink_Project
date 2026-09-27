import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '../../stores/useWizardStore';
import { WizardProgress } from './WizardProgress';
import { Step1Demographics } from './Step1Demographics';
import { Step2Economic } from './Step2Economic';
import { Step3Occupation } from './Step3Occupation';
import { Step4SpecialCategories } from './Step4SpecialCategories';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';

interface WizardContainerProps {
  onComplete: () => void;
  isEvaluating?: boolean;
}

export const WizardContainer: React.FC<WizardContainerProps> = ({ onComplete, isEvaluating = false }) => {
  const { currentStep, setStep, nextStep, prevStep, resetWizard, profile } = useWizardStore();

  const handleNextOrSubmit = () => {
    if (currentStep < 3) {
      nextStep();
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="glass-card p-6 sm:p-8">
        
        {/* Header with Step Progress */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-gov-primary bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200/60">
              Deterministic Eligibility Wizard
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Check Scheme Eligibility</h1>
          </div>

          <button
            onClick={resetWizard}
            className="self-start sm:self-auto text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Form</span>
          </button>
        </div>

        {/* Visual Progress Bar */}
        <WizardProgress currentStep={currentStep} onSelectStep={setStep} />

        {/* Step Content with Framer Motion transitions */}
        <div className="mt-8 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {currentStep === 0 && <Step1Demographics />}
              {currentStep === 1 && <Step2Economic />}
              {currentStep === 2 && <Step3Occupation />}
              {currentStep === 3 && <Step4SpecialCategories />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Action Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`btn-outline ${currentStep === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNextOrSubmit}
            disabled={isEvaluating}
            className="btn-primary"
          >
            {isEvaluating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Evaluating Rules...
              </span>
            ) : currentStep === 3 ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Find My Eligible Schemes
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Continue to Step {currentStep + 2}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
