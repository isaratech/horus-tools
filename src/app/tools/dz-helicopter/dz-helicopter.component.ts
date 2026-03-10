import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dz-helicopter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Sécurité DZ Hélicoptère</h3>
          <p class="text-sm text-muted-foreground">Validation et balisage zone de poser — EVASAN</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type d'hélicoptère</label>
            <select [(ngModel)]="heliType"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="ec145">EC145 (Dragon) — Rotor 11 m, L 13 m+, MTOW 3 585 kg</option>
              <option value="h135">H135 — Rotor 10.2 m, L 12.2 m, MTOW 2 950 kg</option>
              <option value="generic">Autre hélicoptère (dimensions génériques)</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Conditions de vol</label>
            <select [(ngModel)]="flightCondition"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="day_vmc">Jour — VMC (préavis ~30 min)</option>
              <option value="night_jvn">Nuit — JVN (préavis ~60 min)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Checklist -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Checklist de validation DZ</h3>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div *ngFor="let item of checklist; let i = index"
            class="flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors"
            [ngClass]="item.checked ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-muted/50'"
            (click)="item.checked = !item.checked">
            <div class="flex items-center justify-center w-6 h-6 rounded border-2 shrink-0 mt-0.5"
              [ngClass]="item.checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-input'">
              <span *ngIf="item.checked" class="text-xs">✓</span>
            </div>
            <div>
              <div class="text-sm font-medium">{{ item.label }}</div>
              <div class="text-xs text-muted-foreground">{{ item.detail }}</div>
            </div>
          </div>

          <!-- Validation result -->
          <div class="rounded-lg p-4 text-center mt-3"
            [ngClass]="allChecked ? 'border border-emerald-200 bg-emerald-50' : 'border border-amber-200 bg-amber-50'">
            <div class="text-sm font-medium text-muted-foreground">Statut DZ</div>
            <div class="text-2xl font-bold" [ngClass]="allChecked ? 'text-emerald-700' : 'text-amber-700'">
              {{ allChecked ? 'DZ VALIDÉE ✅' : checkedCount + ' / ' + checklist.length + ' critères' }}
            </div>
            <div *ngIf="!allChecked" class="text-xs text-amber-600 mt-1">Tous les critères doivent être validés avant le poser.</div>
          </div>
        </div>
      </div>

      <!-- Safety reminders -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Consignes de sécurité au sol</h3>
        </div>
        <div class="p-6 pt-0 space-y-2">
          <div class="rounded-lg border border-red-200 bg-red-50 p-3">
            <span class="text-red-700 font-bold text-sm">🚫 Approche par l'arrière STRICTEMENT INTERDITE</span>
            <p class="text-xs text-red-600 mt-1">Rotor de queue = danger mortel. Cheminement obligatoire par le secteur avant ou le côté aval.</p>
          </div>
          <div class="rounded-lg border p-3">
            <span class="font-medium text-sm">👷 EPI obligatoires</span>
            <p class="text-xs text-muted-foreground mt-1">Casque avec visière baissée, protections auditives. Posture fléchie à l'approche.</p>
          </div>
          <div class="rounded-lg border p-3">
            <span class="font-medium text-sm">🚭 Interdictions</span>
            <p class="text-xs text-muted-foreground mt-1">Interdiction de fumer. Limiter les liaisons radio inutiles (perturbation communications air-sol).</p>
          </div>
          <div class="rounded-lg border p-3">
            <span class="font-medium text-sm">📻 Approche de l'aéronef</span>
            <p class="text-xs text-muted-foreground mt-1">Attendre l'autorisation du pilote. Ne jamais passer sous les pales sans y être invité. Sécuriser tout matériel volant (couvertures, bâches).</p>
          </div>
        </div>
      </div>

      <!-- Reference -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Caractéristiques EC145 (Dragon)</h3>
        </div>
        <div class="p-6 pt-0 overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Paramètre</th>
                <th class="px-3 py-2 text-left font-medium">Valeur</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2">Diamètre rotor principal</td><td class="px-3 py-2 font-bold">11 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2">Longueur hors-tout (rotors tournants)</td><td class="px-3 py-2 font-bold">> 13 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2">MTOW</td><td class="px-3 py-2 font-bold">3 585 kg</td></tr>
              <tr class="border-b"><td class="px-3 py-2">DZ minimale recommandée</td><td class="px-3 py-2 font-bold">25×25 m à 50×50 m</td></tr>
              <tr class="border-b"><td class="px-3 py-2">Préavis jour VMC</td><td class="px-3 py-2 font-bold">~30 min</td></tr>
              <tr class="border-b"><td class="px-3 py-2">Préavis nuit JVN</td><td class="px-3 py-2 font-bold">~60 min</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DzHelicopterComponent {
  heliType: 'ec145' | 'h135' | 'generic' = 'ec145';
  flightCondition: 'day_vmc' | 'night_jvn' = 'day_vmc';

  checklist = [
    { label: 'Aire dégagée de tout obstacle', detail: '25×25 m minimum (50×50 m idéal). Pas d\'arbres, lignes électriques, mobilier urbain.', checked: false },
    { label: 'Pente du terrain acceptable', detail: 'Dévers faible. Un dévers excessif réduit la garde au sol des pales.', checked: false },
    { label: 'Orientation vent identifiée', detail: 'Approche préférentiellement face au vent. Utiliser boussole/manche à air.', checked: false },
    { label: 'Sol stable et porteur', detail: 'Pas de terrain meuble, sable fin, neige profonde. MTOW EC145 : 3 585 kg.', checked: false },
    { label: 'Balisage en place', detail: 'Signalisation visuelle de la DZ (véhicules phares, fumigènes, personnel avec brassard).', checked: false },
    { label: 'Périmètre de sécurité établi', detail: 'Éloigner curieux et personnels non concernés. Sécuriser les objets légers.', checked: false },
    { label: 'Communications air-sol opérationnelles', detail: 'Fréquence radio convenue. Limiter les transmissions parasites.', checked: false },
    { label: 'EPI du personnel au sol vérifiés', detail: 'Casque visière baissée, protections auditives, posture fléchie.', checked: false },
  ];

  get allChecked(): boolean {
    return this.checklist.every(item => item.checked);
  }

  get checkedCount(): number {
    return this.checklist.filter(item => item.checked).length;
  }
}
