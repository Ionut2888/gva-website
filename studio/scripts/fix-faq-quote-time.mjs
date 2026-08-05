/**
 * Fixes a self-contradiction found in impeccable critique: the Contact page
 * hero/form promise a ~4 hour quote turnaround, but the FAQ answer said
 * "maxim 24 de ore" — on the highest-stakes trust page in the funnel.
 * Aligns the first B2B FAQ answer to the same "4 hours" figure used
 * everywhere else on the site (ro.json: "email_response", "form_subtitle").
 * Idempotent — re-running just re-sets the same values.
 *
 * Run:  npx sanity exec scripts/fix-faq-quote-time.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const NEW_TEXT = {
  ro: 'Pentru clienții B2B, oferim o cotație preliminară în maxim 4 ore de la primirea tuturor detaliilor necesare.',
  de: 'Für B2B-Kunden erstellen wir innerhalb von 4 Stunden nach Erhalt aller erforderlichen Details ein vorläufiges Angebot.',
  en: 'For B2B clients, we provide a preliminary quote within 4 hours of receiving all the necessary details.',
  fr: 'Pour les clients B2B, nous fournissons un devis préliminaire dans les 4 heures suivant la réception de tous les détails nécessaires.',
  es: 'Para clientes B2B, ofrecemos un presupuesto preliminar en un máximo de 4 horas tras recibir todos los detalles necesarios.',
  hu: 'B2B ügyfeleink számára előzetes árajánlatot adunk a szükséges adatok beérkezésétől számított 4 órán belül.',
  it: 'Per i clienti B2B, forniamo un preventivo preliminare entro 4 ore dalla ricezione di tutti i dettagli necessari.',
  nl: 'Voor B2B-klanten geven we binnen 4 uur na ontvangst van alle benodigde gegevens een voorlopige offerte.',
};

const docId = 'page-contact';
const doc = await client.getDocument(docId);
if (!doc?.sections) {
  console.log(`• ${docId}: no sections`);
  process.exit(1);
}

let found = false;
const sections = doc.sections.map((s) => {
  if (s._type !== 'contactContentBlock' || !Array.isArray(s.benefits)) return s;
  const benefits = s.benefits.map((b) => {
    if (found) return b;
    // Match the response-time FAQ item by its Romanian title (stable across re-runs).
    if (b?.title?.ro?.includes('timpul mediu de răspuns')) {
      found = true;
      return { ...b, text: NEW_TEXT };
    }
    return b;
  });
  return { ...s, benefits };
});

if (!found) {
  console.log(`• ${docId}: response-time FAQ item not found`);
  process.exit(1);
}

await client.patch(docId).set({ sections }).commit({ autoGenerateArrayKeys: false });
console.log(`✔ ${docId}: FAQ response-time answer aligned to "4 hours" in all 8 languages`);
