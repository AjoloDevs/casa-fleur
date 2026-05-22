import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ReporteComparativaChart({ data, animationClasses, delay }) {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-[380px] ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Comparativa de Pedidos y Clientes</h3>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" h="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} />
            <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} />
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
            
            <Line 
              type="monotone" 
              dataKey="Pedidos" 
              stroke="#a855f7" 
              strokeWidth={2.5} 
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1800}
            />
            <Line 
              type="monotone" 
              dataKey="Clientes" 
              stroke="#ec4899" 
              strokeWidth={2.5} 
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}