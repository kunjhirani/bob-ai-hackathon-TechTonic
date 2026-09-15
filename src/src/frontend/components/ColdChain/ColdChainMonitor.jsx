import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import TempChart from './TempChart.jsx';
import { ThermometerSnowflake, AlertCircle, ShieldAlert, Truck } from 'lucide-react';

export default function ColdChainMonitor() {
  const { shipments, redeployFleetAsset } = useLogistics();

  const coldChainShipments = shipments.filter(s => s.cargoType === 'Vaccines' || s.cargoType === 'Fresh Produce' || s.spoilageRisk);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Cold-Chain Spoilage Prevention & Sensor Telemetry</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Live temperature excursion monitors, spoilage countdown timers & safe range bounds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {coldChainShipments.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 text-base">{s.id}</span>
                <p className="text-xs font-semibold text-slate-500">{s.cargoName} ({s.cargoType})</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.spoilageRisk?.status === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800'}`}>
                {s.spoilageRisk?.status || 'Normal'}
              </span>
            </div>

            {/* Live Temp Chart Component */}
            <TempChart sensorData={s.sensorData} />

            {s.spoilageRisk?.status === 'Critical' && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-900 block">Spoilage Risk Countdown:</span>
                  <span className="text-sm font-extrabold text-rose-700">{s.spoilageRisk.countdown || '01h 24m remaining'}</span>
                </div>
                <button
                  onClick={() => redeployFleetAsset('FL-904', s.id)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Dispatch Reefer Relay</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
