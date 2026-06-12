import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { GalleryBlockComponent } from './gallery-block.component';

const IMAGE = { _key: 'img1', src: '/assets/car1.jpg', alt: 'Car 1', title: 'BMW M3' };
const BLOCK = {
  heading: 'Our Fleet',
  images: [IMAGE, { _key: 'img2', src: '/assets/car2.jpg', alt: 'Car 2', title: 'Audi A6' }],
};

describe('GalleryBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  afterEach(() => { document.body.style.overflow = ''; });

  it('should create', () => {
    const fixture = TestBed.createComponent(GalleryBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('selectedImage should be null initially', () => {
    const fixture = TestBed.createComponent(GalleryBlockComponent);
    const inst = fixture.componentInstance as unknown as { selectedImage: () => unknown };
    expect(inst.selectedImage()).toBeNull();
  });

  it('openLightbox sets selectedImage and locks body scroll', () => {
    const fixture = TestBed.createComponent(GalleryBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      selectedImage: () => unknown;
      openLightbox: (img: unknown) => void;
    };
    inst.openLightbox(IMAGE);
    expect(inst.selectedImage()).toEqual(IMAGE);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closeLightbox clears selectedImage and restores body scroll', () => {
    const fixture = TestBed.createComponent(GalleryBlockComponent);
    const inst = fixture.componentInstance as unknown as {
      selectedImage: () => unknown;
      openLightbox: (img: unknown) => void;
      closeLightbox: () => void;
    };
    inst.openLightbox(IMAGE);
    inst.closeLightbox();
    expect(inst.selectedImage()).toBeNull();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should render without errors with block data', () => {
    const fixture = TestBed.createComponent(GalleryBlockComponent);
    fixture.componentInstance.block = BLOCK;
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
