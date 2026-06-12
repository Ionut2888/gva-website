import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-process-steps-block',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .service-process {
      margin-top: var(--s12);
      padding: var(--s10) 0;
      border-top: 1px solid var(--border);
    }
    .service-process h3 {
      font-family: var(--fh);
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: var(--text);
      margin-bottom: var(--s8);
      text-align: center;
      letter-spacing: -0.02em;
    }
    .process-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--s4);
      position: relative;
    }
    .process-steps::before {
      content: '';
      position: absolute;
      top: 24px;
      left: calc(12.5% + 12px);
      right: calc(12.5% + 12px);
      height: 1px;
      background: var(--border);
      z-index: 0;
    }
    .step { position: relative; z-index: 1; }
    .step-number {
      width: 48px; height: 48px;
      background: var(--navy);
      color: var(--white);
      border-radius: var(--r-sm);
      display: flex; align-items: center; justify-content: center;
      font-family: var(--fh);
      font-size: 1.125rem; font-weight: 800;
      margin-bottom: var(--s3);
    }
    .step-content h4 {
      font-family: var(--fh);
      font-size: 0.9375rem; font-weight: 700;
      color: var(--text);
      margin-bottom: 0.5rem;
      letter-spacing: -0.01em;
    }
    .step-content p {
      font-family: var(--fb);
      font-size: 0.875rem;
      color: var(--text-muted);
      line-height: 1.65;
    }
    @media (max-width: 900px) {
      .process-steps { grid-template-columns: repeat(2, 1fr); }
      .process-steps::before { display: none; }
    }
    @media (max-width: 600px) { .process-steps { grid-template-columns: 1fr; } }
  `],
  template: `
    <div class="container">
      <div class="service-process">
        <h3 appAos="fade-up" [aosDuration]="1500">{{ block.heading }}</h3>
        <div class="process-steps">
          @for (step of block.steps; track step._key; let i = $index) {
            <div class="step" appAos="fade-up" [aosDelay]="i * 100" [aosDuration]="1400">
              <div class="step-number">{{ i + 1 }}</div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.text }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProcessStepsBlockComponent {
  @Input() block: SanityBlock;
}
