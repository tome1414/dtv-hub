'use client'

import { useState, use } from 'react'
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// ── Countries list ────────────────────────────────────────────────────
const COUNTRIES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde',
  'Cameroon','Central African Republic','Chad','Comoros','Congo','DR Congo',
  'Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia',
  'Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Ivory Coast','Kenya',
  'Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania',
  'Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda',
  'São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia',
  'South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda',
  'Zambia','Zimbabwe',
  'Antigua and Barbuda','Argentina','Bahamas','Barbados','Belize','Bolivia',
  'Brazil','Canada','Chile','Colombia','Costa Rica','Cuba','Dominica',
  'Dominican Republic','Ecuador','El Salvador','Grenada','Guatemala','Guyana',
  'Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Paraguay','Peru',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines',
  'Suriname','Trinidad and Tobago','United States','Uruguay','Venezuela',
  'Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei',
  'Cambodia','China','Cyprus','Georgia','Hong Kong','India','Indonesia','Iran',
  'Iraq','Israel','Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos',
  'Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea',
  'Oman','Pakistan','Palestine','Philippines','Qatar','Saudi Arabia','Singapore',
  'South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste',
  'Turkey','Turkmenistan','UAE','Uzbekistan','Vietnam','Yemen',
  'Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina',
  'Bulgaria','Croatia','Czech Republic','Denmark','Estonia','Finland','France',
  'Germany','Greece','Hungary','Iceland','Ireland','Italy','Kosovo','Latvia',
  'Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco',
  'Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal',
  'Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain',
  'Sweden','Switzerland','Ukraine','United Kingdom','Vatican City',
  'Australia','Fiji','Kiribati','Marshall Islands','Micronesia','Nauru',
  'New Zealand','Palau','Papua New Guinea','Samoa','Solomon Islands',
  'Tonga','Tuvalu','Vanuatu',
].sort()

