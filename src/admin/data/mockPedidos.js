// src/data/mockPedidos.js

export const statsPedidos = [
  { id: 1, label: 'Total', value: '4', colorClass: 'border-b-[#a855f7]' }, 
  { id: 2, label: 'Pendientes', value: '1', colorClass: 'border-b-[#eab308]' }, 
  { id: 3, label: 'En Proceso', value: '1', colorClass: 'border-b-[#3b82f6]' }, 
  { id: 4, label: 'Enviados', value: '1', colorClass: 'border-b-[#ec4899]' }, 
  { id: 5, label: 'Entregados', value: '1', colorClass: 'border-b-[#10b981]' }, 
];

export const pedidosList = [
  {
    id: 'ORD-001',
    cliente: 'María García',
    email: 'maria@email.com',
    telefono: '+1 234 567 8900',
    direccion: 'Calle Principal 123, Ciudad',
    fecha: '30 abr 2026',
    total: '$50',
    estado: 'Entregado',
    productos: [
      { id: 'PROD-001', nombre: 'Ramo de Rosas Rojas', cantidad: 1, price: 45 },
      { id: 'PROD-005', nombre: 'Tarjeta de Felicitación', cantidad: 1, price: 5 }
    ],
    fechaEntrega: '2/5/2026' // Sí tiene fecha de entrega
  },
  {
    id: 'ORD-002',
    cliente: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+1 234 567 8901',
    direccion: 'Avenida Central 456, Ciudad',
    fecha: '3 may 2026',
    total: '$120',
    estado: 'En Proceso',
    productos: [
      { id: 'PROD-002', nombre: 'Arreglo Personalizado Premium', cantidad: 1, price: 120 }
    ],
    notas: 'Entregar antes de las 5 PM' // <-- Nuevo campo de Notas
    // No tiene fecha de entrega
  },
  {
    id: 'ORD-003',
    cliente: 'Ana López',
    email: 'ana@email.com',
    telefono: '+1 234 567 8902',
    direccion: 'Plaza Mayor 789, Ciudad',
    fecha: '4 may 2026',
    total: '$130',
    estado: 'Enviado',
    productos: [
      { id: 'PROD-003', nombre: 'Girasoles Premium', cantidad: 2, price: 65 }
    ],
    fechaEntrega: '5/5/2026' // Sí tiene fecha de entrega
  },
  {
    id: 'ORD-004',
    cliente: 'Carlos Ruiz',
    email: 'carlos@email.com',
    telefono: '+1 234 567 8903',
    direccion: 'Calle Secundaria 321, Ciudad',
    fecha: '4 may 2026',
    total: '$89',
    estado: 'Pendiente',
    productos: [
      { id: 'PROD-004', nombre: 'Orquídeas Blancas', cantidad: 1, price: 89 }
    ]
    // No tiene notas ni fecha de entrega
  }
];