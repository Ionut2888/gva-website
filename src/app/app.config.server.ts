import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TRANSLOCO_LOADER } from '@jsverse/transloco';
import { TranslocoServerLoader } from './transloco-server-loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // Use filesystem loader on server — avoids circular HTTP request during prerender
    { provide: TRANSLOCO_LOADER, useClass: TranslocoServerLoader }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
