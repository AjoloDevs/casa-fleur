import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function DashboardPieChart({ data, animationClasses, delay }) {
  const [chartRef, isVisible] = useIntersectionObserver();

  // Custom Label para mostrar el porcentaje y el nombre fuera del pastel
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    return (
      <text x={x} y={y} fill={data[index].color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12" fontWeight="500">
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div 
      ref={chartRef}
      className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-[400px] ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Categorías Populares</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Distribución de ventas</p>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" h="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={true}
              isAnimationActive={isVisible}
              animationDuration={1500}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Ventas']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}