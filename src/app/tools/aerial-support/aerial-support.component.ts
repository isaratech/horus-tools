import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aerial-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Appui Aérien FDF</h3>
          <p class="text-sm text-muted-foreground">Dimensionnement spatial et calcul de transit ABE</p>
        </div>
        <div class="p-6 pt-0 space-y-5">
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Distance front → point sensible</label>
              <span class="text-lg font-bold text-primary">{{ distanceFrontToTarget }} km</span>
            </div>
            <input type="range" [(ngModel)]="distanceFrontToTarget" min="0.5" max="50" step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.5 km</span>
              <span>50 km</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Vitesse propagation feu</label>
              <span class="text-lg font-bold text-red-600">{{ fireSpeed }} km/h</span>
            </div>
            <input type="range" [(ngModel)]="fireSpeed" min="0.1" max="10" step="0.1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.1 km/h</span>
              <span>10 km/h</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Distance base aérienne → zone</label>
              <span class="text-lg font-bold text-primary">{{ distanceBaseToZone }} km</span>
            </div>
            <input type="range" [(ngModel)]="distanceBaseToZone" min="10" max="500" step="10"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>10 km</span>
              <span>500 km</span>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type d'aéronef</label>
            <div class="grid grid-cols-3 gap-2">
              <button (click)="aircraftType = 'canadair'"
                class="py-2 px-1 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="aircraftType === 'canadair' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Canadair<br><span class="text-[10px] opacity-70">300 km/h</span>
              </button>
              <button (click)="aircraftType = 'dash'"
                class="py-2 px-1 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="aircraftType === 'dash' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Dash 8<br><span class="text-[10px] opacity-70">500 km/h</span>
              </button>
              <button (click)="aircraftType = 'tracker'"
                class="py-2 px-1 rounded-lg border text-xs font-medium transition-colors text-center"
                [ngClass]="aircraftType === 'tracker' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                Tracker<br><span class="text-[10px] opacity-70">350 km/h</span>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Temps mise en œuvre équipage</label>
              <span class="text-lg font-bold text-primary">{{ crewReadyTime }} min</span>
            </div>
            <input type="range" [(ngModel)]="crewReadyTime" min="5" max="60" step="5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>5 min</span>
              <span>60 min</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Analyse temporelle</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Arrivée du front sur le point sensible</div>
              <div class="text-xl font-bold text-red-600">{{ fireArrivalTime.toFixed(0) }} min</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Temps de vol ABE</div>
              <div class="text-xl font-bold text-blue-600">{{ flightTime.toFixed(0) }} min</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Délai total ABE (mise en œuvre + vol)</div>
              <div class="text-xl font-bold text-primary">{{ totalABETime.toFixed(0) }} min</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Marge temporelle</div>
              <div class="text-xl font-bold" [ngClass]="margin >= 0 ? 'text-emerald-600' : 'text-red-600'">
                {{ margin >= 0 ? '+' : '' }}{{ margin.toFixed(0) }} min
              </div>
            </div>
          </div>

          <div *ngIf="margin < 0" class="rounded-lg border border-red-300 bg-red-50 p-4">
            <div class="text-red-600 font-bold text-sm">⚠️ L'ABE n'arrivera PAS à temps</div>
            <p class="text-xs text-red-800 mt-1">
              Le front de feu atteindra le point sensible avant l'arrivée de l'appui aérien.
              <strong>Prioriser un largage de retardant (Dash) en amont du feu</strong> pour casser la cinétique du front
              et offrir un délai aux moyens terrestres.
            </p>
          </div>
          <div *ngIf="margin >= 0 && margin < 15" class="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <div class="text-amber-600 font-bold text-sm">⚠️ Marge faible — Synchronisation critique</div>
            <p class="text-xs text-amber-800 mt-1">L'ABE peut intervenir mais avec une marge très réduite. Demander un largage préventif de retardant recommandé.</p>
          </div>
          <div *ngIf="margin >= 15" class="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
            <div class="text-emerald-600 font-bold text-sm">✅ Marge suffisante</div>
            <p class="text-xs text-emerald-800 mt-1">L'appui aérien peut être engagé avec une marge confortable.</p>
          </div>
        </div>
      </div>

      <!-- Reference ABE -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Caractéristiques ABE</h3>
        </div>
        <div class="p-6 pt-0 overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Aéronef</th>
                <th class="px-3 py-2 text-left font-medium">Vitesse</th>
                <th class="px-3 py-2 text-left font-medium">Capacité</th>
                <th class="px-3 py-2 text-left font-medium">Largage</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-medium">Canadair CL-415</td><td class="px-3 py-2">~300 km/h</td><td class="px-3 py-2">6 130 L</td><td class="px-3 py-2">Eau</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-medium">Dash 8 Q400MR</td><td class="px-3 py-2">~500 km/h</td><td class="px-3 py-2">10 000 L</td><td class="px-3 py-2">Retardant</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-medium">Tracker S-2FT</td><td class="px-3 py-2">~350 km/h</td><td class="px-3 py-2">3 200 L</td><td class="px-3 py-2">Retardant / eau</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AerialSupportComponent {
  distanceFrontToTarget: number = 5;
  fireSpeed: number = 2.4;
  distanceBaseToZone: number = 80;
  aircraftType: 'canadair' | 'dash' | 'tracker' = 'dash';
  crewReadyTime: number = 15;

  get aircraftSpeed(): number {
    switch (this.aircraftType) {
      case 'canadair': return 300;
      case 'dash': return 500;
      case 'tracker': return 350;
    }
  }

  get fireArrivalTime(): number {
    if (this.fireSpeed === 0) return 0;
    return (this.distanceFrontToTarget / this.fireSpeed) * 60;
  }

  get flightTime(): number {
    if (this.aircraftSpeed === 0) return 0;
    return (this.distanceBaseToZone / this.aircraftSpeed) * 60;
  }

  get totalABETime(): number {
    return this.crewReadyTime + this.flightTime;
  }

  get margin(): number {
    return this.fireArrivalTime - this.totalABETime;
  }
}
