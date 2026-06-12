/** Helpers for Sanity's image CDN.
 *  Sanity serves images from cdn.sanity.io and supports on-the-fly
 *  transforms via query params (?w=…&auto=format&q=…). We use that to
 *  ship right-sized, modern-format (AVIF/WebP) images without a build step.
 *  Non-Sanity URLs (local assets, external) are returned untouched. */

const SANITY_HOST = 'cdn.sanity.io';

/** Widths used to build responsive srcset candidates. */
export const SRCSET_WIDTHS = [400, 640, 768, 1024, 1366, 1920];

export function isSanityImage(url: string | null | undefined): boolean {
  return typeof url === 'string' && url.includes(SANITY_HOST);
}

/** Appends transform params to a Sanity CDN URL. No-op for other URLs. */
export function optimizedSrc(url: string, width = 1200, quality = 75): string {
  if (!isSanityImage(url)) return url ?? '';
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${width}&q=${quality}&auto=format&fit=max`;
}

/** Builds a responsive srcset string. Empty for non-Sanity URLs. */
export function srcSet(url: string, quality = 75): string {
  if (!isSanityImage(url)) return '';
  return SRCSET_WIDTHS.map((w) => `${optimizedSrc(url, w, quality)} ${w}w`).join(', ');
}

/** Resolves a Sanity image asset _ref to a CDN URL.
 *  Ref format: image-<assetId>-<width>x<height>-<ext> */
export function sanityImageUrlFromRef(
  ref: string | null | undefined,
  projectId: string,
  dataset: string,
): string | null {
  if (!ref || !ref.startsWith('image-')) return null;
  const parts = ref.split('-');
  if (parts.length !== 4) return null;
  const [, id, dims, ext] = parts;
  return `https://${SANITY_HOST}/images/${projectId}/${dataset}/${id}-${dims}.${ext}`;
}
