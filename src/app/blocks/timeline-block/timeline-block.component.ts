import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-timeline-block',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .timeline-block { max-width: var(--mw); margin: 0 auto; padding: var(--s10) var(--s4); }
    .timeline-block__head { max-width: 640px; margin: 0 auto var(--s8); text-align: center; }
    .timeline-block__heading {
      font-family: var(--fh); font-size: clamp(1.75rem, 3vw, 2rem); font-weight: 700;
      color: var(--navy); letter-spacing: -0.02em; margin: 0;
    }
    .timeline-block__subtitle { font-family: var(--fb); color: var(--text-muted); margin: var(--s2) 0 0; line-height: 1.6; }

    .timeline-block__rail {
      list-style: none; margin: 0 auto; padding: 0 0 0 var(--s5);
      max-width: 720px; border-left: 2px solid var(--border-subtle);
    }
    .timeline-block__item { position: relative; padding-bottom: var(--s6); }
    .timeline-block__item:last-child { padding-bottom: 0; }
    .timeline-block__dot {
      position: absolute; left: calc(-1 * var(--s5) - 5px); top: 5px;
      width: 10px; height: 10px; border-radius: var(--r-f);
      background: var(--blue); border: 2px solid var(--white);
    }
    .timeline-block__year {
      display: block; font-family: var(--fh); font-size: 0.875rem; font-weight: 700;
      letter-spacing: 0.05em; text-transform: uppercase; color: var(--blue); margin-bottom: var(--s1);
    }
    .timeline-block__title { font-family: var(--fh); font-size: 1.25rem; font-weight: 600; color: var(--navy); margin: 0 0 var(--s1); }
    .timeline-block__text { font-family: var(--fb); color: var(--text-muted); line-height: 1.6; margin: 0; }

    @media (max-width: 600px) {
      .timeline-block { padding: var(--s8) var(--s3); }
      .timeline-block__head { text-align: left; }
    }
  `],
  template: `
    <section class="timeline-block" appAos="fade-up" [aosDuration]="1500">
      <div class="timeline-block__head">
        @if (block.heading) { <h2 class="timeline-block__heading">{{ block.heading }}</h2> }
        @if (block.subtitle) { <p class="timeline-block__subtitle">{{ block.subtitle }}</p> }
      </div>
      <ol class="timeline-block__rail">
        @for (item of block.items; track item._key) {
          <li class="timeline-block__item">
            <span class="timeline-block__dot"></span>
            @if (item.year) { <span class="timeline-block__year">{{ item.year }}</span> }
            <h3 class="timeline-block__title">{{ item.title }}</h3>
            <p class="timeline-block__text">{{ item.text }}</p>
          </li>
        }
      </ol>
    </section>
  `,
})
export class TimelineBlockComponent {
  @Input() block: SanityBlock;
}
