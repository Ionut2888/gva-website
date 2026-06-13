import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode, APP_INITIALIZER, inject, PLATFORM_ID, ErrorHandler } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter, withInMemoryScrolling, Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { SanityTranslocoLoader } from './sanity-transloco.loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    tracesSampleRate: 0.1,
    integrations: [Sentry.browserTracingIntegration()],
  });
}

/** Preload the active language before Angular hydrates so *transloco renders
 *  synchronously and matches the SSR DOM — preventing hydration crashes. */
function preloadTranslations() {
  const transloco = inject(TranslocoService);
  const platformId = inject(PLATFORM_ID);
  return () => {
    let lang = transloco.getDefaultLang();
    if (isPlatformBrowser(platformId)) {
      const saved = localStorage.getItem('gva-lang');
      if (saved && ['ro', 'de', 'en', 'fr', 'es', 'hu', 'it', 'nl'].includes(saved)) {
        lang = saved;
        transloco.setActiveLang(lang);
      }
    }
    return transloco.load(lang).toPromise();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    ...(environment.sentryDsn ? [
      { provide: ErrorHandler, useValue: Sentry.createErrorHandler() },
      { provide: Sentry.TraceService, deps: [Router] },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      { provide: APP_INITIALIZER, useFactory: () => () => {}, deps: [Sentry.TraceService], multi: true },
    ] : []),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['ro', 'de', 'en', 'fr', 'es', 'hu', 'it', 'nl'],
        defaultLang: 'ro',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: SanityTranslocoLoader,
    }),
    { provide: APP_INITIALIZER, useFactory: preloadTranslations, multi: true },
  ]
};
