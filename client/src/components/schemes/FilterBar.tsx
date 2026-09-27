import React from 'react';
import { SchemeCategory, SchemeLevel, SchemeFilterOptions } from '@nagriklink/shared';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  filters: SchemeFilterOptions;
  onFilterChange: (newFilters: Partial<SchemeFilterOptions>) => void;
}

const CATEGORIES: Array<{ id: SchemeCategory | 'ALL'; label: string }> = [
  { id: 'ALL', label: 'All Sectors' },
  { id: 'EDUCATION', label: 'Education & Scholarships' },
  { id: 'AGRICULTURE', label: 'Agriculture & Farmers' },
  { id: 'HEALTHCARE', label: 'Healthcare & Insurance' },
  { id: 'HOUSING', label: 'Housing & Urban' },
  { id: 'BUSINESS_LOANS', label: 'Business & Loans' },
  { id: 'SOCIAL_WELFARE', label: 'Social Welfare & Pensions' },
  { id: 'SKILL_DEVELOPMENT', label: 'Skill & Livelihood' },
  { id: 'WOMEN_AND_CHILD', label: 'Women & Child' }
];

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="space-y-4 mb-6">
      
      {/* Search Input and Sponsoring Level Toggle */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search schemes by name, ministry, or benefits..."
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-primary focus:border-gov-primary text-sm font-medium bg-white"
          />
        </div>

        {/* Level and Sort Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <select
            value={filters.level || 'ALL'}
            onChange={(e) => onFilterChange({ level: e.target.value as any })}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-gov-primary"
          >
            <option value="ALL">All Levels (Central & State)</option>
            <option value="CENTRAL">Central Govt Only</option>
            <option value="STATE">State Govt Only</option>
          </select>

          {/* Sort Filter */}
          <select
            value={filters.sortBy || 'benefit_desc'}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-gov-primary"
          >
            <option value="benefit_desc">Highest Benefit (₹) First</option>
            <option value="confidence_desc">Match Confidence First</option>
            <option value="title_asc">Scheme Name (A-Z)</option>
            <option value="deadline_asc">Upcoming Deadlines</option>
          </select>
        </div>
      </div>

      {/* Sector / Category Horizontal Pill Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = (filters.category || 'ALL') === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gov-primary text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};
