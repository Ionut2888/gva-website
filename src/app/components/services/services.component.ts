import { Component, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PageService } from '../../services/page.service';
import { SeoService } from '../../services/seo.service';
import { BlockRendererComponent } from '../../blocks/block-renderer.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [BlockRendererComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  private pageService = inject(PageService);
  private seoService = inject(SeoService);
  private router = inject(Router);
  protected readonly page = toSignal(this.pageService.getPageOnLangChange('services'));

  constructor() {
    effect(() => {
      const p = this.page();
      if (p) this.seoService.applyFromPage(p, this.router.url.split('?')[0]);
    });
  }
}
