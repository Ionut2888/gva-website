/**
 * Seed Sanity with page documents (content blocks) from the existing i18n JSON files.
 *
 * Usage:
 *   cd studio
 *   SANITY_TOKEN=your_token node scripts/seed-pages.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PROJECT_ID = 'es1eh557';
const DATASET   = 'production';
const LOCALES   = ['ro', 'de', 'en', 'fr', 'es', 'hu', 'it', 'nl'];

// ── Client ─────────────────────────────────────────────────────────────────
const token = process.env['SANITY_TOKEN'];
if (!token) { console.error('Set SANITY_TOKEN before running.'); process.exit(1); }

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET,
  apiVersion: '2024-01-01', token, useCdn: false,
});

// ── Load all locale files ───────────────────────────────────────────────────
const i18nDir = resolve(__dirname, '../../public/i18n');
const all = {};
for (const l of LOCALES) {
  try { all[l] = JSON.parse(readFileSync(resolve(i18nDir, `${l}.json`), 'utf-8')); }
  catch { all[l] = {}; }
}

/** Build a localized string field: { ro: '...', de: '...', ... } */
const ls = (getter) => Object.fromEntries(LOCALES.map(l => [l, getter(all[l]) ?? '']));

/** Alias — localized text (same structure, different Sanity field type) */
const lt = ls;

// ── Page documents ──────────────────────────────────────────────────────────

// Home page
const homePage = {
  _id:   'page-home',
  _type: 'page',
  title: 'Home',
  slug:  { _type: 'slug', current: 'home' },
  sections: [
    {
      _type: 'heroBlock', _key: 'hero',
      badge:              ls(t => t.home?.hero?.badge),
      h1_1:               ls(t => t.home?.hero?.h1_1),
      h1_2:               ls(t => t.home?.hero?.h1_2),
      subtitle:           lt(t => t.home?.hero?.subtitle),
      f1:                 ls(t => t.home?.hero?.f1),
      f2:                 ls(t => t.home?.hero?.f2),
      f3:                 ls(t => t.home?.hero?.f3),
      ctaPrimaryLabel:    ls(t => t.home?.hero?.cta_primary),
      ctaPrimaryLink:     '/contact',
      ctaSecondaryLabel:  ls(t => t.home?.hero?.cta_secondary),
      ctaSecondaryLink:   '/fleet',
      slides: [
        { _key: 's1', src: 'assets/0fe30a13-5774-45e6-8dcf-2522380d3cbf.webp', alt: 'GVA Auto Transport Platform 1' },
        { _key: 's2', src: 'assets/14d9858a-defd-49d3-864e-fe29d82c0a93.webp', alt: 'GVA Auto Transport Platform 2' },
        { _key: 's3', src: 'assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.webp', alt: 'GVA Car Carrier Truck 1' },
        { _key: 's4', src: 'assets/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.webp', alt: 'GVA Car Carrier Truck 2' },
        { _key: 's5', src: 'assets/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.webp', alt: 'GVA Vehicle Transport Service' },
      ],
    },
    {
      _type: 'statsBlock', _key: 'stats',
      items: [
        { _key: 'st1', value: '7+',    label: ls(t => t.home?.stats?.s1_label) },
        { _key: 'st2', value: '8–9',   label: ls(t => t.home?.stats?.s2_label) },
        { _key: 'st3', value: '5.000+',label: ls(t => t.home?.stats?.s3_label) },
        { _key: 'st4', value: '0',     label: ls(t => t.home?.stats?.s4_label) },
      ],
    },
    {
      _type: 'efficiencyBlock', _key: 'efficiency',
      eyebrow:  ls(t => t.home?.efficiency?.eyebrow),
      heading:  ls(t => t.home?.efficiency?.h2),
      body:     lt(t => t.home?.efficiency?.body),
      imageSrc: 'assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.webp',
      imageAlt: 'Platformă de transport auto GVA Verkaufer — lot complet',
      items: [
        { _key: 'i1', strong: ls(t => t.home?.efficiency?.li1_strong), text: ls(t => t.home?.efficiency?.li1_text) },
        { _key: 'i2', strong: ls(t => t.home?.efficiency?.li2_strong), text: ls(t => t.home?.efficiency?.li2_text) },
        { _key: 'i3', strong: ls(t => t.home?.efficiency?.li3_strong), text: ls(t => t.home?.efficiency?.li3_text) },
      ],
      ctaLabel: ls(t => t.home?.efficiency?.cta),
      ctaLink:  '/contact',
    },
  ],
};

