import { Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export const statsInventario = [
  { id: 1, label: 'Total Items', value: '6', icon: Package, bgIconClass: 'bg-[#a855f7]' },
  { id: 2, label: 'Stock Bajo', value: '2', icon: AlertTriangle, bgIconClass: 'bg-[#ef4444]' },
  { id: 3, label: 'Stock Normal', value: '4', icon: TrendingUp, bgIconClass: 'bg-[#10b981]' },
  { id: 4, label: 'Stock Alto', value: '0', icon: TrendingDown, bgIconClass: 'bg-[#3b82f6]' },
];

export const inventarioList = [
  {
    id: 'INV-001',
    producto: 'Rosas Rojas',
    categoria: 'Flores',
    stockActual: 170,
    unidad: 'tallos',
    min: 50,
    max: 300,
    proveedor: 'Floricultura Premium',
    proveedorEmail: 'ventas@floriculturapremium.com',
    proveedorTelefono: '+1 800 123 4567',
    costo: '$2.5',
    ultimoReabastecimiento: '2/5/2026'
  },
  {
    id: 'INV-002',
    producto: 'Girasoles',
    categoria: 'Flores',
    stockActual: 30,
    unidad: 'tallos',
    min: 40,
    max: 200,
    proveedor: 'Flores del Campo',
    proveedorEmail: 'contacto@floresdelcampo.net',
    proveedorTelefono: '+1 800 987 6543',
    costo: '$3',
    ultimoReabastecimiento: '30/4/2026'
  },
  {
    id: 'INV-003',
    producto: 'Orquídeas Blancas',
    categoria: 'Flores',
    stockActual: 25,
    unidad: 'unidades',
    min: 20,
    max: 100,
    proveedor: 'Orquídeas Exóticas',
    proveedorEmail: 'pedidos@orquideasexoticas.com',
    proveedorTelefono: '+1 800 555 0199',
    costo: '$15',
    ultimoReabastecimiento: '27/4/2026'
  },
  {
    id: 'INV-004',
    producto: 'Cajas de Regalo',
    categoria: 'Embalaje',
    stockActual: 80,
    unidad: 'unidades',
    min: 30,
    max: 150,
    proveedor: 'Empaques & Más',
    proveedorEmail: 'soporte@empaquesymas.mx',
    proveedorTelefono: '+1 800 444 3322',
    costo: '$3.5',
    ultimoReabastecimiento: '1/5/2026'
  }
];