import React from 'react';

export default function PedidoStatCard({ stat, animationClasses, delay }) {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border-t border-x border-slate-100 dark:border-slate-700 border-b-4 ${stat.colorClass} ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
    </div>
  );
}