import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-team-block',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .team-section {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      padding: var(--s8);
      margin-top: var(--s8);
    }
    @media (max-width: 768px) { .team-section { padding: var(--s5) var(--s4); } }
    .team-section h3 {
      font-family: var(--fh);
      font-size: clamp(1.375rem, 2vw, 1.75rem);
      font-weight: 700;
      color: var(--text);
      text-align: center;
      margin-bottom: var(--s4);
      letter-spacing: -0.02em;
    }
    .team-info > p {
      font-family: var(--fb);
      text-align: center;
      font-size: 1.0625rem;
      color: var(--text-muted);
      line-height: 1.75;
      max-width: 680px;
      margin: 0 auto var(--s6);
    }
    .team-highlights {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--s4);
    }
    @media (max-width: 900px) { .team-highlights { grid-template-columns: 1fr; } }
    .highlight {
      background: var(--bg-low);
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      padding: var(--s4);
      border-left: 3px solid var(--blue);
    }
    .highlight strong {
      display: block;
      font-family: var(--fh);
      font-size: 0.9375rem; font-weight: 700;
      color: var(--text);
      margin-bottom: var(--s1);
    }
    .highlight span {
      font-family: var(--fb);
      font-size: 0.875rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
  `],
  template: `
    <div class="container">
      <div class="team-section" appAos="fade-up" [aosDuration]="1500">
        <h3>{{ block.heading }}</h3>
        <div class="team-info">
          <p>{{ block.intro }}</p>
          <div class="team-highlights">
            @for (h of block.highlights; track h._key) {
              <div class="highlight">
                <strong>{{ h.title }}</strong>
                <span>{{ h.text }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TeamBlockComponent {
  @Input() block: SanityBlock;
}
