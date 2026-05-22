import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

export const statsDashboard = [
  { 
    id: 1, 
    label: 'Ingresos Totales', 
    value: '$24,580', 
    trend: '+12.5%', 
    isPositive: true,
    icon: DollarSign, 
    bgIconClass: 'bg-[#10b981]' // Verde
  },
  { 
    id: 2, 
    label: 'Pedidos', 
    value: '1,234', 
    trend: '+8.2%', 
    isPositive: true,
    icon: ShoppingCart, 
    bgIconClass: 'bg-[#3b82f6]' // Azul
  },
  { 
    id: 3, 
    label: 'Clientes', 
    value: '892', 
    trend: '+15.3%', 
    isPositive: true,
    icon: Users, 
    bgIconClass: 'bg-[#a855f7]' // Morado
  },
  { 
    id: 4, 
    label: 'Productos', 
    value: '256', 
    trend: '-2.4%', 
    isPositive: false,
    icon: Package, 
    bgIconClass: 'bg-[#f97316]' // Naranja
  },
];

export const dataVentasMensuales = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 4500 },
  { name: 'May', ventas: 6000 },
  { name: 'Jun', ventas: 5500 },
  { name: 'Jul', ventas: 7000 },
];

export const dataCategoriasPopulares = [
  { name: 'Rosas', value: 29, color: '#ef4444' },     // Rojo
  { name: 'Girasoles', value: 22, color: '#f59e0b' },   // Amarillo/Naranja
  { name: 'Tulipanes', value: 15, color: '#ec4899' },   // Rosa
  { name: 'Orquídeas', value: 20, color: '#8b5cf6' },   // Morado
  { name: 'Otros', value: 14, color: '#10b981' },       // Verde
];

export const pedidosRecientes = [
  { id: 'ORD-001', cliente: 'María García', producto: 'Ramo de Rosas Rojas', monto: '$45.00', estado: 'Entregado' },
  { id: 'ORD-002', cliente: 'Juan Pérez', producto: 'Arreglo Personalizado', monto: '$120.00', estado: 'En Proceso' },
  { id: 'ORD-003', cliente: 'Ana López', producto: 'Girasoles Premium', monto: '$65.00', estado: 'Pendiente' },
  { id: 'ORD-004', cliente: 'Carlos Ruiz', producto: 'Orquídeas Blancas', monto: '$89.00', estado: 'Entregado' },
];