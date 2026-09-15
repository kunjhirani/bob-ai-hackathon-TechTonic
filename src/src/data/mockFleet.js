export const initialFleetAssets = [
  {
    id: "TRK-881",
    name: "SwiftReefer Unit #881 (ThermoKing Dual-Zone)",
    type: "Reefer Truck",
    status: "IDLE",
    location: "Atlanta Logistics Yard, GA",
    coords: [33.7490, -84.3880],
    specs: {
      reeferCapacityCuFt: 3400,
      minTempCapable: -20.0,
      maxTempCapable: 15.0,
      fuelRangeKm: 1200,
      hazmatCertified: true
    },
    driver: "Marcus Vance (Active / Ready)",
    hourlyCost: 95
  },
  {
    id: "VES-402",
    name: "M/V Feeder Horizon (1,200 TEU Reefer Vessel)",
    type: "Feeder Vessel",
    status: "IDLE",
    location: "Honolulu Harbor Pier 5, HI",
    coords: [21.3069, -157.8583],
    specs: {
      reeferCapacityCuFt: 180000,
      minTempCapable: -30.0,
      maxTempCapable: 10.0,
      fuelRangeKm: 8500,
      hazmatCertified: true
    },
    captain: "Capt. Eleanor Vance",
    hourlyCost: 1450
  },
  {
    id: "AIR-909",
    name: "Boeing 777F Freighter (AeroCold Relay)",
    type: "Cargo Aircraft",
    status: "IDLE",
    location: "Anchorage International (ANC), USA",
    coords: [61.1744, -149.9963],
    specs: {
      reeferCapacityCuFt: 22000,
      minTempCapable: -70.0,
      maxTempCapable: 20.0,
      fuelRangeKm: 9200,
      hazmatCertified: true
    },
    pilot: "Cmdr. David Chen",
    hourlyCost: 4200
  },
  {
    id: "TRK-410",
    name: "Pacific Haulers Reefer #410",
    type: "Reefer Truck",
    status: "IN_USE",
    location: "Chicago Distribution Center, IL",
    coords: [41.8781, -87.6298],
    specs: {
      reeferCapacityCuFt: 3000,
      minTempCapable: -5.0,
      maxTempCapable: 10.0,
      fuelRangeKm: 900,
      hazmatCertified: false
    },
    driver: "Sarah Jenkins",
    hourlyCost: 85
  },
  {
    id: "CNT-1088",
    name: "SmartReefer ISO Container #CR-1088",
    type: "ISO Reefer Container",
    status: "IDLE",
    location: "Port of Long Beach Terminal B",
    coords: [33.7701, -118.1937],
    specs: {
      reeferCapacityCuFt: 2400,
      minTempCapable: -35.0,
      maxTempCapable: 5.0,
      fuelRangeKm: 0,
      hazmatCertified: true
    },
    custodian: "Port Operations Long Beach",
    hourlyCost: 45
  }
];
