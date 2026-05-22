import React from 'react';
import { Settings } from 'lucide-react';

export default function InventarioTable({ inventario, animationClasses, delay, onManageStock }) {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Producto</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Stock Actual</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Min/Max</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Proveedor</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Costo/Unidad</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Último Reabastecimiento</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {inventario.map((item) => {
              // Cálculos para la barra de progreso
              const isLowStock = item.stockActual < item.min;
              const colorClass = isLowStock ? 'text-red-500' : 'text-[#10b981]';
              const bgBarClass = isLowStock ? 'bg-red-500' : 'bg-[#10b981]';
              const progressPercentage = Math.min((item.stockActual / item.max) * 100, 100);

              return (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-5">
                    <p className="font-bold text-slate-900 dark:text-white">{item.producto}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.categoria}</p>
                  </td>
                  <td className="p-5">
                    <div className="mb-1">
                      <span className={`text-xl font-bold ${colorClass}`}>{item.stockActual}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{item.unidad}</span>
                    </div>
                    {/* Barra de progreso visual */}
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${bgBarClass}`} style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-600 dark:text-slate-300">
                    {item.min} / {item.max}
                  </td>
                  <td className="p-5 text-sm text-slate-600 dark:text-slate-300">
                    {item.proveedor}
                  </td>
                  <td className="p-5 font-semibold text-slate-900 dark:text-white">
                    {item.costo}
                  </td>
                  <td className="p-5 text-sm text-slate-600 dark:text-slate-300">
                    {item.ultimoReabastecimiento}
                  </td>
                  <td className="p-5 text-center">
                    {/* Botón único que abre el modal de gestión */}
                    <button 
                      onClick={() => onManageStock(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-lg transition-colors font-medium text-sm"
                    >
                      <Settings size={16} /> Gestionar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}