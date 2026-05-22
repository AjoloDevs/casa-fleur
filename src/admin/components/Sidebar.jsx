import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // <-- Agregamos Link aquí
import { 
  LayoutDashboard, Package, ShoppingCart, Tag, Sparkles, 
  Users, Archive, BarChart, Settings, X, ChevronDown, Store // <-- Importamos Store
} from 'lucide-react';

// Rutas corregidas (quitamos la doble diagonal //)
const menuItems = [
  { id: 'dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'productos', path: '/admin/productos', label: 'Productos', icon: Package },
  { id: 'pedidos', path: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { id: 'promociones', path: '/admin/promociones', label: 'Promociones', icon: Tag },
  { id: 'arreglos', path: '/admin/arreglos', label: 'Arreglos Personalizados', icon: Sparkles },
  { id: 'clientes', path: '/admin/clientes', label: 'Clientes', icon: Users },
  { id: 'inventario', path: '/admin/inventario', label: 'Inventario', icon: Archive },
  { id: 'reportes', path: '/admin/reportes', label: 'Reportes', icon: BarChart },
  { id: 'configuracion', path: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#6a1b9a] dark:bg-slate-950 text-white flex flex-col transform transition-all duration-500 ease-in-out h-full overflow-hidden shadow-2xl lg:shadow-none
          ${isOpen ? 'translate-x-0 w-72 opacity-100' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0'}
        `}
      >
        <div style={{ transitionDelay: isOpen ? '100ms' : '0ms' }} className={`flex items-center justify-between p-6 w-72 shrink-0 transform transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-pink-500 p-2 rounded-lg text-white"><Sparkles size={24} /></div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Admin Panel</h1>
              <p className="text-xs text-purple-200 dark:text-slate-400">Gestión completa</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-purple-200 hover:text-white rounded-lg transition-colors"><X size={20} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar w-72 shrink-0">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const delay = isOpen ? 150 + (index * 50) : 0;
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                style={{ transitionDelay: `${delay}ms` }}
                className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transform transition-all duration-500 ease-out group
                  ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                  ${isActive 
                    ? 'bg-white/20 text-white shadow-sm' 
                    : 'text-purple-100 hover:bg-white/10 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={isActive ? 'text-white' : 'text-purple-300 group-hover:text-white dark:text-slate-500'} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ transitionDelay: isOpen ? `${150 + (menuItems.length * 50)}ms` : '0ms' }} className={`p-4 border-t border-purple-800/50 dark:border-slate-800 w-72 shrink-0 transform transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* --- NUEVO BOTÓN: VOLVER A LA TIENDA --- */}
          <Link 
            to="/home" 
            className="w-full flex items-center gap-3 p-3 mb-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors shadow-md"
          >
            <Store size={20} />
            <span className="font-bold text-sm">Volver a la Tienda</span>
          </Link>

          {/* Perfil del admin */}
          <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white shrink-0">A</div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-white">admin</p>
              <p className="text-xs text-purple-200 dark:text-slate-400">Administrador</p>
            </div>
            <ChevronDown size={16} className="text-purple-300" />
          </button>
        </div>
      </aside>
    </>
  );
}