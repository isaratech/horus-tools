import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-hose',
  standalone: true,
  imports: [],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Lance Ecran reference card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Lance Écran</h3>
          <p class="text-sm text-muted-foreground">Portées et caractéristiques des lances écran</p>
        </div>
        <div class="p-6 pt-0">
          <div class="flex flex-wrap gap-4">
            <!-- 45mm section -->
            <div class="flex-1 min-w-0 sm:min-w-[260px]">
              <h4 class="text-sm font-semibold mb-2 text-destructive">Lance Écran &#8960; 45 mm</h4>
              <img src="assets/img/tools/screen_hose_45.png" alt="Lance écran 45mm"
                class="w-full rounded-lg mb-3" onerror="this.style.display='none'">
              <table class="w-full text-sm">
                <thead class="bg-muted">
                  <tr>
                    <th class="px-2 py-1.5 sm:px-3 sm:py-2 text-left font-medium">Débit</th>
                    <th class="px-2 py-1.5 sm:px-3 sm:py-2 text-left font-medium">Portée jet droit</th>
                    <th class="px-2 py-1.5 sm:px-3 sm:py-2 text-left font-medium">Portée brouillard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">125 L/min</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~15 m</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~6 m</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">250 L/min</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~20 m</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~8 m</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 70mm section -->
            <div class="flex-1 min-w-0 sm:min-w-[260px]">
              <h4 class="text-sm font-semibold mb-2 text-destructive">Lance Écran &#8960; 70 mm</h4>
              <img src="assets/img/tools/screen_hose_70.png" alt="Lance écran 70mm"
                class="w-full rounded-lg mb-3" onerror="this.style.display='none'">
              <table class="w-full text-sm">
                <thead class="bg-muted">
                  <tr>
                    <th class="px-2 py-1.5 sm:px-3 sm:py-2 text-left font-medium">Débit</th>
                    <th class="px-2 py-1.5 sm:px-3 sm:py-2 text-left font-medium">Portée jet droit</th>
                    <th class="px-2 py-1.5 sm:px-3 sm:py-2 text-left font-medium">Portée brouillard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">250 L/min</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~20 m</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~8 m</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">500 L/min</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~30 m</td>
                    <td class="px-2 py-1.5 sm:px-3 sm:py-2">~12 m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage tips card -->
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Rappel d'utilisation</h3>
        </div>
        <div class="p-6 pt-0">
          <ul class="list-disc pl-5 text-sm space-y-2 leading-relaxed">
            <li>Position <strong>jet droit</strong> : protection, refroidissement à distance</li>
            <li>Position <strong>brouillard fin</strong> : protection équipiers, refroidissement surfaces</li>
            <li>Position <strong>brouillard large</strong> : rideau d'eau protecteur, dilution gaz</li>
            <li>La portée dépend de la pression d'alimentation (idéal : 6-7 bars à la lance)</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class ScreenHoseComponent {}
