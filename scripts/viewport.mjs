/** Single above-the-fold screenshot. node scripts/viewport.mjs <out.png> [url] [w] [h] */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';

const [out, url = 'http://localhost:4173/', w = '1440', h = '950'] = process.argv.slice(2);

const browser = await chromium.launch(launchOptions());
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(1600);
await page.screenshot({ path: out });
console.log('captured', out);
await browser.close();
