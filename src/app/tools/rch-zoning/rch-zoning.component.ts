import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rch-zoning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Assistant Zonage RCH</h3>
          <p class="text-sm text-muted-foreground">Périmètre de sécurité réflexe — Risques chimiques</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Conditions de vent</label>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="windCondition = 'none'"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="windCondition === 'none' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'">
                Absence de vent (&lt; 1 m/s)
              </button>
              <button (click)="windCondition = 'wind'"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="windCondition === 'wind' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'">
                Présence de vent (&gt; 1 m/s)
              </button>
            </div>
          </div>

          <div *ngIf="windCondition === 'wind'" class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Direction du vent</label>
              <span class="text-lg font-bold text-primary">{{ windDirection }}° {{ windLabel }}</span>
            </div>
            <input type="range" [(ngModel)]="windDirection" min="0" max="355" step="5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0° (N)</span>
              <span>180° (S)</span>
              <span>355°</span>
            </div>
          </div>

          <!-- SAS validation -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Position du SAS de décontamination</label>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="sasUpwind = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="sasUpwind === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                ✅ Au vent (confirmé)
              </button>
              <button (click)="sasUpwind = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="sasUpwind === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                ❌ Sous le vent
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Zone display -->
      <div *ngIf="windCondition" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Configuration du périmètre</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <!-- No wind -->
          <div *ngIf="windCondition === 'none'">
            <div class="rounded-lg border border-red-200 bg-red-50 p-3 mb-3">
              <div class="text-sm font-medium text-red-700">Zone circulaire isotrope</div>
              <p class="text-xs text-red-600 mt-1">Rayon de sécurité de <strong>500 m</strong> autour de la source de danger.</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="rounded-lg border border-red-300 bg-red-100 p-3">
                <div class="text-xs font-bold text-red-700">Zone d'Exclusion</div>
                <div class="text-xs text-red-600 mt-1">0–100 m</div>
                <div class="text-[10px] text-red-500">Danger immédiat</div>
              </div>
              <div class="rounded-lg border border-amber-300 bg-amber-100 p-3">
                <div class="text-xs font-bold text-amber-700">Zone Contrôlée</div>
                <div class="text-xs text-amber-600 mt-1">100–300 m</div>
                <div class="text-[10px] text-amber-500">Zone tampon</div>
              </div>
              <div class="rounded-lg border border-emerald-300 bg-emerald-100 p-3">
                <div class="text-xs font-bold text-emerald-700">Zone de Soutien</div>
                <div class="text-xs text-emerald-600 mt-1">300–500 m</div>
                <div class="text-[10px] text-emerald-500">Logistique / PC</div>
              </div>
            </div>
          </div>

          <!-- With wind -->
          <div *ngIf="windCondition === 'wind'">
            <div class="rounded-lg border border-red-200 bg-red-50 p-3 mb-3">
              <div class="text-sm font-medium text-red-700">Zone directionnelle (panache)</div>
              <p class="text-xs text-red-600 mt-1">Périmètre adapté à la direction du vent.</p>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-muted">
                  <tr>
                    <th class="px-3 py-2 text-left font-medium">Paramètre</th>
                    <th class="px-3 py-2 text-left font-medium">Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b"><td class="px-3 py-2">Rayon source (ZDI)</td><td class="px-3 py-2 font-bold">50 m</td></tr>
                  <tr class="border-b"><td class="px-3 py-2">Longueur panache (ZDV) sous le vent</td><td class="px-3 py-2 font-bold">500 m</td></tr>
                  <tr class="border-b"><td class="px-3 py-2">Ouverture angulaire du cône</td><td class="px-3 py-2 font-bold">20°</td></tr>
                  <tr class="border-b"><td class="px-3 py-2">Direction du panache</td><td class="px-3 py-2 font-bold">{{ windDirection }}° {{ windLabel }}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- SAS alert -->
      <div *ngIf="sasUpwind === false" class="rounded-lg border border-red-300 bg-red-50 p-4">
        <div class="text-red-600 font-bold">⚠️ DANGER — SAS sous le vent</div>
        <p class="text-sm text-red-800 mt-1">
          Le SAS de décontamination doit <strong>impérativement</strong> être positionné au vent de la source de danger.
          Risque d'exposition du personnel de décontamination aux vapeurs toxiques.
          <strong>Repositionner immédiatement.</strong>
        </p>
      </div>

      <!-- Reference table -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Référence zonage réflexe</h3>
        </div>
        <div class="p-6 pt-0 overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Condition météo</th>
                <th class="px-3 py-2 text-left font-medium">Configuration</th>
                <th class="px-3 py-2 text-left font-medium">Dimensions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="px-3 py-2">Absence de vent (&lt; 1 m/s)</td>
                <td class="px-3 py-2">Zone circulaire isotrope</td>
                <td class="px-3 py-2 font-bold">R = 500 m</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2">Présence de vent (&gt; 1 m/s)</td>
                <td class="px-3 py-2">Zone directionnelle (panache)</td>
                <td class="px-3 py-2 font-bold">ZDI 50 m / ZDV 500 m / Cône 20°</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class RchZoningComponent {
  windCondition: 'none' | 'wind' | null = null;
  windDirection: number = 270;
  sasUpwind: boolean | null = null;

  get windLabel(): string {
    const d = this.windDirection;
    if (d >= 337.5 || d < 22.5) return '(N)';
    if (d < 67.5) return '(NE)';
    if (d < 112.5) return '(E)';
    if (d < 157.5) return '(SE)';
    if (d < 202.5) return '(S)';
    if (d < 247.5) return '(SO)';
    if (d < 292.5) return '(O)';
    return '(NO)';
  }
}
