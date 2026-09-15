import { mockShipments } from '../data/mockShipments.js';
import { mockDisruptions } from '../data/mockDisruptions.js';
import { mockFleet } from '../data/mockFleet.js';
import { mockCarriers } from '../data/mockCarriers.js';

/**
 * Logistics API Service Layer
 * Abstracts data retrieval and simulated backend endpoint calls.
 */
export const logisticsApi = {
  async fetchShipments() {
    return Promise.resolve(mockShipments);
  },

  async fetchDisruptions() {
    return Promise.resolve(mockDisruptions);
  },

  async fetchFleet() {
    return Promise.resolve(mockFleet);
  },

  async fetchCarriers() {
    return Promise.resolve(mockCarriers);
  },

  async submitReroutePlan(shipmentId, routeId) {
    return Promise.resolve({
      success: true,
      shipmentId,
      routeId,
      timestamp: new Date().toISOString()
    });
  }
};
