import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-stats-block',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .stats-float-wrapper {
      max-width: var(--mw);
      margin: -4.5rem auto 0;
      padding: 0 var(--s4);
      position: relative;
      z-index: 20;
    }
    @media (max-width: 768px) { .stats-float-wrapper { padding: 0 var(--s3); } }

    .quick-stats {
      background: var(--white);
      border: 1px solid var(--border-subtle);
      border-radius: var(--r-lg);
      overflow: visible;
      box-shadow: var(--sh-ambient);
    }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }

    .stat-item {
      padding: var(--s6) var(--s4);
      text-align: center;
      position: relative;
    }
    .stat-item + .stat-item { border-left: 1px solid var(--border-subtle); }

    .stat-number {
      font-family: var(--fh);
      font-size: clamp(2.25rem, 4vw, 3.25rem);
      font-weight: 800;
      color: var(--blue);
      line-height: 1;
      margin-bottom: var(--s2);
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
    }

    .stat-label {
      font-family: var(--fh);
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.09em;
    }

    @media (max-width: 900px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stat-item:nth-child(3) { border-left: none; border-top: 1px solid var(--border-subtle); }
      .stat-item:nth-child(4) { border-top: 1px solid var(--border-subtle); }
    }
    @media (max-width: 767px) {
      .stats-float-wrapper { margin-top: -2rem; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stat-item {
        padding: var(--s3) var(--s2);
        border-left: none !important;
        border: 1px solid var(--border-subtle);
        margin: -0.5px;
      }
    }
  `],
  template: `
    <div class="stats-float-wrapper" appAos="slide-up" [aosDelay]="100" [aosDuration]="1600">
      <section class="quick-stats manifest-corners">
        <div class="stats-grid">
          @for (item of block.items; track item._key) {
            <div class="stat-item">
              <div class="stat-number">{{ item.value }}</div>
              <div class="stat-label">{{ item.label }}</div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class StatsBlockComponent {
  @Input() block: SanityBlock;
}
