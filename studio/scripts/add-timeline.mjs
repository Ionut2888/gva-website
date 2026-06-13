/**
 * One-off: add a "Povestea Noastră" timelineBlock to the About page.
 * Append-only (after the story block) — never removes existing sections.
 * Idempotent — skips if a timelineBlock already exists on the page.
 *
 * Run:  npx sanity exec scripts/add-timeline.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const key = () => Math.random().toString(36).slice(2, 12);
// Romanian-only localized value; other langs fall back to `ro` until translated in Studio.
const L = (ro) => ({ ro });

const timeline = {
  _type: 'timelineBlock',
  _key: key(),
  heading: L('Povestea Noastră'),
  subtitle: L('O evoluție constantă, ghidată de angajamentul față de excelență în logistica auto.'),
  items: [
    {
      _key: key(),
      year: L('2018'),
      title: L('Fundația'),
      text: L('GVA Verkaufer a fost înființată cu o viziune clară: servicii de transport auto B2B fiabile și transparente pentru piața europeană.'),
    },
    {
      _key: key(),
      year: L('2020'),
      title: L('Expansiunea Flotei'),
      text: L('Am investit semnificativ în echipamente moderne, achiziționând primele camioane Scania R450 de ultimă generație pentru siguranță și eficiență maximă.'),
    },
    {
      _key: key(),
      year: L('Prezent'),
      title: L('Parteneriat de Încredere'),
      text: L('Astăzi suntem un pilon în logistica auto B2B, deservind zeci de dealeri și importatori cu soluții personalizate și monitorizare avansată.'),
    },
  ],
};

const doc = await client.getDocument('page-about');
if (!doc) { console.error('✗ page-about not found'); process.exit(1); }
const sections = doc.sections ?? [];
if (sections.some((s) => s._type === 'timelineBlock')) {
  console.log('• timelineBlock already present on page-about — skipping');
  process.exit(0);
}
const story = sections.find((s) => s._type === 'storyBlock');
const at = story?._key ? `sections[_key=="${story._key}"]` : 'sections[-1]';

await client
  .patch('page-about')
  .setIfMissing({ sections: [] })
  .insert('after', at, [timeline])
  .commit({ autoGenerateArrayKeys: false });

console.log(`✔ timelineBlock inserted after ${at} on page-about`);
