import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ari-calculator',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calculatrice ARI</h3>
          <p class="text-sm text-muted-foreground">Autonomie et heure de sortie</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Bottle select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type de bouteille</label>
            <select
              [(ngModel)]="bottleVolume"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="6">6 Litres (300 bar)</option>
              <option [ngValue]="9">9 Litres (300 bar)</option>
            </select>
          </div>

          <!-- Pressure range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Pression : <strong>{{ pressure }} bars</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="pressure" min="0" max="400" step="10" class="flex-1">
              <input type="number" [(ngModel)]="pressure" min="0" max="400" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Consumption range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Consommation : <strong>{{ consumption }} L/min</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="consumption" min="10" max="100" step="5" class="flex-1">
              <input type="number" [(ngModel)]="consumption" min="10" max="100" step="5"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
            <p class="text-xs text-muted-foreground">Consommation au repos ~30 L/min, en effort ~60 L/min</p>
          </div>
        </div>

        <!-- Results -->
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Autonomie Théorique</div>
            <div class="text-3xl font-bold">{{ theoreticalAutonomy | number:'1.1-1' }} min</div>
          </div>
          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Autonomie de Travail (avant sifflet)</div>
            <div class="text-3xl font-bold">{{ workingAutonomy | number:'1.1-1' }} min</div>
          </div>
          <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Heure de sortie obligatoire</div>
            <div class="text-3xl font-bold">{{ exitTime }}</div>
            <div class="text-xs mt-1">Calculée à partir de maintenant</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AriCalculatorComponent {
  bottleVolume = 6;
  pressure = 300;
  consumption = 45;

  get theoreticalAutonomy(): number {
    if (this.consumption <= 0) return 0;
    return (this.bottleVolume * this.pressure) / this.consumption;
  }

  get workingAutonomy(): number {
    if (this.pressure < 50 || this.consumption <= 0) return 0;
    return (this.bottleVolume * (this.pressure - 50)) / this.consumption;
  }

  get exitTime(): string {
    const now = new Date();
    const exitDate = new Date(now.getTime() + this.workingAutonomy * 60000);
    return exitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
