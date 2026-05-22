import React from 'react';
import {
  Tag,
  Calendar,
  Edit,
  Trash2,
  Users,
  Target,
  ShoppingBag,
  Eye,
  BarChart3,
} from 'lucide-react';

export default function PromocionCard({
  promo,
  delay,
  onToggle,
  onEdit,
  onDelete,
}) {
  const progreso = Math.min((promo.usoActual / promo.limiteUso) * 100, 100);

  const estadoColor = promo.activo
    ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
    : 'bg-slate-100 text-slate-500 border-slate-200';

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                promo.activo
                  ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Tag size={24} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {promo.titulo}
                </h3>

                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${estadoColor}`}
                >
                  {promo.activo ? 'ACTIVA' : 'INACTIVA'}
                </span>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {promo.descripcion}
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggle(promo.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              promo.activo ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                promo.activo ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
              Código
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-widest text-violet-600 dark:text-violet-400">
                {promo.codigo}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-right">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Descuento
            </p>
            <h3 className="text-3xl font-black text-fuchsia-500">
              {promo.descuento}%
            </h3>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <Calendar size={15} /> Inicio
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              {promo.fechaInicio}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <Calendar size={15} /> Fin
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              {promo.fechaFin}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl p-4 border border-violet-100 dark:border-violet-800">
            <div className="flex items-center gap-2 text-violet-600 mb-2 font-semibold">
              <Users size={15} /> Segmento
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {promo.segmento || 'Todos los clientes'}
            </p>
          </div>

          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-2xl p-4 border border-fuchsia-100 dark:border-fuchsia-800">
            <div className="flex items-center gap-2 text-fuchsia-600 mb-2 font-semibold">
              <ShoppingBag size={15} /> Condición
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {promo.condicion || 'Sin restricción'}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-500">Uso</span>
            <span className="text-slate-700 dark:text-slate-300">
              {promo.usoActual} / {promo.limiteUso}
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-center mb-1 text-slate-400">
              <Eye size={16} />
            </div>
            <p className="text-xs text-slate-500">Visualizaciones</p>
            <h4 className="font-black text-slate-900 dark:text-white mt-1">
              {promo.visualizaciones || 0}
            </h4>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-center mb-1 text-slate-400">
              <Target size={16} />
            </div>
            <p className="text-xs text-slate-500">Conversiones</p>
            <h4 className="font-black text-slate-900 dark:text-white mt-1">
              {promo.conversiones || 0}
            </h4>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-center mb-1 text-slate-400">
              <BarChart3 size={16} />
            </div>
            <p className="text-xs text-slate-500">CTR</p>
            <h4 className="font-black text-slate-900 dark:text-white mt-1">
              {promo.ctr || '0%'}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onEdit(promo)}
            className="flex items-center justify-center gap-2 py-3 bg-violet-50 hover:bg-violet-100 text-violet-600 rounded-2xl font-bold transition-colors"
          >
            <Edit size={16} /> Editar
          </button>

          <button
            onClick={() => onDelete(promo)}
            className="flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl font-bold transition-colors"
          >
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
