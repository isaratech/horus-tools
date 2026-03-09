import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'glasgow',
    loadComponent: () => import('./tools/glasgow-score/glasgow-score.component').then(m => m.GlasgowScoreComponent),
    data: { title: 'Score de Glasgow' }
  },
  {
    path: 'malinas',
    loadComponent: () => import('./tools/malinas-score/malinas-score.component').then(m => m.MalinasScoreComponent),
    data: { title: 'Score de Malinas' }
  },
  {
    path: 'wallace',
    loadComponent: () => import('./tools/wallace-rule/wallace-rule.component').then(m => m.WallaceRuleComponent),
    data: { title: 'Règle de Wallace' }
  },
  {
    path: 'oxygen',
    loadComponent: () => import('./tools/oxygen-therapy/oxygen-therapy.component').then(m => m.OxygenTherapyComponent),
    data: { title: 'Autonomie Oxygénothérapie' }
  },
  {
    path: 'ari-calculator',
    loadComponent: () => import('./tools/ari-calculator/ari-calculator.component').then(m => m.AriCalculatorComponent),
    data: { title: 'Calculatrice ARI' }
  },
  {
    path: 'ari-controller',
    loadComponent: () => import('./tools/ari-controller/ari-controller.component').then(m => m.AriControllerComponent),
    data: { title: 'Contrôleur ARI' }
  },
  {
    path: 'screen-hose',
    loadComponent: () => import('./tools/screen-hose/screen-hose.component').then(m => m.ScreenHoseComponent),
    data: { title: 'Lance Écran' }
  },
  {
    path: 'foam',
    loadComponent: () => import('./tools/foam/foam.component').then(m => m.FoamComponent),
    data: { title: 'Calculatrice Mousse' }
  },
  {
    path: 'relay',
    loadComponent: () => import('./tools/relay-calculator/relay-calculator.component').then(m => m.RelayCalculatorComponent),
    data: { title: 'Mise en Relais' }
  },
  {
    path: 'water-losses',
    loadComponent: () => import('./tools/water-losses/water-losses.component').then(m => m.WaterLossesComponent),
    data: { title: 'Pertes de Charge' }
  },
  {
    path: 'volume-exhaustion',
    loadComponent: () => import('./tools/volume-exhaustion/volume-exhaustion.component').then(m => m.VolumeExhaustionComponent),
    data: { title: "Calculatrice d'Épuisement" }
  },
  {
    path: 'gas-converter',
    loadComponent: () => import('./tools/gas-converter/gas-converter.component').then(m => m.GasConverterComponent),
    data: { title: 'Convertisseur Gaz' }
  },
  {
    path: 'mouflage',
    loadComponent: () => import('./tools/mouflage-calculator/mouflage-calculator.component').then(m => m.MouflageCalculatorComponent),
    data: { title: 'Calcul de Mouflage' }
  },
  {
    path: 'fall-factor',
    loadComponent: () => import('./tools/fall-factor/fall-factor.component').then(m => m.FallFactorComponent),
    data: { title: 'Facteur de Chute' }
  },
  {
    path: 'slope',
    loadComponent: () => import('./tools/slope-calculator/slope-calculator.component').then(m => m.SlopeCalculatorComponent),
    data: { title: 'Calculateur de Pente' }
  },
  {
    path: 'shoring',
    loadComponent: () => import('./tools/shoring-calculator/shoring-calculator.component').then(m => m.ShoringCalculatorComponent),
    data: { title: 'Calcul de Calage' }
  },
  {
    path: 'pgr',
    loadComponent: () => import('./tools/pgr-decision/pgr-decision.component').then(m => m.PgrDecisionComponent),
    data: { title: 'Décision PGR/PGC' }
  },
  { path: '**', redirectTo: '' }
];
