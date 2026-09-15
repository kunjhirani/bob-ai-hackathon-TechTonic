import React from 'react';
import { useLogistics } from '../../shared/LogisticsContext.jsx';
import { 
  ShieldAlert, 
  Search, 
  Bot, 
  Activity, 
  LayoutDashboard, 
  Package, 
  Sliders, 
  ThermometerSnowflake, 
  Truck, 
  BarChart3,
  BellRing
} from 'lucide-react';

export default function Header() {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    setIsCopilotOpen,
    kpis
  } = useLogistics();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments', label: 'Shipment Tracking', icon: Package, badge: kpis.totalShipments },
    { id: 'simulation', label: 'What-If Disruption Sandbox', icon: Sliders },
    { id: 'coldchain', label: 'Cold-Chain Monitor', icon: ThermometerSnowflake, badge: kpis.criticalTempBreaches, badgeColor: 'bg-rose-500 text-white' },
    { id: 'fleet', label: 'Fleet & Smart Match', icon: Truck, badge: kpis.idleFleetCount, badgeColor: 'bg-amber-500 text-white' },
    { id: 'analytics', label: 'Analytics & Audit', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-sky-500/20 text-white ring-4 ring-sky-50">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 bg-clip-text text-transparent">
                  AEGIS Logistics
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                  watsonx Copilot
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500">
                Disruption Assistant & Fleet Utilisation Optimizer
              </p>
            </div>
          </div>

          {/* Global Search & AI Copilot Trigger */}
          <div className="flex items-center space-x-4">
            <div className="relative w-72 lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Tracking ID, Origin, Destination, Perishable..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* AI Copilot Slideover Button */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs font-semibold shadow-md shadow-sky-600/20 hover:from-sky-500 hover:to-blue-500 active:scale-95 transition-all group"
            >
              <Bot className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform" />
              <span>AI Copilot Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-2 overflow-x-auto no-scrollbar border-t border-slate-100 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.badgeColor || 'bg-slate-200 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
