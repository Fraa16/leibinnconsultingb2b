/* Responsive image sources.
 *
 * The client's original photographs are preserved untouched in
 * src/images/originals/ (3807x5710 / 5528x3685 camera masters, ~25MB
 * combined). Those masters are never imported, so they never reach the
 * bundle. What ships are the AVIF/WebP derivatives below — same photos,
 * ~230KB total instead of 25MB.
 *
 * Regenerate with: npm run images
 */

import heroAvif900 from '../images/cedrik-hero-900.avif';
import heroAvif1400 from '../images/cedrik-hero-1400.avif';
import heroAvif1900 from '../images/cedrik-hero-1900.avif';
import heroWebp900 from '../images/cedrik-hero-900.webp';
import heroWebp1400 from '../images/cedrik-hero-1400.webp';
import heroWebp1900 from '../images/cedrik-hero-1900.webp';

import portraitAvif600 from '../images/cedrik-portrait-600.avif';
import portraitAvif900 from '../images/cedrik-portrait-900.avif';
import portraitAvif1200 from '../images/cedrik-portrait-1200.avif';
import portraitWebp600 from '../images/cedrik-portrait-600.webp';
import portraitWebp900 from '../images/cedrik-portrait-900.webp';
import portraitWebp1200 from '../images/cedrik-portrait-1200.webp';

import gespraechAvif900 from '../images/kundengespraech-900.avif';
import gespraechAvif1400 from '../images/kundengespraech-1400.avif';
import gespraechAvif1900 from '../images/kundengespraech-1900.avif';
import gespraechWebp900 from '../images/kundengespraech-900.webp';
import gespraechWebp1400 from '../images/kundengespraech-1400.webp';
import gespraechWebp1900 from '../images/kundengespraech-1900.webp';

export type ImageSet = {
  avif: string;
  webp: string;
  /** Intrinsic ratio of the source, used to reserve space and avoid CLS. */
  width: number;
  height: number;
};

const set = (
  avifs: [string, number][],
  webps: [string, number][],
  width: number,
  height: number,
): ImageSet => ({
  avif: avifs.map(([u, w]) => `${u} ${w}w`).join(', '),
  webp: webps.map(([u, w]) => `${u} ${w}w`).join(', '),
  width,
  height,
});

export const heroImage = set(
  [[heroAvif900, 900], [heroAvif1400, 1400], [heroAvif1900, 1900]],
  [[heroWebp900, 900], [heroWebp1400, 1400], [heroWebp1900, 1900]],
  5524, 3946,
);

export const portraitImage = set(
  [[portraitAvif600, 600], [portraitAvif900, 900], [portraitAvif1200, 1200]],
  [[portraitWebp600, 600], [portraitWebp900, 900], [portraitWebp1200, 1200]],
  3807, 5710,
);

export const gespraechImage = set(
  [[gespraechAvif900, 900], [gespraechAvif1400, 1400], [gespraechAvif1900, 1900]],
  [[gespraechWebp900, 900], [gespraechWebp1400, 1400], [gespraechWebp1900, 1900]],
  5528, 3685,
);

/** Smallest variant, used as the <img src> fallback. */
export const fallbackSrc = {
  hero: heroWebp900,
  portrait: portraitWebp600,
  gespraech: gespraechWebp900,
};
