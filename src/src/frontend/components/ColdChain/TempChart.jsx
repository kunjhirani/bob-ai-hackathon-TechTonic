import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function TempChart({ sensorData }) {
  if (!sensorData) return null;

  const data = [
    { time: '06:00', temp: sensorData.targetMin + 0.5 },
    { time: '08:00', temp: sensorData.targetMin + 1.2 },
    { time: '10:00', temp: sensorData.targetMax - 0.5 },
    { time: '12:00', temp: sensorData.temperature },
    { time: '14:00', temp: sensorData.temperature + 0.3 }
  ];

  return (
    <div className="h-44 w-full bg-slate-50 p-2 rounded-xl border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} />
          <YAxis domain={[0, 15]} stroke="#94a3b8" fontSize={10} />
          <Tooltip />
          <ReferenceLine y={sensorData.targetMax} label="Max Safe" stroke="#f43f5e" strokeDasharray="3 3" />
          <ReferenceLine y={sensorData.targetMin} label="Min Safe" stroke="#0284c7" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="temp" stroke="#0f172a" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
