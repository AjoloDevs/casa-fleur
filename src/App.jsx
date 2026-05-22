import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Menu, Sun, Moon, X, Bell } from 'lucide-react';

// ==========================================
// 1. Importaciones de la Tienda Principal
// (Apuntando directamente a la raíz de src)
// ==========================================
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Personalizar from './Personalizar';
import Portafolio from './Portafolio'; 
import PromocionesTienda from './Promociones'; // Renombrado para evitar conflicto con el admin
import Perfil from './Perfil';
import Catalogo from './Catalogo';
import ProductDetails from './ProductDetails';
import Favoritos from './Favoritos';
import Carrito from './Carrito';
import Checkout from './Checkout';
import Success from './Success';
import Historial from './Historial';

// ==========================================
// 2. Importaciones del Panel de Administración
// (Ajustadas a la nueva ruta lib/admin)
// ==========================================
import Sidebar from './admin/components/Sidebar';
import Dashboard from './admin/components/Dashboard'; 
import ArreglosPersonalizados from './admin/components/ArreglosPersonalizados';
import Clientes from './admin/components/Clientes'; 
import Inventario from './admin/components/Inventario'; 
import Reportes from './admin/components/Reportes';
import Productos from './admin/components/Productos';
import Pedidos from './admin/components/Pedidos';
import PromocionesAdmin from './admin/components/Promociones';

// Componente genérico para rutas en desarrollo
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-fade-in-up">
    <p className="text-xl font-medium mb-2">Sección {title}</p>
    <p className="text-sm">En construcción...</p>
  </div>
);

// ==========================================
// 3. Layout del Administrador (Protegido)
// ==========================================
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Protección de ruta: Verifica si es admin
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Manejo del Modo Oscuro
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Extraer el nombre de la página actual de la URL
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path || path === 'admin') return 'Dashboard';
    if (path === 'arreglos') return 'Arreglos Personalizados';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Cabecera del Admin */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-8 transition-colors duration-300 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-bold hidden lg:block animate-fade-in-up" key={location.pathname}>
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500 border-2 border-slate-100 dark:border-slate-700"></span>
              </span>
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Área Dinámica donde se renderizan las sub-rutas del admin */}
        <div className="p-4 lg:p-8 flex-1 overflow-y-auto custom-scrollbar relative">
          <Outlet /> 
        </div>

      </main>
    </div>
  );
};

// ==========================================
// 4. Enrutador Principal (App)
// ==========================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* === RUTAS DE LA TIENDA PÚBLICA === */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/portafolio" element={<Portafolio />} /> 
        <Route path="/promociones" element={<PromocionesTienda />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductDetails />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/historial" element={<Historial />} />

        {/* === RUTAS DEL PANEL DE ADMINISTRACIÓN === */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Si entran a /admin, los redirige a /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="arreglos" element={<ArreglosPersonalizados />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="productos" element={<Productos />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="promociones" element={<PromocionesAdmin />} />
          <Route path="configuracion" element={<Placeholder title="Configuración" />} />
          
          {/* Cualquier ruta extraña dentro de /admin */}
          <Route path="*" element={<Placeholder title="No Encontrada" />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;