// src/components/Pedidos.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle } from 'lucide-react';

// Importamos los datos (asegúrate de que mockPedidos.js esté actualizado)
import { statsPedidos, pedidosList as initialPedidos } from '../data/mockPedidos';

// Importamos los subcomponentes
import PedidoStatCard from './PedidoStatCard';
import PedidosTable from './PedidosTable';
import PedidoDetallePopup from './PedidoDetallePopup'; // <-- Nuevo componente de popup detallado

export default function Pedidos() {
  const [isVisible, setIsVisible] = useState(false);
  const [pedidosData, setPedidosData] = useState(initialPedidos);
  
  // Estado para controlar qué pedido se muestra en el Popup Detallado
  const [selectedPedido, setSelectedPedido] = useState(null);
  
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (pedidoId, newStatus) => {
    setPedidosData(prev => 
      prev.map(p => p.id === pedidoId ? { ...p, estado: newStatus } : p)
    );
    setToastMessage('Estado del pedido actualizado');
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const animationBaseClasses = `transform transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  return (
    <>
      <div className="space-y-6 pb-8 overflow-hidden relative">
        
        {/* Cabecera */}
        <div className={`mb-6 ${animationBaseClasses}`} style={{ transitionDelay: '0ms' }}>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Pedidos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona todos los pedidos de clientes</p>
        </div>

        {/* Notificación Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 flex items-center gap-2 bg-[#dcfce7] border border-[#bbf7d0] text-[#166534] px-4 py-3 rounded-lg shadow-lg animate-fade-in-up">
            <CheckCircle size={18} className="text-[#15803d]" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {statsPedidos.map((stat, index) => (
            <PedidoStatCard 
              key={stat.id} 
              stat={stat} 
              animationClasses={animationBaseClasses}
              delay={100 + (index * 50)}
            />
          ))}
        </div>

        {/* Filtros */}
        <div className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 ${animationBaseClasses}`} style={{ transitionDelay: '350ms' }}>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar por ID o cliente..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors" />
          </div>
          <div className="relative md:w-64">
            <Filter size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-11 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer transition-colors">
              <option>Todos los estados</option>
              <option>Pendientes</option>
              <option>En Proceso</option>
              <option>Enviados</option>
              <option>Entregados</option>
            </select>
          </div>
        </div>

        {/* Tabla de Datos - Pasamos la función 'onViewDetails' */}
        <PedidosTable 
          pedidos={pedidosData}
          animationClasses={animationBaseClasses}
          delay={500}
          onStatusChange={handleStatusChange}
          onViewDetails={setSelectedPedido} // <-- Conectar la función para capturar el click
        />

      </div>

      {/* Renderizado del Popup de Detalle */}
      <PedidoDetallePopup 
        pedido={selectedPedido} 
        onClose={() => setSelectedPedido(null)} // Al poner el estado en null, se cierra
      />
    </>
  );
}