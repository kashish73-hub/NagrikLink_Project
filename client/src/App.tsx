import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import { api } from './services/api';
import { useWizardStore } from './stores/useWizardStore';
import { EvaluatedScheme, Scheme } from '@nagriklink/shared';

// Components
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/common/HeroSection';
import { WizardContainer } from './components/wizard/WizardContainer';
import { SchemeFeed } from './components/schemes/SchemeFeed';
import { SchemeDetailModal } from './components/schemes/SchemeDetailModal';
import { DocumentChecklist } from './components/documents/DocumentChecklist';
import { TrackingDrawer } from './components/tracking/TrackingDrawer';
import { ShieldCheck, Heart, ExternalLink, Sparkles, Building } from 'lucide-react';

export const App: React.FC = () => {
  const { profile, setStep } = useWizardStore();
  const [activeView, setActiveView] = useState<'home' | 'schemes' | 'documents'>('home');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<EvaluatedScheme | null>(null);

  // TanStack Query: Fetch all schemes
  const { data: allSchemes = [], isLoading: isLoadingSchemes } = useQuery({
    queryKey: ['schemes'],
    queryFn: () => api.getSchemes()
  });

  // TanStack Query: Evaluate Eligibility based on profile
  const {
    data: evaluationData,
    isLoading: isEvaluating,
    refetch: runEvaluation
  } = useQuery({
    queryKey: ['evaluation', profile],
    queryFn: () => api.evaluateEligibility(profile),
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });

  const eligibleSchemes: EvaluatedScheme[] = evaluationData?.eligibleSchemes || [];
  const nearEligibleSchemes: EvaluatedScheme[] = evaluationData?.nearEligibleSchemes || [];

  const handleStartWizard = () => {
    setIsWizardOpen(true);
    setActiveView('home');
    setStep(0);
  };

  const handleWizardComplete = async () => {
    setIsWizardOpen(false);
    setActiveView('schemes');
    await runEvaluation();

    // Trigger celebratory confetti for matched schemes!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleOpenDocumentsForScheme = (scheme: EvaluatedScheme) => {
    setSelectedScheme(scheme);
    setActiveView('documents');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navbar */}
      <Navbar
        onOpenWizard={handleStartWizard}
        onOpenTracking={() => setIsTrackingOpen(true)}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          if (view !== 'home') setIsWizardOpen(false);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* View 1: Home View with Hero and Wizard */}
        {activeView === 'home' && (
          <div>
            {!isWizardOpen ? (
              <>
                <HeroSection onStartWizard={handleStartWizard} />
                <div className="py-12">
                  <SchemeFeed
                    eligibleSchemes={eligibleSchemes}
                    nearEligibleSchemes={nearEligibleSchemes}
                    allSchemes={allSchemes}
                    onViewDetails={setSelectedScheme}
                    onOpenDocuments={handleOpenDocumentsForScheme}
                    onReEvaluate={handleStartWizard}
                  />
                </div>
              </>
            ) : (
              <div className="py-6">
                <WizardContainer
                  onComplete={handleWizardComplete}
                  isEvaluating={isEvaluating}
                />
              </div>
            )}
          </div>
        )}

        {/* View 2: Scheme Discovery Feed */}
        {activeView === 'schemes' && (
          <div className="py-6">
            <SchemeFeed
              eligibleSchemes={eligibleSchemes}
              nearEligibleSchemes={nearEligibleSchemes}
              allSchemes={allSchemes}
              onViewDetails={setSelectedScheme}
              onOpenDocuments={handleOpenDocumentsForScheme}
              onReEvaluate={handleStartWizard}
            />
          </div>
        )}

        {/* View 3: Document Readiness Checklist */}
        {activeView === 'documents' && (
          <div className="py-6">
            <DocumentChecklist
              schemes={eligibleSchemes.length > 0 ? eligibleSchemes : (allSchemes as any[])}
            />
          </div>
        )}

      </main>

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
        onOpenChecklist={handleOpenDocumentsForScheme}
      />

      {/* Application Tracker Drawer */}
      <TrackingDrawer
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        allSchemes={allSchemes}
        onOpenScheme={(scheme) => {
          setSelectedScheme(scheme as EvaluatedScheme);
        }}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gov-primary flex items-center justify-center text-white font-bold">
              NL
            </div>
            <div>
              <div className="font-bold text-slate-200 text-sm">
                Nagrik<span className="text-gov-saffron">Link</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Civic-Tech Welfare Scheme & Eligibility Evaluation Engine
              </p>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-slate-400">
              Built with pure deterministic rule evaluation, PostgreSQL JSONB, Prisma ORM, and React.
            </p>
            <p className="text-slate-500 text-[11px]">
              Direct links route to verified endpoints: NSP, PM-Kisan, NHA, JanSamarth, and KVIC.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
