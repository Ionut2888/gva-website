import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SanityBlock } from '../block.types';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { SanitySrcPipe, SanitySrcsetPipe } from '../../pipes/sanity-img.pipe';

@Component({
  selector: 'app-efficiency-block',
  standalone: true,
  imports: [RouterLink, AnimateOnScrollDirective, SanitySrcPipe, SanitySrcsetPipe],
  templateUrl: './efficiency-block.component.html',
  styleUrls: ['./efficiency-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EfficiencyBlockComponent {
  @Input() block: SanityBlock;
}
