import { defineField, defineType } from 'sanity';

// ─── helpers ─────────────────────────────────────────────────────────────────

const s = (name: string, title?: string) =>
  defineField({ name, title: title ?? name, type: 'string' });

const t = (name: string, title?: string) =>
  defineField({ name, title: title ?? name, type: 'text', rows: 3 });

const obj = (name: string, title: string, fields: any[]) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields,
  });

// ─── schema ──────────────────────────────────────────────────────────────────

export const translationsSchema = defineType({
  name: 'translations',
  title: 'Translations',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Language code',
      type: 'string',
      description: 'e.g. ro, de, en, fr, es, hu, it, nl',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'localeName',
      title: 'Language name',
      type: 'string',
      description: 'Human-readable name, e.g. Română, Deutsch',
    }),

    // ── Navigation ────────────────────────────────────────────────────────────
    obj('nav', 'Navigation', [
      s('home'),
      s('about'),
      s('services'),
      s('fleet'),
      s('contact'),
      s('cta', 'CTA Button'),
    ]),

    // ── Home Page ─────────────────────────────────────────────────────────────
    obj('home', 'Home Page', [
      obj('hero', 'Hero Section', [
        s('badge'),
        s('h1_1', 'Headline line 1'),
        s('h1_2', 'Headline line 2'),
        t('subtitle'),
        s('f1', 'Feature 1'),
        s('f2', 'Feature 2'),
        s('f3', 'Feature 3'),
        s('cta_primary', 'Primary CTA'),
        s('cta_secondary', 'Secondary CTA'),
      ]),
      obj('stats', 'Stats Bar', [
        s('s1_label', 'Stat 1 label'),
        s('s2_label', 'Stat 2 label'),
        s('s3_label', 'Stat 3 label'),
        s('s4_label', 'Stat 4 label'),
      ]),
      obj('efficiency', 'Efficiency Section', [
        s('eyebrow'),
        s('h2', 'Heading'),
        t('body'),
        s('li1_strong'),
        s('li1_text'),
        s('li2_strong'),
        s('li2_text'),
        s('li3_strong'),
        s('li3_text'),
        s('cta'),
      ]),
    ]),

    // ── About ─────────────────────────────────────────────────────────────────
    obj('about', 'About Page', [
      s('banner_h2'),
      t('banner_subtitle'),
      s('story_h3'),
      t('story_p1'),
      t('story_p2'),
      s('values_h3'),
      s('v1_title'), t('v1_text'),
      s('v2_title'), t('v2_text'),
      s('v3_title'), t('v3_text'),
      s('v4_title'), t('v4_text'),
      s('team_h3'),
      t('team_p'),
      s('h1_title'), s('h1_text'),
      s('h2_title'), s('h2_text'),
      s('h3_title'), s('h3_text'),
    ]),

    // ── Services ──────────────────────────────────────────────────────────────
    obj('services', 'Services Page', [
      s('banner_h2'),
      t('banner_subtitle'),
      // Card 1
      s('c1_title'), t('c1_text'),
      s('c1_f1'), s('c1_f2'), s('c1_f3'), s('c1_f4'),
      // Card 2
      s('c2_title'), t('c2_text'),
      s('c2_f1'), s('c2_f2'), s('c2_f3'), s('c2_f4'),
      // Card 3
      s('c3_title'), t('c3_text'),
      s('c3_f1'), s('c3_f2'), s('c3_f3'), s('c3_f4'),
      // Card 4
      s('c4_title'), t('c4_text'),
      s('c4_f1'), s('c4_f2'), s('c4_f3'), s('c4_f4'),
      // Card 5
      s('c5_title'), t('c5_text'),
      s('c5_f1'), s('c5_f2'), s('c5_f3'), s('c5_f4'),
      // Card 6
      s('c6_title'), t('c6_text'),
      s('c6_f1'), s('c6_f2'), s('c6_f3'), s('c6_f4'),
      // Process steps
      s('process_h3'),
      s('s1_title'), t('s1_text'),
      s('s2_title'), t('s2_text'),
      s('s3_title'), t('s3_text'),
      s('s4_title'), t('s4_text'),
      // CTA
      s('cta_h3'), t('cta_text'), s('cta_btn'),
    ]),

    // ── Fleet ─────────────────────────────────────────────────────────────────
    obj('fleet', 'Fleet Page', [
      s('banner_h2'),
      t('banner_subtitle'),
      s('stat1'), s('stat2'), s('stat3'), s('stat4'),
      s('gallery_h3'),
      s('gallery_subtitle'),
      s('features_h3'),
      s('f1_title'), t('f1_text'),
      s('f2_title'), t('f2_text'),
      s('f3_title'), t('f3_text'),
      s('f4_title'), t('f4_text'),
      s('f5_title'), t('f5_text'),
      s('f6_title'), t('f6_text'),
    ]),

    // ── Contact ───────────────────────────────────────────────────────────────
    obj('contact', 'Contact Page', [
      s('banner_h2'),
      t('banner_subtitle'),
      s('commercial_title'), s('commercial_p1'), s('commercial_p2'),
      s('phone_title'), s('phone_hours'),
      s('email_title'), s('email_response'),
      s('coverage_title'), s('coverage_p1'), s('coverage_p2'),
      s('form_h3'), t('form_subtitle'),
      // Form labels & errors
      s('name_label'), s('name_placeholder'), s('name_error'),
      s('company_label'), s('company_placeholder'),
      s('email_label'), s('email_placeholder'),
      s('email_error_required'), s('email_error_invalid'),
      s('phone_label'), s('phone_placeholder'), s('phone_error'),
      s('service_label'), s('service_default'),
      s('service_dealer'), s('service_import'), s('service_fleet'),
      s('service_producer'), s('service_auction'), s('service_contract'),
      s('service_error'),
      s('message_label'), s('message_placeholder'),
      s('submit_idle'), s('submit_loading'),
      s('success_msg'), s('error_msg'),
      // Benefits
      s('benefits_h3'),
      s('b1_title'), t('b1_text'),
      s('b2_title'), t('b2_text'),
      s('b3_title'), t('b3_text'),
      s('b4_title'), t('b4_text'),
    ]),

    // ── Footer ────────────────────────────────────────────────────────────────
    obj('footer', 'Footer', [
      t('description'),
      s('services_title'), s('company_title'), s('contact_title'),
      s('link_dealer'), s('link_import'), s('link_fleet'),
      s('link_producer'), s('link_auction'), s('link_contract'),
      s('link_about'), s('link_fleet_page'), s('link_contact'), s('link_careers'), s('link_privacy'),
      s('contact_location'), s('contact_hours'),
      s('rights'), s('terms'), s('privacy'), s('cookies'),
    ]),

    // ── Terms ─────────────────────────────────────────────────────────────────
    obj('terms', 'Terms & Conditions', [
      s('title'), s('subtitle'), s('updated'),
      s('scope_title'), t('scope_body'),
      s('booking_title'), t('booking_body'),
      s('payment_title'), t('payment_body'),
      s('liability_title'), t('liability_body'),
      s('force_majeure_title'), t('force_majeure_body'),
      s('law_title'), t('law_body'),
    ]),

    // ── Privacy ───────────────────────────────────────────────────────────────
    obj('privacy', 'Privacy Policy', [
      s('title'), s('subtitle'), s('updated'),
      s('intro_title'), t('intro_body'),
      s('collected_title'), t('collected_body'),
      s('purpose_title'), t('purpose_body'),
      s('retention_title'), t('retention_body'),
      s('rights_title'), t('rights_body'),
      s('security_title'), t('security_body'),
    ]),

    // ── Cookies ───────────────────────────────────────────────────────────────
    obj('cookies', 'Cookie Policy', [
      s('title'), s('subtitle'), s('updated'),
      s('what_title'), t('what_body'),
      s('essential_title'), t('essential_body'),
      s('analytics_title'), t('analytics_body'),
      s('manage_title'), t('manage_body'),
      s('contact_title'), t('contact_body'),
    ]),
  ],

  preview: {
    select: { title: 'localeName', subtitle: 'locale' },
    prepare: ({ title, subtitle }) => ({ title: title ?? subtitle, subtitle }),
  },
});
