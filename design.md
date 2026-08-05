# GVA Verkaufer — Design Brief (for Google Stitch redesign)

A redesign brief for the GVA Verkaufer website. Use this to generate a fresh,
more polished visual design. It documents the business, the redesign goals, the
current design system, the page/section structure, and the hard constraints the
redesign must respect.

---

## 1. The business

**GVA Verkaufer** — a **B2B auto-transport / car-carrier logistics company**.
They move **batches of 8–9 vehicles per trip** on dedicated car-carrier trucks
(red **Scania** rigs) for **car dealerships, importers, and corporate fleet
buyers**. Routes run **Romania ↔ Western Europe** (Germany, France, Spain,
Austria, Italy, Netherlands, Hungary). In business since **2018**, with a
**zero-damage** track record and a quote turnaround of **~4 hours**.

- **Audience:** businesses, not consumers — dealers, importers, fleet managers.
  The tone must read serious, dependable, and professional, not flashy/retail.
- **Primary conversion goal:** get a **quote request** (contact form / phone).
- **Contact:** +40 745 852 977 · auto@gvaverkaufer.ro · 24/7 availability.
- **Languages:** the site ships in **8 languages** — Romanian (default), German,
  English, French, Spanish, Hungarian, Italian, Dutch. Copy length varies by
  language; layouts must not break on longer German/French strings.

## 2. Redesign goals

The current design works but feels **not professional enough**, and **spacing is
inconsistent** across sections. Direction for the redesign:

- **More premium and professional** — a credible logistics/industrial brand a
  dealership would trust with a truckload of cars.
- **Consistent, deliberate spacing and vertical rhythm** — a clear spacing scale
  applied uniformly between and within sections.
- **Strong typographic hierarchy** — confident headlines, calm readable body.
- **Tasteful use of the brand dark (navy)** for contrast and depth — but **NOT a
  fully-dark site**. (A fully-dark hero was tried and rejected as "too dark.")
  Think: light, airy content sections with navy anchors (header, footer, CTA
  bands) and one strong hero.
- **Photography-forward hero** using the company's **real red Scania fleet
  photos** (authentic, trust-building — do NOT use generic stock trucks or
  AI-generated vehicles; they read as fake for a trust-based B2B brand).
- Keep it **fast and clean** — this is a performance/SEO-focused build.

## 3. Brand assets

- **Logo:** "GVA Verkaufer" wordmark + small truck mark, with the tagline
  **"Auto Transport"**. Used on a navy header and footer.
- **Photography:** real photos of the company's **red Scania car-carrier**,
  often loaded with vehicles, some branded "Gva Verkaufer" on the cab. These are
  the hero/section imagery. Landscape, daytime, on-location.
- **Voice:** direct, competent, B2B. Romanian-first. Value props: batch/lot
  transport, fixed B2B pricing, regular round-trips, zero damage since 2018,
  fast quotes.

## 4. Current design system (evolve or replace deliberately)

The redesign can refresh these, but they define the current language. Keep the
**navy + blue + light-surface** identity unless you have a strong reason to shift.

### Color

| Token | Hex | Role |
|-------|-----|------|
| navy | `#101c2e` | primary dark — header, footer, banners, CTA bands |
| navy-2 | `#1a2a42` | navy hover |
| blue | `#0051d5` | accent — CTAs, links, icons |
| blue-d | `#003fa8` | blue hover |
| blue-mid | `#316bf3` | secondary accent |
| blue-light | `#dbe1ff` | light accent / chips |
| white | `#ffffff` | card surface |
| bg | `#f7f9fb` | page background |
| bg-low / bg-mid | `#f2f4f6` / `#eceef0` | alternating section / icon backgrounds |
| text | `#191c1e` | primary text |
| text-muted | `#45474c` | body text |
| navy-dim | `#79849b` | muted text on navy |
| border | `#c5c6cd` | dividers, card borders |

The base aesthetic is **light content on `#f7f9fb`, with navy bands** for the
header, footer, and call-to-action sections, and **blue** as the single accent.

### Typography

- **Headings / labels / buttons:** **Barlow Semi Condensed** (600/700/800) —
  condensed, industrial, confident.
- **Body:** **Inter** (400–700).
- Headlines are large with tight letter-spacing (`-0.02em` to `-0.03em`);
  eyebrow labels are uppercase with wide tracking (`0.08–0.12em`).

### Spacing — 8px grid

