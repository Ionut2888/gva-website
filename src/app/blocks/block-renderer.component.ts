import { Component, Input } from '@angular/core';
import { SanityBlock } from './block.types';
import { CommonModule } from '@angular/common';
import { HeroBlockComponent }            from './hero-block/hero-block.component';
import { StatsBlockComponent }           from './stats-block/stats-block.component';
import { EfficiencyBlockComponent }      from './efficiency-block/efficiency-block.component';
import { PageBannerBlockComponent }      from './page-banner-block/page-banner-block.component';
import { ServicesGridBlockComponent }    from './services-grid-block/services-grid-block.component';
import { ProcessStepsBlockComponent }    from './process-steps-block/process-steps-block.component';
import { CtaBlockComponent }             from './cta-block/cta-block.component';
import { StoryBlockComponent }           from './story-block/story-block.component';
import { ValuesGridBlockComponent }      from './values-grid-block/values-grid-block.component';
import { TeamBlockComponent }            from './team-block/team-block.component';
import { FleetStatsBlockComponent }      from './fleet-stats-block/fleet-stats-block.component';
import { GalleryBlockComponent }         from './gallery-block/gallery-block.component';
import { FleetFeaturesBlockComponent }   from './fleet-features-block/fleet-features-block.component';
import { ContactContentBlockComponent }  from './contact-content-block/contact-content-block.component';

@Component({
  selector: 'app-block-renderer',
  standalone: true,
  imports: [
    CommonModule,
    HeroBlockComponent,
    StatsBlockComponent,
    EfficiencyBlockComponent,
    PageBannerBlockComponent,
    ServicesGridBlockComponent,
    ProcessStepsBlockComponent,
    CtaBlockComponent,
    StoryBlockComponent,
    ValuesGridBlockComponent,
    TeamBlockComponent,
    FleetStatsBlockComponent,
    GalleryBlockComponent,
    FleetFeaturesBlockComponent,
    ContactContentBlockComponent,
  ],
  template: `
    @for (block of sections; track block._key) {
      @switch (block._type) {
        @case ('heroBlock')           { <app-hero-block           [block]="block" /> }
        @case ('statsBlock')          { <app-stats-block          [block]="block" /> }
        @case ('efficiencyBlock')     { <app-efficiency-block     [block]="block" /> }
        @case ('pageBannerBlock')     { <app-page-banner-block    [block]="block" /> }
        @case ('servicesGridBlock')   { <app-services-grid-block  [block]="block" /> }
        @case ('processStepsBlock')   { <app-process-steps-block  [block]="block" /> }
        @case ('ctaBlock')            { <app-cta-block            [block]="block" /> }
        @case ('storyBlock')          { <app-story-block          [block]="block" /> }
        @case ('valuesGridBlock')     { <app-values-grid-block    [block]="block" /> }
        @case ('teamBlock')           { <app-team-block           [block]="block" /> }
        @case ('fleetStatsBlock')     { <app-fleet-stats-block    [block]="block" /> }
        @case ('galleryBlock')        { <app-gallery-block        [block]="block" /> }
        @case ('fleetFeaturesBlock')  { <app-fleet-features-block [block]="block" /> }
        @case ('contactContentBlock') { <app-contact-content-block [block]="block" /> }
      }
    }
  `,
})
export class BlockRendererComponent {
  @Input() sections: SanityBlock[] = [];
}
