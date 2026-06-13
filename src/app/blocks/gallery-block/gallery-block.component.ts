import { Component, Input, signal, inject, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { SanitySrcPipe, SanitySrcsetPipe } from '../../pipes/sanity-img.pipe';

@Component({
  selector: 'app-gallery-block',
  standalone: true,
  imports: [MatIconModule, AnimateOnScrollDirective, SanitySrcPipe, SanitySrcsetPipe],
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryBlockComponent {
  @Input() block: SanityBlock;

  private doc = inject(DOCUMENT);
  protected selectedImage = signal<SanityBlock>(null);

  protected openLightbox(image: SanityBlock): void {
    this.selectedImage.set(image);
    if (this.doc.body) this.doc.body.style.overflow = 'hidden';
  }

  protected closeLightbox(): void {
    this.selectedImage.set(null);
    if (this.doc.body) this.doc.body.style.overflow = 'auto';
  }
}
