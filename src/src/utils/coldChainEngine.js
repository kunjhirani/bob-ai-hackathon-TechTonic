export function classifyColdChainSeverity(tempData) {
  if (!tempData) return { status: 'STABLE', level: 'NORMAL', label: 'Optimal Integrity', alertColor: 'emerald' };

  const { current, minThreshold, maxThreshold } = tempData;

  if (current > maxThreshold) {
    const overflow = current - maxThreshold;
    if (overflow >= 5.0) {
      return {
        status: 'CRITICAL_EXCURSION',
        level: 'EXTREME',
        label: 'Immediate Spoilage Danger',
        alertColor: 'rose',
        description: `Temperature is ${overflow.toFixed(1)}°C above critical ceiling (${maxThreshold}°C)`
      };
    }
    return {
      status: 'HIGH_EXCURSION',
      level: 'HIGH',
      label: 'Thermal Excursion Active',
      alertColor: 'amber',
      description: `Temperature breached max threshold by +${overflow.toFixed(1)}°C`
    };
  }

  if (current < minThreshold) {
    const freezeDiff = minThreshold - current;
    return {
      status: 'FREEZE_HAZARD',
      level: 'HIGH',
      label: 'Freeze Injury Risk',
      alertColor: 'amber',
      description: `Cargo temperature dropped ${freezeDiff.toFixed(1)}°C below minimum threshold`
    };
  }

  const range = maxThreshold - minThreshold;
  const margin = maxThreshold - current;
  if (range > 0 && margin / range < 0.15) {
    return {
      status: 'WARNING_BOUND',
      level: 'MEDIUM',
      label: 'Approaching Max Ceiling',
      alertColor: 'amber',
      description: `Temperature within 15% of maximum threshold boundary`
    };
  }

  return {
    status: 'OPTIMAL',
    level: 'LOW',
    label: 'Optimal Integrity',
    alertColor: 'emerald',
    description: `Stable temperature within safe limits (${minThreshold}°C to ${maxThreshold}°C)`
  };
}

export function calculateLossRiskValue(shipment) {
  if (!shipment.isColdChain || !shipment.temperature) return 0;
  const severity = classifyColdChainSeverity(shipment.temperature);
  if (severity.level === 'EXTREME') return shipment.cargoValue;
  if (severity.level === 'HIGH') return Math.round(shipment.cargoValue * 0.65);
  if (severity.level === 'MEDIUM') return Math.round(shipment.cargoValue * 0.20);
  return 0;
}
