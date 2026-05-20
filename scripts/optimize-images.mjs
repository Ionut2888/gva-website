/**
 * Image optimisation script — run once (or after adding new assets).
 * Converts PNG hero/section images to WebP at 82 quality.
 * Resizes logo.png (3200×3200) down to 76×76 px (2× retina for 38 px display).
 *
 * Usage:  node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import path from 'path';

const ASSETS = 'src/assets';

const jobs = [
  // ── Logo ──────────────────────────────────────────────────────────────────
  // Displayed at 38 px (header) and 34 px (footer).
  // 76 px = 2× retina; saves ~4,547 KiB.
  {
    src:    `${ASSETS}/logo.png`,
    dest:   `${ASSETS}/logo.webp`,
    resize: { width: 76, height: 76, fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } },
    webp:   { quality: 90, lossless: false },
  },

  // ── Hero slideshow images ─────────────────────────────────────────────────
  // Max display width ≈ 1920 px at 1× (full-bleed cover). Cap at 1920 px.
  {
    src:  `${ASSETS}/0fe30a13-5774-45e6-8dcf-2522380d3cbf.png`,
    dest: `${ASSETS}/0fe30a13-5774-45e6-8dcf-2522380d3cbf.webp`,
    resize: { width: 1920, height: 1080, fit: 'cover' },
    webp: { quality: 82 },
  },
  {
    src:  `${ASSETS}/14d9858a-defd-49d3-864e-fe29d82c0a93.png`,
    dest: `${ASSETS}/14d9858a-defd-49d3-864e-fe29d82c0a93.webp`,
    resize: { width: 1920, height: 1080, fit: 'cover' },
    webp: { quality: 82 },
  },
  {
    src:  `${ASSETS}/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.png`,
    dest: `${ASSETS}/1a36a54a-4837-43e0-bcea-ffa4dbe6f83d.webp`,
    resize: { width: 1920, height: 1080, fit: 'cover' },
    webp: { quality: 82 },
  },
  {
    src:  `${ASSETS}/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.png`,
    dest: `${ASSETS}/31b18fb6-df9a-4f0c-b6d9-d18c2123c482.webp`,
    resize: { width: 1920, height: 1080, fit: 'cover' },
    webp: { quality: 82 },
  },
  {
    src:  `${ASSETS}/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.png`,
    dest: `${ASSETS}/39ec1c4c-7caa-4ad4-b62e-a288bffaf469.webp`,
    resize: { width: 1920, height: 1080, fit: 'cover' },
    webp: { quality: 82 },
  },
];

for (const { src, dest, resize, webp } of jobs) {
  if (!existsSync(src)) {
    console.warn(`⚠  skipping (not found): ${src}`);
    continue;
  }

  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize(resize)
    .webp(webp)
    .toFile(dest);

  const { size: sizeBefore } = await import('fs').then(fs =>
    fs.promises.stat(src)
  );
  const { size: sizeAfter } = await import('fs').then(fs =>
    fs.promises.stat(dest)
  );

  const before = (sizeBefore / 1024).toFixed(0);
  const after  = (sizeAfter  / 1024).toFixed(0);
  const saved  = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0);

  console.log(`✔  ${path.basename(dest)}`);
  console.log(`   ${meta.width}×${meta.height} PNG  ${before} KB  →  ${resize.width}×${resize.height} WebP  ${after} KB  (−${saved}%)`);
}

console.log('\nDone. Update src references from .png → .webp where applicable.');
