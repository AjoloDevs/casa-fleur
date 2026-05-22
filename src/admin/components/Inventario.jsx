import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

import { statsInventario, inventarioList } from '../data/mockInventario';
import InventarioStatCard from './InventarioStatCard';
import InventarioTable from './InventarioTable';
import InventarioModal from './InventarioModal';

export default function Inventario() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const animationBaseClasses = `transform transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  return (
    <>
      <div className="space-y-6 pb-8 overflow-hidden">
        
        {/* Título */}
        <div className={`mb-8 hidden lg:block ${animationBaseClasses}`} style={{ transitionDelay: '0ms' }}>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Inventario</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona el stock de productos</p>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsInventario.map((stat, index) => (
            <InventarioStatCard 
              key={stat.id} 
              stat={stat} 
              animationClasses={animationBaseClasses}
              delay={100 + (index * 100)}
            />
          ))}
        </div>

        {/* Filtros */}
        <div className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex ${animationBaseClasses}`} style={{ transitionDelay: '500ms' }}>
          <div className="relative md:w-64">
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer transition-colors">
              <option>Todas las categorías</option>
              <option>Flores</option>
              <option>Embalaje</option>
              <option>Complementos</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Tabla */}
        <InventarioTable 
          inventario={inventarioList} 
          animationClasses={animationBaseClasses}
          delay={600}
          onManageStock={setSelectedItem}
        />

      </div>

      {/* Modal interactivo */}
      <InventarioModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}