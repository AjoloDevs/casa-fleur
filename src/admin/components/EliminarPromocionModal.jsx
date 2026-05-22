import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function EliminarPromocionModal({
  promo,
  onClose,
  onConfirm,
}) {
  if (!promo) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up">
        <div className="h-2 bg-gradient-to-r from-red-500 to-rose-500" />

        <div className="p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={36} />
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            Eliminar promoción
          </h2>

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Estás a punto de eliminar la campaña
            <span className="font-black text-slate-900 dark:text-white">
              {' '}
              “{promo.titulo}”
            </span>
            .
          </p>

          <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-4 text-left">
            <p className="font-bold text-red-600 mb-2">
              Esta acción eliminará:
            </p>

            <ul className="space-y-2 text-sm text-red-500">
              <li>• Configuración del cupón</li>
              <li>• Segmentaciones activas</li>
              <li>• Automatizaciones asociadas</li>
              <li>• Métricas y estadísticas</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={onClose}
              className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-black shadow-lg shadow-red-500/20 transition-all"
            >
              <Trash2 size={16} /> Eliminar
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