// About page
const aboutPage = {
  _id:   'page-about',
  _type: 'page',
  title: 'About',
  slug:  { _type: 'slug', current: 'about' },
  sections: [
    {
      _type:    'pageBannerBlock', _key: 'banner',
      heading:  ls(t => t.about?.banner_h2),
      subtitle: lt(t => t.about?.banner_subtitle),
    },
    {
      _type:    'storyBlock', _key: 'story',
      heading:  ls(t => t.about?.story_h3),
      p1:       lt(t => t.about?.story_p1),
      p2:       lt(t => t.about?.story_p2),
      imageSrc: 'assets/50b4e409-17ee-4f74-9197-779f9aeada34.png',
      imageAlt: 'GVA Verkaufer Auto Transport',
    },
    {
      _type:   'valuesGridBlock', _key: 'values',
      heading: ls(t => t.about?.values_h3),
      values: [
        { _key: 'v1', icon: 'inventory_2',   title: ls(t => t.about?.v1_title), text: lt(t => t.about?.v1_text) },
        { _key: 'v2', icon: 'handshake',     title: ls(t => t.about?.v2_title), text: lt(t => t.about?.v2_text) },
        { _key: 'v3', icon: 'security',      title: ls(t => t.about?.v3_title), text: lt(t => t.about?.v3_text) },
        { _key: 'v4', icon: 'verified_user', title: ls(t => t.about?.v4_title), text: lt(t => t.about?.v4_text) },
      ],
    },
    {
      _type:   'teamBlock', _key: 'team',
      heading: ls(t => t.about?.team_h3),
      intro:   lt(t => t.about?.team_p),
      highlights: [
        { _key: 'h1', title: ls(t => t.about?.h1_title), text: ls(t => t.about?.h1_text) },
        { _key: 'h2', title: ls(t => t.about?.h2_title), text: ls(t => t.about?.h2_text) },
        { _key: 'h3', title: ls(t => t.about?.h3_title), text: ls(t => t.about?.h3_text) },
      ],
    },
  ],
};

