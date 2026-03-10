import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ApgarCriterion {
  label: string;
  acronym: string;
  options: { score: number; text: string }[];
}

@Component({
  selector: 'app-apgar-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Score d'APGAR</h3>
          <p class="text-sm text-muted-foreground">Évaluation néonatale à 1, 5 et 10 minutes de vie</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Birth time -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Heure de naissance</label>
            <div class="flex gap-2">
              <input type="time" [(ngModel)]="birthTime"
                class="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <button (click)="setBirthTimeNow()"
                class="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                Maintenant
              </button>
            </div>
          </div>

          <!-- Timer -->
          <div *ngIf="birthTime" class="rounded-lg border p-3 text-center">
            <div class="text-xs text-muted-foreground">Temps écoulé depuis la naissance</div>
            <div class="text-2xl font-bold font-mono">{{ elapsedDisplay }}</div>
            <div class="flex justify-center gap-2 mt-2">
              <span class="text-xs px-2 py-0.5 rounded-full"
                [ngClass]="elapsedMinutes >= 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'">
                1 min {{ elapsedMinutes >= 1 ? '✓' : '' }}
              </span>
              <span class="text-xs px-2 py-0.5 rounded-full"
                [ngClass]="elapsedMinutes >= 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'">
                5 min {{ elapsedMinutes >= 5 ? '✓' : '' }}
              </span>
              <span class="text-xs px-2 py-0.5 rounded-full"
                [ngClass]="elapsedMinutes >= 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'">
                10 min {{ elapsedMinutes >= 10 ? '✓' : '' }}
              </span>
            </div>
          </div>

          <!-- Criteria -->
          <div *ngFor="let c of criteria; let i = index" class="space-y-2">
            <label class="text-sm font-medium leading-none">{{ c.acronym }} — {{ c.label }}</label>
            <select [(ngModel)]="scores[i]"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option *ngFor="let o of c.options" [ngValue]="o.score">{{ o.score }} — {{ o.text }}</option>
            </select>
          </div>
        </div>

        <div class="p-6 pt-0">
          <div class="rounded-lg p-4 text-center"
            [ngClass]="{
              'border border-red-200 bg-red-50': totalScore < 4,
              'border border-amber-200 bg-amber-50': totalScore >= 4 && totalScore < 7,
              'border border-emerald-200 bg-emerald-50': totalScore >= 7
            }">
            <div class="text-sm font-medium text-muted-foreground">Score APGAR Total</div>
            <div class="text-3xl font-bold">{{ totalScore }} <span class="text-lg font-normal text-muted-foreground">/ 10</span></div>
            <div class="text-xs mt-1">
              <span *ngIf="totalScore >= 7">Adaptation normale</span>
              <span *ngIf="totalScore >= 4 && totalScore < 7">Difficultés d'adaptation modérées</span>
              <span *ngIf="totalScore < 4">Détresse sévère — Réanimation néonatale</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert < 7 -->
      <div *ngIf="totalScore < 7" class="rounded-lg border border-red-300 bg-red-50 p-4">
        <div class="text-red-600 font-bold">⚠️ Score &lt; 7 — Protocole de réanimation néonatale</div>
        <ul class="text-sm text-red-800 mt-2 space-y-1 list-disc list-inside">
          <li>Désobstruction des voies aériennes supérieures</li>
          <li>Stimulation tactile (séchage vigoureux, friction plantaire)</li>
          <li>Ventilation en pression positive (40-60 insufflations/min)</li>
          <li>Si FC &lt; 60 bpm après 30s de ventilation : massage cardiaque (ratio 3:1)</li>
        </ul>
      </div>

      <!-- Reference -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Grille de cotation</h3>
        </div>
        <div class="p-6 pt-0 overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Paramètre</th>
                <th class="px-3 py-2 text-center font-medium">0</th>
                <th class="px-3 py-2 text-center font-medium">1</th>
                <th class="px-3 py-2 text-center font-medium">2</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="px-3 py-2 font-medium">Apparence</td>
                <td class="px-3 py-2 text-center text-xs">Pâle / entièrement bleu</td>
                <td class="px-3 py-2 text-center text-xs">Corps rose, extrémités bleues</td>
                <td class="px-3 py-2 text-center text-xs">Entièrement rose</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2 font-medium">Pouls</td>
                <td class="px-3 py-2 text-center text-xs">Absent</td>
                <td class="px-3 py-2 text-center text-xs">&lt; 100 bpm</td>
                <td class="px-3 py-2 text-center text-xs">&gt; 100 bpm</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2 font-medium">Grimace</td>
                <td class="px-3 py-2 text-center text-xs">Aucune réponse</td>
                <td class="px-3 py-2 text-center text-xs">Légère grimace</td>
                <td class="px-3 py-2 text-center text-xs">Toux / pleurs vigoureux</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2 font-medium">Activité</td>
                <td class="px-3 py-2 text-center text-xs">Flasque</td>
                <td class="px-3 py-2 text-center text-xs">Légère flexion</td>
                <td class="px-3 py-2 text-center text-xs">Mouvements actifs</td>
              </tr>
              <tr class="border-b">
                <td class="px-3 py-2 font-medium">Respiration</td>
                <td class="px-3 py-2 text-center text-xs">Absente</td>
                <td class="px-3 py-2 text-center text-xs">Lente, irrégulière</td>
                <td class="px-3 py-2 text-center text-xs">Régulière, pleurs vigoureux</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ApgarScoreComponent {
  birthTime: string = '';
  scores: number[] = [2, 2, 2, 2, 2];
  private timerInterval: any;
  elapsedDisplay: string = '00:00';
  elapsedMinutes: number = 0;

  criteria: ApgarCriterion[] = [
    {
      label: 'Couleur de peau', acronym: 'Apparence',
      options: [
        { score: 0, text: 'Pâle ou entièrement bleu' },
        { score: 1, text: 'Corps rose, extrémités bleues (acrocyanose)' },
        { score: 2, text: 'Entièrement rose' },
      ]
    },
    {
      label: 'Fréquence cardiaque', acronym: 'Pouls',
      options: [
        { score: 0, text: 'Absent' },
        { score: 1, text: 'Inférieur à 100 bpm' },
        { score: 2, text: 'Supérieur à 100 bpm' },
      ]
    },
    {
      label: 'Réactivité', acronym: 'Grimace',
      options: [
        { score: 0, text: 'Aucune réponse à la stimulation' },
        { score: 1, text: 'Légère grimace ou mouvement faible' },
        { score: 2, text: 'Toux, éternuement ou pleurs vigoureux' },
      ]
    },
    {
      label: 'Tonus musculaire', acronym: 'Activité',
      options: [
        { score: 0, text: 'Flasque, hypotonique' },
        { score: 1, text: 'Légère flexion des extrémités' },
        { score: 2, text: 'Mouvements actifs, tonus vigoureux' },
      ]
    },
    {
      label: 'Effort respiratoire', acronym: 'Respiration',
      options: [
        { score: 0, text: 'Absente' },
        { score: 1, text: 'Lente, irrégulière, gémissements' },
        { score: 2, text: 'Régulière, pleurs vigoureux' },
      ]
    },
  ];

  get totalScore(): number {
    return this.scores.reduce((a, b) => a + b, 0);
  }

  setBirthTimeNow(): void {
    const now = new Date();
    this.birthTime = now.toTimeString().substring(0, 5);
    this.startTimer();
  }

  private startTimer(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => this.updateElapsed(), 1000);
    this.updateElapsed();
  }

  private updateElapsed(): void {
    if (!this.birthTime) return;
    const [h, m] = this.birthTime.split(':').map(Number);
    const now = new Date();
    const birth = new Date();
    birth.setHours(h, m, 0, 0);
    const diff = Math.max(0, Math.floor((now.getTime() - birth.getTime()) / 1000));
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    this.elapsedMinutes = mins;
    this.elapsedDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  ngOnInit(): void {
    if (this.birthTime) this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}
