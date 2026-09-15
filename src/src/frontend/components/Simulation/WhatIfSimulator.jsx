import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { Sliders, AlertTriangle, Play, RefreshCw, ShieldCheck } from 'lucide-react';

export default function WhatIfSimulator() {
  const { shipments, simulationParams, setSimulationParams, applyAllRecommendedActions } = useLogistics();

  const impactedShipments = shipments.filter(s => s.calculatedRiskScore >= 50);
  const totalImpactedValue = impactedShipments.reduce((sum, s) => sum + s.cargoValue, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">What-If Disruption Scenario Sandbox</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Simulate weather storms, wildcat port strikes & airspace blockades to forecast network impact</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-sky-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Scenario Parameters</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Impact Radius (km): {simulationParams.radiusKm}km</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={simulationParams.radiusKm}
                onChange={(e) => setSimulationParams({ ...simulationParams, radiusKm: Number(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Expected Duration (Hours): {simulationParams.durationHours}h</label>
              <input
                type="range"
                min="12"
                max="168"
                step="12"
                value={simulationParams.durationHours}
                onChange={(e) => setSimulationParams({ ...simulationParams, durationHours: Number(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Severity Level</label>
              <select
                value={simulationParams.severity}
                onChange={(e) => setSimulationParams({ ...simulationParams, severity: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                <option value="Low">Low (Minor Delay)</option>
                <option value="Medium">Medium (Moderate Slip)</option>
                <option value="High">High (Severe Reroute Required)</option>
                <option value="Critical">Critical (Total Blockade)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forecast Analysis Output */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base">Forecasted Disruption Impact</h3>
            <button
              onClick={applyAllRecommendedActions}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Apply Recommended Reroute Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase">Impacted Cargo Value</span>
              <div className="text-2xl font-extrabold text-amber-900">${(totalImpactedValue / 1000000).toFixed(2)}M</div>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="text-xs font-bold text-rose-800 uppercase">Affected Shipments</span>
              <div className="text-2xl font-extrabold text-rose-900">{impactedShipments.length} Cargo Units</div>
            </div>
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
              <span className="text-xs font-bold text-sky-800 uppercase">Avg ETA Slip</span>
              <div className="text-2xl font-extrabold text-sky-900">+{Math.round(simulationParams.durationHours * 0.4)} Hours</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
