import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { SanitySrcPipe, SanitySrcsetPipe } from '../../pipes/sanity-img.pipe';

@Component({
  selector: 'app-page-banner-block',
  standalone: true,
  imports: [RouterLink, AnimateOnScrollDirective, SanitySrcPipe, SanitySrcsetPipe],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    /* ── Light banner (default) ── */
    .page-banner {
      background: var(--bg);
      position: relative;
      padding: var(--s12) 0 var(--s10);
      border-bottom: 1px solid var(--border-subtle);
      overflow: hidden;
    }
    .page-banner::after {
      content: '';
      position: absolute;
      top: -40%; right: -8%;
      width: 640px; height: 640px;
      background: radial-gradient(circle, rgba(0,81,213,0.06) 0%, transparent 65%);
      pointer-events: none;
    }
    .page-banner .container { position: relative; z-index: 2; }
    .page-banner .section-header { margin-bottom: 0; text-align: center; }
    .page-banner .section-header h1 {
      color: var(--navy);
      font-size: clamp(2rem, 4vw, 3.25rem);
      letter-spacing: -0.03em;
      font-weight: 700;
      margin: 0;
    }
    .page-banner .section-subtitle {
      color: var(--text-muted);
      max-width: 580px;
      margin: var(--s3) auto 0;
      line-height: 1.6;
    }

    /* ── Dark image hero (when image is set) ── */
    .page-hero {
      position: relative;
      min-height: 460px;
      display: flex;
      align-items: center;
      padding: var(--s12) 0;
      overflow: hidden;
      border-bottom: 1px solid var(--border-subtle);
    }
    .page-hero__bg { position: absolute; inset: 0; z-index: 0; }
    .page-hero__bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
    .page-hero__overlay {
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(90deg, rgba(10,17,29,0.86) 0%, rgba(10,17,29,0.74) 50%, rgba(10,17,29,0.55) 100%);
    }
    .page-hero .container { position: relative; z-index: 2; }
    .page-hero__inner { max-width: 640px; }
    .page-hero__badge {
      display: inline-block;
      font-family: var(--fb);
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.06em;
      color: var(--text-muted);
      background: var(--bg-low);
      padding: 0.375rem 0.875rem;
      border-radius: var(--r-f);
      margin-bottom: var(--s3);
    }
    .page-hero__title {
      font-family: var(--fh);
      font-size: clamp(2rem, 4.5vw, 3.25rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: var(--white);
      margin: 0;
    }
    .page-hero__subtitle {
      font-family: var(--fb);
      font-size: 1.0625rem;
      line-height: 1.6;
      color: rgba(255,255,255,0.82);
      max-width: 520px;
      margin: var(--s3) 0 0;
    }
    .page-hero__cta {
      display: inline-flex; align-items: center;
      margin-top: var(--s5);
      background: var(--blue);
      color: var(--white);
      font-family: var(--fh);
      font-size: 0.875rem; font-weight: 700;
      letter-spacing: 0.05em; text-transform: uppercase;
      padding: 0.875rem 2rem;
      border-radius: var(--r-sm);
      transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
    }
    .page-hero__cta:hover { background: var(--blue-d); transform: translateY(-1px); box-shadow: var(--sh-ambient); }

    @media (max-width: 600px) { .page-hero { min-height: 380px; padding: var(--s10) 0; } }
  `],
  template: `
    @if (block.image) {
      <section class="page-hero">
        <div class="page-hero__bg">
          <img [src]="block.image | sanitySrc:1920" [srcset]="block.image | sanitySrcset"
               sizes="100vw" [alt]="block.heading || ''" loading="eager" fetchpriority="high" decoding="async">
        </div>
        <div class="page-hero__overlay"></div>
        <div class="container">
          <div class="page-hero__inner">
            @if (block.badge) { <span class="page-hero__badge" appAos="fade-up" [aosDuration]="1200">{{ block.badge }}</span> }
            <h1 class="page-hero__title" appAos="fade-up" [aosDelay]="80" [aosDuration]="1500">{{ block.heading }}</h1>
            @if (block.subtitle) { <p class="page-hero__subtitle" appAos="fade-up" [aosDelay]="180" [aosDuration]="1400">{{ block.subtitle }}</p> }
            @if (block.ctaLabel) {
              <a [routerLink]="block.ctaLink || '/contact'" class="page-hero__cta" appAos="fade-up" [aosDelay]="280" [aosDuration]="1400">{{ block.ctaLabel }}</a>
            }
          </div>
        </div>
      </section>
    } @else {
      <div class="page-banner">
        <div class="container">
          <div class="section-header">
            <h1 appAos="fade-up" [aosDuration]="1600">{{ block.heading }}</h1>
            <p class="section-subtitle" appAos="fade-up" [aosDelay]="150" [aosDuration]="1400">{{ block.subtitle }}</p>
          </div>
        </div>
      </div>
    }
  `,
})
export class PageBannerBlockComponent {
  @Input() block: SanityBlock;
}
