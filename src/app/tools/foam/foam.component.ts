import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foam',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Rappels -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Rappels</h3>
        </div>
        <div class="p-6 pt-0 space-y-1 text-sm">
          <p>Eau + Additif = <strong>Eau dopée</strong></p>
          <p>Eau + Emulseur = <strong>Solution moussante</strong></p>
          <p>Eau + Emulseur + Air = <strong>Mousse</strong></p>
          <p>Taux d'application : non miscible <strong>10 L/min/m²</strong> | miscible <strong>16 L/min/m²</strong></p>
          <p>Taux de temporisation : 1/2 taux d'application en attente des renforts</p>
          <p>Volume émulseur / Volume solution moussante = <strong>Taux de concentration</strong></p>
          <p>Volume émulseur / Volume mousse = <strong>Rendement</strong></p>
          <p>Volume mousse / Volume solution moussante = <strong>Foisonnement</strong></p>
          <p class="text-xs text-muted-foreground italic">(&lt;20 : bas, 20 à 200 : moyen, &gt;200 : haut)</p>
        </div>
      </div>

      <!-- Calculatrice mousse -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calculatrice Mousse</h3>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <div>
            <label class="block text-sm text-muted-foreground mb-1">Surface en feu : <strong class="text-foreground">{{ area }} m²</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="area" min="0" max="10000" step="10" class="flex-1">
              <input type="number" [(ngModel)]="area" min="0" max="10000" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <div>
            <label class="block text-sm text-muted-foreground mb-1">Taux d'application : <strong class="text-foreground">{{ application }} L/min/m²</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="application" min="1" max="20" step="1" class="flex-1">
              <input type="number" [(ngModel)]="application" min="1" max="20" step="1"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <div>
            <label class="block text-sm text-muted-foreground mb-1">Taux de concentration : <strong class="text-foreground">{{ concentration }} %</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="concentration" min="1" max="20" step="1" class="flex-1">
              <input type="number" [(ngModel)]="concentration" min="1" max="20" step="1"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <div class="border-t my-4"></div>

          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Débit de solution moussante nécessaire</div>
            <div class="text-3xl font-bold">{{ area * application }} L/min</div>
          </div>
          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Quantité d'émulseur (10 min)</div>
            <div class="text-3xl font-bold">{{ area * application * (concentration / 10) | number:'1.0-0' }} L</div>
          </div>
        </div>
      </div>

      <!-- Autonomie emulseur -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Autonomie Émulseur</h3>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <div>
            <label class="block text-sm text-muted-foreground mb-1">Quantité d'émulseur dans l'engin : <strong class="text-foreground">{{ emul }} L</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="emul" min="0" max="2000" step="10" class="flex-1">
              <input type="number" [(ngModel)]="emul" min="0" max="2000" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <div>
            <label class="block text-sm text-muted-foreground mb-1">Débit à la lance : <strong class="text-foreground">{{ overflow }} L/min</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="overflow" min="0" max="2000" step="50" class="flex-1">
              <input type="number" [(ngModel)]="overflow" min="0" max="2000" step="50"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <div>
            <label class="block text-sm text-muted-foreground mb-1">
              Taux de concentration : <strong class="text-foreground">{{ concentration2 }} %</strong>
              <span class="text-xs text-muted-foreground ml-1">= {{ overflow * (concentration2 / 100) | number:'1.0-1' }} L/min d'émulseur</span>
            </label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="concentration2" min="1" max="20" step="1" class="flex-1">
              <input type="number" [(ngModel)]="concentration2" min="1" max="20" step="1"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <div class="border-t my-4"></div>

          <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Temps d'autonomie</div>
            <div class="text-3xl font-bold">{{ autonomy | number:'1.0-1' }} min</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FoamComponent {
  area = 200;
  application = 10;
  concentration = 3;
  emul = 200;
  overflow = 500;
  concentration2 = 3;

  get autonomy(): number {
    const emulFlow = this.overflow * (this.concentration2 / 100);
    if (emulFlow <= 0) return 0;
    return this.emul / emulFlow;
  }
}
