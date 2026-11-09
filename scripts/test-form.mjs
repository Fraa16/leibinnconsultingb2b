/**
 * End-to-end check of the contact form wiring.
 *
 *   VITE_LEADS_API_URL=https://leads.example.test npm run build
 *   node scripts/test-form.mjs [baseUrl]
 *
 * The request to the central lead service (POST /api/lead) is intercepted and
 * answered locally, so this verifies the whole path (field state, payload
 * shape, success and error UI) without writing a test lead into the database.
 */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';

const BASE = process.argv[2] || 'http://localhost:4173';
const LEAD_API = '**/api/lead';
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type' };

const browser = await chromium.launch(launchOptions());
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let captured = null;
await page.route(LEAD_API, async (route) => {
  const req = route.request();
  if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
  captured = { method: req.method(), body: JSON.parse(req.postData() || 'null') };
  await route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: '{"ok":true}' });
});

const values = {
  vorname: 'Testina',
  nachname: 'Beispiel',
  email: 'testina@beispiel-gmbh.de',
  telefonnummer: '+49 30 1234567',
  firma: 'Beispiel GmbH',
  position: 'HR-Leitung',
  nachricht: 'Wir möchten unsere Benefits strukturieren.',
};
async function fillForm() {
  for (const [name, value] of Object.entries(values)) await page.fill(`#${name}`, value);
  await page.selectOption('#mitarbeiteranzahl', '21-50');
}

console.log('\n1. Empty submit must be blocked by validation');
await page.goto(`${BASE}/kontakt`, { waitUntil: 'load' });
await page.waitForTimeout(800);
await page.click('button[type="submit"]');
await page.waitForTimeout(500);
check('no request fired for an empty form', captured === null);
check(
  'success screen not shown',
  !(await page.locator('text=Vielen Dank für Ihre Anfrage!').isVisible().catch(() => false)),
);

console.log('\n2. Filled submit must reach the lead service with every field');
await fillForm();
await page.click('button[type="submit"]');
await page.waitForTimeout(1200);

check('POST issued to /api/lead', captured?.method === 'POST', captured?.method ?? 'none');
const body = captured?.body ?? {};
check('site and form', body.site === 'b2b' && body.form === 'kontakt', `${body.site} / ${body.form}`);
check('name', body.name === 'Testina Beispiel', JSON.stringify(body.name));
check('email', body.email === values.email);
check('telefon', body.telefon === values.telefonnummer);
check('firma', body.firma === values.firma);
check('position', body.position === values.position);
check('nachricht', body.nachricht === values.nachricht);
check('mitarbeiteranzahl', body.mitarbeiteranzahl === '21-50', JSON.stringify(body.mitarbeiteranzahl));
check('first and last name kept separately', body.fields?.vorname === 'Testina' && body.fields?.nachname === 'Beispiel');
check('honeypot empty', !body.website);
check('event ID for conversion deduplication', typeof body.eventId === 'string' && body.eventId.length > 8);
check('no marketing consent given, no click IDs', body.marketingConsent === false && !body.attribution?.fbclid);

console.log('\n3. Success state must render');
check(
  'success message shown',
  await page.locator('text=Vielen Dank für Ihre Anfrage!').isVisible().catch(() => false),
);
check(
  'follow-up promise shown',
  await page
    .locator('text=Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.')
    .isVisible()
    .catch(() => false),
);

console.log('\n4. Server error must surface to the visitor');
await page.unroute(LEAD_API);
await page.route(LEAD_API, (route) =>
  route.request().method() === 'OPTIONS'
    ? route.fulfill({ status: 204, headers: cors })
    : route.fulfill({ status: 503, contentType: 'application/json', headers: cors, body: '{"ok":false}' }),
);
await page.goto(`${BASE}/kontakt`, { waitUntil: 'load' });
await page.waitForTimeout(700);
await fillForm();
await page.click('button[type="submit"]');
await page.waitForTimeout(1500);
check(
  'error message shown',
  await page
    .locator('text=Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    .isVisible()
    .catch(() => false),
);
check('form still present so the visitor can retry', await page.locator('#vorname').isVisible().catch(() => false));

console.log('\n5. A filled honeypot sends nothing');
await page.unroute(LEAD_API);
let botRequest = false;
await page.route(LEAD_API, (route) => {
  botRequest = true;
  return route.fulfill({ status: 200, headers: cors, body: '{"ok":true}' });
});
await page.goto(`${BASE}/kontakt`, { waitUntil: 'load' });
await page.waitForTimeout(700);
await fillForm();
await page.locator('input[name="website"]').fill('http://spam.example', { force: true });
await page.click('button[type="submit"]');
await page.waitForTimeout(1200);
check('no request for a bot submission', !botRequest);

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
