import {
  isSanityImage,
  optimizedSrc,
  srcSet,
  sanityImageUrlFromRef,
  SRCSET_WIDTHS,
} from './sanity-image.util';

const SANITY = 'https://cdn.sanity.io/images/abc/production/img-1920x1080.jpg';
const LOCAL = 'assets/logo.webp';

describe('sanity-image util', () => {
  describe('isSanityImage', () => {
    it('is true for a cdn.sanity.io URL', () => expect(isSanityImage(SANITY)).toBeTrue());
    it('is false for a local asset', () => expect(isSanityImage(LOCAL)).toBeFalse());
    it('is false for null/undefined', () => {
      expect(isSanityImage(null)).toBeFalse();
      expect(isSanityImage(undefined)).toBeFalse();
    });
  });

  describe('optimizedSrc', () => {
    it('appends transform params to a Sanity URL', () => {
      const out = optimizedSrc(SANITY, 800, 70);
      expect(out).toContain('w=800');
      expect(out).toContain('q=70');
      expect(out).toContain('auto=format');
      expect(out).toContain('fit=max');
    });

    it('uses & when URL already has a query string', () => {
      const out = optimizedSrc(`${SANITY}?foo=bar`, 800);
      expect(out).toContain('?foo=bar&w=800');
    });

    it('returns non-Sanity URLs untouched', () => {
      expect(optimizedSrc(LOCAL, 800)).toBe(LOCAL);
    });

    it('returns empty string for null', () => {
      expect(optimizedSrc(null as unknown as string)).toBe('');
    });
  });

  describe('srcSet', () => {
    it('builds one candidate per width for Sanity URLs', () => {
      const out = srcSet(SANITY);
      SRCSET_WIDTHS.forEach((w) => expect(out).toContain(`${w}w`));
    });

    it('is empty for non-Sanity URLs', () => {
      expect(srcSet(LOCAL)).toBe('');
    });
  });

  describe('sanityImageUrlFromRef', () => {
    it('resolves a valid image ref to a CDN URL', () => {
      const url = sanityImageUrlFromRef('image-abc123-1200x630-png', 'proj1', 'production');
      expect(url).toBe('https://cdn.sanity.io/images/proj1/production/abc123-1200x630.png');
    });

    it('returns null for a non-image ref', () => {
      expect(sanityImageUrlFromRef('file-abc-pdf', 'proj1', 'production')).toBeNull();
    });

    it('returns null for null/undefined', () => {
      expect(sanityImageUrlFromRef(null, 'p', 'd')).toBeNull();
      expect(sanityImageUrlFromRef(undefined, 'p', 'd')).toBeNull();
    });

    it('returns null for a malformed ref', () => {
      expect(sanityImageUrlFromRef('image-abc', 'p', 'd')).toBeNull();
    });
  });
});
