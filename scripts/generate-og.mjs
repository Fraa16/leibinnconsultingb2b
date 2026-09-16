/**
 * Builds the social share image and the apple-touch icon.
 *
 * The Bolt export shipped `bolt.new/static/og_default.png` as the og:image, so
 * every share of the client's site rendered a Bolt placeholder card.
 *
 *   npm run og
 */
import sharp from 'sharp';
import { resolve } from 'node:path';
import { statSync } from 'node:fs';

const HERO = resolve('assets-source/cedrik-hero.avif');
const OUT = resolve('public/og-image.jpg');
const ICON = resolve('public/apple-touch-icon.png');

const W = 1200;
const H = 630;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0B0C39" stop-opacity="0.98"/>
      <stop offset="52%"  stop-color="#15174F" stop-opacity="0.94"/>
      <stop offset="78%"  stop-color="#15174F" stop-opacity="0.58"/>
      <stop offset="100%" stop-color="#15174F" stop-opacity="0.18"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  <!-- accent rule -->
  <rect x="72" y="104" width="4" height="26" rx="2" fill="#A1CEE5"/>
  <text x="92" y="125" font-family="DM Sans" font-size="17" font-weight="500"
        letter-spacing="3.4" fill="#A1CEE5">${esc('LEIBINN CONSULTING')}</text>

  <!-- tspan keeps the two-colour line on one baseline without hand-measuring advances -->
  <text x="72" y="240" font-family="DM Sans" font-size="55" font-weight="600"
        letter-spacing="-1.5" fill="#FFFFFF">${esc('Vom Fachkräftemangel')}</text>
  <text x="72" y="308" font-family="DM Sans" font-size="55" font-weight="600"
        letter-spacing="-1.5" fill="#FFFFFF">${esc('zum ')}<tspan fill="#A1CEE5">${esc('begehrten')}</tspan></text>
  <text x="72" y="376" font-family="DM Sans" font-size="55" font-weight="600"
        letter-spacing="-1.5" fill="#A1CEE5">${esc('Arbeitgeber')}</text>

  <text x="72" y="442" font-family="DM Sans" font-size="22" font-weight="400"
        letter-spacing="-0.3" fill="#FFFFFF" opacity="0.72">${esc('Strukturierte Benefit-Systeme für den Mittelstand —')}</text>
  <text x="72" y="474" font-family="DM Sans" font-size="22" font-weight="400"
        letter-spacing="-0.3" fill="#FFFFFF" opacity="0.72">${esc('steuerlich optimiert, verwaltungsarm, spürbar wirksam.')}</text>

  <rect x="72" y="524" width="140" height="3" rx="1.5" fill="#A1CEE5" opacity="0.5"/>
  <text x="72" y="564" font-family="DM Sans" font-size="18" font-weight="500"
        letter-spacing="-0.2" fill="#FFFFFF" opacity="0.85">${esc('Für Unternehmen mit 5 bis 200 Mitarbeitenden')}</text>
</svg>
`);

await sharp(HERO)
  .resize({ width: W, height: H, fit: 'cover', position: 'right top' })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

const icon = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#15174F"/>
  <path d="M21 16h7.5v25.5H45V48H21z" fill="#FFFFFF"/>
  <rect x="21" y="16" width="7.5" height="12" fill="#A1CEE5"/>
</svg>
`);
await sharp(icon).resize(180, 180).png().toFile(ICON);

console.log(`og-image.jpg  ${(statSync(OUT).size / 1024).toFixed(0)} KB`);
console.log(`apple-touch-icon.png  ${(statSync(ICON).size / 1024).toFixed(0)} KB`);
