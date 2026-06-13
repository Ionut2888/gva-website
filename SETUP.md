# New Client Setup Checklist

This repo is a reusable template. To launch it for a new client, work through
the sections below. Most steps are swapping one value; none require rewriting
app code. Estimated time: **2–3 hours** end-to-end.

> Tip: search the codebase for `gvawebsite-b74d4`, `es1eh557`, and
> `gvaverkaufer.ro` — every per-client value is one of those three plus a
> handful of secrets/dashboards listed here.

---

## 1. Repository

- [ ] Create the new repo (or "Use this template" on GitHub).
- [ ] In **Settings → Environments**, create an environment named `production`
      and add yourself as a **required reviewer** (gates the manual prod deploy).

## 2. Sanity (CMS)

- [ ] Create a project at [sanity.io/manage](https://www.sanity.io/manage).
- [ ] `src/app/sanity.config.ts` → set `projectId` (and `dataset` if not `production`).
- [ ] `studio/sanity.config.ts` → set the same `projectId`.
- [ ] **CORS:** manage.sanity.io → API → CORS Origins → add:
      - `http://localhost:4200` (dev)
      - the production URL (e.g. `https://<client>.web.app`)
      - the beta URL (e.g. `https://<client>--beta.web.app`)
- [ ] Deploy the Studio: `cd studio && npx sanity deploy`.
- [ ] Populate `page` documents (slugs: `home`, `about`, `services`, `fleet`,
      `contact`) and the translation documents.

## 3. Firebase (Hosting + Functions)

- [ ] Create a Firebase project.
- [ ] `.firebaserc` and `firebase.json` → replace `gvawebsite-b74d4`.
- [ ] `.github/workflows/deploy-*.yml` → replace `projectId: gvawebsite-b74d4`.
- [ ] Upgrade to the **Blaze** plan (required for Functions / the contact form).
- [ ] Contact-form secrets (Gmail): in the Functions config set
      `GMAIL_USER` and `GMAIL_APP_PASSWORD`
      ([app password](https://myaccount.google.com/apppasswords), not the real password).
- [ ] `src/environments/environment.prod.ts` → set `functionsBaseUrl` to the
      project's Cloud Functions URL.

## 4. Analytics & Monitoring

- [ ] **GA4:** create a property at analytics.google.com → Data Streams → copy
      the Measurement ID → `src/environments/environment.prod.ts` →
      `googleAnalyticsId: 'G-XXXXXXXXXX'`.
      (GA only loads after the visitor accepts the cookie banner.)
- [ ] **Sentry:** create an Angular project at sentry.io → copy the DSN →
      `environment.prod.ts` → `sentryDsn`.
- [ ] **UptimeRobot:** [uptimerobot.com](https://uptimerobot.com) → New Monitor
      → HTTP(s) → paste the production URL → alert to your email.

## 5. Content & SEO

- [ ] `src/environments/environment.ts` **and** `environment.prod.ts` → update
      the `business` block (name, phone, email, address, areaServed) — this
      drives the JSON-LD `LocalBusiness` schema.
- [ ] `src/app/services/seo.service.ts` → update the `PAGE_SEO` map (titles,
      descriptions, canonical URLs) and the canonical domain.
- [ ] `src/index.html` → update the static `<title>`, meta description, OG tags,
      canonical link, and the inline JSON-LD fallback.
- [ ] Replace `public/` assets: `favicon.ico`, `robots.txt` (sitemap URL),
      and `src/assets/og-image` / `logo`.
- [ ] Per-page social images: set the **Social Share Image** (`ogImage`) on each
      `page` document in Sanity.
- [ ] **Sitemap** is generated automatically at build time from the CMS. For the
      correct domain, set env vars when building (or rely on the GVA fallback):
      `SITE_URL`, `SANITY_PROJECT_ID`, `SANITY_DATASET`.

## 6. GitHub Secrets & Variables

**Settings → Secrets and variables → Actions**

Secrets:
- [ ] `FIREBASE_SERVICE_ACCOUNT` — service-account JSON (Firebase → Project
      settings → Service accounts → Generate key).
- [ ] `EMAIL_USERNAME`, `EMAIL_PASSWORD`, `NOTIFY_EMAIL` — for the beta-deploy
      notification email (Gmail address + app password + recipient).

## 7. Deploy

- [ ] **Beta:** add the `beta` label to a PR → it builds and deploys to the
      Firebase beta channel automatically.
- [ ] **Production:** Actions → **Deploy — Production** → **Run workflow**
      (manual). CI runs, then the `production` environment approval is requested
      before the Firebase deploy.
- [ ] After first prod deploy: verify Sentry receives a test event, GA4 shows
      realtime traffic (after accepting cookies), and the UptimeRobot monitor is green.

---

## Per-client value quick reference

| Value | Where | From |
|-------|-------|------|
| Sanity projectId | `src/app/sanity.config.ts`, `studio/sanity.config.ts` | sanity.io/manage |
| Firebase projectId | `.firebaserc`, `firebase.json`, deploy workflows | Firebase console |
| Sentry DSN | `environment.prod.ts` | sentry.io |
| GA4 ID | `environment.prod.ts` | analytics.google.com |
| Functions URL | `environment.prod.ts` | Firebase console |
| Business / SEO | `environment.ts` + `.prod.ts`, `seo.service.ts`, `index.html` | client brief |
| Domain | `seo.service.ts`, `index.html`, `robots.txt`, `SITE_URL` env | client |
