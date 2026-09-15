export const initialDisruptions = [
  {
    id: "DIS-101",
    title: "Super Typhoon 'KONG-REY' (Cat 4)",
    type: "WEATHER_EVENT",
    severity: "CRITICAL",
    centerCoords: [24.5000, 128.2000],
    radiusKm: 750,
    impactedShipmentIds: ["SH-9042", "SH-5120"],
    affectedPorts: ["Shanghai Port", "Ningbo-Zhoushan", "Busan Port"],
    description: "Sustained winds exceeding 145 knots creating 12-meter swells. Port operations suspended across East Asian coastlines.",
    startTime: "2026-09-12T04:00:00Z",
    estimatedResolutionTime: "2026-09-16T18:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "DIS-102",
    title: "Red Sea & Bab-el-Mandeb Security Crisis",
    type: "GEOPOLITICAL_CRISIS",
    severity: "HIGH",
    centerCoords: [13.2000, 42.8000],
    radiusKm: 450,
    impactedShipmentIds: ["SH-8821"],
    affectedPorts: ["Jeddah Islamic Port", "Port of Suez", "Djibouti"],
    description: "Maritime security threat rating elevated to Level 3. Commercial vessels rerouting around Cape of Good Hope.",
    startTime: "2026-09-08T00:00:00Z",
    estimatedResolutionTime: "2026-10-01T00:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "DIS-103",
    title: "Hamburg Dockworkers Wildcat Strike",
    type: "PORT_STRIKE",
    severity: "HIGH",
    centerCoords: [53.5511, 9.9937],
    radiusKm: 120,
    impactedShipmentIds: ["SH-8821", "SH-7019"],
    affectedPorts: ["Port of Hamburg (CTA / CTB Terminals)"],
    description: "Unannounced labor strike halting container crane ops. 42 container vessels queued in German Bight.",
    startTime: "2026-09-13T02:00:00Z",
    estimatedResolutionTime: "2026-09-15T12:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "DIS-104",
    title: "US Southeast Severe Heatwave & Grid Instability",
    type: "COLD_CHAIN_HAZARD",
    severity: "MEDIUM",
    centerCoords: [33.7490, -84.3880],
    radiusKm: 350,
    impactedShipmentIds: ["SH-7019"],
    affectedPorts: ["Atlanta Inland Logistics Hub", "Savannah Container Terminal"],
    description: "Ambient temperatures exceeding 41°C causing thermal stress on auxiliary diesel generator reefer units.",
    startTime: "2026-09-13T10:00:00Z",
    estimatedResolutionTime: "2026-09-15T00:00:00Z",
    status: "ACTIVE"
  }
];