`8, 16, 24, 32, 40, 48, 64, 80, 96 px`. **Apply this scale consistently** — the
main complaint is inconsistent spacing, so the redesign should standardize
section padding (e.g. `64–96px` vertical) and intra-section gaps.

### Shape & depth

- **Geometric / industrial:** small radii (`2–4px`), pill (`9999px`) only for
  chips/badges.
- **Minimal, tonal shadows** — soft, low-opacity. Buttons use a subtle "pressed"
  bottom shadow (`0 4px 0 rgba(0,0,0,0.2)`).
- Max content width **1280px**; header height **80px**.

## 5. Information architecture

Five main pages plus three legal pages. Header nav (navy, sticky) + language
switcher (flag dropdown). Footer (navy) with company blurb, link columns,
contact, and a legal bar.

| Page | Purpose | Typical sections |
|------|---------|------------------|
| **Home** | Pitch + credibility + routes to action | Hero (truck + headline + dual CTA), key stats band, services overview grid, efficiency/feature split (image + copy), process steps, CTA band |
| **Services** | What they offer | Page banner, services grid (lot dealers, import, fleet, producer distribution, auctions, recurring contract), process steps, CTA band |
| **Fleet** | The trucks / capability | Page banner, fleet stats, fleet features, photo gallery (lightbox), CTA band |
| **About** | Trust / story | Page banner, story (image + narrative since 2018), values grid, team, stats |
| **Contact** | Convert to quote | Page banner, contact section (lead form + phone/email/coverage cards), "why B2B partners choose us" benefits |
| **Terms / Privacy / Cookies** | Legal | Long-form legal text pages |

Pages are **CMS-composed from a reusable block library** (see §6) — the redesign
should treat each block as a self-contained, reorderable section.

## 6. Component / section library (must all be redesigned)

These are the building blocks; design each as a polished, reusable section:

- **Header** (navy, sticky, logo + nav + language dropdown + mobile menu)
- **Hero block** — full-bleed truck photo, dark overlay for text legibility,
  eyebrow badge, large headline (with one accent-colored line), subtitle,
  feature checklist, primary + secondary CTA.
- **Stats block** — 4 key numbers (e.g. vehicles delivered, years, countries,
  satisfaction), often as a card floating over the hero seam.
- **Services grid block** — cards: icon + title + description.
- **Efficiency block** — image + text split with feature list and CTA.
- **Process steps block** — numbered steps.
- **Story block** — image + multi-paragraph narrative.
- **Values grid block** — icon + title + text cards.
- **Team block** — member cards.
- **Fleet stats block** / **Fleet features block** — capability highlights.
- **Gallery block** — responsive image grid with lightbox.
- **CTA block** — navy band with headline + button.
- **Page banner block** — compact navy hero for interior pages (single H1 +
  subtitle).
- **Contact content block** — lead form (name, email, phone, company, service,
  message) + contact info cards + benefits.
- **Footer** (navy) — company blurb, social, Services/Company link columns,
  contact details, legal bar.
- **Cookie consent banner** — bottom bar (GDPR), accept / essential-only.

## 7. Hard constraints (the redesign must keep these)

- **8-language ready** — every text area must tolerate longer translations (DE/FR
  run ~30% longer than EN). No fixed-width text containers that clip.
- **CMS-driven** — content (text, images, lists) comes from a headless CMS, so
  designs must be **content-agnostic templates**, not pixel-pinned to specific
  copy. Lists (stats, services, gallery) are variable-length.
- **Accessibility (WCAG AA)** — sufficient color contrast, one `<h1>` per page,
  logical heading order, visible focus states, `prefers-reduced-motion` friendly.
- **Performance / SEO** — lightweight, image-optimized, fast first paint. Avoid
  heavy autoplay video heroes. The hero image is the LCP — keep it efficient.
- **Responsive** — mobile-first; nav collapses to a hamburger; multi-column grids
  stack; the floating stats card reflows.
- **Conversion focus** — the quote CTA (phone + form) must be prominent on every
  page; the contact form is the primary goal.

## 8. What to produce

A cohesive visual redesign covering: the **home page** (full), the **interior
page template** (banner + content), the **contact page**, and the **shared
header/footer + core section components** above. Deliver light, professional,
consistently-spaced layouts with navy/blue branding, Barlow Semi Condensed +
Inter typography, and the real red Scania photography as hero imagery. Keep the
brand serious and trustworthy for a B2B logistics audience — premium, not retail;
confident, not dark-for-the-sake-of-it.
