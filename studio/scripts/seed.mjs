/**
 * Seed Sanity with translations from the existing public/i18n JSON files.
 *
 * Usage:
 *   1. cd studio
 *   2. npm install
 *   3. Get a write token: sanity.io → project → API → Tokens → "Editor" token
 *   4. SANITY_TOKEN=your_token node scripts/seed.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────

const PROJECT_ID = 'es1eh557'; // ← same as sanity.config.ts
const DATASET = 'production';

const LOCALES = {
  ro: 'Română',
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  hu: 'Magyar',
  it: 'Italiano',
  nl: 'Nederlands',
};

// ── Client ────────────────────────────────────────────────────────────────────

const token = process.env['SANITY_TOKEN'];
if (!token) {
  console.error('Set SANITY_TOKEN environment variable before running this script.');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// ── Seed ──────────────────────────────────────────────────────────────────────

const i18nDir = resolve(__dirname, '../../public/i18n');

for (const [locale, localeName] of Object.entries(LOCALES)) {
  const filePath = resolve(i18nDir, `${locale}.json`);
  let translations;

  try {
    translations = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    console.warn(`⚠️  Missing file for ${locale} — skipping`);
    continue;
  }

  const doc = {
    _id: `translations-${locale}`,
    _type: 'translations',
    locale,
    localeName,
    ...translations,
  };

  try {
    await client.createOrReplace(doc);
    console.log(`✓  ${locale} (${localeName})`);
  } catch (err) {
    console.error(`✗  ${locale}: ${err.message}`);
  }
}

console.log('\nDone. Open sanity.io/manage to see your content.');
