import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function EliminarProductoModal({ producto, onClose }) {
  if (!producto) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay oscuro con desenfoque */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Contenedor del Modal (Más pequeño que los formularios) */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700 overflow-hidden">
        
        {/* Franja decorativa roja superior */}
        <div className="h-2 w-full bg-red-500"></div>

        <div className="p-6 sm:p-8 text-center space-y-4">
          
          {/* Icono de advertencia */}
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
            <AlertTriangle size={32} />
          </div>

          {/* Textos */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ¿Eliminar Producto?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Estás a punto de eliminar <span className="font-bold text-slate-700 dark:text-slate-200">"{producto.nombre}"</span> del catálogo. Esta acción no se puede deshacer.
          </p>

          {/* Botones de Acción */}
          <div className="flex gap-4 pt-6 mt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={onClose} // En un caso real, aquí llamarías a tu base de datos para borrarlo
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-md shadow-red-500/20 active:scale-[0.98]"
            >
              Sí, Eliminar
            </button>
          </div>

        </div>

        {/* Botón de cerrar (X) en la esquina */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}