// ── NationalityCombobox ───────────────────────────────────────────────
function NationalityCombobox({ value, onChange, placeholder, hasError }: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  hasError?: boolean
}) {
  const [query, setQuery] = React.useState(value)
  const [open, setOpen] = React.useState(false)
  const filtered = query.length > 0
    ? COUNTRIES.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={e => { setQuery(e.target.value); onChange(''); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 160)}
        autoComplete="off"
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: '10px',
          border: `1px solid ${hasError ? '#f87171' : 'rgba(26,36,53,0.14)'}`,
          background: '#fff',
          fontSize: '14px',
          color: '#1A2435',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
        }}
      />
      {open && filtered.length > 0 && (
        <ul style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          zIndex: 50, borderRadius: '10px', border: '1px solid rgba(26,36,53,0.10)',
          background: '#fff', maxHeight: '200px', overflowY: 'auto',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)', listStyle: 'none', padding: 0, margin: 0,
        }}>
          {filtered.map(c => (
            <li
              key={c}
              onMouseDown={() => { onChange(c); setQuery(c); setOpen(false) }}
              style={{
                padding: '9px 14px', fontSize: '13px', color: '#1A2435',
                cursor: 'pointer', borderBottom: '1px solid rgba(26,36,53,0.05)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F5F8FA')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >{c}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── i18n ───────────────────────────────────────────────────────────────
const t = {
  ja: {
    breadcrumb: 'お問い合わせ',
    heading: 'お問い合わせ',
    subheading: 'DTVビザに関するご質問・ご相談をお気軽にどうぞ。',
    note: '通常1〜3営業日以内にご返信いたします。',
    labelName: 'お名前',
    placeholderName: '山田 太郎',
    labelEmail: 'メールアドレス',
    labelNationality: '国籍',
    placeholderNationality: '例：Japan',
    labelCategory: 'お問い合わせ種別',
    categories: [
      { value: 'DTV申請のご相談', label: 'DTV申請のご相談' },
      { value: 'Golf DTV', label: 'Golf DTV について' },
      { value: '記事の内容について', label: '記事の内容について' },
      { value: 'その他', label: 'その他' },
    ],
    labelMessage: 'お問い合わせ内容',
    placeholderMessage: 'ご質問・ご相談内容をご記入ください。',
    submit: '送信する',
    sending: '送信中...',
    successTitle: 'お問い合わせを受け付けました',
    successBody: 'ご入力いただいたメールアドレスへ、1〜3営業日以内にご返信いたします。',
    successBack: 'トップページへ戻る',
    errorTitle: '送信に失敗しました',
    errorBody: '申し訳ありません。時間をおいて再度お試しいただくか、直接 dtv.club.thailand@gmail.com までご連絡ください。',
    requiredNote: '* は必須項目です',
    privacy: 'お預かりした個人情報は、お問い合わせへの対応以外の目的には使用しません。',
    selectPlaceholder: '選択してください',
    emailDirect: '直接メールでのお問い合わせ：',
  },
  en: {
    breadcrumb: 'Contact',
    heading: 'Contact Us',
    subheading: "Have a question about DTV visas? We're happy to help.",
    note: 'We typically reply within 1–3 business days.',
    labelName: 'Your Name',
    placeholderName: 'John Smith',
    labelEmail: 'Email Address',
    labelNationality: 'Nationality',
    placeholderNationality: 'e.g. Japan',
    labelCategory: 'Inquiry Type',
    categories: [
      { value: 'DTV申請のご相談', label: 'DTV Application' },
      { value: 'Golf DTV', label: 'Golf DTV' },
      { value: '記事の内容について', label: 'About an Article' },
      { value: 'その他', label: 'Other' },
    ],
    labelMessage: 'Message',
    placeholderMessage: 'Please describe your question or inquiry.',
    submit: 'Send Message',
    sending: 'Sending...',
    successTitle: 'Message Received',
    successBody: "Thank you for reaching out. We'll reply to your email within 1–3 business days.",
    successBack: 'Back to Home',
    errorTitle: 'Failed to Send',
    errorBody: 'Sorry, something went wrong. Please try again or email us directly at dtv.club.thailand@gmail.com.',
    requiredNote: '* Required fields',
    privacy: 'Your personal information will only be used to respond to your inquiry.',
    selectPlaceholder: 'Select a category',
    emailDirect: 'Direct email: ',
  },
  ko: {
    breadcrumb: '문의하기',
    heading: '문의하기',
    subheading: 'DTV 비자에 관한 질문이나 상담을 편하게 보내주세요.',
    note: '보통 1~3 영업일 이내에 답변드립니다.',
    labelName: '이름',
    placeholderName: '홍길동',
    labelEmail: '이메일 주소',
    labelNationality: '국적',
    placeholderNationality: '예: Japan',
    labelCategory: '문의 종류',
    categories: [
      { value: 'DTV申請のご相談', label: 'DTV 신청 상담' },
      { value: 'Golf DTV', label: 'Golf DTV 문의' },
      { value: '記事の内容について', label: '기사 내용에 대해' },
      { value: 'その他', label: '기타' },
    ],
    labelMessage: '문의 내용',
    placeholderMessage: '질문이나 상담 내용을 입력해 주세요.',
    submit: '전송하기',
    sending: '전송 중...',
    successTitle: '문의가 접수되었습니다',
    successBody: '입력하신 이메일 주소로 1~3 영업일 이내에 답변드리겠습니다.',
    successBack: '홈으로 돌아가기',
    errorTitle: '전송 실패',
    errorBody: '죄송합니다. 잠시 후 다시 시도하거나 dtv.club.thailand@gmail.com 으로 직접 연락해 주세요.',
    requiredNote: '* 필수 항목',
    privacy: '수집된 개인정보는 문의 응대 목적으로만 사용됩니다.',
    selectPlaceholder: '선택해 주세요',
    emailDirect: '직접 이메일 문의：',
  },
} as const

type Lang = keyof typeof t

// ── Input style helper ─────────────────────────────────────────────────
const inputCss = (hasError?: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  border: `1px solid ${hasError ? '#f87171' : 'rgba(26,36,53,0.14)'}`,
  background: '#fff',
  fontSize: '14px',
  color: '#1A2435',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s',
})

// ── Page ──────────────────────────────────────────────────────────────
export default function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const locale: Lang = (lang === 'ja' || lang === 'en' || lang === 'ko') ? lang : 'ja'
  const copy = t[locale]

  const [form, setForm] = useState({ name: '', email: '', nationality: '', category: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = locale === 'ja' ? '必須項目です' : locale === 'ko' ? '필수 항목입니다' : 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = locale === 'ja' ? '正しいメールアドレスを入力してください' : locale === 'ko' ? '올바른 이메일 주소를 입력해 주세요' : 'Valid email required'
    if (!form.message.trim()) e.message = locale === 'ja' ? '必須項目です' : locale === 'ko' ? '필수 항목입니다' : 'Required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('/api/general-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#1A2435',
    marginBottom: '6px',
  }

  // ── Success ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: '#F5F8FA', paddingTop: '96px', paddingBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 16px 80px' }}>
        <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(10,122,106,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#0A7A6A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1A2435', marginBottom: '12px' }}>{copy.successTitle}</h2>
          <p style={{ fontSize: '14px', color: '#4A5A6E', lineHeight: 1.7, marginBottom: '32px' }}>{copy.successBody}</p>
          <Link
            href={`/${locale}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'linear-gradient(135deg, #0D9280 0%, #0A7A6A 100%)',
              color: '#fff', fontWeight: 700, padding: '12px 24px',
              borderRadius: '10px', textDecoration: 'none', fontSize: '14px',
              boxShadow: '0 3px 12px rgba(10,122,106,0.30)',
            }}
          >
            {copy.successBack}
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#F5F8FA', paddingTop: '88px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7E8EA4', marginBottom: '32px' }}>
          <Link href={`/${locale}`} style={{ color: '#7E8EA4', textDecoration: 'none' }}>
            {locale === 'ja' ? 'ホーム' : locale === 'ko' ? '홈' : 'Home'}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: '#4A5A6E' }}>{copy.breadcrumb}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1A2435', marginBottom: '8px' }}>{copy.heading}</h1>
          <p style={{ fontSize: '14px', color: '#4A5A6E', lineHeight: 1.6, marginBottom: '4px' }}>{copy.subheading}</p>
          <p style={{ fontSize: '13px', color: '#0A7A6A', fontWeight: 600 }}>{copy.note}</p>
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#FEF2F2', border: '1px solid rgba(248,113,113,0.35)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#b91c1c', marginBottom: '4px' }}>{copy.errorTitle}</p>
              <p style={{ fontSize: '12px', color: '#dc2626', lineHeight: 1.5 }}>{copy.errorBody}</p>
            </div>
          </div>
        )}

        {/* Form card */}
        <div style={{ background: '#fff', border: '1px solid rgba(26,36,53,0.10)', borderRadius: '16px', padding: '28px 24px', boxShadow: '0 2px 16px rgba(26,36,53,0.06)' }}>
          <p style={{ fontSize: '12px', color: '#7E8EA4', marginBottom: '20px' }}>{copy.requiredNote}</p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Name */}
            <div>
              <label style={labelStyle}>
                {copy.labelName} <span style={{ color: '#0A7A6A' }}>*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder={copy.placeholderName}
                style={inputCss(!!errors.name)}
                autoComplete="name"
                onFocus={e => { e.currentTarget.style.borderColor = errors.name ? '#f87171' : '#0A7A6A' }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.name ? '#f87171' : 'rgba(26,36,53,0.14)' }}
              />
              {errors.name && <p style={{ fontSize: '12px', color: '#f87171', marginTop: '4px' }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>
                {copy.labelEmail} <span style={{ color: '#0A7A6A' }}>*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com"
                style={inputCss(!!errors.email)}
                autoComplete="email"
                onFocus={e => { e.currentTarget.style.borderColor = errors.email ? '#f87171' : '#0A7A6A' }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.email ? '#f87171' : 'rgba(26,36,53,0.14)' }}
              />
              {errors.email && <p style={{ fontSize: '12px', color: '#f87171', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            {/* Nationality */}
            <div>
              <label style={labelStyle}>{copy.labelNationality}</label>
              <NationalityCombobox
                value={form.nationality}
                onChange={v => setForm(p => ({ ...p, nationality: v }))}
                placeholder={copy.placeholderNationality}
              />
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>{copy.labelCategory}</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                style={{ ...inputCss(), appearance: 'auto' as React.CSSProperties['appearance'], cursor: 'pointer' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#0A7A6A' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(26,36,53,0.14)' }}
              >
                <option value="">{copy.selectPlaceholder}</option>
                {copy.categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>
                {copy.labelMessage} <span style={{ color: '#0A7A6A' }}>*</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder={copy.placeholderMessage}
                rows={6}
                style={{ ...inputCss(!!errors.message), resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => { e.currentTarget.style.borderColor = errors.message ? '#f87171' : '#0A7A6A' }}
                onBlur={e => { e.currentTarget.style.borderColor = errors.message ? '#f87171' : 'rgba(26,36,53,0.14)' }}
              />
              {errors.message && <p style={{ fontSize: '12px', color: '#f87171', marginTop: '4px' }}>{errors.message}</p>}
            </div>

            {/* Privacy */}
            <p style={{ fontSize: '12px', color: '#7E8EA4', lineHeight: 1.6, margin: 0 }}>{copy.privacy}</p>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #0D9280 0%, #0A7A6A 100%)',
                color: '#fff', fontWeight: 700, padding: '14px',
                borderRadius: '10px', border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                fontSize: '15px', boxShadow: '0 3px 12px rgba(10,122,106,0.30)',
                opacity: status === 'sending' ? 0.7 : 1, width: '100%',
                transition: 'opacity 0.15s',
              }}
            >
              {status === 'sending' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'contact-spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
                    <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                  {copy.sending}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {copy.submit}
                </>
              )}
            </button>

          </form>
        </div>

        {/* Direct email */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#7E8EA4', marginTop: '20px' }}>
          {copy.emailDirect}
          <a href="mailto:dtv.club.thailand@gmail.com" style={{ color: '#0A7A6A', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            dtv.club.thailand@gmail.com
          </a>
        </p>

      </div>

      <style>{`@keyframes contact-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
