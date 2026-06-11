import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-page-banner-block',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .page-banner {
      background: var(--navy);
      position: relative;
      padding: var(--s12) 0 var(--s10);
      overflow: hidden;
    }
    .page-banner::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 64px 64px;
      pointer-events: none;
    }
    .page-banner::after {
      content: '';
      position: absolute;
      top: -30%; right: -10%;
      width: 700px; height: 700px;
      background: radial-gradient(circle, rgba(0,81,213,0.15) 0%, transparent 65%);
      pointer-events: none;
    }
    .page-banner .container { position: relative; z-index: 2; }
    .page-banner .section-header { margin-bottom: 0; text-align: center; }
    .page-banner .section-header h2 {
      color: var(--white);
      font-size: clamp(2rem, 4vw, 3.25rem);
      letter-spacing: -0.03em;
      font-weight: 800;
    }
    .page-banner .section-header h2::after { display: none; }
    .page-banner .section-subtitle {
      color: var(--navy-dim);
      max-width: 580px;
      margin: var(--s3) auto 0;
    }
  `],
  template: `
    <div class="page-banner">
      <div class="container">
        <div class="section-header">
          <h2 appAos="fade-up" [aosDuration]="1600">{{ block.heading }}</h2>
          <p class="section-subtitle" appAos="fade-up" [aosDelay]="150" [aosDuration]="1400">{{ block.subtitle }}</p>
        </div>
      </div>
    </div>
  `,
})
export class PageBannerBlockComponent {
  @Input() block: SanityBlock;
}
