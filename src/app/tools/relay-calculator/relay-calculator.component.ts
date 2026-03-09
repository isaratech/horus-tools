import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relay-calculator',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calcul de Mise en Relais</h3>
          <p class="text-sm text-muted-foreground">Engins pompes nécessaires</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Distance range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Distance totale : <strong>{{ distance }} m</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="distance" min="0" max="5000" step="50" class="flex-1">
              <input type="number" [(ngModel)]="distance" min="0" max="5000" step="50"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Elevation range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Dénivelé positif : <strong>{{ elevation }} m</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="elevation" min="0" max="500" step="10" class="flex-1">
              <input type="number" [(ngModel)]="elevation" min="0" max="500" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Flow select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Débit souhaité</label>
            <select
              [(ngModel)]="flow"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="500">500 L/min (LDV 500)</option>
              <option [ngValue]="1000">1 000 L/min (LDT 1000)</option>
              <option [ngValue]="2000">2 000 L/min (Canon)</option>
            </select>
          </div>

          <!-- Diameter select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Diamètre des tuyaux</label>
            <select
              [(ngModel)]="diameter"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="70">70 mm</option>
              <option [ngValue]="110">110 mm</option>
            </select>
          </div>
        </div>

        <!-- Results -->
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Nombre d'engins nécessaires</div>
            <div class="text-3xl font-bold">{{ pumpsNeeded }}</div>
          </div>
          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Espacement théorique</div>
            <div class="text-3xl font-bold">{{ pumpSpacing | number:'1.1-1' }} m</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RelayCalculatorComponent {
  distance = 1000;
  elevation = 20;
  flow = 500;
  diameter = 70;

  private readonly PUMP_PRESSURE = 12;
  private readonly MIN_INLET_PRESSURE = 2;

  get pressureLossPer100m(): number {
    if (this.diameter === 70) {
      if (this.flow <= 500) return 0.55;
      if (this.flow <= 1000) return 2.2;
      return 8.0;
    } else {
      if (this.flow <= 1000) return 0.25;
      if (this.flow <= 2000) return 1.0;
      return 2.2;
    }
  }

  get pumpsNeeded(): number {
    const totalPressureLoss = (this.distance / 100) * this.pressureLossPer100m;
    const elevationLoss = this.elevation / 10;
    const totalHead = totalPressureLoss + elevationLoss;
    const usablePressurePerPump = this.PUMP_PRESSURE - this.MIN_INLET_PRESSURE;
    return Math.ceil(totalHead / usablePressurePerPump);
  }

  get pumpSpacing(): number {
    if (this.pumpsNeeded <= 1) return this.distance;
    return this.distance / this.pumpsNeeded;
  }
}
