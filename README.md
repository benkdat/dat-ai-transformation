# DAT AI Transformation Strategy

Interactive presentation deck for DAT Freight & Analytics AI Transformation initiative.

## Quick Start (Local)

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Deploy to Vercel

### Option A: GitHub → Vercel (recommended)

1. Create a new repo on GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/benkdat/dat-ai-transformation.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `dat-ai-transformation` repo
4. Framework preset will auto-detect as **Vite**
5. Click **Deploy** — done

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. It will detect Vite automatically.

## Navigation

- **Sidebar**: Click any slide title
- **Keyboard**: Arrow keys (← → ↑ ↓)
- **Bottom bar**: Previous / Next buttons + progress dots

## Built With

- React 18 + Vite
- Recharts (data visualizations)
- DAT Brand Design System (Inter, #0046DD palette)
