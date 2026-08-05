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
    .fleet-features { padding: 0; }
    .fleet-features h3 {
      font-family: var(--fh);
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: var(--navy);
      margin-bottom: var(--s6);
      letter-spacing: -0.02em;
      max-width: 640px;
    }
    @media (max-width: 768px) {
      .fleet-features h3 { font-size: 1.5rem; margin-bottom: var(--s5); }
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--s3);
    }
    .features-grid > * { min-width: 0; }
    .feature-card {
      background: var(--white);
      border: 1px solid var(--border-subtle);
      border-radius: var(--r-lg);
      padding: var(--s4);
      text-align: left;
      transition: box-shadow var(--t-base);
    }
    .feature-card:hover { box-shadow: var(--sh-ambient); }
    .feature-icon {
      width: 48px; height: 48px;
      background: var(--bg-low);
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: var(--s3);
    }
    .feature-icon mat-icon {
      font-size: 26px !important; width: 26px !important;
      height: 26px !important; line-height: 26px !important;
      color: var(--blue);
    }
    .feature-card h4 {
      font-family: var(--fh);
      font-size: 1.25rem; font-weight: 600;
      color: var(--navy); margin-bottom: var(--s2); letter-spacing: -0.01em;
    }
    .feature-card p {
      font-family: var(--fb);
      font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; margin: 0;
    }
  `],
  template: `
    <div class="container">
      <div class="fleet-features" appAos="fade-up" [aosDuration]="1500">
        <h3>{{ block.heading }}</h3>
        <div class="features-grid">
          @for (f of block.features; track f._key) {
            <div class="feature-card">
              <div class="feature-icon"><mat-icon>{{ f.icon }}</mat-icon></div>
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
