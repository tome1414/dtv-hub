import { readFileSync } from 'fs';

// Use pdfjs-dist to properly extract PDF text
const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;

const files = [
  { name: 'SEO戦略PDF', path: 'C:\\Users\\Lenovo\\Downloads\\DTV_Club_最終版SEO・情報設計・商品導線戦略提案（AIO_LLM対応版）.pdf' },
  { name: '執筆指示書PDF', path: 'C:\\Users\\Lenovo\\Downloads\\Claude_Code向け_DTV_Clubブログ記事執筆指示書_最終版（AIO_LLM対応版）.pdf' },
];

for (const file of files) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`=== ${file.name} ===`);
  console.log('='.repeat(60));

  const data = new Uint8Array(readFileSync(file.path));
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  console.log(`Pages: ${pdf.numPages}\n`);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join('');
    if (text.trim()) {
      console.log(`--- Page ${i} ---`);
      console.log(text);
      console.log('');
    }
  }
}
