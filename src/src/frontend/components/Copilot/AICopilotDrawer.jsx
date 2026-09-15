import React, { useState } from 'react';
import { useLogistics } from '../../../shared/LogisticsContext.jsx';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function AICopilotDrawer() {
  const { isCopilotOpen, setIsCopilotOpen, copilotMessages, setCopilotMessages } = useLogistics();
  const [input, setInput] = useState('');

  if (!isCopilotOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input, timestamp: 'Just now' };
    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: `Analyzed query: "${input}". AEGIS Copilot recommends rerouting shipment SH-8821 via Maersk Air Relay to mitigate 18-hour port delay.`,
      timestamp: 'Just now'
    };
    setCopilotMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col">
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">AEGIS AI Logistics Copilot</h3>
            <p className="text-[10px] text-sky-400 font-semibold">watsonx.ai Decision Engine</p>
          </div>
        </div>
        <button onClick={() => setIsCopilotOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
        {copilotMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-xs space-y-1 ${msg.sender === 'user' ? 'bg-sky-600 text-white font-medium' : 'bg-white border border-slate-200 text-slate-800 shadow-xs'}`}>
              <p>{msg.text}</p>
              <span className={`text-[9px] block text-right ${msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'}`}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask AEGIS Copilot (e.g. Reroute SH-8821)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button onClick={handleSend} className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-xs">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
