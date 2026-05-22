import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// Componente interno para pintar la "píldora" de estado del color correcto
const EstadoBadge = ({ estado }) => {
  switch (estado) {
    case 'Entregado':
      return <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 rounded-full text-xs font-semibold">{estado}</span>;
    case 'En Proceso':
      return <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-semibold">{estado}</span>;
    case 'Pendiente':
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-semibold">{estado}</span>;
    default:
      return <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-full text-xs font-semibold">{estado}</span>;
  }
};

export default function DashboardRecentOrders({ pedidos, animationClasses, delay }) {
  // Usamos el hook para que la tabla aparezca con estilo al hacer scroll hacia abajo
  const [tableRef, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={tableRef}
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Cabecera de la Tabla */}
      <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pedidos Recientes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Últimas transacciones</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl font-semibold transition-all shadow-md shadow-fuchsia-500/20 text-sm active:scale-[0.98]">
          Ver Todos
        </button>
      </div>

      {/* Contenedor responsivo de la Tabla */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-700">
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">ID</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Cliente</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Producto</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Monto</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-5 font-bold text-slate-900 dark:text-white">{pedido.id}</td>
                <td className="p-5 text-sm text-slate-600 dark:text-slate-300">{pedido.cliente}</td>
                <td className="p-5 text-sm text-slate-600 dark:text-slate-300">{pedido.producto}</td>
                <td className="p-5 font-bold text-slate-900 dark:text-white">{pedido.monto}</td>
                <td className="p-5">
                  <EstadoBadge estado={pedido.estado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}