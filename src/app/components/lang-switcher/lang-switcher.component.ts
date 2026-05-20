import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  template: `
    <div class="lang-switcher">
      @for (lang of langs; track lang.code) {
        <button
          class="lang-btn"
          [class.active]="activeLang() === lang.code"
          (click)="switchLang(lang.code)"
          [attr.aria-label]="lang.label">
          {{ lang.code.toUpperCase() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .lang-switcher {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .lang-btn {
      background: none;
      border: none;
      font-family: var(--fh);
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--navy-dim);
      padding: 0.25rem 0.4rem;
      border-radius: var(--r-sm);
      cursor: pointer;
      transition: color var(--t-fast), background var(--t-fast);
      line-height: 1;

      &:hover {
        color: var(--white);
        background: rgba(255,255,255,0.06);
      }

      &.active {
        color: var(--blue-light);
        background: rgba(0,81,213,0.15);
      }
    }
  `]
})
export class LangSwitcherComponent {
  private translocoService = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);

  protected activeLang = signal(this.translocoService.getActiveLang());

  protected langs = [
    { code: 'ro', label: 'Română' },
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('gva-lang');
      if (saved && this.langs.some(l => l.code === saved)) {
        this.translocoService.setActiveLang(saved);
        this.activeLang.set(saved);
      }
    }
  }

  protected switchLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('gva-lang', lang);
    }
  }
}
