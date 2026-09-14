# Setup Guide

> **This file is read by the automated evaluation pipeline. Be precise and complete.**

## Prerequisites

Before you begin, ensure you have the following installed:

- [ ] **Node.js 18+** (npm included; repo has `package-lock.json`)
- [ ] A modern browser (Chrome, Edge, or Firefox recommended)
- [ ] Git (to clone the repository)
- [ ] **An IBM Cloud account with watsonx.ai access** (required for live AI Copilot; optional for UI-only demo with local fallback)

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|---|---|---|
| WATSONX_API_KEY | Your IBM Cloud API key used for watsonx.ai / IAM | Yes (for live Copilot) |
| WATSONX_PROJECT_ID | Your watsonx.ai project ID | Yes (for live Copilot) |
| WATSONX_URL | watsonx regional endpoint (default https://us-south.ml.cloud.ibm.com) | No |
| WATSONX_MODEL_ID | Foundation model ID (default ibm/granite-3-8b-instruct) | No |
| PORT | Express API port (default 3001) | No |

## Installation

# 1. Clone the repository
git clone https://github.com/kunjhirani/bob-ai-hackathon-TechTonic.git
cd kunjhirani\bob-ai-hackathon-TechTonic

# 2. Install dependencies (frontend + Express API)
npm install

# 3. Configure IBM watsonx.ai
cp .env.example .env

There is no database migration step.

## Running the Application

npm run dev

Or in seperate terminals

npm run dev:api
npm run dev:web

The application will be available at: http://localhost:3000

## Running Tests

Automated unit/integration tests are not included in this prototype.

Manual smoke checklist for evaluators:

1. Open http://localhost:3000 — Dashboard KPIs and map load.
2. Open http://localhost:3001/api/health — confirm watsonxConfigured: true if keys are set.
3. Open AI Copilot — ask “Summarize high-risk cargo”; with watsonx configured, reply should cite watsonx / Granite.
4. Action Center — apply a recommended plan; shipment status updates; audit log gains an entry.
5. Cold-Chain — Simulate Breach; temperature/status reflect excursion.
6. Fleet — redeploy an idle asset.
7. What-If — run a typhoon / strike / Suez scenario.
8. Analytics — download CSV (AEGIS_SupplyChain_Report_YYYY-MM-DD.csv).

## Quick Demo (Optional)

If you have a demo script or sample data to showcase the project quickly:

```bash
[e.g.: python demo/seed_demo_data.py]
[e.g.: open http://localhost:8000/demo]
```

## Troubleshooting

| Issue | Solution |
|---|---|
| npm: command not found | Install Node.js 18+ from https://nodejs.org and reopen the terminal |
| Port 3000 or 3001 already in use | Stop the other process, or change Vite/Express ports |
| watsonx 401 / IAM error| Regenerate the IBM Cloud API key; confirm it has access to the watsonx project |
| watsonx 403 / project error | Verify WATSONX_PROJECT_ID matches your watsonx.ai project and your user/API key has Editor/Admin |
| watsonx_request_failed / model error | Confirm regional WATSONX_URL and that ibm/granite-3-8b-instruct is available in your project |
| API unreachable / proxy errors | Run both web and API (npm run dev); Vite proxies /api to http://localhost:3001 |
| Map tiles not loading | Check network access to CARTO CDN; other panels still work |
| Blank page after install | Delete node_modules, run npm install, then npm run dev |
