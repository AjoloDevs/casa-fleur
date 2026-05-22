// src/components/PedidoDetallePopup.jsx
import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function PedidoDetallePopup({ pedido, onClose }) {
  if (!pedido) return null;

  // Función para asignar el color dinámico al Badge según el estado
  const getBadgeStyle = (estado) => {
    switch (estado) {
      case 'Entregado':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Enviado':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700 custom-scrollbar">
        
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Cabecera con ID y Estado Dinámico */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Detalle del Pedido
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {pedido.id}
              </p>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(pedido.estado)}`}>
              {pedido.estado}
            </span>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Información del Cliente con Iconos Morados */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Información del Cliente
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{pedido.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Teléfono</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{pedido.telefono}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:col-span-2">
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Dirección</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{pedido.direccion}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Lista de Productos */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Productos
            </p>
            {pedido.productos.map((producto, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{producto.nombre}</p>
                  <p className="text-xs text-slate-500">Cantidad: {producto.cantidad}</p>
                </div>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  ${producto.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 rounded-xl flex items-center justify-between text-white shadow-md shadow-fuchsia-500/20">
            <p className="font-semibold">Total</p>
            <p className="text-xl font-bold">${parseFloat(pedido.total.replace('$', '')).toFixed(2)}</p>
          </div>

          {/* Fechas (Renderizado Condicional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Fecha de Pedido</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{pedido.fecha}</p>
              </div>
            </div>
            
            {/* Solo se muestra si el pedido tiene fechaEntrega */}
            {pedido.fechaEntrega && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Fecha de Entrega</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{pedido.fechaEntrega}</p>
                </div>
              </div>
            )}
          </div>

          {/* Notas (Renderizado Condicional) */}
          {pedido.notas && (
            <div className="bg-[#fefce8] dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
              <p className="text-sm font-bold text-yellow-800 dark:text-yellow-500 mb-1">Notas:</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">{pedido.notas}</p>
            </div>
          )}

          {/* Botón Cerrar Inferior */}
          <button 
            onClick={onClose}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors active:scale-[0.98]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}