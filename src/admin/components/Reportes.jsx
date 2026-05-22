import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

// Se importó productosMenosVendidos
import { statsReportes, dataVentas, dataCategorias, dataAdquisicion, productosMasVendidos, productosMenosVendidos, dataComparativa } from '../data/mockReportes';
import ReporteStatCard from './ReporteStatCard';
import ReporteChart from './ReporteChart';
import ReportesDistribucion from './ReportesDistribucion';
import ReportesProductos from './ReportesProductos';
import ReporteComparativaChart from './ReporteComparativaChart';

export default function Reportes() {
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
      
      {/* Encabezado con Botón Exportar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 ${animationBaseClasses}`} style={{ transitionDelay: '0ms' }}>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Análisis y Reportes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Visualiza el rendimiento de tu negocio</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-bold rounded-xl transition-all shadow-md shadow-fuchsia-500/20 text-sm active:scale-[0.98] w-full sm:w-auto self-start sm:self-center">
          <Download size={18} /> Exportar Reporte
        </button>
      </div>

      {/* Grid de Métricas Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsReportes.map((stat, index) => (
          <ReporteStatCard 
            key={stat.id} 
            stat={stat} 
            animationClasses={animationBaseClasses}
            delay={100 + (index * 100)}
          />
        ))}
      </div>

      {/* Bloque 1: Gráfica de Tendencia de Ventas */}
      <ReporteChart 
        data={dataVentas} 
        animationClasses={animationBaseClasses}
        delay={500}
      />

      {/* Bloque 2: Gráficas de Distribución (Pie y Barras) */}
      <ReportesDistribucion 
        dataPie={dataCategorias}
        dataBar={dataAdquisicion}
        animationClasses={animationBaseClasses}
        delay={600}
      />

      {/* Bloque 3: Tablas de Productos (Más y Menos Vendidos) */}
      {/* Las puse en un grid de 2 columnas para que se vean lado a lado en PC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportesProductos 
          titulo="Productos Más Vendidos"
          productos={productosMasVendidos}
          animationClasses={animationBaseClasses}
          delay={700}
        />

        <ReportesProductos 
          titulo="Productos Menos Vendidos"
          productos={productosMenosVendidos}
          animationClasses={animationBaseClasses}
          delay={750}
        />
      </div>

      {/* Bloque 4: Gráfica Lineal de Comparativa */}
      <ReporteComparativaChart 
        data={dataComparativa}
        animationClasses={animationBaseClasses}
        delay={800}
      />

    </div>
  );
}