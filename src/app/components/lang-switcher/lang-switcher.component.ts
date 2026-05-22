import { Component, ElementRef, HostListener, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  template: `
    <div class="lang-dropdown" [class.open]="open()">
      <button
        class="lang-trigger"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="'Language: ' + activeLang().toUpperCase()">
        <span class="lang-code">{{ activeLang().toUpperCase() }}</span>
        <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      @if (open()) {
        <div class="lang-menu" role="menu">
          @for (lang of langs; track lang.code) {
            <button
              class="lang-option"
              [class.active]="activeLang() === lang.code"
              (click)="select(lang.code)"
              role="menuitem"
              [attr.aria-label]="lang.label">
              <span class="opt-code">{{ lang.code.toUpperCase() }}</span>
              <span class="opt-name">{{ lang.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .lang-dropdown {
      position: relative;
    }

    /* ── Trigger button ── */
    .lang-trigger {
      display: flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--r-sm);
      padding: 0.3rem 0.5rem;
      cursor: pointer;
      transition: border-color var(--t-fast), background var(--t-fast);

      .lang-code {
        font-family: var(--fh);
        font-size: 0.6875rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: var(--navy-dim);
        line-height: 1;
        transition: color var(--t-fast);
      }

      .chevron {
        color: var(--navy-dim);
        transition: transform var(--t-fast), color var(--t-fast);
        flex-shrink: 0;
      }

      &:hover {
        border-color: rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.05);

        .lang-code, .chevron { color: var(--white); }
      }
    }

    /* Rotate chevron when open */
    .lang-dropdown.open .lang-trigger {
      border-color: rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.05);

      .lang-code, .chevron { color: var(--white); }
      .chevron { transform: rotate(180deg); }
    }

    /* ── Dropdown panel ── */
    .lang-menu {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      min-width: 148px;
      background: var(--navy);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--r-sm);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      overflow: hidden;
      z-index: 200;
      animation: dropIn 0.12s ease;
    }

    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Option rows ── */
    .lang-option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      background: none;
      border: none;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      transition: background var(--t-fast);
      text-align: left;

      .opt-code {
        font-family: var(--fh);
        font-size: 0.6875rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: var(--navy-dim);
        width: 24px;
        flex-shrink: 0;
        transition: color var(--t-fast);
      }

      .opt-name {
        font-family: var(--fb);
        font-size: 0.8125rem;
        color: var(--navy-dim);
        transition: color var(--t-fast);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.06);
        .opt-code, .opt-name { color: var(--white); }
      }

      &.active {
        background: rgba(0, 81, 213, 0.18);
        .opt-code { color: var(--blue-light); }
        .opt-name { color: var(--white); }
      }
    }
  `]
})
export class LangSwitcherComponent implements OnDestroy {
  private translocoService = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);
  private elRef = inject(ElementRef);
  private sub: Subscription;

  protected open = signal(false);
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
    // IMPORTANT: Do NOT call setActiveLang here — causes infinite re-render loop.
    // See cerebrum Do-Not-Repeat for full explanation.
    this.sub = this.translocoService.langChanges$.subscribe(lang => {
      this.activeLang.set(lang);
    });
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  protected toggle(): void { this.open.update(v => !v); }

  protected select(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang.set(lang);
    this.open.set(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('gva-lang', lang);
    }
  }
}
