# 🚀 Supply Chain Disruption Assistant & Fleet Utilisation Optimizer

> **AEGIS Control Tower**: An AI-powered logistics platform for real-time supply chain disruption management, cold-chain monitoring, and fleet optimization.

---

## 👥 Team

| Field | Value |
|---|---|
| **Team Name** | TechTonic |
| **Track** | AI |
| **Team Lead** | Kunj Hirani — kunjhirani6183@gmail.com |
| **Members** | Princy Khamar, Rutvi Modi, Dishit Padia |

---

## 🎯 Problem Statement

**The Problem:**
Supply chain operators face constant challenges responding to disruptions—weather events, port closures, carrier failures, and temperature excursions—without real-time visibility across shipments, fleet assets, and alternative routes.

**Who Has It:**
Logistics operators, fleet managers, and supply-chain decision-makers managing high-value, time-sensitive, and temperature-sensitive shipments (pharma, perishables).

---

## 💡 Solution

**AEGIS Control Tower** is a centralized AI-driven logistics platform that:
- Provides **real-time visibility** into shipments, disruptions, and fleet status
- **Detects and prioritizes** affected shipments using AI risk assessment
- **Recommends alternative routes and carriers** with cost/time/risk trade-offs
- **Identifies idle fleet** for redeployment to at-risk shipments
- **Monitors cold-chain conditions** with live temperature tracking and spoilage warnings
- **Provides actionable AI copilot guidance** explaining every recommendation

---

## ✨ Key Features

- **Feature 1: AI-Powered Supply Chain Risk Analysis**
  - Automatically identifies and prioritizes shipments affected by disruptions
  - Scores risk based on cargo value, delivery deadlines, disruption severity, and temperature excursions
  - Color-coded dashboard (Low/Medium/High/Critical)

- **Feature 2: Intelligent Route Optimization**
  - Determines the most suitable alternative routes based on risk, time, and cost
  - Recommends alternate carriers with matching capabilities (capacity, refrigeration, hazmat)
  - Shows estimated delay and cost impact for each option

- **Feature 3: Fleet Utilization & Redeployment**
  - Identifies underutilized and idle fleet assets in real time
  - Matches vehicles to at-risk shipments based on location, capacity, and refrigeration
  - One-click redeploy with instant status updates

- **Feature 4: Cold-Chain Monitoring**
  - Live temperature tracking for pharma and perishable shipments
  - Automated spoilage countdown timer
  - Temperature excursion alerts and deviation severity classification
  - Pre-configured safe ranges for common cargo types

- **Feature 5: AI Logistics Copilot**
  - Natural-language AI assistant powered by IBM watsonx.ai (Granite model)
  - Explains disruption impacts, why shipments are at risk, and recommended actions
  - Supports what-if scenario queries
  - Grounded recommendations based on live operational context

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Languages** | JavaScript (ES6+), HTML5, PostCSS/CSS3 |
| **Frameworks** | React 18, Vite 5, Tailwind CSS 3 |
| **IBM Technologies** | IBM watsonx.ai (Granite 3 model), IBM watsonx Assistant (AEGIS AI Copilot) |
| **State Management** | React Context API, Browser LocalStorage |
| **Visualization** | Leaflet.js (mapping), Recharts (analytics), Lucide React (icons) |
| **Build & Development** | Vite 5, PostCSS, Autoprefixer |
| **Data Structures** | JSON mock datasets, React Context state management |

---

## 📁 Repository Structure

