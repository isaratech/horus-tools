import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-oxygen-therapy',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Autonomie Oxygénothérapie</h3>
          <p class="text-sm text-muted-foreground">Calcul d'autonomie de la bouteille d'O₂</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Bottle volume select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Volume de la bouteille</label>
            <select
              [(ngModel)]="bottleVolume"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="2">2 Litres (B2)</option>
              <option [ngValue]="5">5 Litres (B5)</option>
              <option [ngValue]="15">15 Litres (B15)</option>
            </select>
          </div>

          <!-- Pressure range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Pression : <strong>{{ pressure }} bars</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="pressure" min="0" max="300" step="10" class="flex-1">
              <input type="number" [(ngModel)]="pressure" min="0" max="300" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Flow rate range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Débit : <strong>{{ flowRate }} L/min</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="flowRate" min="0" max="15" step="1" class="flex-1">
              <input type="number" [(ngModel)]="flowRate" min="0" max="15" step="1"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>
        </div>

        <!-- Result -->
        <div class="p-6 pt-0">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Autonomie Estimée</div>
            <div class="text-3xl font-bold">{{ autonomy | number:'1.0-0' }} min</div>
            <div class="text-xs mt-1">Soit environ {{ hours }}h {{ minutes }}min</div>
          </div>
        </div>
      </div>

      <!-- Reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Rappel des débits</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Débit</th>
                <th class="px-3 py-2 text-left font-medium">Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold">3 L/min</td><td class="px-3 py-2">Débit faible (SpO₂ 90–95%)</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">6 L/min</td><td class="px-3 py-2">Débit moyen</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">9 L/min</td><td class="px-3 py-2">Débit élevé</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">15 L/min</td><td class="px-3 py-2">Débit max (masque haute concentration)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class OxygenTherapyComponent {
  bottleVolume = 5;
  pressure = 200;
  flowRate = 15;

  get autonomy(): number {
    if (this.flowRate <= 0) return 0;
    return (this.bottleVolume * this.pressure) / this.flowRate;
  }
  get hours(): number { return Math.floor(this.autonomy / 60); }
  get minutes(): number { return Math.floor(this.autonomy % 60); }
}
