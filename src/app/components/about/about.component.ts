import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageService } from '../../services/page.service';
import { BlockRendererComponent } from '../../blocks/block-renderer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BlockRendererComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  private pageService = inject(PageService);
  protected readonly page = toSignal(this.pageService.getPageOnLangChange('about'));
}
