import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AnalyticsService } from './analytics.service';

function makeRouter() {
  return { events: new Subject<unknown>() };
}

describe('AnalyticsService (browser)', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: Router, useValue: makeRouter() },
      ],
    });
    service = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    document.querySelectorAll('script[src*="googletagmanager"]').forEach(s => s.remove());
    delete window.gtag;
    delete window.dataLayer;
  });

  it('should create', () => expect(service).toBeTruthy());

  it('load() injects gtag script into document head', () => {
    service.load('G-TEST123');
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeTruthy();
  });

  it('load() is idempotent — second call does not inject a second script', () => {
    service.load('G-TEST123');
    service.load('G-TEST123');
    expect(document.querySelectorAll('script[src*="googletagmanager"]').length).toBe(1);
  });

  it('load() does nothing when id is empty', () => {
    service.load('');
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });

  it('initIfConsented() calls load when consent is accepted', () => {
    localStorage.setItem('gva-cookie-consent', 'accepted');
    spyOn(service, 'load');
    service.initIfConsented('G-TEST123');
    expect(service.load).toHaveBeenCalledWith('G-TEST123');
  });

  it('initIfConsented() does not call load when consent is absent', () => {
    spyOn(service, 'load');
    service.initIfConsented('G-TEST123');
    expect(service.load).not.toHaveBeenCalled();
  });

  it('initIfConsented() does not call load when consent is declined', () => {
    localStorage.setItem('gva-cookie-consent', 'declined');
    spyOn(service, 'load');
    service.initIfConsented('G-TEST123');
    expect(service.load).not.toHaveBeenCalled();
  });

  it('initIfConsented() does nothing when id is empty', () => {
    localStorage.setItem('gva-cookie-consent', 'accepted');
    spyOn(service, 'load');
    service.initIfConsented('');
    expect(service.load).not.toHaveBeenCalled();
  });
});

describe('AnalyticsService (server)', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: Router, useValue: makeRouter() },
      ],
    });
    service = TestBed.inject(AnalyticsService);
  });

  it('load() does nothing on server', () => {
    service.load('G-TEST123');
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });

  it('initIfConsented() does nothing on server', () => {
    spyOn(service, 'load');
    service.initIfConsented('G-TEST123');
    expect(service.load).not.toHaveBeenCalled();
  });
});
