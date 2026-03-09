import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pgr-decision',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Fiche de décision PGC/PGR</h3>
          <p class="text-sm text-muted-foreground">Procédure gaz — aide à la décision</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- 1. Localisation -->
          <div class="space-y-2">
            <div class="text-sm font-medium">Où semble localisée la fuite ?</div>
            <div class="flex gap-2 flex-wrap">
              <button (click)="setLocalization('vp')"
                [class]="localization === 'vp'
                  ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                  : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                Voie publique
              </button>
              <button (click)="setLocalization('bat')"
                [class]="localization === 'bat'
                  ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                  : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                Bâtiment
              </button>
            </div>
          </div>

          <ng-container *ngIf="localization">
            <!-- 2. Que voyez-vous ? -->
            <div class="rounded-lg border">
              <button (click)="seeOpen = !seeOpen"
                class="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-accent rounded-lg">
                Que voyez-vous ?
                <lucide-icon [name]="seeOpen ? 'chevron-up' : 'chevron-down'" [size]="16"></lucide-icon>
              </button>
              <div *ngIf="seeOpen" class="px-4 pb-4 space-y-4">
                <div class="space-y-2">
                  <div class="text-sm font-medium">Présence de travaux ou accident à proximité ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setWorkVp('yes')"
                      [class]="workVp === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setWorkVp('no')"
                      [class]="workVp === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div *ngIf="localization === 'bat'" class="space-y-2">
                  <div class="text-sm font-medium">Présence de travaux dans le bâtiment ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setWorkBat('yes')"
                      [class]="workBat === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setWorkBat('no')"
                      [class]="workBat === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div *ngIf="localization === 'bat'" class="space-y-2">
                  <div class="text-sm font-medium">Feu de coffret gaz en façade ou dans un bâtiment ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setFireFacade('yes')"
                      [class]="fireFacade === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setFireFacade('no')"
                      [class]="fireFacade === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-sm font-medium">Dégâts apparents sur ouvrage (conduite, coffret) ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setDamage('yes')"
                      [class]="damage === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setDamage('no')"
                      [class]="damage === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-sm font-medium">Fuite de gaz enflammée ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setFireLeak('yes')"
                      [class]="fireLeak === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setFireLeak('no')"
                      [class]="fireLeak === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Qu'entendez-vous ? -->
            <div *ngIf="isHearVisible" class="rounded-lg border">
              <button (click)="hearOpen = !hearOpen"
                class="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-accent rounded-lg">
                Qu'entendez-vous ?
                <lucide-icon [name]="hearOpen ? 'chevron-up' : 'chevron-down'" [size]="16"></lucide-icon>
              </button>
              <div *ngIf="hearOpen" class="px-4 pb-4 space-y-4">
                <div class="space-y-2">
                  <div class="text-sm font-medium">Entendez-vous des phénomènes physiques anormaux (bruit, sifflement, souffle, vibration, projection, etc.) ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setHear('yes')"
                      [class]="hear === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setHear('no')"
                      [class]="hear === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non, rien de particulier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. Facteurs aggravants -->
            <div *ngIf="isOtherVisible" class="rounded-lg border">
              <button (click)="otherOpen = !otherOpen"
                class="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-accent rounded-lg">
                Facteurs aggravants
                <lucide-icon [name]="otherOpen ? 'chevron-up' : 'chevron-down'" [size]="16"></lucide-icon>
              </button>
              <div *ngIf="otherOpen" class="px-4 pb-4 space-y-4">
                <div *ngIf="localization === 'vp'" class="space-y-2">
                  <div class="text-sm font-medium">Zone avec densité de population dans un rayon de 50m ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setDensity('yes')"
                      [class]="density === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setDensity('no')"
                      [class]="density === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div *ngIf="localization === 'vp'" class="space-y-2">
                  <div class="text-sm font-medium">Grand rassemblement de public ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setPublicGroup('yes')"
                      [class]="publicGroup === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setPublicGroup('no')"
                      [class]="publicGroup === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div *ngIf="localization === 'bat'" class="space-y-2">
                  <div class="text-sm font-medium">Site sensible (ERP, immeuble d'habitation collectif) ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setErp('yes')"
                      [class]="erp === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setErp('no')"
                      [class]="erp === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div *ngIf="localization === 'bat'" class="space-y-2">
                  <div class="text-sm font-medium">Infrastructure bâtiment (fuite ou odeur dans le sous-sol, cave) ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setInfra('yes')"
                      [class]="infra === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setInfra('no')"
                      [class]="infra === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-sm font-medium">Nombreux appels ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setCalls('yes')"
                      [class]="calls === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setCalls('no')"
                      [class]="calls === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-sm font-medium">Présence d'une odeur particulière ?</div>
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="setSmell('yes')"
                      [class]="smell === 'yes'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Oui
                    </button>
                    <button (click)="setSmell('no')"
                      [class]="smell === 'no'
                        ? 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4'
                        : 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4'">
                      Non
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>

          <!-- Result -->
          <ng-container *ngIf="localization">
            <div class="border-t my-4"></div>

            <div [ngClass]="{
              'rounded-lg border p-4 text-center': true,
              'border-red-200 bg-red-50': alertClass === 'alert-danger',
              'border-emerald-200 bg-emerald-50': alertClass === 'alert-success',
              'border-amber-200 bg-amber-50': alertClass === 'alert-warning'
            }">
              <div class="text-sm font-medium text-muted-foreground">{{ alertTitle }}</div>
              <div class="text-sm text-muted-foreground mt-1">{{ alertMessage }}</div>
              <div *ngIf="detailMessage" class="text-xs text-muted-foreground mt-2 opacity-80">{{ detailMessage }}</div>
            </div>

            <div class="flex justify-center pt-2">
              <button (click)="reset()"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 gap-2">
                <lucide-icon name="rotate-ccw" [size]="14"></lucide-icon>
                Recommencer
              </button>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class PgrDecisionComponent {
  localization: string | null = null;
  workVp: string | null = null;
  workBat: string | null = null;
  damage: string | null = null;
  fireFacade: string | null = null;
  fireLeak: string | null = null;
  hear: string | null = null;
  smell: string | null = null;
  calls: string | null = null;
  infra: string | null = null;
  erp: string | null = null;
  publicGroup: string | null = null;
  density: string | null = null;

  isHearVisible = false;
  isOtherVisible = false;

  seeOpen = true;
  hearOpen = true;
  otherOpen = true;

  alertClass = 'alert-warning';
  alertTitle = 'En attente';
  alertMessage = 'Veuillez remplir tous les champs pour obtenir un résultat';
  detailMessage = '';

  setLocalization(v: string) { this.localization = v; this.compute(); }
  setWorkVp(v: string) { this.workVp = v; this.updateVisibility(); this.compute(); }
  setWorkBat(v: string) { this.workBat = v; this.updateVisibility(); this.compute(); }
  setDamage(v: string) { this.damage = v; this.updateVisibility(); this.compute(); }
  setFireFacade(v: string) { this.fireFacade = v; this.updateVisibility(); this.compute(); }
  setFireLeak(v: string) { this.fireLeak = v; this.updateVisibility(); this.compute(); }
  setHear(v: string) { this.hear = v; this.isOtherVisible = true; this.compute(); }
  setSmell(v: string) { this.smell = v; this.compute(); }
  setCalls(v: string) { this.calls = v; this.compute(); }
  setInfra(v: string) { this.infra = v; this.compute(); }
  setErp(v: string) { this.erp = v; this.compute(); }
  setPublicGroup(v: string) { this.publicGroup = v; this.compute(); }
  setDensity(v: string) { this.density = v; this.compute(); }

  updateVisibility() {
    if (this.localization === 'vp') {
      this.isHearVisible = this.workVp !== null && this.damage !== null && this.fireLeak !== null;
    } else {
      this.isHearVisible = this.workVp !== null && this.workBat !== null && this.damage !== null && this.fireFacade !== null && this.fireLeak !== null;
    }
  }

  compute() {
    let closedLeak = 0, openLeakVP = 0, openLeakBat = 0, fireFacadeScore = 0;

    if (this.workVp === 'yes') { closedLeak++; openLeakVP++; }
    if (this.damage === 'yes') { openLeakVP++; openLeakBat++; }
    if (this.damage === 'no') closedLeak++;
    if (this.fireLeak === 'yes') { openLeakVP++; openLeakBat++; }
    if (this.localization === 'vp' && this.hear === 'yes') { closedLeak++; openLeakVP++; }
    if (this.density === 'yes') openLeakVP++;
    if (this.publicGroup === 'yes') openLeakVP++;
    if (this.calls === 'yes') { openLeakVP++; openLeakBat++; }
    if (this.fireFacade === 'yes') fireFacadeScore++;
    if (this.workBat === 'yes') openLeakBat++;
    if (this.erp === 'yes') openLeakBat++;
    if (this.infra === 'yes') openLeakBat++;

    this.detailMessage = `Score fuite fermée : ${closedLeak} (PGR si >= 3) - Score fuite ouverte VP : ${openLeakVP} (PGR si >= 4) - Score fuite ouverte Bat : ${openLeakBat} (PGR si >= 4) - Score feu de façade : ${fireFacadeScore} (PGR si >= 1)`;

    if (closedLeak >= 3 || openLeakVP >= 4 || openLeakBat >= 4 || fireFacadeScore >= 1) {
      this.alertClass = 'alert-danger';
      this.alertTitle = 'PGR';
      this.alertMessage = 'Classement procédure gaz RENFORCÉE (PGR) préconisé';
    } else if (this.smell !== null) {
      this.alertClass = 'alert-success';
      this.alertTitle = 'PGC';
      this.alertMessage = 'Classement procédure gaz classique (PGC) préconisé';
    } else {
      this.alertClass = 'alert-warning';
      this.alertTitle = 'En attente';
      this.alertMessage = 'Veuillez remplir tous les champs pour obtenir un résultat';
    }
  }

  reset() {
    this.localization = this.workVp = this.workBat = this.damage = this.fireFacade = null;
    this.fireLeak = this.hear = this.smell = this.calls = this.infra = this.erp = null;
    this.publicGroup = this.density = null;
    this.isHearVisible = this.isOtherVisible = false;
    this.seeOpen = true;
    this.hearOpen = true;
    this.otherOpen = true;
    this.alertClass = 'alert-warning';
    this.alertTitle = 'En attente';
    this.alertMessage = 'Veuillez remplir tous les champs pour obtenir un résultat';
    this.detailMessage = '';
  }
}