// Services page
const servicesPage = {
  _id:   'page-services',
  _type: 'page',
  title: 'Services',
  slug:  { _type: 'slug', current: 'services' },
  sections: [
    {
      _type:    'pageBannerBlock', _key: 'banner',
      heading:  ls(t => t.services?.banner_h2),
      subtitle: lt(t => t.services?.banner_subtitle),
    },
    {
      _type: 'servicesGridBlock', _key: 'grid',
      cards: [
        {
          _key: 'c1', icon: 'store', featured: true,
          title: ls(t => t.services?.c1_title), text: lt(t => t.services?.c1_text),
          features: [
            { _key: 'f1', text: ls(t => t.services?.c1_f1) },
            { _key: 'f2', text: ls(t => t.services?.c1_f2) },
            { _key: 'f3', text: ls(t => t.services?.c1_f3) },
            { _key: 'f4', text: ls(t => t.services?.c1_f4) },
          ],
        },
        {
          _key: 'c2', icon: 'flight_land', featured: false,
          title: ls(t => t.services?.c2_title), text: lt(t => t.services?.c2_text),
          features: [
            { _key: 'f1', text: ls(t => t.services?.c2_f1) },
            { _key: 'f2', text: ls(t => t.services?.c2_f2) },
            { _key: 'f3', text: ls(t => t.services?.c2_f3) },
            { _key: 'f4', text: ls(t => t.services?.c2_f4) },
          ],
        },
        {
          _key: 'c3', icon: 'corporate_fare', featured: false,
          title: ls(t => t.services?.c3_title), text: lt(t => t.services?.c3_text),
          features: [
            { _key: 'f1', text: ls(t => t.services?.c3_f1) },
            { _key: 'f2', text: ls(t => t.services?.c3_f2) },
            { _key: 'f3', text: ls(t => t.services?.c3_f3) },
            { _key: 'f4', text: ls(t => t.services?.c3_f4) },
          ],
        },
        {
          _key: 'c4', icon: 'precision_manufacturing', featured: false,
          title: ls(t => t.services?.c4_title), text: lt(t => t.services?.c4_text),
          features: [
            { _key: 'f1', text: ls(t => t.services?.c4_f1) },
            { _key: 'f2', text: ls(t => t.services?.c4_f2) },
            { _key: 'f3', text: ls(t => t.services?.c4_f3) },
            { _key: 'f4', text: ls(t => t.services?.c4_f4) },
          ],
        },
        {
          _key: 'c5', icon: 'gavel', featured: false,
          title: ls(t => t.services?.c5_title), text: lt(t => t.services?.c5_text),
          features: [
            { _key: 'f1', text: ls(t => t.services?.c5_f1) },
            { _key: 'f2', text: ls(t => t.services?.c5_f2) },
            { _key: 'f3', text: ls(t => t.services?.c5_f3) },
            { _key: 'f4', text: ls(t => t.services?.c5_f4) },
          ],
        },
        {
          _key: 'c6', icon: 'assignment', featured: false,
          title: ls(t => t.services?.c6_title), text: lt(t => t.services?.c6_text),
          features: [
            { _key: 'f1', text: ls(t => t.services?.c6_f1) },
            { _key: 'f2', text: ls(t => t.services?.c6_f2) },
            { _key: 'f3', text: ls(t => t.services?.c6_f3) },
            { _key: 'f4', text: ls(t => t.services?.c6_f4) },
          ],
        },
      ],
    },
    {
      _type:   'processStepsBlock', _key: 'process',
      heading: ls(t => t.services?.process_h3),
      steps: [
        { _key: 's1', title: ls(t => t.services?.s1_title), text: lt(t => t.services?.s1_text) },
        { _key: 's2', title: ls(t => t.services?.s2_title), text: lt(t => t.services?.s2_text) },
        { _key: 's3', title: ls(t => t.services?.s3_title), text: lt(t => t.services?.s3_text) },
        { _key: 's4', title: ls(t => t.services?.s4_title), text: lt(t => t.services?.s4_text) },
      ],
    },
    {
      _type:       'ctaBlock', _key: 'cta',
      heading:     ls(t => t.services?.cta_h3),
      text:        lt(t => t.services?.cta_text),
      buttonLabel: ls(t => t.services?.cta_btn),
      buttonLink:  '/contact',
    },
  ],
};

