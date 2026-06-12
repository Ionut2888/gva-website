import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageService } from '../../services/page.service';
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
  protected readonly page = toSignal(this.pageService.getPageOnLangChange('services'));
}
