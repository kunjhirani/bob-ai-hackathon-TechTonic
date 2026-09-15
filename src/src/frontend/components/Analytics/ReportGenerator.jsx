import React from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { exportShipmentsCSV } from '../../../utils/reportExporter.js';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';

export default function ReportGenerator() {
  const { shipments } = useLogistics();

  const handleExport = () => {
    exportShipmentsCSV(shipments);
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
      <div className="flex items-center space-x-3">
        <FileText className="w-6 h-6 text-sky-600" />
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">Export Disruption & Audit Report</h3>
          <p className="text-xs text-slate-500 font-medium">Download compliance audit logs in CSV format</p>
        </div>
      </div>

      <button
        onClick={handleExport}
        className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Generate & Download CSV Audit Log</span>
      </button>
    </div>
  );
}
