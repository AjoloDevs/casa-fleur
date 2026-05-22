import React from 'react';
import { Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function PedidoCard({ pedido, onOpenModal, animationClasses, delay }) {
  const EventoIcon = pedido.eventoIcon;

  return (
    <div className={animationClasses} style={{ transitionDelay: `${delay}ms` }}>
      <div className="h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-lg transition-shadow duration-300">
        
        <div className="relative h-48 w-full overflow-hidden group">
          <img src={pedido.imagen} alt={pedido.solicitud} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-4 right-4">
            <StatusBadge estado={pedido.estado} />
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pedido.id}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{pedido.cliente}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Presupuesto</p>
              <p className="text-lg font-bold text-violet-600 dark:text-violet-400">{pedido.presupuesto}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 text-violet-600 dark:text-violet-400">
            <EventoIcon size={16} />
            <span className="text-sm font-medium">{pedido.tipoEvento}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {pedido.colores.map(color => (
              <span key={color} className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-md text-xs font-medium">{color}</span>
            ))}
            {pedido.flores.map(flor => (
              <span key={flor} className="px-2.5 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-md text-xs font-medium">{flor}</span>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg mb-6 border border-slate-100 dark:border-slate-800 flex-1">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Solicitud especial:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{pedido.solicitud}</p>
          </div>

          <button 
            onClick={() => onOpenModal(pedido)}
            className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-fuchsia-500/20 active:scale-[0.98]"
          >
            <Eye size={18} /> Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}