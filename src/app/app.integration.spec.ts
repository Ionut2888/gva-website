import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { routes } from './app.routes';
import { SeoService } from './services/seo.service';

/**
 * Integration tests — verify that the router wires up the correct lazy-loaded
 * component for each URL and that the wildcard redirect works.
 *
 * RouterTestingHarness navigates and activates the routed component so we can
 * inspect the activated instance without needing the full App shell.
 */
describe('App routing (integration)', () => {
  let seoSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj('SeoService', ['init']);

    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        { provide: SeoService, useValue: seoSpy },
        importProvidersFrom(
          TranslocoTestingModule.forRoot({ langs: { ro: {} }, translocoConfig: { defaultLang: 'ro' } })
        ),
      ],
    }).compileComponents();
  });

  it('navigating to "/" should redirect to "/home"', async () => {
    await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/home');
  });

  it('navigating to "/home" should activate HomeComponent', async () => {
    const { HomeComponent } = await import('./components/home/home.component');
    const harness = await RouterTestingHarness.create('/home');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(HomeComponent);
  });

  it('navigating to "/about" should activate AboutComponent', async () => {
    const { AboutComponent } = await import('./components/about/about.component');
    const harness = await RouterTestingHarness.create('/about');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(AboutComponent);
  });

  it('navigating to "/services" should activate ServicesComponent', async () => {
    const { ServicesComponent } = await import('./components/services/services.component');
    const harness = await RouterTestingHarness.create('/services');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(ServicesComponent);
  });

  it('navigating to "/fleet" should activate FleetComponent', async () => {
    const { FleetComponent } = await import('./components/fleet/fleet.component');
    const harness = await RouterTestingHarness.create('/fleet');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(FleetComponent);
  });

  it('navigating to "/contact" should activate ContactComponent', async () => {
    const { ContactComponent } = await import('./components/contact/contact.component');
    const harness = await RouterTestingHarness.create('/contact');
    expect(harness.routeDebugElement?.componentInstance).toBeInstanceOf(ContactComponent);
  });

  it('navigating to an unknown route should redirect to "/home"', async () => {
    await RouterTestingHarness.create('/this-route-does-not-exist');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/home');
  });
});
