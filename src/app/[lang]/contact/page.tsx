'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Send, ChevronRight } from 'lucide-react'

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
    placeholderEmail: 'your@email.com',
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
  },
  en: {
    breadcrumb: 'Contact',
    heading: 'Contact Us',
    subheading: 'Have a question about DTV visas? We\'re happy to help.',
    note: 'We typically reply within 1–3 business days.',
    labelName: 'Your Name',
    placeholderName: 'John Smith',
    labelEmail: 'Email Address',
    placeholderEmail: 'your@email.com',
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
    successBody: 'Thank you for reaching out. We\'ll reply to your email within 1–3 business days.',
    successBack: 'Back to Home',
    errorTitle: 'Failed to Send',
    errorBody: 'Sorry, something went wrong. Please try again or email us directly at dtv.club.thailand@gmail.com.',
    requiredNote: '* Required fields',
    privacy: 'Your personal information will only be used to respond to your inquiry.',
  },
  ko: {
    breadcrumb: '문의하기',
    heading: '문의하기',
    subheading: 'DTV 비자에 관한 질문이나 상담을 편하게 보내주세요.',
    note: '보통 1~3 영업일 이내에 답변드립니다.',
    labelName: '이름',
    placeholderName: '홍길동',
    labelEmail: '이메일 주소',
    placeholderEmail: 'your@email.com',
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
  },
} as const

type Lang = keyof typeof t

// ── Page ──────────────────────────────────────────────────────────────
export default function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const locale: Lang = (lang === 'ja' || lang === 'en' || lang === 'ko') ? lang : 'ja'
  const copy = t[locale]

  const [form, setForm] = useState({ name: '', email: '', category: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = locale === 'ja' ? 'お名前を入力してください' : locale === 'ko' ? '이름을 입력해 주세요' : 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = locale === 'ja' ? '正しいメールアドレスを入力してください' : locale === 'ko' ? '올바른 이메일 주소를 입력해 주세요' : 'Valid email is required'
    if (!form.message.trim()) e.message = locale === 'ja' ? 'お問い合わせ内容を入力してください' : locale === 'ko' ? '문의 내용을 입력해 주세요' : 'Message is required'
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

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-3 rounded-lg bg-navy-950 border text-white placeholder-navy-500 focus:outline-none transition-colors text-sm ${
      errors[field] ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-teal-500/60'
    }`

  // ── Success ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-navy-950 pt-24 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{copy.successTitle}</h2>
          <p className="text-navy-400 text-sm leading-relaxed mb-8">{copy.successBody}</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            {copy.successBack}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-navy-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-navy-300 transition-colors">
            {locale === 'ja' ? 'ホーム' : locale === 'ko' ? '홈' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-300">{copy.breadcrumb}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">{copy.heading}</h1>
          <p className="text-navy-400 text-sm leading-relaxed">{copy.subheading}</p>
          <p className="text-teal-400 text-xs mt-2 font-medium">{copy.note}</p>
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div className="flex gap-3 items-start bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-semibold text-sm">{copy.errorTitle}</p>
              <p className="text-red-400/80 text-xs mt-1 leading-relaxed">{copy.errorBody}</p>
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="bg-navy-900 border border-white/8 rounded-2xl p-6 sm:p-8">
          <p className="text-navy-500 text-xs mb-6">{copy.requiredNote}</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-navy-200 mb-1.5">
                {copy.labelName} <span className="text-teal-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder={copy.placeholderName}
                className={inputClass('name')}
                autoComplete="name"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-navy-200 mb-1.5">
                {copy.labelEmail} <span className="text-teal-400">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder={copy.placeholderEmail}
                className={inputClass('email')}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-navy-200 mb-1.5">
                {copy.labelCategory}
              </label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-teal-500/60 transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="" style={{ background: '#0d1a2f' }}>
                  {locale === 'ja' ? '選択してください' : locale === 'ko' ? '선택해 주세요' : 'Select a category'}
                </option>
                {copy.categories.map(c => (
                  <option key={c.value} value={c.value} style={{ background: '#0d1a2f' }}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-navy-200 mb-1.5">
                {copy.labelMessage} <span className="text-teal-400">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder={copy.placeholderMessage}
                rows={6}
                className={`${inputClass('message')} resize-none leading-relaxed`}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
            </div>

            {/* Privacy note */}
            <p className="text-navy-500 text-xs leading-relaxed pt-1">{copy.privacy}</p>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm"
            >
              {status === 'sending' ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  {copy.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {copy.submit}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Direct email fallback */}
        <p className="text-center text-navy-600 text-xs mt-6">
          {locale === 'ja' ? '直接メールでのお問い合わせ：' : locale === 'ko' ? '직접 이메일 문의：' : 'Direct email: '}
          <a href="mailto:dtv.club.thailand@gmail.com" className="text-navy-400 hover:text-teal-400 transition-colors underline underline-offset-2">
            dtv.club.thailand@gmail.com
          </a>
        </p>

      </div>
    </div>
  )
}
