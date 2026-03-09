import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gas-converter',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Main card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Convertisseur Gaz ppm / %</h3>
          <p class="text-sm text-muted-foreground">1 % = 10 000 ppm</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- PPM range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Valeur en ppm : <strong>{{ ppm | number:'1.0-0' }} ppm</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [ngModel]="ppm" (ngModelChange)="updateFromPpm($event)" min="0" max="50000" step="100" class="flex-1">
              <input type="number" [ngModel]="ppm" (ngModelChange)="updateFromPpm($event)" min="0" max="50000" step="100"
                class="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>

          <!-- Percentage range -->
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none">Valeur en % : <strong>{{ percentage | number:'1.4-4' }} %</strong></label>
            <div class="flex items-center gap-3">
              <input type="range" [ngModel]="percentage" (ngModelChange)="updateFromPercentage($event)" min="0" max="100" step="0.01" class="flex-1">
              <input type="number" [ngModel]="percentage" (ngModelChange)="updateFromPercentage($event)" min="0" max="100" step="0.01"
                class="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm text-center">
            </div>
          </div>
        </div>

        <!-- Result -->
        <div class="p-6 pt-0">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <div class="text-sm font-medium text-muted-foreground">Résultat</div>
            <div class="text-3xl font-bold">{{ ppm | number:'1.0-0' }} ppm</div>
            <div class="text-3xl font-bold">{{ percentage | number:'1.4-4' }} %</div>
          </div>
        </div>
      </div>

      <!-- Reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Seuils de référence</h3>
        </div>
        <div class="p-6 pt-0">
          <table class="w-full text-sm">
            <thead class="bg-muted">
              <tr>
                <th class="px-3 py-2 text-left font-medium">Gaz</th>
                <th class="px-3 py-2 text-left font-medium">Seuil VLEP</th>
                <th class="px-3 py-2 text-left font-medium">Seuil IDLH</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b"><td class="px-3 py-2">CO (Monoxyde de carbone)</td><td class="px-3 py-2">20 ppm</td><td class="px-3 py-2">1 200 ppm</td></tr>
              <tr class="border-b"><td class="px-3 py-2">H&#x2082;S (Sulfure d'hydrog&egrave;ne)</td><td class="px-3 py-2">5 ppm</td><td class="px-3 py-2">100 ppm</td></tr>
              <tr class="border-b"><td class="px-3 py-2">NH&#x2083; (Ammoniac)</td><td class="px-3 py-2">20 ppm</td><td class="px-3 py-2">300 ppm</td></tr>
              <tr class="border-b"><td class="px-3 py-2">HCN (Acide cyanhydrique)</td><td class="px-3 py-2">0,9 ppm</td><td class="px-3 py-2">50 ppm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class GasConverterComponent {
  ppm = 0;
  percentage = 0;

  updateFromPpm(value: number) {
    this.ppm = value;
    this.percentage = value / 10000;
  }

  updateFromPercentage(value: number) {
    this.percentage = value;
    this.ppm = value * 10000;
  }
}
