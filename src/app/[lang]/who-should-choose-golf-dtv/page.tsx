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
    title: isJa ? 'ゴルフDTVは自分に向いている？適性チェック' : 'Is Golf DTV Right for You? Suitability Check',
    description: isJa
      ? 'ゴルフDTVプログラムが向いている人・向いていない人を解説。タイ長期滞在ビザ（DTV）をゴルフで取得する方法を確認できます。'
      : 'Find out if the Golf DTV program is right for you. Learn who benefits most from obtaining a DTV visa through golf.',
  }
}

const content = {
  ja: {
    badge: 'タイ政府認定プログラム',
    title: 'ゴルフDTVは自分に向いている？',
    subtitle: '5つのチェックで1分で分かる適性確認',
    intro: 'ゴルフDTVは、タイ政府が認定するゴルフスクールプログラムを受講することで、DTVビザ（長期滞在ビザ）を取得できるサービスです。フリーランス証明なしでも申請できるため、会社員・主婦・退職者など幅広い方が利用しています。',
    suitableTitle: 'こんな方に向いています',
    suitable: [
      'タイへの長期滞在（3ヶ月以上）を検討している',
      'フリーランス証明書類の用意が難しい（会社員・主婦など）',
      'ゴルフ経験があるか、ゴルフに興味がある',
      'スムーズなビザ取得を重視する（書類不備リスクを減らしたい）',
      '定年退職後の海外生活を考えている',
      '資産運用・節税を目的としたタイ居住を検討している',
    ],
    unsuitableTitle: 'こんな方には向いていないかもしれません',
    unsuitable: [
      'ゴルフに全く興味がなく、プログラム参加自体を避けたい',
      '短期滞在（1〜2ヶ月程度）のみ予定している',
      'リモートワーク証明書類が揃っており、フリーランスルートで申請できる',
    ],
    program: {
      title: 'ゴルフDTVプログラムの概要',
      items: [
        { label: '場所', value: 'タイ・バンコク近郊のゴルフコース' },
        { label: 'レベル', value: '初心者〜経験者まで対応' },
        { label: '書類', value: '入学許可書・推薦状を発行' },
        { label: '保証', value: '全額返金保証プランあり' },
        { label: '実績', value: '多数のDTV取得サポート実績' },
      ],
    },
    faq: [
      { q: 'ゴルフが初心者でも大丈夫？', a: '問題ありません。プログラムは初心者向けカリキュラムも用意されており、ゴルフの腕前はビザ審査に影響しません。' },
      { q: 'プログラム後はタイに滞在し続けられる？', a: 'DTV取得後は5年間有効で、1回の入国につき最大180日まで滞在できます。プログラム終了後も継続して滞在可能です。' },
      { q: '日本語でサポートは受けられる？', a: '日本語でのビザ申請書類サポート・相談窓口が用意されています。まずは無料相談をご利用ください。' },
    ],
    ctaPrimary: '無料相談する',
    ctaSecondary: '申請の流れを見る',
  },
  en: {
    badge: 'Thai Government Certified Program',
    title: 'Is Golf DTV Right for You?',
    subtitle: 'Find out in 1 minute with 5 quick checks',
    intro: 'Golf DTV is a service that helps you obtain a DTV (long-stay visa) by enrolling in a Thai government-certified golf school program. No freelance documentation required — it\'s popular with employees, retirees, and anyone seeking a smooth visa process.',
    suitableTitle: 'Golf DTV is a great fit if you…',
    suitable: [
      'Are planning a long stay in Thailand (3+ months)',
      'Have difficulty proving freelance income (employed, homemaker, etc.)',
      'Play golf or are open to learning',
      'Want a smooth, low-risk visa application process',
      'Are considering retirement or semi-retirement in Thailand',
      'Are exploring asset management or tax residency in Thailand',
    ],
    unsuitableTitle: 'Golf DTV may not be the best fit if you…',
    unsuitable: [
      'Have no interest in golf and want to avoid any program participation',
      'Only plan to stay for 1–2 months',
      'Already have remote work documentation and can use the freelance route',
    ],
    program: {
      title: 'Golf DTV Program Overview',
      items: [
        { label: 'Location', value: 'Golf courses near Bangkok, Thailand' },
        { label: 'Level', value: 'Beginner to experienced — all welcome' },
        { label: 'Documents', value: 'Acceptance letter and recommendation issued' },
        { label: 'Guarantee', value: 'Money-back guarantee plan available' },
        { label: 'Track record', value: 'Many successful DTV applications supported' },
      ],
    },
    faq: [
      { q: 'Do I need golf experience?', a: 'No experience needed. The program has beginner-friendly courses, and your skill level has no impact on the visa application.' },
      { q: 'Can I keep staying in Thailand after the program?', a: 'Yes. The DTV is valid for 5 years, allowing stays of up to 180 days per entry. You can continue staying after the program ends.' },
      { q: 'Is English support available?', a: 'Yes, English-language support for visa documents and consultation is available. Start with a free consultation.' },
    ],
    ctaPrimary: 'Get a Free Consultation',
    ctaSecondary: 'View Application Process',
  },
  ko: {
    badge: '태국 정부 인정 프로그램',
    title: '골프DTV는 나에게 맞을까?',
    subtitle: '5가지 체크로 1분 만에 알 수 있는 적합성 확인',
    intro: '골프DTV는 태국 정부 인정 골프스쿨 프로그램을 수강함으로써 DTV 비자(장기 체류 비자)를 취득할 수 있는 서비스입니다. 프리랜서 증명 없이도 신청 가능하여 직장인, 주부, 은퇴자 등 다양한 분들이 이용하고 있습니다.',
    suitableTitle: '이런 분께 적합합니다',
    suitable: [
      '태국 장기 체류(3개월 이상)를 검토 중인 분',
      '프리랜서 증명 서류 준비가 어려운 분',
      '골프 경험이 있거나 관심 있는 분',
      '원활한 비자 취득을 원하는 분',
    ],
    unsuitableTitle: '이런 분께는 맞지 않을 수 있습니다',
    unsuitable: [
      '골프에 전혀 관심 없어 프로그램 참가를 피하고 싶은 분',
      '단기 체류(1~2개월)만 예정인 분',
      '리모트 근무 증명 서류가 있어 프리랜서 루트로 신청 가능한 분',
    ],
    program: {
      title: '골프DTV 프로그램 개요',
      items: [
        { label: '장소', value: '태국 방콕 근교 골프 코스' },
        { label: '레벨', value: '초보자~경험자 대응' },
        { label: '서류', value: '입학 허가서·추천서 발행' },
        { label: '보증', value: '전액 환불 보증 플랜 있음' },
        { label: '실적', value: '다수 DTV 취득 지원 실적' },
      ],
    },
    faq: [
      { q: '골프 초보자도 괜찮나요?', a: '문제없습니다. 초보자용 커리큘럼도 있으며, 골프 실력은 비자 심사에 영향을 미치지 않습니다.' },
      { q: '프로그램 후에도 태국에 계속 체류할 수 있나요?', a: 'DTV 취득 후 5년간 유효하며, 1회 입국 시 최대 180일 체류 가능합니다.' },
      { q: '한국어 지원이 가능한가요?', a: '한국어 지원도 가능합니다. 먼저 무료 상담을 이용해 주세요.' },
    ],
    ctaPrimary: '무료 상담하기',
    ctaSecondary: '신청 절차 보기',
  },
  ru: {
    badge: 'Программа, сертифицированная правительством Таиланда',
    title: 'Подходит ли вам Golf DTV?',
    subtitle: 'Узнайте за 1 минуту с 5 быстрыми проверками',
    intro: 'Golf DTV — сервис, который помогает получить визу DTV (долгосрочную визу), записавшись в сертифицированную правительством Таиланда программу школы гольфа. Документы о фрилансе не требуются — программа популярна среди наёмных работников, пенсионеров и всех, кто хочет упростить получение визы.',
    suitableTitle: 'Golf DTV — отличный выбор, если вы…',
    suitable: [
      'Планируете длительное пребывание в Таиланде (3+ месяца)',
      'Испытываете трудности с подтверждением дохода фриланса (наёмные работники, домохозяйки и т.д.)',
      'Играете в гольф или готовы научиться',
      'Хотите простой и безопасный процесс получения визы',
      'Рассматриваете выход на пенсию или полупенсию в Таиланде',
      'Изучаете управление активами или налоговое резидентство в Таиланде',
    ],
    unsuitableTitle: 'Golf DTV может не подойти, если вы…',
    unsuitable: [
      'Не интересуетесь гольфом и хотите избежать участия в программе',
      'Планируете только короткое пребывание на 1–2 месяца',
      'Уже имеете документацию для удалённой работы и можете воспользоваться маршрутом фриланса',
    ],
    program: {
      title: 'Обзор программы Golf DTV',
      items: [
        { label: 'Место', value: 'Поля для гольфа у Бангкока, Таиланд' },
        { label: 'Уровень', value: 'Для всех — от новичков до опытных' },
        { label: 'Документы', value: 'Письмо о зачислении и рекомендация' },
        { label: 'Гарантия', value: 'Доступен план с гарантией возврата денег' },
        { label: 'Опыт', value: 'Многочисленные успешные заявки на DTV' },
      ],
    },
    faq: [
      { q: 'Нужен ли опыт в гольфе?', a: 'Нет. В программе есть курсы для начинающих, а уровень игры не влияет на рассмотрение визы.' },
      { q: 'Можно ли остаться в Таиланде после программы?', a: 'Да. Виза DTV действительна 5 лет и позволяет находиться до 180 дней за один въезд. После окончания программы можно продолжать пребывание.' },
      { q: 'Доступна ли поддержка на русском языке?', a: 'Да, поддержка и консультации доступны. Начните с бесплатной консультации.' },
    ],
    ctaPrimary: 'Бесплатная консультация',
    ctaSecondary: 'Процесс подачи заявки',
  },
}

