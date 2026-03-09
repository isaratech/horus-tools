import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-glasgow-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Score de Glasgow (GCS)</h3>
          <p class="text-sm text-muted-foreground">Évaluation de l'état de conscience</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Eyes -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Ouverture des yeux (Y)</label>
            <select [(ngModel)]="eyes"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="4">4 — Spontanée</option>
              <option [ngValue]="3">3 — À la demande</option>
              <option [ngValue]="2">2 — À la douleur</option>
              <option [ngValue]="1">1 — Nulle</option>
            </select>
          </div>

          <!-- Verbal -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Réponse verbale (V)</label>
            <select [(ngModel)]="verbal"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="5">5 — Orientée</option>
              <option [ngValue]="4">4 — Confuse</option>
              <option [ngValue]="3">3 — Inappropriée</option>
              <option [ngValue]="2">2 — Incompréhensible</option>
              <option [ngValue]="1">1 — Nulle</option>
            </select>
          </div>

          <!-- Motor -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Réponse motrice (M)</label>
            <select [(ngModel)]="motor"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="6">6 — Obéit à la commande</option>
              <option [ngValue]="5">5 — Orientée à la douleur</option>
              <option [ngValue]="4">4 — Évitement à la douleur</option>
              <option [ngValue]="3">3 — Flexion stéréotypée (Décortication)</option>
              <option [ngValue]="2">2 — Extension stéréotypée (Décérébration)</option>
              <option [ngValue]="1">1 — Nulle</option>
            </select>
          </div>
        </div>
        <div class="p-6 pt-0">
          <!-- Result alert -->
          <div class="rounded-lg p-4 text-center"
            [ngClass]="{
              'border border-red-200 bg-red-50': totalScore <= 8,
              'border border-amber-200 bg-amber-50': totalScore > 8 && totalScore <= 12,
              'border border-emerald-200 bg-emerald-50': totalScore > 12
            }">
            <div class="text-sm font-medium text-muted-foreground">Score Total</div>
            <div class="text-3xl font-bold">{{ totalScore }} <span class="text-lg font-normal text-muted-foreground">/ 15</span></div>
            <div class="text-xs mt-1">
              <span *ngIf="totalScore <= 8">Coma sévère (Intubation ?)</span>
              <span *ngIf="totalScore > 8 && totalScore <= 12">Coma modéré</span>
              <span *ngIf="totalScore > 12">Conscience normale ou légère altération</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Référence rapide</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Score</th>
                <th class="px-3 py-2 text-left font-medium">Interprétation</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold">15</td><td class="px-3 py-2">Conscience normale</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">13–14</td><td class="px-3 py-2">Légère altération</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">9–12</td><td class="px-3 py-2">Coma modéré</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold text-red-700">≤ 8</td><td class="px-3 py-2 text-red-700 font-semibold">Coma sévère — Intubation ?</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold text-red-700">3</td><td class="px-3 py-2 text-red-700 font-semibold">Coma dépassé</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class GlasgowScoreComponent {
  eyes = 4;
  verbal = 5;
  motor = 6;

  get totalScore(): number {
    return Number(this.eyes) + Number(this.verbal) + Number(this.motor);
  }
}
