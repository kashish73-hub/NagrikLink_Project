import React from 'react';
import { useWizardStore } from '../../stores/useWizardStore';
import { RationCardType } from '@nagriklink/shared';
import { IndianRupee, HelpCircle } from 'lucide-react';

export const Step2Economic: React.FC = () => {
  const { profile, updateProfile } = useWizardStore();

  const formatLakhs = (val: number) => {
    if (val === 0) return '₹0 (No Income)';
    if (val < 100000) return `₹${val.toLocaleString('en-IN')}`;
    const inLakhs = (val / 100000).toFixed(1).replace('.0', '');
    return `₹${inLakhs} Lakh${val >= 200000 ? 's' : ''} / year (₹${val.toLocaleString('en-IN')})`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Economic & Household Profile</h2>
        <p className="text-sm text-slate-500 mt-1">
          Income thresholds are the most critical deterministic filter in government welfare evaluation.
        </p>
      </div>

      {/* Annual Income Range Slider */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-gov-primary" />
            <span>Total Annual Family Income</span>
          </label>
          <span className="text-base sm:text-lg font-extrabold text-gov-primary bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
            {formatLakhs(profile.annualIncome)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1500000"
          step="25000"
          value={profile.annualIncome}
          onChange={(e) => updateProfile({ annualIncome: Number(e.target.value) })}
          className="w-full accent-gov-primary"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-2">
          <span>₹0</span>
          <span>₹2.5 Lakhs (BPL/Scholarship Cap)</span>
          <span>₹6 Lakhs</span>
          <span>₹15 Lakhs+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ration Card Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Ration Card Category
          </label>
          <select
            value={profile.rationCardType}
            onChange={(e) => {
              const val = e.target.value as RationCardType;
              updateProfile({
                rationCardType: val,
                isBpl: val === 'AAY' || val === 'BPL_PHH'
              });
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-primary focus:border-gov-primary text-slate-900 font-medium bg-white"
          >
            <option value="NONE">No Ration Card</option>
            <option value="AAY">Antyodaya Anna Yojana (AAY - Poorest of Poor)</option>
            <option value="BPL_PHH">Priority Household (BPL / PHH Card)</option>
            <option value="APL">Above Poverty Line (APL / White Card)</option>
          </select>
          <p className="text-xs text-slate-400 mt-1.5">Used for subsidized food, LPG, and Ayushman Bharat verification.</p>
        </div>

        {/* Economic Flags (BPL & EWS) */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Poverty & Economic Status
          </label>
          
          {/* BPL Card Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all">
            <div>
              <div className="text-sm font-semibold text-slate-800">Below Poverty Line (BPL)</div>
              <div className="text-xs text-slate-500">Holder of yellow/pink BPL certificate</div>
            </div>
            <input
              type="checkbox"
              checked={profile.isBpl}
              onChange={(e) => updateProfile({ isBpl: e.target.checked })}
              className="w-5 h-5 rounded text-gov-primary focus:ring-gov-primary border-slate-300"
            />
          </label>

          {/* EWS Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all">
            <div>
              <div className="text-sm font-semibold text-slate-800">Economically Weaker Section (EWS)</div>
              <div className="text-xs text-slate-500">Annual family income under ₹8,00,000</div>
            </div>
            <input
              type="checkbox"
              checked={profile.isEws}
              onChange={(e) => updateProfile({ isEws: e.target.checked })}
              className="w-5 h-5 rounded text-gov-primary focus:ring-gov-primary border-slate-300"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