```
.
├── src/                              # Main application source
│   ├── src/
│   │   ├── api/
│   │   │   └── logisticsApi.js      # API integration layer
│   │   │
│   │   ├── backend/
│   │   │   └── server.js            # Express.js server (watsonx proxy)
│   │   │
│   │   ├── data/
│   │   │   ├── mockCarriers.js      # Alternative carrier options
│   │   │   ├── mockDisruptions.js   # Disruption events
│   │   │   ├── mockFleet.js         # Fleet asset inventory
│   │   │   └── mockShipments.js     # Shipment datasets
│   │   │
│   │   ├── models/
│   │   │   └── types.js             # Shared type definitions
│   │   │
│   │   ├── shared/
│   │   │   └── LogisticsContext.jsx # Global state provider
│   │   │
│   │   ├── utils/
│   │   │   ├── coldChainEngine.js   # Temperature monitoring & spoilage logic
│   │   │   ├── reportExporter.js    # CSV/PDF report generation
│   │   │   ├── riskCalculator.js    # Risk scoring engine
│   │   │   └── routeOptimizer.js    # Route recommendation engine
│   │   │
│   │   └── frontend/
│   │       ├── App.jsx              # Main application component
│   │       ├── main.jsx             # React entry point
│   │       ├── index.css            # Global styles
│   │       └── components/
│   │           ├── Header.jsx       # Navigation & branding
│   │           ├── Dashboard/
│   │           │   ├── KPICards.jsx
│   │           │   ├── ActionCenter.jsx
│   │           │   └── DisruptionTicker.jsx
│   │           ├── Shipments/
│   │           │   ├── ShipmentList.jsx
│   │           │   └── ShipmentCard.jsx
│   │           ├── Map/
│   │           │   ├── LogisticsMap.jsx
│   │           │   └── MapControls.jsx
│   │           ├── ColdChain/
│   │           │   ├── ColdChainMonitor.jsx
│   │           │   └── TempChart.jsx
│   │           ├── Fleet/
│   │           │   └── FleetOverview.jsx
│   │           ├── Simulation/
│   │           │   └── WhatIfSimulator.jsx
│   │           ├── Analytics/
│   │           │   ├── AnalyticsView.jsx
│   │           │   └── ReportGenerator.jsx
│   │           └── Copilot/
│   │               └── AICopilotDrawer.jsx
│   │
│   ├── dist/                        # Built application (after npm run build)
│   ├── notebooks/
│   │   └── disruption_risk_model.ipynb  # ML model exploration
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example                 # Environment variable template
│
├── docs/                            # Documentation
│   ├── problem-statement.md         # Detailed problem analysis
│   ├── solution-overview.md         # How the solution works
│   ├── architecture.md              # System design & data flow
│   ├── setup-guide.md               # Development setup instructions
│   └── template-guide.md            # Submission requirements
│
├── demo/                            # Demo & presentation materials
│   ├── screenshots/                 # UI screenshots
│   ├── demo-video-link.txt          # Link to demo video
│   └── live-demo-url.txt            # Link to live deployment
│
├── presentation/
│   ├── slides.pdf                   # Presentation deck
│   └── README.md
│
├── submission.yaml                  # Structured submission metadata
├── README.md                        # This file
├── CONTRIBUTING.md
└── .gitignore
```

---

## ⚡ How to Run

### Prerequisites
- **Node.js** 16+ and **npm** 8+
- (Optional) IBM Cloud account for watsonx.ai integration

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/kunjhirani/bob-ai-hackathon-TechTonic.git
cd bob-ai-hackathon-TechTonic

# 2. Navigate to the source directory
cd src

# 3. Install dependencies
npm install

# 4. Copy environment template
cp .env.example .env
# Edit .env with your IBM watsonx credentials (optional for demo mode)

