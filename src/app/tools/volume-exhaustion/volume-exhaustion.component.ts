import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volume-exhaustion',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calculatrice d'Épuisement de Volume</h3>
          <p class="text-sm text-muted-foreground">Estimation du temps d'épuisement</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Mode select -->
          <div>
            <label class="block text-sm font-medium mb-1.5">Mode de calcul du volume</label>
            <select [(ngModel)]="mode"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="direct">Volume direct (m³)</option>
              <option value="rectangular">Rectangulaire (L x l x h)</option>
              <option value="circular">Circulaire (Rayon x h)</option>
            </select>
          </div>

          <!-- Direct mode -->
          <div *ngIf="mode === 'direct'">
            <label class="block text-sm font-medium mb-1.5">Volume (m³)</label>
            <input type="number" [(ngModel)]="volume" min="0"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          </div>

          <!-- Rectangular mode -->
          <div *ngIf="mode === 'rectangular'" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1.5">Longueur (m)</label>
              <input type="number" [(ngModel)]="length" min="0"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5">Largeur (m)</label>
              <input type="number" [(ngModel)]="width" min="0"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5">Profondeur (m)</label>
              <input type="number" [(ngModel)]="height" min="0"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
          </div>

          <!-- Circular mode -->
          <div *ngIf="mode === 'circular'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1.5">Rayon (m)</label>
              <input type="number" [(ngModel)]="radius" min="0"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5">Profondeur (m)</label>
              <input type="number" [(ngModel)]="height" min="0"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
          </div>

          <!-- Flow rate -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1.5">Débit de la pompe</label>
              <input type="number" [(ngModel)]="flowRate" min="1"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5">Unité</label>
              <select [(ngModel)]="flowUnit"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="m3h">m³/h</option>
                <option value="lmin">L/min</option>
              </select>
            </div>
          </div>

          <div class="border-t my-4"></div>

          <!-- Results -->
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Volume Total</div>
            <div class="text-3xl font-bold">{{ calculatedVolume | number:'1.1-1' }} m³</div>
            <div class="text-sm text-muted-foreground mt-1">{{ calculatedVolume * 1000 | number:'1.0-0' }} Litres</div>
          </div>
          <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Temps estimé</div>
            <div class="text-3xl font-bold">{{ timeString }}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VolumeExhaustionComponent {
  mode: 'direct' | 'rectangular' | 'circular' = 'direct';
  volume = 0;
  length = 0;
  width = 0;
  height = 0;
  radius = 0;
  flowRate = 30;
  flowUnit: 'm3h' | 'lmin' = 'm3h';

  get calculatedVolume(): number {
    switch (this.mode) {
      case 'direct': return this.volume;
      case 'rectangular': return this.length * this.width * this.height;
      case 'circular': return Math.PI * Math.pow(this.radius, 2) * this.height;
      default: return 0;
    }
  }

  get timeString(): string {
    const vol = this.calculatedVolume;
    if (vol <= 0 || this.flowRate <= 0) return '0h 00min';
    let flowM3h = this.flowUnit === 'lmin' ? (this.flowRate * 60) / 1000 : this.flowRate;
    const totalH = vol / flowM3h;
    const h = Math.floor(totalH);
    const m = Math.round((totalH - h) * 60);
    return `${h}h ${String(m).padStart(2, '0')}min`;
  }
}
