import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslocoModule],
  template: `
    <footer class="footer">
      <div class="container">
        <ng-container *transloco="let t">
          <div class="footer-content">
            <div class="footer-section company-info">
              <div class="logo-section">
                <img src="assets/logo.webp" alt="GVA Verkaufer Logo" class="footer-logo" width="34" height="34">
                <h3>GVA Verkaufer</h3>
              </div>
              <p class="company-description">{{ t('footer.description') }}</p>
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
              <h4>{{ t('footer.services_title') }}</h4>
              <ul class="footer-links">
                <li><a routerLink="/services">{{ t('footer.link_dealer') }}</a></li>
                <li><a routerLink="/services">{{ t('footer.link_import') }}</a></li>
                <li><a routerLink="/services">{{ t('footer.link_fleet') }}</a></li>
                <li><a routerLink="/services">{{ t('footer.link_producer') }}</a></li>
                <li><a routerLink="/services">{{ t('footer.link_auction') }}</a></li>
                <li><a routerLink="/services">{{ t('footer.link_contract') }}</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>{{ t('footer.company_title') }}</h4>
              <ul class="footer-links">
                <li><a routerLink="/about">{{ t('footer.link_about') }}</a></li>
                <li><a routerLink="/fleet">{{ t('footer.link_fleet_page') }}</a></li>
                <li><a routerLink="/contact">{{ t('footer.link_contact') }}</a></li>
                <li><a href="#">{{ t('footer.link_careers') }}</a></li>
                <li><a routerLink="/privacy">{{ t('footer.link_privacy') }}</a></li>
              </ul>
            </div>

            <div class="footer-section contact-section">
              <h4>{{ t('footer.contact_title') }}</h4>
              <div class="contact-item">
                <mat-icon>location_on</mat-icon>
                <span>{{ t('footer.contact_location') }}</span>
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
                <span>{{ t('footer.contact_hours') }}</span>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-bottom-content">
              <p>&copy; {{ currentYear }} GVA Verkaufer. {{ t('footer.rights') }}</p>
              <div class="footer-bottom-links">
                <a routerLink="/terms">{{ t('footer.terms') }}</a>
                <a routerLink="/privacy">{{ t('footer.privacy') }}</a>
                <a routerLink="/cookies">{{ t('footer.cookies') }}</a>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected currentYear = new Date().getFullYear();
}
