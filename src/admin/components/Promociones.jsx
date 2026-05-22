import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  CheckCircle,
  Search,
  Filter,
  Tags,
  TicketPercent,
  Zap,
  Clock3,
  BarChart3,
} from 'lucide-react';

import { promocionesList } from '../data/mockPromociones';
import PromocionCard from './PromocionCard';
import NuevaPromocionModal from './NuevaPromocionModal';
import EditarPromocionModal from './EditarPromocionModal';
import EliminarPromocionModal from './EliminarPromocionModal';

export default function Promociones() {
  const [isVisible, setIsVisible] = useState(false);
  const [promosData, setPromosData] = useState(promocionesList);
  const [toastMessage, setToastMessage] = useState(null);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [promoAEditar, setPromoAEditar] = useState(null);
  const [promoAEliminar, setPromoAEliminar] = useState(null);

  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('todas');
  const [filterTipo, setFilterTipo] = useState('todos');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const animationBaseClasses = `transform transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  // --- NUEVA FUNCIÓN PARA GUARDAR LA PROMOCIÓN ---
  const handleSavePromo = (nuevaPromo) => {
    // 1. Añadimos la nueva promoción al principio de la lista
    setPromosData((prev) => [nuevaPromo, ...prev]);
    
    // 2. Mostramos un mensaje de éxito usando tu sistema de toasts
    setToastMessage(`Promoción "${nuevaPromo.titulo}" creada con éxito`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePromo = (id) => {
    const promocionSeleccionada = promosData.find((promo) => promo.id === id);
    if (!promocionSeleccionada) return;

    const nuevoEstado = !promocionSeleccionada.activo;

    setPromosData((prevPromos) =>
      prevPromos.map((promo) =>
        promo.id === id ? { ...promo, activo: nuevoEstado } : promo
      )
    );

    setToastMessage(
      `Promoción "${promocionSeleccionada.titulo}" ${
        nuevoEstado ? 'activada' : 'desactivada'
      }`
    );

    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeletePromo = () => {
    if (!promoAEliminar) return;

    setPromosData((prev) =>
      prev.filter((promo) => promo.id !== promoAEliminar.id)
    );

    setToastMessage(`Promoción "${promoAEliminar.titulo}" eliminada`);
    setPromoAEliminar(null);

    setTimeout(() => setToastMessage(null), 3000);
  };

  const promocionesFiltradas = useMemo(() => {
    return promosData.filter((promo) => {
      const coincideBusqueda =
        promo.titulo.toLowerCase().includes(search.toLowerCase()) ||
        promo.codigo.toLowerCase().includes(search.toLowerCase());

      const coincideEstado =
        filterEstado === 'todas'
          ? true
          : filterEstado === 'activas'
          ? promo.activo
          : !promo.activo;

      const coincideTipo =
        filterTipo === 'todos' ? true : promo.tipo === filterTipo;

      return coincideBusqueda && coincideEstado && coincideTipo;
    });
  }, [promosData, search, filterEstado, filterTipo]);

  const estadisticas = {
    total: promosData.length,
    activas: promosData.filter((promo) => promo.activo).length,
    cupones: promosData.filter((promo) => promo.tipo === 'cupon').length,

  };

  return (
    <>
      <div className="space-y-6 pb-8 overflow-hidden relative">
        {toastMessage && (
          <div className="fixed top-20 right-8 z-[100] flex items-center gap-2 bg-[#dcfce7] border border-[#bbf7d0] text-[#166534] px-4 py-3 rounded-lg shadow-lg animate-fade-in-up">
            <CheckCircle size={18} className="text-[#15803d]" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        <div
          className={`flex flex-col xl:flex-row xl:items-center justify-between gap-5 ${animationBaseClasses}`}
        >
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Promociones y Cupones
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Gestiona campañas, descuentos segmentados y automatizaciones.
            </p>
          </div>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-bold rounded-xl transition-all shadow-md shadow-fuchsia-500/20 text-sm active:scale-[0.98]"
          >
            <Plus size={18} /> Nueva Promoción
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Promociones Totales</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {estadisticas.total}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <Tags size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Activas</p>
                <h3 className="text-3xl font-black text-emerald-500 mt-1">
                  {estadisticas.activas}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Zap size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Cupones</p>
                <h3 className="text-3xl font-black text-fuchsia-500 mt-1">
                  {estadisticas.cupones}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center">
                <TicketPercent size={24} />
              </div>
            </div>
          </div>

          
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <Filter size={18} /> Filtros Inteligentes
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar promoción o cupón..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="todas">Todas</option>
              <option value="activas">Activas</option>
              <option value="inactivas">Inactivas</option>
            </select>

            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="todos">Todos los tipos</option>
              <option value="promocion">Promoción</option>
              <option value="cupon">Cupón</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {promocionesFiltradas.map((promo, index) => (
            <PromocionCard
              key={promo.id}
              promo={promo}
              delay={100 + index * 100}
              onToggle={handleTogglePromo}
              onEdit={setPromoAEditar}
              onDelete={setPromoAEliminar}
            />
          ))}
        </div>
      </div>

      <NuevaPromocionModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSave={handleSavePromo} 
      />

      <EditarPromocionModal
        promo={promoAEditar}
        onClose={() => setPromoAEditar(null)}
      />

      <EliminarPromocionModal
        promo={promoAEliminar}
        onClose={() => setPromoAEliminar(null)}
        onConfirm={handleDeletePromo}
      />
    </>
  );
}