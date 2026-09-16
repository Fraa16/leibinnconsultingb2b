import { chromium } from 'playwright';
const [base, tag] = process.argv.slice(2);
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:1440,height:900} });
let bytes = 0, imgBytes = 0, count = 0;
p.on('response', async r => {
  try {
    const buf = await r.body();
    const ct = (r.headers()['content-type']||'');
    bytes += buf.length; count++;
    if (/image/.test(ct)) imgBytes += buf.length;
  } catch {}
});
await p.goto(base + '/', { waitUntil:'load' });
await p.waitForTimeout(2500);
const above = bytes, aboveImg = imgBytes, aboveN = count;
// now scroll the whole page so lazy assets load too
await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));} });
await p.waitForTimeout(2500);
const mb = n => (n/1024/1024).toFixed(2)+' MB';
const kb = n => (n/1024).toFixed(0)+' KB';
console.log(`${tag}`);
console.log(`  initial load     ${kb(above).padStart(10)}  (${aboveN} requests, images ${kb(aboveImg)})`);
console.log(`  after full scroll${mb(bytes).padStart(10)}  (${count} requests, images ${mb(imgBytes)})`);
await b.close();
