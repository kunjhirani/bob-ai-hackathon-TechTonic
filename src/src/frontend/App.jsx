import React from 'react'
import { useLogistics } from '../shared/LogisticsContext.jsx'
import Header from './components/Header.jsx'
import KPICards from './components/Dashboard/KPICards.jsx'
import ActionCenter from './components/Dashboard/ActionCenter.jsx'
import DisruptionTicker from './components/Dashboard/DisruptionTicker.jsx'
import LogisticsMap from './components/Map/LogisticsMap.jsx'
import ShipmentList from './components/Shipments/ShipmentList.jsx'
import WhatIfSimulator from './components/Simulation/WhatIfSimulator.jsx'
import ColdChainMonitor from './components/ColdChain/ColdChainMonitor.jsx'
import FleetOverview from './components/Fleet/FleetOverview.jsx'
import AICopilotDrawer from './components/Copilot/AICopilotDrawer.jsx'
import AnalyticsView from './components/Analytics/AnalyticsView.jsx'

export default function App() {
  const { activeTab } = useLogistics();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Fixed Navigation & Global Header */}
      <Header />

      {/* Global Disruption Rolling Ticker */}
      <DisruptionTicker />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1760px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards Summary */}
            <KPICards />

            {/* FULL-WIDTH LIVE LOGISTICS MAP */}
            <div className="w-full">
              <LogisticsMap height="640px" />
            </div>

            {/* FULL-WIDTH AI RECOMMENDED ACTION CENTER BELOW MAP */}
            <div className="w-full">
              <ActionCenter />
            </div>
          </div>
        )}

        {activeTab === 'shipments' && <ShipmentList />}
        {activeTab === 'simulation' && <WhatIfSimulator />}
        {activeTab === 'coldchain' && <ColdChainMonitor />}
        {activeTab === 'fleet' && <FleetOverview />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </main>

      {/* Slide-over AI Copilot Assistant Drawer */}
      <AICopilotDrawer />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-[1760px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>AEGIS Control Tower Live System • Powered by IBM watsonx.ai</span>
          </div>
          <div>
            © 2026 Supply Chain Disruption Assistant & Fleet Utilisation Optimizer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
