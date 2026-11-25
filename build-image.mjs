// Renders the 25 November 2026 world-news infographic and screenshots it
// straight into this repository as entry.png (1024x1024).
// Run: node build-image.mjs   (uses Playwright + Chrome for Testing)

import { createRequire } from 'node:module';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire('/home/hatch/workspace/makefun/shot-tools/package.json');
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'entry.png');

const cards = [
  { tag: 'TECH · USA', color: '#4da3ff', head: 'Nvidia whipsaw', sub: 'Huang back as CEO; shares +31%, then −6%' },
  { tag: 'EUROPE · WAR', color: '#ff6b5e', head: 'Ukraine sinks Russian warship', sub: 'Sea drones hit corvette at Benghazi, Libya' },
  { tag: 'MIDDLE EAST', color: '#ffb84d', head: 'Hormuz mines, Yemen strikes', sub: 'Tankers hit; coalition bombs Hodeidah port' },
  { tag: 'SPACE · ASIA', color: '#b388ff', head: "Pakistan's first astronaut", sub: "Flies to China's Tiangong space station" },
  { tag: 'SPORT · AFRICA', color: '#5ee08a', head: 'Senegal regains AFCON title', sub: 'Sports court restores 1–0 win over Morocco' },
  { tag: 'ASIA · DISASTER', color: '#ff8fb2', head: 'Miners trapped in Indonesia', sub: 'Flooded gold mine in West Java' },
  { tag: 'AMERICAS', color: '#ffd94d', head: 'Cartagena hostages freed', sub: 'Supermarket siege ends; all rescued' },
  { tag: 'ASIA · LABOUR', color: '#6be3e0', head: 'Bangladesh raises wages 36%', sub: 'Garment pay up after weeks of protests' },
  { tag: 'CLIMATE', color: '#9be15d', head: 'COP31 ends with no deal', sub: 'Split over fossil fuels in Antalya' },
];

const cardHtml = cards.map((c) => `
  <div class="card">
    <div class="bar" style="background:${c.color}"></div>
    <div class="tag" style="color:${c.color}">${c.tag}</div>
    <div class="head">${c.head}</div>
    <div class="sub">${c.sub}</div>
  </div>`).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; font-family: Arial, Helvetica, sans-serif; }
  body { width:1024px; height:1024px; background:#101830; color:#f2f5ff; overflow:hidden; }
  header { padding:44px 40px 14px; text-align:center; }
  .kicker { font-size:23px; letter-spacing:6px; color:#8fb4ff; font-weight:bold; }
  h1 { font-size:72px; line-height:1.05; margin-top:10px; }
  .date { font-size:36px; color:#ffd94d; font-weight:bold; margin-top:8px; }
  .grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:18px; padding:26px 36px 10px; }
  .card { background:#1a2447; border-radius:14px; padding:22px 20px 18px; min-height:222px; position:relative; }
  .bar { width:48px; height:9px; border-radius:4px; margin-bottom:14px; }
  .tag { font-size:17px; font-weight:bold; letter-spacing:2px; }
  .head { font-size:30px; font-weight:bold; line-height:1.18; margin-top:8px; }
  .sub { font-size:21px; line-height:1.32; color:#c3cdea; margin-top:9px; }
  footer { text-align:center; padding:18px 20px 0; font-size:20px; color:#8fa3d9; }
</style></head><body>
  <header>
    <div class="kicker">WORLD NEWS IN ONE IMAGE</div>
    <h1>25 November 2026</h1>
    <div class="date">Wednesday — nine stories that shaped the day</div>
  </header>
  <div class="grid">${cardHtml}</div>
  <footer>Tech · War · Space · Sport · Climate — the world on Wednesday 25 November 2026</footer>
</body></html>`;

const browser = await chromium.launch({
  executablePath: '/home/hatch/workspace/makefun/shot-tools/chrome-linux64/chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(250);
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log('entry.png bytes:', statSync(out).size);
