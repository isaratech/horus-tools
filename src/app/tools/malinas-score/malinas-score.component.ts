import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-malinas-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Score de Malinas</h3>
          <p class="text-sm text-muted-foreground">Évaluation d'accouchement inopiné</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Parity -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Parité (nombre de grossesses)</label>
            <select [(ngModel)]="parity"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="0">0 — Primipare</option>
              <option [ngValue]="1">1 — Multipare (1 ou 2 accouchements)</option>
              <option [ngValue]="2">2 — Multipare (plus de 2 accouchements)</option>
            </select>
          </div>

          <!-- Labor duration -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Durée du travail</label>
            <select [(ngModel)]="laborDuration"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="0">0 — Moins de 3h</option>
              <option [ngValue]="1">1 — Entre 3h et 5h</option>
              <option [ngValue]="2">2 — Plus de 6h</option>
            </select>
          </div>

          <!-- Contraction duration -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Durée des contractions</label>
            <select [(ngModel)]="contractionDuration"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="0">0 — Moins de 1 min</option>
              <option [ngValue]="1">1 — 1 minute</option>
              <option [ngValue]="2">2 — Plus de 1 min</option>
            </select>
          </div>

          <!-- Contraction interval -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Intervalle des contractions</label>
            <select [(ngModel)]="contractionInterval"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="0">0 — Plus de 5 min</option>
              <option [ngValue]="1">1 — Entre 3 et 5 min</option>
              <option [ngValue]="2">2 — Moins de 3 min</option>
            </select>
          </div>

          <!-- Water break -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Perte des eaux</label>
            <select [(ngModel)]="waterBreak"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="0">0 — Non</option>
              <option [ngValue]="1">1 — Récemment (moins de 1h)</option>
              <option [ngValue]="2">2 — Ancienne (plus de 1h)</option>
            </select>
          </div>
        </div>
        <div class="p-6 pt-0">
          <!-- Result alert -->
          <div class="rounded-lg p-4 text-center"
            [ngClass]="totalScore < 5
              ? 'border border-emerald-200 bg-emerald-50'
              : 'border border-red-200 bg-red-50'">
            <div class="text-sm font-medium text-muted-foreground">Score Total</div>
            <div class="text-3xl font-bold">{{ totalScore }} <span class="text-lg font-normal text-muted-foreground">/ 10</span></div>
            <div class="text-xs mt-1 font-bold">
              {{ totalScore < 5 ? 'Transport possible' : 'Accouchement imminent sur place' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Interpretation card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Interprétation</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
            <span class="text-sm font-semibold">Score &lt; 5</span>
            <span class="text-sm"> — Transport vers maternité possible</span>
          </div>
          <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <span class="text-sm font-semibold">Score ≥ 5</span>
            <span class="text-sm"> — Accouchement imminent, rester sur place</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MalinasScoreComponent {
  parity = 0;
  laborDuration = 0;
  contractionDuration = 0;
  contractionInterval = 0;
  waterBreak = 0;

  get totalScore(): number {
    return Number(this.parity) + Number(this.laborDuration) +
      Number(this.contractionDuration) + Number(this.contractionInterval) +
      Number(this.waterBreak);
  }
}
