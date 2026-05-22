import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ReporteStatCard({ stat, animationClasses, delay }) {
  const Icon = stat.icon;

  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        <div className="flex items-center gap-1 text-[#10b981] font-semibold text-xs pt-1">
          <ArrowUpRight size={14} />
          <span>{stat.change}</span>
        </div>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${stat.bgIconClass} shadow-md`}>
        <Icon size={26} />
      </div>
    </div>
  );
}