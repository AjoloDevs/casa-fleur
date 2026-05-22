import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

import { productosList } from '../data/mockProductos';
import ProductoCard from './ProductoCard';
import NuevoProductoModal from './NuevoProductoModal';
import EditarProductoModal from './EditarProductoModal';
import EliminarProductoModal from './EliminarProductoModal'; // <-- 1. Importamos el Modal de Eliminación

export default function Productos() {
  const [isVisible, setIsVisible] = useState(false);
  
  const [isNewModalOpen, setIsNewModalOpen] = useState(false); 
  const [productoAEditar, setProductoAEditar] = useState(null); 
  const [productoAEliminar, setProductoAEliminar] = useState(null); // <-- 2. Estado para eliminar

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
        
        {/* Cabecera */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 ${animationBaseClasses}`} style={{ transitionDelay: '0ms' }}>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Productos</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona tu catálogo de productos</p>
          </div>
          
          <button 
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-bold rounded-xl transition-all shadow-md shadow-fuchsia-500/20 text-sm active:scale-[0.98] w-full sm:w-auto"
          >
            <Plus size={18} /> Nuevo Producto
          </button>
        </div>

        {/* Barra de Filtros */}
        <div 
          className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 ${animationBaseClasses}`} 
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar productos..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors" />
          </div>

          <div className="relative md:w-72">
            <Filter size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg pl-11 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer transition-colors">
              <option>Todas las categorías</option>
              <option>Rosas</option>
              <option>Girasoles</option>
              <option>Tulipanes</option>
              <option>Orquídeas</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosList.map((producto, index) => (
            <ProductoCard 
              key={producto.id} 
              producto={producto} 
              animationClasses={animationBaseClasses}
              delay={400 + (index * 100)} 
              onEdit={setProductoAEditar} 
              onDelete={setProductoAEliminar} // <-- 3. Pasamos la función a la tarjeta
            />
          ))}
        </div>

      </div>

      {/* Renderizado de Modales */}
      <NuevoProductoModal 
        isOpen={isNewModalOpen} 
        onClose={() => setIsNewModalOpen(false)} 
      />
      
      <EditarProductoModal 
        producto={productoAEditar} 
        onClose={() => setProductoAEditar(null)} 
      />

      {/* 4. Nuevo Modal de Eliminación */}
      <EliminarProductoModal 
        producto={productoAEliminar} 
        onClose={() => setProductoAEliminar(null)} 
      />
    </>
  );
}