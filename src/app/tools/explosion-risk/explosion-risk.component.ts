import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface GasData {
  name: string;
  lie: number;
  lse: number;
}

@Component({
  selector: 'app-explosion-risk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Explosivity -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Risque d'Explosion — LIE/LSE</h3>
          <p class="text-sm text-muted-foreground">Évaluation cinétique du risque explosif et BLEVE</p>
        </div>
        <div class="p-6 pt-0 space-y-5">
          <!-- Gas selection as grid -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Gaz détecté</label>
            <div class="grid grid-cols-2 gap-2">
              <button *ngFor="let g of gases; let i = index" (click)="selectedGasIndex = i"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-left"
                [ngClass]="selectedGasIndex === i ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                {{ g.name }}<br>
                <span class="text-[10px] opacity-70">LIE {{ g.lie }}% — LSE {{ g.lse }}%</span>
              </button>
            </div>
          </div>

          <!-- Concentration slider -->
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Concentration mesurée</label>
              <span class="text-lg font-bold" [ngClass]="liePercent >= 20 ? 'text-red-600' : liePercent >= 10 ? 'text-amber-600' : 'text-primary'">
                {{ concentrationPercent.toFixed(2) }} % <span class="text-xs font-normal text-muted-foreground">({{ concentrationPpm.toFixed(0) }} ppm)</span>
              </span>
            </div>
            <input type="range" [(ngModel)]="concentrationPercent" min="0" [max]="sliderMax" [step]="sliderStep"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0 %</span>
              <span>{{ sliderMax }} %</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gauge -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Jauge de dangerosité — {{ selectedGas.name }}</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">% de la LIE</div>
              <div class="text-xl font-bold" [ngClass]="liePercent > 20 ? 'text-red-600' : liePercent > 10 ? 'text-amber-600' : 'text-emerald-600'">
                {{ liePercent.toFixed(1) }} %
              </div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Concentration</div>
              <div class="text-xl font-bold text-primary">{{ concentrationPercent.toFixed(2) }} %</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Zone explosive</div>
              <div class="text-xl font-bold" [ngClass]="isInExplosiveRange ? 'text-red-600' : 'text-emerald-600'">
                {{ isInExplosiveRange ? 'OUI' : 'NON' }}
              </div>
            </div>
          </div>

          <!-- Visual gauge bar -->
          <div class="relative h-8 rounded-full overflow-hidden bg-gray-200">
            <div class="absolute h-full bg-emerald-400 left-0" [style.width.%]="gaugeGreenWidth"></div>
            <div class="absolute h-full bg-amber-400" [style.left.%]="gaugeGreenWidth" [style.width.%]="gaugeAmberWidth"></div>
            <div class="absolute h-full bg-red-500" [style.left.%]="gaugeRedLeft" [style.width.%]="gaugeRedWidth"></div>
            <div class="absolute h-full w-1 bg-black z-10 transition-all" [style.left.%]="gaugePointer"></div>
          </div>
          <div class="flex justify-between text-[10px] text-muted-foreground">
            <span>0%</span>
            <span>10% LIE</span>
            <span>LIE ({{ selectedGas.lie }}%)</span>
            <span>LSE ({{ selectedGas.lse }}%)</span>
          </div>

          <div *ngIf="liePercent >= 10 && liePercent < 20" class="rounded-lg border border-amber-300 bg-amber-50 p-3">
            <span class="text-amber-600 font-bold text-sm">⚠️ Seuil d'alerte (10-20% LIE)</span>
            <p class="text-xs text-amber-800 mt-1">Augmentation des mesures de vigilance. Préparer un retrait.</p>
          </div>
          <div *ngIf="liePercent >= 20" class="rounded-lg border border-red-300 bg-red-50 p-3">
            <span class="text-red-600 font-bold text-sm">🚨 RETRAIT IMMÉDIAT (&gt; 20% LIE)</span>
            <p class="text-xs text-red-800 mt-1">Concentration dangereuse. Évacuer immédiatement tous les personnels de la zone.</p>
          </div>
          <div *ngIf="isInExplosiveRange" class="rounded-lg border border-red-300 bg-red-50 p-3">
            <span class="text-red-600 font-bold text-sm">💥 DANS LA PLAGE EXPLOSIVE</span>
            <p class="text-xs text-red-800 mt-1">Concentration entre LIE et LSE. Atmosphère explosive. Toute source d'ignition peut provoquer une déflagration.</p>
          </div>
        </div>
      </div>

      <!-- BLEVE -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Risque BLEVE</h3>
          <p class="text-sm text-muted-foreground">Distances d'isolement et d'évacuation</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type de contenant</label>
            <div class="grid grid-cols-3 gap-2">
              <button (click)="containerType = 'small'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="containerType === 'small' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Petit réservoir<br><span class="text-[10px] opacity-70">Bouteilles</span>
              </button>
              <button (click)="containerType = 'truck'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="containerType === 'truck' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Camion-citerne<br><span class="text-[10px] opacity-70">Wagon</span>
              </button>
              <button (click)="containerType = 'sphere'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="containerType === 'sphere' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Sphère<br><span class="text-[10px] opacity-70">Stockage massif</span>
              </button>
            </div>
          </div>

          <div class="rounded-lg p-4 text-center"
            [ngClass]="{
              'border border-amber-200 bg-amber-50': containerType === 'small',
              'border border-red-200 bg-red-50': containerType === 'truck',
              'border-2 border-red-400 bg-red-100': containerType === 'sphere'
            }">
            <div class="text-sm font-medium text-muted-foreground">Distance d'isolement / évacuation</div>
            <div class="text-3xl font-bold" [ngClass]="{
              'text-amber-700': containerType === 'small',
              'text-red-700': containerType === 'truck' || containerType === 'sphere'
            }">{{ bleveDistance }}</div>
            <div class="text-xs mt-1 text-muted-foreground">{{ bleveRisk }}</div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-muted">
                <tr>
                  <th class="px-3 py-2 text-left font-medium">Contenant</th>
                  <th class="px-3 py-2 text-left font-medium">Risque</th>
                  <th class="px-3 py-2 text-left font-medium">Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b"><td class="px-3 py-2">Petit réservoir</td><td class="px-3 py-2">Rupture, petite boule de feu</td><td class="px-3 py-2 font-bold">500 m</td></tr>
                <tr class="border-b"><td class="px-3 py-2">Camion / Wagon</td><td class="px-3 py-2">BLEVE majeur, fragments</td><td class="px-3 py-2 font-bold text-red-700">800 m</td></tr>
                <tr class="border-b"><td class="px-3 py-2">Sphère / Stockage</td><td class="px-3 py-2">BLEVE massif, effet domino</td><td class="px-3 py-2 font-bold text-red-700">1 600 m+</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExplosionRiskComponent {
  gases: GasData[] = [
    { name: 'Méthane (CH₄)', lie: 5, lse: 15 },
    { name: 'Propane (C₃H₈)', lie: 2.1, lse: 9.5 },
    { name: 'Butane (C₄H₁₀)', lie: 1.8, lse: 8.4 },
    { name: 'Hydrogène (H₂)', lie: 4, lse: 75 },
    { name: 'Acétylène (C₂H₂)', lie: 2.5, lse: 81 },
    { name: 'CO', lie: 12.5, lse: 74 },
    { name: 'Éthanol (C₂H₅OH)', lie: 3.3, lse: 19 },
    { name: 'Ammoniac (NH₃)', lie: 15, lse: 28 },
  ];

  selectedGasIndex: number = 0;
  concentrationPercent: number = 0;
  containerType: 'small' | 'truck' | 'sphere' = 'small';

  get selectedGas(): GasData { return this.gases[this.selectedGasIndex]; }

  get concentrationPpm(): number { return this.concentrationPercent * 10000; }

  get sliderMax(): number { return Math.max(this.selectedGas.lse * 1.2, 20); }
  get sliderStep(): number { return this.sliderMax > 50 ? 0.5 : 0.05; }

  get liePercent(): number {
    if (!this.selectedGas || this.selectedGas.lie === 0) return 0;
    return (this.concentrationPercent / this.selectedGas.lie) * 100;
  }

  get isInExplosiveRange(): boolean {
    return this.concentrationPercent >= this.selectedGas.lie && this.concentrationPercent <= this.selectedGas.lse;
  }

  // Gauge bar proportions (total = LSE*1.2 range mapped to 100%)
  get gaugeScale(): number { return this.selectedGas.lse * 1.2; }
  get gaugeGreenWidth(): number { return (this.selectedGas.lie * 0.1 / this.gaugeScale) * 100; }
  get gaugeAmberWidth(): number { return ((this.selectedGas.lie - this.selectedGas.lie * 0.1) / this.gaugeScale) * 100; }
  get gaugeRedLeft(): number { return (this.selectedGas.lie / this.gaugeScale) * 100; }
  get gaugeRedWidth(): number { return ((this.selectedGas.lse - this.selectedGas.lie) / this.gaugeScale) * 100; }
  get gaugePointer(): number { return Math.min((this.concentrationPercent / this.gaugeScale) * 100, 100); }

  get bleveDistance(): string {
    switch (this.containerType) {
      case 'small': return '500 m';
      case 'truck': return '800 m';
      case 'sphere': return '1 600 m+';
    }
  }

  get bleveRisk(): string {
    switch (this.containerType) {
      case 'small': return 'Zonage réflexe de base — Rupture ou petite boule de feu';
      case 'truck': return 'BLEVE majeur — Projection de fragments en toutes directions';
      case 'sphere': return 'BLEVE massif — Effet domino, onde de choc, missiles balistiques';
    }
  }
}
