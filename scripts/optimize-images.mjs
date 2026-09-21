/**
 * Regenerates the responsive AVIF/WebP derivatives in src/images/ from the
 * untouched camera masters in src/images/originals/.
 *
 * The masters are ~25MB combined and are never imported by the app, so they
 * never reach the bundle. Run this after replacing or adding a master:
 *
 *   npm i -D sharp && npm run images
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'src/images');
const ORIG = path.join(SRC, 'originals');

const jobs = [
  { file: 'cedrik-hero.avif', out: 'cedrik-hero', widths: [900, 1400, 1900] },
  { file: 'Cedrik-Leibinn.jpg', out: 'cedrik-portrait', widths: [600, 900, 1200] },
  { file: 'Kundengespräch.jpg', out: 'kundengespraech', widths: [900, 1400, 1900] },
];

/* The desktop hero needs left headroom baked in — see heroWideImage in
   src/lib/media.ts for why object-position cannot do this. */
async function buildWideHero() {
  const src = path.join(ORIG, 'cedrik-hero.avif');
  if (!fs.existsSync(src)) return;
  const meta = await sharp(src).metadata();
  const H = meta.height, W = Math.round(H * 2.5), PAD = W - meta.width;
  const bg = await sharp(src).resize(W, H, { fit: 'cover', position: 'right' }).blur(90).toBuffer();
  const plate = await sharp(bg)
    .composite([{ input: await sharp(src).toBuffer(), left: PAD, top: 0 }])
    .toBuffer();
  for (const width of [1600, 2200, 3000]) {
    const base = sharp(plate).resize({ width, withoutEnlargement: true });
    await base.clone().avif({ quality: 58, effort: 6 }).toFile(path.join(SRC, `cedrik-hero-wide-${width}.avif`));
    await base.clone().webp({ quality: 76, effort: 5 }).toFile(path.join(SRC, `cedrik-hero-wide-${width}.webp`));
    console.log(`  cedrik-hero-wide ${width}w written`);
  }
}

for (const job of jobs) {
  const src = path.join(ORIG, job.file);
  if (!fs.existsSync(src)) {
    console.warn(`skip: ${job.file} not found in src/images/originals/`);
    continue;
  }

  const meta = await sharp(src).metadata();
  console.log(`${job.file}  ${meta.width}x${meta.height}`);

  for (const width of job.widths) {
    if (width > meta.width) continue;
    const base = sharp(src).rotate().resize({ width, withoutEnlargement: true });
    await base.clone().avif({ quality: 58, effort: 6 }).toFile(path.join(SRC, `${job.out}-${width}.avif`));
    await base.clone().webp({ quality: 76, effort: 5 }).toFile(path.join(SRC, `${job.out}-${width}.webp`));
    console.log(`  ${width}w written`);
  }
}

await buildWideHero();
