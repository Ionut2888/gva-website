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
    .values-section { margin-top: var(--s8); }
    .values-section h3 {
      font-family: var(--fh);
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: var(--text);
      text-align: center;
      margin-bottom: var(--s8);
      letter-spacing: -0.02em;
    }
    .values-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--s3);
    }
    .values-grid > * { min-width: 0; }
    @media (max-width: 900px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .values-grid { grid-template-columns: 1fr; } }
    .value-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      padding: var(--s5) var(--s4);
      text-align: center;
      transition: border-color var(--t-base);
    }
    .value-card:hover { border-color: var(--blue); }
    .value-card h4 {
      font-family: var(--fh);
      font-size: 0.9375rem; font-weight: 700;
      color: var(--text);
      margin: var(--s3) 0 var(--s2);
      letter-spacing: -0.01em;
    }
    .value-card p {
      font-family: var(--fb);
      font-size: 0.875rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin: 0;
    }
    .value-icon {
      width: 52px; height: 52px;
      margin: 0 auto;
      background: var(--bg-mid);
      border-radius: var(--r-sm);
      display: flex; align-items: center; justify-content: center;
    }
    .value-icon mat-icon {
      font-size: 24px !important; width: 24px !important;
      height: 24px !important; line-height: 24px !important;
      color: var(--blue);
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
