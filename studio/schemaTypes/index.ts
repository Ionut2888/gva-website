import { translationsSchema } from './translationsSchema';
import { pageSchema } from './pageSchema';
import {
  heroBlock, statsBlock, efficiencyBlock, pageBannerBlock,
  servicesGridBlock, processStepsBlock, ctaBlock,
  storyBlock, valuesGridBlock, teamBlock,
  fleetStatsBlock, galleryBlock, fleetFeaturesBlock,
  contactContentBlock,
} from './blockSchemas';

export const schemaTypes = [
  translationsSchema,
  pageSchema,
  heroBlock, statsBlock, efficiencyBlock, pageBannerBlock,
  servicesGridBlock, processStepsBlock, ctaBlock,
  storyBlock, valuesGridBlock, teamBlock,
  fleetStatsBlock, galleryBlock, fleetFeaturesBlock,
  contactContentBlock,
];
