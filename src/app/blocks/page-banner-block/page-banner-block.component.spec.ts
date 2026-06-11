import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { PageBannerBlockComponent } from './page-banner-block.component';

const BLOCK = { heading: 'About Us', subtitle: 'Learn more about our company' };

describe('PageBannerBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBannerBlockComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PageBannerBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render heading and subtitle', () => {
    const fixture = TestBed.createComponent(PageBannerBlockComponent);
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('About Us');
    expect(el.textContent).toContain('Learn more about our company');
  });
});
