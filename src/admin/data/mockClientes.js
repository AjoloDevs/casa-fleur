import { Users, UserCheck, Ban, DollarSign } from 'lucide-react';

export const statsClientes = [
  { id: 1, label: 'Total Clientes', value: '5', icon: Users, bgIconClass: 'bg-[#a855f7]' },
  { id: 2, label: 'Activos', value: '4', icon: UserCheck, bgIconClass: 'bg-[#10b981]' },
  { id: 3, label: 'Bloqueados', value: '1', icon: Ban, bgIconClass: 'bg-[#ef4444]' },
  { id: 4, label: 'Ingresos Totales', value: '$3150', icon: DollarSign, bgIconClass: 'bg-[#3b82f6]' },
];

export const clientesList = [
  {
    id: 'C-001',
    nombre: 'María García',
    fechaAlta: 'Cliente desde ene 2025',
    email: 'maria@email.com',
    telefono: '+1 234 567 8900',
    direccion: 'Calle Principal 123, Ciudad',
    pedidos: 12,
    totalGastado: '$580',
    promedioPedido: '$48',
    fechaRegistro: '14/1/2025',
    ultimoPedido: '30/4/2026',
    estado: 'Activo',
    avatarColor: 'bg-[#a855f7]'
  },
  {
    id: 'C-002',
    nombre: 'Juan Pérez',
    fechaAlta: 'Cliente desde mar 2025',
    email: 'juan@email.com',
    telefono: '+1 234 567 8901',
    direccion: 'Avenida Central 456, Colonia Sur',
    pedidos: 8,
    totalGastado: '$420',
    promedioPedido: '$52',
    fechaRegistro: '05/3/2025',
    ultimoPedido: '15/5/2026',
    estado: 'Activo',
    avatarColor: 'bg-[#a855f7]'
  },
  {
    id: 'C-003',
    nombre: 'Ana López',
    fechaAlta: 'Cliente desde jun 2025',
    email: 'ana@email.com',
    telefono: '+1 234 567 8902',
    direccion: 'Boulevard Norte 789, Residencial',
    pedidos: 15,
    totalGastado: '$750',
    promedioPedido: '$50',
    fechaRegistro: '22/6/2025',
    ultimoPedido: '12/5/2026',
    estado: 'Activo',
    avatarColor: 'bg-[#a855f7]'
  }
];