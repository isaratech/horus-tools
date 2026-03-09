import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exclusion-zone',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Zone d'Exclusion (Guide CMIC/ERG)</h3>
          <p class="text-sm text-muted-foreground">Estimation des zones d'isolation et d'évacuation</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- State select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">État du produit</label>
            <select
              [(ngModel)]="state"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="gas">Gaz / Toxique par inhalation</option>
              <option value="liquid">Liquide (déversement)</option>
              <option value="solid">Solide</option>
            </select>
          </div>

          <!-- Quantity select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Quantité estimée</label>
            <select
              [(ngModel)]="quantity"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="small">Petite (fût, bouteille, sac)</option>
              <option value="large">Grande (citerne, vrac, véhicule)</option>
            </select>
          </div>

          <!-- Time select -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Moment de la journée</label>
            <select
              [(ngModel)]="time"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="day">Jour (meilleure dispersion)</option>
              <option value="night">Nuit (inversion thermique)</option>
            </select>
          </div>
        </div>

        <!-- Results -->
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Rayon d'isolation initial</div>
            <div class="text-3xl font-bold">{{ isolationRadius }} m</div>
            <div class="text-xs mt-1">Dans toutes les directions</div>
          </div>
          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Distance de protection</div>
            <div class="text-3xl font-bold">{{ protectionDistance | number:'1.1-1' }} km</div>
            <div class="text-xs mt-1">Dans la direction du vent (sens du vent)</div>
          </div>
        </div>
      </div>

      <!-- Procedure card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Rappel procédure</h3>
        </div>
        <div class="p-6 pt-0">
          <ol class="list-decimal pl-5 text-sm leading-relaxed space-y-1">
            <li>Identifier le produit (code ONU, étiquette ADR)</li>
            <li>Consulter le Guide CMIC ou l'ERG orange</li>
            <li>Établir la zone d'exclusion (ZE)</li>
            <li>Établir la zone de soutien (ZS) et la zone de commandement (ZC)</li>
            <li>Positionner les intervenants selon le vent</li>
          </ol>
          <p class="text-xs text-amber-700 mt-3">Ces valeurs sont des estimations génériques. Toujours consulter l'ERG/CMIC pour les valeurs spécifiques au produit.</p>
        </div>
      </div>
    </div>
  `
})
export class ExclusionZoneComponent {
  state = 'gas';
  quantity = 'small';
  time = 'day';

  get isolationRadius(): number {
    if (this.state === 'gas') return this.quantity === 'small' ? 100 : 300;
    if (this.state === 'liquid') return this.quantity === 'small' ? 60 : 150;
    return this.quantity === 'small' ? 30 : 100;
  }

  get protectionDistance(): number {
    let base: number;
    if (this.state === 'gas') base = this.quantity === 'small' ? 0.5 : 1.5;
    else if (this.state === 'liquid') base = this.quantity === 'small' ? 0.3 : 0.8;
    else base = this.quantity === 'small' ? 0.1 : 0.4;
    return this.time === 'night' ? base * 2.5 : base;
  }
}
