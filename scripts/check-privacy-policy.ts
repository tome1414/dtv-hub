// 公開前チェック: 5言語のプライバシーポリシーに内部向け文言が残っていないか、必須情報が揃っているかを検証する。
// 実行: npx tsx scripts/check-privacy-policy.ts   （日付が未設定なら警告、問題があれば終了コード1）
import { getPrivacyPolicy, PRIVACY_ESTABLISHED_ON, PRIVACY_LAST_REVISED_ON } from '../src/lib/golf-dtv-privacy-policy'

const LANGS = ['ja', 'ko', 'en', 'zh', 'ru']
let errors = 0
const warn: string[] = []
const fail = (m: string) => { errors++; console.log('NG  ' + m) }
const ok = (m: string) => console.log('OK  ' + m)

const counts = new Set<number>()
for (const lang of LANGS) {
  const p = getPrivacyPolicy(lang)
  const text = [p.title, p.intro, ...p.sections.flat(), ...p.dates].join('\n')
  counts.add(p.sections.length)
  if (/【要確認|TODO|FIXME|仮の|XXX/.test(text)) fail(`${lang}: 内部向けマーカーが残っています`)
  else ok(`${lang}: 内部向けマーカーなし`)
  for (const need of ['PREMIER GOLF TOUR Co.,Ltd', '9 Thong Lo, Khlongton-nua, Watthana, Bangkok 10110', 'Ken Sugiyama', 'HEAD PRO', 'dtv.club.thailand@gmail.com']) {
    if (!text.includes(need)) fail(`${lang}: 「${need}」がありません`)
  }
  if (text.includes('golfdtv@gmail.com')) fail(`${lang}: フォーム送信先アドレスが混入しています`)
  if (!/Messenger/.test(text)) fail(`${lang}: Messengerの記載がありません`)
}
if (counts.size !== 1) fail(`言語間で章数が一致しません: ${[...counts].join(',')}`)
else ok(`全言語 ${[...counts][0]} 章`)

if (!PRIVACY_LAST_REVISED_ON) warn.push('最終改訂日が未設定です（本番公開日に PRIVACY_LAST_REVISED_ON を設定）')
if (!PRIVACY_ESTABLISHED_ON) warn.push('制定日が未設定です（確定するまで日付行は表示されません。省略も可）')
for (const w of warn) console.log('WARN ' + w)
console.log(errors === 0 ? '\nチェック通過（警告は上記のとおり）' : `\n${errors} 件のエラー`)
process.exit(errors === 0 ? 0 : 1)
