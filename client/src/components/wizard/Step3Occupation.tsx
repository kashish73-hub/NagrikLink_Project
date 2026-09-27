import React from 'react';
import { useWizardStore } from '../../stores/useWizardStore';
import { OccupationType, StudentLevel } from '@nagriklink/shared';
import { GraduationCap, Sprout, Hammer, Briefcase, UserCheck, HardHat, Building } from 'lucide-react';

const OCCUPATIONS: Array<{
  id: OccupationType;
  title: string;
  desc: string;
  icon: any;
}> = [
  { id: 'STUDENT', title: 'Student', desc: 'School, College or University', icon: GraduationCap },
  { id: 'FARMER', title: 'Farmer', desc: 'Cultivator, tenant or agrarian', icon: Sprout },
  { id: 'ARTISAN', title: 'Artisan / Craftsman', desc: 'Traditional 18 trades & crafts', icon: Hammer },
  { id: 'SELF_EMPLOYED', title: 'Self-Employed / Vendor', desc: 'Shopkeeper, vendor or MSME', icon: Briefcase },
  { id: 'DAILY_WAGE', title: 'Daily Wage Laborer', desc: 'Construction or casual worker', icon: HardHat },
  { id: 'UNEMPLOYED', title: 'Unemployed / Jobseeker', desc: 'Seeking livelihood opportunities', icon: UserCheck }
];

export const Step3Occupation: React.FC = () => {
  const { profile, updateProfile } = useWizardStore();

  const handleSelectOccupation = (occ: OccupationType) => {
    updateProfile({
      occupation: occ,
      isStudent: occ === 'STUDENT',
      studentLevel: occ === 'STUDENT' ? (profile.studentLevel === 'NOT_STUDENT' ? 'UNDERGRADUATE' : profile.studentLevel) : 'NOT_STUDENT'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Occupation & Academics</h2>
        <p className="text-sm text-slate-500 mt-1">
          Targeted schemes (scholarships, seed loans, farmer grants) are strongly linked to your current activity.
        </p>
      </div>

      {/* Occupation Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {OCCUPATIONS.map((item) => {
          const Icon = item.icon;
          const isSelected = profile.occupation === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectOccupation(item.id)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-gov-primary bg-sky-50/70 shadow-xs ring-2 ring-gov-primary/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 font-bold ${
                  isSelected ? 'bg-gov-primary text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-sm font-bold ${isSelected ? 'text-gov-primary' : 'text-slate-800'}`}>
                  {item.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Conditional: If Student, show Student Level */}
      {profile.occupation === 'STUDENT' && (
        <div className="bg-sky-50/80 border border-sky-200/70 p-4 rounded-xl space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Current Educational Level <span className="text-rose-500">*</span>
          </label>
          <select
            value={profile.studentLevel}
            onChange={(e) => updateProfile({ studentLevel: e.target.value as StudentLevel })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-primary focus:border-gov-primary text-slate-900 font-medium bg-white"
          >
            <option value="PRIMARY">Primary School (Class 1 - 8)</option>
            <option value="SECONDARY">Secondary School (Class 9 - 10)</option>
            <option value="HIGHER_SECONDARY">Higher Secondary (Class 11 - 12)</option>
            <option value="UNDERGRADUATE">Undergraduate (BA, BSc, BTech, BCom, MBBS)</option>
            <option value="POSTGRADUATE">Postgraduate (MA, MSc, MTech, MBA)</option>
            <option value="DIPLOMA_VOCATIONAL">Diploma / Vocational / ITI</option>
            <option value="DOCTORATE">Ph.D. / Research Fellow</option>
          </select>
          <p className="text-xs text-sky-700">Crucial for Post-Matric & Central Sector Higher Education Scholarships.</p>
        </div>
      )}

      {/* Conditional: If Farmer, show Land Holding */}
      {profile.occupation === 'FARMER' && (
        <div className="bg-emerald-50/80 border border-emerald-200/70 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800">
              Agricultural Land Holding (Acres)
            </label>
            <span className="text-base font-bold text-emerald-800 bg-white px-3 py-0.5 rounded-lg border border-emerald-200">
              {profile.landHoldingAcres} Acre{profile.landHoldingAcres === 1 ? '' : 's'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={profile.landHoldingAcres}
            onChange={(e) => updateProfile({ landHoldingAcres: Number(e.target.value) })}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0 Acres (Landless)</span>
            <span>2.5 Acres (Small Farmer)</span>
            <span>5 Acres (Marginal)</span>
            <span>15 Acres</span>
          </div>
          <p className="text-xs text-emerald-800">PM-Kisan and Rythu Bharosa require verifiable land ownership.</p>
        </div>
      )}

      {/* Conditional: If Artisan, show PM Vishwakarma info */}
      {profile.occupation === 'ARTISAN' && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1">
          <div className="font-bold">Recognized under PM Vishwakarma?</div>
          <p>
            Covers 18 trades including Carpenter (Suthar), Blacksmith (Lohar), Potter (Kumhaar), Sculptor (Moortikar), Cobbler (Charmakar), Mason (Raajmistri), Tailor (Darzi), and Weavers.
          </p>
        </div>
      )}
    </div>
  );
};