# 5. Start the development server
npm run dev
# App runs at http://localhost:3000
```

### Build for Production

```bash
cd src
npm run build
# Output in src/dist/
```

### Environment Variables (Optional)

Create `.env` in the `src/` directory for IBM watsonx integration:

```bash
VITE_API_BASE_URL=http://localhost:3001
WATSONX_API_KEY=<your_ibm_cloud_api_key>
WATSONX_PROJECT_ID=<your_watsonx_project_id>
WATSONX_MODEL_ID=ibm/granite-3-8b-instruct
```

**Note:** The app works without these credentials in demo mode (AI Copilot will show a fallback message).

---

## 🖥️ Demo

| Artifact | Location |
|---|---|
| 📹 **Demo Video** | [demo/demo-video-link.txt](demo/demo-video-link.txt) |
| 🌐 **Live Demo** | [demo/live-demo-url.txt](demo/live-demo-url.txt) |
| 🖼️ **Screenshots** | [demo/screenshots/](demo/screenshots/) |
| 📊 **Presentation** | [presentation/slides.pdf](presentation/slides.pdf) |

---

## 📊 Key Use Cases

### Use Case 1: Port Disruption Response
**Scenario:** A port closes due to severe weather, affecting 5 high-value cold-chain shipments.

**AEGIS Response:**
- Automatically identifies affected shipments
- Recommends 3 alternate routes via different ports
- Suggests matching carriers with adequate refrigeration
- Proposes idle reefer trucks for relay pickup
- Copilot explains delay vs. spoilage trade-offs

### Use Case 2: Temperature Excursion Management
**Scenario:** A pharma shipment's temperature rises 2°C above safe range during transit.

**AEGIS Response:**
- Real-time spoilage countdown timer (e.g., "3 hours to total loss")
- Risk score jumps to CRITICAL
- Recommends emergency diversion to nearest cold-storage facility
- Suggests rerouting via a carrier with proven temperature stability
- Copilot proposes partial salvage vs. full reroute

### Use Case 3: Fleet Optimization
**Scenario:** 8 reefer trucks are idle while 12 perishable shipments are at risk.

**AEGIS Response:**
- Highlights 8 idle assets and shows 12 underserved shipments
- Matches vehicles to shipments by location, capacity, and refrigeration specs
- One-click redeploy with instant status sync
- Analytics show utilization lift and cost savings

---

## ⚠️ Known Limitations

- **Mock Data**: Telemetry (temperature, humidity, shock), shipment positions, and disruptions are simulated client-side mock datasets, not real-time sensor streams
- **No Authentication**: App opens directly to the dashboard with no login, role-based access control, or multi-tenancy
- **Simplified Routing**: Route paths are rendered as polylines; disruption zones use geometric circle overlays, not real map hazards
- **No External Bookings**: Clicking "Apply Plan" or "Dispatch Reefer Relay" updates local state instantly but does not transmit real carrier bookings
- **Browser Session Storage**: No persistent database; state resets on refresh
- **Copilot Fallback**: If IBM watsonx is not configured, Copilot shows a local fallback response

---

## 🏅 What We're Most Proud Of

1. **Spoilage Countdown Timer & Live Excursion Engine**
   - Every cold-chain shipment shows a real-time countdown to total loss if temperature stays out of range
   - Transforms abstract risk scores into tangible urgency

2. **"What-If" Cascade Disruption Sandbox**
   - Users can simulate new disruptions and instantly see the cascading impact across shipments, routes, and fleet
   - Enables proactive planning without affecting live operations

3. **AI Copilot Grounded in Real Context**
   - Every Copilot recommendation is tied to live operational data
   - Copilot explains *why* a shipment is at risk and *why* a recommendation makes sense
   - Natural-language reasoning powered by IBM watsonx.ai Granite model

4. **Unified Control Tower UX**
   - All five analytics views (Dashboard, Shipments, Map, Fleet, Cold Chain, Simulation, Analytics) share one live operational picture
   - Changes in one view instantly propagate to all others

---

## 🚀 Roadmap

**Phase 2 (Future Enhancements):**
- Real-time IoT telemetry ingest via MQTT/Webhooks
- Persistent database (PostgreSQL) with audit logging
- Role-based access control (shipper, carrier, planner, admin)
- Advanced ML: demand forecasting, anomaly detection
- Mobile app (React Native)
- Multi-language support
- Real carrier API integrations (FedEx, DHL, UPS)

---

## 📄 License

This project is submitted as part of the IBM Bob AI Hackathon. All rights reserved.

---

## 📞 Support & Contact

**Team Lead:** Kunj Hirani  
📧 kunjhirani6183@gmail.com

**For questions or issues:**
- Check [docs/setup-guide.md](docs/setup-guide.md) for setup troubleshooting
- Review [docs/architecture.md](docs/architecture.md) for system design
- Open an issue on GitHub

---

**Built with ❤️ by TechTonic | Powered by IBM watsonx.ai**
