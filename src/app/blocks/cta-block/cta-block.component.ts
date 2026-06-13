import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-cta-block',
  standalone: true,
  imports: [RouterLink, AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .cta-section {
      background: var(--navy);
      border-radius: var(--r-xl);
      padding: var(--s10) var(--s8);
      text-align: center;
      margin-top: var(--s10);
      position: relative;
      overflow: hidden;
    }
    .cta-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
    }
    .cta-section h3 {
      position: relative; z-index: 1;
      font-family: var(--fh);
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: var(--white);
      margin-bottom: var(--s2);
      letter-spacing: -0.02em;
    }
    .cta-section p {
      position: relative; z-index: 1;
      color: var(--navy-dim);
      font-size: 1.0625rem;
      max-width: 560px;
      margin: 0 auto var(--s6);
    }
    .cta-section .btn { position: relative; z-index: 1; }
    @media (max-width: 600px) { .cta-section { padding: var(--s8) var(--s4); } }
  `],
  template: `
    <div class="container">
      <div class="cta-section" appAos="fade-up" [aosDuration]="1500">
        <h3>{{ block.heading }}</h3>
        <p>{{ block.text }}</p>
        <a [routerLink]="block.buttonLink" class="btn btn-primary">{{ block.buttonLabel }}</a>
      </div>
    </div>
  `,
})
export class CtaBlockComponent {
  @Input() block: SanityBlock;
}
