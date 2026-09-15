import React from 'react';
import ReportGenerator from './ReportGenerator.jsx';
import { BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Supply Chain Performance & Audit Analytics</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">SLA trends, carrier reliability performance & exportable compliance reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-sky-600" />
            <span>On-Time Delivery SLA Trend</span>
          </h3>
          <div className="h-48 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
            SLA Performance: 94.2% On-Time Delivery Across Active Routes
          </div>
        </div>

        <ReportGenerator />
      </div>
    </div>
  );
}
