import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { ThermometerSnowflake, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ShipmentCard({ shipment }) {
  const { setSelectedShipment } = useLogistics();

  const isCritical = shipment.spoilageRisk?.status === 'Critical' || shipment.calculatedRiskScore >= 65;

  return (
    <div className={`p-6 rounded-2xl bg-white border ${isCritical ? 'border-rose-300 shadow-md shadow-rose-500/5' : 'border-slate-200 shadow-sm'} space-y-4 hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-slate-900 text-base">{shipment.id}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCritical ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-sky-100 text-sky-800 border border-sky-200'}`}>
          Risk: {shipment.calculatedRiskScore}/100
        </span>
      </div>

      <div>
        <h4 className="font-extrabold text-slate-800 text-sm">{shipment.cargoName}</h4>
        <p className="text-xs font-semibold text-slate-500">{shipment.cargoType} • ${ (shipment.cargoValue / 1000).toFixed(0) }k USD</p>
      </div>

      <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">Route:</span>
          <span className="font-bold text-slate-800">{shipment.origin} → {shipment.destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">Carrier:</span>
          <span className="font-bold text-slate-800">{shipment.carrier}</span>
        </div>
        {shipment.sensorData && (
          <div className="flex justify-between pt-1 border-t border-slate-200">
            <span className="font-semibold text-slate-500">Live Temp:</span>
            <span className={`font-bold ${shipment.sensorData.temperature > shipment.sensorData.targetMax ? 'text-rose-600' : 'text-emerald-600'}`}>
              {shipment.sensorData.temperature}°C (Target: {shipment.sensorData.targetMin}-{shipment.sensorData.targetMax}°C)
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => setSelectedShipment(shipment)}
        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-2"
      >
        <span>Inspect Telemetry & Reroute</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
