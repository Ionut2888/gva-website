/**
 * Applies design content that the redesign needs:
 *  - About & Fleet page banners → dark image hero (image + badge + CTA)
 *  - Contact → sidebar heading ("Informații Contact") + B2B FAQ (replaces the
 *    old advantages list, which now lives on Home as the values grid)
 * All new copy is provided in all 8 languages. Idempotent-ish (re-running just
 * re-sets the same values).
 *
 * Run:  npx sanity exec scripts/apply-design-content.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const key = () => Math.random().toString(36).slice(2, 12);

async function patchBlock(docId, predicate, mutate, label) {
  const doc = await client.getDocument(docId);
  if (!doc?.sections) { console.log(`• ${docId}: no sections`); return; }
  let found = false;
  const sections = doc.sections.map((s) => {
    if (!found && predicate(s)) { found = true; return mutate({ ...s }); }
    return s;
  });
  if (!found) { console.log(`• ${docId}: ${label} block not found`); return; }
  await client.patch(docId).set({ sections }).commit({ autoGenerateArrayKeys: false });
  console.log(`✔ ${docId}: ${label} updated`);
}

const aboutHero = (b) => ({
  ...b,
  image: "assets/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.webp",
  badge: { ro: "Logistică Auto B2B", de: "B2B-Fahrzeuglogistik", en: "B2B Auto Logistics", fr: "Logistique Auto B2B", es: "Logística Auto B2B", hu: "B2B Autólogisztika", it: "Logistica Auto B2B", nl: "B2B-autologistiek" },
  ctaLabel: { ro: "Contactează-ne", de: "Kontaktieren Sie uns", en: "Contact Us", fr: "Contactez-nous", es: "Contáctenos", hu: "Lépjen kapcsolatba", it: "Contattaci", nl: "Neem contact op" },
  ctaLink: "/contact",
});

const fleetHero = (b) => ({
  ...b,
  image: "assets/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.webp",
  badge: { ro: "Flotă Modernă · Capacitate Totală", de: "Moderne Flotte · Volle Kapazität", en: "Modern Fleet · Full Capacity", fr: "Flotte Moderne · Capacité Totale", es: "Flota Moderna · Capacidad Total", hu: "Modern Flotta · Teljes Kapacitás", it: "Flotta Moderna · Capacità Totale", nl: "Modern Wagenpark · Volle Capaciteit" },
  ctaLabel: { ro: "Solicită Ofertă", de: "Angebot Anfordern", en: "Request a Quote", fr: "Demander un Devis", es: "Solicitar Presupuesto", hu: "Ajánlatkérés", it: "Richiedi un Preventivo", nl: "Offerte Aanvragen" },
  ctaLink: "/contact",
});

const contactContent = (b) => ({
  ...b,
  commercialTitle: { ro: "Informații Contact", de: "Kontaktinformationen", en: "Contact Information", fr: "Informations de Contact", es: "Información de Contacto", hu: "Kapcsolati Információk", it: "Informazioni di Contatto", nl: "Contactgegevens" },
  benefitsHeading: { ro: "Întrebări Frecvente B2B", de: "Häufige B2B-Fragen", en: "B2B Frequently Asked Questions", fr: "Questions Fréquentes B2B", es: "Preguntas Frecuentes B2B", hu: "Gyakori B2B Kérdések", it: "Domande Frequenti B2B", nl: "Veelgestelde B2B-vragen" },
  benefits: [
    {
      _key: key(),
      title: { ro: "Care este timpul mediu de răspuns pentru o ofertă?", de: "Wie lange dauert die durchschnittliche Angebotserstellung?", en: "What is the average response time for a quote?", fr: "Quel est le délai moyen de réponse pour un devis ?", es: "¿Cuál es el tiempo medio de respuesta para un presupuesto?", hu: "Mennyi az átlagos válaszidő egy ajánlatra?", it: "Qual è il tempo medio di risposta per un preventivo?", nl: "Wat is de gemiddelde reactietijd voor een offerte?" },
      text: { ro: "Pentru clienții B2B, ne străduim să oferim o cotație preliminară în maxim 24 de ore de la primirea tuturor detaliilor necesare.", de: "Für B2B-Kunden erstellen wir innerhalb von 24 Stunden nach Erhalt aller erforderlichen Details ein vorläufiges Angebot.", en: "For B2B clients, we aim to provide a preliminary quote within 24 hours of receiving all the necessary details.", fr: "Pour les clients B2B, nous nous efforçons de fournir un devis préliminaire dans les 24 heures suivant la réception de tous les détails nécessaires.", es: "Para clientes B2B, nos esforzamos por ofrecer un presupuesto preliminar en un máximo de 24 horas tras recibir todos los detalles necesarios.", hu: "B2B ügyfeleink számára előzetes árajánlatot adunk a szükséges adatok beérkezésétől számított 24 órán belül.", it: "Per i clienti B2B, forniamo un preventivo preliminare entro 24 ore dalla ricezione di tutti i dettagli necessari.", nl: "Voor B2B-klanten streven we ernaar binnen 24 uur na ontvangst van alle benodigde gegevens een voorlopige offerte te geven." },
    },
    {
      _key: key(),
      title: { ro: "Oferiți asigurare CMR?", de: "Bieten Sie eine CMR-Versicherung an?", en: "Do you offer CMR insurance?", fr: "Proposez-vous une assurance CMR ?", es: "¿Ofrecen seguro CMR?", hu: "Kínálnak CMR-biztosítást?", it: "Offrite l'assicurazione CMR?", nl: "Bieden jullie CMR-verzekering aan?" },
      text: { ro: "Da, toate transporturile noastre sunt acoperite de asigurare CMR standard, cu posibilitatea de a extinde valoarea asigurată pentru transporturi speciale.", de: "Ja, alle unsere Transporte sind durch eine Standard-CMR-Versicherung abgedeckt, mit der Möglichkeit, die Versicherungssumme für Sondertransporte zu erhöhen.", en: "Yes, all our transports are covered by standard CMR insurance, with the option to extend the insured value for special shipments.", fr: "Oui, tous nos transports sont couverts par une assurance CMR standard, avec la possibilité d'étendre la valeur assurée pour les transports spéciaux.", es: "Sí, todos nuestros transportes están cubiertos por un seguro CMR estándar, con la posibilidad de ampliar el valor asegurado para transportes especiales.", hu: "Igen, minden szállításunkra standard CMR-biztosítás vonatkozik, a biztosított érték speciális szállítmányok esetén bővíthető.", it: "Sì, tutti i nostri trasporti sono coperti da assicurazione CMR standard, con la possibilità di estendere il valore assicurato per spedizioni speciali.", nl: "Ja, al onze transporten zijn gedekt door een standaard CMR-verzekering, met de mogelijkheid de verzekerde waarde voor speciale zendingen uit te breiden." },
    },
  ],
});

await patchBlock('page-about', (s) => s._type === 'pageBannerBlock', aboutHero, 'about hero');
await patchBlock('page-fleet', (s) => s._type === 'pageBannerBlock', fleetHero, 'fleet hero');
await patchBlock('page-contact', (s) => s._type === 'contactContentBlock', contactContent, 'contact content');
