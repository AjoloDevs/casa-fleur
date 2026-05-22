import React from 'react';
import { X } from 'lucide-react';

export default function PedidoGeneralModal({ pedido, onClose }) {
  if (!pedido) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resumen de Pedido</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"><X size={18} /></button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
              <span className="text-slate-500">ID del Pedido</span>
              <span className="font-bold text-slate-900 dark:text-white">{pedido.id}</span>
            </div>
            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
              <span className="text-slate-500">Cliente</span>
              <span className="font-bold text-slate-900 dark:text-white">{pedido.cliente}</span>
            </div>
            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
              <span className="text-slate-500">Total</span>
              <span className="font-bold text-slate-900 dark:text-white">{pedido.total}</span>
            </div>
          </div>

          <button onClick={onClose} className="w-full mt-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}