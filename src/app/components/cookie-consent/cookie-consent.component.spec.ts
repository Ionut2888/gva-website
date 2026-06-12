import { TestBed } from '@angular/core/testing';
import { CookieConsentComponent } from './cookie-consent.component';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

describe('CookieConsentComponent (browser)', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show banner when no consent stored', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cookie-banner')).toBeTruthy();
  });

  it('should hide banner when consent already stored', () => {
    localStorage.setItem('gva-cookie-consent', 'accepted');
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cookie-banner')).toBeNull();
  });

  it('should hide and store accepted on accept', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.cookie-banner__btn--accept').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cookie-banner')).toBeNull();
    expect(localStorage.getItem('gva-cookie-consent')).toBe('accepted');
  });

  it('should hide and store declined on decline', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.cookie-banner__btn--decline').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cookie-banner')).toBeNull();
    expect(localStorage.getItem('gva-cookie-consent')).toBe('declined');
  });
});

describe('CookieConsentComponent (server)', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  it('should not show banner on server (no localStorage access)', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    // visible stays false on server — no banner rendered
    expect(fixture.nativeElement.querySelector('.cookie-banner')).toBeNull();
  });

  it('accept() should not write localStorage on server', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    const inst = fixture.componentInstance as unknown as { accept: () => void };
    inst.accept();
    expect(localStorage.getItem('gva-cookie-consent')).toBeNull();
  });

  it('decline() should not write localStorage on server', () => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    fixture.detectChanges();
    const inst = fixture.componentInstance as unknown as { decline: () => void };
    inst.decline();
    expect(localStorage.getItem('gva-cookie-consent')).toBeNull();
  });
});
