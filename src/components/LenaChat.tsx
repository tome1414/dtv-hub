'use client'

import { useState, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// ─── Types ───────────────────────────────────────────────────────────────────

type Lang = 'ja' | 'ko' | 'en' | string
type PageType = 'comparison' | 'guide' | 'process' | 'product_bridge' | 'lp' | 'other'
type ChoiceKey =
  | 'understand_dtv'
  | 'choose_route'
  | 'prepare_documents'
  | 'golf_fit'
  | 'after_apply'
  | 'talk_now'
type Step = 'idle' | 'greeting' | 'choice' | 'recommendation' | 'contact' | 'form'

interface Recommendation {
  slug: string
  labelJa: string
  labelKo: string
  labelEn: string
  descJa: string
  descKo: string
  descEn: string
}

// ─── Recommendations map ─────────────────────────────────────────────────────

const RECS: Record<ChoiceKey, Recommendation[]> = {
  understand_dtv: [
    {
      slug: 'dtv-digital-nomad-visa',
      labelJa: 'DTVとは？制度の全体像',
      labelKo: 'DTV란? 제도 전체 개요',
      labelEn: 'What is DTV? Full Overview',
      descJa: 'DTV制度を最初から把握したい方向け',
      descKo: 'DTV 제도를 처음부터 파악하고 싶은 분께',
      descEn: 'For those who want to understand DTV from scratch',
    },
    {
      slug: 'dtv-visa',
      labelJa: 'DTV完全ガイド',
      labelKo: 'DTV 완전 가이드',
      labelEn: 'DTV Complete Guide',
      descJa: '申請から滞在まで一気に整理したい方向け',
      descKo: '신청부터 체류까지 한눈에 정리하고 싶은 분께',
      descEn: 'Covers everything from application to stay',
    },
    {
      slug: 'dtv-soft-power-comparison',
      labelJa: 'ソフトパワー vs フリーランス比較',
      labelKo: '소프트파워 vs 프리랜서 비교',
      labelEn: 'Soft Power vs Freelance Comparison',
      descJa: '自分はどちらのルートか確認したい方向け',
      descKo: '어느 루트가 맞는지 확인하고 싶은 분께',
      descEn: 'Check which route fits your situation',
    },
  ],
  choose_route: [
    {
      slug: 'dtv-soft-power-vs-freelance',
      labelJa: 'ソフトパワーとフリーランス、どちらが合う？',
      labelKo: '소프트파워 vs 프리랜서, 어느 쪽이 맞을까?',
      labelEn: 'Soft Power or Freelance — Which Fits You?',
      descJa: '2つの申請根拠を比較・整理したい方向け',
      descKo: '두 신청 근거를 비교·정리하고 싶은 분께',
      descEn: 'Compare the two main application bases',
    },
    {
      slug: 'dtv-vs-retirement-visa',
      labelJa: 'DTV vs リタイアメントビザ',
      labelKo: 'DTV vs 은퇴 비자',
      labelEn: 'DTV vs Retirement Visa',
      descJa: '長期滞在の選択肢を比較したい方向け',
      descKo: '장기 체류 선택지를 비교하고 싶은 분께',
      descEn: 'Compare long-stay visa options',
    },
    {
      slug: 'who-should-choose-golf-dtv',
      labelJa: 'Golf DTVはどんな人に合う？',
      labelKo: 'Golf DTV는 어떤 사람에게 맞을까?',
      labelEn: 'Who Should Choose Golf DTV?',
      descJa: 'ゴルフ活動でのDTV適性を確認したい方向け',
      descKo: '골프 활동으로 DTV 적합성을 확인하고 싶은 분께',
      descEn: 'Check DTV suitability based on golf activities',
    },
  ],
  prepare_documents: [
    {
      slug: 'dtv-required-documents',
      labelJa: 'DTV必要書類リスト',
      labelKo: 'DTV 필요 서류 목록',
      labelEn: 'DTV Required Documents',
      descJa: '必要書類をまとめて確認したい方向け',
      descKo: '필요 서류를 한 번에 확인하고 싶은 분께',
      descEn: 'All documents you need in one place',
    },
    {
      slug: 'dtv-upload-documents',
      labelJa: 'e-Visaへの書類アップロード手順',
      labelKo: 'e-Visa 서류 업로드 방법',
      labelEn: 'How to Upload Documents for e-Visa',
      descJa: 'アップロード操作で迷っている方向け',
      descKo: '업로드 과정에서 막히는 분께',
      descEn: 'Step-by-step upload guide for e-Visa',
    },
    {
      slug: 'dtv-common-document-mistakes',
      labelJa: '書類ミスを防ぐチェックリスト',
      labelKo: '서류 실수 방지 체크리스트',
      labelEn: 'Document Mistake Prevention Checklist',
      descJa: '申請前に確認すべき落とし穴まとめ',
      descKo: '신청 전 확인해야 할 주요 실수 모음',
      descEn: 'Common pitfalls to check before applying',
    },
  ],
  golf_fit: [
    {
      slug: 'golf-dtv-suitability',
      labelJa: 'Golf DTV適性チェック',
      labelKo: 'Golf DTV 적합성 체크',
      labelEn: 'Golf DTV Suitability Check',
      descJa: '自分にGolf DTVが合うか確認したい方向け',
      descKo: '나에게 Golf DTV가 맞는지 확인하고 싶은 분께',
      descEn: 'Check if Golf DTV is right for you',
    },
    {
      slug: 'golf-dtv-overview',
      labelJa: 'Golf DTVとは？概要',
      labelKo: 'Golf DTV란? 개요',
      labelEn: 'What is Golf DTV? Overview',
      descJa: 'Golf DTVの仕組みを最初に確認したい方向け',
      descKo: 'Golf DTV 구조를 먼저 파악하고 싶은 분께',
      descEn: 'Understand how Golf DTV works',
    },
    {
      slug: 'golf-dtv-comparison',
      labelJa: 'Golf DTV vs 一般DTV比較',
      labelKo: 'Golf DTV vs 일반 DTV 비교',
      labelEn: 'Golf DTV vs Standard DTV',
      descJa: '2ルートの違いを比較して判断したい方向け',
      descKo: '두 루트의 차이를 비교해 판단하고 싶은 분께',
      descEn: 'Compare the two routes side by side',
    },
  ],
  after_apply: [
    {
      slug: 'dtv-application-timeline',
      labelJa: '審査・発給タイムライン',
      labelKo: '심사·발급 타임라인',
      labelEn: 'Application Timeline',
      descJa: '審査期間と進捗の見方を整理したい方向け',
      descKo: '심사 기간과 진행 상황 확인 방법 정리',
      descEn: 'Understand processing time and status',
    },
    {
      slug: 'dtv-entry-checks',
      labelJa: '入国時のチェックポイント',
      labelKo: '입국 시 체크포인트',
      labelEn: 'Entry Checks After Approval',
      descJa: '承認後、初回入国前に確認しておきたい方向け',
      descKo: '승인 후 첫 입국 전에 확인하고 싶은 분께',
      descEn: 'What to check before first entry',
    },
    {
      slug: 'dtv-extension-and-reentry',
      labelJa: '延長・再入国の手続き',
      labelKo: '연장·재입국 절차',
      labelEn: 'Extension and Re-entry',
      descJa: '滞在延長や一時出国後の手続きを確認したい方向け',
      descKo: '체류 연장 또는 일시 출국 후 절차 확인',
      descEn: 'Procedures for extending stay or re-entering',
    },
  ],
  talk_now: [],
}

// ─── Category map (chat choice → form category) ───────────────────────────────

const CHOICE_TO_CATEGORY: Record<ChoiceKey, string> = {
  understand_dtv: 'DTV申請のご相談',
  choose_route: 'DTV申請のご相談',
  prepare_documents: 'DTV申請のご相談',
  golf_fit: 'Golf DTV',
  after_apply: 'DTV申請のご相談',
  talk_now: 'DTV申請のご相談',
}

// ─── i18n texts ───────────────────────────────────────────────────────────────

type TextSet = {
  buttonLabelDesktop: string
  buttonLabelMobile: string
  headerTitle: string
  headerSub: string
  autoNotice: string
  greeting: (pageType: PageType, isMiki?: boolean) => string
  greetingNote: string
  choiceLabel: string
  choices: Record<ChoiceKey, string>
  recIntro: string
  stillUnresolved: string
  contactButton: string
  contactBridgeMsg: string
  contactDirectMsg: string
  closeLabel: string
  fallbackNote: string
  backLabel: string
  // form
  formTitle: string
  labelName: string
  placeholderName: string
  labelEmail: string
  labelNationality: string
  placeholderNationality: string
  labelCategory: string
  categoryOptions: { value: string; label: string }[]
  labelMessage: string
  placeholderMessage: string
  submit: string
  sending: string
  privacy: string
  requiredNote: string
  successTitle: string
  successBody: string
  successBackLabel: string
  errorMsg: string
  fieldRequired: string
  emailInvalid: string
}

const TEXTS: Record<string, TextSet> = {
  ja: {
    buttonLabelDesktop: '担当者へ相談',
    buttonLabelMobile: '担当者へ相談',
    headerTitle: 'Miki',
    headerSub: 'DTV Club案内',
    autoNotice: '※必要に応じて担当者へおつなぎします。',
    greeting: (pt, isMiki) => {
      return `こんにちは、案内役の${isMiki ? 'Miki' : 'Lena'}です。\n状況に合わせて、読むべき記事や相談先をご案内します。`
    },
    greetingNote: '気になる内容に近いものを選んでください。',
    choiceLabel: '気になる内容に近いものを選んでください。',
    choices: {
      understand_dtv: 'まずDTV制度の全体像を知りたい',
      choose_route: '自分に合うルートを知りたい',
      prepare_documents: '必要書類や申請手順を確認したい',
      golf_fit: 'Golf DTVが自分に合うか知りたい',
      after_apply: '申請後・承認後の不安を整理したい',
      talk_now: 'すぐ相談したい',
    },
    recIntro: 'こちらの記事が参考になりそうです。',
    stillUnresolved: 'まだ解決しない / 個別に相談したい',
    contactButton: '担当者に相談する',
    contactBridgeMsg: 'ここから先は個別事情によって変わる可能性があります。\n必要であれば、担当者にご相談いただけます。',
    contactDirectMsg: '担当者にご相談いただけます。',
    closeLabel: '閉じる',
    fallbackNote: '一部の論点は申請先・公館・時期・個別事情によって変わります。関連記事または個別問い合わせをご利用ください。',
    backLabel: '← 最初に戻る',
    formTitle: 'お問い合わせ内容を送る',
    labelName: 'お名前',
    placeholderName: '山田 太郎',
    labelEmail: 'メールアドレス',
    labelNationality: '国籍（任意）',
    placeholderNationality: '例：Japan',
    labelCategory: 'お問い合わせ種別',
    categoryOptions: [
      { value: 'DTV申請のご相談', label: 'DTV申請のご相談' },
      { value: 'Golf DTV', label: 'Golf DTVについて' },
      { value: '記事の内容について', label: '記事の内容について' },
      { value: 'その他', label: 'その他' },
    ],
    labelMessage: 'お問い合わせ内容',
    placeholderMessage: 'ご質問・ご相談内容をご記入ください。',
    submit: '送信する',
    sending: '送信中...',
    privacy: 'お預かりした個人情報は、お問い合わせへの対応以外の目的には使用しません。',
    requiredNote: '* は必須項目です',
    successTitle: 'お問い合わせを受け付けました',
    successBody: '1〜3営業日以内にメールにてご返信いたします。',
    successBackLabel: 'チャットに戻る',
    errorMsg: '送信に失敗しました。時間をおいて再度お試しください。',
    fieldRequired: '必須項目です',
    emailInvalid: '正しいメールアドレスを入力してください',
  },
  ko: {
    buttonLabelDesktop: 'Lena와 상담',
    buttonLabelMobile: 'Lena와 상담',
    headerTitle: 'Lena',
    headerSub: 'DTV Club 안내',
    autoNotice: '※필요하면 담당자에게 연결해 드립니다.',
    greeting: (pt, isMiki) => {
      return `안녕하세요, 안내 담당 ${isMiki ? 'Miki' : 'Lena'}입니다.\n상황에 맞게 읽을 기사나 상담 창구를 안내해 드립니다.`
    },
    greetingNote: '궁금한 내용과 가장 가까운 것을 선택해 주세요.',
    choiceLabel: '궁금한 내용과 가장 가까운 것을 선택해 주세요.',
    choices: {
      understand_dtv: 'DTV 제도의 전체 개요를 알고 싶다',
      choose_route: '나에게 맞는 루트를 알고 싶다',
      prepare_documents: '필요 서류나 신청 절차를 확인하고 싶다',
      golf_fit: 'Golf DTV가 나에게 맞는지 알고 싶다',
      after_apply: '신청 후·승인 후 불안을 정리하고 싶다',
      talk_now: '지금 바로 상담하고 싶다',
    },
    recIntro: '다음 기사가 도움이 될 것 같습니다.',
    stillUnresolved: '아직 해결되지 않았다 / 개별 상담을 원한다',
    contactButton: '담당자에게 상담하기',
    contactBridgeMsg: '이 이후로는 개별 상황에 따라 달라질 수 있습니다.\n필요하면 담당자에게 상담하실 수 있습니다.',
    contactDirectMsg: '담당자에게 상담하실 수 있습니다.',
    closeLabel: '닫기',
    fallbackNote: '일부 사항은 신청 공관·시기·개별 상황에 따라 다를 수 있습니다. 관련 기사 또는 개별 문의를 이용해 주세요.',
    backLabel: '← 처음으로 돌아가기',
    formTitle: '문의 내용 보내기',
    labelName: '이름',
    placeholderName: '홍길동',
    labelEmail: '이메일 주소',
    labelNationality: '국적 (선택)',
    placeholderNationality: '예: Japan',
    labelCategory: '문의 종류',
    categoryOptions: [
      { value: 'DTV申請のご相談', label: 'DTV 신청 상담' },
      { value: 'Golf DTV', label: 'Golf DTV 문의' },
      { value: '記事の内容について', label: '기사 내용에 대해' },
      { value: 'その他', label: '기타' },
    ],
    labelMessage: '문의 내용',
    placeholderMessage: '질문이나 상담 내용을 입력해 주세요.',
    submit: '전송하기',
    sending: '전송 중...',
    privacy: '수집된 개인정보는 문의 응대 목적으로만 사용됩니다.',
    requiredNote: '* 필수 항목',
    successTitle: '문의가 접수되었습니다',
    successBody: '1~3 영업일 이내에 이메일로 답변드리겠습니다.',
    successBackLabel: '채팅으로 돌아가기',
    errorMsg: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    fieldRequired: '필수 항목입니다',
    emailInvalid: '올바른 이메일 주소를 입력해 주세요',
  },
  en: {
    buttonLabelDesktop: 'Consult with Lena',
    buttonLabelMobile: 'Consult with Lena',
    headerTitle: 'Lena',
    headerSub: 'DTV Club Guide',
    autoNotice: '※I can connect you with our team if needed.',
    greeting: (pt, isMiki) => {
      return `Hi, I'm ${isMiki ? 'Miki' : 'Lena'}, your DTV Club guide.\nI'll help you find the right articles or consultation options based on your situation.`
    },
    greetingNote: 'Choose the option that best matches your question.',
    choiceLabel: 'Choose the option that best matches your question.',
    choices: {
      understand_dtv: 'I want to understand the DTV system overall',
      choose_route: 'I want to know which route suits me',
      prepare_documents: 'I want to check required documents or steps',
      golf_fit: 'I want to know if Golf DTV fits me',
      after_apply: 'I want to sort out concerns after applying',
      talk_now: 'I want to consult right now',
    },
    recIntro: 'These articles should help.',
    stillUnresolved: 'Still unresolved / I want individual advice',
    contactButton: 'Contact a consultant',
    contactBridgeMsg: "Beyond this point, answers depend on your individual circumstances.\nYou can consult with our team if needed.",
    contactDirectMsg: 'You can consult with our team.',
    closeLabel: 'Close',
    fallbackNote: 'Some details vary depending on the consulate, timing, and individual circumstances. Please refer to related articles or contact us directly.',
    backLabel: '← Back to start',
    formTitle: 'Send an inquiry',
    labelName: 'Your Name',
    placeholderName: 'John Smith',
    labelEmail: 'Email Address',
    labelNationality: 'Nationality (optional)',
    placeholderNationality: 'e.g. Japan',
    labelCategory: 'Inquiry Type',
    categoryOptions: [
      { value: 'DTV申請のご相談', label: 'DTV Application' },
      { value: 'Golf DTV', label: 'Golf DTV' },
      { value: '記事の内容について', label: 'About an Article' },
      { value: 'その他', label: 'Other' },
    ],
    labelMessage: 'Message',
    placeholderMessage: 'Please describe your question or inquiry.',
    submit: 'Send Message',
    sending: 'Sending...',
    privacy: 'Your personal information will only be used to respond to your inquiry.',
    requiredNote: '* Required fields',
    successTitle: 'Message Received',
    successBody: "We'll reply to your email within 1–3 business days.",
    successBackLabel: 'Back to chat',
    errorMsg: 'Failed to send. Please try again later.',
    fieldRequired: 'This field is required',
    emailInvalid: 'Please enter a valid email address',
  },
}

function getTexts(lang: Lang): TextSet {
  return TEXTS[lang] ?? TEXTS['en']
}

// ─── Page type detection ──────────────────────────────────────────────────────

function detectPageType(pathname: string): PageType {
  const p = pathname.toLowerCase()
  if (p.includes('/golf-dtv') && !p.includes('/blog/')) return 'lp'
  if (p.includes('/blog/golf-dtv')) return 'product_bridge'
  if (p.includes('/blog/who-should-choose-golf-dtv')) return 'product_bridge'
  if (p.includes('comparison') || p.includes('vs-') || p.includes('-vs-') || p.includes('soft-power-comparison')) return 'comparison'
  if (
    p.includes('/dtv-application') ||
    p.includes('/soft-power') ||
    p.includes('/requirements') ||
    (p.includes('/blog/') && (
      p.includes('documents') || p.includes('upload') || p.includes('application') ||
      p.includes('income') || p.includes('bank') || p.includes('interview') || p.includes('acceptance')
    ))
  ) return 'process'
  if (p.includes('/blog/')) return 'guide'
  if (p.includes('/who-should-choose') || p.includes('/golf-dtv/') || p.includes('/dtv-soft-power-vs')) return 'lp'
  return 'other'
}

// ─── dataLayer helper ─────────────────────────────────────────────────────────
// Global Window.dataLayer type is declared in src/lib/analytics.ts

function pushEvent(event: string, params: Record<string, string | undefined>) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, chat_persona: 'lena', ...params })
  }
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputStyle = (hasError?: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '9px 11px',
  borderRadius: '8px',
  border: `1px solid ${hasError ? '#f87171' : 'rgba(26,36,53,0.14)'}`,
  background: '#fff',
  fontSize: '13px',
  color: '#1A2435',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
})

