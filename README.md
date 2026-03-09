# HORUS Tools

**Open source operational tools for firefighters — by [HORUS](https://www.gohorus.fr/)**

🇫🇷 [Version française](README.fr.md)

---

[HORUS](https://www.gohorus.fr/) graciously open sources a selection of tools from its full operational platform, designed for **SDIS** (French Departmental Fire and Rescue Services) and all firefighters.

These calculation and decision-support tools, used daily in the field, are available here as a lightweight, mobile-first web application built with Angular and Tailwind CSS.

> 💡 Want to discover the full HORUS platform? Visit **[www.gohorus.fr](https://www.gohorus.fr/)**.

## Available Tools

### Person Rescue (SAP)

| Tool | Description |
|---|---|
| **Glasgow Score** | Consciousness level assessment (GCS scale) |
| **Malinas Score** | Imminent delivery risk assessment |
| **Wallace Rule** | Burned body surface area (interactive body diagram) |
| **Oxygen Therapy** | O₂ cylinder autonomy calculation |

### Fire

| Tool | Description |
|---|---|
| **SCBA Calculator** | Autonomy and exit time under SCBA |
| **SCBA Controller** | Multi-team SCBA pressure monitoring with timers |
| **Water Curtain Nozzle** | Water curtain nozzle specifications (45 mm / 70 mm) |
| **Foam** | Foam concentrate requirements and foam autonomy |

### Hydraulics

| Tool | Description |
|---|---|
| **Relay** | Number of engines required for a relay |
| **Pressure Losses** | Hydraulic pressure loss calculation |
| **Volume Exhaustion** | Water supply point exhaustion time |

### Road Rescue & Specialized

| Tool | Description |
|---|---|
| **Gas Converter** | ppm / % conversion |
| **Block & Tackle** | Pulling force calculation for a block and tackle system |
| **Fall Factor** | Fall severity assessment in rope rescue |
| **Slope** | Slope calculation and fire propagation |
| **Shoring** | Allowable load for shoring / cribbing |
| **PGR/PGC Decision** | Gas procedure decision support (12-step questionnaire) |

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
    tools/                   # 17 tool components
      ari-calculator/
      ari-controller/
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

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request.

## License

This project is licensed under the **MIT** License. See the [LICENSE](LICENSE) file for details.

---

*Developed by [Isara Technologies SAS](https://isaratech.com/) — Discover the full [HORUS](https://www.gohorus.fr/) platform for fire & rescue services.*
