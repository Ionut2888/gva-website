import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-process-steps-block',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    /* Full-bleed navy panel — one deliberate color-blocked section per page
       for rhythm, per the Punctuation Rule's amplified reading: navy also
       anchors one contrasting content section, not just header/footer/CTA. */
    .service-process {
      margin-top: var(--s12);
      padding: var(--s12) 0;
      background: var(--navy);
      position: relative;
      overflow: hidden;
    }
    .service-process::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 56px 56px;
      pointer-events: none;
    }
    .service-process .container { position: relative; z-index: 1; }
    .service-process h3 {
      font-family: var(--fh);
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 800;
      color: var(--white);
      margin-bottom: var(--s10);
      text-align: center;
      letter-spacing: -0.03em;
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
      top: 27px;
      left: calc(12.5% + 12px);
      right: calc(12.5% + 12px);
      height: 2px;
      background-image: linear-gradient(90deg, var(--blue-dim) 0 10px, transparent 10px 18px);
      background-size: 18px 2px;
      opacity: 0.5;
      z-index: 0;
    }
    .step { position: relative; z-index: 1; }
    .step-number {
      width: 56px; height: 56px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--white);
      border: 2px solid rgba(255, 255, 255, 0.25);
      border-radius: var(--r-f);
      display: flex; align-items: center; justify-content: center;
      font-family: var(--fh);
      font-size: 1.25rem; font-weight: 800;
      margin-bottom: var(--s4);
      font-variant-numeric: tabular-nums;
    }
    .step:last-child .step-number {
      background: var(--blue);
      color: var(--white);
      border-color: var(--blue);
    }
    .step-content h4 {
      font-family: var(--fh);
      font-size: 1.0625rem; font-weight: 700;
      color: var(--white);
      margin-bottom: var(--s1);
      letter-spacing: -0.015em;
    }
    .step-content p {
      font-family: var(--fb);
      font-size: 0.9375rem;
      color: var(--navy-dim);
      line-height: 1.65;
    }
    @media (max-width: 900px) {
      .process-steps { grid-template-columns: repeat(2, 1fr); gap: var(--s5); }
      .process-steps::before { display: none; }
    }
    @media (max-width: 600px) { .process-steps { grid-template-columns: 1fr; } }
    @media (max-width: 767px) { .service-process { padding: var(--s10) 0; } }
  `],
  template: `
    <div class="service-process">
      <div class="container">
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
