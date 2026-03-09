import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fall-factor',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Facteur de Chute</h3>
          <p class="text-sm text-muted-foreground">Évaluation de la gravité d'une chute sur corde</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Fall height -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Hauteur de chute (m)</label>
            <input type="number" [(ngModel)]="fallHeight" min="0" step="0.1"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          </div>

          <!-- Rope length -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Longueur de corde déployée (m)</label>
            <input type="number" [(ngModel)]="ropeLength" min="0.1" step="0.1"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          </div>
        </div>
        <div class="p-6 pt-0">
          <!-- Result alert -->
          <div class="rounded-lg p-4 text-center"
            [ngClass]="{
              'border border-emerald-200 bg-emerald-50': fallFactor <= 1,
              'border border-amber-200 bg-amber-50': fallFactor > 1 && fallFactor <= 2,
              'border border-red-200 bg-red-50': fallFactor > 2
            }">
            <div class="text-sm font-medium text-muted-foreground">Facteur de Chute</div>
            <div class="text-3xl font-bold">{{ fallFactor | number:'1.2-2' }}</div>
            <div class="text-xs mt-1 font-bold">{{ message }}</div>
          </div>
        </div>
      </div>

      <!-- Formula & reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Formule</h3>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <p class="text-sm font-semibold">FC = Hauteur de chute / Longueur de corde</p>
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Facteur</th>
                <th class="px-3 py-2 text-left font-medium">Interprétation</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold text-emerald-700">FC ≤ 1</td><td class="px-3 py-2 text-emerald-700">Acceptable</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold text-amber-700">1 &lt; FC ≤ 2</td><td class="px-3 py-2 text-amber-700">Choc violent</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold text-red-700">FC &gt; 2</td><td class="px-3 py-2 text-red-700 font-bold">Rupture probable</td></tr>
            </tbody>
          </table>
          <p class="text-xs text-muted-foreground">Le facteur de chute max théorique est 2 (chute libre sans corde tendue).</p>
        </div>
      </div>
    </div>
  `
})
export class FallFactorComponent {
  fallHeight = 0;
  ropeLength = 1;

  get fallFactor(): number {
    if (this.ropeLength <= 0) return 0;
    return this.fallHeight / this.ropeLength;
  }

  get message(): string {
    if (this.fallFactor <= 1) return 'Situation acceptable';
    if (this.fallFactor <= 2) return 'DANGER : Choc violent';
    return 'DANGER CRITIQUE : Rupture probable';
  }
}
