# Architecture

## System Architecture

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

## Components

| Component | Technology | Responsibility |
|---|---|---|
| Frontend shell | React 18 + Vite 5 | SPA bootstrap, tab layout, Tailwind UI |
| State layer | React Context (LogisticsContext) | Shared shipments, disruptions, fleet, filters, audit log, actions |
| Domain engines | React + Leaflet + Recharts | Visualization and operator workflows |
| AI Copilot UI | AICopilotDrawer + copilotApi.js | Chat UX; calls /api/copilot; action chips apply plans |
| AI / ML | IBM watsonx.ai (ibm/granite-3-8b-instruct) | Natural-language disruption Q&A grounded in ops context |
| Persistence | In-memory (browser session) | No database; state resets on refresh | 

## Data Flow

1. Seed — Mock shipments, disruptions, fleet assets, and carriers load into LogisticsContext on app start.
2. Risk refresh — A useEffect on disruptions recalculates each shipment’s risk score and category via calculateShipmentRiskScore.
3. Read path — Dashboard, map, lists, and charts subscribe to context and render filtered/selected views.
4. Copilot path — User query + context snapshot → POST /api/copilot → IAM token → watsonx text generation → reply rendered in the drawer (local fallback if watsonx is not configured or the API is down).
5. Write path — User actions update shipment status (e.g., REROUTED_SECURE, IN_TRANSIT_OPTIMIZED, CRITICAL_EXCURSION), fleet assignment, and audit log entries.
6. Fleet match — matchFleetToShipment scores candidates (distance ~40%, temperature capability ~35%, cost ~15%, hazmat bonus).
7. Export — Analytics builds a CSV blob client-side; “PDF” uses the browser print dialog.

## Security Considerations

- WATSONX_API_KEY and WATSONX_PROJECT_ID are stored in .env (never committed; .gitignore excludes .env).
- watsonx calls run only on the Express server; the browser never sees the IBM API key.
- Vite proxies /api to localhost:3001 in development so the frontend uses same-origin requests.
- Demo domain data is mock and session-scoped; nothing is written to a remote database.
- If extended to production, add auth on API routes, rotate IBM keys via a secrets manager, and rate-limit Copilot endpoints.

## Scalability Notes

- The SPA can be served from any static host after npm run build (dist/).
- The Express layer is stateless and can be horizontally scaled; watsonx inference is the main latency/cost bottleneck and would benefit from caching frequent prompts and request batching.
- Risk/matching engines are pure functions and can be moved server-side or unit-tested without changing the UX contract.
- Live telemetry later: ingest webhooks into the API, persist events in a database, and keep feeding compact context summaries into watsonx for Copilot answers.
