import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const isJa = lang === 'ja'
  return {
    title: isJa ? 'ソフトパワービザとは｜DTVビザ取得の最短ルート' : 'What is the Soft Power Visa? | Fastest DTV Route',
    description: isJa
      ? 'タイ政府認定プログラム（ゴルフ・マッサージ等）でDTVビザを取得できるソフトパワールートを解説します。'
      : 'Learn how to obtain a DTV visa through Thai government-certified Soft Power programs like golf and wellness.',
    alternates: {
      canonical: `https://dtvclub.com/${lang}/soft-power`,
    },
  }
}

const content = {
  ja: {
    badge: 'タイ政府認定',
    title: 'ソフトパワービザとは',
    subtitle: 'タイ政府公認プログラムでDTVビザを取得する最短ルート',
    intro: 'ソフトパワービザは、タイ政府が推進する文化・スポーツ・ウェルネス分野の認定プログラムを受講することで、DTVビザ（Destination Thailand Visa）を取得できる制度です。通常の財政証明だけでなく、プログラムへの参加が申請の強力な根拠となります。',
    otherPrograms: 'ソフトパワー対象プログラムには、ゴルフのほかにも、タイ古式マッサージ・ムエタイ・タイ料理などのタイ政府認定プログラムが存在します。ただし当サービスが提供・サポートしているのはゴルフDTVのみです。',
    stepsTitle: '申請の流れ',
    steps: [
      { title: 'プログラムを選ぶ', desc: 'タイ政府認定のゴルフスクールプログラムを選択' },
      { title: '入学手続き・書類取得', desc: '認定スクールに申込み。入学許可書・推薦状を発行してもらう' },
      { title: 'ビザ申請', desc: '書類一式を揃えて大使館へ申請。通常5〜10営業日で発行' },
      { title: 'タイ入国・プログラム受講', desc: 'ビザ取得後にタイへ渡航。プログラムに参加しながら長期滞在を楽しむ' },
    ],
    featuresTitle: 'ソフトパワービザのメリット',
    features: [
      '通常のフリーランス証明が不要（プログラム参加が根拠になる）',
      '初心者でも参加できる',
      '認定校から公式書類が発行される',
      '書類準備の負担が少なく申請しやすい',
      '返金保証付きサービスあり',
    ],
    golfTitle: '当サービスが提供するプログラム',
    golfName: 'ゴルフスクール DTV',
    golfDesc: 'タイ政府公認ゴルフスクールでのレッスン。初心者歓迎。全額返金保証付きプランあり。',
    golfLink: '詳細を見る',
    otherTitle: 'その他のソフトパワー対象プログラム',
    cta: 'ゴルフDTVプログラムの詳細を見る',
  },
  en: {
    badge: 'Thai Government Certified',
    title: 'What is the Soft Power Visa?',
    subtitle: 'The fastest route to a DTV visa through Thai government-certified programs',
    intro: 'The Soft Power Visa allows you to obtain a DTV (Destination Thailand Visa) by enrolling in government-certified cultural, sports, or wellness programs. Participation in these programs serves as strong supporting evidence for your visa application.',
    otherPrograms: 'Soft Power eligible programs include Thai massage, Muay Thai, Thai cooking, and other Thai government-certified activities in addition to golf. However, our service supports and provides the Golf DTV program only.',
    stepsTitle: 'How It Works',
    steps: [
      { title: 'Choose a Program', desc: 'Select a Thai government-certified golf school program' },
      { title: 'Enroll & Get Documents', desc: 'Apply to a certified school and obtain your acceptance letter and recommendation' },
      { title: 'Apply for Visa', desc: 'Submit all documents to the embassy. Usually issued within 5–10 business days' },
      { title: 'Travel & Attend', desc: 'Fly to Thailand, attend your program, and enjoy your long-term stay' },
    ],
    featuresTitle: 'Why Choose Soft Power Visa',
    features: [
      'No need for typical freelance income proof — program participation is sufficient',
      'Beginner-friendly',
      'Official documents issued by certified institutions',
      'Less paperwork burden — easier to apply',
      'Money-back guarantee available',
    ],
    golfTitle: 'Program We Provide',
    golfName: 'Golf School DTV',
    golfDesc: 'Golf lessons at a Thai government-certified school. Beginner-friendly. Money-back guarantee available.',
    golfLink: 'Learn more',
    otherTitle: 'Other Soft Power Programs',
    cta: 'View Golf DTV Program Details',
  },
  ru: {
    badge: 'Сертификат правительства Таиланда',
    title: 'Что такое виза Soft Power?',
    subtitle: 'Быстрый путь к визе DTV через программы, сертифицированные правительством Таиланда',
    intro: 'Виза Soft Power позволяет получить визу DTV (Destination Thailand Visa), записавшись в сертифицированные государством программы в области культуры, спорта или оздоровления. Участие в программе служит весомым основанием для заявки на визу.',
    otherPrograms: 'К программам Soft Power относятся тайский массаж, Муай Тай, тайская кухня и другие виды деятельности, сертифицированные правительством Таиланда, помимо гольфа. Однако наш сервис поддерживает и предоставляет только программу Golf DTV.',
    stepsTitle: 'Как это работает',
    steps: [
      { title: 'Выбери программу', desc: 'Выбери программу школы гольфа, сертифицированной правительством Таиланда' },
      { title: 'Запись и документы', desc: 'Подай заявку в сертифицированную школу и получи письмо о зачислении и рекомендацию' },
      { title: 'Подача на визу', desc: 'Предоставь все документы в посольство. Обычно выдаётся в течение 5–10 рабочих дней' },
      { title: 'Въезд и программа', desc: 'Прилети в Таиланд, посещай программу и наслаждайся длительным проживанием' },
    ],
    featuresTitle: 'Преимущества визы Soft Power',
    features: [
      'Не нужно доказывать доходы фриланса — достаточно участия в программе',
      'Подходит для начинающих',
      'Официальные документы от сертифицированных учреждений',
      'Меньше бумажной работы — проще подать',
      'Доступен план с гарантией возврата денег',
    ],
    golfTitle: 'Программа нашего сервиса',
    golfName: 'Golf School DTV',
    golfDesc: 'Уроки гольфа в школе, сертифицированной правительством Таиланда. Принимаем новичков. Доступен план с гарантией возврата.',
    golfLink: 'Подробнее',
    otherTitle: 'Другие программы Soft Power',
    cta: 'Подробнее о программе Golf DTV',
  },
  zh: {
    badge: '泰国政府认证',
    title: '软实力签证是什么？',
    subtitle: '通过泰国政府认可项目获取DTV签证的最快路径',
    intro: '软实力签证是指通过参加泰国政府推广的文化、体育或健康领域认证项目，从而获得DTV（目的地泰国签证）的制度。项目参与本身就是签证申请的有力依据。',
    otherPrograms: '软实力对象项目除高尔夫外，还包括泰式按摩、泰拳、泰国料理等泰国政府认证项目。但本服务仅提供和支持Golf DTV项目。',
    stepsTitle: '申请流程',
    steps: [
      { title: '选择项目', desc: '选择泰国政府认证的高尔夫学校项目' },
      { title: '报名并获取材料', desc: '向认证学校提交申请，获取入学许可证和推荐信' },
      { title: '申请签证', desc: '备齐全部材料提交大使馆，通常5〜10个工作日内签发' },
      { title: '入境并参加项目', desc: '获签后前往泰国，参加项目的同时享受长期居留' },
    ],
    featuresTitle: '软实力签证的优势',
    features: [
      '无需提供常规自由职业收入证明——参加项目即可',
      '适合初学者',
      '由认证机构出具官方证明文件',
      '所需材料少，申请更便捷',
      '提供退款保证方案',
    ],
    golfTitle: '本服务提供的项目',
    golfName: '高尔夫学校 DTV',
    golfDesc: '在泰国政府认可的高尔夫学校参加课程。欢迎初学者。提供全额退款保证方案。',
    golfLink: '查看详情',
    otherTitle: '其他软实力对象项目',
    cta: '查看Golf DTV项目详情',
  },
}

