import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { MapPin, Train, DollarSign, Sun } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  areas: { name: string; vibe: string; rent: string; access: string }[]
  costs: { category: string; items: { label: string; price: string }[] }[]
  tips: string[]
}> = {
  ja: {
    title: 'バンコク生活情報',
    subtitle: 'DTV長期滞在者のためのバンコク完全ガイド',
    areas: [
      { name: 'スクンビット（プロンポン・アソーク）', vibe: '日本人街。スーパー・レストラン充実', rent: '25,000〜80,000円/月', access: 'BTS直結。利便性最高' },
      { name: 'シーロム・サトーン', vibe: 'ビジネス街。落ち着いた雰囲気', rent: '20,000〜60,000円/月', access: 'BTS/MRT双方アクセス可' },
      { name: 'アリー', vibe: 'カフェ・コワーキング多数。若者向け', rent: '15,000〜40,000円/月', access: 'BTSアリー駅徒歩圏' },
      { name: 'ラチャダー', vibe: 'ローカル色強め。コスパ抜群', rent: '10,000〜30,000円/月', access: 'MRTアクセス良好' },
      { name: 'チットロム', vibe: 'ショッピング中心地。便利な立地', rent: '30,000〜100,000円/月', access: 'BTSチットロム駅直結' },
    ],
    costs: [
      {
        category: '食費',
        items: [
          { label: 'ローカルフード（1食）', price: '60〜150円' },
          { label: 'カフェ・コーヒー', price: '200〜400円' },
          { label: '日本食レストラン（1食）', price: '800〜2,000円' },
          { label: 'コンビニ弁当', price: '200〜400円' },
        ],
      },
      {
        category: '交通費',
        items: [
          { label: 'BTS（1回）', price: '50〜150円' },
          { label: 'MRT（1回）', price: '50〜130円' },
          { label: 'Grab（タクシー5km）', price: '150〜300円' },
          { label: 'バス（1回）', price: '15〜25円' },
        ],
      },
      {
        category: 'インターネット・通信',
        items: [
          { label: 'SIMカード（30日）', price: '1,500〜3,000円' },
          { label: 'コンドミニアムWi-Fi', price: '通常無料（物件に含む）' },
          { label: 'コワーキングスペース（1日）', price: '500〜1,500円' },
        ],
      },
    ],
    tips: [
      'Grabアプリ（配車・フードデリバリー）は必須。移動・食事の両方に使える',
      '雨季（5〜10月）は午後にスコールが多い。折りたたみ傘を常備',
      'スーパーはVilla Market（日本食品多）、Tops、Big Cが便利',
      '日本語対応の病院：バムルンラード病院、サミティウェート病院',
      'SIMはAIS・TrueMove・DTACが主要キャリア。空港で購入可能',
    ],
  },
  en: {
    title: 'Bangkok Living Guide',
    subtitle: 'A complete guide to Bangkok for DTV long-term residents',
    areas: [
      { name: 'Sukhumvit (Phrom Phong / Asok)', vibe: 'International hub with expat amenities', rent: '฿8,000–25,000/month', access: 'BTS direct. Best connectivity' },
      { name: 'Silom / Sathorn', vibe: 'Business district. Quieter feel', rent: '฿7,000–20,000/month', access: 'Both BTS and MRT access' },
      { name: 'Ari', vibe: 'Cafes & coworking. Young crowd', rent: '฿5,000–14,000/month', access: 'Walk from BTS Ari' },
      { name: 'Ratchada', vibe: 'Local vibe. Excellent value', rent: '฿4,000–10,000/month', access: 'Good MRT access' },
      { name: 'Chit Lom', vibe: 'Shopping center. Super convenient', rent: '฿10,000–35,000/month', access: 'BTS Chit Lom direct' },
    ],
    costs: [
      {
        category: 'Food',
        items: [
          { label: 'Local street food (per meal)', price: '฿40–100' },
          { label: 'Cafe / coffee', price: '฿80–150' },
          { label: 'Restaurant (per meal)', price: '฿300–800' },
          { label: 'Convenience store meal', price: '฿50–150' },
        ],
      },
      {
        category: 'Transport',
        items: [
          { label: 'BTS (per trip)', price: '฿17–47' },
          { label: 'MRT (per trip)', price: '฿17–42' },
          { label: 'Grab taxi (5km)', price: '฿60–120' },
          { label: 'Bus (per trip)', price: '฿8–15' },
        ],
      },
      {
        category: 'Internet & Connectivity',
        items: [
          { label: 'SIM card (30 days)', price: '฿300–800' },
          { label: 'Condo Wi-Fi', price: 'Usually included' },
          { label: 'Coworking space (per day)', price: '฿200–600' },
        ],
      },
    ],
    tips: [
      'Grab app is essential — use it for rides, food delivery, and more',
      'Rainy season (May–Oct) brings afternoon showers. Keep a compact umbrella',
      'Supermarkets: Villa Market (imported goods), Tops, Big C',
      'English-friendly hospitals: Bumrungrad, Samitivej',
      'SIM cards from AIS, TrueMove, or DTAC — buy at the airport',
    ],
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function BangkokPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>

        {/* Areas */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Train className="w-5 h-5 text-gold-400" />
            <h2 className="text-xl font-bold">{locale === 'ja' ? '主要エリアガイド' : 'Key Areas'}</h2>
          </div>
          <div className="space-y-3">
            {c.areas.map((area, i) => (
              <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
                <h3 className="font-bold mb-2 text-gold-300">{area.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div><span className="text-navy-400">{locale === 'ja' ? '雰囲気: ' : 'Vibe: '}</span><span className="text-navy-200">{area.vibe}</span></div>
                  <div><span className="text-navy-400">{locale === 'ja' ? '家賃: ' : 'Rent: '}</span><span className="text-navy-200">{area.rent}</span></div>
                  <div><span className="text-navy-400">{locale === 'ja' ? '交通: ' : 'Access: '}</span><span className="text-navy-200">{area.access}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Costs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <DollarSign className="w-5 h-5 text-gold-400" />
            <h2 className="text-xl font-bold">{locale === 'ja' ? '生活コスト目安' : 'Cost of Living'}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.costs.map((cat, i) => (
              <div key={i} className="bg-navy-900 rounded-xl p-5 border border-white/10">
                <h3 className="font-bold mb-4 text-gold-300">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex justify-between text-sm">
                      <span className="text-navy-300">{item.label}</span>
                      <span className="text-white font-semibold">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold">{locale === 'ja' ? '生活の豆知識' : 'Practical Tips'}</h2>
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
