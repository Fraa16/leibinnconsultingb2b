/**
 * Screenshots each route at a set of viewports.
 *
 *   node scripts/shoot.mjs <outDir> <baseUrl> <tag> [--reduced]
 *
 * Scroll-reveal animations only settle once each section has actually been in
 * the viewport, so the page is walked down slowly before capture. Passing
 * --reduced emulates prefers-reduced-motion instead, which renders everything
 * in its final state immediately.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [outDir, base, tag] = process.argv.slice(2);
const reduced = process.argv.includes('--reduced');

const ROUTES = [
  ['/', 'home'],
  ['/kontakt', 'kontakt'],
];
const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const [vpName, width, height] of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });

  for (const [route, name] of ROUTES) {
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    if (!reduced) {
      // Walk down a viewport at a time, pausing long enough for the
      // IntersectionObserver to fire and the reveal to play out.
      const pages = await page.evaluate(() => Math.ceil(document.body.scrollHeight / window.innerHeight));
      for (let i = 0; i <= pages; i++) {
        await page.evaluate((i) => window.scrollTo(0, i * window.innerHeight), i);
        await page.waitForTimeout(450);
      }
      await page.waitForTimeout(600);
    }

    await page.screenshot({ path: `${outDir}/${tag}-${name}-${vpName}.png`, fullPage: true });
    console.log(`${tag}-${name}-${vpName}.png`);
  }
  await page.close();
}

await browser.close();
