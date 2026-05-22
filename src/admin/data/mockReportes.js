import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export const statsReportes = [
  { id: 1, label: 'Ingresos Totales', value: '$138,000', change: '+23.5%', icon: DollarSign, bgIconClass: 'bg-[#10b981]' },
  { id: 2, label: 'Total Pedidos', value: '1,273', change: '+18.2%', icon: ShoppingCart, bgIconClass: 'bg-[#3b82f6]' },
  { id: 3, label: 'Clientes Activos', value: '860', change: '+32.1%', icon: Users, bgIconClass: 'bg-[#a855f7]' },
  { id: 4, label: 'Ticket Promedio', value: '$108', change: '+5.3%', icon: TrendingUp, bgIconClass: 'bg-[#f97316]' },
];

export const dataVentas = [
  { name: 'Ene', ventas: 12000 },
  { name: 'Feb', ventas: 15000 },
  { name: 'Mar', ventas: 18000 },
  { name: 'Abr', ventas: 16500 },
  { name: 'May', ventas: 22000 },
  { name: 'Jun', ventas: 24000 },
];

export const dataCategorias = [
  { name: 'Rosas', value: 35000, color: '#ef4444' },
  { name: 'Girasoles', value: 28000, color: '#f59e0b' },
  { name: 'Tulipanes', value: 18000, color: '#ec4899' },
  { name: 'Orquídeas', value: 25000, color: '#a855f7' },
  { name: 'Arreglos Personalizados', value: 32000, color: '#10b981' },
];

export const dataAdquisicion = [
  { name: 'Ene', Nuevos: 45, Recurrentes: 53 },
  { name: 'Feb', Nuevos: 58, Recurrentes: 62 },
  { name: 'Mar', Nuevos: 72, Recurrentes: 74 },
  { name: 'Abr', Nuevos: 65, Recurrentes: 68 },
  { name: 'May', Nuevos: 86, Recurrentes: 92 },
  { name: 'Jun', Nuevos: 94, Recurrentes: 102 },
];

export const productosMasVendidos = [
  { id: 1, rank: '#1', nombre: 'Ramo de Rosas Premium', vendidos: 450, total: '$20,250', precioPromedio: '$45.00' },
  { id: 2, rank: '#2', nombre: 'Arreglo Personalizado', vendidos: 280, total: '$33,600', precioPromedio: '$120.00' },
  { id: 3, rank: '#3', nombre: 'Girasoles Brillantes', vendidos: 380, total: '$13,300', precioPromedio: '$35.00' },
  { id: 4, rank: '#4', nombre: 'Orquídeas Elegantes', vendidos: 190, total: '$12,350', precioPromedio: '$65.00' },
  { id: 5, rank: '#5', nombre: 'Tulipanes Multicolor', vendidos: 320, total: '$12,160', precioPromedio: '$38.00' },
];

// --- NUEVA LISTA: PRODUCTOS MENOS VENDIDOS ---
export const productosMenosVendidos = [
  { id: 1, rank: '#1', nombre: 'Cactus Decorativo Mini', vendidos: 12, total: '$180', precioPromedio: '$15.00' },
  { id: 2, rank: '#2', nombre: 'Ramo de Claveles Simples', vendidos: 25, total: '$500', precioPromedio: '$20.00' },
  { id: 3, rank: '#3', nombre: 'Suculentas en Maceta', vendidos: 34, total: '$850', precioPromedio: '$25.00' },
  { id: 4, rank: '#4', nombre: 'Corona Funeraria Básica', vendidos: 45, total: '$4,050', precioPromedio: '$90.00' },
  { id: 5, rank: '#5', nombre: 'Arreglo de Margaritas', vendidos: 52, total: '$1,300', precioPromedio: '$25.00' },
];

export const dataComparativa = [
  { name: 'Ene', Pedidos: 150, Clientes: 95 },
  { name: 'Feb', Pedidos: 180, Clientes: 115 },
  { name: 'Mar', Pedidos: 215, Clientes: 140 },
  { name: 'Abr', Pedidos: 195, Clientes: 130 },
  { name: 'May', Pedidos: 260, Clientes: 175 },
  { name: 'Jun', Pedidos: 285, Clientes: 190 },
];