import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { CtaBlockComponent } from './cta-block.component';

const BLOCK = { heading: 'Get in Touch', text: 'Contact us today.', buttonLabel: 'Contact', buttonLink: '/contact' };

describe('CtaBlockComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaBlockComponent],
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CtaBlockComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render heading, text and button', () => {
    const fixture = TestBed.createComponent(CtaBlockComponent);
    fixture.componentInstance.block = BLOCK;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Get in Touch');
    expect(el.textContent).toContain('Contact us today.');
    expect(el.querySelector('a')?.textContent?.trim()).toBe('Contact');
  });
});
