import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageService } from '../../services/page.service';
import { BlockRendererComponent } from '../../blocks/block-renderer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlockRendererComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private pageService = inject(PageService);
  protected readonly page = toSignal(this.pageService.getPageOnLangChange('home'));
}
