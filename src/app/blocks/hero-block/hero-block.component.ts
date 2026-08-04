import {
  AfterViewInit, Component, Input, OnDestroy, OnInit,
  ViewChild, ElementRef, ViewEncapsulation, signal,
  inject, PLATFORM_ID
} from '@angular/core';
import { SanityBlock } from '../block.types';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { SanitySrcPipe, SanitySrcsetPipe } from '../../pipes/sanity-img.pipe';

@Component({
  selector: 'app-hero-block',
  standalone: true,
  imports: [CommonModule, RouterLink, MagneticDirective, SanitySrcPipe, SanitySrcsetPipe],
  templateUrl: './hero-block.component.html',
  styleUrls: ['./hero-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroBlockComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() block: SanityBlock;

  @ViewChild('heroBg') heroBgRef?: ElementRef<HTMLElement>;

  protected currentSlide = signal(0);

  private platformId = inject(PLATFORM_ID);
  private subscription?: Subscription;
  private scrollHandler?: () => void;
  private rafId?: number;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.startSlideshow();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.initParallax();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
    if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
  }

  private startSlideshow(): void {
    const slides = this.block?.slides ?? [];
    if (slides.length < 2) return;
    this.subscription = interval(5000).subscribe(() => {
      this.currentSlide.update(i => (i + 1) % slides.length);
    });
  }

  private initParallax(): void {
    const el = this.heroBgRef?.nativeElement;
    if (!el) return;
    this.scrollHandler = () => {
      if (this.rafId !== undefined) return;
      this.rafId = requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.scrollY * 0.22}px)`;
        this.rafId = undefined;
      });
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }
}
