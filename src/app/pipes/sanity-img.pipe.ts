import { Pipe, PipeTransform } from '@angular/core';
import { optimizedSrc, srcSet } from '../utils/sanity-image.util';

/** Optimized single src for a Sanity (or passthrough) image URL.
 *  Usage: [src]="url | sanitySrc:1920" */
@Pipe({ name: 'sanitySrc', standalone: true })
export class SanitySrcPipe implements PipeTransform {
  transform(url: string | null | undefined, width = 1200, quality = 75): string {
    return optimizedSrc(url ?? '', width, quality);
  }
}

/** Responsive srcset for a Sanity image URL (empty for other URLs).
 *  Usage: [srcset]="url | sanitySrcset" */
@Pipe({ name: 'sanitySrcset', standalone: true })
export class SanitySrcsetPipe implements PipeTransform {
  transform(url: string | null | undefined, quality = 75): string {
    return srcSet(url ?? '', quality);
  }
}
