import { defineField, defineType, defineArrayMember } from 'sanity';

// ─── Locale helpers ───────────────────────────────────────────────────────────

const LOCALES = ['ro', 'de', 'en', 'fr', 'es', 'hu', 'it', 'nl'] as const;

/** Localized single-line string */
const ls = (name: string, title?: string) =>
  defineField({
    name, title: title ?? name, type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: LOCALES.map(l => defineField({ name: l, title: l.toUpperCase(), type: 'string' })),
  });

/** Localized multi-line text */
const lt = (name: string, title?: string) =>
  defineField({
    name, title: title ?? name, type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: LOCALES.map(l => defineField({ name: l, title: l.toUpperCase(), type: 'text', rows: 3 })),
  });

// ─── Blocks ───────────────────────────────────────────────────────────────────

export const heroBlock = defineType({
  name: 'heroBlock', title: 'Hero Block', type: 'object',
  fields: [
    ls('badge'),
    ls('h1_1', 'Headline line 1'),
    ls('h1_2', 'Headline line 2 (accent)'),
    lt('subtitle'),
    ls('f1', 'Feature 1'), ls('f2', 'Feature 2'), ls('f3', 'Feature 3'),
    ls('ctaPrimaryLabel', 'Primary CTA label'),
    defineField({ name: 'ctaPrimaryLink', type: 'string', initialValue: '/contact' }),
    ls('ctaSecondaryLabel', 'Secondary CTA label'),
    defineField({ name: 'ctaSecondaryLink', type: 'string', initialValue: '/fleet' }),
    defineField({
      name: 'slides', title: 'Slideshow images', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'src', type: 'string' }),
          defineField({ name: 'alt', type: 'string' }),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Hero Block' }) },
});

export const statsBlock = defineType({
  name: 'statsBlock', title: 'Stats Block', type: 'object',
  fields: [
    defineField({
      name: 'items', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'value', type: 'string' }),
          ls('label'),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Stats Block' }) },
});

export const efficiencyBlock = defineType({
  name: 'efficiencyBlock', title: 'Efficiency Block', type: 'object',
  fields: [
    ls('eyebrow'), ls('heading'), lt('body'),
    defineField({ name: 'imageSrc', type: 'string' }),
    defineField({ name: 'imageAlt', type: 'string' }),
    defineField({
      name: 'items', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [ls('strong'), ls('text')],
      })],
    }),
    ls('ctaLabel', 'CTA label'),
    defineField({ name: 'ctaLink', type: 'string', initialValue: '/contact' }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Efficiency Block' }) },
});

export const pageBannerBlock = defineType({
  name: 'pageBannerBlock', title: 'Page Banner Block', type: 'object',
  fields: [ls('heading'), lt('subtitle')],
  preview: { select: { title: 'heading.ro' }, prepare: ({ title }) => ({ title: `Banner: ${title ?? ''}` }) },
});

export const servicesGridBlock = defineType({
  name: 'servicesGridBlock', title: 'Services Grid Block', type: 'object',
  fields: [
    defineField({
      name: 'cards', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'icon', type: 'string', description: 'Material icon name' }),
          ls('title'), lt('text'),
          defineField({ name: 'featured', type: 'boolean', initialValue: false }),
          defineField({
            name: 'features', type: 'array',
            of: [defineArrayMember({
              type: 'object',
              fields: [ls('text')],
            })],
          }),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Services Grid Block' }) },
});

export const processStepsBlock = defineType({
  name: 'processStepsBlock', title: 'Process Steps Block', type: 'object',
  fields: [
    ls('heading'),
    defineField({
      name: 'steps', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [ls('title'), lt('text')],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Process Steps Block' }) },
});

export const ctaBlock = defineType({
  name: 'ctaBlock', title: 'CTA Block', type: 'object',
  fields: [
    ls('heading'), lt('text'),
    ls('buttonLabel'),
    defineField({ name: 'buttonLink', type: 'string', initialValue: '/contact' }),
  ],
  preview: { select: { title: 'heading.ro' }, prepare: ({ title }) => ({ title: `CTA: ${title ?? ''}` }) },
});

export const storyBlock = defineType({
  name: 'storyBlock', title: 'Story Block', type: 'object',
  fields: [
    ls('heading'), lt('p1'), lt('p2'),
    defineField({ name: 'imageSrc', type: 'string' }),
    defineField({ name: 'imageAlt', type: 'string' }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Story Block' }) },
});

export const valuesGridBlock = defineType({
  name: 'valuesGridBlock', title: 'Values Grid Block', type: 'object',
  fields: [
    ls('heading'),
    defineField({
      name: 'values', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'icon', type: 'string' }),
          ls('title'), lt('text'),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Values Grid Block' }) },
});

export const teamBlock = defineType({
  name: 'teamBlock', title: 'Team Block', type: 'object',
  fields: [
    ls('heading'), lt('intro'),
    defineField({
      name: 'highlights', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [ls('title'), ls('text')],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Team Block' }) },
});

export const fleetStatsBlock = defineType({
  name: 'fleetStatsBlock', title: 'Fleet Stats Block', type: 'object',
  fields: [
    defineField({
      name: 'items', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'icon', type: 'string' }),
          defineField({ name: 'value', type: 'string' }),
          ls('label'),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Fleet Stats Block' }) },
});

export const galleryBlock = defineType({
  name: 'galleryBlock', title: 'Gallery Block', type: 'object',
  fields: [
    ls('heading'), ls('subtitle'),
    defineField({
      name: 'images', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'src', type: 'string' }),
          defineField({ name: 'alt', type: 'string' }),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Gallery Block' }) },
});

export const fleetFeaturesBlock = defineType({
  name: 'fleetFeaturesBlock', title: 'Fleet Features Block', type: 'object',
  fields: [
    ls('heading'),
    defineField({
      name: 'features', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'icon', type: 'string' }),
          ls('title'), lt('text'),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Fleet Features Block' }) },
});

export const contactContentBlock = defineType({
  name: 'contactContentBlock', title: 'Contact Content Block', type: 'object',
  fields: [
    ls('commercialTitle'), ls('commercialP1'), ls('commercialP2'),
    ls('phoneTitle'), ls('phoneHours'),
    ls('emailTitle'), ls('emailResponse'),
    ls('coverageTitle'), ls('coverageP1'), ls('coverageP2'),
    ls('formHeading'), lt('formSubtitle'),
    ls('benefitsHeading'),
    defineField({
      name: 'benefits', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'icon', type: 'string' }),
          ls('title'), lt('text'),
        ],
      })],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Contact Content Block' }) },
});
