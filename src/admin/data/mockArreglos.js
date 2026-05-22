import { Sparkles, Star } from 'lucide-react';

export const stats = [
  { id: 1, label: 'Pendientes', value: '1', colorClass: 'border-b-[#eab308]' },
  { id: 2, label: 'Aprobados', value: '1', colorClass: 'border-b-[#3b82f6]' },
  { id: 3, label: 'Completados', value: '1', colorClass: 'border-b-[#22c55e]' },
  { id: 4, label: 'Rechazados', value: '0', colorClass: 'border-b-[#ef4444]' },
];

export const pedidos = [
  {
    id: 'CA-001',
    cliente: 'María García',
    email: 'maria@email.com',
    telefono: '+1 234 567 8900',
    estado: 'Pendiente',
    presupuesto: '$250',
    tipoEvento: 'Boda',
    eventoIcon: Sparkles,
    colores: ['Blanco', 'Rosado', 'Verde'],
    flores: ['Rosas', 'Peonías', 'Eucalipto'],
    solicitud: 'Necesito 3 ramos de novia y 5 centros de mesa',
    imagen: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imagenesReferencia: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460500063983-994d4c27756c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'CA-002',
    cliente: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+1 987 654 3210',
    estado: 'Aprobado',
    presupuesto: '$120',
    tipoEvento: 'Aniversario',
    eventoIcon: Star,
    colores: ['Rojo', 'Dorado'],
    flores: ['Rosas Rojas', 'Lirios'],
    solicitud: 'Arreglo elegante con caja de lujo',
    imagen: 'https://images.unsplash.com/photo-1563241527-200424b94fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imagenesReferencia: [
      'https://images.unsplash.com/photo-1563241527-200424b94fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582791696719-7123d4ce17a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  }
];