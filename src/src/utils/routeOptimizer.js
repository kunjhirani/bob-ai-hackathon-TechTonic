export function getHaversineDistanceKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function matchFleetToShipment(shipment, fleetAssets = []) {
  if (!shipment || !shipment.currentPosition) return [];

  const targetCoords = shipment.currentPosition.coords;

  return fleetAssets
    .filter(asset => asset.status === 'IDLE')
    .map(asset => {
      const distanceKm = getHaversineDistanceKm(targetCoords, asset.coords);

      let tempMatchScore = 100;
      if (shipment.isColdChain && shipment.temperature) {
        const { minThreshold, maxThreshold } = shipment.temperature;
        if (asset.specs.minTempCapable > minThreshold || asset.specs.maxTempCapable < maxThreshold) {
          tempMatchScore = 20;
        }
      }

      const distanceScore = Math.max(0, 100 - Math.round(distanceKm / 50));
      const dispatchHours = Math.max(0.5, (distanceKm / 80).toFixed(1));

      const matchScore = Math.round(
        (distanceScore * 0.40) +
        (tempMatchScore * 0.35) +
        (Math.min(100, (1000 / asset.hourlyCost) * 10) * 0.15) +
        (asset.specs.hazmatCertified ? 10 : 0)
      );

      return {
        asset,
        distanceKm,
        dispatchHours,
        tempMatchScore,
        matchScore: Math.min(99, Math.max(10, matchScore)),
        recommendedReason: `Located ${distanceKm} km away. Estimated arrival: ${dispatchHours} hrs. Temperature spec match: ${tempMatchScore >= 80 ? 'Compatible' : 'Requires Dual-Zone Sub-unit'}.`
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
