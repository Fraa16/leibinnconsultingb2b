/**
 * Checks the navigation paths that were broken, plus layout and a11y basics.
 *
 *   node scripts/test-nav.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:4173';
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const goHome = async () => {
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(700);
};

console.log('\n1. CTAs that previously pointed at a non-existent #kontakt');
for (const label of ['Unverbindliche Beratung anfragen', 'Jetzt Vorteile im Gespräch prüfen']) {
  await goHome();
  const el = page.locator(`text=${label}`).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await el.click();
  await page.waitForTimeout(700);
  check(`"${label}" reaches /kontakt`, new URL(page.url()).pathname === '/kontakt', page.url());
}

console.log('\n2. Footer links');
for (const [label, path] of [
  ['Impressum', '/impressum'],
  ['Datenschutz', '/datenschutz'],
]) {
  await goHome();
  const el = page.locator(`footer >> text=${label}`).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await el.click();
  await page.waitForTimeout(700);
  check(`footer "${label}" reaches ${path}`, new URL(page.url()).pathname === path, page.url());
  check(`${path} scrolled to top`, await page.evaluate(() => window.scrollY < 40));
}

console.log('\n3. Anchor navigation from another route');
await page.goto(BASE + '/kontakt', { waitUntil: 'load' });
await page.waitForTimeout(600);
await page.locator('header >> text=Branchen').first().click();
await page.waitForTimeout(1200);
check('nav "Branchen" returns home', new URL(page.url()).pathname === '/');
const branchenTop = await page.evaluate(() => {
  const el = document.getElementById('branchen');
  return el ? Math.abs(el.getBoundingClientRect().top) : -1;
});
check('and scrolls to the Branchen section', branchenTop >= 0 && branchenTop < 140, `${branchenTop}px off`);

console.log('\n4. Direct load of a deep route (needs the SPA rewrite in production)');
await page.goto(BASE + '/kontakt', { waitUntil: 'load' });
await page.waitForTimeout(600);
check('/kontakt renders its form', await page.locator('#vorname').isVisible());

console.log('\n5. Layout: no horizontal overflow');
for (const width of [375, 390, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await goHome();
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`${width}px — no horizontal scroll`, overflow <= 1, `${overflow}px overflow`);
}

console.log('\n6. Accessibility basics');
await page.setViewportSize({ width: 1440, height: 900 });
await goHome();
check(
  'html lang is de',
  (await page.evaluate(() => document.documentElement.lang)) === 'de',
);
check(
  'exactly one h1',
  (await page.locator('h1').count()) === 1,
  String(await page.locator('h1').count()),
);
const noAlt = await page.evaluate(
  () => [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
);
check('every img has an alt attribute', noAlt === 0, `${noAlt} missing`);

const accordion = page.locator('#realitaetscheck button[aria-expanded]').first();
const before = await accordion.getAttribute('aria-expanded');
await accordion.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await accordion.click();
await page.waitForTimeout(400);
const after = await accordion.getAttribute('aria-expanded');
check('accordion toggles aria-expanded', before === 'false' && after === 'true', `${before} → ${after}`);

await goHome();
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
check('first tab stop is the skip link', firstFocus === 'Zum Inhalt springen', firstFocus ?? '');

console.log('\n7. Mobile menu');
await page.setViewportSize({ width: 390, height: 844 });
await goHome();
const toggle = page.locator('button[aria-controls="mobile-menu"]');
check('toggle starts collapsed', (await toggle.getAttribute('aria-expanded')) === 'false');
await toggle.click();
await page.waitForTimeout(400);
check('toggle expands', (await toggle.getAttribute('aria-expanded')) === 'true');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
check('Escape closes it', (await toggle.getAttribute('aria-expanded')) === 'false');

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
