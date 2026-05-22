import React from 'react';
import { Package, Edit2, Trash2 } from 'lucide-react';

// Añadimos 'onDelete' a las props junto con 'onEdit'
export default function ProductoCard({ producto, animationClasses, delay, onEdit, onDelete }) {
  return (
    <div className={animationClasses} style={{ transitionDelay: `${delay}ms` }}>
      <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300">
        
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 gap-2">
            
            {/* Botón de Editar */}
            <button 
              onClick={() => onEdit(producto)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors shadow-lg active:scale-95" 
              title="Editar Producto"
            >
              <Edit2 size={18} />
            </button>
            
            {/* AQUÍ CONECTAMOS EL EVENTO ELIMINAR */}
            <button 
              onClick={() => onDelete(producto)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-lg active:scale-95" 
              title="Eliminar Producto"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Información del Producto */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{producto.nombre}</h3>
            <span className="px-2.5 py-1 bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 rounded-md text-xs font-semibold shrink-0">{producto.estado}</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 line-clamp-2">{producto.descripcion}</p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 leading-none">{producto.precio}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{producto.categoria}</p>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
              <Package size={16} />
              <span className="font-medium text-sm">{producto.stock}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}