// Fleet page
const fleetPage = {
  _id:   'page-fleet',
  _type: 'page',
  title: 'Fleet',
  slug:  { _type: 'slug', current: 'fleet' },
  sections: [
    {
      _type:    'pageBannerBlock', _key: 'banner',
      heading:  ls(t => t.fleet?.banner_h2),
      subtitle: lt(t => t.fleet?.banner_subtitle),
    },
    {
      _type: 'fleetStatsBlock', _key: 'stats',
      items: [
        { _key: 'st1', icon: 'directions_car', value: '4',    label: ls(t => t.fleet?.stat1) },
        { _key: 'st2', icon: 'inventory_2',    value: '8–9',  label: ls(t => t.fleet?.stat2) },
        { _key: 'st3', icon: 'gps_fixed',      value: '24/7', label: ls(t => t.fleet?.stat3) },
        { _key: 'st4', icon: 'verified_user',  value: 'CMR',  label: ls(t => t.fleet?.stat4) },
      ],
    },
    {
      _type:    'galleryBlock', _key: 'gallery',
      heading:  ls(t => t.fleet?.gallery_h3),
      subtitle: ls(t => t.fleet?.gallery_subtitle),
      images: [
        { _key: 'g1', src: 'assets/0fe30a13-5774-45e6-8dcf-2522380d3cbf.png', alt: 'Platforma Auto GVA 1' },
        { _key: 'g2', src: 'assets/14d9858a-defd-49d3-864e-fe29d82c0a93.png', alt: 'Platforma Auto GVA 2' },
        { _key: 'g3', src: 'assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.png', alt: 'Platforma Auto GVA 3' },
        { _key: 'g4', src: 'assets/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.png', alt: 'Platforma Auto GVA 4' },
        { _key: 'g5', src: 'assets/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.png', alt: 'Platforma Auto GVA 5' },
        { _key: 'g6', src: 'assets/50b4e409-17ee-4f74-9197-779f9aeada34.png', alt: 'Platforma Auto GVA 6' },
        { _key: 'g7', src: 'assets/55971e37-7033-4e82-9b9a-e8357c849854.png', alt: 'Platforma Auto GVA 7' },
        { _key: 'g8', src: 'assets/56f0ffb7-ebb1-48b3-9d24-5a40859ab8d8.png', alt: 'Platforma Auto GVA 8' },
        { _key: 'g9', src: 'assets/81cc21ca-09f9-49d1-a6ac-4cc02de13d03.png', alt: 'Platforma Auto GVA 9' },
      ],
    },
    {
      _type:   'fleetFeaturesBlock', _key: 'features',
      heading: ls(t => t.fleet?.features_h3),
      features: [
        { _key: 'f1', icon: 'anchor',                  title: ls(t => t.fleet?.f1_title), text: lt(t => t.fleet?.f1_text) },
        { _key: 'f2', icon: 'precision_manufacturing', title: ls(t => t.fleet?.f2_title), text: lt(t => t.fleet?.f2_text) },
        { _key: 'f3', icon: 'straighten',              title: ls(t => t.fleet?.f3_title), text: lt(t => t.fleet?.f3_text) },
        { _key: 'f4', icon: 'satellite_alt',           title: ls(t => t.fleet?.f4_title), text: lt(t => t.fleet?.f4_text) },
        { _key: 'f5', icon: 'shield',                  title: ls(t => t.fleet?.f5_title), text: lt(t => t.fleet?.f5_text) },
        { _key: 'f6', icon: 'build',                   title: ls(t => t.fleet?.f6_title), text: lt(t => t.fleet?.f6_text) },
      ],
    },
  ],
};

// Contact page
const contactPage = {
  _id:   'page-contact',
  _type: 'page',
  title: 'Contact',
  slug:  { _type: 'slug', current: 'contact' },
  sections: [
    {
      _type:    'pageBannerBlock', _key: 'banner',
      heading:  ls(t => t.contact?.banner_h2),
      subtitle: lt(t => t.contact?.banner_subtitle),
    },
    {
      _type:            'contactContentBlock', _key: 'content',
      commercialTitle:  ls(t => t.contact?.commercial_title),
      commercialP1:     ls(t => t.contact?.commercial_p1),
      commercialP2:     ls(t => t.contact?.commercial_p2),
      phoneTitle:       ls(t => t.contact?.phone_title),
      phoneHours:       ls(t => t.contact?.phone_hours),
      emailTitle:       ls(t => t.contact?.email_title),
      emailResponse:    ls(t => t.contact?.email_response),
      coverageTitle:    ls(t => t.contact?.coverage_title),
      coverageP1:       ls(t => t.contact?.coverage_p1),
      coverageP2:       ls(t => t.contact?.coverage_p2),
      formHeading:      ls(t => t.contact?.form_h3),
      formSubtitle:     lt(t => t.contact?.form_subtitle),
      benefitsHeading:  ls(t => t.contact?.benefits_h3),
      benefits: [
        { _key: 'b1', icon: 'handshake',   title: ls(t => t.contact?.b1_title), text: lt(t => t.contact?.b1_text) },
        { _key: 'b2', icon: 'trending_down', title: ls(t => t.contact?.b2_title), text: lt(t => t.contact?.b2_text) },
        { _key: 'b3', icon: 'assignment',  title: ls(t => t.contact?.b3_title), text: lt(t => t.contact?.b3_text) },
        { _key: 'b4', icon: 'security',    title: ls(t => t.contact?.b4_title), text: lt(t => t.contact?.b4_text) },
      ],
    },
  ],
};

// ── Seed ────────────────────────────────────────────────────────────────────

const pages = [homePage, aboutPage, servicesPage, fleetPage, contactPage];

for (const page of pages) {
  try {
    await client.createOrReplace(page);
    console.log(`✓  ${page._id}`);
  } catch (err) {
    console.error(`✗  ${page._id}: ${err.message}`);
  }
}

console.log('\nDone. Pages are available in Sanity Studio under the Pages section.');
