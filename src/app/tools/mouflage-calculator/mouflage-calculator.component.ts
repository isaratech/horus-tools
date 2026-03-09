import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mouflage-calculator',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calculateur de Mouflage</h3>
          <p class="text-sm text-muted-foreground">Force de traction et charge sur l'ancrage</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Load -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Poids de la charge : <strong>{{ load }} kg</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="load" min="0" max="5000" step="50" class="flex-1">
              <input type="number" [(ngModel)]="load" min="0" max="5000" step="50"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Strands -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Nombre de brins (démultiplication)</label>
            <select [(ngModel)]="strands"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="1">1 — Traction directe</option>
              <option [ngValue]="2">2 — Poulie simple mobile</option>
              <option [ngValue]="3">3 — Mouflage en Z</option>
              <option [ngValue]="4">4 — Double poulie</option>
              <option [ngValue]="5">5 brins</option>
              <option [ngValue]="6">6 brins</option>
            </select>
          </div>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <!-- Force required -->
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Force à exercer (théorique)</div>
            <div class="text-3xl font-bold">{{ forceRequired | number:'1.1-1' }} kg</div>
            <div class="text-xs mt-1">&asymp; {{ (forceRequired / 25) | number:'1.1-1' }} équipiers à 25 kg/pers</div>
          </div>

          <!-- Anchor load -->
          <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Charge sur l'ancrage</div>
            <div class="text-3xl font-bold">{{ anchorLoad | number:'1.1-1' }} kg</div>
          </div>
        </div>
      </div>

      <!-- Reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Principe du mouflage</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Brins</th>
                <th class="px-3 py-2 text-left font-medium">Type</th>
                <th class="px-3 py-2 text-left font-medium">Avantage</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold">1</td><td class="px-3 py-2">Traction directe</td><td class="px-3 py-2">&times;1</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">2</td><td class="px-3 py-2">Poulie simple mobile</td><td class="px-3 py-2">&times;2</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">3</td><td class="px-3 py-2">Mouflage en Z</td><td class="px-3 py-2">&times;3</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">4</td><td class="px-3 py-2">Double poulie</td><td class="px-3 py-2">&times;4</td></tr>
            </tbody>
          </table>
          <p class="text-xs text-amber-700 font-medium">&#9888;&#65039; En pratique, le frottement réduit l'efficacité d'environ 10% par poulie.</p>
        </div>
      </div>
    </div>
  `
})
export class MouflageCalculatorComponent {
  load = 100;
  strands = 1;

  get forceRequired(): number {
    return this.load / this.strands;
  }

  get anchorLoad(): number {
    return this.load + this.forceRequired;
  }
}
