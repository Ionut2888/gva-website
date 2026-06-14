/**
 * Fill translations (de/en/fr/es/hu/it/nl) for the RO-only content that was
 * added to Home (values/process/CTA) and About (timeline).
 *
 * Safe: only transforms the blocks listed in `targets` per document; all other
 * (already-translated) blocks are written back unchanged. Idempotent.
 *
 * Run:  npx sanity exec scripts/add-translations.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// Keyed by the Romanian source string → translations. (Years like 2018/2020
// intentionally omitted — they fall back to RO unchanged across languages.)
const T = {
  // ── About timeline ──
  "Povestea Noastră": { de: "Unsere Geschichte", en: "Our Story", fr: "Notre Histoire", es: "Nuestra Historia", hu: "Történetünk", it: "La Nostra Storia", nl: "Ons Verhaal" },
  "O evoluție constantă, ghidată de angajamentul față de excelență în logistica auto.": { de: "Eine stetige Entwicklung, geleitet vom Streben nach Exzellenz in der Fahrzeuglogistik.", en: "A constant evolution, guided by our commitment to excellence in vehicle logistics.", fr: "Une évolution constante, guidée par notre engagement envers l'excellence dans la logistique automobile.", es: "Una evolución constante, guiada por el compromiso con la excelencia en la logística de vehículos.", hu: "Folyamatos fejlődés, amelyet a járműlogisztikai kiválóság iránti elkötelezettség vezérel.", it: "Un'evoluzione costante, guidata dall'impegno per l'eccellenza nella logistica auto.", nl: "Een constante evolutie, gedreven door onze toewijding aan uitmuntendheid in voertuiglogistiek." },
  "Fundația": { de: "Gründung", en: "Foundation", fr: "Fondation", es: "Fundación", hu: "Alapítás", it: "Fondazione", nl: "Oprichting" },
  "GVA Verkaufer a fost înființată cu o viziune clară: servicii de transport auto B2B fiabile și transparente pentru piața europeană.": { de: "GVA Verkaufer wurde mit einer klaren Vision gegründet: zuverlässige und transparente B2B-Fahrzeugtransporte für den europäischen Markt.", en: "GVA Verkaufer was founded with a clear vision: reliable and transparent B2B vehicle transport for the European market.", fr: "GVA Verkaufer a été fondée avec une vision claire : un transport de véhicules B2B fiable et transparent pour le marché européen.", es: "GVA Verkaufer se fundó con una visión clara: transporte de vehículos B2B fiable y transparente para el mercado europeo.", hu: "A GVA Verkaufer világos jövőképpel jött létre: megbízható és átlátható B2B járműszállítás az európai piac számára.", it: "GVA Verkaufer è nata con una visione chiara: trasporto di veicoli B2B affidabile e trasparente per il mercato europeo.", nl: "GVA Verkaufer is opgericht met een duidelijke visie: betrouwbaar en transparant B2B-voertuigtransport voor de Europese markt." },
  "Expansiunea Flotei": { de: "Flottenerweiterung", en: "Fleet Expansion", fr: "Expansion de la Flotte", es: "Expansión de la Flota", hu: "Flottabővítés", it: "Espansione della Flotta", nl: "Vlootuitbreiding" },
  "Am investit semnificativ în echipamente moderne, achiziționând primele camioane Scania R450 de ultimă generație pentru siguranță și eficiență maximă.": { de: "Wir haben erheblich in moderne Ausrüstung investiert und die ersten Scania R450 der neuesten Generation für maximale Sicherheit und Effizienz angeschafft.", en: "We invested significantly in modern equipment, acquiring our first latest-generation Scania R450 trucks for maximum safety and efficiency.", fr: "Nous avons investi massivement dans des équipements modernes, en acquérant nos premiers camions Scania R450 de dernière génération pour une sécurité et une efficacité maximales.", es: "Invertimos significativamente en equipos modernos, adquiriendo nuestros primeros camiones Scania R450 de última generación para máxima seguridad y eficiencia.", hu: "Jelentősen befektettünk a modern felszerelésbe, beszerezve az első, legújabb generációs Scania R450 kamionjainkat a maximális biztonság és hatékonyság érdekében.", it: "Abbiamo investito in modo significativo in attrezzature moderne, acquistando i primi camion Scania R450 di ultima generazione per la massima sicurezza ed efficienza.", nl: "We investeerden fors in moderne apparatuur en schaften onze eerste Scania R450-trucks van de nieuwste generatie aan voor maximale veiligheid en efficiëntie." },
  "Prezent": { de: "Heute", en: "Present", fr: "Aujourd'hui", es: "Presente", hu: "Jelen", it: "Oggi", nl: "Heden" },
  "Parteneriat de Încredere": { de: "Vertrauensvolle Partnerschaft", en: "Trusted Partnership", fr: "Partenariat de Confiance", es: "Asociación de Confianza", hu: "Megbízható Partnerség", it: "Partnership di Fiducia", nl: "Betrouwbaar Partnerschap" },
  "Astăzi suntem un pilon în logistica auto B2B, deservind zeci de dealeri și importatori cu soluții personalizate și monitorizare avansată.": { de: "Heute sind wir eine Säule der B2B-Fahrzeuglogistik und bedienen Dutzende Händler und Importeure mit maßgeschneiderten Lösungen und fortschrittlicher Überwachung.", en: "Today we are a pillar of B2B vehicle logistics, serving dozens of dealers and importers with tailored solutions and advanced tracking.", fr: "Aujourd'hui, nous sommes un pilier de la logistique automobile B2B, au service de dizaines de concessionnaires et importateurs avec des solutions sur mesure et un suivi avancé.", es: "Hoy somos un pilar de la logística de vehículos B2B, sirviendo a decenas de concesionarios e importadores con soluciones personalizadas y seguimiento avanzado.", hu: "Ma a B2B járműlogisztika egyik pillére vagyunk, több tucat kereskedőt és importőrt szolgálunk ki egyedi megoldásokkal és fejlett nyomon követéssel.", it: "Oggi siamo un pilastro della logistica auto B2B, al servizio di decine di concessionari e importatori con soluzioni su misura e monitoraggio avanzato.", nl: "Vandaag zijn we een pijler van de B2B-voertuiglogistiek en bedienen we tientallen dealers en importeurs met op maat gemaakte oplossingen en geavanceerde tracking." },

  // ── Home: values ──
  "De Ce Partenerii B2B Aleg GVA Verkaufer": { de: "Warum B2B-Partner GVA Verkaufer wählen", en: "Why B2B Partners Choose GVA Verkaufer", fr: "Pourquoi les partenaires B2B choisissent GVA Verkaufer", es: "Por Qué los Socios B2B Eligen GVA Verkaufer", hu: "Miért a GVA Verkaufert választják a B2B partnerek", it: "Perché i Partner B2B Scelgono GVA Verkaufer", nl: "Waarom B2B-partners voor GVA Verkaufer kiezen" },
  "Capacitate de Lot": { de: "Loskapazität", en: "Batch Capacity", fr: "Capacité par Lot", es: "Capacidad por Lote", hu: "Tételkapacitás", it: "Capacità per Lotto", nl: "Batchcapaciteit" },
  "Minimum 8–9 vehicule per cursă pe platformă completă — cost optim per unitate.": { de: "Mindestens 8–9 Fahrzeuge pro Fahrt auf voller Plattform — optimale Kosten pro Einheit.", en: "Minimum 8–9 vehicles per trip on a full carrier — optimal cost per unit.", fr: "Minimum 8–9 véhicules par trajet sur plateforme complète — coût optimal par unité.", es: "Mínimo 8–9 vehículos por viaje en plataforma completa — coste óptimo por unidad.", hu: "Legalább 8–9 jármű fordulónként teljes platformon — optimális egységköltség.", it: "Minimo 8–9 veicoli per viaggio su bisarca completa — costo ottimale per unità.", nl: "Minimaal 8–9 voertuigen per rit op een volle oplegger — optimale kosten per eenheid." },
  "Prețuri Fixe B2B": { de: "Feste B2B-Preise", en: "Fixed B2B Pricing", fr: "Tarifs B2B Fixes", es: "Precios B2B Fijos", hu: "Fix B2B Árak", it: "Prezzi B2B Fissi", nl: "Vaste B2B-prijzen" },
  "Contracte clare, tarife predictibile și program regulat, fără surprize.": { de: "Klare Verträge, vorhersehbare Tarife und ein regelmäßiger Fahrplan — ohne Überraschungen.", en: "Clear contracts, predictable rates and a regular schedule — no surprises.", fr: "Contrats clairs, tarifs prévisibles et planning régulier — sans surprises.", es: "Contratos claros, tarifas predecibles y horario regular — sin sorpresas.", hu: "Világos szerződések, kiszámítható díjak és rendszeres menetrend — meglepetések nélkül.", it: "Contratti chiari, tariffe prevedibili e programmi regolari — senza sorprese.", nl: "Heldere contracten, voorspelbare tarieven en een vast schema — geen verrassingen." },
  "Livrare Punctuală": { de: "Pünktliche Lieferung", en: "On-Time Delivery", fr: "Livraison Ponctuelle", es: "Entrega Puntual", hu: "Pontos Szállítás", it: "Consegna Puntuale", nl: "Tijdige Levering" },
  "Curse tur-retur România ↔ Europa de Vest, cu termene respectate.": { de: "Hin- und Rückfahrten Rumänien ↔ Westeuropa, mit eingehaltenen Terminen.", en: "Round trips Romania ↔ Western Europe, with deadlines respected.", fr: "Allers-retours Roumanie ↔ Europe de l'Ouest, dans les délais.", es: "Viajes de ida y vuelta Rumanía ↔ Europa Occidental, con plazos cumplidos.", hu: "Oda-vissza fuvarok Románia ↔ Nyugat-Európa között, határidők betartásával.", it: "Viaggi di andata e ritorno Romania ↔ Europa occidentale, nel rispetto delle scadenze.", nl: "Retourritten Roemenië ↔ West-Europa, met gerespecteerde deadlines." },
  "Zero Daune din 2018": { de: "Null Schäden seit 2018", en: "Zero Damage Since 2018", fr: "Zéro Dommage Depuis 2018", es: "Cero Daños Desde 2018", hu: "Nulla Kár 2018 Óta", it: "Zero Danni dal 2018", nl: "Nul Schade Sinds 2018" },
  "Proceduri stricte de ancorare și echipamente moderne pentru integritate totală.": { de: "Strenge Ladungssicherung und moderne Ausrüstung für völlige Integrität.", en: "Strict lashing procedures and modern equipment for complete integrity.", fr: "Procédures d'arrimage strictes et équipements modernes pour une intégrité totale.", es: "Procedimientos de sujeción estrictos y equipos modernos para una integridad total.", hu: "Szigorú rögzítési eljárások és modern felszerelés a teljes épségért.", it: "Procedure di ancoraggio rigorose e attrezzature moderne per la massima integrità.", nl: "Strikte sjorprocedures en moderne apparatuur voor volledige integriteit." },

  // ── Home: process ──
  "Cum Lucrăm": { de: "So Arbeiten Wir", en: "How We Work", fr: "Comment Nous Travaillons", es: "Cómo Trabajamos", hu: "Hogyan Dolgozunk", it: "Come Lavoriamo", nl: "Hoe Wij Werken" },
  "Planificare": { de: "Planung", en: "Planning", fr: "Planification", es: "Planificación", hu: "Tervezés", it: "Pianificazione", nl: "Planning" },
  "Analizăm lotul și alocăm resursele optime pentru volumul solicitat.": { de: "Wir analysieren das Los und weisen die optimalen Ressourcen für das angeforderte Volumen zu.", en: "We analyze the batch and allocate the optimal resources for the requested volume.", fr: "Nous analysons le lot et allouons les ressources optimales pour le volume demandé.", es: "Analizamos el lote y asignamos los recursos óptimos para el volumen solicitado.", hu: "Elemezzük a tételt, és optimális erőforrásokat rendelünk a kért mennyiséghez.", it: "Analizziamo il lotto e allochiamo le risorse ottimali per il volume richiesto.", nl: "We analyseren de batch en wijzen de optimale middelen toe voor het gevraagde volume." },
  "Preluare": { de: "Abholung", en: "Pickup", fr: "Enlèvement", es: "Recogida", hu: "Átvétel", it: "Ritiro", nl: "Ophalen" },
  "Inspecție detaliată și încărcare securizată conform standardelor CMR.": { de: "Detaillierte Inspektion und sichere Verladung gemäß CMR-Standards.", en: "Detailed inspection and secure loading according to CMR standards.", fr: "Inspection détaillée et chargement sécurisé selon les normes CMR.", es: "Inspección detallada y carga segura según las normas CMR.", hu: "Részletes ellenőrzés és biztonságos rakodás a CMR-szabványok szerint.", it: "Ispezione dettagliata e carico sicuro secondo gli standard CMR.", nl: "Gedetailleerde inspectie en veilig laden volgens CMR-normen." },
  "Tranzit": { de: "Transit", en: "Transit", fr: "Transit", es: "Tránsito", hu: "Tranzit", it: "Transito", nl: "Transport" },
  "Monitorizare GPS în timp real și comunicare proactivă pe tot parcursul cursei.": { de: "GPS-Echtzeitverfolgung und proaktive Kommunikation während der gesamten Fahrt.", en: "Real-time GPS tracking and proactive communication throughout the trip.", fr: "Suivi GPS en temps réel et communication proactive tout au long du trajet.", es: "Seguimiento GPS en tiempo real y comunicación proactiva durante todo el viaje.", hu: "Valós idejű GPS-követés és proaktív kommunikáció a teljes fuvar során.", it: "Tracciamento GPS in tempo reale e comunicazione proattiva durante tutto il viaggio.", nl: "Realtime GPS-tracking en proactieve communicatie gedurende de hele rit." },
  "Livrare": { de: "Lieferung", en: "Delivery", fr: "Livraison", es: "Entrega", hu: "Szállítás", it: "Consegna", nl: "Levering" },
  "Descărcare finală, inspecție la destinație și transfer complet al documentației.": { de: "Endentladung, Inspektion am Zielort und vollständige Übergabe der Dokumentation.", en: "Final unloading, inspection at destination and complete handover of documentation.", fr: "Déchargement final, inspection à destination et transfert complet de la documentation.", es: "Descarga final, inspección en destino y entrega completa de la documentación.", hu: "Végső lerakodás, helyszíni ellenőrzés és a dokumentáció teljes átadása.", it: "Scarico finale, ispezione a destinazione e trasferimento completo della documentazione.", nl: "Eindlossing, inspectie op bestemming en volledige overdracht van documentatie." },

  // ── Home: CTA ──
  "Pregătit să optimizați logistica auto?": { de: "Bereit, Ihre Fahrzeuglogistik zu optimieren?", en: "Ready to optimize your vehicle logistics?", fr: "Prêt à optimiser votre logistique automobile ?", es: "¿Listo para optimizar su logística de vehículos?", hu: "Készen áll járműlogisztikája optimalizálására?", it: "Pronto a ottimizzare la tua logistica auto?", nl: "Klaar om uw voertuiglogistiek te optimaliseren?" },
  "Contactează echipa noastră B2B pentru o evaluare a nevoilor de transport și o ofertă personalizată.": { de: "Kontaktieren Sie unser B2B-Team für eine Bedarfsanalyse und ein individuelles Angebot.", en: "Contact our B2B team for a transport needs assessment and a personalized offer.", fr: "Contactez notre équipe B2B pour une évaluation de vos besoins et une offre personnalisée.", es: "Contacte con nuestro equipo B2B para una evaluación de necesidades y una oferta personalizada.", hu: "Vegye fel a kapcsolatot B2B csapatunkkal igényfelmérésért és személyre szabott ajánlatért.", it: "Contatta il nostro team B2B per una valutazione delle esigenze e un'offerta personalizzata.", nl: "Neem contact op met ons B2B-team voor een behoefteanalyse en een persoonlijke offerte." },
  "Solicită Ofertă": { de: "Angebot Anfordern", en: "Request a Quote", fr: "Demander un Devis", es: "Solicitar Presupuesto", hu: "Ajánlatkérés", it: "Richiedi un Preventivo", nl: "Offerte Aanvragen" },
};

function isLocalizedLeaf(v) {
  return v && typeof v === 'object' && !Array.isArray(v) && typeof v.ro === 'string';
}
const missing = new Set();
function translateNode(v) {
  if (Array.isArray(v)) return v.map(translateNode);
  if (v && typeof v === 'object') {
    if (isLocalizedLeaf(v)) {
      const t = T[v.ro];
      if (t) return { ro: v.ro, ...t };
      if (!/^\d{4}$/.test(v.ro)) missing.add(v.ro);
      return v;
    }
    const out = {};
    for (const k of Object.keys(v)) out[k] = translateNode(v[k]);
    return out;
  }
  return v;
}

async function run(docId, targetTypes) {
  const doc = await client.getDocument(docId);
  if (!doc?.sections) { console.log(`• ${docId}: no sections`); return; }
  let changed = 0;
  const sections = doc.sections.map((s) => {
    if (targetTypes.includes(s._type)) { changed++; return translateNode(s); }
    return s;
  });
  await client.patch(docId).set({ sections }).commit({ autoGenerateArrayKeys: false });
  console.log(`✔ ${docId}: translated ${changed} block(s)`);
}

await run('page-home', ['valuesGridBlock', 'processStepsBlock', 'ctaBlock']);
await run('page-about', ['timelineBlock']);
if (missing.size) {
  console.log('\n⚠ No translation found for (left as RO):');
  for (const m of missing) console.log('   - ' + m);
}
