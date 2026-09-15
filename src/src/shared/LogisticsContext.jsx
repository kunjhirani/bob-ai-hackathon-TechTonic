import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialShipments } from '../data/mockShipments.js';
import { initialDisruptions } from '../data/mockDisruptions.js';
import { initialFleetAssets } from '../data/mockFleet.js';
import { alternativeCarriers } from '../data/mockCarriers.js';
import { calculateShipmentRiskScore } from '../utils/riskCalculator.js';
import { classifyColdChainSeverity } from '../utils/coldChainEngine.js';

const LogisticsContext = createContext();

export const LogisticsProvider = ({ children }) => {
  const [shipments, setShipments] = useState(initialShipments);
  const [disruptions, setDisruptions] = useState(initialDisruptions);
  const [fleet, setFleet] = useState(initialFleetAssets);
  const [carriers] = useState(alternativeCarriers);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your AEGIS AI Logistics Copilot. 4 high-value cold-chain shipments currently face delay or temperature risks.',
      timestamp: '10:00 AM'
    }
  ]);

  // Simulation State
  const [activeScenario, setActiveScenario] = useState(null);
  const [simulationParams, setSimulationParams] = useState({
    radiusKm: 250,
    durationHours: 48,
    severity: 'High'
  });

  // Calculate dynamic risks
  const processedShipments = useMemo(() => {
    return shipments.map(shipment => {
      const riskInfo = calculateShipmentRiskScore(shipment, disruptions);
      const coldChainInfo = classifyColdChainSeverity(shipment.temperature);
      return {
        ...shipment,
        calculatedRiskScore: Math.max(shipment.riskScore || 0, riskInfo.score),
        riskLevel: riskInfo.category,
        spoilageRisk: coldChainInfo
      };
    });
  }, [shipments, disruptions]);

  // Filtered shipments
  const filteredShipments = useMemo(() => {
    if (!searchQuery.trim()) return processedShipments;
    const query = searchQuery.toLowerCase();
    return processedShipments.filter(s => 
      s.id.toLowerCase().includes(query) ||
      s.trackingNumber.toLowerCase().includes(query) ||
      s.origin.toLowerCase().includes(query) ||
      s.destination.toLowerCase().includes(query) ||
      s.cargoName.toLowerCase().includes(query)
    );
  }, [processedShipments, searchQuery]);

  // Executive Dashboard KPIs
  const kpis = useMemo(() => {
    const totalShipments = processedShipments.length;
    const atRiskShipments = processedShipments.filter(s => s.calculatedRiskScore >= 65);
    const totalAtRiskValue = atRiskShipments.reduce((sum, s) => sum + s.cargoValue, 0);
    const criticalTempBreaches = processedShipments.filter(s => s.spoilageRisk && s.spoilageRisk.status === 'Critical').length;
    const idleFleetCount = fleet.filter(f => f.status === 'Idle').length;

    return {
      totalShipments,
      atRiskCount: atRiskShipments.length,
      totalAtRiskValue,
      criticalTempBreaches,
      idleFleetCount,
      activeDisruptionsCount: disruptions.length
    };
  }, [processedShipments, fleet, disruptions]);

  // Actions
  const applyRecommendedReroute = (shipmentId, newCarrierId, alternateRoute) => {
    setShipments(prev => prev.map(s => {
      if (s.id === shipmentId) {
        return {
          ...s,
          status: 'In Transit (Rerouted)',
          carrier: newCarrierId || s.carrier,
          riskScore: Math.max(10, s.riskScore - 45),
          eta: alternateRoute ? alternateRoute.newEta : s.eta,
          rerouted: true
        };
      }
      return s;
    }));
  };

  const redeployFleetAsset = (assetId, targetShipmentId) => {
    setFleet(prev => prev.map(f => f.id === assetId ? { ...f, status: 'Assigned', assignedShipmentId: targetShipmentId } : f));
    setShipments(prev => prev.map(s => s.id === targetShipmentId ? { ...s, status: 'Reefer Relay Dispatched', riskScore: 15 } : s));
  };

  const applyAllRecommendedActions = () => {
    setShipments(prev => prev.map(s => s.calculatedRiskScore >= 65 ? { ...s, status: 'Rerouted (AI Applied)', riskScore: 20 } : s));
  };

  return (
    <LogisticsContext.Provider value={{
      shipments: processedShipments,
      filteredShipments,
      disruptions,
      fleet,
      carriers,
      kpis,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      selectedShipment,
      setSelectedShipment,
      isCopilotOpen,
      setIsCopilotOpen,
      copilotMessages,
      setCopilotMessages,
      activeScenario,
      setActiveScenario,
      simulationParams,
      setSimulationParams,
      applyRecommendedReroute,
      redeployFleetAsset,
      applyAllRecommendedActions
    }}>
      {children}
    </LogisticsContext.Provider>
  );
};

export const useLogistics = () => useContext(LogisticsContext);
