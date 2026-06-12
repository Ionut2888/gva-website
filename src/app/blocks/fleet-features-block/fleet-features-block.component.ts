import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { MatIconModule } from '@angular/material/icon';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-fleet-features-block',
  standalone: true,
  imports: [MatIconModule, AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .fleet-features {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      padding: var(--s8);
    }
    .fleet-features h3 {
      font-family: var(--fh);
      font-size: clamp(1.375rem, 2vw, 1.875rem);
      font-weight: 700;
      color: var(--text);
      text-align: center;
      margin-bottom: var(--s8);
      letter-spacing: -0.02em;
    }
    @media (max-width: 768px) {
      .fleet-features { padding: var(--s5) var(--s4); }
      .fleet-features h3 { font-size: 1.375rem; margin-bottom: var(--s5); }
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--s4);
    }
    .features-grid > * { min-width: 0; }
    @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
    .feature-card {
      background: var(--bg-low);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      padding: var(--s4);
      text-align: center;
      transition: border-color var(--t-base);
    }
    .feature-card:hover { border-color: var(--blue); }
    .feature-card mat-icon {
      font-size: 26px !important; width: 26px !important;
      height: 26px !important; line-height: 26px !important;
      color: var(--blue); margin-bottom: var(--s2);
    }
    .feature-card h4 {
      font-family: var(--fh);
      font-size: 0.9375rem; font-weight: 700;
      color: var(--text); margin-bottom: var(--s1); letter-spacing: -0.01em;
    }
    .feature-card p {
      font-family: var(--fb);
      font-size: 0.875rem; color: var(--text-muted); line-height: 1.65; margin: 0;
    }
  `],
  template: `
    <div class="container">
      <div class="fleet-features" appAos="fade-up" [aosDuration]="1500">
        <h3>{{ block.heading }}</h3>
        <div class="features-grid">
          @for (f of block.features; track f._key) {
            <div class="feature-card">
              <mat-icon>{{ f.icon }}</mat-icon>
              <h4>{{ f.title }}</h4>
              <p>{{ f.text }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class FleetFeaturesBlockComponent {
  @Input() block: SanityBlock;
}
