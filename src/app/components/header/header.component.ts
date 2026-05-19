import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="nav-wrapper">
          <a routerLink="/home" class="logo-section">
            <img src="assets/logo.webp" alt="GVA Verkaufer Logo" class="logo" width="38" height="38">
            <div class="company-name">
              <h1>GVA Verkaufer</h1>
              <p>Auto Transport</p>
            </div>
          </a>

          <nav class="main-nav" [class.open]="menuOpen()">
            <a routerLink="/home" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Acasă</a>
            <a routerLink="/about" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Despre Noi</a>
            <a routerLink="/services" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Servicii</a>
            <a routerLink="/fleet" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Flotă</a>
            <a routerLink="/contact" routerLinkActive="active" class="nav-link" (click)="closeMenu()">Contact</a>
          </nav>

          <div class="header-actions">
            <a routerLink="/contact" class="cta-btn">Solicită Ofertă</a>
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
