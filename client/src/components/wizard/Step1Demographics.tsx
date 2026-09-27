import React from 'react';
import { useWizardStore } from '../../stores/useWizardStore';
import { Gender, AreaType } from '@nagriklink/shared';

const STATES = [
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'TG', name: 'Telangana' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'OD', name: 'Odisha' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'WB', name: 'West Bengal' },
  { code: 'BR', name: 'Bihar' },
  { code: 'DL', name: 'Delhi (NCT)' },
  { code: 'PB', name: 'Punjab' },
  { code: 'HR', name: 'Haryana' },
  { code: 'KL', name: 'Kerala' },
  { code: 'AS', name: 'Assam' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'CH', name: 'Chhattisgarh' },
  { code: 'UT', name: 'Uttarakhand' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'GA', name: 'Goa' },
  { code: 'JK', name: 'Jammu & Kashmir' },
  { code: 'OTHER', name: 'Other State / Union Territory' }
];

export const Step1Demographics: React.FC = () => {
  const { profile, updateProfile } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Basic Demographics</h2>
        <p className="text-sm text-slate-500 mt-1">
          Government schemes heavily target specific age groups, regions, and domicile rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Age (Years) <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              max="120"
              value={profile.age}
              onChange={(e) => updateProfile({ age: Number(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-primary focus:border-gov-primary text-slate-900 text-lg font-semibold"
              placeholder="e.g. 21"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Enter completed age as per Aadhaar Card.</p>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Gender <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['FEMALE', 'MALE', 'TRANSGENDER'] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateProfile({ gender: g })}
                className={`py-2.5 px-3 rounded-xl border text-sm font-semibold capitalize transition-all ${
                  profile.gender === g
                    ? 'border-gov-primary bg-gov-primary text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {g.toLowerCase()}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Many welfare initiatives offer exclusive benefits to women.</p>
        </div>

        {/* State of Domicile */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            State of Permanent Residence (Domicile) <span className="text-rose-500">*</span>
          </label>
          <select
            value={profile.state}
            onChange={(e) => updateProfile({ state: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-primary focus:border-gov-primary text-slate-900 font-medium bg-white"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1.5">Determines state-sponsored schemes you qualify for.</p>
        </div>

        {/* Area / Residency Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Area Type <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['RURAL', 'URBAN'] as AreaType[]).map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => updateProfile({ area })}
                className={`py-2.5 px-4 rounded-xl border text-sm font-semibold capitalize transition-all ${
                  profile.area === area
                    ? 'border-gov-primary bg-gov-primary text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {area === 'RURAL' ? '🌾 Rural (Panchayat)' : '🏙️ Urban (Municipality)'}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Schemes like PMAY and SVANidhi vary by locality.</p>
        </div>
      </div>
    </div>
  );
};
