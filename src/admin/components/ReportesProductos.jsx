import React from 'react';
import { ShoppingCart, DollarSign } from 'lucide-react';

// Se agregó "titulo" a los props del componente
export default function ReportesProductos({ titulo, productos, animationClasses, delay }) {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4 ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* El título ahora es dinámico */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{titulo}</h3>
      
      <div className="space-y-3">
        {productos.map((prod) => (
          <div 
            key={prod.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-sm transition-shadow gap-4"
          >
            {/* Rank, Icono y Título */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center justify-center shrink-0">
                {prod.rank}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{prod.nombre}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1"><ShoppingCart size={12} /> {prod.vendidos} vendidos</span>
                  <span className="flex items-center gap-1"><DollarSign size={12} /> {prod.total}</span>
                </div>
              </div>
            </div>

            {/* Precio Promedio */}
            <div className="text-left sm:text-right shrink-0">
              <p className="text-base font-bold text-purple-600 dark:text-purple-400">{prod.precioPromedio}</p>
              <p className="text-[10px] text-slate-400 font-medium">Precio Promedio</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}