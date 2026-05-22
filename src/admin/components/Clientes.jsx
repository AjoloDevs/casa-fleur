import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

import { statsClientes, clientesList as inicialClientes } from '../data/mockClientes';
import ClienteStatCard from './ClienteStatCard';
import ClientesTable from './ClientesTable';
import ClienteModal from './ClienteModal'; // <-- Importamos el Modal

export default function Clientes() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Estado reactivo para la tabla
  const [clientesData, setClientesData] = useState(inicialClientes);
  
  // Estado para controlar qué cliente se muestra en el Modal
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const animationBaseClasses = `transform transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  // Función para alternar el estado (Activo/Bloqueado)
  const handleToggleStatus = (clienteId) => {
    setClientesData(prevClientes => 
      prevClientes.map(cliente => {
        if (cliente.id === clienteId) {
          return {
            ...cliente,
            estado: cliente.estado === 'Activo' ? 'Bloqueado' : 'Activo'
          };
        }
        return cliente;
      })
    );
  };

  return (
    <>
      <div className="space-y-6 pb-8 overflow-hidden">
        
        {/* Título */}
        <div className={`mb-8 hidden lg:block ${animationBaseClasses}`} style={{ transitionDelay: '0ms' }}>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Clientes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona tu base de clientes</p>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsClientes.map((stat, index) => (
            <ClienteStatCard 
              key={stat.id} 
              stat={stat} 
              animationClasses={animationBaseClasses}
              delay={100 + (index * 100)}
            />
          ))}
        </div>

        {/* Barra de Filtros */}
        <div className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 ${animationBaseClasses}`} style={{ transitionDelay: '500ms' }}>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar por nombre o email..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors" />
          </div>
          <div className="relative md:w-64">
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer transition-colors">
              <option>Todos los estados</option>
              <option>Activos</option>
              <option>Bloqueados</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Tabla de Datos - Pasamos la data reactiva y las funciones */}
        <ClientesTable 
          clientes={clientesData} 
          animationClasses={animationBaseClasses}
          delay={600}
          onViewClient={setSelectedCliente}
          onToggleStatus={handleToggleStatus}
        />

      </div>

      {/* Renderizado del Modal */}
      <ClienteModal 
        cliente={selectedCliente} 
        onClose={() => setSelectedCliente(null)} 
      />
    </>
  );
}