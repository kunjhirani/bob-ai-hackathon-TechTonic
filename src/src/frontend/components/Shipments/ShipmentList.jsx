import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import ShipmentCard from './ShipmentCard.jsx';
import { Package, Filter } from 'lucide-react';

export default function ShipmentList() {
  const { filteredShipments } = useLogistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Shipment Management & Telemetry</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Real-time status, temperature sensor stream & risk scores</p>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          Showing {filteredShipments.length} Active Cargo Streams
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShipments.map((s) => (
          <ShipmentCard key={s.id} shipment={s} />
        ))}
      </div>
    </div>
  );
}
