import { inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

/**
 * Browser translation loader.
 * Reads translations from TransferState first (serialised by the server loader
 * into the SSR HTML), so the first load is synchronous and hydration is stable.
 * Falls back to HTTP for subsequent language switches.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);

  getTranslation(lang: string): Observable<Translation> {
    const key = makeStateKey<Translation>(`transloco.${lang}`);
    const cached = this.transferState.get<Translation | null>(key, null);

    if (cached) {
      this.transferState.remove(key);
      return of(cached);
    }

    return this.http.get<Translation>(`/i18n/${lang}.json`);
  }
}
