import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { HeroBlockComponent } from './hero-block.component';

const BLOCK = {
  slides: [
    { _key: 's1', src: '/assets/lead.jpg', alt: 'Lead truck' },
    { _key: 's2', src: '/assets/2.jpg', alt: 'Slide 2' },
  ],
  badge: 'B2B', h1_1: 'Transport', h1_2: 'Auto', subtitle: 'Sub',
  f1: 'One', f2: 'Two', f3: 'Three',
  ctaPrimaryLabel: 'Contact', ctaPrimaryLink: '/contact',
  ctaSecondaryLabel: 'Fleet', ctaSecondaryLink: '/fleet',
};

async function createComponent(platformId = 'browser') {
  await TestBed.configureTestingModule({
    imports: [HeroBlockComponent],
    providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: platformId }],
  }).compileComponents();
  const fixture = TestBed.createComponent(HeroBlockComponent);
  fixture.componentInstance.block = BLOCK;
  return fixture;
}

describe('HeroBlockComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('should create', async () => {
    const fixture = await createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a single static hero image from the first slide', async () => {
    const fixture = await createComponent();
    fixture.detectChanges();
    const imgs = (fixture.nativeElement as HTMLElement).querySelectorAll('.hero-bg img');
    expect(imgs.length).toBe(1);
    expect(imgs[0].getAttribute('alt')).toBe('Lead truck');
  });

  it('does not throw on the server (parallax guarded)', async () => {
    const fixture = await createComponent('server');
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
