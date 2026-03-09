import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallace-rule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Règle de Wallace</h3>
          <p class="text-sm text-muted-foreground">Surface Corporelle Brûlée (SCB)</p>
        </div>
        <div class="p-6 pt-0 space-y-4">
          <!-- Adult/Child toggle -->
          <div class="flex justify-center items-center gap-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" [(ngModel)]="isChild">
              <div class="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <span class="text-sm font-medium">Mode Enfant (règle des 9 adaptée)</span>
          </div>

          <!-- Body views -->
          <div class="flex justify-center flex-wrap gap-4">
            <!-- Face -->
            <div class="text-center">
              <h5 class="text-sm font-semibold mb-2 text-muted-foreground">Face</h5>
              <svg viewBox="0 0 200 400" class="body-diagram bg-muted/30 rounded-lg w-[140px] h-[300px] sm:w-[180px] sm:h-[380px]">
                <g (click)="toggle('head')" class="body-part" [class.selected]="parts.head">
                  <circle cx="100" cy="40" r="30" />
                  <text x="100" y="45" text-anchor="middle" class="percentage">{{ isChild ? '17%' : '9%' }}</text>
                </g>
                <g (click)="toggle('torsoFront')" class="body-part" [class.selected]="parts.torsoFront">
                  <rect x="70" y="75" width="60" height="110" rx="5" />
                  <text x="100" y="135" text-anchor="middle" class="percentage">18%</text>
                </g>
                <g (click)="toggle('rightArm')" class="body-part" [class.selected]="parts.rightArm">
                  <rect x="35" y="75" width="30" height="120" rx="5" transform="rotate(10 35 75)" />
                  <text x="45" y="140" text-anchor="middle" class="percentage">9%</text>
                </g>
                <g (click)="toggle('leftArm')" class="body-part" [class.selected]="parts.leftArm">
                  <rect x="135" y="75" width="30" height="120" rx="5" transform="rotate(-10 165 75)" />
                  <text x="155" y="140" text-anchor="middle" class="percentage">9%</text>
                </g>
                <g (click)="toggle('genitals')" class="body-part" [class.selected]="parts.genitals">
                  <circle cx="100" cy="195" r="10" />
                  <text x="100" y="215" text-anchor="middle" class="percentage small">1%</text>
                </g>
                <g (click)="toggle('rightLeg')" class="body-part" [class.selected]="parts.rightLeg">
                  <rect x="65" y="200" width="32" height="160" rx="5" />
                  <text x="81" y="290" text-anchor="middle" class="percentage">{{ isChild ? '14%' : '18%' }}</text>
                </g>
                <g (click)="toggle('leftLeg')" class="body-part" [class.selected]="parts.leftLeg">
                  <rect x="103" y="200" width="32" height="160" rx="5" />
                  <text x="119" y="290" text-anchor="middle" class="percentage">{{ isChild ? '14%' : '18%' }}</text>
                </g>
              </svg>
            </div>

            <!-- Dos -->
            <div class="text-center">
              <h5 class="text-sm font-semibold mb-2 text-muted-foreground">Dos</h5>
              <svg viewBox="0 0 200 400" class="body-diagram bg-muted/30 rounded-lg w-[140px] h-[300px] sm:w-[180px] sm:h-[380px]">
                <g (click)="toggle('head')" class="body-part" [class.selected]="parts.head">
                  <circle cx="100" cy="40" r="30" />
                  <text x="100" y="45" text-anchor="middle" class="percentage">{{ isChild ? '17%' : '9%' }}</text>
                </g>
                <g (click)="toggle('back')" class="body-part" [class.selected]="parts.back">
                  <rect x="70" y="75" width="60" height="110" rx="5" />
                  <text x="100" y="135" text-anchor="middle" class="percentage">18%</text>
                </g>
                <g (click)="toggle('leftArm')" class="body-part" [class.selected]="parts.leftArm">
                  <rect x="35" y="75" width="30" height="120" rx="5" transform="rotate(10 35 75)" />
                  <text x="45" y="140" text-anchor="middle" class="percentage">9%</text>
                </g>
                <g (click)="toggle('rightArm')" class="body-part" [class.selected]="parts.rightArm">
                  <rect x="135" y="75" width="30" height="120" rx="5" transform="rotate(-10 165 75)" />
                  <text x="155" y="140" text-anchor="middle" class="percentage">9%</text>
                </g>
                <g (click)="toggle('leftLeg')" class="body-part" [class.selected]="parts.leftLeg">
                  <rect x="65" y="200" width="32" height="160" rx="5" />
                  <text x="81" y="290" text-anchor="middle" class="percentage">{{ isChild ? '14%' : '18%' }}</text>
                </g>
                <g (click)="toggle('rightLeg')" class="body-part" [class.selected]="parts.rightLeg">
                  <rect x="103" y="200" width="32" height="160" rx="5" />
                  <text x="119" y="290" text-anchor="middle" class="percentage">{{ isChild ? '14%' : '18%' }}</text>
                </g>
              </svg>
            </div>
          </div>

          <div class="border-t my-4"></div>

          <!-- Result alert -->
          <div [ngClass]="{
            'rounded-lg border p-4 text-center': true,
            'border-red-200 bg-red-50': totalSurface > 25,
            'border-amber-200 bg-amber-50': totalSurface > 15 && totalSurface <= 25,
            'border-blue-200 bg-blue-50': totalSurface <= 15
          }">
            <div class="text-sm font-medium text-muted-foreground">Surface Brûlée Totale</div>
            <div class="text-3xl font-bold">{{ totalSurface }} %</div>
            <div *ngIf="totalSurface > 25" class="text-sm text-muted-foreground mt-1">Brûlures graves — Médicalisation impérative</div>
            <div *ngIf="totalSurface > 15 && totalSurface <= 25" class="text-sm text-muted-foreground mt-1">Brûlures étendues — Hospitalisation urgente</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WallaceRuleComponent {
  isChild = false;

  parts = {
    head: false,
    torsoFront: false,
    back: false,
    leftArm: false,
    rightArm: false,
    leftLeg: false,
    rightLeg: false,
    genitals: false
  };

  toggle(part: keyof typeof this.parts) {
    this.parts[part] = !this.parts[part];
  }

  get totalSurface(): number {
    const headPct = this.isChild ? 17 : 9;
    const legPct = this.isChild ? 14 : 18;
    let total = 0;
    if (this.parts.head) total += headPct;
    if (this.parts.torsoFront) total += 18;
    if (this.parts.back) total += 18;
    if (this.parts.leftArm) total += 9;
    if (this.parts.rightArm) total += 9;
    if (this.parts.leftLeg) total += legPct;
    if (this.parts.rightLeg) total += legPct;
    if (this.parts.genitals) total += 1;
    return total;
  }
}
