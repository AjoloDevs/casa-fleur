import React from 'react';
import { Mail, Phone, ShoppingBag, DollarSign, Eye, Ban, UserCheck } from 'lucide-react';

const EstadoBadge = ({ estado }) => {
  if (estado === 'Activo') {
    return (
      <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 rounded-full text-xs font-semibold">
        {estado}
      </span>
    );
  }
  return (
    <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 rounded-full text-xs font-semibold">
      {estado}
    </span>
  );
};

export default function ClientesTable({ clientes, animationClasses, delay, onViewClient, onToggleStatus }) {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Cliente</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Contacto</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Pedidos</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Total Gastado</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400">Estado</th>
              <th className="p-5 font-semibold text-sm text-slate-600 dark:text-slate-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${cliente.avatarColor}`}>
                      {cliente.nombre.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{cliente.nombre}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cliente.fechaAlta}</p>
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" /> {cliente.email}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" /> {cliente.telefono}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                    <ShoppingBag size={16} className="text-purple-500" /> {cliente.pedidos}
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <DollarSign size={16} className="text-green-500" /> {cliente.totalGastado}
                  </div>
                </td>

                <td className="p-5">
                  <EstadoBadge estado={cliente.estado} />
                </td>

                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    {/* Botón Ver Detalles */}
                    <button 
                      onClick={() => onViewClient(cliente)}
                      className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
                      title="Ver Detalles"
                    >
                      <Eye size={18} />
                    </button>
                    
                    {/* Botón Dinámico Bloquear/Desbloquear */}
                    <button 
                      onClick={() => onToggleStatus(cliente.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        cliente.estado === 'Activo'
                          ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
                          : 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                      }`}
                      title={cliente.estado === 'Activo' ? 'Bloquear Cliente' : 'Desbloquear Cliente'}
                    >
                      {cliente.estado === 'Activo' ? <Ban size={18} /> : <UserCheck size={18} />}
                    </button>
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