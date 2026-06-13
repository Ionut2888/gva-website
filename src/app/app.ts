import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { SeoService } from './services/seo.service';
import { AnalyticsService } from './services/analytics.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, HeaderComponent, FooterComponent, CookieConsentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('GVA Verkaufer');
  private seo = inject(SeoService);
  private analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.seo.init();
    this.seo.injectBusinessSchema({
      '@type': environment.business.type,
      name: environment.business.name,
      description: environment.business.description,
      url: environment.business.url,
      telephone: environment.business.phone,
      email: environment.business.email,
      foundingDate: environment.business.foundingDate,
      areaServed: environment.business.areaServed,
      address: { '@type': 'PostalAddress', ...environment.business.address },
    });
    this.analytics.initIfConsented(environment.googleAnalyticsId);
  }
}
