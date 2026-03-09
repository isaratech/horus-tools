# HORUS Tools

**Operational tools for French firefighters (Sapeurs-Pompiers)**

A lightweight, mobile-first web app built with Angular 18 and Tailwind CSS. HORUS Tools provides essential field calculators and decision-support tools used daily by fire departments.

## Features

### Emergency Medical Response
- **Glasgow Coma Scale** — Consciousness evaluation (GCS scoring)
- **Malinas Score** — Imminent delivery risk assessment
- **Wallace Rule** — Body surface area burned (interactive body diagram)
- **Oxygen Therapy** — O2 bottle autonomy calculator

### Fire Operations
- **ARI Calculator** — SCBA autonomy & exit time
- **ARI Controller** — Multi-team SCBA pressure tracking with timers
- **Screen Hose** — Water curtain lance specifications (45mm / 70mm)
- **Foam Calculator** — Foam concentrate requirements & emulsifier autonomy

### Hydraulics
- **Relay Calculator** — Number of pump engines required for relay
- **Water Losses** — Hydraulic pressure loss calculations
- **Volume Exhaustion** — Time to exhaust a water source

### Road Rescue & Specialized
- **Gas Converter** — ppm / % conversion
- **Mouflage Calculator** — Pulley system traction force
- **Fall Factor** — Rope fall severity evaluation
- **Exclusion Zone** — CBRN exclusion zone calculator
- **Slope Calculator** — Terrain slope & fire propagation
- **Shoring Calculator** — Admissible load for shoring/cribbing
- **PGR/PGC Decision** — Gas procedure decision support (12-question flow)

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 18.2 | Standalone component architecture |
| Tailwind CSS | 3.4 | Utility-first styling |
| Lucide Icons | 0.577 | SVG icon library |
| TypeScript | 5.5 | Type-safe development |

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/IsMusic/horus-tools.git
cd horus-tools
npm install
```

### Development

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app auto-reloads on file changes.

### Production Build

```bash
npm run build
```

Build output is in `dist/horus-tools/browser/`.

## Deployment

### GitHub Pages (Automated)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

1. Push your code to GitHub
2. Go to **Settings > Pages > Source** and select **GitHub Actions**
3. The site will be available at `https://ismusic.github.io/horus-tools/`

### Manual Deployment

```bash
npm run build:ghpages
```

This builds with the correct base href for GitHub Pages.

## Project Structure

```
src/
  app/
    home/                    # Home page with tool grid
    tools/                   # 18 tool components
      ari-calculator/
      ari-controller/
      exclusion-zone/
      fall-factor/
      foam/
      gas-converter/
      glasgow-score/
      malinas-score/
      mouflage-calculator/
      oxygen-therapy/
      pgr-decision/
      relay-calculator/
      screen-hose/
      shoring-calculator/
      slope-calculator/
      volume-exhaustion/
      wallace-rule/
      water-losses/
    app.component.ts         # Root layout with header
    app.config.ts            # App configuration & icons
    app.routes.ts            # Lazy-loaded routes
  styles.scss                # Global styles & CSS variables
  index.html                 # Entry point
```

## Design

- **HORUS brand colors**: Orange `#f4991a` primary, Navy `#0d232e` secondary
- **Mobile-first**: 2-column grid on phones, 4 columns on desktop
- **Component architecture**: Each tool is a standalone Angular component
- **Bundle size**: ~304 kB initial (gzipped ~86 kB)

## License

Proprietary - Isara Technologies. All rights reserved.

---

*Part of the [HORUS](https://www.gohorus.fr/) operational platform for fire departments.*
