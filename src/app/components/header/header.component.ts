import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { LangSwitcherComponent } from '../lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, TranslocoModule, LangSwitcherComponent],
  template: `
    <header class="header">
      <div class="container">
        <ng-container *transloco="let t">
          <div class="nav-wrapper">
            <a routerLink="/home" class="logo-section">
              <img src="assets/logo.webp" alt="GVA Verkaufer Logo" class="logo" width="38" height="38">
              <div class="company-name">
                <h1>GVA Verkaufer</h1>
                <p>Auto Transport</p>
              </div>
            </a>

            <nav class="main-nav" [class.open]="menuOpen()">
              <a routerLink="/home" routerLinkActive="active" class="nav-link" (click)="closeMenu()">{{ t('nav.home') }}</a>
              <a routerLink="/about" routerLinkActive="active" class="nav-link" (click)="closeMenu()">{{ t('nav.about') }}</a>
              <a routerLink="/services" routerLinkActive="active" class="nav-link" (click)="closeMenu()">{{ t('nav.services') }}</a>
              <a routerLink="/fleet" routerLinkActive="active" class="nav-link" (click)="closeMenu()">{{ t('nav.fleet') }}</a>
              <a routerLink="/contact" routerLinkActive="active" class="nav-link" (click)="closeMenu()">{{ t('nav.contact') }}</a>
              <div class="mobile-lang-row">
                <app-lang-switcher />
              </div>
            </nav>

            <div class="header-actions">
              <app-lang-switcher class="desktop-lang" />
              <a routerLink="/contact" class="cta-btn">{{ t('nav.cta') }}</a>
              <button class="hamburger-btn" (click)="toggleMenu()" [attr.aria-label]="menuOpen() ? 'Închide meniu' : 'Deschide meniu'">
                @if (menuOpen()) {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                } @else {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                }
              </button>
            </div>
          </div>
        </ng-container>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
