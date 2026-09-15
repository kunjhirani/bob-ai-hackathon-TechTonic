import React from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';

export default function MapControls({ layers, toggleLayer }) {
  return (
    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg space-y-2 text-xs font-semibold text-slate-700">
      <div className="flex items-center space-x-2 pb-1 border-b border-slate-200 font-extrabold text-slate-900">
        <Layers className="w-4 h-4 text-sky-600" />
        <span>Map Overlays</span>
      </div>
      {Object.keys(layers).map((layerKey) => (
        <button
          key={layerKey}
          onClick={() => toggleLayer(layerKey)}
          className="flex items-center justify-between w-full space-x-3 hover:text-sky-600 transition-colors"
        >
          <span className="capitalize">{layerKey}</span>
          {layers[layerKey] ? <Eye className="w-3.5 h-3.5 text-sky-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      ))}
    </div>
  );
}
