import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag; }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private initialized = false;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  initIfConsented(id: string): void {
    if (!isPlatformBrowser(this.platformId) || !id) return;
    if (localStorage.getItem('gva-cookie-consent') === 'accepted') this.load(id);
  }

  load(id: string): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized || !id) return;
    this.initialized = true;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer ??= [];
    window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => window.gtag?.('config', id, { page_path: e.urlAfterRedirects }));
  }
}
