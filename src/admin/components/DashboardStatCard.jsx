import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardStatCard({ stat, animationClasses, delay }) {
  const Icon = stat.icon;

  return (
    <div 
      className={`relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="space-y-1 z-10">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        
        <div className={`flex items-center gap-1 font-semibold text-xs pt-1 ${stat.isPositive ? 'text-[#10b981]' : 'text-red-500'}`}>
          {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{stat.trend}</span>
        </div>
      </div>
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${stat.bgIconClass} shadow-md z-10`}>
        <Icon size={26} />
      </div>

      {/* Borde inferior con gradiente */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 to-pink-500 opacity-80" />
    </div>
  );
}