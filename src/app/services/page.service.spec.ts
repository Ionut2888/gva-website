import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { PageService } from './page.service';

const translocoTesting = TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } });

describe('PageService', () => {
  let service: PageService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [translocoTesting],
    }).compileComponents();
    service = TestBed.inject(PageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPage returns flattened document for active locale', () => {
    let result: unknown;
    service.getPage('home', 'ro').subscribe(v => (result = v));

    const req = http.expectOne(r => r.url.includes('apicdn.sanity.io'));
    req.flush({
      result: {
        _type: 'page',
        title: { ro: 'Acasă', en: 'Home' },
        sections: [],
      },
    });

    expect((result as { title: string }).title).toBe('Acasă');
  });

  it('getPage returns null on HTTP error', () => {
    let result: unknown = 'not-set';
    service.getPage('home', 'ro').subscribe(v => (result = v));

    const req = http.expectOne(r => r.url.includes('apicdn.sanity.io'));
    req.error(new ProgressEvent('network error'));

    expect(result).toBeNull();
  });

  it('flattenLocale resolves nested localized fields', () => {
    let result: unknown;
    service.getPage('home', 'en').subscribe(v => (result = v));

    const req = http.expectOne(r => r.url.includes('apicdn.sanity.io'));
    req.flush({
      result: {
        nested: { deep: { ro: 'Profund', en: 'Deep' } },
        plain: 'no locale',
      },
    });

    const r = result as { nested: { deep: string }; plain: string };
    expect(r.nested.deep).toBe('Deep');
    expect(r.plain).toBe('no locale');
  });

  it('flattenLocale falls back to "ro" when requested locale is missing', () => {
    let result: unknown;
    service.getPage('home', 'fr').subscribe(v => (result = v));

    const req = http.expectOne(r => r.url.includes('apicdn.sanity.io'));
    req.flush({ result: { title: { ro: 'Acasă', en: 'Home' } } });

    expect((result as { title: string }).title).toBe('Acasă');
  });

  it('flattenLocale handles arrays of localized objects', () => {
    let result: unknown;
    service.getPage('home', 'en').subscribe(v => (result = v));

    const req = http.expectOne(r => r.url.includes('apicdn.sanity.io'));
    req.flush({
      result: {
        items: [
          { _key: 'a', label: { ro: 'Mașini', en: 'Cars' } },
          { _key: 'b', label: { ro: 'Camioane', en: 'Trucks' } },
        ],
      },
    });

    const items = (result as { items: { label: string }[] }).items;
    expect(items[0].label).toBe('Cars');
    expect(items[1].label).toBe('Trucks');
  });

  it('preserves underscore-prefixed keys without recursion', () => {
    let result: unknown;
    service.getPage('home', 'ro').subscribe(v => (result = v));

    const req = http.expectOne(r => r.url.includes('apicdn.sanity.io'));
    req.flush({ result: { _type: 'page', _id: 'abc123' } });

    const r = result as { _type: string; _id: string };
    expect(r._type).toBe('page');
    expect(r._id).toBe('abc123');
  });
});
