import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Users,
  ShieldCheck,
  TicketPercent,
  Calendar,
  ShoppingBag,
  Target,
  Gift,
  Check,
  Search,
  Image as ImageIcon,
  Clock,
  ShoppingCart,
  Copy
} from 'lucide-react';

// NOTA: Agregamos el prop "onSave"
export default function NuevaPromocionModal({ isOpen, onClose, onSave }) {
  // --- ESTADOS PRINCIPALES ---
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [codigo, setCodigo] = useState('');
  const [tipoDescuento, setTipoDescuento] = useState('porcentaje');
  const [valorDescuento, setValorDescuento] = useState('');
  
  // --- NUEVOS ESTADOS PARA MODALIDAD (Cupón vs Oferta de Producto) ---
  const [tipoModalidad, setTipoModalidad] = useState('cupon'); // 'cupon' | 'producto'
  const [imagenFondo, setImagenFondo] = useState('');
  const [busquedaProducto, setBusquedaProducto] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // --- ESTADOS COMERCIALES ---
  const [compraMinima, setCompraMinima] = useState('');
  const [limiteUso, setLimiteUso] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  
  // --- ESTADOS DE SEGMENTACIÓN ---
  const [segmento, setSegmento] = useState('todos');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  
  // --- ESTADOS DE RESTRICCIONES ---
  const [soloPrimeraCompra, setSoloPrimeraCompra] = useState(false);
  const [usoUnico, setUsoUnico] = useState(false);
  const [activacionAutomatica, setActivacionAutomatica] = useState(true);
  const [mostrarLanding, setMostrarLanding] = useState(false);

  if (!isOpen) return null;

  const categoriasDisponibles = [
    'Rosas', 'Tulipanes', 'Arreglos Premium', 'Flores Eternas', 'Plantas', 'Condolencias', 'Cumpleaños'
  ];

  const toggleCategoria = (categoria) => {
    setCategoriasSeleccionadas(prev => 
      prev.includes(categoria) 
        ? prev.filter(c => c !== categoria) 
        : [...prev, categoria]
    );
  };

  const obtenerTextoDescuento = () => {
    if (tipoDescuento === 'envio') return 'ENVÍO GRATIS';
    if (tipoDescuento === '2x1') return '2x1';
    
    const valor = valorDescuento || '0';
    if (tipoDescuento === 'porcentaje') return `${valor}% OFF`;
    if (tipoDescuento === 'monto') return `$${valor} OFF`;
    
    return 'PROMO';
  };

  // Función para simular la búsqueda de un producto
  const buscarProducto = () => {
    if (!busquedaProducto.trim()) return;
    // Simulamos la consulta a tu base de datos
    setProductoSeleccionado({
      id: 1,
      nombre: 'Tulipanes Coloridos',
      precioOriginal: 79.99,
      imagen: 'https://images.unsplash.com/photo-1520764836472-882a7f5bc6b5?q=80&w=600&auto=format&fit=crop'
    });
    setNombre('Tulipanes Coloridos'); // Autocompletar nombre sugerido
  };

  // Calcula el precio con descuento para la vista previa de producto
  const calcularPrecioFinal = () => {
    if (!productoSeleccionado || !valorDescuento) return productoSeleccionado?.precioOriginal || 0;
    const precio = productoSeleccionado.precioOriginal;
    const descuento = parseFloat(valorDescuento);
    
    if (tipoDescuento === 'porcentaje') return (precio - (precio * (descuento / 100))).toFixed(2);
    if (tipoDescuento === 'monto') return Math.max(0, precio - descuento).toFixed(2);
    return precio;
  };

  // --- FUNCIÓN PARA GUARDAR ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validamos que haya nombre y código al menos
    if (!nombre.trim() || !codigo.trim()) {
      alert("Por favor, ingresa el nombre de la campaña y el código promocional.");
      return;
    }

    if (tipoModalidad === 'producto' && !productoSeleccionado) {
      alert("Por favor, selecciona un producto para la oferta relámpago.");
      return;
    }

    // 2. Formateamos el descuento para que coincida con tu base de datos
    let descuentoGuardar = valorDescuento;
    if (tipoDescuento === 'porcentaje') descuentoGuardar = `${valorDescuento}%`;
    if (tipoDescuento === 'monto') descuentoGuardar = `$${valorDescuento}`;
    if (tipoDescuento === 'envio') descuentoGuardar = 'Envío Gratis';
    if (tipoDescuento === '2x1') descuentoGuardar = '2x1';

    // 3. Construimos el objeto de la nueva promoción
    const nuevaPromocion = {
      id: Date.now(),
      titulo: nombre,
      descripcion: descripcion,
      codigo: codigo,
      descuento: descuentoGuardar,
      tipo: tipoModalidad, // 'cupon' o 'producto'
      imagenFondo: imagenFondo,
      productoAsociado: productoSeleccionado,
      fechaInicio: fechaInicio ? new Date(fechaInicio).toLocaleDateString('es-ES') : 'Inmediato',
      fechaFin: fechaFin ? new Date(fechaFin).toLocaleDateString('es-ES') : 'Sin límite',
      activo: activacionAutomatica,
      estado: activacionAutomatica ? 'Activa' : 'Programada',
      usoActual: 0,
      limiteUso: limiteUso ? parseInt(limiteUso) : 'Ilimitado',
      compraMinima: compraMinima ? `$${compraMinima}` : '$0',
      segmento: segmento === 'todos' ? 'Todos los clientes' : segmento,
      categorias: categoriasSeleccionadas,
      primeraCompra: soloPrimeraCompra,
      usoUnico: usoUnico,
      mostrarLanding: mostrarLanding,
      visualizaciones: 0,
      conversiones: 0,
      ctr: '0%'
    };

    // 4. Enviamos al componente padre
    if (onSave) {
      onSave(nuevaPromocion);
    }

    // 5. Cerramos el modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 custom-scrollbar animate-fade-in-up">
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700 px-8 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-violet-500 font-bold mb-1">
              <Sparkles size={18} /> Nueva Campaña Promocional
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Crear promoción avanzada
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form className="p-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              
              {/* TIPO DE MODALIDAD */}
              <section className="space-y-4">
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${tipoModalidad === 'cupon' ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300' : 'border-slate-200 dark:border-slate-700 hover:border-violet-300'}`}>
                    <input type="radio" name="tipoModalidad" value="cupon" checked={tipoModalidad === 'cupon'} onChange={() => setTipoModalidad('cupon')} className="hidden" />
                    <TicketPercent size={20} />
                    <span className="font-bold">Cupón General / Categoría</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${tipoModalidad === 'producto' ? 'border-[#e81c5f] bg-rose-50 dark:bg-rose-900/20 text-[#e81c5f] dark:text-rose-300' : 'border-slate-200 dark:border-slate-700 hover:border-rose-300'}`}>
                    <input type="radio" name="tipoModalidad" value="producto" checked={tipoModalidad === 'producto'} onChange={() => setTipoModalidad('producto')} className="hidden" />
                    <ShoppingBag size={20} />
                    <span className="font-bold">Oferta Relámpago (Producto)</span>
                  </label>
                </div>
              </section>

              {/* Información General */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <TicketPercent size={18} /> Información General
                </div>

                {tipoModalidad === 'producto' && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4">
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                      Buscar Producto *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          value={busquedaProducto}
                          onChange={(e) => setBusquedaProducto(e.target.value)}
                          placeholder="ID o Nombre del producto..."
                          className="w-full pl-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 outline-none focus:ring-2 focus:ring-[#e81c5f]/30"
                        />
                      </div>
                      <button type="button" onClick={buscarProducto} className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-800">
                        Consultar
                      </button>
                    </div>
                    {productoSeleccionado && (
                      <div className="mt-3 flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-green-200 dark:border-green-900">
                        <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-sm">{productoSeleccionado.nombre}</p>
                          <p className="text-xs text-slate-500">Precio original: ${productoSeleccionado.precioOriginal}</p>
                        </div>
                        <Check className="ml-auto text-green-500" size={20} />
                      </div>
                    )}
                  </div>
                )}

                {tipoModalidad === 'cupon' && (
                  <div className="sm:col-span-2 mb-4">
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <ImageIcon size={16} /> URL Imagen de fondo para el cupón
                    </label>
                    <input
                      type="url"
                      value={imagenFondo}
                      onChange={(e) => setImagenFondo(e.target.value)}
                      placeholder="https://ejemplo.com/imagen-rosas.jpg"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                      Nombre de la campaña *
                    </label>
                    <input
                      required
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder={tipoModalidad === 'cupon' ? "Ej. Descuento Primavera Premium" : "Ej. Tulipanes Coloridos"}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  {tipoModalidad === 'cupon' && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                        Descripción
                      </label>
                      <textarea
                        rows="4"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describe la promoción y sus beneficios..."
                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-violet-500/30"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                      Código Promocional *
                    </label>
                    <input
                      required
                      type="text"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                      placeholder={tipoModalidad === 'cupon' ? "ROSAS20" : "OFERTA-RELAMPAGO"}
                      className="w-full uppercase tracking-widest font-black rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                      Tipo de descuento
                    </label>
                    <select
                      value={tipoDescuento}
                      onChange={(e) => setTipoDescuento(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    >
                      <option value="porcentaje">Porcentaje (%)</option>
                      <option value="monto">Monto fijo ($)</option>
                      <option value="envio">Envío gratis</option>
                      <option value="2x1">2x1</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Configuración Comercial */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <ShoppingBag size={18} /> Configuración Comercial
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className={tipoDescuento === 'envio' || tipoDescuento === '2x1' ? 'opacity-50 pointer-events-none' : ''}>
                    <label className="block text-sm font-bold mb-2">Valor</label>
                    <input
                      type="number"
                      value={valorDescuento}
                      onChange={(e) => setValorDescuento(e.target.value)}
                      placeholder={tipoDescuento === 'porcentaje' ? '20' : '500'}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Compra mínima</label>
                    <input
                      type="number"
                      value={compraMinima}
                      onChange={(e) => setCompraMinima(e.target.value)}
                      placeholder="500"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Límite de uso</label>
                    <input
                      type="number"
                      value={limiteUso}
                      onChange={(e) => setLimiteUso(e.target.value)}
                      placeholder="1000"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2">Fecha de inicio</label>
                    <input
                      type="datetime-local"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Fecha de finalización</label>
                    <input
                      type="datetime-local"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>
                </div>
              </section>

              {/* Segmentación y Categorías */}
              <section className={`space-y-5 transition-opacity ${tipoModalidad === 'producto' ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <Users size={18} /> Segmentación de Clientes
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-bold mb-2">Público objetivo</label>
                      <select
                        value={segmento}
                        onChange={(e) => setSegmento(e.target.value)}
                        disabled={tipoModalidad === 'producto'}
                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                      >
                        <option value="todos">Todos los clientes</option>
                        <option value="nuevos">Solo nuevos clientes</option>
                        <option value="vip">Clientes VIP</option>
                        <option value="frecuentes">Clientes frecuentes</option>
                        <option value="inactivos">Clientes inactivos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-3 text-slate-700 dark:text-slate-300">
                      Categorías aplicables {tipoModalidad === 'producto' && '(Opcional para productos)'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoriasDisponibles.map((categoria) => {
                        const isSelected = categoriasSeleccionadas.includes(categoria);
                        return (
                          <button
                            key={categoria}
                            type="button"
                            onClick={() => toggleCategoria(categoria)}
                            disabled={tipoModalidad === 'producto'}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                              isSelected
                                ? 'bg-violet-500 text-white border-transparent'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
                            }`}
                          >
                            {isSelected && <Check size={14} strokeWidth={3} />}
                            {categoria}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* Restricciones */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <ShieldCheck size={18} /> Restricciones y Automatización
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={soloPrimeraCompra}
                      onChange={(e) => setSoloPrimeraCompra(e.target.checked)}
                      className="w-5 h-5 accent-violet-500 rounded" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Solo primera compra</p>
                      <p className="text-sm text-slate-500">Restringe el cupón a nuevos clientes.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={usoUnico}
                      onChange={(e) => setUsoUnico(e.target.checked)}
                      className="w-5 h-5 accent-violet-500 rounded" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Uso único por cliente</p>
                      <p className="text-sm text-slate-500">Evita múltiples usos por usuario.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={activacionAutomatica}
                      onChange={(e) => setActivacionAutomatica(e.target.checked)}
                      className="w-5 h-5 accent-violet-500 rounded" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Activación automática</p>
                      <p className="text-sm text-slate-500">Se activa automáticamente al crearla.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 transition-colors">
                    <input 
                      type="checkbox"
                      checked={mostrarLanding}
                      onChange={(e) => setMostrarLanding(e.target.checked)}
                      className="w-5 h-5 accent-violet-500 rounded" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Mostrar en landing</p>
                      <p className="text-sm text-slate-500">Visible en homepage y banners.</p>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* PANEL DERECHO (Vista Previa Dinámica) */}
            <div className="space-y-6">
              <div className="sticky top-28">
                
                {tipoModalidad === 'cupon' ? (
                  /* VISTA PREVIA: CUPÓN DE DESCUENTO (Imagen 1) */
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4 text-[#e81c5f] text-xl font-black">
                      <TicketPercent size={24} /> Cupones de Descuento
                    </div>
                    
                    <div 
                      className="relative rounded-[2rem] overflow-hidden text-white shadow-xl min-h-[300px] flex flex-col justify-center p-6 bg-slate-900"
                      style={{
                        backgroundImage: imagenFondo ? `url(${imagenFondo})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Overlay oscuro para que el texto sea legible sobre la imagen */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                      
                      <div className="relative z-10">
                        <span className="inline-flex px-3 py-1 rounded-full bg-[#e81c5f] text-white text-xs font-black tracking-widest mb-4">
                          {obtenerTextoDescuento()}
                        </span>

                        <h3 className="text-3xl font-black leading-tight break-words">
                          {nombre || '20% OFF en Rosas'}
                        </h3>

                        <p className="text-sm text-white/90 mt-2 leading-relaxed min-h-[40px] break-words">
                          {descripcion || 'Descuento especial en todos nuestros arreglos de rosas premium'}
                        </p>

                        <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex justify-between items-center">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/70 mb-1">CÓDIGO:</p>
                            <div className="text-xl font-black tracking-widest break-all">
                              {codigo || 'ROSAS20'}
                            </div>
                          </div>
                          <button type="button" className="bg-white text-[#e81c5f] px-5 py-2 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                            Copiar
                          </button>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                          <Clock size={16} /> Válido por 3 días
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* VISTA PREVIA: OFERTA RELÁMPAGO (Imagen 2) */
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4 text-[#e81c5f] text-xl font-black">
                      <Clock size={24} /> Ofertas Relámpago
                    </div>
                    
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col">
                      <div className="relative h-[250px] bg-slate-100">
                        {productoSeleccionado ? (
                          <img 
                            src={productoSeleccionado.imagen} 
                            alt={productoSeleccionado.nombre} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-[#e81c5f] text-white px-3 py-1 rounded-full text-xs font-black tracking-widest shadow-lg">
                          {obtenerTextoDescuento()}
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col gap-3">
                        <h3 className="text-lg font-black text-slate-900 leading-tight">
                          {nombre || productoSeleccionado?.nombre || 'Tulipanes Coloridos'}
                        </h3>
                        
                        <div className="flex items-end gap-3">
                          <span className="text-3xl font-black text-[#e81c5f]">
                            ${calcularPrecioFinal()}
                          </span>
                          <span className="text-slate-400 line-through font-bold text-sm mb-1">
                            ${productoSeleccionado?.precioOriginal || '79.99'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                          <Clock size={14} /> Termina en 2h 30m
                        </div>
                        
                        <button type="button" className="mt-2 w-full bg-[#e81c5f] hover:bg-[#d01552] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                          <ShoppingCart size={18} /> Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-black shadow-lg shadow-fuchsia-500/20 transition-all transform hover:scale-105 active:scale-95"
            >
              Crear Promoción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}