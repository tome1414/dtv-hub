'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const SECTIONS = [
  { id: 'common', labelJa: '共通書類', labelEn: 'Common Docs' },
  { id: 'freelance', labelJa: 'フリーランス', labelEn: 'Freelance' },
  { id: 'softpower', labelJa: 'ソフトパワー', labelEn: 'Soft Power' },
  { id: 'medical', labelJa: '医療', labelEn: 'Medical' },
  { id: 'faq', labelJa: 'FAQ', labelEn: 'FAQ' },
]

const C = {
  bg: '#F8F7F3',
  bgSub: '#EDEAE3',
  text: '#172019',
  sub: '#5C665E',
  muted: '#9EA89E',
  border: '#DDD9CE',
  green: '#0F6A43',
  greenLight: '#E8F4EF',
  gold: '#C9A24A',
  goldLight: '#FBF5E6',
}

export default function RequirementsPage() {
  const params = useParams()
  const lang = (params?.lang as string) ?? 'ja'
  const isJa = lang === 'ja'
  const [activeSection, setActiveSection] = useState('common')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', paddingTop: 64 }}>
      <style>{`
        @media (min-width: 768px) {
          .req-body-text { font-size: 15px !important; }
          .req-card-title { font-size: 15px !important; }
          .req-card-desc { font-size: 14px !important; }
          .req-table-cell { font-size: 14px !important; }
          .req-faq-q { font-size: 15px !important; }
          .req-faq-a { font-size: 14px !important; }
          .req-list-item { font-size: 14px !important; }
          .req-note { font-size: 14px !important; }
          .req-cta-body { font-size: 15px !important; }
          .req-cta-btn { font-size: 15px !important; }
          .req-related-link { font-size: 14px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: C.green, color: '#fff', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 12 }}>
            {isJa ? 'DTVビザ申請ガイド' : 'DTV Visa Application Guide'}
          </p>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1.25, margin: '0 0 16px' }}>
            {isJa ? 'DTVビザ 必要書類チェックリスト' : 'DTV Visa Required Documents Checklist'}
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.65, marginBottom: 28 }}>
            {isJa
              ? '共通書類とルート別追加書類を、申請前に確認しやすい形で整理しています。'
              : 'Common and route-specific documents, organized for pre-application review.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {isJa ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>1</span>
                  まず共通書類を確認する
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>2</span>
                  次にフリーランス / ソフトパワー / 医療の差分を見る
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>3</span>
                  判断に迷うケースはDiscordで確認する
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>1</span>Check common documents first</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>2</span>Then check Freelance / Soft Power / Medical differences</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>3</span>Use Discord for individual case questions</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Sticky Section Nav ── */}
      <div style={{ position: 'sticky', top: 64, zIndex: 50, background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {SECTIONS.map(({ id, labelJa, labelEn }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: activeSection === id ? 700 : 500,
                color: activeSection === id ? C.green : C.sub,
                background: 'none',
                border: 'none',
                borderBottom: activeSection === id ? `2px solid ${C.green}` : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {isJa ? labelJa : labelEn}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Section 1: 共通書類 ── */}
        <section id="common" style={{ paddingTop: 56 }}>
          <SectionHeader
            label={isJa ? '全員が確認する書類' : 'Documents Everyone Needs'}
            title={isJa ? '共通書類一覧' : 'Common Required Documents'}
            color={C.green}
          />
          <p className="req-body-text" style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            {isJa
              ? '申請ルートに関わらず、ほぼすべての申請に共通して求められる書類です。申請先の公館によって細部が異なる場合があるため、最終提出前に最新の公館案内を確認してください。'
              : 'These documents are required for most DTV applications regardless of route. Always verify with your specific embassy before submitting.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                icon: '🛂',
                title: isJa ? 'パスポート（原本）' : 'Passport (Original)',
                desc: isJa ? '残存有効期間は1年以上が目安。空白ページが2ページ以上あること。写真ページのコピーも一緒に提出。' : 'At least 1 year validity remaining. 2+ blank pages required. Include photocopy of photo page.',
              },
              {
                icon: '📷',
                title: isJa ? '顔写真（デジタル可）' : 'Photo (Digital Accepted)',
                desc: isJa ? 'オンライン申請の場合はJPEGまたはPDF形式でのアップロードが基本。白背景・6ヶ月以内の撮影が目安。在外公館窓口で紙提出を求める場合もあるため、申請先の案内を確認すること。' : 'Online applications typically accept JPEG or PDF upload. White background, taken within 6 months. Some in-person embassies require a printed copy — check your specific embassy.',
              },
              {
                icon: '🏠',
                title: isJa ? '現在の居住地・滞在地を示す書類' : 'Proof of Current Residence',
                desc: isJa ? '現住所を確認できる資料（マイナンバーカード、運転免許証、居住証明書など）。タイの滞在先予約ではなく、現在の住所証明として使われる。' : 'Documents confirming current address (e.g., national ID, driver\'s license, residence certificate). This is proof of current address, not Thai accommodation booking.',
              },
              {
                icon: '💰',
                title: isJa ? '資金証明（残高証明書）' : 'Financial Proof (Bank Statement)',
                desc: isJa ? '500,000バーツ以上（申請時の為替で変動する円換算額）。英文での発行が必要。発行日から3ヶ月以内が目安。' : '500,000 THB or more (JPY equivalent varies with exchange rate). Must be in English. Typically within 3 months of issue.',
                highlight: true,
              },
              {
                icon: '📋',
                title: isJa ? '申請書' : 'Application Form',
                desc: isJa ? '各公館の所定様式。英語で記入。公館のウェブサイトからダウンロードするか、窓口で入手。' : 'Official form from each embassy. Fill in English. Download from embassy website or obtain at the counter.',
              },
              {
                icon: '💴',
                title: isJa ? '申請費用' : 'Application Fee',
                desc: isJa ? '10,000タイバーツ。オンライン申請ではクレジットカードまたは銀行振込が主流。申請先の公館・国によって徴収金額・方法が異なるため、各公館の案内で確認すること。' : '10,000 THB. Online applications typically accept credit card or bank transfer. The amount and payment method vary by country and embassy — confirm with your specific embassy.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: item.highlight ? C.goldLight : '#fff',
                  border: `1px solid ${item.highlight ? C.gold : C.border}`,
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <p className="req-card-title" style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>{item.title}</p>
                  <p className="req-card-desc" style={{ fontSize: 13, color: C.sub, margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                  {item.highlight && (
                    <p style={{ fontSize: 12, color: C.gold, fontWeight: 700, margin: '6px 0 0' }}>
                      {isJa ? '⚠ 500万円固定ではありません。為替により変動します。' : '⚠ Not a fixed JPY amount — varies with exchange rate.'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: C.bgSub, borderRadius: 10, padding: '14px 18px', marginTop: 16, fontSize: 13, color: C.sub, lineHeight: 1.75 }}>
            <strong style={{ color: C.text }}>{isJa ? '補足：' : 'Note: '}</strong>
            {isJa
              ? '健康保険証書は申請先によって確認される場合があります。医療費40,000USD以上の補償があるものを用意しておくと安心です。また、公館によって追加書類を求められることがあります。申請前に必ず対象公館の最新案内を確認してください。'
              : 'Health insurance may be requested by some embassies. Coverage of USD 40,000+ is recommended. Additional documents may be required depending on the embassy — always check the latest guidance.'}
          </div>
        </section>

        {/* ── Route Comparison Table ── */}
        <section style={{ paddingTop: 56 }}>
          <SectionHeader
            label={isJa ? '申請ルート別' : 'By Application Route'}
            title={isJa ? 'ルート別 追加書類の比較' : 'Additional Documents by Route'}
            color={C.green}
          />
          <p className="req-body-text" style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            {isJa
              ? '共通書類に加えて、申請ルートごとに異なる書類が必要になります。自分のルートを確認してください。'
              : 'In addition to common documents, each route requires different supporting materials.'}
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.green, color: '#fff' }}>
                  <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, width: '28%' }}>{isJa ? '比較項目' : 'Item'}</th>
                  <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>{isJa ? 'フリーランス / ワーケーション' : 'Freelance / Workcation'}</th>
                  <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>{isJa ? 'ソフトパワー' : 'Soft Power'}</th>
                  <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>{isJa ? '医療＊' : 'Medical＊'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: isJa ? '追加で見られやすい書類' : 'Key additional documents',
                    freelance: isJa ? '在職証明、雇用契約書、業務委託契約書、会社資料、ポートフォリオ' : 'Employment proof, contract, company docs, portfolio',
                    softpower: isJa ? '参加確認書、受入レター、招聘状、活動内容説明' : 'Participation confirmation, acceptance letter, letter of invitation, activity description',
                    medical: isJa ? '病院のAppointment Letter、治療計画、予約確認書' : "Hospital appointment letter, treatment plan, booking confirmation",
                  },
                  {
                    label: isJa ? '書類の役割' : 'Purpose of documents',
                    freelance: isJa ? '現在の仕事実態を示す' : 'Demonstrate current work activity',
                    softpower: isJa ? '活動参加の具体性を示す' : 'Show concrete activity participation',
                    medical: isJa ? '医療目的の具体性を示す' : 'Show medical purpose concretely',
                  },
                  {
                    label: isJa ? 'よくある迷い' : 'Common uncertainties',
                    freelance: isJa ? '契約書1枚で足りるか、ポートフォリオは必要か' : 'Is one contract enough? Is a portfolio needed?',
                    softpower: isJa ? '受入レターに何を書けばよいか' : "What to include in the acceptance letter",
                    medical: isJa ? '予約確認だけで十分か、治療説明が必要か' : 'Is a booking confirmation enough, or is a treatment explanation needed?',
                  },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : C.bgSub }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: C.text, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{row.label}</td>
                    <td className="req-table-cell" style={{ padding: '12px 14px', color: C.sub, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{row.freelance}</td>
                    <td className="req-table-cell" style={{ padding: '12px 14px', color: C.sub, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{row.softpower}</td>
                    <td className="req-table-cell" style={{ padding: '12px 14px', color: C.sub, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{row.medical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 8, lineHeight: 1.6 }}>
            {isJa ? '＊ 医療は制度上ソフトパワー関連活動の一種として案内されるケースがあります。' : '＊ Medical purposes may be treated as a type of Soft Power activity under the DTV framework.'}
          </p>

          {/* Mid CTA */}
          <div style={{ background: C.greenLight, border: `1px solid ${C.green}30`, borderRadius: 12, padding: '20px 24px', marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.65 }}>
              {isJa
                ? '自分がどのルートに当てはまるか迷う場合は、Discordで先に整理できます。'
                : 'Not sure which route applies to you? Clarify first on Discord.'}
            </p>
            <a
              href="https://discord.gg/dtvclub"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: C.green, color: '#fff', padding: '10px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none', borderRadius: 6, whiteSpace: 'nowrap' }}
            >
              {isJa ? 'Discordで確認する' : 'Ask on Discord'}
            </a>
          </div>
        </section>

        {/* ── Section 2: フリーランス詳細 ── */}
        <section id="freelance" style={{ paddingTop: 56 }}>
          <SectionHeader
            label={isJa ? 'Workcationルート' : 'Workcation Route'}
            title={isJa ? 'フリーランス / ワーケーションの追加書類' : 'Freelance / Workcation Additional Documents'}
            color={C.green}
          />
          <p className="req-body-text" style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            {isJa
              ? 'フリーランス / ワーケーションルートでは、現在の仕事実態を示す資料が中心になります。1枚の契約書だけで十分かどうかは個別状況によるため、実績の説明と書類の一貫性を意識することが重要です。'
              : 'This route focuses on demonstrating your current work situation. Whether one contract is sufficient depends on circumstances — consistency between documents and your actual situation matters.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              {
                title: isJa ? '書類の例' : 'Document Examples',
                items: isJa
                  ? ['在職証明書（英文）', '雇用契約書（英文）', '業務委託契約書（英文）', '会社登記簿謄本 / 会社資料', 'ポートフォリオ（業務内容説明）']
                  : ['Certificate of employment (English)', 'Employment contract (English)', 'Freelance / service contract (English)', 'Company registration documents', 'Portfolio (work description)'],
              },
              {
                title: isJa ? '見られやすい観点' : 'What Reviewers Look For',
                items: isJa
                  ? ['現在の仕事実態が分かるか', '契約の継続性・安定性', '書類全体に一貫性があるか', 'タイ国外のクライアント・雇用主との契約か']
                  : ['Clear evidence of current work', 'Continuity and stability of contracts', 'Consistency across all documents', 'Contract is with overseas client/employer'],
              },
              {
                title: isJa ? '注意点' : 'Common Pitfalls',
                items: isJa
                  ? ['英文書類の準備が必須', '日本語のみの契約書は公館で受理されない場合がある', 'フリーランスの場合は複数の証拠資料を揃えると安心', '書類の期限・発行日を確認する']
                  : ['English documents required', 'Japanese-only contracts may not be accepted', 'Multiple supporting materials recommended for freelancers', 'Check document validity dates'],
              },
            ].map((block) => (
              <div key={block.title} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>{block.title}</p>
                <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {block.items.map((item) => (
                    <li key={item} style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.8, borderLeft: `3px solid ${C.border}`, paddingLeft: 16 }}>
            {isJa ? (
              <>
                申請ルートの詳細は
                <Link href="/ja/blog/dtv-visa" style={{ color: C.green, textDecoration: 'underline', textUnderlineOffset: 3 }}>タイDTVビザ完全ガイド</Link>
                で整理しています。ソフトパワーとの違いは
                <Link href="/ja/blog/dtv-soft-power-vs-freelance" style={{ color: C.green, textDecoration: 'underline', textUnderlineOffset: 3 }}>ソフトパワー vs フリーランス比較</Link>
                も参照してください。
              </>
            ) : (
              <>
                See the <Link href="/en/blog/dtv-visa" style={{ color: C.green, textDecoration: 'underline', textUnderlineOffset: 3 }}>DTV Visa Complete Guide</Link> for full details on application routes.
              </>
            )}
          </div>
        </section>

        {/* ── Section 3: ソフトパワー詳細 ── */}
        <section id="softpower" style={{ paddingTop: 56 }}>
          <SectionHeader
            label={isJa ? 'ソフトパワールート' : 'Soft Power Route'}
            title={isJa ? 'ソフトパワー活動の追加書類' : 'Soft Power Activity Additional Documents'}
            color={C.green}
          />
          <p className="req-body-text" style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            {isJa
              ? 'ソフトパワールートでは、タイ国内の受入機関から発行される活動証明書類が申請の核心となります。雇用契約書や業務実績の証明は不要ですが、活動参加の具体性を示す書類が必要です。'
              : 'The Soft Power route centers on activity confirmation documents issued by Thai institutions. Employment contracts are not required, but documents demonstrating concrete activity participation are needed.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              {
                icon: '📄',
                title: isJa ? '受入レター / 招聘状 / 参加確認書' : 'Acceptance Letter / Letter of Invitation / Participation Confirmation',
                desc: isJa ? 'タイ国内の受入機関（ゴルフ施設、料理学校など）が発行する書類。申請者の氏名・活動内容・期間・機関の公印が含まれる。（福岡領事館：「受け入れ先からの招聘状もしくは、アポイントメントレター等」）' : 'Issued by the Thai institution (golf club, cooking school, etc.). Must include applicant name, activity details, duration, and official stamp.',
                important: true,
              },
              {
                icon: '📝',
                title: isJa ? '活動内容が分かる資料' : 'Activity Description Materials',
                desc: isJa ? '活動先・活動内容・期間が読める資料。施設のパンフレット、プログラム説明、スケジュール等。受入レターと合わせて提出することで活動の具体性が増す。' : 'Materials showing the venue, activity type, and duration. Brochures, program descriptions, schedules. Strengthens the application when submitted with the acceptance letter.',
              },
              {
                icon: '💳',
                title: isJa ? '支払い証明（補助的）' : 'Payment Proof (Supplementary)',
                desc: isJa ? 'プログラム費用の支払いを示す領収書・振込明細など。必須ではないが、補助資料として有効な場合がある。' : 'Receipts or transfer records for program fees. Not strictly required but may strengthen the application.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: item.important ? C.greenLight : '#fff',
                  border: `1px solid ${item.important ? C.green + '40' : C.border}`,
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <p className="req-card-title" style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>{item.title}</p>
                  <p className="req-card-desc" style={{ fontSize: 13, color: C.sub, margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: C.bgSub, borderRadius: 10, padding: '14px 18px', fontSize: 13, color: C.sub, lineHeight: 1.75 }}>
            {isJa
              ? 'ソフトパワールートの書類整理をより具体的に進めたい場合は、活動ルートに対応したサポートを確認してください。受入レターの取得方法は申請先や活動テーマによって異なります。'
              : 'For more specific guidance on Soft Power route documentation, check the support available for your activity route. Acceptance letter procedures vary by embassy and activity type.'}
          </div>
        </section>

        {/* ── Section 4: 医療 ── */}
        <section id="medical" style={{ paddingTop: 56 }}>
          <SectionHeader
            label={isJa ? 'ソフトパワー関連活動の一種' : 'A Type of Soft Power Activity'}
            title={isJa ? '医療目的で進める場合の追加確認事項' : 'Additional Considerations for Medical Purposes'}
            color={C.gold}
          />
          <p className="req-body-text" style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            {isJa
              ? '医療目的での渡航は、制度上はソフトパワー関連活動の一種として案内されるケースがあります（台北経済文化代表処の案内では "hospital / medical center" が明示）。書類の中心は、医療機関が発行する活動の具体性を示す書類です。'
              : 'Medical purposes may be treated as a type of Soft Power activity (the Taipei office explicitly lists "hospital / medical center"). Documentation centers on materials from the medical institution showing specifics of the treatment.'}
          </p>

          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>
              {isJa ? '主な書類例' : 'Key Document Examples'}
            </p>
            <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(isJa ? [
                '病院・医療機関の Appointment Letter（診察・受診予約確認書）',
                'Treatment Plan（治療計画書）',
                '受診予定の説明資料（診療内容・期間）',
                '医療機関の案内文書・予約確認書',
              ] : [
                'Hospital / medical center appointment letter',
                'Treatment plan from the medical institution',
                'Description of planned treatment and duration',
                'Medical facility confirmation / booking documents',
              ]).map((item) => (
                <li key={item} style={{ fontSize: 13, color: C.sub, lineHeight: 1.65 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#fffbf0', border: `1px solid ${C.gold}40`, borderRadius: 10, padding: '14px 18px', fontSize: 13, color: C.sub, lineHeight: 1.75 }}>
            <strong style={{ color: C.text }}>{isJa ? '注記：' : 'Note: '}</strong>
            {isJa
              ? '医療目的の申請については、公館によって案内が異なる場合があります。事前に申請先の公館に確認することを推奨します。'
              : 'Guidance on medical-purpose applications varies by embassy. We recommend confirming directly with your intended embassy in advance.'}
          </div>
        </section>

        {/* ── Section 5: FAQ ── */}
        <section id="faq" style={{ paddingTop: 56 }}>
          <SectionHeader
            label="FAQ"
            title={isJa ? 'よくある質問' : 'Frequently Asked Questions'}
            color={C.green}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {(isJa ? [
              {
                q: '必要書類は全員同じですか？',
                a: '共通書類（パスポート・資金証明・申請書等）はほぼ全員に共通ですが、申請ルート（フリーランス / ソフトパワー / 医療）によって追加書類が変わります。まず共通書類を確認し、次に自分のルートの追加書類を確認してください。',
              },
              {
                q: '残高証明はいくら必要ですか？',
                a: '公官の案内では500,000タイバーツ以上が基準です。日本円の換算額は為替レートによって変動するため、固定の円額で判断しないでください。申請時点のレートで確認することを推奨します（目安：1バーツ≒4〜4.5円）。',
              },
              {
                q: '医療目的でも申請できますか？',
                a: '制度上、医療はソフトパワー関連活動の一種として案内されるケースがあります。台北の案内では病院・医療機関のappointment letterが例示されています。ただし申請先の公館によって案内が異なるため、事前確認を推奨します。',
              },
              {
                q: '健康保険は必ず必要ですか？',
                a: '公館によっては健康保険証書の確認を求める場合があります。医療費40,000USD以上の補償がある保険を準備しておくと安心です。共通必須書類として断定はできませんが、準備しておくことを推奨します。',
              },
              {
                q: '書類はすべて英語でなければいけませんか？',
                a: '英文での提出が基本です。日本語のみの書類は受理されない場合があります。英文での発行を依頼するか、公証済み翻訳を準備してください。',
              },
              {
                q: 'オンラインで申請できますか？書類はデジタルでよいですか？',
                a: 'タイ外務省のe-Visaシステム（evisa.thaigov.go.th）や各大使館のオンライン申請窓口を通じてオンライン完結で申請できるケースが多くなっています。書類はJPEGまたはPDF形式でのアップロードが基本で、写真の現像・郵送は不要なことがほとんどです。支払いはクレジットカードまたは銀行振込が主流です。ただし、申請先の公館や国によって対応状況が異なるため、最新の公館案内を必ず確認してください。',
              },
              {
                q: '申請費用はいくらですか？',
                a: 'DTVの申請費用は10,000タイバーツです。ただし、申請先の国や公館によって徴収額・支払い方法が異なる場合があります。各公館の最新案内でご確認ください。',
              },
            ] : [
              {
                q: 'Are required documents the same for everyone?',
                a: 'Common documents (passport, financial proof, application form, etc.) apply to nearly all applicants. Additional documents vary by route (Freelance / Soft Power / Medical). Check common docs first, then your route-specific requirements.',
              },
              {
                q: 'How much bank balance is required?',
                a: 'The standard is 500,000 THB or more. The JPY equivalent fluctuates with the exchange rate — do not use a fixed JPY figure. Check the rate at the time of application (rough guide: 1 THB ≈ ¥4–4.5).',
              },
              {
                q: 'Can I apply for medical purposes?',
                a: 'Medical purposes may be treated as a type of Soft Power activity. The Taipei office lists hospital/medical center appointment letters as examples. Guidance varies by embassy — confirm in advance.',
              },
              {
                q: 'Can I apply online? Are digital documents accepted?',
                a: 'Many embassies now support online applications via the Thai e-Visa system (evisa.thaigov.go.th) or embassy-specific portals. Documents are typically uploaded as JPEG or PDF — printed photos and mailed documents are generally not required. Payment is usually by credit card or bank transfer. Confirm with your specific embassy for the latest process.',
              },
              {
                q: 'What is the application fee?',
                a: 'The DTV application fee is 10,000 THB. However, the amount charged and payment method may vary by country and embassy. Always check the latest guidance from your specific embassy.',
              },
            ]).map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} borderColor={C.border} textColor={C.text} subColor={C.sub} />
            ))}
          </div>
        </section>

        {/* ── Related Articles ── */}
        <section style={{ paddingTop: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>
            {isJa ? '関連記事' : 'Related Articles'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: `/${lang}/blog/dtv-visa`, label: isJa ? 'タイDTVビザ完全ガイド' : 'DTV Visa Complete Guide' },
              { href: `/${lang}/blog/thailand-long-stay-visa-comparison`, label: isJa ? 'タイ長期滞在ビザ比較' : 'Thailand Long-Stay Visa Comparison' },
              { href: `/${lang}/blog/dtv-vs-retirement-visa`, label: isJa ? 'DTV vs リタイアメントビザ' : 'DTV vs Retirement Visa' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.green, textDecoration: 'none', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}
              >
                <span style={{ fontSize: 10 }}>→</span>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Discord CTA (Main) ── */}
        <section style={{ paddingTop: 48 }}>
          <div style={{ background: C.green, borderRadius: 16, padding: '36px 32px', textAlign: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Discord Community</p>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.3 }}>
              {isJa ? '書類の揃え方・ルート判断に迷ったら' : 'Not sure about documents or which route to take?'}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
              {isJa
                ? '一般論で整理できることはページで案内しています。個別事情が強いケース（フリーランス書類が複雑、書類の形式に不安がある等）はDiscordコミュニティで補完してください。'
                : 'General guidance is covered in these pages. For individual circumstances — complex freelance docs, format questions, etc. — get support in the Discord community.'}
            </p>
            <a
              href="https://discord.gg/dtvclub"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#fff', color: C.green, padding: '13px 32px', fontSize: 14, fontWeight: 800, textDecoration: 'none', borderRadius: 8 }}
            >
              {isJa ? 'Discordコミュニティで確認する' : 'Ask in Discord Community'}
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}

function SectionHeader({ label, title, color }: { label: string; title: string; color: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ background: color, width: 3, height: 16 }} />
        <span style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{label}</span>
      </div>
      <h2 style={{ fontSize: 'clamp(18px, 3.5vw, 24px)', fontWeight: 700, color: '#172019', margin: 0, fontFamily: 'Georgia, serif', lineHeight: 1.3 }}>
        {title}
      </h2>
    </div>
  )
}

function FaqItem({ q, a, borderColor, textColor, subColor }: { q: string; a: string; borderColor: string; textColor: string; subColor: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${borderColor}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', padding: '16px 0', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}
      >
        <span className="req-faq-q" style={{ fontSize: 14, fontWeight: 700, color: textColor, lineHeight: 1.5 }}>Q. {q}</span>
        <span style={{ fontSize: 18, color: subColor, flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
      </button>
      {open && (
        <p className="req-faq-a" style={{ fontSize: 13, color: subColor, lineHeight: 1.8, margin: '0 0 16px', paddingLeft: 4 }}>
          {a}
        </p>
      )}
    </div>
  )
}
