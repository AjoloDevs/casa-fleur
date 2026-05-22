import React from 'react';
import { Mail, Phone, MapPin, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

export default function ClienteModal({ cliente, onClose }) {
  if (!cliente) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay oscuro */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Contenedor Principal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700 custom-scrollbar p-6 sm:p-8 space-y-6">
        
        {/* Cabecera (Avatar y Nombre) */}
        <div className="flex items-center gap-5">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md ${cliente.avatarColor}`}>
            {cliente.nombre.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {cliente.nombre}
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              cliente.estado === 'Activo' 
                ? 'bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20' 
                : 'bg-red-100 text-red-600 dark:bg-red-900/30'
            }`}>
              {cliente.estado}
            </span>
          </div>
        </div>

        {/* Grid de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
              <Mail size={16} /> Email
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">{cliente.email}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
              <Phone size={16} /> Teléfono
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">{cliente.telefono}</p>
          </div>
        </div>

        {/* Dirección */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
          <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
            <MapPin size={16} /> Dirección
          </p>
          <p className="font-medium text-slate-800 dark:text-slate-200">{cliente.direccion}</p>
        </div>

        {/* Tarjetas de Estadísticas del Cliente */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
            <ShoppingBag size={24} className="text-purple-600 dark:text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{cliente.pedidos}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Pedidos</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
            <DollarSign size={24} className="text-green-600 dark:text-green-400 mb-2" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{cliente.totalGastado}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Gastado</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
            <TrendingUp size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{cliente.promedioPedido}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Promedio por Pedido</p>
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Fecha de Registro</p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{cliente.fechaRegistro}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Último Pedido</p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{cliente.ultimoPedido}</p>
          </div>
        </div>

        {/* Botón Cerrar */}
        <div className="pt-2">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}