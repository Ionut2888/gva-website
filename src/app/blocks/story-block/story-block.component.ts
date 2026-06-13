import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { SanitySrcPipe, SanitySrcsetPipe } from '../../pipes/sanity-img.pipe';

@Component({
  selector: 'app-story-block',
  standalone: true,
  imports: [AnimateOnScrollDirective, SanitySrcPipe, SanitySrcsetPipe],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .about-story {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s8);
      align-items: center;
      margin-top: var(--s8);
    }
    .about-story > * { min-width: 0; }
    @media (max-width: 900px) {
      .about-story { grid-template-columns: 1fr; gap: var(--s5); }
    }
    .story-text h3 {
      font-family: var(--fh);
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      color: var(--text);
      margin-bottom: var(--s3);
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .story-text p {
      font-family: var(--fb);
      color: var(--text-muted);
      line-height: 1.75;
      margin-bottom: var(--s3);
      font-size: 1rem;
    }
    .story-image img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      border-radius: var(--r-sm);
      border: 1px solid var(--border);
    }
  `],
  template: `
    <div class="container">
      <div class="about-story">
        <div class="story-text" appAos="fade-right" [aosDuration]="1800">
          <h3>{{ block.heading }}</h3>
          <p>{{ block.p1 }}</p>
          <p>{{ block.p2 }}</p>
        </div>
        <div class="story-image" appAos="fade-left" [aosDelay]="100" [aosDuration]="1800">
          <img [src]="block.imageSrc | sanitySrc:1024" [srcset]="block.imageSrc | sanitySrcset"
               sizes="(max-width: 768px) 100vw, 50vw"
               [alt]="block.imageAlt" loading="lazy" decoding="async">
        </div>
      </div>
    </div>
  `,
})
export class StoryBlockComponent {
  @Input() block: SanityBlock;
}
