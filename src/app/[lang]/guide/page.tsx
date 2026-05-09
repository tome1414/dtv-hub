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
  const isKo = lang === 'ko'
  return {
    title: isJa
      ? 'DTV申請ガイド一覧 | DTV Club'
      : isKo
      ? 'DTV 신청 가이드 | DTV Club'
      : 'DTV Application Guides | DTV Club',
    description: isJa
      ? 'タイe-VisaのDTV申請に関するガイドをまとめました。フォーム入力方法・必要書類・よくある質問など。'
      : 'Guides for the Thailand DTV application: form walkthrough, required documents, FAQ, and more.',
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const C = {
  bg: '#F5F8FA', bgCard: '#FFFFFF', bgSection: '#EDF1F5',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)',
  green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.08)', tealMid: 'rgba(10,122,106,0.18)',
}

export default async function GuidePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const isJa = locale === 'ja'
  const isKo = locale === 'ko'

  const guides = isJa ? [
    {
      emoji: '📋',
      title: 'e-Visaフォーム入力ガイド',
      desc: 'thaievisa.go.thの申請フォームを全項目・画面ごとに解説。入力例と注意点付き。',
      href: '/guide/evisa-form',
      badge: '詳細解説',
    },
    {
      emoji: '📄',
      title: '必要書類チェックリスト',
      desc: 'DTV申請に必要な書類の全リストと準備のポイント。ルート別にまとめています。',
      href: '/requirements',
      badge: 'チェックリスト',
    },
    {
      emoji: '🏛️',
      title: '大使館・申請窓口',
      desc: '日本各地のタイ大使館・総領事館の管轄エリアと基本情報。',
      href: '/embassy',
      badge: '大使館情報',
    },
    {
      emoji: '❓',
      title: 'よくある質問（FAQ）',
      desc: '健康保険・残高証明・インタビュー・家族同伴など、よく寄せられる質問への回答。',
      href: '/guide/faq',
      badge: 'FAQ',
    },
  ] : isKo ? [
    {
      emoji: '📋',
      title: 'e-비자 폼 작성 가이드',
      desc: 'thaievisa.go.th 신청 양식의 모든 항목을 화면별로 설명합니다.',
      href: '/guide/evisa-form',
      badge: '상세 해설',
    },
    {
      emoji: '📄',
      title: '필요 서류 체크리스트',
      desc: 'DTV 신청에 필요한 서류 목록과 준비 포인트.',
      href: '/requirements',
      badge: '체크리스트',
    },
    {
      emoji: '🏛️',
      title: '대사관 신청 창구',
      desc: '태국 대사관 및 총영사관 정보.',
      href: '/embassy',
      badge: '대사관 정보',
    },
    {
      emoji: '❓',
      title: '자주 묻는 질문 (FAQ)',
      desc: '건강보험·잔고 증명·인터뷰·가족 동반 등 자주 묻는 질문.',
      href: '/guide/faq',
      badge: 'FAQ',
    },
  ] : [
    {
      emoji: '📋',
      title: 'e-Visa Form Walkthrough',
      desc: 'Step-by-step guide to every field in the thaievisa.go.th DTV application form.',
      href: '/guide/evisa-form',
      badge: 'Detailed Guide',
    },
    {
      emoji: '📄',
      title: 'Required Documents Checklist',
      desc: 'Complete list of documents required for a DTV application, organized by route.',
      href: '/requirements',
      badge: 'Checklist',
    },
    {
      emoji: '🏛️',
      title: 'Embassy & Application Offices',
      desc: 'Thai embassy and consulate information for applications from Japan.',
      href: '/embassy',
      badge: 'Embassy Info',
    },
    {
      emoji: '❓',
      title: 'Frequently Asked Questions',
      desc: 'Common questions about insurance, bank balance, interviews, and family applications.',
      href: '/guide/faq',
      badge: 'FAQ',
    },
  ]

  const heading = isJa ? 'DTV申請ガイド' : isKo ? 'DTV 신청 가이드' : 'DTV Application Guides'
  const subheading = isJa
    ? 'タイDTV（Destination Thailand Visa）の申請手続きを、ステップごとにサポートするガイドです。'
    : isKo
    ? '태국 DTV 신청 절차를 단계별로 지원하는 가이드입니다.'
    : 'Step-by-step guides to help you through the Thailand DTV application process.'

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 96 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 1.25rem' }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 100, padding: '3px 12px 3px 8px', marginBottom: 14 }}>
            <span style={{ fontSize: 15 }}>📚</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Guide</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28, fontWeight: 700, color: C.text, margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            {heading}
          </h1>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, margin: 0, maxWidth: 600 }}>{subheading}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, marginBottom: 48 }}>
          {guides.map((g) => (
            <Link key={g.href} href={`/${locale}${g.href}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px 22px',
                transition: 'box-shadow 0.2s, border-color 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(10,122,106,0.10)'; (e.currentTarget as HTMLElement).style.borderColor = C.tealMid }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = C.border }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{g.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>{g.title}</h2>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.green, background: C.tealDim, border: `1px solid ${C.tealMid}`, padding: '1px 7px', borderRadius: 100, flexShrink: 0 }}>
                        {g.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: C.sub, margin: 0, lineHeight: 1.65 }}>{g.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ background: C.bgSection, borderRadius: 12, padding: '20px 22px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 10px' }}>
            {isJa ? '申請相談' : isKo ? '신청 상담' : 'Application Support'}
          </p>
          <p style={{ fontSize: 13, color: C.sub, margin: '0 0 14px', lineHeight: 1.7 }}>
            {isJa
              ? '申請書類の確認やルート選択について相談を承っています。'
              : isKo
              ? '신청 서류 확인 및 루트 선택에 대한 상담을 받고 있습니다.'
              : 'We offer consultation on document preparation and route selection for DTV applications.'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-richb-primary" style={{ padding: '10px 22px', fontSize: 13, fontFamily: 'inherit' }}>
            {isJa ? '無料相談する' : isKo ? '무료 상담하기' : 'Free Consultation'}
          </Link>
        </div>
      </div>
    </div>
  )
}
