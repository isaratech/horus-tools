import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fdf-propagation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Simulateur Propagation FDF</h3>
          <p class="text-sm text-muted-foreground">Cinématique du front de flamme — Modélisation vectorielle</p>
        </div>
        <div class="p-6 pt-0 space-y-5">
          <!-- Wind speed slider -->
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Vitesse du vent</label>
              <span class="text-lg font-bold text-primary">{{ windSpeed }} km/h</span>
            </div>
            <input type="range" [(ngModel)]="windSpeed" min="0" max="150" step="5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0 km/h</span>
              <span>150 km/h</span>
            </div>
          </div>

          <!-- Slope slider -->
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Pente</label>
              <span class="text-lg font-bold" [ngClass]="slope > 0 ? 'text-red-600' : slope < 0 ? 'text-blue-600' : 'text-primary'">{{ slope }} %</span>
            </div>
            <input type="range" [(ngModel)]="slope" min="-50" max="100" step="5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>-50 % (descente)</span>
              <span>+100 % (montée)</span>
            </div>
          </div>

          <!-- Fuel type toggle -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type de combustible</label>
            <div class="grid grid-cols-3 gap-2">
              <button (click)="fuelType = 'fine'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="fuelType === 'fine' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Fin<br><span class="text-[10px] opacity-70">&lt; 6 mm</span>
              </button>
              <button (click)="fuelType = 'medium'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="fuelType === 'medium' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Moyen<br><span class="text-[10px] opacity-70">6–25 mm</span>
              </button>
              <button (click)="fuelType = 'heavy'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="fuelType === 'heavy' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Lourd<br><span class="text-[10px] opacity-70">&gt; 25 mm</span>
              </button>
            </div>
          </div>

          <!-- Fuel moisture toggle -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Humidité combustible</label>
            <div class="grid grid-cols-3 gap-2">
              <button (click)="fuelMoisture = 'dry'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="fuelMoisture === 'dry' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Sec<br><span class="text-[10px] opacity-70">&lt; 10%</span>
              </button>
              <button (click)="fuelMoisture = 'moderate'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="fuelMoisture === 'moderate' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Modéré<br><span class="text-[10px] opacity-70">10-20%</span>
              </button>
              <button (click)="fuelMoisture = 'humid'"
                class="py-2 px-2 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="fuelMoisture === 'humid' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Humide<br><span class="text-[10px] opacity-70">&gt; 20%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Résultats de propagation</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Vitesse base (3% vent)</div>
              <div class="text-xl font-bold text-primary">{{ baseSpeed.toFixed(2) }} km/h</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Facteur pente</div>
              <div class="text-xl font-bold" [ngClass]="slopeFactor > 1 ? 'text-red-600' : 'text-emerald-600'">
                ×{{ slopeFactor.toFixed(2) }}
              </div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Facteur combustible</div>
              <div class="text-xl font-bold text-amber-600">×{{ fuelFactor.toFixed(2) }}</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Facteur humidité</div>
              <div class="text-xl font-bold text-blue-600">×{{ moistureFactor.toFixed(2) }}</div>
            </div>
          </div>

          <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Vitesse effective de propagation</div>
            <div class="text-3xl font-bold text-red-700">{{ effectiveSpeed.toFixed(2) }} km/h</div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-muted">
                <tr>
                  <th class="px-3 py-2 text-left font-medium">Délai</th>
                  <th class="px-3 py-2 text-left font-medium">Distance parcourue</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b"><td class="px-3 py-2">5 min</td><td class="px-3 py-2 font-bold">{{ (effectiveSpeed * 1000 / 60 * 5).toFixed(0) }} m</td></tr>
                <tr class="border-b"><td class="px-3 py-2">15 min</td><td class="px-3 py-2 font-bold">{{ (effectiveSpeed * 1000 / 60 * 15).toFixed(0) }} m</td></tr>
                <tr class="border-b"><td class="px-3 py-2">30 min</td><td class="px-3 py-2 font-bold">{{ (effectiveSpeed * 1000 / 60 * 30).toFixed(0) }} m</td></tr>
                <tr class="border-b"><td class="px-3 py-2">1 h</td><td class="px-3 py-2 font-bold">{{ (effectiveSpeed * 1000).toFixed(0) }} m</td></tr>
                <tr class="border-b"><td class="px-3 py-2">2 h</td><td class="px-3 py-2 font-bold">{{ (effectiveSpeed * 2000).toFixed(0) }} m</td></tr>
              </tbody>
            </table>
          </div>

          <div *ngIf="slope > 0" class="rounded-lg border border-amber-300 bg-amber-50 p-3">
            <span class="text-amber-700 font-bold text-sm">⚠️ Pente ascendante</span>
            <p class="text-xs text-amber-800 mt-1">La pente positive accélère exponentiellement la propagation par effet de préchauffage par convection et rayonnement.</p>
          </div>
        </div>
      </div>

      <!-- Reference -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Référence rapide</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Vent (km/h)</th>
                <th class="px-3 py-2 text-left font-medium">Vitesse 3%</th>
                <th class="px-3 py-2 text-left font-medium">Dist. / 15 min</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2">20</td><td class="px-3 py-2">0.6 km/h</td><td class="px-3 py-2">150 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2">40</td><td class="px-3 py-2">1.2 km/h</td><td class="px-3 py-2">300 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2">60</td><td class="px-3 py-2">1.8 km/h</td><td class="px-3 py-2">450 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">80</td><td class="px-3 py-2 font-bold">2.4 km/h</td><td class="px-3 py-2 font-bold">600 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2">100</td><td class="px-3 py-2">3.0 km/h</td><td class="px-3 py-2">750 m</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class FdfPropagationComponent {
  windSpeed: number = 40;
  slope: number = 0;
  fuelType: 'fine' | 'medium' | 'heavy' = 'fine';
  fuelMoisture: 'dry' | 'moderate' | 'humid' = 'dry';

  get baseSpeed(): number {
    return this.windSpeed * 0.03;
  }

  get slopeFactor(): number {
    if (this.slope <= 0) return Math.max(0.5, 1 + this.slope / 100);
    return 1 + Math.pow(this.slope / 10, 1.3) * 0.1;
  }

  get fuelFactor(): number {
    switch (this.fuelType) {
      case 'fine': return 1.0;
      case 'medium': return 0.7;
      case 'heavy': return 0.4;
    }
  }

  get moistureFactor(): number {
    switch (this.fuelMoisture) {
      case 'dry': return 1.0;
      case 'moderate': return 0.7;
      case 'humid': return 0.4;
    }
  }

  get effectiveSpeed(): number {
    return this.baseSpeed * this.slopeFactor * this.fuelFactor * this.moistureFactor;
  }
}
