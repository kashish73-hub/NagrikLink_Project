import React, { useState } from 'react';
import { EvaluatedScheme, SchemeFilterOptions, Scheme } from '@nagriklink/shared';
import { SchemeCard } from './SchemeCard';
import { FilterBar } from './FilterBar';
import { Sparkles, Award, HelpCircle, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface SchemeFeedProps {
  eligibleSchemes: EvaluatedScheme[];
  nearEligibleSchemes: EvaluatedScheme[];
  allSchemes: Scheme[];
  onViewDetails: (scheme: EvaluatedScheme) => void;
  onOpenDocuments: (scheme: EvaluatedScheme) => void;
  onReEvaluate: () => void;
}

export const SchemeFeed: React.FC<SchemeFeedProps> = ({
  eligibleSchemes,
  nearEligibleSchemes,
  allSchemes,
  onViewDetails,
  onOpenDocuments,
  onReEvaluate
}) => {
  const [activeTab, setActiveTab] = useState<'eligible' | 'near' | 'all'>('eligible');
  const [filters, setFilters] = useState<SchemeFilterOptions>({
    category: 'ALL',
    level: 'ALL',
    sortBy: 'benefit_desc'
  });

  const handleFilterChange = (newFilters: Partial<SchemeFilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filter schemes based on active tab and local filters
  const getDisplaySchemes = (): EvaluatedScheme[] => {
    let source: EvaluatedScheme[] = [];

    if (activeTab === 'eligible') {
      source = eligibleSchemes;
    } else if (activeTab === 'near') {
      source = nearEligibleSchemes;
    } else {
      // Map allSchemes to EvaluatedScheme if not evaluated
      source = allSchemes.map(s => {
        const found = eligibleSchemes.find(e => e.id === s.id) || nearEligibleSchemes.find(e => e.id === s.id);
        if (found) return found;
        return {
          ...s,
          evaluation: {
            isEligible: false,
            confidenceScore: 0,
            matchedReasons: [],
            unmatchedReasons: [],
            details: []
          }
        };
      });
    }

    // Apply category filter
    if (filters.category && filters.category !== 'ALL') {
      source = source.filter(s => s.category === filters.category);
    }

    // Apply level filter
    if (filters.level && filters.level !== 'ALL') {
      source = source.filter(s => s.level === filters.level);
    }

    // Apply search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      source = source.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.ministry.toLowerCase().includes(q)
      );
    }

    // Sort
    if (filters.sortBy === 'benefit_desc') {
      source.sort((a, b) => b.financialValueAnnual - a.financialValueAnnual);
    } else if (filters.sortBy === 'confidence_desc') {
      source.sort((a, b) => (b.evaluation?.confidenceScore || 0) - (a.evaluation?.confidenceScore || 0));
    } else if (filters.sortBy === 'title_asc') {
      source.sort((a, b) => a.title.localeCompare(b.title));
    }

    return source;
  };

  const displayedSchemes = getDisplaySchemes();
  const totalEligibleValue = eligibleSchemes.reduce((sum, s) => sum + s.financialValueAnnual, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Result Metrics Header */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-gov-navy to-gov-primary text-white shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-saffron text-xs">
              Deterministic Rules Evaluated
            </span>
            <span className="text-xs text-sky-200">
              Matched against your specific profile
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            You Are Eligible for {eligibleSchemes.length} Scheme{eligibleSchemes.length === 1 ? '' : 's'}!
          </h2>
          <p className="text-sm text-sky-100/90 mt-1 max-w-xl">
            {nearEligibleSchemes.length > 0
              ? `Plus ${nearEligibleSchemes.length} near-eligible schemes where you meet most conditions.`
              : 'All criteria evaluated with zero bias.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center sm:text-right">
            <div className="text-xs uppercase tracking-wider text-sky-200 font-bold">Estimated Annual Value</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">
              ₹{totalEligibleValue.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            onClick={onReEvaluate}
            className="px-4 py-3 rounded-xl text-xs font-bold text-gov-primary bg-white hover:bg-slate-50 transition-colors shadow-md text-center"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('eligible')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'eligible'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Guaranteed Matches ({eligibleSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('near')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'near'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Near-Eligible ({nearEligibleSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'all'
              ? 'bg-gov-primary text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Schemes ({allSchemes.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Schemes Grid */}
      {displayedSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onViewDetails={onViewDetails}
              onOpenDocuments={onOpenDocuments}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No schemes matched this filter</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try selecting "All Sectors" or loosening your search query.
          </p>
          <button
            onClick={() => setFilters({ category: 'ALL', level: 'ALL', sortBy: 'benefit_desc' })}
            className="btn-outline mt-4 text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
