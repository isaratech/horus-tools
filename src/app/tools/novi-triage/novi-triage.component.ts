import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TriageCategory = 'UR' | 'UA' | 'DCD' | null;

interface TriageResult {
  sinusId: string;
  category: TriageCategory;
  sex: string;
  ageApprox: string;
  timestamp: Date;
}

@Component({
  selector: 'app-novi-triage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Triage de Masse — NOVI</h3>
          <p class="text-sm text-muted-foreground">Algorithme START / JumpSTART — Catégorisation rapide</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Patient type -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type de victime</label>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="patientType = 'adult'; resetTriage()"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="patientType === 'adult' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'">
                Adulte (START)
              </button>
              <button (click)="patientType = 'child'; resetTriage()"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="patientType === 'child' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'">
                Enfant (JumpSTART)
              </button>
            </div>
          </div>

          <!-- SINUS ID -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">N° SINUS (optionnel)</label>
            <input type="text" [(ngModel)]="sinusId"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Scanner ou saisir le numéro SINUS">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none">Sexe</label>
              <select [(ngModel)]="sex"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">—</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
                <option value="I">Indéterminé</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none">Âge approx.</label>
              <input type="text" [(ngModel)]="ageApprox"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Ex : 30 ans">
            </div>
          </div>
        </div>
      </div>

      <!-- Decision tree -->
      <div *ngIf="patientType" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Arbre décisionnel</h3>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Step 1: Walking -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">1. La victime peut-elle marcher ?</label>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="canWalk = true; onWalkAnswer()"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="canWalk === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                Oui
              </button>
              <button (click)="canWalk = false; onWalkAnswer()"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="canWalk === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                Non
              </button>
            </div>
          </div>

          <!-- Step 2: Breathing -->
          <div *ngIf="canWalk === false" class="space-y-2">
            <label class="text-sm font-medium leading-none">2. La victime respire-t-elle ?</label>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="isBreathing = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="isBreathing === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                Oui
              </button>
              <button (click)="isBreathing = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="isBreathing === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                Non (Apnée)
              </button>
            </div>
          </div>

          <!-- Step 2b: Airway cleared -->
          <div *ngIf="canWalk === false && isBreathing === false" class="space-y-2">
            <label class="text-sm font-medium leading-none">2b. Après libération des VAS, respire-t-elle ?</label>
            <div *ngIf="patientType === 'child'" class="text-xs text-amber-600 mb-1">
              ⚠️ Enfant : réaliser 5 insufflations de sauvetage avant classification.
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="breathesAfterAirway = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="breathesAfterAirway === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                Oui → UA
              </button>
              <button (click)="breathesAfterAirway = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="breathesAfterAirway === false ? 'bg-gray-600 text-white' : 'bg-background hover:bg-muted'">
                Non → DCD
              </button>
            </div>
          </div>

          <!-- Step 3: Respiratory rate -->
          <div *ngIf="canWalk === false && isBreathing === true" class="space-y-2">
            <label class="text-sm font-medium leading-none">3. Fréquence respiratoire</label>
            <div *ngIf="patientType === 'adult'" class="grid grid-cols-2 gap-2">
              <button (click)="respRateNormal = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="respRateNormal === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                > 30 mvmts/min → UA
              </button>
              <button (click)="respRateNormal = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="respRateNormal === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                ≤ 30 mvmts/min
              </button>
            </div>
            <div *ngIf="patientType === 'child'" class="grid grid-cols-2 gap-2">
              <button (click)="respRateNormal = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="respRateNormal === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                &lt; 15 ou > 45 → UA
              </button>
              <button (click)="respRateNormal = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="respRateNormal === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                15–45 mvmts/min
              </button>
            </div>
          </div>

          <!-- Step 4: Perfusion -->
          <div *ngIf="canWalk === false && isBreathing === true && respRateNormal === true" class="space-y-2">
            <label class="text-sm font-medium leading-none">4. Perfusion périphérique</label>
            <p class="text-xs text-muted-foreground">Pouls radial palpable ET TRC &lt; 2 secondes ?</p>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="perfusionOk = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="perfusionOk === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                Oui (Normale)
              </button>
              <button (click)="perfusionOk = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="perfusionOk === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                Non → UA
              </button>
            </div>
          </div>

          <!-- Step 5: Consciousness -->
          <div *ngIf="canWalk === false && isBreathing === true && respRateNormal === true && perfusionOk === true" class="space-y-2">
            <label class="text-sm font-medium leading-none">5. État de conscience</label>
            <p class="text-xs text-muted-foreground">Obéit à des ordres simples ?</p>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="obeysCommands = true"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="obeysCommands === true ? 'bg-emerald-600 text-white' : 'bg-background hover:bg-muted'">
                Oui → UR
              </button>
              <button (click)="obeysCommands = false"
                class="h-10 rounded-md border text-sm font-medium transition-colors"
                [ngClass]="obeysCommands === false ? 'bg-red-600 text-white' : 'bg-background hover:bg-muted'">
                Non → UA
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div *ngIf="currentCategory" class="rounded-lg p-4 text-center"
        [ngClass]="{
          'border-2 border-emerald-400 bg-emerald-50': currentCategory === 'UR',
          'border-2 border-red-400 bg-red-50': currentCategory === 'UA',
          'border-2 border-gray-400 bg-gray-100': currentCategory === 'DCD'
        }">
        <div class="text-sm font-medium text-muted-foreground">Catégorie de triage</div>
        <div class="text-3xl font-bold mt-1" [ngClass]="{
          'text-emerald-700': currentCategory === 'UR',
          'text-red-700': currentCategory === 'UA',
          'text-gray-700': currentCategory === 'DCD'
        }">
          {{ categoryLabel }}
        </div>
        <div class="text-xs mt-1 text-muted-foreground">{{ categoryDescription }}</div>

        <div class="flex gap-2 justify-center mt-3">
          <button (click)="saveAndReset()"
            class="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Enregistrer & Suivant
          </button>
          <button (click)="fullReset()"
            class="h-9 px-4 rounded-md border text-sm font-medium hover:bg-muted">
            Réinitialiser
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div *ngIf="results.length > 0" class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Bilan provisoire NOVI</h3>
          <p class="text-sm text-muted-foreground">{{ results.length }} victime(s) triée(s)</p>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="rounded-lg border border-red-200 bg-red-50 p-3">
              <div class="text-2xl font-bold text-red-700">{{ countUA }}</div>
              <div class="text-xs text-red-600">UA (Rouge)</div>
            </div>
            <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <div class="text-2xl font-bold text-emerald-700">{{ countUR }}</div>
              <div class="text-xs text-emerald-600">UR (Vert)</div>
            </div>
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div class="text-2xl font-bold text-gray-700">{{ countDCD }}</div>
              <div class="text-xs text-gray-600">DCD (Noir)</div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-muted">
                <tr>
                  <th class="px-3 py-2 text-left font-medium">SINUS</th>
                  <th class="px-3 py-2 text-left font-medium">Cat.</th>
                  <th class="px-3 py-2 text-left font-medium">Sexe</th>
                  <th class="px-3 py-2 text-left font-medium">Âge</th>
                  <th class="px-3 py-2 text-left font-medium">Heure</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of results" class="border-b">
                  <td class="px-3 py-2 font-mono text-xs">{{ r.sinusId || '—' }}</td>
                  <td class="px-3 py-2 font-bold" [ngClass]="{
                    'text-red-700': r.category === 'UA',
                    'text-emerald-700': r.category === 'UR',
                    'text-gray-600': r.category === 'DCD'
                  }">{{ r.category }}</td>
                  <td class="px-3 py-2">{{ r.sex || '—' }}</td>
                  <td class="px-3 py-2">{{ r.ageApprox || '—' }}</td>
                  <td class="px-3 py-2 text-xs">{{ r.timestamp | date:'HH:mm' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button (click)="copyReport()"
            class="w-full h-9 rounded-md border text-sm font-medium hover:bg-muted">
            📋 Copier le bilan radio
          </button>
        </div>
      </div>
    </div>
  `
})
export class NoviTriageComponent {
  patientType: 'adult' | 'child' | null = null;
  sinusId: string = '';
  sex: string = '';
  ageApprox: string = '';

  canWalk: boolean | null = null;
  isBreathing: boolean | null = null;
  breathesAfterAirway: boolean | null = null;
  respRateNormal: boolean | null = null;
  perfusionOk: boolean | null = null;
  obeysCommands: boolean | null = null;

  results: TriageResult[] = [];

  get currentCategory(): TriageCategory {
    if (this.canWalk === true) return 'UR';
    if (this.canWalk === false && this.isBreathing === false && this.breathesAfterAirway === true) return 'UA';
    if (this.canWalk === false && this.isBreathing === false && this.breathesAfterAirway === false) return 'DCD';
    if (this.canWalk === false && this.isBreathing === true && this.respRateNormal === false) return 'UA';
    if (this.canWalk === false && this.isBreathing === true && this.respRateNormal === true && this.perfusionOk === false) return 'UA';
    if (this.canWalk === false && this.isBreathing === true && this.respRateNormal === true && this.perfusionOk === true && this.obeysCommands === true) return 'UR';
    if (this.canWalk === false && this.isBreathing === true && this.respRateNormal === true && this.perfusionOk === true && this.obeysCommands === false) return 'UA';
    return null;
  }

  get categoryLabel(): string {
    switch (this.currentCategory) {
      case 'UA': return 'URGENCE ABSOLUE (Rouge)';
      case 'UR': return 'URGENCE RELATIVE (Vert)';
      case 'DCD': return 'DÉCÉDÉ (Noir)';
      default: return '';
    }
  }

  get categoryDescription(): string {
    switch (this.currentCategory) {
      case 'UA': return 'Prise en charge immédiate — Orientation PMA';
      case 'UR': return 'Prise en charge différée — PRV';
      case 'DCD': return 'Dépôt mortuaire';
      default: return '';
    }
  }

  get countUA(): number { return this.results.filter(r => r.category === 'UA').length; }
  get countUR(): number { return this.results.filter(r => r.category === 'UR').length; }
  get countDCD(): number { return this.results.filter(r => r.category === 'DCD').length; }

  onWalkAnswer(): void {
    this.isBreathing = null;
    this.breathesAfterAirway = null;
    this.respRateNormal = null;
    this.perfusionOk = null;
    this.obeysCommands = null;
  }

  resetTriage(): void {
    this.canWalk = null;
    this.onWalkAnswer();
  }

  saveAndReset(): void {
    if (this.currentCategory) {
      this.results.push({
        sinusId: this.sinusId,
        category: this.currentCategory,
        sex: this.sex,
        ageApprox: this.ageApprox,
        timestamp: new Date()
      });
    }
    this.sinusId = '';
    this.sex = '';
    this.ageApprox = '';
    this.resetTriage();
  }

  fullReset(): void {
    this.sinusId = '';
    this.sex = '';
    this.ageApprox = '';
    this.resetTriage();
  }

  copyReport(): void {
    const lines = [
      `BILAN PROVISOIRE NOVI — ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
      `Total : ${this.results.length} victime(s)`,
      `UA : ${this.countUA} | UR : ${this.countUR} | DCD : ${this.countDCD}`,
      '',
      ...this.results.map((r, i) =>
        `${i + 1}. ${r.category} | SINUS: ${r.sinusId || 'N/A'} | ${r.sex || '?'} | ~${r.ageApprox || '?'} | ${r.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
      )
    ];
    navigator.clipboard.writeText(lines.join('\n')).catch(() => {});
  }
}
