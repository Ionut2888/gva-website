import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { MatIconModule } from '@angular/material/icon';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-services-grid-block',
  standalone: true,
  imports: [MatIconModule, AnimateOnScrollDirective],
  templateUrl: './services-grid-block.component.html',
  styleUrls: ['./services-grid-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServicesGridBlockComponent {
  @Input() block: SanityBlock;
}
