import React from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { Zap, ShieldCheck, ArrowRight, AlertTriangle, ThermometerSnowflake, CheckCircle2 } from 'lucide-react';

export default function ActionCenter() {
  const { shipments, applyRecommendedReroute, applyAllRecommendedActions } = useLogistics();

  const atRiskShipments = shipments.filter(s => s.calculatedRiskScore >= 60 || (s.spoilageRisk && s.spoilageRisk.status === 'Critical'));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      
      {/* Header with Title, Badge, Description and Apply All Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 shadow-inner">
            <Zap className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                AI Recommended Action Center
              </h2>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                {atRiskShipments.length} Pending
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Automated risk-mitigation plans powered by AEGIS watsonx Copilot
            </p>
          </div>
        </div>

        {atRiskShipments.length > 0 && (
          <button
            onClick={applyAllRecommendedActions}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Apply All ({atRiskShipments.length})</span>
          </button>
        )}
      </div>

      {/* Action Recommendation Cards */}
      <div className="space-y-4">
        {atRiskShipments.length === 0 ? (
          <div className="p-8 rounded-xl bg-emerald-50/50 border border-emerald-100 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">All Logistics Networks Optimal</h3>
            <p className="text-xs text-emerald-700">No critical disruptions or temperature excursions detected.</p>
          </div>
        ) : (
          atRiskShipments.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 transition-all shadow-xs hover:shadow-md space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 rounded-full ${s.spoilageRisk?.status === 'Critical' ? 'bg-rose-500 animate-ping' : 'bg-amber-500'}`}></span>
                  <span className="font-extrabold text-sm text-slate-900">{s.id}</span>
                  <span className="text-xs font-semibold text-slate-500">({s.cargoName})</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                    Risk: {s.calculatedRiskScore}/100
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Origin: <span className="font-bold text-slate-800">{s.origin}</span> → Dest: <span className="font-bold text-slate-800">{s.destination}</span>
                </div>
              </div>

              {/* Explainable AI Reason Card */}
              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-100 text-xs text-sky-950 flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">AI Diagnosis & Reroute Plan:</p>
                  <p className="text-sky-900 leading-relaxed">
                    {s.spoilageRisk?.status === 'Critical'
                      ? `Critical temperature excursion (${s.sensorData.temperature}°C). Dispatch nearest idle Reefer Trailer (RF-904) to avoid $${(s.cargoValue/1000).toFixed(0)}k cargo loss.`
                      : `Disruption hazard detected on primary route. Switch carrier to ${s.recommendedCarrier || 'Maersk Air Relay'} to save ${s.estimatedTimeSaveHours || 12}h ETA slip.`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-1">
                <button
                  onClick={() => applyRecommendedReroute(s.id, s.recommendedCarrier, s.alternateRoute)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                >
                  <span>Execute Reroute Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
