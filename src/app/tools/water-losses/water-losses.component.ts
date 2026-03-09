import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-water-losses',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Pertes de Charge Hydrauliques</h3>
          <p class="text-sm text-muted-foreground">Calcul des pertes à ajouter à la pression pompe</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Diameter select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Diamètre de l'établissement</label>
            <select
              [(ngModel)]="size"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option [ngValue]="22">22 mm</option>
              <option [ngValue]="45">45 mm</option>
              <option [ngValue]="70">70 mm</option>
              <option [ngValue]="110">110 mm</option>
            </select>
          </div>

          <!-- Length range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Longueur de l'établissement : <strong>{{ length }} m</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="length" min="0" max="2000" step="10" class="flex-1">
              <input type="number" [(ngModel)]="length" min="0" max="2000" step="10"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Outflow range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Débit : <strong>{{ outflow }} L/min</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="outflow" min="0" max="2000" step="50" class="flex-1">
              <input type="number" [(ngModel)]="outflow" min="0" max="2000" step="50"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Height range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Dénivelé : <strong>{{ height }} m</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="height" min="-100" max="100" step="1" class="flex-1">
              <input type="number" [(ngModel)]="height" min="-100" max="100" step="1"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Pertes de Charge</div>
            <div class="text-3xl font-bold">{{ losses | number:'1.2-2' }} bar(s)</div>
            <div class="text-xs mt-1">
              Pour 6 bars à la lance &rarr; <strong>{{ (losses + 6) | number:'1.1-1' }} bars à la pompe</strong>
            </div>
          </div>
          <div *ngIf="warningMessage" class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <div class="text-sm font-medium text-amber-800">{{ warningMessage }}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WaterLossesComponent {
  size = 70;
  length = 200;
  outflow = 500;
  height = 0;
  warningMessage = '';

  get losses(): number {
    const jz = this.height * 0.1;
    let jn = 0.0;
    let q = 0.0;
    if (this.size == 22) {
      jn = 2.2; q = (this.outflow / 58) ** 2;
    } else if (this.size == 45) {
      jn = 1.5; q = (this.outflow / 250) ** 2;
    } else if (this.size == 70) {
      jn = 0.55; q = (this.outflow / 500) ** 2;
    } else if (this.size == 110) {
      jn = 0.28; q = (this.outflow / 1000) ** 2;
    }
    const j = jz + ((jn * this.length / 100) * q);
    this.warningMessage = j > 10 ? 'Attention : pertes trop importantes. Vérifiez vos valeurs.' : '';
    return j;
  }
}
