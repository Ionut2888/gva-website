import { defineField, defineType } from 'sanity';

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'sections',
      title: 'Content sections',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'statsBlock' },
        { type: 'efficiencyBlock' },
        { type: 'pageBannerBlock' },
        { type: 'servicesGridBlock' },
        { type: 'processStepsBlock' },
        { type: 'ctaBlock' },
        { type: 'storyBlock' },
        { type: 'valuesGridBlock' },
        { type: 'teamBlock' },
        { type: 'fleetStatsBlock' },
        { type: 'galleryBlock' },
        { type: 'fleetFeaturesBlock' },
        { type: 'contactContentBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title: `${title ?? 'Untitled'} (/${slug ?? ''})` }),
  },
});
