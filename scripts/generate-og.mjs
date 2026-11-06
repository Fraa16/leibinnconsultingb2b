/**
 * Builds the social share image.
 *
 * The Bolt export shipped `bolt.new/static/og_default.png` as the og:image, so
 * every share of the client's site rendered a Bolt placeholder card.
 *
 *   npm run og          (after `npm run logo`)
 *
 * Text is drawn with Instrument Sans, the site's face. librsvg resolves it
 * from the system font list, so the card is typeset in the brand rather than
 * in whatever the renderer falls back to.
 */
import sharp from 'sharp';
import { resolve } from 'node:path';
import { readFileSync, statSync } from 'node:fs';

const { lockup, gradient } = JSON.parse(
  readFileSync(resolve('src/assets/brand/logo-paths.json'), 'utf8')
);

const HERO = resolve('assets-source/cedrik-hero.avif');
const OUT = resolve('public/og-image.jpg');

const W = 1200;
const H = 630;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The lockup, laid into the card at a given width. */
function logo({ x, y, width }) {
  const [, , vw] = lockup.viewBox.split(' ').map(Number);
  const scale = width / vw;
  const path = (d) => `<path d="${d}"/>`;
  return `
  <g transform="translate(${x} ${y}) scale(${scale.toFixed(5)})">
    <g fill="url(#mark)">${lockup.mark.map(path).join('')}</g>
    <g fill="#FFFFFF">${lockup.name.map(path).join('')}</g>
    <g fill="#FFFFFF" opacity="0.55">${lockup.tagline.map(path).join('')}</g>
  </g>`;
}

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0B0C39" stop-opacity="0.98"/>
      <stop offset="52%"  stop-color="#15174F" stop-opacity="0.94"/>
      <stop offset="78%"  stop-color="#15174F" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#15174F" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="0.92" y2="0.78">
      <stop offset="0" stop-color="${gradient.from}"/>
      <stop offset="1" stop-color="#6A72D6"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  ${logo({ x: 72, y: 74, width: 300 })}

  <!-- Three lines rather than one wrapped block: librsvg has no text layout. -->
  <text x="72" y="256" font-family="Instrument Sans" font-size="55" font-weight="600"
        letter-spacing="-1.9" fill="#FFFFFF">${esc('Vom Fachkräftemangel')}</text>
  <text x="72" y="322" font-family="Instrument Sans" font-size="55" font-weight="600"
        letter-spacing="-1.9" fill="#FFFFFF">${esc('zum ')}<tspan fill="#A1CEE5">${esc('begehrten')}</tspan></text>
  <text x="72" y="388" font-family="Instrument Sans" font-size="55" font-weight="600"
        letter-spacing="-1.9" fill="#A1CEE5">${esc('Arbeitgeber')}</text>

  <text x="72" y="452" font-family="Instrument Sans" font-size="21" font-weight="400"
        letter-spacing="-0.3" fill="#FFFFFF" opacity="0.72">${esc('Benefit-Systeme für den Mittelstand:')}</text>
  <text x="72" y="483" font-family="Instrument Sans" font-size="21" font-weight="400"
        letter-spacing="-0.3" fill="#FFFFFF" opacity="0.72">${esc('steuerlich sauber und einfach zu verwalten.')}</text>

  <rect x="72" y="528" width="140" height="2" fill="#A1CEE5" opacity="0.45"/>
  <text x="72" y="566" font-family="Instrument Sans" font-size="18" font-weight="500"
        letter-spacing="-0.2" fill="#FFFFFF" opacity="0.85">${esc('Für Unternehmen mit 5 bis 200 Mitarbeitenden')}</text>
</svg>
`);

await sharp(HERO)
  .resize({ width: W, height: H, fit: 'cover', position: 'right top' })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

console.log(`og-image.jpg  ${(statSync(OUT).size / 1024).toFixed(0)} KB`);
