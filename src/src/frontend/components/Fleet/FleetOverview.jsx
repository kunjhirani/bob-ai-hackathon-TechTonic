import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FleetOverview() {
  const { fleet, shipments, redeployFleetAsset } = useLogistics();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Fleet Asset Utilization & Smart Matcher</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Real-time idle asset detection, reefer capacity matching & vehicle redeployment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((f) => (
          <div key={f.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-base">{f.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'Idle' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                {f.status}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p><span className="font-semibold text-slate-500">Vehicle Type:</span> <span className="font-bold text-slate-800">{f.type}</span></p>
              <p><span className="font-semibold text-slate-500">Location:</span> <span className="font-bold text-slate-800">{f.location}</span></p>
              <p><span className="font-semibold text-slate-500">Reefer Temp Unit:</span> <span className="font-bold text-emerald-700">{f.hasReefer ? 'Equipped (Active)' : 'Standard Trailer'}</span></p>
            </div>

            {f.status === 'Idle' && (
              <button
                onClick={() => redeployFleetAsset(f.id, shipments[0]?.id)}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Smart Match to Delayed Cargo</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
