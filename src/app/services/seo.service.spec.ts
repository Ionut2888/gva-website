import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { SeoService, PageSeoConfig } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleSpy: jasmine.SpyObj<Title>;
  let metaSpy: jasmine.SpyObj<Meta>;
  let routerEventSubject: Subject<unknown>;
  let mockRouter: { events: Subject<unknown>; navigate: jasmine.Spy };
  let mockDoc: Partial<Document>;

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    routerEventSubject = new Subject<unknown>();

    mockRouter = {
      events: routerEventSubject,
      navigate: jasmine.createSpy('navigate'),
    };

    mockDoc = {
      querySelector: jasmine.createSpy('querySelector').and.returnValue(null),
      createElement: jasmine.createSpy('createElement').and.callFake(() => ({
        setAttribute: jasmine.createSpy('setAttribute'),
        textContent: '',
      })),
      head: { appendChild: jasmine.createSpy('appendChild') } as unknown as HTMLHeadElement,
    } as unknown as Partial<Document>;

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
        { provide: Router, useValue: mockRouter },
        { provide: DOCUMENT, useValue: mockDoc },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(SeoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('apply()', () => {
    const baseConfig: PageSeoConfig = {
      title: 'Test Title',
      description: 'Test description',
    };

    it('should set the page title', () => {
      service.apply(baseConfig);
      expect(titleSpy.setTitle).toHaveBeenCalledOnceWith('Test Title');
    });

    it('should update the description meta tag', () => {
      service.apply(baseConfig);
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Test description',
      });
    });

    it('should update keywords meta tag when provided', () => {
      service.apply({ ...baseConfig, keywords: 'foo, bar' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        name: 'keywords',
        content: 'foo, bar',
      });
    });

    it('should NOT update keywords meta tag when not provided', () => {
      service.apply(baseConfig); // no keywords
      const calls = (metaSpy.updateTag as jasmine.Spy).calls
        .allArgs()
        .map((args: unknown[]) => (args[0] as { name?: string }).name);
      expect(calls).not.toContain('keywords');
    });

    it('should set og:title to ogTitle when provided', () => {
      service.apply({ ...baseConfig, ogTitle: 'OG Title' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'OG Title',
      });
    });

    it('should fall back to title for og:title when ogTitle is omitted', () => {
      service.apply(baseConfig);
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'Test Title',
      });
    });

    it('should set og:description to ogDescription when provided', () => {
      service.apply({ ...baseConfig, ogDescription: 'OG Desc' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'OG Desc',
      });
    });

    it('should fall back to description for og:description when ogDescription is omitted', () => {
      service.apply(baseConfig);
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'Test description',
      });
    });

    it('should set og:url and attempt canonical update when canonical is provided', () => {
      service.apply({ ...baseConfig, canonical: 'https://example.com/page' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:url',
        content: 'https://example.com/page',
      });
    });

    it('should set twitter:title', () => {
      service.apply({ ...baseConfig, ogTitle: 'TW Title' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        name: 'twitter:title',
        content: 'TW Title',
      });
    });

    it('should set twitter:description', () => {
      service.apply({ ...baseConfig, ogDescription: 'TW Desc' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        name: 'twitter:description',
        content: 'TW Desc',
      });
    });
  });

  describe('init()', () => {
    it('should call apply() with the correct config on NavigationEnd for /home', () => {
      const applySpy = spyOn(service, 'apply');
      service.init();

      routerEventSubject.next(new NavigationEnd(1, '/home', '/home'));

      expect(applySpy).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ canonical: 'https://www.gvaverkaufer.ro/home' })
      );
    });

    it('should call apply() for each known route', () => {
      const applySpy = spyOn(service, 'apply');
      service.init();

      const routes = ['/home', '/services', '/fleet', '/about', '/contact'];
      routes.forEach(r => routerEventSubject.next(new NavigationEnd(1, r, r)));

      expect(applySpy).toHaveBeenCalledTimes(routes.length);
    });

    it('should NOT call apply() for unknown routes', () => {
      const applySpy = spyOn(service, 'apply');
      service.init();

      routerEventSubject.next(new NavigationEnd(1, '/unknown-page', '/unknown-page'));

      expect(applySpy).not.toHaveBeenCalled();
    });

    it('should strip query strings from the URL before matching', () => {
      const applySpy = spyOn(service, 'apply');
      service.init();

      routerEventSubject.next(new NavigationEnd(1, '/contact?ref=email', '/contact?ref=email'));

      expect(applySpy).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ canonical: 'https://www.gvaverkaufer.ro/contact' })
      );
    });
  });

  describe('injectBusinessSchema()', () => {
    it('should create a script element with type application/ld+json', () => {
      service.injectBusinessSchema({ '@type': 'LocalBusiness', name: 'Test Co' });
      expect(mockDoc.createElement).toHaveBeenCalledWith('script');
    });

    it('should append the script to document head', () => {
      service.injectBusinessSchema({ '@type': 'LocalBusiness', name: 'Test Co' });
      expect(mockDoc.head?.appendChild).toHaveBeenCalled();
    });

    it('should set @context to https://schema.org', () => {
      const el = { setAttribute: jasmine.createSpy(), textContent: '' };
      (mockDoc.createElement as jasmine.Spy).and.returnValue(el);
      service.injectBusinessSchema({ '@type': 'LocalBusiness' });
      expect(JSON.parse(el.textContent)['@context']).toBe('https://schema.org');
    });
  });

  describe('applyFromPage()', () => {
    it('should use CMS metaTitle when provided', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage({ seo: { metaTitle: 'CMS Title' } }, '/home');
      expect(applySpy).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'CMS Title' }));
    });

    it('should use CMS metaDescription when provided', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage({ seo: { metaDescription: 'CMS Desc' } }, '/home');
      expect(applySpy).toHaveBeenCalledWith(jasmine.objectContaining({ description: 'CMS Desc' }));
    });

    it('should fall back to static config when no CMS seo provided', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage({ title: 'Page' }, '/home');
      expect(applySpy).toHaveBeenCalledWith(
        jasmine.objectContaining({ canonical: 'https://www.gvaverkaufer.ro/home' })
      );
    });

    it('should do nothing when no static config and no seo', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage({ title: 'Page' }, '/unknown');
      expect(applySpy).not.toHaveBeenCalled();
    });

    it('should handle null page gracefully', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage(null, '/home');
      expect(applySpy).toHaveBeenCalled();
    });

    it('should resolve CMS ogImage ref to an og:image URL', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage(
        { seo: { ogImage: { asset: { _ref: 'image-abc123-1200x630-jpg' } } } },
        '/home',
      );
      expect(applySpy).toHaveBeenCalledWith(
        jasmine.objectContaining({ ogImage: jasmine.stringMatching(/abc123-1200x630\.jpg$/) }),
      );
    });

    it('should not set ogImage when CMS ref is absent', () => {
      const applySpy = spyOn(service, 'apply');
      service.applyFromPage({ seo: { metaTitle: 'X' } }, '/home');
      const arg = applySpy.calls.mostRecent().args[0];
      expect(arg.ogImage).toBeUndefined();
    });
  });

  describe('apply() og:image', () => {
    it('sets og:image and twitter:image when ogImage provided', () => {
      service.apply({ title: 'T', description: 'D', ogImage: 'https://cdn.sanity.io/x.jpg' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({ property: 'og:image', content: 'https://cdn.sanity.io/x.jpg' });
      expect(metaSpy.updateTag).toHaveBeenCalledWith({ name: 'twitter:image', content: 'https://cdn.sanity.io/x.jpg' });
    });
  });
});
