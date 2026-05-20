import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';

/**
 * Server-side translation loader.
 * Reads JSON files directly from disk during SSR / prerendering
 * so no circular HTTP request is needed.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    const filePath = join(process.cwd(), 'public', 'i18n', `${lang}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return of(JSON.parse(content) as Translation);
  }
}
