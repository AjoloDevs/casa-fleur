import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

export default function StatusBadge({ estado }) {
  switch (estado) {
    case 'Pendiente':
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-slate-900/90 dark:text-yellow-400 backdrop-blur-md dark:border dark:border-yellow-500/30 rounded-full text-xs font-semibold shadow-sm">
          <Clock size={14} /> {estado}
        </span>
      );
    case 'Aprobado':
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-slate-900/90 dark:text-blue-400 backdrop-blur-md dark:border dark:border-blue-500/30 rounded-full text-xs font-semibold shadow-sm">
          <CheckCircle size={14} /> {estado}
        </span>
      );
    default:
      return null;
  }
}