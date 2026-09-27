import React from 'react';
import { useWizardStore } from '../../stores/useWizardStore';
import { CasteCategory, MinorityReligion } from '@nagriklink/shared';

const CASTES: Array<{ id: CasteCategory; label: string; desc: string }> = [
  { id: 'GENERAL', label: 'General / Open', desc: 'Non-reserved categories' },
  { id: 'OBC', label: 'OBC', desc: 'Other Backward Classes (Central/State)' },
  { id: 'SC', label: 'SC', desc: 'Scheduled Castes' },
  { id: 'ST', label: 'ST', desc: 'Scheduled Tribes' },
  { id: 'EWS', label: 'EWS', desc: 'Economically Weaker Section' }
];

export const Step4SpecialCategories: React.FC = () => {
  const { profile, updateProfile } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Special Categories & Social Inclusion</h2>
        <p className="text-sm text-slate-500 mt-1">
          Government welfare provisions offer substantial reservations, subsidies, and affirmative action grants.
        </p>
      </div>

      {/* Caste Category Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Social Category (Caste) <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {CASTES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => updateProfile({ caste: c.id })}
              className={`p-3 rounded-xl border text-center transition-all ${
                profile.caste === c.id
                  ? 'border-gov-primary bg-gov-primary text-white shadow-xs ring-2 ring-gov-primary/20'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-sm font-bold">{c.label}</div>
              <div className={`text-[10px] mt-0.5 truncate ${profile.caste === c.id ? 'text-sky-100' : 'text-slate-400'}`}>
                {c.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Disability (PwD / Divyangjan) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <div className="text-sm font-semibold text-slate-900">Person with Benchmark Disability (Divyangjan / PwD)</div>
            <div className="text-xs text-slate-500">Holders of UDID Card or CMO Disability Certificate</div>
          </div>
          <input
            type="checkbox"
            checked={profile.isPwD}
            onChange={(e) => updateProfile({
              isPwD: e.target.checked,
              disabilityPercentage: e.target.checked ? (profile.disabilityPercentage || 40) : 0
            })}
            className="w-5 h-5 rounded text-gov-primary focus:ring-gov-primary border-slate-300"
          />
        </label>

        {profile.isPwD && (
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Certified Disability Percentage:</span>
              <span className="text-gov-primary font-bold text-sm bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                {profile.disabilityPercentage}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={profile.disabilityPercentage}
              onChange={(e) => updateProfile({ disabilityPercentage: Number(e.target.value) })}
              className="w-full accent-gov-primary"
            />
            <p className="text-[11px] text-slate-500">Benchmark disability is generally ≥ 40% for statutory welfare benefits.</p>
          </div>
        )}
      </div>

      {/* Minority Status */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <div className="text-sm font-semibold text-slate-900">Belong to a Notified Minority Community</div>
            <div className="text-xs text-slate-500">Muslim, Christian, Sikh, Buddhist, Jain, or Parsi</div>
          </div>
          <input
            type="checkbox"
            checked={profile.isMinority}
            onChange={(e) => updateProfile({
              isMinority: e.target.checked,
              minorityReligion: e.target.checked ? 'MUSLIM' : 'NONE'
            })}
            className="w-5 h-5 rounded text-gov-primary focus:ring-gov-primary border-slate-300"
          />
        </label>

        {profile.isMinority && (
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Select Community</label>
            <select
              value={profile.minorityReligion}
              onChange={(e) => updateProfile({ minorityReligion: e.target.value as MinorityReligion })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-primary text-slate-900 font-medium bg-white text-sm"
            >
              <option value="MUSLIM">Muslim</option>
              <option value="CHRISTIAN">Christian</option>
              <option value="SIKH">Sikh</option>
              <option value="BUDDHIST">Buddhist</option>
              <option value="JAIN">Jain</option>
              <option value="PARSI">Parsi</option>
            </select>
          </div>
        )}
      </div>

      {/* Additional Vulnerabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={profile.isWidow}
            onChange={(e) => updateProfile({ isWidow: e.target.checked })}
            className="w-4 h-4 rounded text-gov-primary focus:ring-gov-primary border-slate-300"
          />
          <div>
            <div className="text-xs font-bold text-slate-800">Widow / Surviving Spouse</div>
            <div className="text-[11px] text-slate-500">Eligible for special pensions</div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={profile.isSingleMother}
            onChange={(e) => updateProfile({ isSingleMother: e.target.checked })}
            className="w-4 h-4 rounded text-gov-primary focus:ring-gov-primary border-slate-300"
          />
          <div>
            <div className="text-xs font-bold text-slate-800">Single Mother / Head of Household</div>
            <div className="text-[11px] text-slate-500">Eligible for women-focused grants</div>
          </div>
        </label>
      </div>

    </div>
  );
};
