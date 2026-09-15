export function exportShipmentsCSV(shipments) {
  const headers = [
    "Shipment ID",
    "Title",
    "Carrier",
    "Transport Mode",
    "Status",
    "Risk Score",
    "Risk Category",
    "Cold Chain",
    "Current Temp (°C)",
    "Cargo Value ($)",
    "Origin",
    "Destination",
    "ETA",
    "Delay (Hours)"
  ];

  const rows = shipments.map(s => [
    s.id,
    `"${s.title}"`,
    `"${s.carrier}"`,
    s.mode,
    s.status,
    s.riskScore,
    s.riskCategory,
    s.isColdChain ? "Yes" : "No",
    s.temperature ? s.temperature.current : "N/A",
    s.cargoValue,
    `"${s.origin.name}"`,
    `"${s.destination.name}"`,
    s.eta,
    s.delayHours
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `AEGIS_SupplyChain_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
