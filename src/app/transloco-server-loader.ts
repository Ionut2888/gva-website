import { inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';

/**
 * Server-side translation loader.
 * Reads JSON files from disk and stores each translation in TransferState
 * so the browser loader can return them synchronously without an HTTP request.
 * This prevents the async re-render that causes Angular hydration crashes.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  private transferState = inject(TransferState);

  getTranslation(lang: string): Observable<Translation> {
    const filePath = join(process.cwd(), 'public', 'i18n', `${lang}.json`);
    const translation = JSON.parse(readFileSync(filePath, 'utf-8')) as Translation;

    const key = makeStateKey<Translation>(`transloco.${lang}`);
    this.transferState.set(key, translation);

    return of(translation);
  }
}
