import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { Home, CheckCircle, AlertCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  ranges: { type: string; price: string; desc: string }[]
  platforms: { name: string; desc: string; url: string }[]
  checklist: string[]
  warnings: string[]
}> = {
  ja: {
    title: '家賃・物件ガイド',
    subtitle: 'バンコクのコンドミニアム・アパート賃貸の相場と探し方',
    ranges: [
      { type: 'スタジオ（25〜35㎡）', price: '8,000〜18,000円/月', desc: '一人暮らしに最適。設備は最低限' },
      { type: '1ベッドルーム（35〜55㎡）', price: '15,000〜40,000円/月', desc: 'もっとも人気。広さと価格のバランス◎' },
      { type: '2ベッドルーム（55〜80㎡）', price: '30,000〜80,000円/月', desc: 'カップル・家族向け。書斎としても◎' },
      { type: 'サービスアパート', price: '40,000〜150,000円/月', desc: 'ホテル並みのサービス付き。短期滞在向け' },
    ],
    platforms: [
      { name: 'DDProperty', desc: 'タイ最大の不動産ポータル。英語対応', url: 'ddproperty.com' },
      { name: 'Hipflat', desc: 'コンドミニアム専門。間取り・設備検索が便利', url: 'hipflat.com' },
      { name: 'Facebook Groups', desc: '「Bangkok Condo For Rent」等のグループで掘り出し物多数', url: 'facebook.com' },
      { name: 'Airbnb（長期）', desc: '1ヶ月以上の割引あり。家具付き即入居', url: 'airbnb.com' },
    ],
    checklist: [
      '契約書は英語またはタイ語＋英語の両言語を確認',
      'デポジットは通常2ヶ月分（退去時返金）',
      '電気代・水道代・管理費が別途かを確認',
      'エアコンの数・状態（タイでは必須）',
      '高速Wi-Fiの有無（コワーカーに必須）',
      '近くのコンビニ・スーパーまでの距離',
      'BTSまたはMRTへのアクセス',
      'オーナーへの連絡方法（LINEが主流）',
    ],
    warnings: [
      '築古物件は水回りや排水に問題がある場合があります。内見時に確認を',
      '契約前に写真撮影しておくとデポジット返金トラブルを避けられます',
      '仲介業者の手数料は通常1ヶ月分。事前に確認してください',
    ],
  },
  en: {
    title: 'Housing & Rental Guide',
    subtitle: 'Bangkok condo and apartment rental prices and how to find them',
    ranges: [
      { type: 'Studio (25–35㎡)', price: '฿3,000–6,500/month', desc: 'Great for solo living. Basic amenities' },
      { type: '1 Bedroom (35–55㎡)', price: '฿5,500–15,000/month', desc: 'Most popular. Best balance of space and price' },
      { type: '2 Bedrooms (55–80㎡)', price: '฿10,000–30,000/month', desc: 'For couples or those needing a home office' },
      { type: 'Serviced Apartment', price: '฿15,000–55,000/month', desc: 'Hotel-like services. Best for short-term stays' },
    ],
    platforms: [
      { name: 'DDProperty', desc: "Thailand's largest property portal. English-friendly", url: 'ddproperty.com' },
      { name: 'Hipflat', desc: 'Condo specialist. Great search filters for layout and amenities', url: 'hipflat.com' },
      { name: 'Facebook Groups', desc: 'Search "Bangkok Condo For Rent" groups for hidden gems', url: 'facebook.com' },
      { name: 'Airbnb (monthly)', desc: 'Good discounts for 1+ month stays. Furnished and ready', url: 'airbnb.com' },
    ],
    checklist: [
      'Review lease in English or bilingual Thai/English',
      'Deposit is typically 2 months (refundable on exit)',
      'Confirm if electricity, water, and maintenance are included',
      'Check A/C units and condition (essential in Thailand)',
      'Verify high-speed Wi-Fi availability (crucial for remote workers)',
      'Distance to convenience stores and supermarkets',
      'BTS or MRT access',
      'Contact method for the landlord (LINE is standard)',
    ],
    warnings: [
      'Older buildings may have plumbing issues — inspect thoroughly during viewings',
      'Take photos before move-in to avoid deposit disputes on checkout',
      'Agent fees are typically 1 month rent — confirm upfront',
    ],
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function HousingPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>

        {/* Price ranges */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? '家賃相場' : 'Rental Price Ranges'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {c.ranges.map((r, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold text-gold-400 mb-1">{r.price}</div>
              <div className="font-bold mb-1">{r.type}</div>
              <div className="text-sm text-navy-300">{r.desc}</div>
            </div>
          ))}
        </div>

        {/* Platforms */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? '物件検索サイト' : 'Where to Search'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {c.platforms.map((p, i) => (
            <div key={i} className="bg-navy-900 rounded-xl p-4 border border-white/10">
              <div className="font-bold text-gold-300 mb-1">{p.name}</div>
              <div className="text-sm text-navy-300">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold">{locale === 'ja' ? '内見・契約チェックリスト' : 'Viewing & Lease Checklist'}</h2>
          </div>
          <ul className="space-y-3">
            {c.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-navy-200">
                <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300">{locale === 'ja' ? '注意事項' : 'Watch Out For'}</h3>
          </div>
          <ul className="space-y-2">
            {c.warnings.map((w, i) => (
              <li key={i} className="text-sm text-amber-200/80 flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0">•</span>
                {w}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
