/**
 * One-off: enrich the Home page with more sections (values, process, CTA).
 * Append-only (after the last existing section) — never removes content.
 * Idempotent — skips if a ctaBlock already exists on the page.
 *
 * Run:  npx sanity exec scripts/add-home-sections.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const key = () => Math.random().toString(36).slice(2, 12);
const L = (ro) => ({ ro }); // RO-only; other langs fall back until translated in Studio

const values = {
  _type: 'valuesGridBlock',
  _key: key(),
  heading: L('De Ce Partenerii B2B Aleg GVA Verkaufer'),
  values: [
    { _key: key(), icon: 'local_shipping', title: L('Capacitate de Lot'), text: L('Minimum 8–9 vehicule per cursă pe platformă completă — cost optim per unitate.') },
    { _key: key(), icon: 'savings', title: L('Prețuri Fixe B2B'), text: L('Contracte clare, tarife predictibile și program regulat, fără surprize.') },
    { _key: key(), icon: 'schedule', title: L('Livrare Punctuală'), text: L('Curse tur-retur România ↔ Europa de Vest, cu termene respectate.') },
    { _key: key(), icon: 'verified_user', title: L('Zero Daune din 2018'), text: L('Proceduri stricte de ancorare și echipamente moderne pentru integritate totală.') },
  ],
};

const process = {
  _type: 'processStepsBlock',
  _key: key(),
  heading: L('Cum Lucrăm'),
  steps: [
    { _key: key(), title: L('Planificare'), text: L('Analizăm lotul și alocăm resursele optime pentru volumul solicitat.') },
    { _key: key(), title: L('Preluare'), text: L('Inspecție detaliată și încărcare securizată conform standardelor CMR.') },
    { _key: key(), title: L('Tranzit'), text: L('Monitorizare GPS în timp real și comunicare proactivă pe tot parcursul cursei.') },
    { _key: key(), title: L('Livrare'), text: L('Descărcare finală, inspecție la destinație și transfer complet al documentației.') },
  ],
};

const cta = {
  _type: 'ctaBlock',
  _key: key(),
  heading: L('Pregătit să optimizați logistica auto?'),
  text: L('Contactează echipa noastră B2B pentru o evaluare a nevoilor de transport și o ofertă personalizată.'),
  buttonLabel: L('Solicită Ofertă'),
  buttonLink: '/contact',
};

const doc = await client.getDocument('page-home');
if (!doc) { console.error('✗ page-home not found'); process.exit(1); }
const sections = doc.sections ?? [];
if (sections.some((s) => s._type === 'ctaBlock')) {
  console.log('• home already has the extra sections — skipping');
  process.exit(0);
}

await client
  .patch('page-home')
  .setIfMissing({ sections: [] })
  .insert('after', 'sections[-1]', [values, process, cta])
  .commit({ autoGenerateArrayKeys: false });

console.log('✔ added values, process, and CTA sections to page-home');
