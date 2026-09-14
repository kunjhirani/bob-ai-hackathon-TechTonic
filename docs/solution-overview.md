# Solution Overview

## What We Built

LogiShield is an AI-powered supply chain decision-support platform designed for logistics operators, fleet managers, and supply-chain decision-makers. It provides a centralized view of shipments, disruptions, routes, fleet availability, and cold-chain conditions.

The platform analyzes operational data to identify high-risk shipments, recommend alternative routes and carriers, identify suitable idle fleet for redeployment, and detect cold-chain temperature excursions. An AI Logistics Copilot helps users understand the situation and provides clear, actionable recommendations.


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
   
   Temperature-sensitive shipments are monitored using sensor readings. The system detects temperature excursions and assigns an appropriate risk/severity level based on the configured shipment requirements and excursion characteristics.

7. **Recommendations are generated**
   
   The system combines the results of impact analysis, route optimization, fleet matching, and cold-chain monitoring to generate recommended actions.

8. **The AI Copilot explains the situation**
   
   Users can ask questions about shipments, disruptions, routes, fleet availability, and alerts. The AI Copilot converts the underlying operational information into understandable summaries and actionable recommendations.

9. **Operators take action**
   
   Logistics teams can review the recommendations and use the platform to make faster, more informed operational decisions.


## Architecture Diagram

                    ┌───────────────────────┐
                    │      Logistics User   │
                    │ Operations / Fleet /  │
                    │ Supply Chain Manager  │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   React Web Dashboard │
                    │                       │
                    │ Dashboard / Map /     │
                    │ Shipments / Fleet /   │
                    │ Cold Chain / Copilot  │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     FastAPI Backend   │
                    │                       │
                    │ API + Business Logic  │
                    └───────────┬───────────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
    ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
    │ Risk & Impact  │ │ Optimization   │ │ Cold-Chain     │
    │ Analysis       │ │ Engine         │ │ Monitoring     │
    └────────────────┘ └───────┬────────┘ └────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
             Route Optimization     Fleet Matching
                    │                     │
                    └──────────┬──────────┘
                               ▼
                    ┌───────────────────────┐
                    │    PostgreSQL Data    │
                    │                       │
                    │ Shipments / Fleet /   │
                    │ Routes / Disruptions  │
                    │ Sensors / Carriers    │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     IBM AI / Bob      │
                    │    AI Logistics       │
                    │       Copilot         │
                    └───────────────────────┘

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Centralized logistics dashboard | Gives operations teams a single view of shipments, disruptions, fleet, and cold-chain conditions. |
| Risk-based shipment prioritization | Allows users to focus on critical shipments instead of manually reviewing every shipment. |
| Multi-factor route evaluation | Prevents the system from selecting routes based only on distance and considers operational risk, time, and cost. |
| Constraint-based fleet matching | Ensures that recommended vehicles satisfy shipment requirements such as capacity, location, availability, and refrigeration. |
| Rule-based cold-chain threshold detection with anomaly analysis | Provides a clear and explainable way to detect temperature excursions while allowing abnormal sensor behavior to be identified. |
| AI Copilot on top of structured operational data | Allows users to interact with complex logistics information using natural language while keeping recommendations grounded in application data. |

## IBM Technologies Used

**IBM Bob / IBM AI Capabilities**

IBM's AI capabilities are used as the intelligence layer for the LogiShield Copilot. The Copilot uses relevant operational information from the application to answer logistics questions, summarize disruptions, explain shipment risks, and provide actionable recommendations.

Examples of Copilot interactions include:

"Which shipments are currently at highest risk?"
"Why is shipment C204 critical?"
"Which vehicles can be redeployed?"
"What is the recommended route for C204?"
"Summarize the current disruption."
"What action should the logistics operator take?"

The AI layer complements the application's deterministic risk, routing, fleet, and cold-chain logic rather than replacing those components
