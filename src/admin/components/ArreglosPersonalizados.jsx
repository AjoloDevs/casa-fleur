import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Importamos nuestros componentes separados
import { stats, pedidos } from '../data/mockArreglos';
import PedidoCard from './PedidoCard';
import PedidoModal from './PedidoModal';

export default function ArreglosPersonalizados() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

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
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Arreglos Personalizados</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona solicitudes de diseños personalizados</p>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-t border-x border-t-slate-100 border-x-slate-100 dark:border-t-slate-700 dark:border-x-slate-700 border-b-4 ${stat.colorClass} ${animationBaseClasses}`}
              style={{ transitionDelay: `${100 + (index * 100)}ms` }}
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Barra de Filtros */}
        <div className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 ${animationBaseClasses}`} style={{ transitionDelay: '500ms' }}>
          <div className="relative inline-block">
            <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-pink-500/50 appearance-none min-w-[200px] cursor-pointer transition-colors">
              <option>Todos los estados</option>
              <option>Pendientes</option>
              <option>Aprobados</option>
              <option>Completados</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Grid de Pedidos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {pedidos.map((pedido, index) => (
            <PedidoCard 
              key={pedido.id} 
              pedido={pedido} 
              onOpenModal={setSelectedPedido}
              animationClasses={animationBaseClasses}
              delay={600 + (index * 150)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <PedidoModal 
        pedido={selectedPedido} 
        onClose={() => setSelectedPedido(null)} 
      />
    </>
  );
}