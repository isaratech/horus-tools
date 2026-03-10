<div align="center">

# 🔥 HORUS Tools

**Open source operational tools for firefighters — by [HORUS](https://www.gohorus.fr/)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-18.2-dd0031.svg?logo=angular)](https://angular.dev/)
[![Deploy](https://github.com/isaratech/horus-tools/actions/workflows/deploy.yml/badge.svg)](https://github.com/isaratech/horus-tools/actions)
[![GitHub Issues](https://img.shields.io/github/issues/isaratech/horus-tools)](https://github.com/isaratech/horus-tools/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

🇫🇷 [Version française](README.fr.md) · [**Live Demo →**](https://isaratech.github.io/horus-tools/)

</div>

---

[HORUS](https://www.gohorus.fr/) graciously open sources a selection of tools from its full operational platform, designed for **SDIS** (French Departmental Fire and Rescue Services) and all firefighters.

These calculation and decision-support tools, used daily in the field, are available here as a lightweight, mobile-first web application built with Angular and Tailwind CSS.

> 💡 Want to discover the full HORUS platform? Visit **[www.gohorus.fr](https://www.gohorus.fr/)**.

## Available Tools

### Person Rescue (SUAP)

| Tool | Description |
|---|---|
| **Glasgow Score** | Consciousness level assessment (GCS scale) |
| **Malinas Score** | Imminent delivery risk assessment |
| **APGAR Score** | Neonatal assessment at 1, 5 and 10 minutes |
| **Wallace Rule** | Burned body surface area (interactive body diagram) |
| **Oxygen Therapy** | O₂ cylinder autonomy calculation |
| **Pediatric Assistant** | Pediatric vital signs, weight estimation, intubation sizing |
| **NOVI Triage** | START/JumpSTART mass casualty triage with SINUS tracking |

### Fire

| Tool | Description |
|---|---|
| **SCBA Calculator** | Autonomy and exit time under SCBA |
| **SCBA Controller** | Multi-team SCBA pressure monitoring with timers |
| **Foam** | Foam concentrate requirements and foam autonomy |
| **VPP Calculator** | Positive pressure ventilation dimensioning |
| **Tunnel Aeraulics** | Underground ventilation and long-distance relay |

### Hydraulics

| Tool | Description |
|---|---|
| **Relay** | Number of engines required for a relay |
| **Pressure Losses** | Hydraulic pressure loss calculation |
| **Volume Exhaustion** | Water supply point exhaustion time |

### Wildfire (FDF)

| Tool | Description |
|---|---|
| **FDF Propagation** | Fire front kinematic simulator (wind, slope, fuel) |
| **Aerial Support** | ABE transit time and synchronization calculator |
| **Slope** | Slope calculation and fire propagation |

### Chemical Risks (RCH)

| Tool | Description |
|---|---|
| **RCH Zoning** | Reflex safety perimeter assistant |
| **Explosion Risk** | LEL/UEL gauge and BLEVE isolation distances |
| **Gas Converter** | ppm / % conversion |
| **PGR/PGC Decision** | Gas procedure decision support (12-step questionnaire) |

### Operational Command (GOC)

| Tool | Description |
|---|---|
| **Operational Message** | COS report generator (METHANE structure) |
| **DZ Helicopter** | Helicopter landing zone safety checklist |

### Road Rescue & Specialized

| Tool | Description |
|---|---|
| **Block & Tackle** | Pulling force calculation for a block and tackle system |
| **Fall Factor** | Fall severity assessment in rope rescue |
| **Shoring** | Allowable load for shoring / cribbing |

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| Angular | 18.2 | Standalone component architecture |
| Tailwind CSS | 3.4 | Utility-first CSS framework |
| Lucide Icons | 0.577 | SVG icon library |
| TypeScript | 5.5 | Static typing |

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/isaratech/horus-tools.git
cd horus-tools
npm install
```

### Development

```bash
npm start
```

The application is available at `http://localhost:4200/` and automatically reloads on every change.

### Production Build

```bash
npm run build
```

Build output is located in `dist/horus-tools/browser/`.

## Deployment

### GitHub Pages (automated)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

1. Push your code to GitHub
2. Go to **Settings > Pages > Source** and select **GitHub Actions**
3. The site will be available at `https://isaratech.github.io/horus-tools/`

### Manual Deployment

```bash
npm run build:ghpages
```

This command generates the build with the correct `base href` for GitHub Pages.

## Project Structure

```
src/
  app/
    home/                    # Home page with tools grid
    tools/                   # 27 tool components
      aerial-support/
      apgar-score/
      ari-calculator/
      ari-controller/
      dz-helicopter/
      explosion-risk/
      fall-factor/
      fdf-propagation/
      foam/
      gas-converter/
      glasgow-score/
      malinas-score/
      mouflage-calculator/
      novi-triage/
      operational-message/
      oxygen-therapy/
      pediatric-assistant/
      pgr-decision/
      rch-zoning/
      relay-calculator/
      shoring-calculator/
      slope-calculator/
      tunnel-aeraulics/
      volume-exhaustion/
      vpp-calculator/
      wallace-rule/
      water-losses/
    app.component.ts         # Root layout with header
    app.config.ts            # App configuration & icons
    app.routes.ts            # Lazy-loaded routes
  styles.scss                # Global styles & CSS variables
  index.html                 # Entry point
```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

You can also help by:
- 🐛 [Reporting a bug](https://github.com/isaratech/horus-tools/issues/new?template=bug_report.yml)
- 💡 [Requesting a feature](https://github.com/isaratech/horus-tools/issues/new?template=feature_request.yml)
- 📖 Improving documentation

## License

This project is licensed under the **MIT** License. See the [LICENSE](LICENSE) file for details.

> **Trademark Notice:** The name "HORUS" and all associated logos in the `public/assets/` directory are trademarks of Isara Technologies SAS and are **not** covered by the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

*Developed by [Isara Technologies SAS](https://isaratech.com/) — Discover the full [HORUS](https://www.gohorus.fr/) platform for fire & rescue services.*

</div>
