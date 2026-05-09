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
    title: isJa
      ? 'タイe-Visaの申請フォーム入力ガイド｜DTV完全解説'
      : 'Thailand e-Visa Application Form Guide | DTV Field-by-Field Walkthrough',
    description: isJa
      ? 'タイe-Visa（thaievisa.go.th）のDTV申請フォームを画面ごとに解説。各入力項目の意味・入力例・注意点を日本語でわかりやすく説明します。'
      : 'Step-by-step guide to filling in the Thailand e-Visa application form for DTV. Every field explained in plain language.',
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const C = {
  bg: '#F5F8FA', bgCard: '#FFFFFF', bgSection: '#EDF1F5',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)',
  green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.08)', tealMid: 'rgba(10,122,106,0.15)',
  gold: '#C9A030', goldDim: 'rgba(201,160,48,0.10)',
  red: '#C0392B', redDim: 'rgba(192,57,43,0.08)',
  fieldBg: '#F8F9FB', fieldBorder: 'rgba(26,36,53,0.15)',
  valueBg: '#E8F4F2', valueBorder: 'rgba(10,122,106,0.25)', valueText: '#0A5A4E',
}

// ────────────────────────────────────────────────────
// Field mock component data structures
// ────────────────────────────────────────────────────

type FieldType = 'select' | 'text' | 'date' | 'email' | 'textarea' | 'radio' | 'file'

interface Field {
  label: string        // English label (as shown in form)
  ja: string           // Japanese explanation
  type: FieldType
  value: string        // What to enter (DTV example)
  warn?: string        // Warning / tip
  branch?: string      // Branching note
}

interface Step {
  num: number
  screen: string
  title: { ja: string; en: string }
  desc: { ja: string; en: string }
  fields: Field[]
  note?: { ja: string; en: string }
}

