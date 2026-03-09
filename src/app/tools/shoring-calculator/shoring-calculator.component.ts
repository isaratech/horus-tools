import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shoring-calculator',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Calcul de Calage / Étaiement</h3>
          <p class="text-sm text-muted-foreground">Charge admissible estimée</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Height -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Hauteur de levage : <strong>{{ height }} cm</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [(ngModel)]="height" min="0" max="100" step="5" class="flex-1">
              <input type="number" [(ngModel)]="height" min="0" max="100" step="5"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Material type -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Type de matériel</label>
            <select [(ngModel)]="materialType"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="wood">Cales bois (4x4, empilement croisé)</option>
              <option value="bag">Coussin de levage haute pression</option>
            </select>
          </div>
        </div>
        <div class="p-6 pt-0">
          <!-- Result alert -->
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Charge Admissible Estimée</div>
            <div class="text-3xl font-bold">{{ admissibleLoad | number:'1.1-1' }} kg</div>
            <div class="text-xs mt-1">{{ warningMessage }}</div>
          </div>
        </div>
      </div>

      <!-- Safety card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Rappel sécurité</h3>
        </div>
        <div class="p-6 pt-0">
          <ul class="list-disc pl-5 text-sm space-y-2 leading-relaxed">
            <li>Toujours caler avant de lever</li>
            <li>Progression par paliers de 5 cm max</li>
            <li>Ne jamais travailler sous une charge non calée</li>
            <li>Maintenir une surface d'appui stable (plaque)</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class ShoringCalculatorComponent {
  height = 20;
  materialType = 'wood';

  get admissibleLoad(): number {
    if (this.materialType === 'wood') {
      return 6000;
    } else {
      const maxLift = 50;
      const maxCap = 20000;
      if (this.height >= maxLift) return 0;
      return maxCap * (1 - (this.height / maxLift));
    }
  }

  get warningMessage(): string {
    if (this.materialType === 'wood') {
      return this.height > 30
        ? 'Hauteur dépasse 3x la largeur de la base — Risque instabilité !'
        : 'Cales bois 4x4 en empilement croisé (Box Crib)';
    }
    return 'Coussin 20T / 50 cm max. Capacité décroît avec la hauteur.';
  }
}
