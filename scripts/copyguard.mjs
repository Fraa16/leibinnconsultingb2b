/**
 * Copy guard.
 *
 * Extracts every piece of visible text the site renders, so a redesign can be
 * verified to have changed no wording at all.
 *
 *   node scripts/copyguard.mjs <out-file> [baseUrl]
 *
 * Uses innerText rather than raw text nodes, so wrapping a phrase in <strong>
 * or splitting a paragraph does not register as a copy change — only the words
 * themselves matter. Captured at both a mobile and a desktop viewport, since
 * some blocks only render at one breakpoint.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4173';
const ROUTES = ['/', '/kontakt'];
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

const found = new Set();

for (const viewport of VIEWPORTS) {
  const page = await browser.newPage({ viewport });

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(700);

    // Open every disclosure so collapsed copy is captured too. Submitting the
    // contact form is explicitly avoided.
    for (const button of await page.$$('button')) {
      try {
        const label = ((await button.innerText()) || '').trim();
        if (/anfragen|sichern|senden|absenden/i.test(label)) continue;
        await button.click({ timeout: 250 });
      } catch {
        /* not clickable at this breakpoint */
      }
    }
    await page.waitForTimeout(500);

    const texts = await page.evaluate(() => {
      const out = [];
      // innerText reflects rendering: it merges inline elements and skips
      // anything display:none at this viewport.
      for (const line of (document.body.innerText || '').split('\n')) {
        const s = line.replace(/\s+/g, ' ').trim();
        if (s) out.push(s);
      }
      // Attribute copy is invisible to innerText but still user-facing.
      for (const el of document.querySelectorAll('[placeholder]')) {
        if (el.placeholder?.trim()) out.push('@placeholder: ' + el.placeholder.trim());
      }
      for (const el of document.querySelectorAll('img[alt]')) {
        if (el.alt.trim()) out.push('@alt: ' + el.alt.trim());
      }
      for (const el of document.querySelectorAll('[aria-label]')) {
        const v = el.getAttribute('aria-label')?.trim();
        if (v) out.push('@aria: ' + v);
      }
      for (const el of document.querySelectorAll('option')) {
        const v = el.textContent?.trim();
        if (v) out.push('@option: ' + v);
      }
      return out;
    });

    texts.forEach((t) => found.add(t));
  }

  await page.close();
}

await browser.close();

const sorted = [...found].sort((a, b) => a.localeCompare(b, 'de'));
writeFileSync(OUT, sorted.join('\n') + '\n');
console.log(`${sorted.length} unique strings → ${OUT}`);
