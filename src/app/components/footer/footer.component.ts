import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section company-info">
            <div class="logo-section">
              <img src="assets/logo.png" alt="GVA Verkaufer Logo" class="footer-logo">
              <h3>GVA Verkaufer</h3>
            </div>
            <p class="company-description">
              Partenerul de logistică auto B2B din 2018. Transportăm loturi de minimum 7–8 vehicule
              pentru dealeri, importatori și companii de flotă — România și Europa de Vest.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <mat-icon>facebook</mat-icon>
              </a>
              <a href="mailto:auto@gvaverkaufer.ro" class="social-link" aria-label="Email">
                <mat-icon>email</mat-icon>
              </a>
              <a href="tel:+40745852977" class="social-link" aria-label="Telefon">
                <mat-icon>phone</mat-icon>
              </a>
            </div>
          </div>

          <div class="footer-section">
            <h4>Servicii</h4>
            <ul class="footer-links">
              <li><a routerLink="/services">Transport Lot Dealeri</a></li>
              <li><a routerLink="/services">Transport Import Auto</a></li>
              <li><a routerLink="/services">Transport Parc Corporativ</a></li>
              <li><a routerLink="/services">Distribuție Producători</a></li>
              <li><a routerLink="/services">Transport Licitații Auto</a></li>
              <li><a routerLink="/services">Contract Recurent</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Companie</h4>
            <ul class="footer-links">
              <li><a routerLink="/about">Despre Noi</a></li>
              <li><a routerLink="/fleet">Flota Noastră</a></li>
              <li><a routerLink="/contact">Contact</a></li>
              <li><a href="#">Cariere</a></li>
              <li><a href="#">Politica de Confidențialitate</a></li>
            </ul>
          </div>

          <div class="footer-section contact-section">
            <h4>Contact</h4>
            <div class="contact-item">
              <mat-icon>location_on</mat-icon>
              <span>România · Europa de Vest</span>
            </div>
            <div class="contact-item">
              <mat-icon>phone</mat-icon>
              <a href="tel:+40745852977">+40 745 852 977</a>
            </div>
            <div class="contact-item">
              <mat-icon>email</mat-icon>
              <a href="mailto:auto@gvaverkaufer.ro">auto&#64;gvaverkaufer.ro</a>
            </div>
            <div class="contact-item">
              <mat-icon>schedule</mat-icon>
              <span>24/7 Disponibil</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>&copy; {{ currentYear }} GVA Verkaufer. Toate drepturile rezervate.</p>
            <div class="footer-bottom-links">
              <a href="#">Termeni și Condiții</a>
              <a href="#">Politica de Confidențialitate</a>
              <a href="#">Politica Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected currentYear = new Date().getFullYear();
}
