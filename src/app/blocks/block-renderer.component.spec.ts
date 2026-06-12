import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { BlockRendererComponent } from './block-renderer.component';

const translocoTesting = TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } });

function setup() {
  return TestBed.configureTestingModule({
    imports: [BlockRendererComponent, translocoTesting],
    providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'browser' }],
  }).compileComponents();
}

describe('BlockRendererComponent', () => {
  beforeEach(setup);

  it('should create with empty sections', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders app-hero-block for heroBlock type', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [{ _type: 'heroBlock', _key: 'k1', slides: [] }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-hero-block')).toBeTruthy();
  });

  it('renders app-stats-block for statsBlock type', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [{ _type: 'statsBlock', _key: 'k1', items: [] }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-stats-block')).toBeTruthy();
  });

  it('renders app-page-banner-block for pageBannerBlock type', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [{ _type: 'pageBannerBlock', _key: 'k1' }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-page-banner-block')).toBeTruthy();
  });

  it('renders app-cta-block for ctaBlock type', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [{ _type: 'ctaBlock', _key: 'k1' }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-cta-block')).toBeTruthy();
  });

  it('renders app-gallery-block for galleryBlock type', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [{ _type: 'galleryBlock', _key: 'k1', images: [] }];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-gallery-block')).toBeTruthy();
  });

  it('renders nothing for unknown block type', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [{ _type: 'unknownBlock', _key: 'k1' }];
    fixture.detectChanges();
    expect(fixture.nativeElement.children.length).toBe(0);
  });

  it('renders multiple blocks in order', () => {
    const fixture = TestBed.createComponent(BlockRendererComponent);
    fixture.componentInstance.sections = [
      { _type: 'pageBannerBlock', _key: 'k1' },
      { _type: 'statsBlock', _key: 'k2', items: [] },
    ];
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-page-banner-block')).toBeTruthy();
    expect(el.querySelector('app-stats-block')).toBeTruthy();
  });
});
