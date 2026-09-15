export function calculateShipmentRiskScore(shipment, disruptions = []) {
  let score = 0;

  if (shipment.affectedByDisruptionId) {
    const disruption = disruptions.find(d => d.id === shipment.affectedByDisruptionId);
    if (disruption) {
      if (disruption.severity === 'CRITICAL') score += 40;
      else if (disruption.severity === 'HIGH') score += 30;
      else if (disruption.severity === 'MEDIUM') score += 20;
      else score += 10;
    } else {
      score += 25;
    }
  }

  if (shipment.isColdChain && shipment.temperature) {
    const { current, minThreshold, maxThreshold } = shipment.temperature;
    if (current > maxThreshold) {
      const diff = current - maxThreshold;
      score += Math.min(35, Math.round(15 + diff * 4));
    } else if (current < minThreshold) {
      const diff = minThreshold - current;
      score += Math.min(35, Math.round(15 + diff * 4));
    } else {
      const range = maxThreshold - minThreshold;
      if (range > 0 && (maxThreshold - current) / range < 0.15) {
        score += 10;
      }
    }
  }

  if (shipment.delayHours > 0) {
    if (shipment.delayHours > 72) score += 15;
    else if (shipment.delayHours > 24) score += 10;
    else score += 5;
  }

  if (shipment.cargoValue > 1000000) score += 10;
  else if (shipment.cargoValue > 500000) score += 7;
  else if (shipment.cargoValue > 200000) score += 4;

  const finalScore = Math.min(100, Math.max(0, score));
  let category = 'LOW';
  if (finalScore >= 80) category = 'CRITICAL';
  else if (finalScore >= 60) category = 'HIGH';
  else if (finalScore >= 35) category = 'MEDIUM';

  return { score: finalScore, category };
}
