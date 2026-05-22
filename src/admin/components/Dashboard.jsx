import React, { useState, useEffect } from 'react';

// Importamos los datos (asegúrate de incluir pedidosRecientes)
import { statsDashboard, dataVentasMensuales, dataCategoriasPopulares, pedidosRecientes } from '../data/mockDashboard';

// Importamos los subcomponentes
import DashboardStatCard from './DashboardStatCard';
import DashboardLineChart from './DashboardLineChart';
import DashboardPieChart from './DashboardPieChart';
import DashboardRecentOrders from './DashboardRecentOrders'; // <-- Nuevo componente

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const animationBaseClasses = `transform transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  return (
    <div className="space-y-6 pb-8 overflow-hidden">
      
      {/* Título */}
      <div className={`mb-8 ${animationBaseClasses}`} style={{ transitionDelay: '0ms' }}>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Bienvenido al panel de administración</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDashboard.map((stat, index) => (
          <DashboardStatCard 
            key={stat.id} 
            stat={stat} 
            animationClasses={animationBaseClasses}
            delay={100 + (index * 100)}
          />
        ))}
      </div>

      {/* Gráficas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardLineChart 
          data={dataVentasMensuales} 
          animationClasses={animationBaseClasses} 
          delay={500} 
        />
        <DashboardPieChart 
          data={dataCategoriasPopulares} 
          animationClasses={animationBaseClasses} 
          delay={600} 
        />
      </div>

      {/* Tabla de Pedidos Recientes */}
      <DashboardRecentOrders 
        pedidos={pedidosRecientes}
        animationClasses={animationBaseClasses}
        delay={700} // Aparece justo después de las gráficas
      />

    </div>
  );
}