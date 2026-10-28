/** Loads a page and reports console errors plus a few selector checks. */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';

const url = process.argv[2];
const selectors = process.argv.slice(3);
const browser = await chromium.launch(launchOptions());
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(1500);
console.log('title:', await page.title());
console.log('body chars:', (await page.evaluate(() => document.body.innerText.length)));
for (const s of selectors) {
  console.log(`${s}: ${await page.locator(s).count()}`);
}
console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.slice(0, 6).join('\n') : 'no console errors');
await browser.close();
