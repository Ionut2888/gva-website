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

  protected currentSlide = signal(0);

  protected images = signal([
    { id: 0, src: 'assets/0fe30a13-5774-45e6-8dcf-2522380d3cbf.png', alt: 'GVA Auto Transport Platform 1' },
    { id: 1, src: 'assets/14d9858a-defd-49d3-864e-fe29d82c0a93.png', alt: 'GVA Auto Transport Platform 2' },
    { id: 2, src: 'assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.png', alt: 'GVA Car Carrier Truck 1' },
    { id: 3, src: 'assets/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.png', alt: 'GVA Car Carrier Truck 2' },
    { id: 4, src: 'assets/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.png', alt: 'GVA Vehicle Transport Service' }
  ]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlideshow();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private startSlideshow(): void {
    this.subscription = interval(5000).subscribe(() => {
      this.currentSlide.update(i => (i + 1) % this.images().length);
    });
  }
}