const STEPS: Step[] = [
  {
    num: 1,
    screen: 'SCREEN 1',
    title: { ja: 'ビザ種別の選択', en: 'Select Visa Type' },
    desc: {
      ja: '申請開始時の基本設定画面です。ここで「DTV」を選択すると以降の入力項目がDTV向けに切り替わります。',
      en: 'The initial setup screen. Selecting "DTV" here switches the following form to DTV-specific fields.',
    },
    fields: [
      {
        label: 'Document issuing country/region',
        ja: '旅行書類（パスポート）の発行国',
        type: 'select',
        value: 'Japan',
        warn: '国籍ではなく「パスポートを発行した国」です',
      },
      {
        label: 'Current location',
        ja: '現在地（申請時に住んでいる国）',
        type: 'select',
        value: 'Japan',
      },
      {
        label: 'Place of application',
        ja: '申請場所（管轄の公館）',
        type: 'select',
        value: 'Royal Thai Embassy / Consulate in Japan',
        warn: '居住地の管轄大使館・総領事館を選択',
      },
      {
        label: 'Visa type',
        ja: 'ビザの種類',
        type: 'select',
        value: 'DTV — Destination Thailand Visa',
        warn: 'プルダウンから「Destination Thailand Visa (DTV)」を選択',
      },
    ],
  },
  {
    num: 2,
    screen: 'SCREEN 2',
    title: { ja: '個人情報の入力', en: 'Personal Information' },
    desc: {
      ja: 'パスポートに記載されている情報をそのまま入力します。スペルや生年月日の形式に注意してください。',
      en: 'Enter your information exactly as it appears in your passport. Pay close attention to spelling and date formats.',
    },
    fields: [
      {
        label: 'Title',
        ja: '敬称',
        type: 'select',
        value: 'Mr. / Mrs. / Ms. / Miss',
      },
      {
        label: 'Surname (Family Name)',
        ja: '姓（パスポートの英字表記）',
        type: 'text',
        value: 'YAMADA',
        warn: 'パスポートのローマ字と完全に一致させること',
      },
      {
        label: 'Given Name (First Name)',
        ja: '名（パスポートの英字表記）',
        type: 'text',
        value: 'TARO',
        warn: 'ミドルネームがある場合はスペースで区切って入力',
      },
      {
        label: 'Date of Birth',
        ja: '生年月日',
        type: 'date',
        value: 'DD / MM / YYYY（例：15 / 03 / 1985）',
        warn: '日本と逆順（日／月／年）なので注意',
      },
      {
        label: 'Place of Birth (City)',
        ja: '出生地（市区町村）',
        type: 'text',
        value: '出生した市区町村をローマ字で（例：TOKYO）',
      },
      {
        label: 'Place of Birth (Country)',
        ja: '出生地（国）',
        type: 'select',
        value: 'Japan',
      },
      {
        label: 'Nationality',
        ja: '国籍',
        type: 'select',
        value: 'Japanese',
      },
      {
        label: 'Gender',
        ja: '性別',
        type: 'radio',
        value: 'Male / Female',
      },
      {
        label: 'Marital Status',
        ja: '婚姻状況',
        type: 'select',
        value: 'Single（未婚）/ Married（既婚）/ Divorced（離婚）/ Widowed（死別）',
      },
      {
        label: 'Religion',
        ja: '宗教',
        type: 'select',
        value: 'Buddhism / No Religion / Other…',
        warn: '特定の宗教がなければ「No Religion」または空欄可の場合あり',
      },
      {
        label: 'Current Occupation / Profession',
        ja: '現在の職業・職種',
        type: 'text',
        value: '例：Software Engineer / Freelance Designer / Company Employee',
        warn: '無職・主婦の場合は「Unemployed」「Homemaker」など',
      },
      {
        label: 'Name and Address of Employer / School',
        ja: '勤務先・学校の名称と住所',
        type: 'textarea',
        value: '勤務先の英語社名と住所。フリーランスなら「Self-employed」でも可',
      },
    ],
  },
  {
    num: 3,
    screen: 'SCREEN 3',
    title: { ja: 'パスポート情報', en: 'Passport Details' },
    desc: {
      ja: 'パスポートを手元に置いて、記載通り正確に入力します。番号・有効期限の転記ミスが最も多いステップです。',
      en: 'Have your passport in hand and enter details exactly as written. Transcription errors here are the most common mistake.',
    },
    fields: [
      {
        label: 'Type of Travel Document',
        ja: '渡航書類の種類',
        type: 'select',
        value: 'Ordinary Passport（通常のパスポート）',
        warn: '旅券（通常の青・赤パスポート）なら「Ordinary Passport」',
      },
      {
        label: 'Passport Number',
        ja: 'パスポート番号',
        type: 'text',
        value: '例：TK1234567（英字2文字＋数字7桁）',
        warn: 'アルファベットの大文字・数字を正確に転記。OCRミスに注意',
      },
      {
        label: 'Date of Issue',
        ja: 'パスポート発行日',
        type: 'date',
        value: 'DD / MM / YYYY（例：10 / 06 / 2022）',
        warn: '発行日＝交付年月日（表紙内側の「Date of Issue」欄）',
      },
      {
        label: 'Date of Expiry',
        ja: 'パスポート有効期限',
        type: 'date',
        value: 'DD / MM / YYYY（例：09 / 06 / 2032）',
        warn: '申請時から6ヶ月以上の残存期間が必要',
      },
      {
        label: 'Issuing Authority / Office',
        ja: '発行機関',
        type: 'text',
        value: 'Ministry of Foreign Affairs, Japan（外務省）',
        warn: '日本のパスポートは「Ministry of Foreign Affairs, Japan」',
      },
    ],
  },
  {
    num: 4,
    screen: 'SCREEN 4',
    title: { ja: '連絡先情報', en: 'Contact Details' },
    desc: {
      ja: '審査結果や追加確認の連絡がメールで届きます。普段使っているアドレスを正確に入力してください。',
      en: 'Your review result and any follow-up requests arrive by email. Enter an address you check regularly.',
    },
    fields: [
      {
        label: 'Email Address',
        ja: 'メールアドレス',
        type: 'email',
        value: '普段使っているメールアドレスを入力',
        warn: '審査結果・追加書類依頼はここに届く。スペルミス厳禁',
      },
      {
        label: 'Confirm Email Address',
        ja: 'メールアドレス（確認）',
        type: 'email',
        value: '同じアドレスを再入力',
      },
      {
        label: 'Mobile Phone Number',
        ja: '携帯電話番号',
        type: 'text',
        value: '+81-90-XXXX-XXXX（国際形式）',
        warn: '国番号「+81」を先頭に付け、先頭の「0」を除く',
      },
      {
        label: 'Address in Country of Residence',
        ja: '現住所（日本の住所）',
        type: 'textarea',
        value: '英語表記の住所（例：1-2-3 Shinjuku, Shinjuku-ku, Tokyo）',
        warn: '住所は英語（ローマ字）で入力。郵便番号も記入',
      },
    ],
  },
  {
    num: 5,
    screen: 'SCREEN 5 ⭐ 最重要',
    title: { ja: '渡航情報・申請目的', en: 'Travel Information & Purpose of Visit' },
    desc: {
      ja: 'ここが最も重要なステップです。「Purpose of Visit」の選択でDTVのルート（WorcationまたはSoft Power）が決まります。間違えると書類要件が変わるため必ず確認してください。',
      en: 'This is the most critical step. Your "Purpose of Visit" selection determines your DTV route — Workcation or Soft Power. The required documents differ, so choose carefully.',
    },
    fields: [
      {
        label: 'Purpose of Visit',
        ja: '渡航目的（DTV申請の核心）',
        type: 'select',
        value: '▼ Workcationルート：「Workcation」を選択\n▼ Soft Powerルート：「Soft Power Activities」を選択',
        warn: 'フリーランス・リモートワーカーは「Workcation」、ゴルフ・料理など活動目的は「Soft Power Activities」',
        branch: 'Workcation選択 → 雇用契約書・リモートワーク許可書が必要\nSoft Power選択 → タイ施設の受入レターが必要',
      },
      {
        label: 'Expected Date of Arrival',
        ja: '予定入国日',
        type: 'date',
        value: 'DD / MM / YYYY',
        warn: '入力後に変更可能なケースがあるが、なるべく確定日を入力',
      },
      {
        label: 'Expected Period of Stay (days)',
        ja: '滞在予定日数',
        type: 'text',
        value: '最大180（DTVの1回あたり上限）',
        warn: '180を超える入力はできない。長期滞在希望でも180まで',
      },
      {
        label: 'Expected Address in Thailand',
        ja: 'タイでの滞在先住所（最初の宿）',
        type: 'textarea',
        value: '初回宿泊先のホテル名と住所（英語）を入力',
        warn: '決まっていない場合はバンコクの有名ホテルを仮入力し、後から変更を検討',
      },
      {
        label: 'Have you previously visited Thailand?',
        ja: 'タイへの訪問歴',
        type: 'radio',
        value: 'Yes / No',
        warn: 'ある場合はYesを選択。過去の滞在期間・回数の入力欄が表示される場合あり',
      },
      {
        label: 'Port of Entry',
        ja: '入国予定空港',
        type: 'select',
        value: '例：Suvarnabhumi Airport（スワンナプーム空港）/ Don Mueang Airport',
      },
    ],
    note: {
      ja: '⚠️ Workcation と Soft Power の違いが分からない場合は、先に「ルートの選び方」記事を確認してください。',
      en: '⚠️ If you are unsure whether to choose Workcation or Soft Power, read the route comparison article first.',
    },
  },
  {
    num: 6,
    screen: 'SCREEN 6',
    title: { ja: '書類のアップロード', en: 'Document Upload' },
    desc: {
      ja: 'PDF・JPEG形式で各書類をアップロードします。ファイルサイズ上限（目安1〜5MB）・文字の鮮明さを確認してからアップロードしてください。',
      en: 'Upload documents in PDF or JPEG format. Check that file size is within limits (typically 1–5 MB) and all text is clearly legible.',
    },
    fields: [
      {
        label: 'Passport Bio-data Page',
        ja: 'パスポート顔写真ページ',
        type: 'file',
        value: 'PDF or JPEG / 文字・顔・MRZが鮮明に読めること',
        warn: '明るい場所でフラットにスキャン。4隅が切れていないことを確認',
      },
      {
        label: 'Photo of Applicant',
        ja: '申請者の顔写真',
        type: 'file',
        value: '白背景・正面・最近撮影のJPEG',
        warn: '証明写真機またはシステムの要件（ピクセル数・比率）を事前確認',
      },
      {
        label: 'Bank Statement / Balance Certificate',
        ja: '残高証明書（500,000 THB以上）',
        type: 'file',
        value: '英語発行・申請直前（1〜2週間以内）発行のPDF',
        warn: '日本円の場合は為替換算額を明示。申請者本人名義の口座であること',
      },
      {
        label: 'Supporting Documents (Route-specific)',
        ja: 'ルート別根拠書類',
        type: 'file',
        value: 'Workcation：雇用契約書＋リモートワーク許可書\nSoft Power：タイ施設の受入レター（Acceptance Letter）',
        warn: '書類は英語で。日本語のみの場合は英語訳を添付',
      },
    ],
    note: {
      ja: 'アップロード後は各ファイルが正しく表示されることを確認してから次へ進んでください。',
      en: 'After uploading, verify each file displays correctly before proceeding.',
    },
  },
]

