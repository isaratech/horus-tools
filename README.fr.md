# HORUS Tools

**Outils opérationnels open source pour les sapeurs-pompiers — par [HORUS](https://www.gohorus.fr/)**

🇬🇧 [English version](README.md)

---

[HORUS](https://www.gohorus.fr/) met gracieusement en open source une sélection d'outils issus de sa plateforme opérationnelle complète, à destination des **SDIS** (Services Départementaux d'Incendie et de Secours) et de l'ensemble des sapeurs-pompiers.

Ces outils de calcul et d'aide à la décision, utilisés quotidiennement sur le terrain, sont disponibles ici sous forme d'une application web légère, mobile-first, construite avec Angular et Tailwind CSS.

> 💡 Vous souhaitez découvrir la plateforme complète HORUS ? Rendez-vous sur **[www.gohorus.fr](https://www.gohorus.fr/)**.

## Outils disponibles

### Secours à personne (SAP)

| Outil | Description |
|---|---|
| **Score de Glasgow** | Évaluation de l'état de conscience (échelle GCS) |
| **Score de Malinas** | Évaluation du risque d'accouchement imminent |
| **Règle de Wallace** | Surface corporelle brûlée (schéma corporel interactif) |
| **Oxygénothérapie** | Calcul d'autonomie de bouteille O₂ |

### Incendie

| Outil | Description |
|---|---|
| **Calculateur ARI** | Autonomie et heure de sortie sous ARI |
| **Contrôleur ARI** | Suivi des pressions ARI multi-binômes avec chronomètres |
| **Lance rideau** | Caractéristiques des lances rideau d'eau (45 mm / 70 mm) |
| **Mousse** | Besoins en émulseur et autonomie en mousse |

### Hydraulique

| Outil | Description |
|---|---|
| **Relais** | Nombre d'engins nécessaires pour un relais |
| **Pertes de charge** | Calcul des pertes de charge hydrauliques |
| **Épuisement de volume** | Temps d'épuisement d'un point d'eau |

### Secours routier & spécialisé

| Outil | Description |
|---|---|
| **Convertisseur gaz** | Conversion ppm / % |
| **Mouflage** | Calcul de la force de traction d'un système de mouflage |
| **Facteur de chute** | Évaluation de la gravité d'une chute en corde |
| **Pente** | Calcul de pente et propagation de feu |
| **Étaiement** | Charge admissible pour un étaiement / cribbage |
| **Décision PGR/PGC** | Aide à la décision procédure gaz (questionnaire en 12 étapes) |

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
    tools/                   # 17 composants outils
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
    app.component.ts         # Layout racine avec header
    app.config.ts            # Configuration de l'app & icônes
    app.routes.ts            # Routes en lazy-loading
  styles.scss                # Styles globaux & variables CSS
  index.html                 # Point d'entrée
```

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

*Développé par [Isara Technologies SAS](https://isaratech.com/) — Découvrez la plateforme complète [HORUS](https://www.gohorus.fr/) pour les SDIS.*
