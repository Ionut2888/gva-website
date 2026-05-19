import { TestBed } from '@angular/core/testing';
import { FleetComponent } from './fleet.component';

describe('FleetComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetComponent],
      // Use the real DOCUMENT so Angular Material CDK (HighContrastModeDetector) works.
    }).compileComponents();
  });

  afterEach(() => {
    // Restore body overflow after each test that may have changed it.
    document.body.style.overflow = '';
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose 9 fleet images', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    const instance = fixture.componentInstance as unknown as {
      fleetImages: () => unknown[];
    };
    expect(instance.fleetImages().length).toBe(9);
  });

  it('selectedImage should be null initially', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    const instance = fixture.componentInstance as unknown as {
      selectedImage: () => unknown;
    };
    expect(instance.selectedImage()).toBeNull();
  });

  it('openLightbox should set selectedImage', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    const instance = fixture.componentInstance as unknown as {
      fleetImages: () => { id: number; src: string; alt: string; title: string; description: string }[];
      selectedImage: () => unknown;
      openLightbox: (img: unknown) => void;
    };

    const firstImage = instance.fleetImages()[0];
    instance.openLightbox(firstImage);

    expect(instance.selectedImage()).toEqual(firstImage);
  });

  it('openLightbox should set body overflow to hidden', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    const instance = fixture.componentInstance as unknown as {
      fleetImages: () => { id: number; src: string; alt: string; title: string; description: string }[];
      openLightbox: (img: unknown) => void;
    };

    instance.openLightbox(instance.fleetImages()[0]);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closeLightbox should clear selectedImage', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    const instance = fixture.componentInstance as unknown as {
      fleetImages: () => { id: number; src: string; alt: string; title: string; description: string }[];
      selectedImage: () => unknown;
      openLightbox: (img: unknown) => void;
      closeLightbox: () => void;
    };

    instance.openLightbox(instance.fleetImages()[0]);
    instance.closeLightbox();

    expect(instance.selectedImage()).toBeNull();
  });

  it('closeLightbox should reset body overflow to auto', () => {
    const fixture = TestBed.createComponent(FleetComponent);
    const instance = fixture.componentInstance as unknown as {
      fleetImages: () => { id: number; src: string; alt: string; title: string; description: string }[];
      openLightbox: (img: unknown) => void;
      closeLightbox: () => void;
    };

    instance.openLightbox(instance.fleetImages()[0]);
    instance.closeLightbox();

    expect(document.body.style.overflow).toBe('auto');
  });
});
