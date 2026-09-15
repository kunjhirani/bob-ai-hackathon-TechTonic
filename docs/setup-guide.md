# Setup Guide

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** version 16.0 or later ([download](https://nodejs.org/))
- **npm** version 8.0 or later (comes with Node.js)
- **Git** for cloning the repository ([download](https://git-scm.com/))
- **(Optional)** IBM Cloud account for watsonx.ai integration

### Verify Installation

```bash
node --version    # Should show v16.0.0 or later
npm --version     # Should show 8.0.0 or later
git --version     # Should show git version
```

---

## Step 1: Clone the Repository

```bash
# Clone the repo
git clone https://github.com/kunjhirani/bob-ai-hackathon-TechTonic.git

# Navigate into the directory
cd bob-ai-hackathon-TechTonic
```

---

## Step 2: Install Dependencies

```bash
# Navigate to the source directory
cd src

# Install all npm dependencies
npm install

# This will download ~500+ packages (about 1–2 minutes depending on internet speed)
```

**What gets installed:**
- **React 18**: UI framework
- **Vite 5**: Build tool & dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet.js**: Map library
- **Recharts**: Charting library
- And 10+ other production dependencies

---

## Step 3: Configure Environment Variables (Optional)

The app works **without** IBM watsonx credentials for demo mode. However, to enable the AI Copilot with full natural-language capabilities, configure IBM watsonx.ai:

### 3a. Create `.env` File

```bash
# In the src/ directory, create a .env file
cp .env.example .env
```

### 3b. Obtain IBM Watsonx Credentials

1. Log in to [IBM Cloud Console](https://cloud.ibm.com/)
2. Create or select a **Resource Group**
3. Create a **watsonx.ai** service instance
4. Copy the API key and Project ID from the service credentials

### 3c. Fill in `.env`

Edit `src/.env` with your credentials:

```bash
VITE_API_BASE_URL=http://localhost:3001
WATSONX_API_KEY=<your_ibm_cloud_api_key>
WATSONX_PROJECT_ID=<your_watsonx_project_id>
WATSONX_MODEL_ID=ibm/granite-3-8b-instruct
WATSONX_SPACE_ID=<your_space_id>    # Optional
```

**Note:** Keep `.env` secure and never commit it to GitHub. It's already in `.gitignore`.

---

## Step 4: Start the Development Server

```bash
# From the src/ directory
npm run dev
```

**Expected Output:**

```
  VITE v5.2.11  dev server running at:

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help

[timestamp] [vite] page reload src/frontend/main.jsx
```

### Access the Application

Open your browser and navigate to:
- **http://localhost:3000/**

The app should load instantly. If you see a blank screen, check the browser console (F12) for errors.

---

## Step 5: Explore the Demo

### Default Dashboard View

On first load, you'll see:

1. **KPI Cards** (top)
   - Total Shipments
   - At-Risk Shipments
   - Total At-Risk Value
   - Critical Temperature Breaches
   - Idle Fleet Count
   - Active Disruptions

2. **Live Logistics Map** (middle)
   - Shipment locations (blue icons)
   - Disruption zones (red circles)
   - Fleet assets (truck icons)

3. **Action Center** (below map)
   - AI-recommended reroutes
   - Fleet redeployment suggestions
   - One-click action buttons

### Tabs to Explore

| Tab | What It Shows |
|---|---|
| **Dashboard** | KPIs, map, action center |
| **Shipments** | Searchable list of all shipments with status, risk, ETA |
| **Simulation** | "What-If" scenario builder (simulate new disruptions) |
| **Cold Chain** | Temperature monitoring, spoilage countdown, excursions |
| **Fleet** | Fleet overview, utilization, assignment status |
| **Analytics** | Reports, KPI trends, export options |

### Use the AI Copilot

- Click the **AI Copilot** button (bottom-right, speech bubble icon)
- Ask questions like:
  - "Which shipments are at highest risk?"
  - "What's the impact if the Port of Shanghai closes?"
  - "Can we redeploy idle fleet to the at-risk shipments?"
  - "Explain the temperature issue in Shipment XYZ."

---

## Step 6: Build for Production

When ready to deploy:

```bash
cd src
npm run build
```

**Output:**
- Built files are in `src/dist/`
- Ready to deploy to:
  - AWS S3 + CloudFront
  - Netlify
  - Vercel
  - Any static host (Apache, Nginx, etc.)

### Deploy to Netlify (Quick Example)

```bash
# Install netlify-cli globally (once)
npm install -g netlify-cli

# Deploy
cd src
netlify deploy --prod --dir dist/
```

---

## Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 is already in use

**Solution:**
```bash
# Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- --port 3001
```

### Issue: `Cannot find module` errors

**Solution:**
```bash
# Ensure you're in the src/ directory
cd src

# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

### Issue: Blank page / no content loads

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab (look for failed requests)
4. Clear browser cache (Ctrl+Shift+Delete)
5. Hard refresh (Ctrl+Shift+R)

### Issue: AI Copilot shows "Service unavailable"

**Reason:** IBM watsonx.ai is not configured or the server is not running.

**Solution:**
- The app works fine in demo mode without watsonx
- To enable watsonx, ensure `.env` credentials are correct
- Check that the Express server (port 3001) is running (if using watsonx)

---

## File Structure Quick Reference

```
bob-ai-hackathon-TechTonic/
├── src/                    # ← You should be here
│   ├── src/
│   │   ├── frontend/       # React components
│   │   ├── utils/          # Business logic (risk, routes, cold chain)
│   │   ├── data/           # Mock datasets
│   │   ├── shared/         # Global state (LogisticsContext)
│   │   └── api/            # API client
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── index.html
├── docs/                   # Documentation
├── demo/                   # Screenshots & links
└── presentation/           # Slide deck
```

---

## Development Workflow

### 1. Start the Dev Server

```bash
cd src
npm run dev
```

### 2. Edit Files

Open any file in `src/src/frontend/` or `src/src/utils/` and save.  
The browser will **hot-reload** automatically (no manual refresh needed).

### 3. Check Console

Open browser DevTools (F12 → Console) to see errors and logs.

### 4. Lint & Format (Optional)

```bash
npm run lint    # Check code for issues
```

---

## Key Directories to Know

| Path | Purpose |
|---|---|
| `src/src/frontend/` | React components (UI) |
| `src/src/utils/` | Business logic (risk calc, routes, cold chain) |
| `src/src/data/` | Mock shipments, disruptions, fleet, carriers |
| `src/src/shared/` | Global state context |
| `src/src/backend/` | Express.js server (watsonx proxy) |
| `src/src/api/` | API client functions |
| `src/src/models/` | Type definitions |

---

## Common Commands

| Command | What It Does |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Build for production (creates dist/) |
| `npm run lint` | Check code for issues |
| `npm run preview` | Preview production build locally |

---

## Getting Help

1. **Check Documentation**: Read [docs/architecture.md](../docs/architecture.md) and [docs/solution-overview.md](../docs/solution-overview.md)
2. **Review Code**: Start with `src/src/frontend/App.jsx` to understand the app structure
3. **Inspect Mock Data**: Look at `src/src/data/mockShipments.js` to see the data model
4. **Browser Console**: Press F12 in your browser to see errors and logs

---

## Next Steps

1. ✅ App is running at http://localhost:3000
2. 🔍 Explore the Dashboard tab
3. 💬 Try the AI Copilot (bottom-right)
4. 📊 Check the Cold Chain and Simulation tabs
5. 🔧 Review the code in `src/src/` to understand the architecture

---

## Support

- **Repository**: https://github.com/kunjhirani/bob-ai-hackathon-TechTonic
- **Team Lead**: Kunj Hirani (kunjhirani6183@gmail.com)
- **Issues**: Open an issue on GitHub for bugs or questions

---

**Happy coding! 🚀**
