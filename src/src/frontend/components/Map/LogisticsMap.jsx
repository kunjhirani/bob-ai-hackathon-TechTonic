import React, { useEffect, useRef } from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import L from 'leaflet';

export default function LogisticsMap({ height = '640px' }) {
  const { shipments, disruptions, fleet, setSelectedShipment } = useLogistics();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20, 15],
        zoom: 2.5,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // CartoDB Voyager Light Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> Voyager',
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Draw Disruption Zones
    disruptions.forEach((d) => {
      if (d.lat && d.lng) {
        L.circle([d.lat, d.lng], {
          color: '#f43f5e',
          fillColor: '#fda4af',
          fillOpacity: 0.25,
          radius: (d.radiusKm || 300) * 1000
        }).addTo(map).bindPopup(`
          <div class="p-2 space-y-1">
            <h4 class="font-bold text-sm text-slate-900">${d.title}</h4>
            <p class="text-xs text-rose-600 font-semibold">${d.severity} Disruption Hazard</p>
            <p class="text-xs text-slate-600">${d.location}</p>
          </div>
        `);
      }
    });

    // Draw Shipment Markers & Route Polylines
    shipments.forEach((s) => {
      if (s.currentLat && s.currentLng) {
        const isCritical = s.spoilageRisk?.status === 'Critical' || s.calculatedRiskScore >= 65;

        // Custom HTML Marker Icon
        const iconHtml = `
          <div class="relative flex items-center justify-center">
            <span class="${isCritical ? 'animate-ping absolute inline-flex h-6 w-6 rounded-full bg-rose-400 opacity-75' : ''}"></span>
            <div class="relative w-7 h-7 rounded-full ${isCritical ? 'bg-rose-600 ring-4 ring-rose-200' : 'bg-sky-600 ring-4 ring-sky-100'} text-white flex items-center justify-center font-bold text-[10px] shadow-lg">
              ${s.cargoType === 'Vaccines' || s.cargoType === 'Fresh Produce' ? '❄️' : '🚢'}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-leaflet-marker',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([s.currentLat, s.currentLng], { icon: customIcon }).addTo(map);

        marker.bindPopup(`
          <div class="p-3 space-y-2 text-slate-800">
            <div class="flex items-center justify-between border-b pb-1">
              <span class="font-bold text-sm text-slate-900">${s.id}</span>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded ${isCritical ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'}">
                Risk ${s.calculatedRiskScore}/100
              </span>
            </div>
            <p class="text-xs font-semibold">${s.cargoName}</p>
            <p class="text-xs text-slate-500">${s.origin} → ${s.destination}</p>
            ${s.sensorData ? `<p class="text-xs font-bold ${s.sensorData.temperature > s.sensorData.targetMax ? 'text-rose-600' : 'text-emerald-600'}">Temp: ${s.sensorData.temperature}°C (Target: ${s.sensorData.targetMin}°C - ${s.sensorData.targetMax}°C)</p>` : ''}
          </div>
        `);

        // Route Line
        if (s.originLat && s.originLng && s.destLat && s.destLng) {
          L.polyline(
            [
              [s.originLat, s.originLng],
              [s.currentLat, s.currentLng],
              [s.destLat, s.destLng]
            ],
            {
              color: isCritical ? '#f43f5e' : '#0284c7',
              weight: isCritical ? 3 : 2,
              dashArray: isCritical ? '6, 6' : null,
              opacity: 0.8
            }
          ).addTo(map);
        }
      }
    });

  }, [shipments, disruptions, fleet]);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Live Logistics Telemetry Map</h3>
        </div>
        <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span><span>Active Shipments</span></span>
          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>At-Risk / Excursion</span></span>
          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-300"></span><span>Hazard Zone</span></span>
        </div>
      </div>
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10" />
    </div>
  );
}
