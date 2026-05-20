import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { HomeComponent } from './home.component';

const translocoTesting = TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } });

describe('HomeComponent', () => {
  async function createComponent(platformId = 'browser') {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, translocoTesting],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    }).compileComponents();

    return TestBed.createComponent(HomeComponent);
  }

  it('should create', async () => {
    const fixture = await createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialise currentSlide at 0', async () => {
    const fixture = await createComponent();
    const instance = fixture.componentInstance as unknown as { currentSlide: () => number };
    expect(instance.currentSlide()).toBe(0);
  });

  it('should expose 5 images', async () => {
    const fixture = await createComponent();
    const instance = fixture.componentInstance as unknown as { images: () => unknown[] };
    expect(instance.images().length).toBe(5);
  });

  it('should advance the slide every 5 seconds in browser', fakeAsync(async () => {
    const fixture = await createComponent('browser');
    fixture.detectChanges();

    const instance = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(5000);
    expect(instance.currentSlide()).toBe(1);

    tick(5000);
    expect(instance.currentSlide()).toBe(2);

    fixture.destroy();
  }));

  it('should NOT start the slideshow on the server', fakeAsync(async () => {
    const fixture = await createComponent('server');
    fixture.detectChanges();

    const instance = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(15000); // three intervals — slide must remain 0
    expect(instance.currentSlide()).toBe(0);

    fixture.destroy();
  }));

  it('should wrap from last slide back to 0', fakeAsync(async () => {
    const fixture = await createComponent('browser');
    fixture.detectChanges();

    const instance = fixture.componentInstance as unknown as {
      currentSlide: () => number;
      images: () => unknown[];
    };

    const total = instance.images().length; // 5
    tick(total * 5000); // advance past the last slide
    expect(instance.currentSlide()).toBe(0);

    fixture.destroy();
  }));

  it('should unsubscribe on destroy (no timer leaks)', fakeAsync(async () => {
    const fixture = await createComponent('browser');
    fixture.detectChanges();

    const instance = fixture.componentInstance as unknown as { currentSlide: () => number };

    tick(5000);
    expect(instance.currentSlide()).toBe(1);

    fixture.destroy(); // stops the interval

    // No further advances expected after destroy
    tick(10000);
    expect(instance.currentSlide()).toBe(1);
  }));
});
