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
  // Meeting photo: clipped background panel inside a max-w-[1600px] card.
  { in: 'Kundengespraech.jpg', out: 'kundengespraech', widths: [768, 1200, 1600] },
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

for (const img of IMAGES) {
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
