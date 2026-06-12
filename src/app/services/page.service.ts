import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoService } from '@jsverse/transloco';
import { TransferState, makeStateKey } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { SANITY_CONFIG } from '../sanity.config';
import { SanityBlock } from '../blocks/block.types';

const { projectId, dataset, apiVersion } = SANITY_CONFIG;
const CDN_URL = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

const LOCALES = ['ro', 'de', 'en', 'fr', 'es', 'hu', 'it', 'nl'];

@Injectable({ providedIn: 'root' })
export class PageService {
  private http = inject(HttpClient);
  private transloco = inject(TranslocoService);
  private transferState = inject(TransferState);

  /** Fetches page by slug and re-flattens when active language changes. */
  getPageOnLangChange(slug: string): Observable<SanityBlock> {
    return this.transloco.langChanges$.pipe(
      switchMap(lang => this.getPage(slug, lang)),
    );
  }

  getPage(slug: string, locale?: string): Observable<SanityBlock> {
    const lang = locale ?? this.transloco.getActiveLang();
    const stateKey = makeStateKey<SanityBlock>(`page.${slug}`);
    const cached = this.transferState.get<SanityBlock>(stateKey, null);

    if (cached) {
      this.transferState.remove(stateKey);
      return of(this.flattenLocale(cached, lang));
    }

    const query = `*[_type=="page"&&slug.current=="${slug}"][0]`;
    return this.http
      .get<{ result: SanityBlock }>(CDN_URL, { params: { query } })
      .pipe(
        tap(res => { if (res.result) this.transferState.set(stateKey, res.result); }),
        map(res => res.result ? this.flattenLocale(res.result, lang) : null),
        catchError(() => of(null)),
      );
  }

  private flattenLocale(data: SanityBlock, locale: string): SanityBlock {
    if (!data || typeof data !== 'object') return data;
    if (Array.isArray(data)) return data.map((item: SanityBlock) => this.flattenLocale(item, locale));

    const keys = Object.keys(data);
    const hasLocaleKeys = LOCALES.some(l => keys.includes(l));

    if (hasLocaleKeys) {
      return data[locale] ?? data['ro'] ?? data[keys.find((k: string) => LOCALES.includes(k))!] ?? '';
    }

    const result: SanityBlock = {};
    for (const key of keys) {
      result[key] = key.startsWith('_') ? data[key] : this.flattenLocale(data[key], locale);
    }
    return result;
  }
}
