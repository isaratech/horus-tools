import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tunnel-aeraulics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Aeraulics -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Aéraulique Tunnel</h3>
          <p class="text-sm text-muted-foreground">Ventilation et hydraulique en ouvrages souterrains</p>
        </div>
        <div class="p-6 pt-0 space-y-5">
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Largeur tunnel</label>
              <span class="text-lg font-bold text-primary">{{ tunnelWidth }} m</span>
            </div>
            <input type="range" [(ngModel)]="tunnelWidth" min="2" max="20" step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>2 m</span>
              <span>20 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Hauteur tunnel</label>
              <span class="text-lg font-bold text-primary">{{ tunnelHeight }} m</span>
            </div>
            <input type="range" [(ngModel)]="tunnelHeight" min="2" max="10" step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>2 m</span>
              <span>10 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Longueur tunnel</label>
              <span class="text-lg font-bold text-primary">{{ tunnelLength }} m</span>
            </div>
            <input type="range" [(ngModel)]="tunnelLength" min="50" max="5000" step="50"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>50 m</span>
              <span>5 000 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Vélocité critique</label>
              <span class="text-lg font-bold text-primary">{{ criticalVelocity }} m/s</span>
            </div>
            <input type="range" [(ngModel)]="criticalVelocity" min="1" max="8" step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>1 m/s</span>
              <span>8 m/s</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Coefficient de rugosité λ</label>
              <span class="text-lg font-bold text-primary">{{ lambda }}</span>
            </div>
            <input type="range" [(ngModel)]="lambda" min="0.01" max="0.05" step="0.005"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>0.01 (lisse)</span>
              <span>0.05 (rugueux)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ventilation results -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Résultats ventilation</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Section tunnel</div>
              <div class="text-xl font-bold text-primary">{{ tunnelSection.toFixed(1) }} m²</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Diamètre hydraulique</div>
              <div class="text-xl font-bold text-primary">{{ hydraulicDiameter.toFixed(2) }} m</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Débit requis</div>
              <div class="text-xl font-bold text-primary">{{ requiredFlow.toFixed(0) }} m³/h</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Perte de charge linéaire</div>
              <div class="text-xl font-bold text-amber-600">{{ pressureLoss.toFixed(2) }} Pa/m</div>
            </div>
          </div>
          <div class="rounded-lg border p-3">
            <div class="text-xs text-muted-foreground">Perte de charge totale sur la longueur</div>
            <div class="text-xl font-bold text-red-600">{{ totalPressureLoss.toFixed(0) }} Pa ({{ totalPressureLossBar.toFixed(3) }} bar)</div>
          </div>
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div class="text-sm font-medium text-blue-800">Estimation ventilateurs grand gabarit</div>
            <p class="text-xs text-blue-700 mt-1">
              Pour un ventilateur de ~40 000 m³/h nominal :
              <strong>{{ nbVentilators }} ventilateur(s)</strong> en batterie devant le portail.
            </p>
          </div>
        </div>
      </div>

      <!-- Hydraulic relay -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Relais longue distance</h3>
        </div>
        <div class="p-6 pt-0 space-y-5">
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Distance au foyer</label>
              <span class="text-lg font-bold text-primary">{{ distanceToFire }} m</span>
            </div>
            <input type="range" [(ngModel)]="distanceToFire" min="50" max="3000" step="50"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>50 m</span>
              <span>3 000 m</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Débit lance</label>
              <span class="text-lg font-bold text-primary">{{ lanceFlow }} L/min</span>
            </div>
            <input type="range" [(ngModel)]="lanceFlow" min="100" max="1000" step="50"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>100 L/min</span>
              <span>1 000 L/min</span>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Diamètre tuyaux</label>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="hoseDiameter = 70"
                class="py-2.5 rounded-lg border text-sm font-medium transition-colors"
                [ngClass]="hoseDiameter === 70 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                70 mm
              </button>
              <button (click)="hoseDiameter = 110"
                class="py-2.5 rounded-lg border text-sm font-medium transition-colors"
                [ngClass]="hoseDiameter === 110 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-muted-foreground'">
                110 mm
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Pression max tuyaux</label>
              <span class="text-lg font-bold text-primary">{{ maxHosePressure }} bar</span>
            </div>
            <input type="range" [(ngModel)]="maxHosePressure" min="10" max="25" step="1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>10 bar</span>
              <span>25 bar</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Résultats hydrauliques</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">PDC par 100 m</div>
              <div class="text-xl font-bold text-primary">{{ pdcPer100m.toFixed(2) }} bar</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">PDC totale</div>
              <div class="text-xl font-bold text-red-600">{{ totalHydraulicLoss.toFixed(1) }} bar</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Pression refoulement requise</div>
              <div class="text-xl font-bold" [ngClass]="totalRefoulement > maxHosePressure ? 'text-red-600' : 'text-emerald-600'">
                {{ totalRefoulement.toFixed(1) }} bar
              </div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Motopompes en relais</div>
              <div class="text-xl font-bold text-primary">{{ nbRelays }}</div>
            </div>
          </div>

          <div *ngIf="totalRefoulement > maxHosePressure" class="rounded-lg border border-red-300 bg-red-50 p-3">
            <span class="text-red-600 font-bold text-sm">⚠️ Pression requise dépasse la limite d'épreuve</span>
            <p class="text-xs text-red-800 mt-1">
              Intercaler {{ nbRelays }} motopompe(s) en relais.
              Espacement critique : tous les {{ relaySpacing.toFixed(0) }} m.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TunnelAeraulicsComponent {
  tunnelWidth: number = 8;
  tunnelHeight: number = 4.5;
  tunnelLength: number = 500;
  criticalVelocity: number = 3.5;
  lambda: number = 0.025;

  distanceToFire: number = 800;
  lanceFlow: number = 500;
  hoseDiameter: number = 110;
  maxHosePressure: number = 15;

  get tunnelSection(): number {
    return this.tunnelWidth * this.tunnelHeight;
  }

  get hydraulicDiameter(): number {
    return (4 * this.tunnelWidth * this.tunnelHeight) / (2 * (this.tunnelWidth + this.tunnelHeight));
  }

  get requiredFlow(): number {
    return this.tunnelSection * this.criticalVelocity * 3600;
  }

  get pressureLoss(): number {
    if (this.hydraulicDiameter === 0) return 0;
    const rho = 1.2;
    return (this.lambda / this.hydraulicDiameter) * 0.5 * rho * this.criticalVelocity * this.criticalVelocity;
  }

  get totalPressureLoss(): number {
    return this.pressureLoss * this.tunnelLength;
  }

  get totalPressureLossBar(): number {
    return this.totalPressureLoss / 100000;
  }

  get nbVentilators(): number {
    const nominalPerUnit = 40000;
    return Math.max(1, Math.ceil(this.requiredFlow / nominalPerUnit));
  }

  get pdcPer100m(): number {
    const flowFactor = (this.lanceFlow / 500);
    if (this.hoseDiameter === 70) return 1.0 * flowFactor * flowFactor;
    return 0.1 * flowFactor * flowFactor;
  }

  get totalHydraulicLoss(): number {
    return this.pdcPer100m * (this.distanceToFire / 100);
  }

  get totalRefoulement(): number {
    return this.totalHydraulicLoss + 6;
  }

  get relaySpacing(): number {
    if (this.pdcPer100m <= 0) return 0;
    const maxPdcPerRelay = this.maxHosePressure - 6;
    return (maxPdcPerRelay / this.pdcPer100m) * 100;
  }

  get nbRelays(): number {
    if (this.totalRefoulement <= this.maxHosePressure) return 0;
    if (this.relaySpacing <= 0) return 0;
    return Math.ceil(this.distanceToFire / this.relaySpacing) - 1;
  }
}
