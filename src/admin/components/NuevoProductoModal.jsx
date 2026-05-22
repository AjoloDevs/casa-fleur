import React from 'react';
import { X } from 'lucide-react';

export default function NuevoProductoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay oscuro con desenfoque */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Contenedor Principal del Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700 custom-scrollbar">
        
        <div className="p-6 sm:p-8">
          
          {/* Cabecera */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Nuevo Producto
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Formulario */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Fila 1: Nombre y Categoría */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nombre del Producto
                </label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Categoría
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors cursor-pointer">
                  <option value="">Seleccionar</option>
                  <option value="rosas">Rosas</option>
                  <option value="girasoles">Girasoles</option>
                  <option value="tulipanes">Tulipanes</option>
                  <option value="orquideas">Orquídeas</option>
                </select>
              </div>
            </div>

            {/* Fila 2: Descripción */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Descripción
              </label>
              <textarea 
                rows="4"
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Fila 3: Precio y Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Precio ($)
                </label>
                <input 
                  type="number" 
                  defaultValue="0"
                  min="0"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Stock
                </label>
                <input 
                  type="number" 
                  defaultValue="0"
                  min="0"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Fila 4: URL de Imagen */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                URL de Imagen
              </label>
              <input 
                type="url" 
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
              />
            </div>

            {/* Fila 5: Estado */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Estado
              </label>
              <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors cursor-pointer">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                onClick={onClose} // Temporalmente cierra el modal al dar clic en Crear
                className="flex-1 py-3.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl font-bold transition-all shadow-md shadow-fuchsia-500/20 active:scale-[0.98]"
              >
                Crear
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}