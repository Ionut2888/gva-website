import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageService } from '../../services/page.service';
import { BlockRendererComponent } from '../../blocks/block-renderer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BlockRendererComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private pageService = inject(PageService);
  protected readonly page = toSignal(this.pageService.getPageOnLangChange('contact'));
}