// ─── Avatar Icons ────────────────────────────────────────────────────────────

function LenaIcon({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/lena_avatar_icon_simple_transparent.png"
      alt="Lena"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      aria-hidden="true"
    />
  )
}

function MikiIcon({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/miki_avatar_icon_simple_transparent.png"
      alt="Miki"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      aria-hidden="true"
    />
  )
}

// ─── Auto-notice badge ────────────────────────────────────────────────────────

function AutoNoticeBadge({ text }: { text: string }) {
  return (
    <div style={{ background: '#EDF1F5', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', color: '#4A5A6E', lineHeight: 1.5 }}>
      {text}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LenaChat({ lang }: { lang: string }) {
  // Avatar bubble component (defined here to access IconComponent)
  const AvatarBubble = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, marginTop: '2px' }}><IconComponent size={24} /></div>
      <div style={{ background: '#F5F8FA', borderRadius: '0 12px 12px 12px', padding: '10px 12px', fontSize: '13.5px', color: '#1A2435', lineHeight: 1.6, flex: 1 }}>
        {children}
      </div>
    </div>
  )
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('greeting')
  const [choice, setChoice] = useState<ChoiceKey | null>(null)
  const [opened, setOpened] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  // form state
  const [formData, setFormData] = useState({ name: '', email: '', nationality: '', category: '', message: '' })
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const t = getTexts(lang)
  const pageType = detectPageType(pathname)
  const isMiki = lang === 'ja'
  const IconComponent = isMiki ? MikiIcon : LenaIcon
  const headerName = isMiki ? 'Miki' : 'Lena'

  const shouldHide = pathname.includes('/contact') || pathname === `/${lang}/golf-dtv`

  // Track window size for responsive button label
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    }
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const openChat = useCallback(() => {
    setOpen(true)
    setStep('greeting')
    setChoice(null)
    const isReopen = opened
    pushEvent(isReopen ? 'chat_reopen' : 'chat_open', { page_type: pageType, page_path: pathname, lang })
    pushEvent('chat_persona_view', { page_type: pageType, page_path: pathname, lang })
    if (!opened) setOpened(true)
  }, [opened, pageType, pathname, lang])

  const closeChat = useCallback(() => {
    pushEvent('chat_close', { step, choice_key: choice ?? undefined, page_type: pageType, page_path: pathname, lang })
    setOpen(false)
  }, [step, choice, pageType, pathname, lang])

  const handleChoice = useCallback((key: ChoiceKey) => {
    setChoice(key)
    pushEvent('chat_first_choice', { choice_key: key, page_type: pageType, page_path: pathname, lang })
    if (key === 'talk_now') {
      setStep('contact')
    } else {
      const recs = RECS[key]
      pushEvent('chat_recommendation_view', { choice_key: key, recommended_ids: recs.map(r => r.slug).join(','), lang })
      setStep('recommendation')
    }
  }, [pageType, pathname, lang])

  const handleRecClick = useCallback((slug: string) => {
    pushEvent('chat_link_click', { destination_type: 'article', destination_url: `/${lang}/blog/${slug}`, choice_key: choice ?? undefined, lang })
  }, [lang, choice])

  // open inline form, pre-fill category from chat choice
  const openForm = useCallback(() => {
    const preCategory = choice ? CHOICE_TO_CATEGORY[choice] : ''
    setFormData({ name: '', email: '', nationality: '', category: preCategory, message: '' })
    setFormErrors({})
    setFormStatus('idle')
    setStep('form')
    pushEvent('chat_contact_click', { choice_key: choice ?? undefined, page_type: pageType, page_path: pathname, lang })
  }, [choice, pageType, pathname, lang])

  const validateForm = () => {
    const e: Partial<typeof formData> = {}
    if (!formData.name.trim()) e.name = t.fieldRequired
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = t.emailInvalid
    if (!formData.message.trim()) e.message = t.fieldRequired
    return e
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateForm()
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }
    setFormErrors({})
    setFormStatus('sending')

    // append chat metadata to message
    const meta = [
      `---`,
      `[Lenaチャット経由]`,
      `ページ: ${pathname}`,
      choice ? `選択内容: ${t.choices[choice]}` : null,
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('/api/general-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, message: formData.message + '\n\n' + meta }),
      })
      if (!res.ok) throw new Error('Failed')
      setFormStatus('success')
      pushEvent('chat_contact_submit', { choice_key: choice ?? undefined, page_type: pageType, page_path: pathname, lang })
    } catch {
      setFormStatus('error')
    }
  }

  const getRecLabel = (rec: Recommendation) => lang === 'ko' ? rec.labelKo : lang === 'ja' ? rec.labelJa : rec.labelEn
  const getRecDesc  = (rec: Recommendation) => lang === 'ko' ? rec.descKo  : lang === 'ja' ? rec.descJa  : rec.descEn

  // ── Render ─────────────────────────────────────────────────────────────────

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    zIndex: 9999,
    width: 'min(380px, calc(100vw - 32px))',
    maxHeight: 'min(560px, calc(100vh - 120px))',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
    overflow: 'hidden',
    fontFamily: 'inherit',
  }

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #0D9280 0%, #0A7A6A 100%)',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  }

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const closeBtnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.18)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    padding: '6px 8px',
    fontSize: '13px',
    lineHeight: 1,
    flexShrink: 0,
  }

  const choiceBtnStyle = (highlight = false): React.CSSProperties => ({
    textAlign: 'left',
    background: highlight ? '#FFF8EC' : '#F5F8FA',
    border: `1px solid ${highlight ? 'rgba(201,160,48,0.35)' : 'rgba(26,36,53,0.10)'}`,
    borderRadius: '10px',
    padding: '9px 12px',
    fontSize: '13px',
    color: highlight ? '#8A6010' : '#1A2435',
    cursor: 'pointer',
    lineHeight: 1.4,
    width: '100%',
  })

  const recLinkStyle: React.CSSProperties = {
    display: 'block',
    background: '#fff',
    border: '1px solid rgba(26,36,53,0.12)',
    borderRadius: '10px',
    padding: '10px 12px',
    textDecoration: 'none',
    color: 'inherit',
  }

  const ctaBtnStyle: React.CSSProperties = {
    display: 'block',
    background: 'linear-gradient(135deg, #0D9280 0%, #0A7A6A 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 700,
    textAlign: 'center',
    boxShadow: '0 3px 12px rgba(10,122,106,0.35)',
    cursor: 'pointer',
    width: '100%',
  }

  const backBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    fontSize: '12px',
    color: '#7E8EA4',
    cursor: 'pointer',
    textAlign: 'left',
    padding: '0',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#1A2435',
    marginBottom: '4px',
  }

  if (shouldHide) return null

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={openChat}
          aria-label={isDesktop ? t.buttonLabelDesktop : t.buttonLabelMobile}
          style={{
            position: 'fixed', bottom: '80px', right: '20px', zIndex: 9999,
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#0A7A6A', color: '#fff', border: 'none',
            borderRadius: '28px', padding: '10px 16px 10px 12px',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(10,122,106,0.40)',
            fontSize: '14px', fontWeight: 600, lineHeight: 1,
          }}
        >
          <IconComponent size={26} />
          <span>{isDesktop ? t.buttonLabelDesktop : t.buttonLabelMobile}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div role="dialog" aria-label={`${headerName} - ${t.headerSub}`} aria-modal="false" style={panelStyle}>

          {/* Header */}
          <div style={headerStyle}>
            <IconComponent size={36} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>{headerName}</div>
              <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: '11px', marginTop: '2px' }}>{t.headerSub}</div>
            </div>
            <button onClick={closeChat} aria-label={t.closeLabel} style={closeBtnStyle}>✕</button>
          </div>

          {/* Body */}
          <div style={bodyStyle}>

            {/* ── GREETING / CHOICE step ── */}
            {(step === 'greeting' || step === 'choice') && (
              <>
                <AvatarBubble><span style={{ whiteSpace: 'pre-line' }}>{t.greeting(pageType, isMiki)}</span></AvatarBubble>
                <AutoNoticeBadge text={t.autoNotice} />
                <p style={{ fontSize: '13px', color: '#4A5A6E', margin: 0 }}>{t.greetingNote}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {(Object.keys(t.choices) as ChoiceKey[]).map(key => (
                    <button key={key} onClick={() => handleChoice(key)} style={choiceBtnStyle(key === 'talk_now')}>
                      {t.choices[key]}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ── RECOMMENDATION step ── */}
            {step === 'recommendation' && choice && (
              <>
                <AutoNoticeBadge text={t.autoNotice} />
                {(choice === 'after_apply' || choice === 'golf_fit') && (
                  <div style={{ background: '#FFF8EC', border: '1px solid rgba(201,160,48,0.30)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', color: '#8A6010', lineHeight: 1.5 }}>
                    {t.fallbackNote}
                  </div>
                )}
                <AvatarBubble>{t.recIntro}</AvatarBubble>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {RECS[choice].map(rec => (
                    <a key={rec.slug} href={`/${lang}/blog/${rec.slug}`} onClick={() => handleRecClick(rec.slug)} style={recLinkStyle}>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0A7A6A', lineHeight: 1.3 }}>{getRecLabel(rec)}</div>
                      <div style={{ fontSize: '12px', color: '#7E8EA4', marginTop: '3px', lineHeight: 1.4 }}>{getRecDesc(rec)}</div>
                    </a>
                  ))}
                </div>
                <button onClick={openForm} style={choiceBtnStyle()}>{t.stillUnresolved}</button>
                <button onClick={() => { setStep('greeting'); setChoice(null) }} style={backBtnStyle}>{t.backLabel}</button>
              </>
            )}

            {/* ── CONTACT step ── */}
            {step === 'contact' && (
              <>
                <AutoNoticeBadge text={t.autoNotice} />
                <AvatarBubble><span style={{ whiteSpace: 'pre-line' }}>{choice ? t.contactBridgeMsg : t.contactDirectMsg}</span></AvatarBubble>
                <button onClick={openForm} style={ctaBtnStyle}>{t.contactButton}</button>
                <button
                  onClick={() => choice ? setStep('recommendation') : (setStep('greeting'), setChoice(null))}
                  style={backBtnStyle}
                >{t.backLabel}</button>
              </>
            )}

            {/* ── FORM step ── */}
            {step === 'form' && (
              <>
                {/* Success */}
                {formStatus === 'success' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '8px 0', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(10,122,106,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0A7A6A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A2435' }}>{t.successTitle}</div>
                      <div style={{ fontSize: '13px', color: '#4A5A6E', marginTop: '6px', lineHeight: 1.6 }}>{t.successBody}</div>
                    </div>
                    <button
                      onClick={() => { setStep(choice ? 'recommendation' : 'greeting'); setFormStatus('idle') }}
                      style={{ ...backBtnStyle, fontSize: '13px', color: '#0A7A6A', fontWeight: 600 }}
                    >{t.successBackLabel}</button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A2435' }}>{t.formTitle}</div>
                    <p style={{ fontSize: '11px', color: '#7E8EA4', margin: 0 }}>{t.requiredNote}</p>

                    {/* Error banner */}
                    {formStatus === 'error' && (
                      <div style={{ background: '#FEF2F2', border: '1px solid rgba(248,113,113,0.4)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', color: '#b91c1c' }}>
                        {t.errorMsg}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label style={labelStyle}>{t.labelName} <span style={{ color: '#0A7A6A' }}>*</span></label>
                      <input
                        type="text" value={formData.name} placeholder={t.placeholderName}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        style={inputStyle(!!formErrors.name)} autoComplete="name"
                      />
                      {formErrors.name && <p style={{ fontSize: '11px', color: '#f87171', margin: '3px 0 0' }}>{formErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>{t.labelEmail} <span style={{ color: '#0A7A6A' }}>*</span></label>
                      <input
                        type="email" value={formData.email} placeholder="your@email.com"
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        style={inputStyle(!!formErrors.email)} autoComplete="email"
                      />
                      {formErrors.email && <p style={{ fontSize: '11px', color: '#f87171', margin: '3px 0 0' }}>{formErrors.email}</p>}
                    </div>

                    {/* Nationality */}
                    <div>
                      <label style={labelStyle}>{t.labelNationality}</label>
                      <input
                        type="text" value={formData.nationality} placeholder={t.placeholderNationality}
                        onChange={e => setFormData(p => ({ ...p, nationality: e.target.value }))}
                        style={inputStyle()}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label style={labelStyle}>{t.labelCategory}</label>
                      <select
                        value={formData.category}
                        onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                        style={{ ...inputStyle(), appearance: 'auto' as React.CSSProperties['appearance'], cursor: 'pointer' }}
                      >
                        <option value="">{lang === 'ja' ? '選択してください' : lang === 'ko' ? '선택해 주세요' : 'Select'}</option>
                        {t.categoryOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={labelStyle}>{t.labelMessage} <span style={{ color: '#0A7A6A' }}>*</span></label>
                      <textarea
                        value={formData.message} placeholder={t.placeholderMessage} rows={4}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle(!!formErrors.message), resize: 'vertical', lineHeight: 1.5 }}
                      />
                      {formErrors.message && <p style={{ fontSize: '11px', color: '#f87171', margin: '3px 0 0' }}>{formErrors.message}</p>}
                    </div>

                    <p style={{ fontSize: '11px', color: '#7E8EA4', lineHeight: 1.5, margin: 0 }}>{t.privacy}</p>

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      style={{ ...ctaBtnStyle, opacity: formStatus === 'sending' ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'lena-spin 0.8s linear infinite' }}>
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
                            <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
                          </svg>
                          {t.sending}
                        </>
                      ) : t.submit}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(choice ? 'contact' : 'greeting')}
                      style={backBtnStyle}
                    >{t.backLabel}</button>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      )}

      {/* Spinner keyframe */}
      <style>{`@keyframes lena-spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
