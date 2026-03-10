import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-operational-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Générateur de Messages Opérationnels</h3>
          <p class="text-sm text-muted-foreground">Structuration METHANE — Bilan COS normalisé</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Je suis -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">🎙️ JE SUIS</label>
            <input type="text" [(ngModel)]="indicatif"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Indicatif radio (ex : FPT ALPHA 01)">
            <input type="text" [(ngModel)]="fonction"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Fonction (ex : COS)">
            <input type="text" [(ngModel)]="localisation"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Localisation précise">
          </div>

          <!-- Je vois -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">👁️ JE VOIS</label>
            <textarea [(ngModel)]="jeVois" rows="3"
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Ambiance, nature du sinistre, typologie..."></textarea>
          </div>

          <!-- Je prévois -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">🔮 JE PRÉVOIS</label>
            <textarea [(ngModel)]="jePrevois" rows="2"
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Menaces imminentes, risques de propagation, évolutions..."></textarea>
          </div>

          <!-- Je fais -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">🔧 JE FAIS</label>
            <textarea [(ngModel)]="jeFais" rows="3"
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Actions engagées, sauvetages, établissements en cours d'établissement ou en manœuvre..."></textarea>
          </div>

          <!-- Je demande -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">📞 JE DEMANDE</label>
            <textarea [(ngModel)]="jeDemande" rows="2"
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Renforts qualitatifs ou quantitatifs..."></textarea>
          </div>

          <!-- Bilan victimaire -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">🩺 BILAN VICTIMAIRE</label>
            <div class="grid grid-cols-2 gap-2">
              <div class="space-y-1">
                <label class="text-xs text-muted-foreground">Nombre de victimes</label>
                <input type="number" [(ngModel)]="nbVictimes" min="0"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              </div>
              <div class="space-y-1">
                <label class="text-xs text-muted-foreground">Nombre d'impliqués</label>
                <input type="number" [(ngModel)]="nbImpliques" min="0"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" [(ngModel)]="bilanDefinitif" id="bilanDef"
                class="h-4 w-4 rounded border-input">
              <label for="bilanDef" class="text-sm">Bilan définitif (dernier message uniquement)</label>
            </div>
          </div>

          <!-- État incendie -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none text-primary">🔥 ÉTAT DE L'INCENDIE</label>
            <select [(ngModel)]="etatFeu"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="">— Non applicable —</option>
              <option value="en_cours">Feu en cours</option>
              <option value="circonscrit">Feu circonscrit (propagations enrayées)</option>
              <option value="maitre">Maître du feu (foyer décroît irréversiblement)</option>
              <option value="foyer_eteint">Foyer principal éteint</option>
              <option value="operations_terminees">Opérations terminées</option>
            </select>
          </div>

          <!-- Message type -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type de message</label>
            <select [(ngModel)]="messageType"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="ambiance">Message d'ambiance (5 premières min)</option>
              <option value="renseignements">Message de renseignements (20 min)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Terminology alerts -->
      <div *ngIf="etatFeu === 'foyer_eteint'" class="rounded-lg border border-amber-300 bg-amber-50 p-3">
        <span class="text-amber-700 font-bold text-sm">⚠️ Terminologie</span>
        <p class="text-xs text-amber-800 mt-1">
          Utiliser « <strong>foyer principal éteint</strong> » plutôt que « feu éteint ».
          Le déblai, le dégarnissage et la ronde de surveillance doivent être mis en œuvre.
          L'intervention n'est clôturée qu'à l'annonce « opérations terminées ».
        </p>
      </div>

      <!-- Generated message -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Message généré</h3>
          <p class="text-sm text-muted-foreground">{{ messageType === 'ambiance' ? 'Message d\'ambiance' : 'Message de renseignements' }}</p>
        </div>
        <div class="p-6 pt-0 space-y-3">
          <div class="rounded-lg border bg-muted/50 p-4 text-sm font-mono whitespace-pre-wrap leading-relaxed">{{ generatedMessage }}</div>
          <button (click)="copyMessage()"
            class="w-full h-9 rounded-md border text-sm font-medium hover:bg-muted">
            📋 Copier le message
          </button>
        </div>
      </div>

      <!-- Reference -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Chronologie des transmissions</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Délai</th>
                <th class="px-3 py-2 text-left font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold">≤ 5 min</td><td class="px-3 py-2">Message d'ambiance</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">≤ 20 min</td><td class="px-3 py-2">Message de renseignements</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">Continu</td><td class="px-3 py-2">Messages de situation</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Fire status reference -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Terminologie incendie</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Terme</th>
                <th class="px-3 py-2 text-left font-medium">Signification</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2 font-bold">Feu circonscrit</td><td class="px-3 py-2">Les propagations sont enrayées</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">Maître du feu</td><td class="px-3 py-2">Le foyer décroît de manière irréversible</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">Foyer principal éteint</td><td class="px-3 py-2">Déblai et surveillance à initier</td></tr>
              <tr class="border-b"><td class="px-3 py-2 font-bold">Opérations terminées</td><td class="px-3 py-2">Clôture définitive de l'intervention</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class OperationalMessageComponent {
  indicatif: string = '';
  fonction: string = '';
  localisation: string = '';
  jeVois: string = '';
  jePrevois: string = '';
  jeFais: string = '';
  jeDemande: string = '';
  nbVictimes: number = 0;
  nbImpliques: number = 0;
  bilanDefinitif: boolean = false;
  etatFeu: string = '';
  messageType: 'ambiance' | 'renseignements' = 'ambiance';

  get etatFeuLabel(): string {
    switch (this.etatFeu) {
      case 'en_cours': return 'Feu en cours';
      case 'circonscrit': return 'Feu circonscrit';
      case 'maitre': return 'Maître du feu';
      case 'foyer_eteint': return 'Foyer principal éteint';
      case 'operations_terminees': return 'Opérations terminées';
      default: return '';
    }
  }

  get generatedMessage(): string {
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const bilanType = this.bilanDefinitif ? 'BILAN DÉFINITIF' : 'BILAN PROVISOIRE';
    const lines: string[] = [
      `=== ${this.messageType === 'ambiance' ? 'MESSAGE D\'AMBIANCE' : 'MESSAGE DE RENSEIGNEMENTS'} ===`,
      `Heure : ${now}`,
      '',
      `JE SUIS : ${this.indicatif || '—'}, ${this.fonction || '—'}`,
      `Localisation : ${this.localisation || '—'}`,
      '',
      `JE VOIS : ${this.jeVois || '—'}`,
      '',
      `JE PRÉVOIS : ${this.jePrevois || '—'}`,
      '',
      `JE FAIS : ${this.jeFais || '—'}`,
    ];

    if (this.etatFeu) {
      lines.push(`État : ${this.etatFeuLabel}`);
    }

    lines.push('');
    lines.push(`JE DEMANDE : ${this.jeDemande || 'Rien à signaler'}`);
    lines.push('');
    lines.push(`${bilanType} : ${this.nbVictimes} victime(s), ${this.nbImpliques} impliqué(s)`);

    return lines.join('\n');
  }

  copyMessage(): void {
    navigator.clipboard.writeText(this.generatedMessage).catch(() => {});
  }
}
