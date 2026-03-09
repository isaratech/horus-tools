import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slope-calculator',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calculateur de Pente (FDF)</h3>
          <p class="text-sm text-muted-foreground">Pente et vitesse de propagation du feu de forêt</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Elevation -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Dénivelé : <strong>{{ elevation }} m</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="elevation" min="0" max="500" step="10" class="flex-1">
              <input type="number" [(ngModel)]="elevation" min="0" max="500" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Distance -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Distance horizontale : <strong>{{ distance }} m</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="distance" min="10" max="2000" step="10" class="flex-1">
              <input type="number" [(ngModel)]="distance" min="10" max="2000" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <!-- Slope result -->
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Pente</div>
            <div class="text-3xl font-bold">{{ slopePercentage | number:'1.0-1' }} %</div>
            <div class="text-xs mt-1">Soit {{ slopeDegrees | number:'1.0-1' }}°</div>
          </div>

          <!-- Speed factor result -->
          <div class="rounded-lg p-4 text-center"
            [ngClass]="{
              'border border-emerald-200 bg-emerald-50': slopePercentage < 5,
              'border border-amber-200 bg-amber-50': slopePercentage >= 5 && slopePercentage <= 30,
              'border border-red-200 bg-red-50': slopePercentage > 30
            }">
            <div class="text-sm font-medium text-muted-foreground">Facteur de vitesse de propagation</div>
            <div class="text-3xl font-bold">&times;{{ speedFactor | number:'1.1-1' }}</div>
            <div class="text-xs mt-1">{{ speedMessage }}</div>
          </div>
        </div>
      </div>

      <!-- Reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Référence propagation FDF</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Pente</th>
                <th class="px-3 py-2 text-left font-medium">Facteur</th>
                <th class="px-3 py-2 text-left font-medium">Niveau de risque</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2">&lt; 5 %</td><td class="px-3 py-2">&times;1</td><td class="px-3 py-2">Normal</td></tr>
              <tr class="border-b"><td class="px-3 py-2">10 %</td><td class="px-3 py-2">&times;1,5</td><td class="px-3 py-2">Modéré</td></tr>
              <tr class="border-b"><td class="px-3 py-2">20 %</td><td class="px-3 py-2">&times;2</td><td class="px-3 py-2">Élevé</td></tr>
              <tr class="border-b"><td class="px-3 py-2">30 %</td><td class="px-3 py-2">&times;2,5</td><td class="px-3 py-2 text-red-700 font-bold">Très élevé</td></tr>
              <tr class="border-b"><td class="px-3 py-2">&gt; 40 %</td><td class="px-3 py-2">&times;3+</td><td class="px-3 py-2 text-red-700 font-bold">Extrême</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class SlopeCalculatorComponent {
  elevation = 100;
  distance = 500;

  get slopePercentage(): number {
    if (this.distance === 0) return 0;
    return (this.elevation / this.distance) * 100;
  }

  get slopeDegrees(): number {
    if (this.distance === 0) return 0;
    return Math.atan(this.elevation / this.distance) * (180 / Math.PI);
  }

  get speedFactor(): number {
    const slope = this.slopePercentage;
    if (slope < 5) return 1;
    return 1 + (slope / 20);
  }

  get speedMessage(): string {
    const s = this.slopePercentage;
    if (s < 5) return 'Propagation normale';
    if (s < 15) return 'Propagation accélérée';
    if (s < 30) return 'Propagation rapide';
    return 'Propagation extrêmement rapide — Danger !';
  }
}