const C = {
  bg: '#F5F8FA', bgSection: '#EDF1F5', bgCard: '#FFFFFF',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)', green: '#0A7A6A',
  tealDim: 'rgba(10,122,106,0.10)', tealDimmer: 'rgba(10,122,106,0.06)',
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function SoftPowerPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = (content as Record<string, typeof content.en>)[locale] ?? content.en

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ padding: '40px 0 32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: '1px solid rgba(10,122,106,0.2)', borderRadius: 100, padding: '3px 10px 3px 6px', marginBottom: 16 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.badge}</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 30, fontWeight: 700, color: C.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 15, fontWeight: 600, color: C.green, margin: '0 0 14px' }}>{c.subtitle}</p>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.75, margin: 0 }}>{c.intro}</p>
        </div>

        {/* Golf DTV featured card */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 10 }}>{c.golfTitle}</p>
          <Link href={`/${locale}/golf-dtv`} style={{
            display: 'block', textDecoration: 'none',
            background: C.bgCard, border: `1px solid rgba(10,122,106,0.3)`,
            borderRadius: 12, padding: 20, transition: 'border-color 0.15s, box-shadow 0.15s',
            boxShadow: '0 2px 12px rgba(26,36,53,0.08)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⛳</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 6px' }}>{c.golfName}</h3>
            <p style={{ fontSize: 13, color: C.sub, margin: '0 0 12px', lineHeight: 1.6 }}>{c.golfDesc}</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: C.green }}>
              {c.golfLink}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>
          </Link>
        </div>

        {/* Other programs note */}
        <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', marginBottom: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{c.otherTitle}</p>
          <p style={{ fontSize: 12, color: C.sub, lineHeight: 1.65, margin: 0 }}>{c.otherPrograms}</p>
        </div>

        {/* Steps */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 20 }}>{c.stepsTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {c.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  borderRadius: '50%', border: `2px solid ${C.green}`,
                  background: C.tealDim,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: C.green,
                }}>
                  {i + 1}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>{step.title}</p>
                  <p style={{ fontSize: 12, color: C.sub, margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>{c.featuresTitle}</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {c.features.map((feat, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ color: C.sub, lineHeight: 1.5 }}>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link href={`/${locale}/golf-dtv`} className="btn-richb-gold" style={{ padding: '13px 28px', fontSize: 13, fontFamily: 'inherit' }}>
            {c.cta}
          </Link>
        </div>

      </div>
    </div>
  )
}
