import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ReportesDistribucion({ dataPie, dataBar, animationClasses, delay }) {
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${animationClasses}`} style={{ transitionDelay: `${delay}ms` }}>
      
      {/* Gráfico de Pastel - Ingresos por Categoría */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-[380px] flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Ingresos por Categoría</h3>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" h="100%">
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']} />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle"
                layout="horizontal"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras - Adquisición de Clientes */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-[380px] flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Adquisición de Clientes</h3>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" h="100%">
            <BarChart data={dataBar} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} />
              <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} />
              <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} />
              <Legend verticalAlign="bottom" iconType="square" wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="Nuevos" fill="#a855f7" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1500} />
              <Bar dataKey="Recurrentes" fill="#ec4899" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}