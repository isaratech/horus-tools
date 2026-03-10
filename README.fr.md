<div align="center">

# 🔥 HORUS Tools

**Outils opérationnels open source pour les sapeurs-pompiers — par [HORUS](https://www.gohorus.fr/)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-18.2-dd0031.svg?logo=angular)](https://angular.dev/)
[![Deploy](https://github.com/isaratech/horus-tools/actions/workflows/deploy.yml/badge.svg)](https://github.com/isaratech/horus-tools/actions)
[![GitHub Issues](https://img.shields.io/github/issues/isaratech/horus-tools)](https://github.com/isaratech/horus-tools/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

🇬🇧 [English version](README.md) · [**Démo en ligne →**](https://isaratech.github.io/horus-tools/)

</div>

---

[HORUS](https://www.gohorus.fr/) met gracieusement en open source une sélection d'outils issus de sa plateforme opérationnelle complète, à destination des **SDIS** (Services Départementaux d'Incendie et de Secours) et de l'ensemble des sapeurs-pompiers.

Ces outils de calcul et d'aide à la décision, utilisés quotidiennement sur le terrain, sont disponibles ici sous forme d'une application web légère, mobile-first, construite avec Angular et Tailwind CSS.

> 💡 Vous souhaitez découvrir la plateforme complète HORUS ? Rendez-vous sur **[www.gohorus.fr](https://www.gohorus.fr/)**.

## Outils disponibles

### Secours à personne (SUAP)

| Outil | Description |
|---|---|
| **Score de Glasgow** | Évaluation de l'état de conscience (échelle GCS) |
| **Score de Malinas** | Évaluation du risque d'accouchement imminent |
| **Score APGAR** | Évaluation néonatale à 1, 5 et 10 minutes |
| **Règle de Wallace** | Surface corporelle brûlée (schéma corporel interactif) |
| **Oxygénothérapie** | Calcul d'autonomie de bouteille O₂ |
| **Assistant Pédiatrique** | Constantes vitales, estimation poids, matériel intubation |
| **Triage NOVI** | Triage de masse START/JumpSTART avec suivi SINUS |

### Incendie

| Outil | Description |
|---|---|
| **Calculateur ARI** | Autonomie et heure de sortie sous ARI |
| **Contrôleur ARI** | Suivi des pressions ARI multi-binômes avec chronomètres |
| **Mousse** | Besoins en émulseur et autonomie en mousse |
| **Calculateur VPP** | Dimensionnement ventilation par pression positive |
| **Aéraulique Tunnel** | Ventilation et relais longue distance en souterrain |

### Hydraulique

| Outil | Description |
|---|---|
| **Relais** | Nombre d'engins nécessaires pour un relais |
| **Pertes de charge** | Calcul des pertes de charge hydrauliques |
| **Épuisement de volume** | Temps d'épuisement d'un point d'eau |

### Feux de Forêt (FDF)

| Outil | Description |
|---|---|
| **Propagation FDF** | Simulateur cinématique du front de flamme |
| **Appui Aérien** | Calcul de transit et synchronisation ABE |
| **Pente** | Calcul de pente et propagation de feu |

### Risques Chimiques (RCH)

| Outil | Description |
|---|---|
| **Zonage RCH** | Assistant de périmètre de sécurité réflexe |
| **Risque Explosion** | Jauge LIE/LSE et distances d'isolement BLEVE |
| **Convertisseur gaz** | Conversion ppm / % |
| **Décision PGR/PGC** | Aide à la décision procédure gaz (questionnaire en 12 étapes) |

### Gestion Opérationnelle (GOC)

| Outil | Description |
|---|---|
| **Message Opérationnel** | Générateur de bilan COS (structure METHANE) |
| **Sécurité DZ** | Checklist zone de poser hélicoptère |

### Secours routier & spécialisé

| Outil | Description |
|---|---|
| **Mouflage** | Calcul de la force de traction d'un système de mouflage |
| **Facteur de chute** | Évaluation de la gravité d'une chute en corde |
| **Étaiement** | Charge admissible pour un étaiement / cribbage |

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Angular | 18.2 | Architecture en composants standalone |
| Tailwind CSS | 3.4 | Framework CSS utility-first |
| Lucide Icons | 0.577 | Bibliothèque d'icônes SVG |
| TypeScript | 5.5 | Typage statique |

## Démarrage rapide

### Prérequis

- Node.js 18+ et npm

### Installation

```bash
git clone https://github.com/isaratech/horus-tools.git
cd horus-tools
npm install
```

### Développement

```bash
npm start
```

L'application est accessible sur `http://localhost:4200/` et se recharge automatiquement à chaque modification.

### Build de production

```bash
npm run build
```

Le résultat du build se trouve dans `dist/horus-tools/browser/`.

## Déploiement

### GitHub Pages (automatisé)

Le projet inclut un workflow GitHub Actions qui déploie automatiquement sur GitHub Pages à chaque push sur `main`.

1. Poussez votre code sur GitHub
2. Allez dans **Settings > Pages > Source** et sélectionnez **GitHub Actions**
3. Le site sera accessible à `https://isaratech.github.io/horus-tools/`

### Déploiement manuel

```bash
npm run build:ghpages
```

Cette commande génère le build avec le bon `base href` pour GitHub Pages.

## Structure du projet

```
src/
  app/
    home/                    # Page d'accueil avec grille d'outils
    tools/                   # 27 composants outils
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
    app.component.ts         # Layout racine avec header
    app.config.ts            # Configuration de l'app & icônes
    app.routes.ts            # Routes en lazy-loading
  styles.scss                # Styles globaux & variables CSS
  index.html                 # Point d'entrée
```

## Contribuer

Les contributions sont les bienvenues ! Merci de lire le [Guide de contribution](CONTRIBUTING.md) avant de soumettre une Pull Request.

Vous pouvez aussi aider en :
- 🐛 [Signalant un bug](https://github.com/isaratech/horus-tools/issues/new?template=bug_report.yml)
- 💡 [Proposant une fonctionnalité](https://github.com/isaratech/horus-tools/issues/new?template=feature_request.yml)
- 📖 Améliorant la documentation

## Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

> **Note sur les marques :** Le nom « HORUS » et tous les logos associés dans le répertoire `public/assets/` sont des marques d'Isara Technologies SAS et ne sont **pas** couverts par la licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

*Développé par [Isara Technologies SAS](https://isaratech.com/) — Découvrez la plateforme complète [HORUS](https://www.gohorus.fr/) pour les SDIS.*

</div>
