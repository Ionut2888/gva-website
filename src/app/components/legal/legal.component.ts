import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

export type LegalPage = 'terms' | 'privacy' | 'cookies';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [TranslocoModule, RouterLink],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent {
  protected page = signal<LegalPage>('terms');

  constructor() {
    inject(ActivatedRoute).data
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.page.set(data['page'] as LegalPage));
  }
}
