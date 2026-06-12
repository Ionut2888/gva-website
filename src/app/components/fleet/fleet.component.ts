import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageService } from '../../services/page.service';
import { BlockRendererComponent } from '../../blocks/block-renderer.component';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [BlockRendererComponent],
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss'],
})
export class FleetComponent {
  private pageService = inject(PageService);
  protected readonly page = toSignal(this.pageService.getPageOnLangChange('fleet'));
}
