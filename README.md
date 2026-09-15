# 🚀 Supply Chain Disruption Assistant & Fleet Utilisation Optimizer

> ⚠️ **Replace everything in `[ ]` brackets with your actual content before submission.**

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

> In 2–3 sentences: What problem does your project solve? Who experiences this problem?

We built an AI-powered Supply Chain Disruption Assistant for logistics operators, fleet managers, and supply-chain decision-makers. It monitors shipments, disruptions, fleet availability, routes, and cold-chain conditions to identify risks and recommend optimal rerouting, carrier alternatives, and fleet redeployment, with an AI Copilot providing actionable insights.


---

## 💡 Solution

> In 2–3 sentences: What did you build? How does it solve the problem above?

We built a centralized AI-driven logistics platform that gives supply-chain teams a real-time view of their operations and helps them respond to unexpected events. It combines shipment, route, fleet, and cold-chain data to assess risk, suggest the best course of action, and provide clear recommendations through an AI Copilot—helping teams make faster decisions while reducing delays, idle resources, and cargo loss.

---

## ✨ Key Features

- **Feature 1:** AI-Powered Supply Chain Risk Analysis — Identifies and prioritizes shipments affected by disruptions.
- **Feature 2:** Intelligent Route Optimization — Determines the most suitable alternative routes based on risk, time, and cost.
- **Feature 3:** Fleet Utilization & Redeployment — Identifies underutilized fleet and recommends where it should be deployed.
- **Feature 4:** Cold-Chain Monitoring — Monitors temperature-sensitive shipments and detects potentially harmful temperature deviations.
- **Feature 5:** AI Logistics Copilot — Provides logistics teams with actionable recommendations and explains the reasoning behind critical decisions.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Languages** | JavaScript(ES6+), HTML5, PostCSS/CSS3 |
| **Frameworks** | React 18, Vite 5, Tailwind CSS |
| **IBM Technologies** | watsonx.ai & watsonx Assistant (AEGIS AI Copilot) |
| **Databases** | React Context API, JSON Structured Data Models, Browser Web Storage (LocalStorage API) |
| **Other** | Leaflet.js, CartoDB Voyager Vector Tiles, Recharts, Lucide React |

---

## 📁 Repository Structure

```
├── src/                  # All source code
├── docs/                 # Written documentation
│   ├── problem-statement.md
│   ├── solution-overview.md
│   ├── architecture.md
│   └── setup-guide.md
├── demo/                 # Demo artifacts
│   ├── screenshots/      # App screenshots
│   └── demo-video-link.txt  # Link to demo video
├── presentation/         # Slide deck
└── submission.yaml       # Structured submission metadata
```

---

## ⚡ How to Run

> **Copy these exact steps from your [`docs/setup-guide.md`](docs/setup-guide.md)**

```bash
# 1. Clone the repo
git clone https://github.com/[your-repo].git
cd [your-repo]

# 2. Install dependencies
[your install command here]

# 3. Configure environment
cp .env.example .env
# Edit .env with your values

# 4. Run the project
[your run command here]
```

---

## 🖥️ Demo

| Artifact | Link |
|---|---|
| 📹 Demo Video | [See demo/demo-video-link.txt](demo/demo-video-link.txt) |
| 🌐 Live Demo | [See demo/live-demo-url.txt](demo/live-demo-url.txt) |
| 🖼️ Screenshots | [See demo/screenshots/](demo/screenshots/) |
| 📊 Presentation | [See presentation/slides.pdf](presentation/) |

---

## ⚠️ Known Limitations

> Be honest — judges appreciate transparency over overclaiming.

-  Telemetry data (temperature, humidity, shock), shipment positions, and global weather disruptions are driven by rich client-side mock datasets and not by real-time data and sensor streaming
- The app opens directly to the dashboard with no login, authentication, or role restrictions.
- Route paths are rendered using simplified polyline coordinates between origins, waypoints, and destinations. Disruption hazards use geometric circle overlays.
-  Clicking "Apply Plan" or "Dispatch Reefer Relay" instantly updates the local state and recalculates risk scores, but does not transmit external bookings.
---

## 🏅 What We're Most Proud Of

1 Spoilage Countdown Timer & Live Excursion Engine
2 "What-If" Cascade Disruption Sandbox
Most logistics dashboards are passive line graphs that show you what already went wrong yesterday. Our platform is a proactive Control Tower: it predicts cold-chain cargo spoilage hours before it happens, simulates cascading weather and port disruptions on the fly, and uses Explainable AI to match delayed shipments with idle fleet assets in a single click
---
