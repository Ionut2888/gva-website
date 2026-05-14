import { Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private subscription?: Subscription;
  private navigationDisabled = false;
  
  protected currentSlide = signal(0);
  protected isAutoPlaying = signal(true);
  protected slideProgress = signal(0);
  
  protected images = signal([
    { id: 0, src: 'assets/0fe30a13-5774-45e6-8dcf-2522380d3cbf.png', alt: 'GVA Auto Transport Platform 1' },
    { id: 1, src: 'assets/14d9858a-defd-49d3-864e-fe29d82c0a93.png', alt: 'GVA Auto Transport Platform 2' },
    { id: 2, src: 'assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.png', alt: 'GVA Car Carrier Truck 1' },
    { id: 3, src: 'assets/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.png', alt: 'GVA Car Carrier Truck 2' },
    { id: 4, src: 'assets/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.png', alt: 'GVA Vehicle Transport Service' }
  ]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlideshow();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private startSlideshow() {
    if (this.isAutoPlaying()) {
      this.subscription = interval(5000).subscribe(() => {
        this.nextSlide();
      });
    }
  }

  protected goToSlide(slideId: number) {
    this.disableNavigation();
    this.currentSlide.set(slideId);
    this.slideProgress.set(0);
    this.restartSlideshow();
  }

  protected nextSlide() {
    this.disableNavigation();
    const nextSlide = (this.currentSlide() + 1) % this.images().length;
    this.currentSlide.set(nextSlide);
    this.slideProgress.set(0);
  }

  protected previousSlide() {
    this.disableNavigation();
    const prevSlide = this.currentSlide() === 0 
      ? this.images().length - 1 
      : this.currentSlide() - 1;
    this.currentSlide.set(prevSlide);
    this.slideProgress.set(0);
    this.restartSlideshow();
  }

  protected getPreviousSlide(): number {
    return this.currentSlide() === 0 
      ? this.images().length - 1 
      : this.currentSlide() - 1;
  }

  protected getNextSlide(): number {
    return (this.currentSlide() + 1) % this.images().length;
  }

  protected canNavigate(): boolean {
    return !this.navigationDisabled;
  }

  protected toggleAutoplay() {
    this.isAutoPlaying.set(!this.isAutoPlaying());
    if (this.isAutoPlaying()) {
      this.startSlideshow();
    } else {
      this.subscription?.unsubscribe();
    }
  }

  protected isPlaying(): boolean {
    return this.isAutoPlaying();
  }

  protected getProgressPercentage(): number {
    return ((this.currentSlide() + 1) / this.images().length) * 100;
  }

  private disableNavigation() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.navigationDisabled = true;
    setTimeout(() => {
      this.navigationDisabled = false;
    }, 500);
  }

  private restartSlideshow() {
    this.subscription?.unsubscribe();
    if (this.isAutoPlaying()) {
      this.startSlideshow();
    }
  }
}
