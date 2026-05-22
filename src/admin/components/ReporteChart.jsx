import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ReporteChart({ data, animationClasses, delay }) {
  
  // Customizador del Tooltip flotante al pasar el mouse
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 dark:bg-slate-950/95 text-white p-3 rounded-xl shadow-xl border border-slate-700 backdrop-blur-md">
          <p className="text-xs text-slate-400 font-medium mb-1">{payload[0].payload.name}</p>
          <p className="text-sm font-bold text-purple-400">
            Ventas: <span className="text-white">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tendencia de Ventas</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Últimos 6 meses</p>
        </div>
        
        <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer w-full sm:w-auto">
          <option>6 meses</option>
          <option>12 meses</option>
        </select>
      </div>

      {/* Contenedor responsivo para adaptar el tamaño de la gráfica */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" h="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Gradiente degradado para el área bajo la curva */}
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              stroke="#94a3b8" 
              fontSize={12} 
              padding={{ left: 10, right: 10 }}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              stroke="#94a3b8" 
              fontSize={12} 
              domain={[0, 'auto']} 
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={() => <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Ventas ($)</span>}
            />

            {/* Configuración de la animación profesional de dibujado */}
            <Area 
              type="monotone" 
              dataKey="ventas" 
              stroke="#a855f7" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorVentas)" 
              isAnimationActive={true}
              animationDuration={2000} // Duración de 2 segundos para simular el trazado fluido
              animationEasing="cubic-bezier(0.25, 1, 0.5, 1)" // Curva de aceleración premium
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}