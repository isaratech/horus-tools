import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, LucideAngularModule],
  template: `
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 items-center">
        <button
          *ngIf="showBack"
          [routerLink]="['/']"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 mr-2"
          aria-label="Retour">
          <lucide-icon name="arrow-left" [size]="18"></lucide-icon>
        </button>
        <a *ngIf="!showBack" routerLink="/" class="flex items-center gap-2.5 mr-4">
          <img src="assets/logo-horus-icon.png" alt="HORUS" class="w-8 h-8">
          <span class="text-sm font-bold tracking-tight text-foreground">HORUS <span class="font-normal text-muted-foreground">Tools</span></span>
        </a>
        <h1 *ngIf="showBack" class="text-sm font-semibold tracking-tight">{{ pageTitle }}</h1>
      </div>
    </header>
    <main class="min-h-[calc(100vh-3.5rem)]">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  pageTitle = 'Horus Tools';
  showBack = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.root;
        while (route.firstChild) route = route.firstChild;
        return route;
      })
    ).subscribe(route => {
      const data = route.snapshot.data;
      this.pageTitle = data['title'] || 'Horus Tools';
      this.showBack = !!data['title'];
    });
  }
}
