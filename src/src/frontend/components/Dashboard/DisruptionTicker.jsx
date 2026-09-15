import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { AlertTriangle, Activity } from 'lucide-react';

export default function DisruptionTicker() {
  const { disruptions } = useLogistics();

  return (
    <div className="bg-slate-900 text-white py-2.5 px-4 overflow-hidden border-b border-slate-800 flex items-center shadow-inner">
      <div className="flex items-center space-x-2 shrink-0 pr-4 border-r border-slate-700">
        <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-400">Live Alert Stream</span>
      </div>
      <div className="flex items-center space-x-8 overflow-x-auto whitespace-nowrap pl-4 no-scrollbar text-xs font-medium text-slate-300">
        {disruptions.map((d) => (
          <div key={d.id} className="flex items-center space-x-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-bold text-white">{d.title}:</span>
            <span className="text-slate-300">{d.location}</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
              {d.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
