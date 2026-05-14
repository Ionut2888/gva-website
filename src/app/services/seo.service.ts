import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const PAGE_SEO: Record<string, PageSeoConfig> = {
  '/home': {
    title: 'GVA Verkaufer — Transport Auto în Europa | Loturi B2B RO ↔ DE · FR · ES',
    description:
      'Transport auto profesional în Europa pentru dealeri, importatori și producători. Loturi de 7–8 vehicule per cursă. Curse regulate RO ↔ Germania, Franța, Spania. Ofertă în 4 ore.',
    keywords:
      'transport auto europa, auto transport europe, car transport Romania Germany, transport masini Europa, transport lot auto, dealer car transport',
    canonical: 'https://www.gvaverkaufer.ro/home',
  },
  '/services': {
    title: 'Servicii Transport Auto B2B | GVA Verkaufer — Dealeri, Importatori, Producători',
    description:
      'Servicii complete de transport auto pentru industria auto: loturi dealeri, import, export, parcuri corporative, distribuție producători. Contract B2B, prețuri fixe, curse regulate Europa.',
    keywords:
      'servicii transport auto, transport dealeri auto, import auto europa, export auto romania, transport lot vehicule, contract transport b2b',
    canonical: 'https://www.gvaverkaufer.ro/services',
    ogTitle: 'Servicii Transport Auto B2B — GVA Verkaufer',
    ogDescription:
      'Loturi dealeri, import/export, parcuri corporative. Contract B2B cu prețuri fixe. Curse regulate RO ↔ Europa de Vest.',
  },
  '/fleet': {
    title: 'Flotă Transport Auto | GVA Verkaufer — Platforme Auto Dedicate B2B',
    description:
      'Flota GVA Verkaufer: platforme auto specializate pentru 7–8 vehicule per cursă. Utilaje omologate, asigurate și GPS-tracked pentru parteneriat comercial sigur.',
    keywords:
      'platforma auto, camion transport masini, flota transport auto, car carrier romania, auto transporter',
    canonical: 'https://www.gvaverkaufer.ro/fleet',
    ogTitle: 'Flotă Transport Auto — GVA Verkaufer',
    ogDescription:
      'Platforme auto specializate pentru 7–8 vehicule/cursă. Omologate, asigurate, GPS-tracked.',
  },
  '/about': {
    title: 'Despre GVA Verkaufer | 7+ Ani Transport Auto B2B în Europa',
    description:
      'GVA Verkaufer — partenerul logistic al industriei auto din 2018. 7+ ani de parteneriate B2B, 5.000+ vehicule livrate, zero daune înregistrate. Specializați în transport lot pentru dealeri și importatori.',
    keywords:
      'despre gva verkaufer, transport auto romania, 7 ani experienta transport, partener logistic auto',
    canonical: 'https://www.gvaverkaufer.ro/about',
    ogTitle: 'Despre GVA Verkaufer — 7+ Ani de Parteneriate B2B',
    ogDescription:
      '5.000+ vehicule livrate, zero daune din 2018. Partenerul logistic al industriei auto din România.',
  },
  '/contact': {
    title: 'Contact & Ofertă Transport Auto | GVA Verkaufer — Răspuns în 4 Ore',
    description:
      'Solicită ofertă pentru transport lot auto. Completează formularul cu detaliile lotului — număr vehicule, origine, destinație — și revenim în maxim 4 ore. Tel: +40 745 852 977.',
    keywords:
      'contact transport auto, oferta transport masini, telefon transport auto romania, email transport vehicule',
    canonical: 'https://www.gvaverkaufer.ro/contact',
    ogTitle: 'Solicită Ofertă Transport Auto — GVA Verkaufer',
    ogDescription:
      'Completează formularul și primești ofertă personalizată în maxim 4 ore. Tel: +40 745 852 977.',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  init(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const nav = e as NavigationEnd;
        const route = nav.urlAfterRedirects.split('?')[0];
        const config = PAGE_SEO[route];
        if (config) {
          this.apply(config);
        }
      });
  }

  apply(config: PageSeoConfig): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle ?? config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.ogDescription ?? config.description,
    });
    if (config.canonical) {
      this.meta.updateTag({ property: 'og:url', content: config.canonical });
      this.updateCanonical(config.canonical);
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: config.ogTitle ?? config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.ogDescription ?? config.description,
    });
  }

  private updateCanonical(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const existing = this.doc.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.setAttribute('href', url);
    }
  }
}
