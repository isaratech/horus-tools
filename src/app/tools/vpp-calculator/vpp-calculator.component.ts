import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vpp-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calculateur VPP</h3>
          <p class="text-sm text-muted-foreground">Ventilation par Pression Positive — Dimensionnement tactique</p>
        </div>
        <div class="p-6 pt-0 space-y-5">
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Largeur entrant</label>
              <span class="text-lg font-bold text-primary">{{ entrantWidth }} m</span>
            </div>
            <input type="range" [(ngModel)]="entrantWidth" min="0.3" max="5" step="0.1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.3 m</span>
              <span>5 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Hauteur entrant</label>
              <span class="text-lg font-bold text-primary">{{ entrantHeight }} m</span>
            </div>
            <input type="range" [(ngModel)]="entrantHeight" min="0.5" max="5" step="0.1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.5 m</span>
              <span>5 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Largeur sortant</label>
              <span class="text-lg font-bold text-primary">{{ sortantWidth }} m</span>
            </div>
            <input type="range" [(ngModel)]="sortantWidth" min="0.3" max="5" step="0.1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.3 m</span>
              <span>5 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Hauteur sortant</label>
              <span class="text-lg font-bold text-primary">{{ sortantHeight }} m</span>
            </div>
            <input type="range" [(ngModel)]="sortantHeight" min="0.3" max="5" step="0.1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.3 m</span>
              <span>5 m</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Analyse aéraulique</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Surface entrant</div>
              <div class="text-xl font-bold text-primary">{{ entrantArea.toFixed(2) }} m²</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Surface sortant</div>
              <div class="text-xl font-bold text-primary">{{ sortantArea.toFixed(2) }} m²</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Ratio sortant/entrant</div>
              <div class="text-xl font-bold" [ngClass]="ratioClass">{{ ratio.toFixed(2) }}</div>
              <div class="text-xs text-muted-foreground">Optimal : ≈ 2.0</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Rendement estimé</div>
              <div class="text-xl font-bold" [ngClass]="ratioClass">{{ rendement }} %</div>
            </div>
          </div>

          <!-- Alert -->
          <div *ngIf="ratio < 1" class="rounded-lg border border-red-300 bg-red-50 p-3">
            <span class="text-red-600 font-bold text-sm">⚠️ DANGER — Sortant inférieur à l'entrant</span>
            <p class="text-xs text-red-800 mt-1">Risque de mise en surpression du volume. Rebond possible des gaz chauds vers les porte-lances.</p>
          </div>
          <div *ngIf="ratio >= 1 && ratio < 1.5" class="rounded-lg border border-amber-300 bg-amber-50 p-3">
            <span class="text-amber-600 font-bold text-sm">⚠️ Ratio insuffisant</span>
            <p class="text-xs text-amber-800 mt-1">Le sortant devrait être au moins double de l'entrant pour un rendement optimal (~90%).</p>
          </div>
          <div *ngIf="ratio >= 2 && ratio <= 3" class="rounded-lg border border-emerald-300 bg-emerald-50 p-3">
            <span class="text-emerald-600 font-bold text-sm">✅ Ratio optimal</span>
            <p class="text-xs text-emerald-800 mt-1">Rendement de ventilation avoisinant 90%.</p>
          </div>
          <div *ngIf="ratio > 3" class="rounded-lg border border-blue-300 bg-blue-50 p-3">
            <span class="text-blue-600 font-bold text-sm">ℹ️ Ratio excessif</span>
            <p class="text-xs text-blue-800 mt-1">Au-delà de 2, pas de gain opérationnel significatif. Dispersion de l'énergie cinétique du flux.</p>
          </div>

          <!-- Flow requirements -->
          <div class="rounded-lg border p-3">
            <div class="text-sm font-medium mb-2">Besoins en débit</div>
            <div class="text-xs space-y-1">
              <div>Débit d'extraction requis (5 m/s au sortant) : <strong>{{ debitExtraction.toFixed(0) }} m³/h</strong></div>
              <div>Débit nominal ventilateur recommandé (×2) : <strong>{{ debitNominal.toFixed(0) }} m³/h</strong></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mounting configurations -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Montages tactiques</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border p-3">
            <div class="text-sm font-medium text-primary">Montage en série</div>
            <p class="text-xs text-muted-foreground mt-1">Deux ventilateurs l'un derrière l'autre. Augmente la puissance pour vaincre d'importantes pertes de charge (longs couloirs, escaliers).</p>
          </div>
          <div class="rounded-lg border p-3">
            <div class="text-sm font-medium text-primary">Montage en parallèle (en V)</div>
            <p class="text-xs text-muted-foreground mt-1">Disposition côte à côte pour couvrir un entrant de grande dimension (porte cochère, quai de déchargement).</p>
          </div>
          <div class="rounded-lg border p-3">
            <div class="text-sm font-medium text-primary">Montage en relais (VAR)</div>
            <p class="text-xs text-muted-foreground mt-1">Ventilateur d'appoint à l'intérieur de la veine d'air lorsque la distance depuis l'entrant provoque une déperdition d'énergie trop importante.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VppCalculatorComponent {
  entrantWidth: number = 0.9;
  entrantHeight: number = 2.1;
  sortantWidth: number = 1.2;
  sortantHeight: number = 1.5;

  get entrantArea(): number {
    return this.entrantWidth * this.entrantHeight;
  }

  get sortantArea(): number {
    return this.sortantWidth * this.sortantHeight;
  }

  get ratio(): number {
    return this.entrantArea > 0 ? this.sortantArea / this.entrantArea : 0;
  }

  get rendement(): string {
    if (this.ratio >= 2) return '~90';
    if (this.ratio >= 1.5) return '~75';
    if (this.ratio >= 1) return '~60';
    return '<50';
  }

  get ratioClass(): string {
    if (this.ratio >= 1.8 && this.ratio <= 3) return 'text-emerald-600';
    if (this.ratio >= 1) return 'text-amber-600';
    return 'text-red-600';
  }

  get debitExtraction(): number {
    return this.sortantArea * 5 * 3600;
  }

  get debitNominal(): number {
    return this.debitExtraction * 2;
  }
}
