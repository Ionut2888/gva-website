import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { MatIconModule } from '@angular/material/icon';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-fleet-stats-block',
  standalone: true,
  imports: [MatIconModule, AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .fleet-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: var(--white);
      border: 1px solid var(--border-subtle);
      border-radius: var(--r-lg);
      margin-top: var(--s8);
      margin-bottom: var(--s10);
      overflow: hidden;
    }
    @media (max-width: 900px) { .fleet-stats { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .fleet-stats { grid-template-columns: 1fr; } }
    .stat-card {
      padding: var(--s5) var(--s4);
      display: flex; align-items: center; gap: var(--s3);
      border-right: 1px solid var(--border-subtle);
      transition: background var(--t-base);
    }
    .stat-card:last-child { border-right: none; }
    .stat-card:hover { background: var(--bg-low); }
    @media (max-width: 900px) {
      .stat-card { border-right: none; border-bottom: 1px solid var(--border-subtle); }
      .stat-card:nth-child(odd) { border-right: 1px solid var(--border-subtle); }
      .stat-card:last-child, .stat-card:nth-last-child(2):nth-child(odd) { border-bottom: none; }
    }
    .stat-icon {
      width: 48px; height: 48px;
      border-radius: var(--r-md);
      background: var(--bg-low);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .stat-icon mat-icon {
      font-size: 24px !important; width: 24px !important;
      height: 24px !important; line-height: 24px !important;
      color: var(--blue);
    }
    .stat-content h3 {
      font-family: var(--fh);
      font-size: 1.5rem; font-weight: 800;
      color: var(--blue); margin: 0 0 2px; line-height: 1; letter-spacing: -0.02em;
    }
    .stat-content p {
      font-family: var(--fh);
      font-size: 0.6875rem; font-weight: 600;
      color: var(--text-muted); margin: 0;
      text-transform: uppercase; letter-spacing: 0.07em;
    }
  `],
  template: `
    <div class="container">
      <div class="fleet-stats">
        @for (item of block.items; track item._key; let i = $index) {
          <div class="stat-card" appAos="scale-up" [aosDelay]="i * 100" [aosDuration]="1400">
            <div class="stat-icon"><mat-icon>{{ item.icon }}</mat-icon></div>
            <div class="stat-content">
              <h3>{{ item.value }}</h3>
              <p>{{ item.label }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class FleetStatsBlockComponent {
  @Input() block: SanityBlock;
}
