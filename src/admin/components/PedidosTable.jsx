import React from 'react';
import { Eye, CheckCircle, Package, Truck, Clock } from 'lucide-react';

// Componente para la columna de Estado (Insignias estáticas con íconos)
const EstadoBadge = ({ estado }) => {
  switch (estado) {
    case 'Entregado':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold border border-green-200 dark:border-green-800/50"><CheckCircle size={14} /> Entregado</span>;
    case 'En Proceso':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-800/50"><Package size={14} /> En Proceso</span>;
    case 'Enviado':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-xs font-semibold border border-purple-200 dark:border-purple-800/50"><Truck size={14} /> Enviado</span>;
    case 'Pendiente':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-semibold border border-yellow-200 dark:border-yellow-800/50"><Clock size={14} /> Pendiente</span>;
    default:
      return null;
  }
};

// Función para obtener los estilos dinámicos del <select>
const getSelectStyles = (estado) => {
  switch (estado) {
    case 'En Proceso': return 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
    case 'Enviado': return 'bg-purple-50 text-purple-700 border-purple-200 focus:ring-purple-500 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
    case 'Pendiente': return 'bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export default function PedidosTable({ pedidos, animationClasses, delay, onStatusChange, onViewDetails }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden ${animationClasses}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">ID</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Cliente</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Fecha</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Total</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Estado</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-5 font-bold text-slate-900 dark:text-white text-sm">{pedido.id}</td>
                <td className="p-5">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{pedido.cliente}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{pedido.email}</p>
                </td>
                <td className="p-5 text-sm text-slate-600 dark:text-slate-300">{pedido.fecha}</td>
                <td className="p-5 font-bold text-slate-900 dark:text-white">{pedido.total}</td>
                <td className="p-5">
                  <EstadoBadge estado={pedido.estado} />
                </td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-3">
                    {/* Botón Ver Detalles */}
                    <button 
                      onClick={() => onViewDetails(pedido)}
                      className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
                      title="Ver Detalles"
                    >
                      <Eye size={18} />
                    </button>
                    
                    {/* Select Dinámico (Se oculta si ya está Entregado) */}
                    {pedido.estado !== 'Entregado' && (
                      <select 
                        value={pedido.estado}
                        onChange={(e) => onStatusChange(pedido.id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-3 py-2 outline-none border cursor-pointer transition-colors ${getSelectStyles(pedido.estado)}`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}