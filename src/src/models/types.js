/**
 * @typedef {Object} SensorData
 * @property {number} temperature - Temperature in Celsius (°C)
 * @property {number} targetMin - Safe minimum temperature (°C)
 * @property {number} targetMax - Safe maximum temperature (°C)
 * @property {number} humidity - Relative humidity percentage (%)
 * @property {number} shock - Acceleration force (G)
 */

/**
 * @typedef {Object} Shipment
 * @property {string} id - Unique shipment ID
 * @property {string} trackingNumber - Tracking number
 * @property {string} cargoName - Description of cargo
 * @property {string} cargoType - Category (e.g. Vaccines, Produce, Electronics)
 * @property {number} cargoValue - Value in USD
 * @property {string} origin - Origin port/city
 * @property {string} destination - Destination port/city
 * @property {string} status - Current status (In Transit, Delayed, Critical)
 * @property {number} riskScore - Calculated risk score (0-100)
 * @property {SensorData} sensorData - Live IoT sensor telemetry
 */

/**
 * @typedef {Object} DisruptionEvent
 * @property {string} id - Unique disruption ID
 * @property {string} title - Incident title
 * @property {string} type - Weather, Strike, Geopolitical, Canal
 * @property {string} severity - Low, Medium, High, Critical
 * @property {number} radiusKm - Impact radius in kilometers
 * @property {number} [lat] - Latitude
 * @property {number} [lng] - Longitude
 */

/**
 * @typedef {Object} FleetAsset
 * @property {string} id - Asset ID
 * @property {string} type - Reefer Truck, Feeder Vessel, Air Freighter
 * @property {string} status - Active, Idle, Maintenance
 * @property {string} location - Current location
 * @property {number} capacityKg - Maximum capacity in kg
 * @property {boolean} hasReefer - Has temperature control capabilities
 */

export default {};
