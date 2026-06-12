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
      margin: -2.75rem auto 0;
      padding: 0 var(--s4);
      position: relative;
      z-index: 20;
    }
    @media (max-width: 768px) { .stats-float-wrapper { padding: 0 var(--s3); } }

    .quick-stats {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.10), 0 12px 40px rgba(0,0,0,0.08);
    }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }

    .stat-item {
      padding: var(--s5) var(--s4);
      text-align: center;
      position: relative;
    }
    .stat-item + .stat-item { border-left: 1px solid var(--border); }

    .stat-number {
      font-family: var(--fh);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--blue);
      line-height: 1;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .stat-label {
      font-family: var(--fh);
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    @media (max-width: 900px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stat-item:nth-child(3) { border-left: none; border-top: 1px solid var(--border); }
      .stat-item:nth-child(4) { border-top: 1px solid var(--border); }
    }
    @media (max-width: 767px) {
      .stats-float-wrapper { margin-top: -2rem; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stat-item {
        padding: var(--s3) var(--s2);
        border-left: none !important;
        border: 1px solid var(--border);
        margin: -0.5px;
      }
    }
  `],
  template: `
    <div class="stats-float-wrapper" appAos="slide-up" [aosDelay]="100" [aosDuration]="1600">
      <section class="quick-stats">
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
