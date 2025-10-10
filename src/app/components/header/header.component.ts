import { Component } from '@angular/core';
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
          <div class="logo-section">
            <img src="assets/logo.png" alt="GVA Verkaufer Logo" class="logo">
            <div class="company-name">
              <h1>GVA Verkaufer</h1>
              <p>Auto Transport</p>
            </div>
          </div>
          <nav class="main-nav">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">Acasă</a>
            <a routerLink="/about" routerLinkActive="active" class="nav-link">Despre Noi</a>
            <a routerLink="/services" routerLinkActive="active" class="nav-link">Servicii</a>
            <a routerLink="/fleet" routerLinkActive="active" class="nav-link">Flotă</a>
            <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
