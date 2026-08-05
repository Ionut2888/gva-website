/** Set the Contact page banner to left-aligned (blue heading), per design.
 *  Run: npx sanity exec scripts/set-contact-align.mjs --with-user-token */
import { getCliClient } from 'sanity/cli';
const client = getCliClient();
const doc = await client.getDocument('page-contact');
const sections = (doc?.sections ?? []).map((s) =>
  s._type === 'pageBannerBlock' ? { ...s, align: 'left' } : s,
);
await client.patch('page-contact').set({ sections }).commit({ autoGenerateArrayKeys: false });
console.log('✔ contact banner set to left-aligned');