// ────────────────────────────────────────────────────
// Sub-components (render functions)
// ────────────────────────────────────────────────────

function FieldMock({ field, locale }: { field: Field; locale: string }) {
  const isJa = locale === 'ja'

  const iconMap: Record<FieldType, string> = {
    select: '▾',
    text: '✎',
    date: '📅',
    email: '@',
    textarea: '☰',
    radio: '◉',
    file: '⬆',
  }

  const hasBranch = !!field.branch
  const multiLine = field.value.includes('\n')

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Field label row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: 'monospace', background: C.bgSection, padding: '1px 6px', borderRadius: 4 }}>
          {field.label}
        </span>
        <span style={{ fontSize: 12, color: C.sub }}>
          {isJa ? field.ja : field.label}
        </span>
      </div>

      {/* Mock input */}
      <div style={{
        background: C.valueBg,
        border: `1px solid ${C.valueBorder}`,
        borderRadius: 7,
        padding: multiLine ? '10px 12px' : '8px 12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        minHeight: field.type === 'textarea' ? 56 : 'auto',
      }}>
        <span style={{ fontSize: 13, color: C.muted, flexShrink: 0, marginTop: 1 }}>{iconMap[field.type]}</span>
        <div>
          {field.value.split('\n').map((line, i) => (
            <p key={i} style={{ fontSize: 12, color: C.valueText, fontWeight: 600, margin: i > 0 ? '4px 0 0' : 0, lineHeight: 1.6 }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Warning */}
      {field.warn && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginTop: 5 }}>
          <span style={{ fontSize: 11, color: C.gold, flexShrink: 0 }}>⚠</span>
          <span style={{ fontSize: 11, color: '#7A5E1A', lineHeight: 1.55 }}>{field.warn}</span>
        </div>
      )}

      {/* Branch note */}
      {hasBranch && (
        <div style={{ marginTop: 8, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 7, padding: '8px 12px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.green, margin: '0 0 4px' }}>
            {isJa ? '選択肢によって必要書類が変わります' : 'Required documents differ by selection'}
          </p>
          {field.branch!.split('\n').map((line, i) => (
            <p key={i} style={{ fontSize: 11, color: C.sub, margin: i > 0 ? '3px 0 0' : 0 }}>{line}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default async function EvisaFormPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const isJa = locale === 'ja'

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 96 }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── Header ── */}
        <div style={{ padding: '40px 0 28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 100, padding: '3px 12px 3px 8px', marginBottom: 14 }}>
            <span style={{ fontSize: 16 }}>📋</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {isJa ? 'thaievisa.go.th 記入ガイド' : 'thaievisa.go.th Form Guide'}
            </span>
          </div>

          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28, fontWeight: 700, color: C.text, margin: '0 0 10px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            {isJa
              ? 'タイe-Visa（DTV）申請フォームの入力ガイド'
              : 'Thailand e-Visa (DTV) Application Form — Complete Walkthrough'}
          </h1>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.75, margin: 0, maxWidth: 640 }}>
            {isJa
              ? '公式サイトの各入力欄に何をどう書けばいいか、DTVに特化して画面ごとに解説します。フォームを開きながらこのページを参照してください。'
              : 'A field-by-field explanation of what to enter in each screen of the official e-Visa form, tailored specifically for DTV applicants.'}
          </p>
        </div>

        {/* ── Progress strip ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 32, flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: s.num === 5 ? C.green : C.tealDim,
                border: `2px solid ${s.num === 5 ? C.green : C.tealMid}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800,
                color: s.num === 5 ? '#fff' : C.green,
                flexShrink: 0,
              }}>
                {s.num}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 20, height: 2, background: C.tealMid, borderRadius: 2 }} />
              )}
            </div>
          ))}
          <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>
            {isJa ? '⭐ STEP 5が最重要' : '⭐ STEP 5 is most critical'}
          </span>
        </div>

        {/* ── Steps ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {STEPS.map((step) => (
            <div key={step.num} id={`step-${step.num}`}
              style={{
                background: C.bgCard,
                border: `1px solid ${step.num === 5 ? C.tealMid : C.border}`,
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: step.num === 5
                  ? `0 0 0 2px ${C.tealMid}, 0 4px 16px rgba(10,122,106,0.10)`
                  : '0 2px 10px rgba(26,36,53,0.06)',
              }}
            >
              {/* Step header */}
              <div style={{
                background: step.num === 5 ? C.tealDim : C.bgSection,
                borderBottom: `1px solid ${step.num === 5 ? C.tealMid : C.border}`,
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                  background: step.num === 5 ? C.green : '#fff',
                  border: `2px solid ${step.num === 5 ? C.green : C.tealMid}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 900,
                  color: step.num === 5 ? '#fff' : C.green,
                  boxShadow: step.num === 5 ? '0 2px 8px rgba(10,122,106,0.3)' : 'none',
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: 15, fontWeight: 800, color: step.num === 5 ? C.green : C.text, margin: 0 }}>
                      {isJa ? step.title.ja : step.title.en}
                    </h2>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: C.muted,
                      background: '#fff', border: `1px solid ${C.border}`,
                      padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace',
                    }}>
                      {step.screen}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: step.num === 5 ? '#0A5A4E' : C.sub, margin: '3px 0 0', lineHeight: 1.55 }}>
                    {isJa ? step.desc.ja : step.desc.en}
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div style={{ padding: '18px 20px' }}>
                {step.fields.map((field, i) => (
                  <FieldMock key={i} field={field} locale={locale} />
                ))}

                {/* Step note */}
                {step.note && (
                  <div style={{
                    marginTop: 4,
                    background: C.goldDim,
                    border: `1px solid rgba(201,160,48,0.25)`,
                    borderLeft: `4px solid ${C.gold}`,
                    borderRadius: '0 8px 8px 0',
                    padding: '10px 14px',
                  }}>
                    <p style={{ fontSize: 12, color: '#6B4F1A', margin: 0, lineHeight: 1.6 }}>
                      {isJa ? step.note.ja : step.note.en}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Final tip callout ── */}
        <div style={{ marginTop: 24, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 12, padding: '18px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.green, margin: '0 0 10px' }}>
            {isJa ? '📌 提出前の最終チェック' : '📌 Final Checks Before Submitting'}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {(isJa ? [
              '全書類のフルネーム・パスポート番号が一致しているか',
              '残高証明は申請直前（1〜2週間以内）に発行したものか',
              '生年月日・有効期限の日付形式（DD/MM/YYYY）は正しいか',
              'メールアドレスのスペルミスはないか（審査結果の受信先）',
              'Purpose of Visit で選んだルートに合った書類をアップロードしたか',
            ] : [
              'Full name and passport number are consistent across all documents',
              'Bank balance certificate was issued within the past 1–2 weeks',
              'All dates use DD/MM/YYYY format',
              'Email address is spelled correctly (review results go here)',
              'Uploaded documents match the Purpose of Visit route selected',
            ]).map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ color: C.sub, lineHeight: 1.55 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Link
            href={`/${locale}/requirements`}
            className="btn-richb-primary"
            style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}
          >
            {isJa ? '必要書類チェックリストを見る' : 'View Required Documents Checklist'}
          </Link>
          <Link
            href={`/${locale}/blog/dtv-common-document-mistakes`}
            className="btn-richb-sub"
            style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}
          >
            {isJa ? 'よくある書類ミスを確認する' : 'Common Document Mistakes'}
          </Link>
        </div>

        {/* ── Source note ── */}
        <p style={{ fontSize: 11, color: C.muted, marginTop: 24, lineHeight: 1.6 }}>
          {isJa
            ? '※ フォームの画面構成・項目名はthaievisa.go.thの仕様変更により変わる場合があります。申請時は公式サイトの最新表示を優先してください。'
            : '* Form layout and field names may change per thaievisa.go.th updates. Always defer to the official site at time of application.'}
        </p>

      </div>
    </div>
  )
}
