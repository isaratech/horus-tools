import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface VitalRange {
  label: string;
  fc: string;
  fr: string;
  pas: string;
  ageMin: number;
  ageMax: number;
}

@Component({
  selector: 'app-pediatric-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Input card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Assistant Pédiatrique Intégré</h3>
          <p class="text-sm text-muted-foreground">Constantes vitales, seuils critiques et matériel adapté</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Mode toggle -->
          <div class="flex rounded-lg border overflow-hidden">
            <button (click)="inputMode = 'age'"
              class="flex-1 py-2.5 text-sm font-medium transition-colors"
              [ngClass]="inputMode === 'age' ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground'">
              Âge connu
            </button>
            <button (click)="inputMode = 'weight'"
              class="flex-1 py-2.5 text-sm font-medium transition-colors"
              [ngClass]="inputMode === 'weight' ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground'">
              Poids connu
            </button>
          </div>

          <!-- Age slider -->
          <div *ngIf="inputMode === 'age'" class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Âge</label>
              <span class="text-lg font-bold text-primary">{{ formatAge(age) }}</span>
            </div>
            <input type="range" [(ngModel)]="age" min="0" max="18" step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>Naissance</span>
              <span>18 ans</span>
            </div>
          </div>

          <!-- Weight slider -->
          <div *ngIf="inputMode === 'weight'" class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">Poids</label>
              <span class="text-lg font-bold text-primary">{{ weight }} kg</span>
            </div>
            <input type="range" [(ngModel)]="weight" min="1" max="80" step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>1 kg</span>
              <span>80 kg</span>
            </div>
          </div>

          <!-- PAS measured (optional) -->
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <label class="text-sm font-medium leading-none">PAS mesurée (mmHg) — optionnel</label>
              <span *ngIf="measuredPAS" class="text-sm font-bold text-primary">{{ measuredPAS }} mmHg</span>
            </div>
            <input type="range" [(ngModel)]="measuredPAS" min="30" max="200" step="1"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-muted-foreground">
              <span>30</span>
              <span>200 mmHg</span>
            </div>
            <button *ngIf="measuredPAS" (click)="measuredPAS = null"
              class="text-xs text-muted-foreground underline">Effacer la PAS</button>
          </div>
        </div>
      </div>

      <!-- Weight estimation (age mode) -->
      <div *ngIf="inputMode === 'age' && age >= 1" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Estimation du poids</h3>
        </div>
        <div class="p-6 pt-0 space-y-2">
          <div *ngIf="age >= 1 && age <= 5" class="flex justify-between items-center rounded-lg border p-3">
            <span class="text-sm">Formule 2×(Âge+5)</span>
            <span class="text-lg font-bold text-primary">{{ weightFormula1 }} kg</span>
          </div>
          <div *ngIf="age >= 5 && age <= 14" class="flex justify-between items-center rounded-lg border p-3">
            <span class="text-sm">Formule 4×Âge</span>
            <span class="text-lg font-bold text-primary">{{ weightFormula2 }} kg</span>
          </div>
          <div *ngIf="age >= 1" class="flex justify-between items-center rounded-lg border p-3">
            <span class="text-sm">Formule (Âge×2)+9</span>
            <span class="text-lg font-bold text-primary">{{ weightFormula3 }} kg</span>
          </div>
        </div>
      </div>

      <!-- Age estimation (weight mode) -->
      <div *ngIf="inputMode === 'weight'" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Âge estimé à partir du poids</h3>
        </div>
        <div class="p-6 pt-0 space-y-2">
          <div class="flex justify-between items-center rounded-lg border p-3">
            <span class="text-sm">Âge estimé</span>
            <span class="text-lg font-bold text-primary">{{ formatAge(estimatedAge) }}</span>
          </div>
          <p class="text-xs text-muted-foreground">Estimation basée sur la formule inverse (Poids-9)/2. Valeur indicative.</p>
        </div>
      </div>

      <!-- Hypotension alert -->
      <div *ngIf="measuredPAS && isHypotensive" class="rounded-lg border border-red-300 bg-red-50 p-4">
        <div class="flex items-center gap-2">
          <span class="text-red-600 font-bold text-lg">⚠️ ALERTE HYPOTENSION</span>
        </div>
        <p class="text-sm text-red-800 mt-1">
          PAS mesurée ({{ measuredPAS }} mmHg) inférieure au seuil critique ({{ hypotensionThreshold }} mmHg).
          <strong>État de choc imminent — Demander renfort SMUR.</strong>
        </p>
      </div>

      <!-- Vital signs table -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Normes physiologiques pédiatriques</h3>
        </div>
        <div class="p-6 pt-0 overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Tranche d'âge</th>
                <th class="px-3 py-2 text-left font-medium">FC (bpm)</th>
                <th class="px-3 py-2 text-left font-medium">FR</th>
                <th class="px-3 py-2 text-left font-medium">PAS</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of vitalRanges" class="border-b"
                [ngClass]="{'bg-primary/5 font-semibold': isCurrentRange(r)}">
                <td class="px-3 py-2">{{ r.label }}</td>
                <td class="px-3 py-2">{{ r.fc }}</td>
                <td class="px-3 py-2">{{ r.fr }}</td>
                <td class="px-3 py-2">{{ r.pas }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Intubation card -->
      <div *ngIf="effectiveAge >= 1" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Matériel voies aériennes</h3>
        </div>
        <div class="p-6 pt-0 space-y-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Sonde sans ballonnet (Khine)</div>
              <div class="text-xl font-bold text-primary">{{ tubeSizePlain }} mm</div>
              <div class="text-xs text-muted-foreground">(Âge/4) + 3</div>
            </div>
            <div class="rounded-lg border p-3">
              <div class="text-xs text-muted-foreground">Sonde avec ballonnet (Hatch-Coté)</div>
              <div class="text-xl font-bold text-primary">{{ tubeSizeCuffed }} mm</div>
              <div class="text-xs text-muted-foreground">(Âge/4) + 4</div>
            </div>
            <div class="rounded-lg border p-3 sm:col-span-2">
              <div class="text-xs text-muted-foreground">Profondeur d'insertion labiale</div>
              <div class="text-xl font-bold text-primary">{{ insertionDepth }} cm</div>
              <div class="text-xs text-muted-foreground">(Diamètre sonde × 3) + 1</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Glasgow pédiatrique < 2 ans -->
      <div *ngIf="effectiveAge < 2" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Glasgow pédiatrique (&lt; 2 ans)</h3>
          <p class="text-sm text-muted-foreground">Adaptation de la réponse verbale</p>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Score</th>
                <th class="px-3 py-2 text-left font-medium">Réponse verbale (&lt; 2 ans)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold">5</td><td class="px-3 py-2">Gazouillis, sourires</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">4</td><td class="px-3 py-2">Pleurs consolables</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">3</td><td class="px-3 py-2">Cris persistants à la douleur</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">2</td><td class="px-3 py-2">Gémissements</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">1</td><td class="px-3 py-2">Aucune</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PediatricAssistantComponent {
  inputMode: 'age' | 'weight' = 'age';
  age: number = 3;
  weight: number = 15;
  measuredPAS: number | null = null;

  vitalRanges: VitalRange[] = [
    { label: 'Nouveau-né (< 1 mois)', fc: '100 - 205', fr: '30 - 60', pas: '60 - 94', ageMin: 0, ageMax: 0.08 },
    { label: 'Nourrisson (1 à 12 mois)', fc: '100 - 190', fr: '30 - 60', pas: '86 - 106', ageMin: 0.08, ageMax: 1 },
    { label: 'Enfant (2 à 5 ans)', fc: '60 - 140', fr: '22 - 40', pas: '89 - 112', ageMin: 2, ageMax: 5 },
    { label: 'Enfant (6 à 12 ans)', fc: '60 - 140', fr: '18 - 30', pas: '97 - 120', ageMin: 6, ageMax: 12 },
    { label: 'Adolescent (≥ 14 ans)', fc: '60 - 100', fr: '12 - 16', pas: '110 - 131', ageMin: 14, ageMax: 18 },
  ];

  formatAge(a: number): string {
    if (a < 0.08) return 'Nouveau-né';
    if (a < 1) return `${Math.round(a * 12)} mois`;
    if (a % 1 === 0) return `${a} an${a > 1 ? 's' : ''}`;
    return `${Math.floor(a)} ans ½`;
  }

  /** Reverse-estimate age from weight using (W-9)/2 */
  get estimatedAge(): number {
    const a = (this.weight - 9) / 2;
    return Math.max(0, Math.round(a * 2) / 2);
  }

  /** The age to use for all calculations — real age or estimated from weight */
  get effectiveAge(): number {
    return this.inputMode === 'age' ? this.age : this.estimatedAge;
  }

  isCurrentRange(r: VitalRange): boolean {
    const a = this.effectiveAge;
    return a >= r.ageMin && a <= r.ageMax;
  }

  get weightFormula1(): number { return 2 * (this.age + 5); }
  get weightFormula2(): number { return 4 * this.age; }
  get weightFormula3(): number { return (this.age * 2) + 9; }

  get hypotensionThreshold(): number {
    const a = this.effectiveAge;
    if (a < 0.08) return 60;
    if (a < 1) return 70;
    return 70 + (2 * a);
  }

  get isHypotensive(): boolean {
    if (this.measuredPAS === null) return false;
    return this.measuredPAS < this.hypotensionThreshold;
  }

  get tubeSizePlain(): string {
    const a = this.effectiveAge;
    if (a < 1) return '—';
    return ((a / 4) + 3).toFixed(1);
  }

  get tubeSizeCuffed(): string {
    const a = this.effectiveAge;
    if (a < 1) return '—';
    return ((a / 4) + 4).toFixed(1);
  }

  get insertionDepth(): string {
    const a = this.effectiveAge;
    if (a < 1) return '—';
    const plain = (a / 4) + 3;
    return ((plain * 3) + 1).toFixed(1);
  }
}
