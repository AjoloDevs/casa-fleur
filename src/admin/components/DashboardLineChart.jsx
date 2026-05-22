import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function DashboardLineChart({ data, animationClasses, delay }) {
  const [chartRef, isVisible] = useIntersectionObserver();

  return (
    <div 
      ref={chartRef}
      className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-[400px] ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ventas Mensuales</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Últimos 7 meses</p>
        </div>
        <div className="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm">
          2026
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" h="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVentasDash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} />
            <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="ventas" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              fill="url(#colorVentasDash)" 
              isAnimationActive={isVisible}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}