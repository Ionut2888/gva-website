import { SanitySrcPipe, SanitySrcsetPipe } from './sanity-img.pipe';

const SANITY = 'https://cdn.sanity.io/images/abc/production/img-1920x1080.jpg';
const LOCAL = 'assets/logo.webp';

describe('SanitySrcPipe', () => {
  const pipe = new SanitySrcPipe();

  it('appends width to a Sanity URL', () => {
    expect(pipe.transform(SANITY, 640)).toContain('w=640');
  });

  it('passes through local URLs untouched', () => {
    expect(pipe.transform(LOCAL, 640)).toBe(LOCAL);
  });

  it('handles null', () => {
    expect(pipe.transform(null)).toBe('');
  });
});

describe('SanitySrcsetPipe', () => {
  const pipe = new SanitySrcsetPipe();

  it('builds a srcset for a Sanity URL', () => {
    expect(pipe.transform(SANITY)).toContain('640w');
  });

  it('is empty for local URLs', () => {
    expect(pipe.transform(LOCAL)).toBe('');
  });

  it('handles null', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
