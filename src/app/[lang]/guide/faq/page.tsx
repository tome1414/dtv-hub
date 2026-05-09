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
      ? 'DTV（デスティネーション・タイランド・ビザ）よくある質問 FAQ'
      : isKo
      ? 'DTV(목적지 태국 비자) 자주 묻는 질문 FAQ'
      : 'DTV (Destination Thailand Visa) FAQ — Frequently Asked Questions',
    description: isJa
      ? 'DTV申請に関するよくある質問をまとめました。残高証明・インタビュー・健康保険・家族同伴など、疑問を解消します。'
      : 'Frequently asked questions about the DTV application: bank balance, interview, insurance, family, and more.',
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

interface FaqItem {
  q: string
  a: string
}

const faqs: { ja: FaqItem[]; en: FaqItem[]; ko: FaqItem[] } = {
  ja: [
    {
      q: 'DTVの申請に健康保険は必要ですか？',
      a: 'タイ大使館の公式案内では、健康保険はDTVの主要必要書類として列挙されていません。ただし、申請先の公館や個別事情によって追加確認の対象となる場合があるため、申請前に管轄公館の最新案内を確認することをおすすめします。',
    },
    {
      q: '残高証明は何円（何バーツ）必要ですか？',
      a: '50万タイバーツ以上の残高証明が求められています（為替レートによって変動しますが、目安として約200万円前後）。英語で発行された残高証明書が必要です。発行から1〜2週間以内のものをご用意ください。',
    },
    {
      q: 'DTVの申請にインタビュー（面接）はありますか？',
      a: 'タイe-Visaによるオンライン申請では書類審査が基本です。ただし、申請先の公館・時期・個別事情によってインタビューが設定される場合があります。一律「あり」「なし」とは断定できないため、申請前に管轄公館に確認することをおすすめします。',
    },
    {
      q: 'フリーランスでも申請できますか？',
      a: 'はい。DTVのWorkcationルートはフリーランサー・個人事業主も対象です。タイ国外のクライアントと締結した業務委託契約書、過去数ヶ月分の請求書・振込明細などが主な根拠書類になります。',
    },
    {
      q: '家族も一緒に申請できますか？',
      a: 'はい。タイ大使館の公式案内では「DTV保持者の配偶者および20歳未満の子ども」が対象として明示されています。家族は別途DTV申請が必要で、Purpose of Visitとして「Spouse and children under 20 years old of DTV visa holders」を選択します。',
    },
    {
      q: 'DTVは何年間有効ですか？',
      a: 'DTVは発給から5年間有効で、1回の入国につき最長180日（約6ヶ月）滞在できます。5年間で何度でも入国可能なマルチプルエントリービザです。',
    },
    {
      q: '申請から取得まで何日かかりますか？',
      a: 'タイe-Visaによるオンライン申請の場合、通常数日〜2週間程度で審査結果が届きます。混雑状況・書類の不備・公館の休業日によって前後することがあります。余裕を持ったスケジュールで申請することをおすすめします。',
    },
    {
      q: 'ソフトパワーとWorkcationはどちらを選べばよいですか？',
      a: '海外の雇用主・クライアントへのリモートワークが主目的であれば「Workcation」ルート、ゴルフ・タイ料理・ムエタイ・武術などタイの文化活動への参加が主目的であれば「Soft Power Activities」ルートが適しています。どちらを選ぶかで必要な書類が変わります。',
    },
  ],
  en: [
    {
      q: 'Is health insurance required for a DTV application?',
      a: 'Health insurance is not listed among the primary required documents in the official Thai Embassy guidance for DTV. However, some embassies may request it as an additional document depending on the applicant\'s circumstances. Check the latest requirements with the embassy handling your application.',
    },
    {
      q: 'How much bank balance is required?',
      a: 'A balance of at least 500,000 Thai Baht is required (approximately USD 14,000–15,000 depending on exchange rates). You will need an English-language bank balance certificate issued within 1–2 weeks of your application.',
    },
    {
      q: 'Is an interview required for DTV?',
      a: 'For online applications via thaievisa.go.th, document review is the standard process. However, interviews may be required depending on the embassy, timing, and individual circumstances. We recommend confirming with your local Thai embassy before applying.',
    },
    {
      q: 'Can freelancers apply for DTV?',
      a: 'Yes. The DTV Workcation route covers freelancers and self-employed individuals. Typical supporting documents include service contracts with overseas clients and recent invoices or payment records.',
    },
    {
      q: 'Can family members apply together?',
      a: 'Yes. The official Thai Embassy guidance explicitly states that spouses and children under 20 of DTV holders are eligible. Family members apply separately and select "Spouse and children under 20 years old of DTV visa holders" as the purpose of visit.',
    },
    {
      q: 'How long is DTV valid?',
      a: 'DTV is valid for 5 years from issuance and allows stays of up to 180 days per entry. It is a multiple-entry visa, meaning you can enter Thailand multiple times during the 5-year validity.',
    },
    {
      q: 'How long does processing take?',
      a: 'Online applications via thaievisa.go.th typically take a few days to two weeks for a decision. Processing times vary based on embassy workload, document completeness, and public holidays. Apply with a comfortable lead time.',
    },
  ],
  ko: [
    {
      q: 'DTV 신청에 건강보험이 필요한가요?',
      a: '태국 대사관 공식 안내에서 건강보험은 DTV의 주요 필요 서류로 나열되어 있지 않습니다. 다만 신청 공관 및 개별 상황에 따라 추가 확인 대상이 될 수 있으므로, 신청 전에 관할 공관의 최신 안내를 확인하시기 바랍니다.',
    },
    {
      q: '잔고 증명은 얼마나 필요한가요?',
      a: '50만 태국 바트 이상의 잔고 증명이 필요합니다（환율에 따라 다르지만 약 170~200만 원 정도). 영문으로 발급된 잔고 증명서가 필요하며, 신청 1~2주 이내에 발급된 것을 준비해 주세요.',
    },
    {
      q: 'DTV 신청에 인터뷰가 있나요?',
      a: '온라인 신청의 경우 서류 심사가 기본입니다. 다만 신청 공관·시기·개별 사정에 따라 인터뷰가 진행될 수 있습니다. 신청 전에 관할 태국 대사관에 확인하시기를 권장합니다.',
    },
    {
      q: '프리랜서도 신청할 수 있나요?',
      a: '네. DTV Workcation 루트는 프리랜서·개인 사업자도 대상입니다. 해외 클라이언트와의 업무 위탁 계약서, 최근 수개월간의 인보이스·입금 내역 등이 주요 근거 서류가 됩니다.',
    },
    {
      q: 'DTV의 유효 기간은 얼마인가요?',
      a: 'DTV는 발급일로부터 5년간 유효하며, 입국 1회당 최대 180일(약 6개월) 체류할 수 있습니다. 5년간 여러 번 입국 가능한 멀티플 엔트리 비자입니다.',
    },
  ],
}

