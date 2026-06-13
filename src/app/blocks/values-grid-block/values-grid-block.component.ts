import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { MatIconModule } from '@angular/material/icon';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-values-grid-block',
  standalone: true,
  imports: [MatIconModule, AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .values-section { margin-top: var(--s10); }
    .values-section h3 {
      font-family: var(--fh);
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: var(--navy);
      margin-bottom: var(--s6);
      letter-spacing: -0.02em;
      max-width: 640px;
    }
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--s3);
    }
    .values-grid > * { min-width: 0; }
    .value-card {
      background: var(--white);
      border: 1px solid var(--border-subtle);
      border-radius: var(--r-lg);
      padding: var(--s4);
      text-align: left;
      transition: box-shadow var(--t-base), border-color var(--t-base);
    }
    .value-card:hover { box-shadow: var(--sh-ambient); }
    .value-icon {
      width: 48px; height: 48px;
      background: var(--bg-low);
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: var(--s3);
    }
    .value-icon mat-icon {
      font-size: 26px !important; width: 26px !important;
      height: 26px !important; line-height: 26px !important;
      color: var(--blue);
    }
    .value-card h4 {
      font-family: var(--fh);
      font-size: 1.25rem; font-weight: 600;
      color: var(--navy);
      margin: 0 0 var(--s2);
      letter-spacing: -0.01em;
    }
    .value-card p {
      font-family: var(--fb);
      font-size: 0.9375rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin: 0;
    }
  `],
  template: `
    <div class="container">
      <div class="values-section">
        <h3 appAos="fade-up" [aosDuration]="1500">{{ block.heading }}</h3>
        <div class="values-grid">
          @for (v of block.values; track v._key; let i = $index) {
            <div class="value-card" appAos="scale-up" [aosDelay]="i * 100" [aosDuration]="1400">
              <div class="value-icon"><mat-icon>{{ v.icon }}</mat-icon></div>
              <h4>{{ v.title }}</h4>
              <p>{{ v.text }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ValuesGridBlockComponent {
  @Input() block: SanityBlock;
}
