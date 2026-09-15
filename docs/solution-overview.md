# Solution Overview

## What We Built

LogiShield is an AI-powered supply chain decision-support platform designed for logistics operators, fleet managers, and supply-chain decision-makers. It provides a centralized view of shipments, disruptions, fleet assets, and cold-chain sensor data.

The platform analyzes operational data to identify high-risk shipments, recommend alternative routes and carriers, identify suitable idle fleet for redeployment, and detect cold-chain temperature excursions in real-time.


## How It Works

1. **Operational data is collected**
   
   LogiShield works with shipment, fleet, route, disruption, carrier, and cold-chain sensor data.

2. **Disruptions are analyzed**
   
   When a disruption such as a road closure, port disruption, severe weather event, or other operational incident is recorded, the system determines which routes and shipments may be affected.

3. **Shipment risk is assessed**
   
   Each affected shipment is evaluated using factors such as disruption severity, shipment priority, delivery deadline, cargo sensitivity, and cold-chain conditions.

4. **Alternative routes and carriers are evaluated**
   
   The system compares available routes and carrier options using operational factors such as estimated travel time, cost, disruption risk, and expected delay.

5. **Fleet availability is analyzed**
   
   Idle vehicles are identified and matched against affected shipments based on location, capacity, availability, vehicle type, and cold-chain requirements.

6. **Cold-chain conditions are monitored**
   
   Temperature-sensitive shipments are monitored using sensor readings. The system detects temperature excursions and assigns an appropriate risk/severity level based on the configured shipment requirements and thresholds.

7. **Recommendations are generated**
   
   The system combines the results of impact analysis, route optimization, fleet matching, and cold-chain monitoring to generate recommended actions.

8. **The AI Copilot explains the situation**
   
   Users can ask questions about shipments, disruptions, routes, fleet availability, and alerts. The AI Copilot converts the underlying operational information into understandable summaries and actionable recommendations using natural language.

9. **Operators take action**
   
   Logistics teams can review the recommendations and use the platform to make faster, more informed operational decisions.


## Architecture Diagram

                         ┌─────────────────────────┐
                         │    Operations Planner   │
                         │                         │
                         │ View Operations         │
                         │ Analyze Disruptions     │
                         │ Optimize Routes         │
                         │ Monitor Cold Chain      │
                         │ Use AI Copilot          │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   React + Vite SPA      │
                         │        :3000            │
                         │                         │
                         │ Dashboard               │
                         │ Shipments               │
                         │ Disruptions             │
                         │ Fleet                   │
                         │ Cold Chain              │
                         │ AI Copilot              │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │    LogisticsContext     │
                         │                         │
                         │ Application State       │
                         │ Logistics Data          │
                         │ Domain Logic Access     │
                         └────────────┬────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
             ▼                        ▼                        ▼
    ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
    │  Mock Domain     │     │ Risk Calculator  │     │ Route Optimizer  │
    │      Data        │     │                  │     │                  │
    │                  │     │ Risk Assessment  │     │ Route Selection  │
    │ Shipments        │     │ Risk Scoring     │     │ Alternative      │
    │ Fleet            │     │ Disruption       │     │ Routes           │
    │ Routes           │     │ Impact Analysis  │     │ Optimization     │
    │ Disruptions      │     └──────────────────┘     └──────────────────┘
    │ Cold Chain       │
    └──────────────────┘
             │
             │
             └───────────────────────┐
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Cold Chain       │
                            │ Engine           │
                            │                  │
                            │ Temperature      │
                            │ Monitoring       │
                            │ Excursion        │
                            │ Detection        │
                            └────────┬─────────┘
                                     │
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ▼                                 ▼
          ┌──────────────────┐              ┌──────────────────┐
          │  Express API     │              │  Frontend        │
          │      :3001       │              │  Visualization   │
          │                  │              │                  │
          │ API Endpoints    │              │ Leaflet Map      │
          │ AI Orchestration │              │ Recharts         │
          └────────┬─────────┘              │ Analytics        │
                   │                        │ AI Copilot       │
                   ▼                        └──────────────────┘
          ┌─────────────────────────┐
          │   IBM watsonx.ai        │
          │       Granite           │
          │                         │
          │ AI Logistics Copilot    │
          │ Natural Language        │
          │ Insights                │
          │ Explanations            │
          │ Recommendations         │
          └─────────────────────────┘

## Key Design Decisions

| Decision | Rationale |
|---|---|
| IBM watsonx.ai (Granite) for Copilot answers | Grounded natural-language reasoning over live ops context; IBM foundation model suitable for enterprise logistics demos.|
| Express proxy for watsonx calls | Keeps WATSONX_API_KEY / project ID server-side; Vite proxies /api to port 3001 |
| Local Copilot fallback | Demo remains usable without IBM credentials; UI degrades gracefully on 503 / network errors |
| Constraint-based fleet matching | Ensures that recommended vehicles satisfy shipment requirements such as capacity, location, availability, and refrigeration. |
| Deterministic risk and matching engines | Transparent, explainable scores stable for demos; independent of LLM variability |
| Pre-authored recommended plans on at-risk shipments | All tabs share one live operational picture; Copilot uses the same state snapshot |
| Cold-chain as a first-class module | Pharma/food spoilage is a distinct failure mode; breach simulation makes impact tangible |

## IBM Technologies Used

**IBM watsonx.ai**

The AI Copilot calls watsonx.ai text generation with model ibm/granite-3-8b-instruct. The Express service (server/watsonx.js) obtains an IBM Cloud IAM bearer token from WATSONX_API_KEY, then POSTs the user's question and operational context to the watsonx API endpoint. The response is streamed back to the frontend and rendered in the Copilot chat drawer.

**IBM Bob Integration**

The platform is positioned as a logistics copilot within the IBM Bob ecosystem, leveraging enterprise AI capabilities to augment human decision-making in supply chain operations.
