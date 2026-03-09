import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription, interval } from 'rxjs';

interface Firefighter {
  name: string;
  bottleVolume: number;
  pressionBottle: number;
  currentPression: number;
  oxygenFlowRate: number;
  sent: boolean;
  timeIn: number;
  timeOut: number;
  timeSpentMs: number;
  alertLow: boolean;
}

interface Team {
  name: string;
  editName: boolean;
  sent: boolean;
  launchedTime: number;
  finishedTime: number;
  timeSpentMs: number;
  members: Firefighter[];
}

@Component({
  selector: 'app-ari-controller',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="container max-w-2xl py-6 space-y-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold tracking-tight">Contrôleur ARI</h2>
        <span class="text-lg font-bold font-mono text-primary">{{ currentTime }}</span>
      </div>

      <!-- Teams -->
      <div *ngFor="let team of teams; let ti = index"
        class="rounded-xl border bg-card text-card-foreground shadow-sm"
        [ngClass]="{
          'border-amber-300 bg-amber-50/30': team.sent && !hasAlert(team),
          'border-red-300 bg-red-50/30': team.sent && hasAlert(team)
        }">
        <!-- Team header -->
        <div class="flex flex-col space-y-1.5 p-4 pb-2">
          <div class="flex items-center gap-2">
            <span *ngIf="!team.editName" (click)="startEditName(team)"
              class="text-base font-semibold cursor-pointer flex items-center gap-1 hover:text-primary transition-colors">
              {{ team.name }}
              <lucide-icon name="pencil" [size]="14" class="opacity-40"></lucide-icon>
            </span>
            <input *ngIf="team.editName" [(ngModel)]="team.name"
              (blur)="team.editName = false" (keyup.enter)="team.editName = false"
              class="border-b-2 border-primary bg-transparent outline-none text-base font-semibold w-full sm:w-48">
          </div>
          <div class="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground font-mono">
            <span>Entrée : {{ formatTime(team.launchedTime) }}</span>
            <span>Sortie : {{ formatTime(team.finishedTime) }}</span>
            <span class="font-semibold">Temps : {{ formatDuration(team.timeSpentMs) }}</span>
          </div>
        </div>

        <!-- Members -->
        <div class="px-4 pb-2 space-y-1">
          <div *ngFor="let ff of team.members; let fi = index"
            class="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
            [ngClass]="{
              'bg-amber-100/60': ff.sent && !ff.alertLow,
              'bg-red-100/60': ff.sent && ff.alertLow,
              'bg-muted/50': !ff.sent
            }">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <span class="font-semibold truncate min-w-[70px]">{{ ff.name }}</span>
              <span class="font-mono text-xs"
                [ngClass]="ff.currentPression < 50 ? 'text-red-600 font-bold' : ''">
                {{ ff.currentPression }} bar
              </span>
              <span class="text-xs text-muted-foreground">~{{ getAutonomy(ff) }} min</span>
            </div>
            <button (click)="removeFirefighter(team, fi)"
              class="inline-flex items-center justify-center rounded-md hover:bg-destructive/10 hover:text-destructive h-8 w-8 transition-colors"
              title="Supprimer">
              <lucide-icon name="trash-2" [size]="14"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Add firefighter form -->
        <div class="px-4 pb-3">
          <div class="border-t pt-3">
            <p class="text-xs text-muted-foreground mb-2">Ajouter un sapeur-pompier</p>
            <div class="flex flex-wrap gap-2 items-center">
              <input type="text" [(ngModel)]="newFF[ti].name" placeholder="Nom"
                class="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm flex-1 min-w-[100px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <select [(ngModel)]="newFF[ti].volume"
                class="flex h-9 rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option [ngValue]="6">6L</option>
                <option [ngValue]="9">9L</option>
              </select>
              <input type="number" [(ngModel)]="newFF[ti].pression" placeholder="bar" min="0" max="400"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-2 py-1 text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <input type="number" [(ngModel)]="newFF[ti].flow" placeholder="L/min" min="10" max="100"
                class="flex h-9 w-20 rounded-md border border-input bg-background px-2 py-1 text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <button (click)="addFirefighter(ti)"
                class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 transition-colors"
                title="Ajouter">
                <lucide-icon name="user-plus" [size]="16"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Team actions -->
        <div class="flex items-center gap-2 px-4 pb-4">
          <button (click)="toggleTeam(ti)"
            class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 transition-colors"
            [ngClass]="team.sent
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'">
            <lucide-icon [name]="team.sent ? 'square' : 'play'" [size]="16"></lucide-icon>
            {{ team.sent ? 'Sortie équipe' : 'Engagement équipe' }}
          </button>
          <button (click)="removeTeam(ti)"
            class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 transition-colors text-muted-foreground">
            <lucide-icon name="trash-2" [size]="14"></lucide-icon>
            Supprimer
          </button>
        </div>
      </div>

      <!-- Bottom actions -->
      <div class="flex flex-wrap gap-2">
        <button (click)="addTeam()"
          class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 transition-colors">
          <lucide-icon name="users" [size]="16"></lucide-icon>
          Ajouter un binôme
        </button>
        <button (click)="clearAll()"
          class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors text-muted-foreground">
          <lucide-icon name="x" [size]="16"></lucide-icon>
          Tout effacer
        </button>
      </div>
    </div>
  `,
})
export class AriControllerComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  currentTime = '';
  newFF: { name: string; pression: number; flow: number; volume: number }[] = [];

  private timerSub?: Subscription;

  constructor() {
    const saved = localStorage.getItem('horus-tools-ari-controller');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Date.now() - data.savedAt < 24 * 3600 * 1000) {
          this.teams = data.teams;
        }
      } catch {}
    }
    if (this.teams.length === 0) this.addTeam();
  }

  ngOnInit() {
    this.timerSub = interval(500).subscribe(() => {
      this.currentTime = new Date().toLocaleTimeString();
      for (const team of this.teams) {
        if (team.sent) {
          team.timeSpentMs = Date.now() - team.launchedTime;
        }
      }
    });
    this.syncNewFF();
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

  addTeam() {
    this.teams.push({
      name: `Binôme ${this.teams.length + 1}`,
      editName: false, sent: false,
      launchedTime: 0, finishedTime: 0, timeSpentMs: 0,
      members: []
    });
    this.syncNewFF();
  }

  removeTeam(idx: number) {
    if (confirm('Supprimer cette équipe ?')) {
      this.teams.splice(idx, 1);
      this.newFF.splice(idx, 1);
      this.save();
    }
  }

  clearAll() {
    if (confirm('Effacer toutes les équipes ?')) {
      this.teams = [];
      this.newFF = [];
      localStorage.removeItem('horus-tools-ari-controller');
      this.addTeam();
    }
  }

  startEditName(team: Team) { team.editName = true; }

  toggleTeam(idx: number) {
    const team = this.teams[idx];
    team.sent = !team.sent;
    if (team.sent) { team.launchedTime = Date.now(); team.finishedTime = 0; }
    else { team.finishedTime = Date.now(); }
    this.save();
  }

  addFirefighter(teamIdx: number) {
    const nf = this.newFF[teamIdx];
    if (!nf.name.trim()) return;
    this.teams[teamIdx].members.push({
      name: nf.name, bottleVolume: nf.volume || 6,
      pressionBottle: nf.pression || 300, currentPression: nf.pression || 300,
      oxygenFlowRate: nf.flow || 45, sent: this.teams[teamIdx].sent,
      timeIn: this.teams[teamIdx].sent ? Date.now() : 0,
      timeOut: 0, timeSpentMs: 0, alertLow: false
    });
    nf.name = ''; nf.pression = 300; nf.flow = 45; nf.volume = 6;
    this.save();
  }

  removeFirefighter(team: Team, idx: number) { team.members.splice(idx, 1); this.save(); }

  getAutonomy(ff: Firefighter): number {
    if (ff.oxygenFlowRate <= 0) return 0;
    return Math.round((ff.currentPression * ff.bottleVolume) / ff.oxygenFlowRate);
  }

  hasAlert(team: Team): boolean { return team.members.some(m => m.currentPression < 50); }

  formatTime(ts: number): string {
    if (!ts) return '—';
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDuration(ms: number): string {
    if (!ms) return '00:00';
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h}h${String(m % 60).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  private syncNewFF() {
    while (this.newFF.length < this.teams.length) {
      this.newFF.push({ name: '', pression: 300, flow: 45, volume: 6 });
    }
  }

  private save() {
    localStorage.setItem('horus-tools-ari-controller', JSON.stringify({ teams: this.teams, savedAt: Date.now() }));
  }
}
