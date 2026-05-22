import React, { useState } from 'react';

// Ahora el componente recibe las props desde Checkout.jsx
export default function DeliveryDatePicker({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Días de la semana para el encabezado
  const daysHeader = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  // Nombres de los meses
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Horarios disponibles de 9 AM a 9 PM
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
  ];

  // Lógica para generar los días del mes actual
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayIndex = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Navegación
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  // Simulación de disponibilidad aleatoria 
  const getStatus = (day) => {
    if (day % 7 === 0) return { label: "Agotado", color: "bg-red-500", disabled: true };
    if (day % 5 === 0) return { label: "Pocos", color: "bg-orange-500", disabled: false };
    return { label: "Libre", color: "bg-green-500", disabled: false };
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm animate-fade-in-up">
      {/* Encabezado con Navegación */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-50 text-[#e91e63] rounded-2xl flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 leading-none">Fecha y Hora</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Disponibilidad en Jilotepec</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white hover:text-[#e91e63] rounded-xl transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3"/></svg>
          </button>
          <span className="text-xs font-black uppercase tracking-tighter w-24 text-center text-gray-700">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white hover:text-[#e91e63] rounded-xl transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3"/></svg>
          </button>
        </div>
      </div>

      {/* Grid del Calendario */}
      <div className="grid grid-cols-7 gap-2">
        {daysHeader.map(d => (
          <div key={d} className="text-center text-[10px] font-black text-gray-300 uppercase py-2">{d}</div>
        ))}
        
        {/* Espacios vacíos para el inicio del mes */}
        {[...Array(firstDayIndex)].map((_, i) => <div key={`empty-${i}`} />)}

        {/* Días del mes */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const status = getStatus(day);
          
          // Formateamos la fecha seleccionada para compararla fácilmente
          const dateString = `${day}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
          const isSelected = selectedDate === dateString;

          return (
            <button
              key={day}
              disabled={status.disabled}
              onClick={() => setSelectedDate(dateString)}
              className={`group aspect-square flex flex-col items-center justify-center rounded-2xl transition-all relative border-2 ${
                status.disabled 
                  ? 'bg-gray-50 border-transparent opacity-30 cursor-not-allowed' 
                  : isSelected
                    ? 'border-[#e91e63] bg-pink-50/50 shadow-md scale-105'
                    : 'border-transparent hover:border-pink-100 hover:bg-gray-50 bg-white'
              }`}
            >
              <span className={`text-sm font-black ${isSelected ? 'text-[#e91e63]' : 'text-gray-700'}`}>{day}</span>
              <div className={`w-1 h-1 rounded-full mt-1 ${status.color} ${isSelected ? 'scale-150' : ''}`} />
              
              {/* Tooltip de disponibilidad al hover */}
              {!status.disabled && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  {status.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECCIÓN NUEVA: Selector de Hora (Aparece solo si hay un día seleccionado) */}
      {selectedDate && (
        <div className="mt-8 pt-6 border-t border-gray-50 animate-fade-in-up">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Selecciona la hora de entrega</h4>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors z-10 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
            <select 
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none appearance-none cursor-pointer text-gray-700 transition-all relative z-0"
            >
              <option value="" disabled>Elige un horario (9 AM - 9 PM)</option>
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
            <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none text-gray-400 z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      )}

      {/* Indicadores de Leyenda */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 border-t border-gray-50 pt-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pocos Lugares</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Agotado</span>
        </div>
      </div>
    </div>
  );
}