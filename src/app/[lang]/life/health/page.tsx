import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { Heart, Shield, CheckCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  hospitals: { name: string; area: string; features: string; emergency: string }[]
  insurance: { name: string; type: string; price: string; features: string }[]
  tips: string[]
}> = {
  ja: {
    title: '医療・保険ガイド',
    subtitle: 'バンコクの病院情報と海外在住者向け保険の選び方',
    hospitals: [
      { name: 'バムルンラード国際病院', area: 'スクンビット', features: '日本語通訳あり。JCI認定の最高級病院', emergency: '02-011-3000' },
      { name: 'サミティウェート・スクンビット病院', area: 'スクンビット', features: '日系企業との提携多数。日本語対応可', emergency: '02-022-2222' },
      { name: 'BNH病院', area: 'シーロム', features: '外国人に人気。比較的リーズナブル', emergency: '02-022-0700' },
      { name: 'パヤタイ病院', area: '複数拠点', features: 'タイ全国チェーン。コスパ良好', emergency: '1772' },
    ],
    insurance: [
      { name: 'Pacific Cross', type: '長期滞在向け国際保険', price: '月額15,000〜30,000円', features: 'タイ特化。キャッシュレス対応病院多数' },
      { name: 'AXA（アクサ）', type: '国際健康保険', price: '月額20,000〜50,000円', features: '世界中で利用可能。補償内容が充実' },
      { name: 'Cigna（シグナ）', type: '国際健康保険', price: '月額18,000〜45,000円', features: '日本語サポートあり。緊急搬送対応' },
      { name: '旅行傷害保険（クレカ付帯）', type: '短期・入国要件向け', price: '実質無料（カード維持費のみ）', features: '入国要件の最低ラインは満たせる場合あり。長期は別途検討を' },
    ],
    tips: [
      'DTVビザ申請には医療費40,000USD以上の補償が推奨されています',
      '旅行保険と国際健康保険は別物。長期滞在には国際健康保険が適切です',
      'バムルンラード・サミティウェートは英語・日本語対応が充実',
      '市販薬はドラッグストア「Boots」「Watsons」で購入可能。処方箋不要のものも多い',
      '歯科・眼科も私立病院なら外国人対応で質が高く、日本より安いケースも多い',
    ],
  },
  en: {
    title: 'Healthcare & Insurance Guide',
    subtitle: 'Bangkok hospitals and insurance options for long-term DTV residents',
    hospitals: [
      { name: 'Bumrungrad International Hospital', area: 'Sukhumvit', features: 'JCI-accredited. Top-tier with multilingual staff', emergency: '02-011-3000' },
      { name: 'Samitivej Sukhumvit Hospital', area: 'Sukhumvit', features: 'Popular with expats. English and multilingual support', emergency: '02-022-2222' },
      { name: 'BNH Hospital', area: 'Silom', features: 'Well-regarded by foreigners. More affordable', emergency: '02-022-0700' },
      { name: 'Phyathai Hospital', area: 'Multiple locations', features: 'Nationwide chain. Good value for routine care', emergency: '1772' },
    ],
    insurance: [
      { name: 'Pacific Cross', type: 'Long-stay International Insurance', price: '~$100–200/month', features: 'Thailand-focused. Cashless at many hospitals' },
      { name: 'AXA', type: 'International Health Insurance', price: '~$150–350/month', features: 'Worldwide coverage. Comprehensive benefits' },
      { name: 'Cigna', type: 'International Health Insurance', price: '~$130–300/month', features: 'Multilingual support. Emergency evacuation included' },
      { name: 'Credit Card Travel Insurance', type: 'Short-term / Entry Requirement', price: 'Effectively free (card fee only)', features: 'May meet minimum entry requirements. Not recommended for long stays' },
    ],
    tips: [
      'DTV visa applications recommend at least USD 40,000 medical coverage',
      "Travel insurance and international health insurance are different — for long stays, get proper health insurance",
      'Bumrungrad and Samitivej have extensive English-language services',
      'OTC drugs available at Boots or Watsons pharmacies — no prescription needed for many items',
      'Dental and eye care at private hospitals are often cheaper than in your home country and high quality',
    ],
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function HealthPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>

        {/* Hospitals */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? '主要病院（外国人対応）' : 'Major Hospitals (Foreigner-Friendly)'}</h2>
        <div className="space-y-3 mb-10">
          {c.hospitals.map((h, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gold-300">{h.name}</h3>
                <span className="text-xs bg-navy-800 text-navy-300 px-2 py-1 rounded-full">{h.area}</span>
              </div>
              <p className="text-sm text-navy-200 mb-2">{h.features}</p>
              <div className="text-xs text-navy-400">
                {locale === 'ja' ? '救急' : 'Emergency'}: <span className="text-white font-mono">{h.emergency}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance */}
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-5 h-5 text-gold-400" />
          <h2 className="text-xl font-bold">{locale === 'ja' ? '保険プラン比較' : 'Insurance Options'}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {c.insurance.map((ins, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
              <div className="font-bold text-gold-300 mb-1">{ins.name}</div>
              <div className="text-xs text-navy-400 mb-2">{ins.type}</div>
              <div className="text-lg font-bold mb-2">{ins.price}</div>
              <p className="text-sm text-navy-300">{ins.features}</p>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold">{locale === 'ja' ? '医療・保険のポイント' : 'Key Points'}</h2>
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

      </div>
    </div>
  )
}
