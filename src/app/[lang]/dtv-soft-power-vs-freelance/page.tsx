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
    title: isJa ? 'DTVビザ：ソフトパワーvsフリーランス徹底比較' : 'DTV Visa: Soft Power vs Freelance Route Comparison',
    description: isJa
      ? 'DTVビザのソフトパワールートとフリーランス・リモートワークルートを徹底比較。どちらが自分に向いているか分かります。'
      : 'Compare the DTV Soft Power route and the Freelance/Remote Work route to find which one suits you best.',
    alternates: {
      canonical: `https://dtvclub.com/${lang}/dtv-soft-power-vs-freelance`,
    },
  }
}

const content = {
  ja: {
    category: '比較記事',
    title: 'ソフトパワー vs フリーランス',
    subtitle: 'あなたに合ったDTVビザの申請ルートはどちら？',
    intro: 'DTVビザには2つの主要な申請ルートがあります。それぞれに必要な書類と条件が異なるため、自分の状況に合ったルートを選ぶことが審査通過の近道です。',
    tableHead: ['比較項目', 'ソフトパワールート', 'フリーランス/リモートルート'],
    rows: [
      ['対象者', 'タイ文化・スポーツ活動に参加する人', 'リモートワーカー・フリーランサー'],
      ['収入証明', '不要（プログラム参加が根拠）', '必要（雇用契約書・収入証明）'],
      ['必要な特別書類', '認定プログラムの入学許可書', '雇用証明または事業証明'],
      ['財政証明', '必要（残高証明等）', '必要（残高証明等）'],
      ['準備期間の目安', '1〜2週間', '3〜4週間'],
      ['審査通過しやすさ', '◎ 書類が明確', '△ 審査官の裁量あり'],
      ['費用感', 'プログラム費用が別途必要', '追加費用なし'],
    ],
    softPower: {
      title: 'ソフトパワールートが向いている人',
      pros: [
        '会社員・自営業問わず誰でも申請しやすい',
        'フリーランス証明書類が用意しにくい人',
        'タイの文化・スポーツに興味がある人',
        '短期間でビザ取得したい人',
        '書類審査のリスクを減らしたい人',
      ],
      cons: [
        '認定プログラムへの参加費用が必要',
        '実際にプログラムを受講する必要がある',
      ],
    },
    freelance: {
      title: 'フリーランスルートが向いている人',
      pros: [
        'リモートワーク可能な雇用契約がある人',
        'フリーランスとして安定した収入がある人',
        '事業主として書類を揃えられる人',
        'プログラム費用を避けたい人',
      ],
      cons: [
        '雇用形態の証明が複雑になりやすい',
        '審査基準が曖昧で通過率にばらつきがある',
        '書類準備に時間がかかる',
      ],
    },
    recommendation: 'ルート選択に迷う場合は、自分の書類状況・目的・スケジュールを整理してから判断することをおすすめします。不明な点は申請先公館の最新案内を確認してください。',
    ctaPrimary: 'ゴルフDTVの詳細を見る',
    ctaSecondary: '申請方法を確認する',
  },
  en: {
    category: 'Comparison',
    title: 'Soft Power vs Freelance',
    subtitle: 'Which DTV visa route is right for you?',
    intro: 'DTV visa has two main application routes. Each requires different documents and criteria, so choosing the right route for your situation is key to a successful application.',
    tableHead: ['Criteria', 'Soft Power Route', 'Freelance/Remote Route'],
    rows: [
      ['Who it\'s for', 'Those joining Thai cultural/sports programs', 'Remote workers & freelancers'],
      ['Income proof', 'Not required (program participation suffices)', 'Required (employment or business proof)'],
      ['Special documents', 'Program acceptance letter', 'Employment or business certificate'],
      ['Financial proof', 'Required (bank statement etc.)', 'Required (bank statement etc.)'],
      ['Preparation time', '1–2 weeks', '3–4 weeks'],
      ['Approval likelihood', '◎ Clear criteria', '△ Varies by officer'],
      ['Extra cost', 'Program fee required', 'No extra cost'],
    ],
    softPower: {
      title: 'Soft Power Route is better if you…',
      pros: [
        'Are employed or self-employed — the route is open to anyone',
        'Have difficulty gathering freelance income documentation',
        'Are interested in Thai culture or sports',
        'Want to obtain your visa quickly',
        'Want to minimize document review risk',
      ],
      cons: [
        'Program participation fee is required',
        'You need to actually attend the program',
      ],
    },
    freelance: {
      title: 'Freelance Route is better if you…',
      pros: [
        'Have a remote-work employment contract',
        'Have stable, documented freelance income',
        'Can easily provide business documentation',
        'Want to avoid program fees',
      ],
      cons: [
        'Employment proof can be complex to document',
        'Approval criteria are less standardized',
        'Document preparation takes longer',
      ],
    },
    recommendation: 'If you\'re unsure which route to take, we recommend reviewing your document situation, goals, and timeline before deciding. For any unclear points, check the latest guidance from the applying embassy.',
    ctaPrimary: 'View Golf DTV Program',
    ctaSecondary: 'Check Application Process',
  },
  ko: {
    category: '비교 기사',
    title: '소프트파워 vs 프리랜서',
    subtitle: '나에게 맞는 DTV 비자 신청 루트는?',
    intro: 'DTV 비자에는 두 가지 주요 신청 루트가 있습니다. 각각 필요한 서류와 조건이 다르므로 자신의 상황에 맞는 루트를 선택하는 것이 심사 통과의 지름길입니다.',
    tableHead: ['비교 항목', '소프트파워 루트', '프리랜서/리모트 루트'],
    rows: [
      ['대상자', '태국 문화·스포츠 활동 참가자', '리모트 워커·프리랜서'],
      ['수입 증명', '불필요 (프로그램 참가가 근거)', '필요 (고용 계약서·수입 증명)'],
      ['특별 서류', '인정 프로그램 입학 허가서', '고용 증명 또는 사업 증명'],
      ['재정 증명', '필요 (잔고 증명 등)', '필요 (잔고 증명 등)'],
      ['준비 기간', '1~2주', '3~4주'],
    ],
    softPower: {
      title: '소프트파워 루트가 맞는 분',
      pros: [
        '직장인·자영업자 누구나 신청 가능',
        '프리랜서 증명 서류 준비가 어려운 분',
        '태국 문화·스포츠에 관심 있는 분',
        '빠른 비자 취득을 원하는 분',
      ],
      cons: [
        '인정 프로그램 참가 비용 필요',
        '실제 프로그램 수강 필요',
      ],
    },
    freelance: {
      title: '프리랜서 루트가 맞는 분',
      pros: [
        '리모트 근무 고용 계약이 있는 분',
        '안정적인 프리랜서 수입이 있는 분',
        '프로그램 비용을 피하고 싶은 분',
      ],
      cons: [
        '고용 형태 증명이 복잡해지기 쉬움',
        '심사 기준이 불명확하여 통과율에 편차',
      ],
    },
    recommendation: '루트 선택에 고민된다면 자신의 서류 상황, 목적, 일정을 정리한 뒤 판단하세요. 불분명한 점은 신청 공관의 최신 안내를 확인해 주세요.',
    ctaPrimary: '골프DTV 자세히 보기',
    ctaSecondary: '신청 방법 확인',
  },
  ru: {
    category: 'Сравнение',
    title: 'Soft Power vs Фриланс',
    subtitle: 'Какой маршрут визы DTV подходит именно вам?',
    intro: 'У визы DTV есть два основных маршрута подачи. Каждый требует разных документов и условий, поэтому выбор правильного маршрута для вашей ситуации — ключ к успешной заявке.',
    tableHead: ['Критерий', 'Маршрут Soft Power', 'Маршрут Фриланс/Удалённая работа'],
    rows: [
      ['Для кого', 'Участники культурных/спортивных программ Таиланда', 'Удалённые работники и фрилансеры'],
      ['Подтверждение дохода', 'Не требуется (достаточно участия в программе)', 'Требуется (трудовой договор или подтверждение бизнеса)'],
      ['Специальные документы', 'Письмо о зачислении в программу', 'Справка о трудоустройстве или ведении бизнеса'],
      ['Финансовое подтверждение', 'Требуется (выписка из банка и т.д.)', 'Требуется (выписка из банка и т.д.)'],
      ['Время подготовки', '1–2 недели', '3–4 недели'],
    ],
    softPower: {
      title: 'Маршрут Soft Power лучше, если вы…',
      pros: [
        'Работаете или самозаняты — маршрут открыт для всех',
        'Испытываете трудности со сбором документов о доходе фриланса',
        'Интересуетесь тайской культурой или спортом',
        'Хотите получить визу быстро',
      ],
      cons: [
        'Требуется плата за участие в программе',
        'Необходимо фактически посещать программу',
      ],
    },
    freelance: {
      title: 'Маршрут Фриланс лучше, если вы…',
      pros: [
        'Имеете трудовой договор для удалённой работы',
        'Имеете стабильный, документально подтверждённый доход фриланса',
        'Хотите избежать платы за программу',
      ],
      cons: [
        'Подтверждение занятости может быть сложным',
        'Критерии одобрения менее стандартизированы',
      ],
    },
    recommendation: 'Если вы не уверены, какой маршрут выбрать, рекомендуем оценить вашу документальную ситуацию, цели и сроки. По неясным вопросам уточняйте последние требования в посольстве.',
    ctaPrimary: 'Подробнее о программе Golf DTV',
    ctaSecondary: 'Процесс подачи заявки',
  },
  zh: {
    category: '比较',
    title: '软实力 vs 自由职业',
    subtitle: '哪条DTV签证申请路径更适合您？',
    intro: 'DTV签证有两条主要申请路径，各自所需的材料和条件有所不同。根据自身情况选择合适的路径，是顺利通过审查的关键。',
    tableHead: ['比较项目', '软实力路径', '自由职业/远程路径'],
    rows: [
      ['适用人群', '参加泰国文化·体育活动的人', '远程工作者·自由职业者'],
      ['收入证明', '无需（项目参与即为依据）', '需要（劳动合同·收入证明）'],
      ['特殊文件', '认证项目入学许可证', '雇佣证明或经营证明'],
      ['财务证明', '需要（存款证明等）', '需要（存款证明等）'],
      ['准备时间', '1〜2周', '3〜4周'],
    ],
    softPower: {
      title: '适合软实力路径的人',
      pros: [
        '无论上班族还是自营业者均可申请',
        '难以准备自由职业证明材料',
        '对泰国文化·体育感兴趣',
        '希望快速获得签证',
      ],
      cons: [
        '需要支付认证项目参加费用',
        '需要实际参加项目',
      ],
    },
    freelance: {
      title: '适合自由职业路径的人',
      pros: [
        '拥有远程工作雇佣合同',
        '有稳定且可证明的自由职业收入',
        '希望避免项目费用',
      ],
      cons: [
        '雇佣形式证明往往较为复杂',
        '审查标准不明确，通过率参差不齐',
      ],
    },
    recommendation: '如果您在路径选择上犹豫不决，建议先整理自身的材料情况、目的和时间安排再做决定。不明之处请确认申请所在公馆的最新说明。',
    ctaPrimary: '查看Golf DTV详情',
    ctaSecondary: '确认申请方法',
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

export default async function SoftPowerVsFreelancePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = (content as Record<string, typeof content.en>)[locale] ?? content.en

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 80 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ padding: '40px 0 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: '1px solid rgba(10,122,106,0.2)', borderRadius: 100, padding: '3px 10px 3px 6px', marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, background: C.green, borderRadius: '50%' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.category}</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 30, fontWeight: 700, color: C.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.green, margin: '0 0 12px' }}>{c.subtitle}</p>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.75, margin: 0 }}>{c.intro}</p>
        </div>

        {/* Comparison table */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 28, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {c.tableHead.map((h, i) => (
                    <th key={i} style={{
                      padding: '12px 16px', textAlign: 'left', fontWeight: 700,
                      background: C.text, color: 'white', fontSize: 12,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: '11px 16px', color: C.muted, fontWeight: 500, fontSize: 12, background: C.bgSection }}>{row[0]}</td>
                    <td style={{ padding: '11px 16px', color: C.text, fontWeight: 500 }}>{row[1]}</td>
                    <td style={{ padding: '11px 16px', color: C.sub }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros/cons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>

          {/* Soft Power */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(26,36,53,0.08)', borderTop: `3px solid ${C.green}` }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 16 }}>{c.softPower.title}</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {c.softPower.pros.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ color: C.sub, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
            {c.softPower.cons.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, marginTop: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span style={{ color: C.muted, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Freelance */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(26,36,53,0.08)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: C.sub, marginBottom: 16 }}>{c.freelance.title}</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {c.freelance.pros.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ color: C.sub, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
            {c.freelance.cons.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, marginTop: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E05A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span style={{ color: C.muted, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation note */}
        <div style={{ background: 'rgba(10,122,106,0.06)', border: '1px solid rgba(10,122,106,0.18)', borderLeft: `4px solid ${C.green}`, borderRadius: '0 8px 8px 0', padding: '14px 20px', marginBottom: 32, fontSize: 13, color: C.sub, lineHeight: 1.75 }}>
          {c.recommendation}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link href={`/${locale}/golf-dtv`} className="btn-richb-gold" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
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
