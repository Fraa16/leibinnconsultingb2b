/**
 * Generates responsive AVIF + WebP derivatives from the photo masters.
 *
 * The Bolt export shipped unprocessed camera originals (25.7 MB total) straight
 * into the bundle. This produces the width variants each image is actually
 * displayed at, so the browser downloads kilobytes instead of megabytes.
 *
 *   npm run images
 *
 * Add a new photo by dropping it in assets-source/ and adding an entry below.
 */
import sharp from 'sharp';
import { mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SRC = resolve('assets-source');
const OUT = resolve('src/assets/images');

/** width: the CSS pixel widths each image is rendered at, x1 and x2 */
const IMAGES = [
  // Hero: full-bleed on mobile, ~47% of a 1600px shell on desktop.
  { in: 'cedrik-hero.avif', out: 'cedrik-hero', widths: [640, 960, 1280, 1920] },
  // Portrait card: capped at max-w-md (448px), 3:4 crop.
  { in: 'Cedrik-Leibinn.jpg', out: 'cedrik-portrait', widths: [448, 672, 896] },
  // Meeting photo: a letterbox band the full width of the content column, so
  // it needs a derivative that still holds up on a 2x desktop display.
  { in: 'Kundengespraech.jpg', out: 'kundengespraech', widths: [768, 1200, 1600, 2400] },
  // Consequences card, inside a column that tops out near 620px.
  { in: 'cedrik-fenster.jpg', out: 'cedrik-fenster', widths: [480, 720, 960] },
  // Ablauf: the sticky column beside the steps, roughly 42vw.
  { in: 'beratung-lounge.jpg', out: 'beratung-lounge', widths: [560, 840, 1120] },
  // Kontakt: the panel beside the form.
  { in: 'beratung-gespraech.jpg', out: 'beratung-gespraech', widths: [640, 960, 1280] },
  // Closing CTA: full-bleed behind a heavy navy scrim, so quality can be low.
  { in: 'frankfurt-skyline.webp', out: 'frankfurt-skyline', widths: [1024, 1600, 1920] },
  // Closing CTA: Cedrik cut out of photo 7 (rembg, birefnet-portrait model),
  // cropped head to chest. Transparent; AVIF and WebP both keep the alpha.
  { in: 'cedrik-cutout.png', out: 'cedrik-cutout', widths: [480, 720, 1000] },
];

const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 80, effort: 5 };

const kb = (b) => (b / 1024).toFixed(0) + ' KB';
const mb = (b) => (b / 1024 / 1024).toFixed(1) + ' MB';

if (!existsSync(SRC)) {
  console.error(`No assets-source/ directory. Photo masters must live there.`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

let before = 0;
let after = 0;

// `npm run images -- cedrik-cutout` regenerates just the named outputs.
const only = process.argv.slice(2);
const selected = only.length ? IMAGES.filter((img) => only.includes(img.out)) : IMAGES;

for (const img of selected) {
  const src = join(SRC, img.in);
  if (!existsSync(src)) {
    console.warn(`skip ${img.in} — not found in assets-source/`);
    continue;
  }
  const srcBytes = statSync(src).size;
  before += srcBytes;

  const meta = await sharp(src).metadata();
  console.log(`\n${img.in}  ${meta.width}×${meta.height}  ${mb(srcBytes)}`);

  for (const w of img.widths) {
    if (w > meta.width) continue;
    const base = sharp(src).resize({ width: w, withoutEnlargement: true });

    const avifPath = join(OUT, `${img.out}-${w}.avif`);
    const webpPath = join(OUT, `${img.out}-${w}.webp`);

    await base.clone().avif(AVIF).toFile(avifPath);
    await base.clone().webp(WEBP).toFile(webpPath);

    const a = statSync(avifPath).size;
    const b = statSync(webpPath).size;
    after += a + b;
    console.log(`  ${String(w).padStart(4)}w   avif ${kb(a).padStart(8)}   webp ${kb(b).padStart(8)}`);
  }
}

console.log(`\nmasters ${mb(before)}  →  derivatives ${mb(after)}`);
console.log(`(the browser loads one width, not all of them)`);

const generated = readdirSync(OUT).length;
console.log(`${generated} files in src/assets/images/`);
