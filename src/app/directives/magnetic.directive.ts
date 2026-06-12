import { Directive, ElementRef, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Subtle magnetic cursor-tracking effect for CTA buttons.
 * The element nudges slightly toward the mouse on hover and springs back on leave.
 *
 * Usage: <a class="btn btn-primary" magnetic>
 */
@Directive({ selector: '[appMagnetic]', standalone: true })
export class MagneticDirective {
  private el  = inject(ElementRef);
  private pid = inject(PLATFORM_ID);

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.pid)) return;
    const el   = this.el.nativeElement as HTMLElement;
    const rect = el.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.28;
    const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.28;
    el.style.transform    = `translate(${dx}px, ${dy}px)`;
    el.style.transition   = 'transform 0.12s cubic-bezier(0.22,1,0.36,1)';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    const el = this.el.nativeElement as HTMLElement;
    el.style.transform  = 'translate(0,0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
  }
}
