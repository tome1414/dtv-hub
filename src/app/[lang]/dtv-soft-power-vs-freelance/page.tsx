import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { Scale, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
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
  }
}

const content = {
  ja: {
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
    recommendation: 'ソフトパワールートの方が書類要件が明確で審査が通りやすいケースが多いです。特にゴルフDTVは5日間のプログラムで入学許可書が取得でき、申請実績も豊富です。',
    ctaPrimary: 'ゴルフDTVの詳細を見る',
    ctaSecondary: '申請方法を確認する',
  },
  en: {
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
    recommendation: 'The Soft Power route tends to have clearer criteria and more consistent approval rates. Golf DTV in particular offers a 5-day program with a well-established track record for visa approvals.',
    ctaPrimary: 'View Golf DTV Program',
    ctaSecondary: 'Check Application Process',
  },
}

export default async function SoftPowerVsFreelancePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = content[locale as keyof typeof content] ?? content.en

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-gold-300 text-lg font-semibold mb-3">{c.subtitle}</p>
          <p className="text-navy-300 leading-relaxed">{c.intro}</p>
        </div>

        {/* Comparison table */}
        <div className="bg-navy-900 rounded-2xl border border-white/10 overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {c.tableHead.map((h, i) => (
                    <th key={i} className={`px-4 py-3 text-left font-bold ${i === 1 ? 'text-gold-400' : i === 2 ? 'text-navy-300' : 'text-navy-400'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-navy-400 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-white">{row[1]}</td>
                    <td className="px-4 py-3 text-navy-300">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros/cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-navy-900 rounded-2xl p-6 border border-gold-500/20">
            <h2 className="font-bold mb-4 text-gold-400">{c.softPower.title}</h2>
            <ul className="space-y-2 mb-4">
              {c.softPower.pros.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-200">{item}</span>
                </li>
              ))}
            </ul>
            {c.softPower.cons.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <XCircle className="w-4 h-4 text-navy-500 flex-shrink-0 mt-0.5" />
                <span className="text-navy-400">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-navy-900 rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold mb-4 text-navy-300">{c.freelance.title}</h2>
            <ul className="space-y-2 mb-4">
              {c.freelance.pros.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-navy-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-300">{item}</span>
                </li>
              ))}
            </ul>
            {c.freelance.cons.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-500/60 flex-shrink-0 mt-0.5" />
                <span className="text-navy-400">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-6 mb-10">
          <p className="text-gold-200 leading-relaxed text-sm">{c.recommendation}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}/golf-dtv`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            {c.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/dtv-application`}
            className="flex items-center justify-center gap-2 border border-white/20 text-navy-200 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            {c.ctaSecondary}
          </Link>
        </div>

      </div>
    </div>
  )
}
