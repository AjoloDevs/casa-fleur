import React from 'react';
import { Package, Truck, Mail, Phone, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function InventarioModal({ item, onClose }) {
  if (!item) return null;

  const isLowStock = item.stockActual < item.min;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-6">
        
        {/* Cabecera */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="text-purple-500" /> {item.producto}
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isLowStock ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20'}`}>
              {isLowStock ? 'Stock Crítico' : 'Stock Saludable'}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">ID: {item.id} • Categoría: {item.categoria}</p>
        </div>

        {/* Panel de Actualización Rápida */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Actualizar Stock</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            <div className="text-center w-full sm:w-1/3">
              <p className="text-sm text-slate-500 dark:text-slate-400">Stock Actual</p>
              <p className={`text-4xl font-bold ${isLowStock ? 'text-red-500' : 'text-[#10b981]'}`}>
                {item.stockActual}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Min: {item.min} / Max: {item.max}</p>
            </div>

            <div className="flex-1 w-full flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Cantidad" 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="p-3 bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400 rounded-xl transition-colors" title="Añadir al inventario">
                <ArrowUpCircle size={24} />
              </button>
              <button className="p-3 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded-xl transition-colors" title="Descontar del inventario">
                <ArrowDownCircle size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Información del Proveedor */}
        <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Truck size={18} className="text-purple-500" /> Datos del Proveedor
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Empresa:</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">{item.proveedor}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Costo Unitario:</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">{item.costo}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-slate-400" />
              <p className="font-medium text-slate-700 dark:text-slate-300">{item.proveedorEmail}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-slate-400" />
              <p className="font-medium text-slate-700 dark:text-slate-300">{item.proveedorTelefono}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors">
            Cancelar
          </button>
          <button onClick={onClose} className="flex-1 py-3 bg-[#6a1b9a] hover:bg-purple-800 text-white rounded-xl font-semibold transition-colors shadow-md">
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
}