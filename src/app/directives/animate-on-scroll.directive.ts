import {
  AfterViewInit, Directive, ElementRef, inject,
  Input, OnDestroy, OnInit, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll-triggered entrance animation directive.
 *
 * Usage:
 *   <div aos="fade-up" [aosDelay]="150" [aosDuration]="800">
 *
 * Animation types: fade-up | fade-left | fade-right | fade-in | scale-up | slide-up | clip-reveal
 * CSS lives in global styles.scss (AOS section).
 */
@Directive({ selector: '[appAos]', standalone: true })
export class AnimateOnScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  private el  = inject(ElementRef);
  private pid = inject(PLATFORM_ID);

  @Input() appAos      = 'fade-up';
  @Input() aosDelay    = 0;
  @Input() aosDuration = 700;
  @Input() aosOnce     = true;

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    el.setAttribute('data-aos', this.appAos);
    el.style.setProperty('--aos-delay', `${this.aosDelay}ms`);
    el.style.setProperty('--aos-dur',   `${this.aosDuration}ms`);
    el.classList.add('aos-init');
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.pid)) return;
    const el = this.el.nativeElement as HTMLElement;

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('aos-visible');
          if (this.aosOnce) this.observer?.unobserve(el);
        } else if (!this.aosOnce) {
          el.classList.remove('aos-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    this.observer.observe(el);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
