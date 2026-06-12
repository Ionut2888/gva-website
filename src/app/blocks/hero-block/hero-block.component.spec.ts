import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { HeroBlockComponent } from './hero-block.component';

const SLIDES = [
  { _key: 's1', image: '/assets/1.jpg', alt: 'Slide 1' },
  { _key: 's2', image: '/assets/2.jpg', alt: 'Slide 2' },
  { _key: 's3', image: '/assets/3.jpg', alt: 'Slide 3' },
];
const BLOCK = { slides: SLIDES, heading: 'Premium Cars', cta: 'Explore', ctaLink: '/fleet' };

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

  it('currentSlide starts at 0', async () => {
    const fixture = await createComponent();
    const inst = fixture.componentInstance as unknown as { currentSlide: () => number };
    expect(inst.currentSlide()).toBe(0);
  });

  it('advances slide every 5 seconds in browser', fakeAsync(async () => {
    const fixture = await createComponent('browser');
    fixture.detectChanges();
    const inst = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(5000);
    expect(inst.currentSlide()).toBe(1);
    tick(5000);
    expect(inst.currentSlide()).toBe(2);

    fixture.destroy();
  }));

  it('does NOT start slideshow on the server', fakeAsync(async () => {
    const fixture = await createComponent('server');
    fixture.detectChanges();
    const inst = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(15000);
    expect(inst.currentSlide()).toBe(0);
    fixture.destroy();
  }));

  it('wraps from last slide back to 0', fakeAsync(async () => {
    const fixture = await createComponent('browser');
    fixture.detectChanges();
    const inst = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(SLIDES.length * 5000);
    expect(inst.currentSlide()).toBe(0);
    fixture.destroy();
  }));

  it('unsubscribes on destroy (no timer leaks)', fakeAsync(async () => {
    const fixture = await createComponent('browser');
    fixture.detectChanges();
    const inst = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(5000);
    expect(inst.currentSlide()).toBe(1);
    fixture.destroy();
    tick(10000);
    expect(inst.currentSlide()).toBe(1);
  }));
});
