/**
 * Dynamic sitemap generator — runs automatically before every build
 * (npm "prebuild" lifecycle hook).
 *
 * Queries Sanity for all published pages and writes public/sitemap.xml so the
 * sitemap stays in sync when a client adds/removes pages in the CMS. If Sanity
 * is unreachable, it logs a warning and leaves the existing sitemap untouched
 * (never fails the build).
 *
 * TEMPLATE NOTE — per-client config via env vars (with GVA fallbacks):
 *   SANITY_PROJECT_ID   SANITY_DATASET   SITE_URL
 *
 * Usage:  node scripts/generate-sitemap.mjs   (or just `npm run build`)
 */

import { writeFileSync } from 'fs';

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'es1eh557';
const DATASET = process.env.SANITY_DATASET || 'production';
const SITE_URL = (process.env.SITE_URL || 'https://www.gvaverkaufer.ro').replace(/\/$/, '');
const API_VERSION = '2024-01-01';
const OUT = 'public/sitemap.xml';

// Static routes not backed by a CMS "page" document, with their priorities.
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookies', priority: '0.3', changefreq: 'yearly' },
];

function buildXml(urls) {
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const query = encodeURIComponent('*[_type=="page" && defined(slug.current)]{"slug": slug.current, _updatedAt}');
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
  const { result } = await res.json();

  const cmsUrls = (result || []).map((p) => ({
    path: `/${p.slug}`,
    lastmod: (p._updatedAt || today).slice(0, 10),
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const staticUrls = STATIC_ROUTES.map((r) => ({ ...r, lastmod: today }));

  // De-dupe by path (a CMS "home" slug shouldn't double the root entry).
  const seen = new Set();
  const all = [...staticUrls, ...cmsUrls].filter((u) => {
    if (seen.has(u.path)) return false;
    seen.add(u.path);
    return true;
  });

  writeFileSync(OUT, buildXml(all));
  console.log(`✔ sitemap.xml written — ${all.length} URLs (${cmsUrls.length} from CMS)`);
}

main().catch((err) => {
  console.warn(`⚠ sitemap generation skipped: ${err.message}. Existing ${OUT} kept.`);
  process.exit(0); // never break the build
});
