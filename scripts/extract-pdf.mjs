import { readFileSync } from 'fs';
import { join } from 'path';

const files = [
  'C:\\Users\\Lenovo\\Downloads\\DTV_Club_最終版SEO・情報設計・商品導線戦略提案（AIO_LLM対応版）.pdf',
  'C:\\Users\\Lenovo\\Downloads\\Claude_Code向け_DTV_Clubブログ記事執筆指示書_最終版（AIO_LLM対応版）.pdf'
];

for (const file of files) {
  const buf = readFileSync(file);
  // Extract readable text using simple regex on PDF buffer
  const str = buf.toString('latin1');
  const matches = str.match(/\(([^\)]{3,200})\)/g) || [];
  const text = matches
    .map(m => m.slice(1, -1))
    .filter(t => /[ぁ-んァ-ン一-龯a-zA-Z0-9]/.test(t))
    .join(' ');
  console.log(`\n=== ${file.split('\\').pop()} ===\n`);
  console.log(text.substring(0, 8000));
}
