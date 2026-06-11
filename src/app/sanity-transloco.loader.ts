import { inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SANITY_CONFIG } from './sanity.config';

const { projectId, dataset, apiVersion } = SANITY_CONFIG;

/** Sections that live as top-level fields in the translations document. */
const PROJECTION = 'nav,home,about,services,fleet,contact,footer,terms,privacy,cookies';

/** GROQ query: fetch the translations document for a given locale. */
const query = (locale: string) =>
  `*[_type=="translations"&&locale=="${locale}"][0]{${PROJECTION}}`;

@Injectable({ providedIn: 'root' })
export class SanityTranslocoLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);

  getTranslation(lang: string): Observable<Translation> {
    const stateKey = makeStateKey<Translation>(`transloco.${lang}`);
    const cached = this.transferState.get<Translation | null>(stateKey, null);

    if (cached) {
      this.transferState.remove(stateKey);
      return of(cached);
    }

    const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

    return this.http
      .get<{ result: Translation }>(url, { params: { query: query(lang) } })
      .pipe(
        map(res => res.result ?? {}),
        catchError(() => of({})),
      );
  }
}
