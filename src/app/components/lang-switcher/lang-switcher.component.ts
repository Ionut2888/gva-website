import { Component, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';

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
      flex-wrap: wrap;
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
export class LangSwitcherComponent implements OnDestroy {
  private translocoService = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);
  private sub: Subscription;

  protected activeLang = signal(this.translocoService.getActiveLang());

  protected langs = [
    { code: 'ro', label: 'Română' },
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'hu', label: 'Magyar' },
    { code: 'it', label: 'Italiano' },
    { code: 'nl', label: 'Nederlands' },
  ];

  constructor() {
    // IMPORTANT: Do NOT call setActiveLang here.
    // APP_INITIALIZER (app.config.ts) already restores the saved language before
    // Angular bootstraps. Calling setActiveLang inside the constructor triggers
    // Transloco's langChanges$ → *transloco re-creates embedded views →
    // new LangSwitcherComponent instances → setActiveLang again → stack overflow.
    //
    // Subscribe to langChanges$ (emits async via setTimeout) so the signal stays
    // in sync when the other instance of this component (desktop/mobile) switches.
    this.sub = this.translocoService.langChanges$.subscribe(lang => {
      this.activeLang.set(lang);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected switchLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('gva-lang', lang);
    }
  }
}
