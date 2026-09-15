import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { ShieldAlert, AlertTriangle, ThermometerSnowflake, Truck, AlertCircle, DollarSign } from 'lucide-react';

export default function KPICards() {
  const { kpis } = useLogistics();

  const cards = [
    {
      title: 'Total Active Shipments',
      value: kpis.totalShipments,
      subtext: 'Global In-Transit Telemetry',
      icon: ShieldAlert,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      iconColor: 'text-sky-600'
    },
    {
      title: 'At-Risk Cargo Value',
      value: `$${(kpis.totalAtRiskValue / 1000000).toFixed(2)}M`,
      subtext: `${kpis.atRiskCount} Shipments Facing Delay`,
      icon: DollarSign,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Active Disruption Events',
      value: kpis.activeDisruptionsCount,
      subtext: 'Storms, Strikes & Port Bottlenecks',
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-800 border-rose-200',
      iconColor: 'text-rose-600'
    },
    {
      title: 'Critical Cold-Chain Alerts',
      value: kpis.criticalTempBreaches,
      subtext: 'Vaccines & Produce Heat Risks',
      icon: ThermometerSnowflake,
      color: 'bg-rose-100 text-rose-900 border-rose-300',
      iconColor: 'text-rose-700'
    },
    {
      title: 'Idle Fleet Assets',
      value: kpis.idleFleetCount,
      subtext: 'Ready for Smart Match Reroute',
      icon: Truck,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-6 rounded-2xl border shadow-xs transition-all hover:shadow-md ${card.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                {card.title}
              </span>
              <Icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div className="text-3xl font-extrabold tracking-tight mb-1">
              {card.value}
            </div>
            <p className="text-xs font-medium opacity-75">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
