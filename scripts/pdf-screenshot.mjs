// PDF screenshot - uses URL fragment #page=N to jump to each page
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const PDF_LOCAL = resolve('./docs/English-Manual.pdf');
const BASE_URL = `file:///${PDF_LOCAL.replace(/\\/g, '/')}`;
const OUTPUT_DIR = './public/evisa-manual';
const PAGES_TO_CAPTURE = 35;

mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  for (let i = 1; i <= PAGES_TO_CAPTURE; i++) {
    const page = await context.newPage();
    const url = `${BASE_URL}#page=${i}`;

    try {
      await page.goto(url, { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(3000); // wait for PDF to render

      const padded = String(i).padStart(2, '0');
      await page.screenshot({
        path: `${OUTPUT_DIR}/evisa-manual-p${padded}.png`,
        clip: { x: 150, y: 30, width: 980, height: 830 },
      });
      console.log(`Saved p${padded}`);
    } catch (e) {
      console.error(`Failed p${i}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('All done!');
})();
