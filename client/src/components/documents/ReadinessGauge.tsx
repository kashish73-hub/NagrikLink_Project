import React from 'react';

interface ReadinessGaugeProps {
  percentage: number;
  readyCount: number;
  totalCount: number;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  percentage,
  readyCount,
  totalCount
}) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (pct: number) => {
    if (pct >= 80) return 'text-emerald-600 stroke-emerald-500';
    if (pct >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const colorClasses = getColor(percentage);

  return (
    <div className="flex items-center gap-5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
      {/* Circular SVG Gauge */}
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            className={`transition-all duration-500 ease-out ${colorClasses}`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-slate-900 leading-none">
            {percentage}%
          </span>
          <span className="text-[10px] font-bold text-slate-400 mt-0.5">READY</span>
        </div>
      </div>

      {/* Text Summary */}
      <div>
        <div className="text-xs uppercase tracking-wider font-extrabold text-slate-400">
          Document Readiness Score
        </div>
        <div className="text-lg font-bold text-slate-900 mt-0.5">
          {readyCount} of {totalCount} Certificates Ready
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {percentage >= 80
            ? '🚀 High readiness! You have the necessary documentation to apply immediately.'
            : percentage >= 50
            ? '⚠️ Moderate readiness. A few key certificates need to be issued or updated.'
            : '📋 Gathering required documents early will expedite government verification.'}
        </p>
      </div>
    </div>
  );
};
