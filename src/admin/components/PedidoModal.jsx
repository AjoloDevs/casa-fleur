import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PedidoModal({ pedido, onClose }) {
  if (!pedido) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up border border-slate-200 dark:border-slate-700 custom-scrollbar">
        <div className="p-6 sm:p-8 space-y-6">
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Detalles del Arreglo - {pedido.id}
          </h2>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Imágenes de Referencia</h3>
            <div className="grid grid-cols-2 gap-4">
              {pedido.imagenesReferencia.map((img, idx) => (
                <img key={idx} src={img} alt={`Referencia ${idx + 1}`} className="w-full h-32 sm:h-40 object-cover rounded-xl border border-slate-200 dark:border-slate-700" />
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Cliente</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-300">Nombre:</strong> {pedido.cliente}</p>
              <p className="text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-300">Email:</strong> {pedido.email}</p>
              <p className="text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-300">Teléfono:</strong> {pedido.telefono}</p>
            </div>
          </div>

          <div className="bg-purple-50/50 dark:bg-slate-800/80 rounded-xl p-5 border border-purple-100 dark:border-slate-700 space-y-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Especificaciones</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Ocasión:</p>
                <p className="font-medium text-slate-800 dark:text-slate-300">{pedido.tipoEvento}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Presupuesto:</p>
                <p className="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-400">{pedido.presupuesto}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Colores:</p>
              <div className="flex flex-wrap gap-2">
                {pedido.colores.map(color => (
                  <span key={color} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">{color}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Flores:</p>
              <div className="flex flex-wrap gap-2">
                {pedido.flores.map(flor => (
                  <span key={flor} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">{flor}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Solicitud Especial:</p>
              <p className="text-sm text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">{pedido.solicitud}</p>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-[#00c853] hover:bg-[#00e676] text-white rounded-xl font-bold transition-colors active:scale-[0.98]">
                <CheckCircle size={20} /> Aprobar
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-[#ff3d00] hover:bg-[#ff5252] text-white rounded-xl font-bold transition-colors active:scale-[0.98]">
                <XCircle size={20} /> Rechazar
              </button>
            </div>
            <button onClick={onClose} className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}