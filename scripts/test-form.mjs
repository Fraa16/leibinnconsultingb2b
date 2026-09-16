/**
 * End-to-end check of the contact form wiring.
 *
 *   node scripts/test-form.mjs [baseUrl]
 *
 * The Supabase request is intercepted and fulfilled locally, so this verifies
 * the whole path — field state, payload shape, success UI — without writing a
 * test row into the live contact_submissions table.
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:4173';
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let captured = null;

await page.route('**/rest/v1/contact_submissions*', async (route) => {
  const req = route.request();
  try {
    captured = { method: req.method(), body: JSON.parse(req.postData() || 'null') };
  } catch {
    captured = { method: req.method(), body: req.postData() };
  }
  await route.fulfill({
    status: 201,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: '[]',
  });
});

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

console.log('\n2. Filled submit must reach Supabase with every field');
const values = {
  vorname: 'Testina',
  nachname: 'Beispiel',
  email: 'testina@beispiel-gmbh.de',
  telefonnummer: '+49 30 1234567',
  firma: 'Beispiel GmbH',
  position: 'HR-Leitung',
  nachricht: 'Wir möchten unsere Benefits strukturieren.',
};
for (const [name, value] of Object.entries(values)) {
  await page.fill(`#${name}`, value);
}
await page.selectOption('#mitarbeiteranzahl', '21-50');
await page.click('button[type="submit"]');
await page.waitForTimeout(1200);

check('POST issued to contact_submissions', captured?.method === 'POST', captured?.method ?? 'none');

const row = Array.isArray(captured?.body) ? captured.body[0] : captured?.body;
for (const [key, value] of Object.entries(values)) {
  check(`payload.${key}`, row?.[key] === value, JSON.stringify(row?.[key]));
}
check('payload.mitarbeiteranzahl', row?.mitarbeiteranzahl === '21-50', JSON.stringify(row?.mitarbeiteranzahl));
check('no honeypot field submitted', row && !('website' in row));

console.log('\n3. Success state must render');
const success = await page
  .locator('text=Vielen Dank für Ihre Anfrage!')
  .isVisible()
  .catch(() => false);
check('success message shown', success);
check(
  'follow-up promise shown',
  await page
    .locator('text=Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.')
    .isVisible()
    .catch(() => false),
);

console.log('\n4. Server error must surface to the visitor');
await page.unroute('**/rest/v1/contact_submissions*');
await page.route('**/rest/v1/contact_submissions*', (route) =>
  route.fulfill({
    status: 500,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ message: 'boom' }),
  }),
);
await page.goto(`${BASE}/kontakt`, { waitUntil: 'load' });
await page.waitForTimeout(700);
for (const [name, value] of Object.entries(values)) await page.fill(`#${name}`, value);
await page.selectOption('#mitarbeiteranzahl', '21-50');
await page.click('button[type="submit"]');
await page.waitForTimeout(1500);
check(
  'error message shown',
  await page
    .locator('text=Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    .isVisible()
    .catch(() => false),
);
check(
  'form still present so the visitor can retry',
  await page.locator('#vorname').isVisible().catch(() => false),
);

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
