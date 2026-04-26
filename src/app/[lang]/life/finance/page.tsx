import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  banking: { name: string; features: string; note: string }[]
  tax: { question: string; answer: string }[]
  fx: { method: string; rate: string; note: string }[]
  tips: string[]
}> = {
  ja: {
    title: '税金・金融ガイド',
    subtitle: 'DTV長期滞在者のための税金・銀行・外貨両替完全ガイド',
    banking: [
      { name: 'カシコン銀行（KBank）', features: 'アプリが使いやすい。外国人口座開設実績あり', note: 'パスポート＋ビザコピー＋滞在先住所が必要' },
      { name: 'バンコク銀行（BBL）', features: '老舗大手。海外送金が得意', note: '外国人対応窓口あり。英語でのサポート可' },
      { name: 'SCB（サイアム商業銀行）', features: 'SCBアプリが高機能。QR決済対応', note: 'DTV保有者の口座開設事例あり' },
    ],
    tax: [
      {
        question: 'タイに183日以上滞在すると税金はどうなる？',
        answer: '183日以上タイに滞在するとタイ税務居住者とみなされる可能性があります。2024年から、タイ源泉でない所得もタイに送金した場合は課税対象となる新ルールが適用されています。税務の専門家への相談を強く推奨します。',
      },
      {
        question: '日本の確定申告はどうなる？',
        answer: '日本の住民票を残したまま渡航する場合、日本での税務義務は継続します。非居住者として住民票を抜く場合でも、日本国内の収入（不動産収入・給与等）は申告が必要です。',
      },
      {
        question: '日本とタイの租税条約は？',
        answer: '日本とタイには二重課税防止条約があります。両国で課税された場合でも、外国税額控除制度により二重課税を軽減できます。詳細は税理士への相談を。',
      },
    ],
    fx: [
      { method: 'Wise（ワイズ）', rate: '実レートに近い', note: '送金手数料が低く、DTVユーザーに最も人気' },
      { method: 'スーパーリッチタイランド', rate: '現地では最優良レート', note: 'バンコク市内の両替所。エリアや時間で変動あり' },
      { method: '空港両替所', rate: '最悪レート', note: '緊急時以外は避けること' },
      { method: 'タイATM（海外カード）', rate: '銀行レート＋手数料', note: '手数料180〜220バーツが別途発生' },
    ],
    tips: [
      'Wiseのデビットカードを作っておくと両替不要でタイバーツをほぼ実レートで使える',
      'クレジットカードの海外決済手数料（1.6〜2.5%）に注意。Revolut等の無手数料カードがおすすめ',
      '大金を日本から持ち込む場合、100万円超は税関申告が必要',
      'タイの確定申告期限は毎年3月末（個人）。必要な場合は申告を忘れずに',
    ],
  },
  en: {
    title: 'Tax & Finance Guide',
    subtitle: 'Banking, taxes, and currency exchange for long-term DTV residents',
    banking: [
      { name: 'Kasikorn Bank (KBank)', features: 'User-friendly app. Good track record for foreigner accounts', note: 'Passport + visa copy + proof of address required' },
      { name: 'Bangkok Bank (BBL)', features: 'Established major bank. Strong international transfer capabilities', note: 'English support available. Foreigner-friendly branches' },
      { name: 'SCB (Siam Commercial Bank)', features: 'Feature-rich SCB app. QR payment support', note: 'DTV holders have successfully opened accounts here' },
    ],
    tax: [
      {
        question: 'What happens to my taxes if I stay in Thailand 183+ days?',
        answer: 'Staying 183+ days may make you a Thai tax resident. Since 2024, income from foreign sources remitted to Thailand is also potentially taxable under new rules. Strongly recommend consulting a tax professional.',
      },
      {
        question: 'What about taxes in my home country?',
        answer: 'If you maintain tax residency in your home country, obligations continue. Even as a non-resident, income sourced from your home country (rent, salary, etc.) may require filing. Rules vary by country.',
      },
      {
        question: 'Is there a tax treaty between Thailand and my country?',
        answer: 'Thailand has double taxation agreements with many countries. These treaties generally prevent being taxed twice on the same income via foreign tax credits. Check your country-specific treaty and consult a tax advisor.',
      },
    ],
    fx: [
      { method: 'Wise', rate: 'Near mid-market rate', note: 'Lowest transfer fees. Most popular among DTV users' },
      { method: 'Superrich Thailand', rate: 'Best rates in Bangkok', note: 'Currency exchange shops. Rates vary by location and time' },
      { method: 'Airport Exchange', rate: 'Worst rates', note: 'Avoid unless absolutely necessary' },
      { method: 'Thai ATM (foreign card)', rate: 'Bank rate + fees', note: '฿180–220 fee per withdrawal applies' },
    ],
    tips: [
      'A Wise debit card lets you spend in Thai Baht at near mid-market rates without exchanging cash',
      'Watch for foreign transaction fees (1.6–2.5%). Consider fee-free cards like Revolut',
      'Bringing large cash amounts may require customs declaration above certain thresholds',
      'Thai personal tax filing deadline is end of March. File if required',
    ],
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function FinancePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>

        {/* Banking */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? 'タイの銀行口座' : 'Thai Bank Accounts'}</h2>
        <div className="space-y-3 mb-10">
          {c.banking.map((b, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
              <h3 className="font-bold text-gold-300 mb-1">{b.name}</h3>
              <p className="text-sm text-navy-200 mb-2">{b.features}</p>
              <div className="text-xs text-navy-400">📌 {b.note}</div>
            </div>
          ))}
        </div>

        {/* FX */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? '外貨両替・送金方法' : 'Currency Exchange & Transfers'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {c.fx.map((f, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-4 border border-white/10">
              <div className="font-bold mb-1">{f.method}</div>
              <div className="text-gold-400 text-sm font-semibold mb-1">{f.rate}</div>
              <div className="text-xs text-navy-400">{f.note}</div>
            </div>
          ))}
        </div>

        {/* Tax FAQ */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? '税金FAQ' : 'Tax FAQ'}</h2>
        <div className="space-y-4 mb-10">
          {c.tax.map((t, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
              <h3 className="font-bold mb-2 text-gold-300">Q. {t.question}</h3>
              <p className="text-sm text-navy-200 leading-relaxed">A. {t.answer}</p>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold">{locale === 'ja' ? '実用的なヒント' : 'Practical Tips'}</h2>
          </div>
          <ul className="space-y-3">
            {c.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-navy-200">
                <span className="text-gold-400 flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-300">{locale === 'ja' ? '免責事項' : 'Disclaimer'}</span>
          </div>
          <p className="text-xs text-amber-200/70 leading-relaxed">
            {locale === 'ja'
              ? '本ページの情報は一般的な参考情報であり、税務・法律アドバイスではありません。個別の税務判断は必ず専門家にご相談ください。税制は変更される場合があります。'
              : 'Information on this page is for general reference only and does not constitute tax or legal advice. Always consult a qualified professional for your specific situation. Tax rules may change.'}
          </p>
        </div>

      </div>
    </div>
  )
}
