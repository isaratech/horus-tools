import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface ToolCategory {
  label: string;
  colorClass: string;
  iconBgClass: string;
  tools: ToolItem[];
}

interface ToolItem {
  name: string;
  route: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-[#0d232e] to-[#1a3a4a] text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 -translate-y-1/4 translate-x-1/4">
          <img src="assets/logo-horus-invert.png" alt="" class="w-full h-full opacity-20">
        </div>
      </div>
      <div class="container relative py-8 md:py-10 text-center">
        <img src="assets/logo-horus-invert.png" alt="HORUS" class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 object-contain">
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight mb-1">HORUS Tools</h1>
        <p class="text-sm text-white/60 font-medium">Outils opérationnels pour sapeurs-pompiers</p>
      </div>
    </div>

    <!-- Categories -->
    <div class="container py-4 md:py-6 space-y-6 md:space-y-8">
      <section *ngFor="let category of categories">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-1 h-5 rounded-full" [ngClass]="category.iconBgClass"></div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{{ category.label }}</h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          <button
            *ngFor="let tool of category.tools"
            (click)="navigate(tool.route)"
            class="group flex flex-col items-center text-center gap-1.5 sm:gap-2 rounded-lg border bg-card p-3 sm:p-4 transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div class="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-colors"
                 [ngClass]="category.iconBgClass + ' ' + category.colorClass">
              <lucide-icon [name]="tool.icon" [size]="18" class="sm:hidden"></lucide-icon>
              <lucide-icon [name]="tool.icon" [size]="20" class="hidden sm:block"></lucide-icon>
            </div>
            <span class="text-xs sm:text-sm font-medium leading-tight text-card-foreground">{{ tool.name }}</span>
            <span class="text-[10px] sm:text-[11px] leading-snug text-muted-foreground hidden sm:block">{{ tool.description }}</span>
          </button>
        </div>
      </section>

      <footer class="text-center py-4 md:py-6 border-t">
        <div class="flex items-center justify-center gap-2 mb-1">
          <img src="assets/logo-horus-icon.png" alt="HORUS" class="w-5 h-5 opacity-60">
          <span class="text-xs font-semibold text-muted-foreground">HORUS Tools</span>
        </div>
        <p class="text-[10px] text-muted-foreground/60">Isara Technologies &mdash; gohorus.fr</p>
      </footer>
    </div>
  `,
})
export class HomeComponent {
  categories: ToolCategory[] = [
    {
      label: 'Secours à Personne',
      colorClass: 'text-emerald-600',
      iconBgClass: 'bg-emerald-500/10',
      tools: [
        { name: 'Score de Glasgow', route: '/glasgow', icon: 'brain', description: 'Évaluation de la conscience' },
        { name: 'Score de Malinas', route: '/malinas', icon: 'baby', description: 'Risque accouchement inopiné' },
        { name: 'Règle de Wallace', route: '/wallace', icon: 'person-standing', description: 'Surface brûlée' },
        { name: 'Autonomie O₂', route: '/oxygen', icon: 'activity', description: 'Calcul autonomie oxygène' },
      ]
    },
    {
      label: 'Incendie',
      colorClass: 'text-red-600',
      iconBgClass: 'bg-red-500/10',
      tools: [
        { name: 'Calculatrice ARI', route: '/ari-calculator', icon: 'calculator', description: 'Autonomie & heure de sortie' },
        { name: 'Contrôleur ARI', route: '/ari-controller', icon: 'timer', description: 'Suivi équipes sous ARI' },
        { name: 'Mousse', route: '/foam', icon: 'droplets', description: 'Besoins en émulseur' },
      ]
    },
    {
      label: 'Hydraulique',
      colorClass: 'text-blue-600',
      iconBgClass: 'bg-blue-500/10',
      tools: [
        { name: 'Mise en Relais', route: '/relay', icon: 'gauge', description: 'Engins pompes nécessaires' },
        { name: 'Pertes de Charge', route: '/water-losses', icon: 'waves', description: 'Pertes de charge hydrauliques' },
        { name: 'Épuisement Volume', route: '/volume-exhaustion', icon: 'droplets', description: "Temps d'épuisement" },
      ]
    },
    {
      label: 'Secours Routier / Spécifique',
      colorClass: 'text-orange-600',
      iconBgClass: 'bg-orange-500/10',
      tools: [
        { name: 'Convertisseur Gaz', route: '/gas-converter', icon: 'wind', description: 'Conversion ppm / %' },
        { name: 'Calcul Mouflage', route: '/mouflage', icon: 'link', description: 'Force de traction' },
        { name: 'Facteur de Chute', route: '/fall-factor', icon: 'arrow-down-to-line', description: 'Gravité chute corde' },
        { name: 'Calculateur Pente', route: '/slope', icon: 'mountain', description: 'Pente et propagation feu' },
        { name: 'Calage / Étaiement', route: '/shoring', icon: 'boxes', description: 'Charge admissible' },
        { name: 'Décision PGR/PGC', route: '/pgr', icon: 'fuel', description: 'Procédure gaz' },
      ]
    },
  ];

  constructor(private router: Router) {}

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
