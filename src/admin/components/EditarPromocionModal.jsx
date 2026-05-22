import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Users,
  Clock,
  Tag,
  Check,
  TicketPercent,
  ShoppingBag,
  ShieldCheck,
  Search,
  Image as ImageIcon,
  ShoppingCart
} from 'lucide-react';

export default function EditarPromocionModal({ promo, onClose, onSave }) {
  const [formData, setFormData] = useState({});
  const [busquedaProducto, setBusquedaProducto] = useState('');

  const categoriasDisponibles = [
    'Rosas', 'Tulipanes', 'Arreglos Premium', 'Flores Eternas', 'Plantas', 'Condolencias', 'Cumpleaños'
  ];

  useEffect(() => {
    if (promo) {
      const descuentoStr = String(promo.descuento || '').toLowerCase();

      let tipo = 'monto';
      if (descuentoStr.includes('%')) tipo = 'porcentaje';
      else if (descuentoStr.includes('env')) tipo = 'envio';
      else if (descuentoStr.includes('2x1')) tipo = '2x1';

      setFormData({
        titulo: promo.titulo || promo.nombre || '',
        descripcion: promo.descripcion || '',
        codigo: promo.codigo || '',
        tipoDescuento: tipo,
        valor: descuentoStr.replace('%', '').replace('$', '').trim() || '',
        
        tipoModalidad: promo.tipo || 'cupon',
        imagenFondo: promo.imagenFondo || '',
        productoSeleccionado: promo.productoAsociado || null,
        
        compraMinima: String(promo.compraMinima || '').replace('$', '') || '',
        limiteUso: promo.limiteUso === 'Ilimitado' ? '' : (promo.limiteUso || ''),
        fechaInicio: promo.fechaInicio !== 'Inmediato' ? promo.fechaInicio : '',
        fechaFin: promo.fechaFin !== 'Sin límite' ? promo.fechaFin : '',
        
        segmentacion: promo.segmento === 'Todos los clientes' ? 'todos' : (promo.segmentacion || promo.segmento || 'todos'),
        categorias: promo.categorias || [],
        
        primeraCompra: promo.primeraCompra || false,
        usoUnico: promo.usoUnico !== undefined ? promo.usoUnico : true,
        activo: promo.activo !== undefined ? promo.activo : (promo.estado === 'Activa'),
        mostrarLanding: promo.mostrarLanding || false
      });
    }
  }, [promo]);

  if (!promo) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleCategoria = (categoria) => {
    setFormData(prev => {
      const categoriasActuales = prev.categorias || [];
      return {
        ...prev,
        categorias: categoriasActuales.includes(categoria)
          ? categoriasActuales.filter(c => c !== categoria)
          : [...categoriasActuales, categoria]
      };
    });
  };

  const obtenerTextoDescuento = () => {
    if (formData.tipoDescuento === 'envio') return 'ENVÍO GRATIS';
    if (formData.tipoDescuento === '2x1') return '2x1';
    
    const valor = formData.valor || '0';
    if (formData.tipoDescuento === 'porcentaje') return `${valor}% OFF`;
    if (formData.tipoDescuento === 'monto') return `$${valor} OFF`;
    
    return 'PROMO';
  };

  const buscarProducto = () => {
    if (!busquedaProducto.trim()) return;
    setFormData(prev => ({
      ...prev,
      productoSeleccionado: {
        id: 1,
        nombre: 'Tulipanes Coloridos',
        precioOriginal: 79.99,
        imagen: 'https://images.unsplash.com/photo-1520764836472-882a7f5bc6b5?q=80&w=600&auto=format&fit=crop'
      },
      titulo: prev.titulo || 'Tulipanes Coloridos'
    }));
  };

  const calcularPrecioFinal = () => {
    if (!formData.productoSeleccionado || !formData.valor) return formData.productoSeleccionado?.precioOriginal || 0;
    const precio = formData.productoSeleccionado.precioOriginal;
    const descuento = parseFloat(formData.valor);
    
    if (formData.tipoDescuento === 'porcentaje') return (precio - (precio * (descuento / 100))).toFixed(2);
    if (formData.tipoDescuento === 'monto') return Math.max(0, precio - descuento).toFixed(2);
    return precio;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.codigo.trim()) {
      alert("Por favor, revisa el nombre de la campaña y el código promocional.");
      return;
    }
    if (formData.tipoModalidad === 'producto' && !formData.productoSeleccionado) {
      alert("Por favor, selecciona un producto para la oferta relámpago.");
      return;
    }

    if (onSave) {
      let descuentoGuardar = formData.valor;
      if (formData.tipoDescuento === 'porcentaje') descuentoGuardar = `${formData.valor}%`;
      if (formData.tipoDescuento === 'monto') descuentoGuardar = `$${formData.valor}`;
      if (formData.tipoDescuento === 'envio') descuentoGuardar = 'Envío Gratis';
      if (formData.tipoDescuento === '2x1') descuentoGuardar = '2x1';

      onSave({
        ...promo,
        ...formData,
        descuento: descuentoGuardar,
        estado: formData.activo ? 'Activa' : 'Programada'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 custom-scrollbar animate-fade-in-up">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700 px-8 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-violet-500 font-bold mb-1">
              <Settings size={18} /> Módulo de Edición
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Editar Promoción
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form className="p-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* PANEL IZQUIERDO: FORMULARIO */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* TIPO DE MODALIDAD */}
              <section className="space-y-4">
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.tipoModalidad === 'cupon' ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300' : 'border-slate-200 dark:border-slate-700 hover:border-violet-300'}`}>
                    <input type="radio" name="tipoModalidad" value="cupon" checked={formData.tipoModalidad === 'cupon'} onChange={handleChange} className="hidden" />
                    <TicketPercent size={20} />
                    <span className="font-bold">Cupón General / Categoría</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.tipoModalidad === 'producto' ? 'border-[#e81c5f] bg-rose-50 dark:bg-rose-900/20 text-[#e81c5f] dark:text-rose-300' : 'border-slate-200 dark:border-slate-700 hover:border-rose-300'}`}>
                    <input type="radio" name="tipoModalidad" value="producto" checked={formData.tipoModalidad === 'producto'} onChange={handleChange} className="hidden" />
                    <ShoppingBag size={20} />
                    <span className="font-bold">Oferta Relámpago (Producto)</span>
                  </label>
                </div>
              </section>

              {/* INFORMACIÓN GENERAL */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <TicketPercent size={18} /> Información General
                </div>

                {formData.tipoModalidad === 'producto' && (
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
                      <button type="button" onClick={buscarProducto} className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                        Consultar
                      </button>
                    </div>
                    {formData.productoSeleccionado && (
                      <div className="mt-3 flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-green-200 dark:border-green-900">
                        <img src={formData.productoSeleccionado.imagen} alt={formData.productoSeleccionado.nombre} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-sm">{formData.productoSeleccionado.nombre}</p>
                          <p className="text-xs text-slate-500">Precio original: ${formData.productoSeleccionado.precioOriginal}</p>
                        </div>
                        <Check className="ml-auto text-green-500" size={20} />
                      </div>
                    )}
                  </div>
                )}

                {formData.tipoModalidad === 'cupon' && (
                  <div className="sm:col-span-2 mb-4">
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <ImageIcon size={16} /> URL Imagen de fondo para el cupón
                    </label>
                    <input
                      type="url"
                      name="imagenFondo"
                      value={formData.imagenFondo || ''}
                      onChange={handleChange}
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
                      name="titulo"
                      value={formData.titulo || ''}
                      onChange={handleChange}
                      placeholder={formData.tipoModalidad === 'cupon' ? "Ej. Descuento Primavera Premium" : "Ej. Tulipanes Coloridos"}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  {formData.tipoModalidad === 'cupon' && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                        Descripción
                      </label>
                      <textarea
                        rows="4"
                        name="descripcion"
                        value={formData.descripcion || ''}
                        onChange={handleChange}
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
                      name="codigo"
                      value={formData.codigo || ''}
                      onChange={(e) => handleChange({ target: { name: 'codigo', value: e.target.value.toUpperCase() } })}
                      placeholder={formData.tipoModalidad === 'cupon' ? "ROSAS20" : "OFERTA-RELAMPAGO"}
                      className="w-full uppercase tracking-widest font-black rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                      Tipo de descuento
                    </label>
                    <select
                      name="tipoDescuento"
                      value={formData.tipoDescuento || 'porcentaje'}
                      onChange={handleChange}
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

              {/* CONFIGURACIÓN COMERCIAL */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <ShoppingBag size={18} /> Configuración Comercial
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className={formData.tipoDescuento === 'envio' || formData.tipoDescuento === '2x1' ? 'opacity-50 pointer-events-none' : ''}>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Valor</label>
                    <input
                      type="number"
                      name="valor"
                      value={formData.valor || ''}
                      onChange={handleChange}
                      placeholder={formData.tipoDescuento === 'porcentaje' ? '20' : '500'}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Compra mínima</label>
                    <input
                      type="number"
                      name="compraMinima"
                      value={formData.compraMinima || ''}
                      onChange={handleChange}
                      placeholder="500"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Límite de uso</label>
                    <input
                      type="number"
                      name="limiteUso"
                      value={formData.limiteUso || ''}
                      onChange={handleChange}
                      placeholder="1000"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Fecha de inicio</label>
                    <input
                      type="datetime-local"
                      name="fechaInicio"
                      value={formData.fechaInicio || ''}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Fecha de finalización</label>
                    <input
                      type="datetime-local"
                      name="fechaFin"
                      value={formData.fechaFin || ''}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30"
                    />
                  </div>
                </div>
              </section>

              {/* SEGMENTACIÓN Y CATEGORÍAS (Corrección aplicada aquí) */}
              <section className={`space-y-5 transition-opacity ${formData.tipoModalidad === 'producto' ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <Users size={18} /> Segmentación de Clientes
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Público objetivo</label>
                      <select
                        name="segmentacion"
                        value={formData.segmentacion || 'todos'}
                        onChange={handleChange}
                        disabled={formData.tipoModalidad === 'producto'}
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
                      Categorías aplicables {formData.tipoModalidad === 'producto' && '(No aplica para productos)'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoriasDisponibles.map((categoria) => {
                        const isSelected = formData.categorias?.includes(categoria);
                        return (
                          <button
                            key={categoria}
                            type="button"
                            onClick={() => toggleCategoria(categoria)}
                            disabled={formData.tipoModalidad === 'producto'}
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

              {/* RESTRICCIONES */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                  <ShieldCheck size={18} /> Restricciones y Automatización
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 transition-colors">
                    <input 
                      type="checkbox" 
                      name="primeraCompra"
                      checked={formData.primeraCompra || false}
                      onChange={handleChange}
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
                      name="usoUnico"
                      checked={formData.usoUnico || false}
                      onChange={handleChange}
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
                      name="activo"
                      checked={formData.activo || false}
                      onChange={handleChange}
                      className="w-5 h-5 accent-violet-500 rounded" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Mantener Activa</p>
                      <p className="text-sm text-slate-500">Desmarca para pausar la promoción temporalmente.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 transition-colors">
                    <input 
                      type="checkbox"
                      name="mostrarLanding"
                      checked={formData.mostrarLanding || false}
                      onChange={handleChange}
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

            {/* PANEL DERECHO: VISTA PREVIA */}
            <div className="hidden md:block xl:col-span-1 space-y-6">
              <div className="sticky top-28">
                
                {formData.tipoModalidad === 'cupon' ? (
                  /* VISTA PREVIA: CUPÓN DE DESCUENTO */
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4 text-[#e81c5f] text-xl font-black">
                      <TicketPercent size={24} /> Cupones de Descuento
                    </div>
                    
                    <div 
                      className="relative rounded-[2rem] overflow-hidden text-white shadow-xl min-h-[300px] flex flex-col justify-center p-6 bg-slate-900"
                      style={{
                        backgroundImage: formData.imagenFondo ? `url(${formData.imagenFondo})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                      
                      <div className="relative z-10">
                        <span className="inline-flex px-3 py-1 rounded-full bg-[#e81c5f] text-white text-xs font-black tracking-widest mb-4">
                          {obtenerTextoDescuento()}
                        </span>

                        <h3 className="text-3xl font-black leading-tight break-words">
                          {formData.titulo || '20% OFF en Rosas'}
                        </h3>

                        <p className="text-sm text-white/90 mt-2 leading-relaxed min-h-[40px] break-words">
                          {formData.descripcion || 'Descuento especial en todos nuestros arreglos de rosas premium'}
                        </p>

                        <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex justify-between items-center">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/70 mb-1">CÓDIGO:</p>
                            <div className="text-xl font-black tracking-widest break-all">
                              {formData.codigo || 'ROSAS20'}
                            </div>
                          </div>
                          <button type="button" className="bg-white text-[#e81c5f] px-5 py-2 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                            Copiar
                          </button>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                          <Clock size={16} /> 
                          {formData.fechaFin ? `Válido hasta ${new Date(formData.fechaFin).toLocaleDateString()}` : 'Válido por tiempo limitado'}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* VISTA PREVIA: OFERTA RELÁMPAGO */
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4 text-[#e81c5f] text-xl font-black">
                      <Clock size={24} /> Ofertas Relámpago
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col">
                      <div className="relative h-[250px] bg-slate-100 dark:bg-slate-700">
                        {formData.productoSeleccionado ? (
                          <img 
                            src={formData.productoSeleccionado.imagen} 
                            alt={formData.productoSeleccionado.nombre} 
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
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                          {formData.titulo || formData.productoSeleccionado?.nombre || 'Tulipanes Coloridos'}
                        </h3>
                        
                        <div className="flex items-end gap-3">
                          <span className="text-3xl font-black text-[#e81c5f]">
                            ${calcularPrecioFinal()}
                          </span>
                          <span className="text-slate-400 line-through font-bold text-sm mb-1">
                            ${formData.productoSeleccionado?.precioOriginal || '79.99'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                          <Clock size={14} /> Oferta Especial
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

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-900 pb-2 z-10">
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}