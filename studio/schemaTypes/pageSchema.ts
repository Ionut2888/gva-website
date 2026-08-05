import { defineField, defineType } from 'sanity';

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', description: 'Overrides the default page title in search results (50–60 chars)' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, description: 'Summary shown in search results (150–160 chars)' }),
        defineField({ name: 'keywords', title: 'Keywords', type: 'string', description: 'Comma-separated keywords' }),
        defineField({ name: 'ogImage', title: 'Social Share Image', type: 'image', description: 'Image shown when shared on social media (1200×630 px recommended)' }),
      ],
    }),
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
        { type: 'timelineBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title: `${title ?? 'Untitled'} (/${slug ?? ''})` }),
  },
});
