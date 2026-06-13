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
      background: var(--bg);
      position: relative;
      padding: var(--s12) 0 var(--s10);
      border-bottom: 1px solid var(--border-subtle);
      overflow: hidden;
    }
    .page-banner::after {
      content: '';
      position: absolute;
      top: -40%; right: -8%;
      width: 640px; height: 640px;
      background: radial-gradient(circle, rgba(0,81,213,0.06) 0%, transparent 65%);
      pointer-events: none;
    }
    .page-banner .container { position: relative; z-index: 2; }
    .page-banner .section-header { margin-bottom: 0; text-align: center; }
    .page-banner .section-header h1 {
      color: var(--navy);
      font-size: clamp(2rem, 4vw, 3.25rem);
      letter-spacing: -0.03em;
      font-weight: 700;
      margin: 0;
    }
    .page-banner .section-header h1::after { display: none; }
    .page-banner .section-subtitle {
      color: var(--text-muted);
      max-width: 580px;
      margin: var(--s3) auto 0;
      line-height: 1.6;
    }
  `],
  template: `
    <div class="page-banner">
      <div class="container">
        <div class="section-header">
          <h1 appAos="fade-up" [aosDuration]="1600">{{ block.heading }}</h1>
          <p class="section-subtitle" appAos="fade-up" [aosDelay]="150" [aosDuration]="1400">{{ block.subtitle }}</p>
        </div>
      </div>
    </div>
  `,
})
export class PageBannerBlockComponent {
  @Input() block: SanityBlock;
}