const C = {
  bg: '#F5F8FA', bgSection: '#EDF1F5', bgCard: '#FFFFFF',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)', borderMd: 'rgba(26,36,53,0.16)',
  green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.10)',
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function WhoShouldChooseGolfDtvPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = (content as Record<string, typeof content.en>)[locale] ?? content.en

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ padding: '40px 0 32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: '1px solid rgba(10,122,106,0.2)', borderRadius: 100, padding: '3px 10px 3px 6px', marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, background: C.green, borderRadius: '50%' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c.badge}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 30, fontWeight: 700, color: C.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 15, fontWeight: 600, color: C.green, margin: '0 0 12px' }}>{c.subtitle}</p>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.75, margin: 0 }}>{c.intro}</p>
        </div>

        {/* Suitable / Unsuitable */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.green}`, borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 16 }}>{c.suitableTitle}</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.suitable.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ color: C.sub, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 16 }}>{c.unsuitableTitle}</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.unsuitable.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span style={{ color: C.muted, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Program overview */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 18 }}>{c.program.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {c.program.items.map((item, i) => (
              <div key={i} style={{ background: C.bgSection, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {c.faq.map((item, i) => (
            <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', boxShadow: '0 1px 4px rgba(26,36,53,0.06)' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>Q. {item.q}</p>
              <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.7, margin: 0 }}>A. {item.a}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link href={`/${locale}/golf-dtv#inquiry`} className="btn-richb-primary" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            {c.ctaPrimary}
          </Link>
          <Link href={`/${locale}/dtv-application`} className="btn-richb-sub" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            {c.ctaSecondary}
          </Link>
        </div>

      </div>
    </div>
  )
}
