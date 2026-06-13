import {
  AfterViewInit, Component, Input, OnDestroy,
  ViewChild, ElementRef, ViewEncapsulation,
  inject, PLATFORM_ID
} from '@angular/core';
import { SanityBlock } from '../block.types';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
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
export class HeroBlockComponent implements AfterViewInit, OnDestroy {
  @Input() block: SanityBlock;

  @ViewChild('heroBg') heroBgRef?: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);
  private scrollHandler?: () => void;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.initParallax();
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
  }

  private initParallax(): void {
    const el = this.heroBgRef?.nativeElement;
    if (!el) return;
    this.scrollHandler = () => { el.style.transform = `translateY(${window.scrollY * 0.22}px)`; };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }
}