export default async function GuideFaqPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const isJa = locale === 'ja'
  const isKo = locale === 'ko'

  const items = isJa ? faqs.ja : isKo ? faqs.ko : faqs.en

  const title = isJa
    ? 'DTV よくある質問（FAQ）'
    : isKo
    ? 'DTV 자주 묻는 질문 (FAQ)'
    : 'DTV Frequently Asked Questions'

  const subtitle = isJa
    ? 'DTV申請・滞在に関する疑問をまとめました。'
    : isKo
    ? 'DTV 신청 및 체류에 관한 자주 묻는 질문입니다.'
    : 'Common questions about DTV application and stay in Thailand.'

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 96 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 1.25rem' }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 100, padding: '3px 12px 3px 8px', marginBottom: 14 }}>
            <span style={{ fontSize: 15 }}>❓</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.07em' }}>FAQ</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 27, fontWeight: 700, color: C.text, margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            {title}
          </h1>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, margin: 0 }}>{subtitle}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 10px', lineHeight: 1.5 }}>
                <span style={{ color: C.green, marginRight: 8 }}>Q.</span>{item.q}
              </p>
              <p style={{ fontSize: 13.5, color: C.sub, margin: 0, lineHeight: 1.85 }}>
                <span style={{ fontWeight: 700, color: C.muted, marginRight: 8 }}>A.</span>{item.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ background: C.bgSection, borderRadius: 12, padding: '20px 22px', marginBottom: 32 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>
            {isJa ? '関連ページ' : isKo ? '관련 페이지' : 'Related Pages'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { href: '/requirements', label: isJa ? '必要書類チェックリスト' : isKo ? '필요 서류 체크리스트' : 'Required Documents' },
              { href: '/guide/evisa-form', label: isJa ? 'e-Visaフォーム入力ガイド' : isKo ? 'e-비자 폼 작성 가이드' : 'e-Visa Form Guide' },
              { href: '/blog', label: isJa ? '記事一覧' : isKo ? '기사 목록' : 'Blog' },
            ].map((link) => (
              <Link key={link.href} href={`/${locale}${link.href}`}
                style={{ fontSize: 13, color: C.green, padding: '6px 14px', border: `1px solid ${C.tealMid}`, borderRadius: 100, textDecoration: 'none', background: C.tealDim }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
          {isJa
            ? '※ 本ページの内容は一般的な情報提供を目的としており、個別の申請を保証するものではありません。申請先公館の最新案内を必ず確認してください。'
            : isKo
            ? '※ 본 페이지의 내용은 일반적인 정보 제공을 목적으로 하며, 개별 신청을 보장하지 않습니다. 신청 공관의 최신 안내를 반드시 확인하시기 바랍니다.'
            : '※ This page is for general informational purposes only. Always verify the latest requirements with the embassy handling your application.'}
        </p>
      </div>
    </div>
  )
}
