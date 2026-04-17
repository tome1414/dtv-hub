'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, MessageSquare, ExternalLink } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { useEffect, useState } from 'react'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PageProps {
  params: Promise<{ lang: string; id: string }>
}

const mockArticlesData: Record<number, {
  title: string
  category: string
  author: string
  date: string
  readTime: string
  excerpt: string
  content: string
}> = {
  1: {
    title: '2025年DTVビザ申請フロー完全解説',
    category: '申請ガイド',
    author: 'DTV Club Editor',
    date: '2025年4月13日',
    readTime: '8分',
    excerpt: '東京タイ王国大使館でのDTVビザ申請手順を写真付きで徹底解説。予約方法から受取まで1記事で完結。',
    content: `
      <h2>はじめに</h2>
      <p>タイの長期滞在ビザ「DTV（Destination Thailand Visa）」は、リモートワーカーやデジタルノマドを対象にした新しい長期滞在ビザです。この記事では、東京タイ王国大使館での実際の申請体験をもとに、申請フロー全体を詳しく解説します。</p>

      <h2>DTVビザの基本情報</h2>
      <h3>ビザの有効期間</h3>
      <p>DTVビザの有効期限は最初の発行から180日間です。その後、タイ国内で1年間の長期滞在許可に変更することができます。</p>

      <h3>必要な月収</h3>
      <p>月収の最低要件は<strong>$2,000（約28万円）相当以上</strong>です。これは給与所得、事業所得、投資収益など、複数の収入源の組み合わせで構いません。</p>

      <h2>申請に必要な書類</h2>
      <ul>
        <li><strong>パスポート</strong>（有効期限6ヶ月以上）</li>
        <li><strong>申請書</strong>（TM.86フォーム - 大使館で入手可能）</li>
        <li><strong>写真</strong>（4x6cm、背景は白）4枚</li>
        <li><strong>銀行口座残高証明書</strong>（月収の3ヶ月分以上）</li>
        <li><strong>雇用契約書または事業証明書</strong></li>
        <li><strong>住所を証明する書類</strong></li>
      </ul>

      <h2>申請手続きのステップ</h2>
      <ol>
        <li><strong>オンラインで予約を取得</strong></li>
        <li><strong>必要書類を準備</strong></li>
        <li><strong>大使館に訪問</strong></li>
        <li><strong>書類提出と簡単なヒアリング</strong></li>
        <li><strong>ビザ受け取り</strong>（通常5営業日後）</li>
      </ol>

      <h2>実際に申請した感想</h2>
      <p>東京大使館は比較的スムーズな対応で知られています。スタッフも親切で、書類不備についても丁寧に教えてくれます。</p>
    `,
  },
  2: {
    title: 'バンコク家賃相場2025：プロンポン vs シーロム',
    category: 'タイ生活',
    author: 'Bangkok Resident',
    date: '2025年4月12日',
    readTime: '6分',
    excerpt: 'DTV取得者向けの最新賃貸情報と、エリア別のメリット・デメリット。',
    content: `<h2>バンコク主要エリアの家賃相場</h2><p>2025年のバンコク家賃相場をまとめました。DTV取得者に人気のエリアを中心に、最新情報をお届けします。</p>`,
  },
  3: {
    title: 'ゴルフスクールDTV：申請から取得まで完全レポート',
    category: 'ソフトパワー',
    author: 'Golf DTV Specialist',
    date: '2025年4月11日',
    readTime: '10分',
    excerpt: '政府認可ゴルフスクールを利用したDTVビザ取得の全プロセスを公開。',
    content: `<h2>ソフトパワービザとは</h2><p>タイ政府が推進する「ソフトパワービザ」は、タイの文化・産業に貢献する外国人を対象にしたビザです。</p>`,
  },
}

export default function ArticlePage({ params }: PageProps) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [locale, setLocale] = useState<Locale>('ja')
  const [article, setArticle] = useState<typeof mockArticlesData[number] | null>(null)

  useEffect(() => {
    params.then(async ({ lang, id }) => {
      const loc = (locales.includes(lang as Locale) ? lang : 'ja') as Locale
      setLocale(loc)
      const dictionary = await getDictionary(loc)
      setDict(dictionary)
      const articleId = parseInt(id)
      setArticle(mockArticlesData[articleId] || null)
    })
  }, [params])

  if (!dict || !article) return null

  return (
    <div className="min-h-screen bg-navy-950 text-white">

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-white/10 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild className="text-navy-300 hover:text-white hover:bg-white/5 gap-2">
            <Link href={`/${locale}`}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">ホームへ戻る</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-navy-400 hover:text-white hover:bg-white/5">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-navy-400 hover:text-white hover:bg-white/5">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="bg-gold-gradient text-navy-950 font-bold border-0 hover:opacity-90 gap-1.5"
              asChild
            >
              <a href="https://discord.gg/dtv-hub" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-3.5 h-3.5" />
                Discord
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Article Content ───────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <article>
          {/* Category */}
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider rounded-full">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-8 text-white tracking-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-navy-400 border-b border-white/10 pb-8 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>読了目安 {article.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 h-80 sm:h-96 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 rounded-2xl flex items-center justify-center text-7xl relative overflow-hidden border border-white/5">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(240,196,60,0.3) 0%, transparent 60%)',
              }}
            />
            <span className="relative z-10">📰</span>
          </div>

          {/* Article Body */}
          <div
            className="article-content mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 py-8 border-t border-white/10">
            <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-navy-300 hover:text-white hover:bg-white/5 gap-2">
              <Bookmark className="w-4 h-4" />
              保存する
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-navy-300 hover:text-white hover:bg-white/5 gap-2">
              <Share2 className="w-4 h-4" />
              シェア
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-navy-300 hover:text-white hover:bg-white/5 gap-2">
              <MessageSquare className="w-4 h-4" />
              コメント
            </Button>
          </div>
        </article>

        {/* ── Discord CTA ─────────────────────────────────────────── */}
        <Card className="mt-10 bg-navy-900 border-gold-500/20 rounded-2xl overflow-hidden">
          <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-5xl">💬</div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white mb-1">Discordコミュニティで質問・相談</h3>
              <p className="text-sm text-navy-400">10,000人以上のDTV取得者・申請中の方が集まるコミュニティ。最新情報をリアルタイムで入手できます。</p>
            </div>
            <Button
              className="flex-shrink-0 bg-gold-gradient text-navy-950 font-bold border-0 hover:opacity-90 gap-2"
              asChild
            >
              <a href="https://discord.gg/dtv-hub" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                無料で参加する
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <section className="mt-16 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8 text-white">関連記事</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: '書類チェックリスト完全版 2025', category: '申請ガイド', date: '2025年4月12日', emoji: '📋' },
              { title: 'バンコクのコンドミニアム選び完全ガイド', category: 'タイ生活', date: '2025年4月11日', emoji: '🏠' },
            ].map((related, idx) => (
              <Link key={idx} href="#" className="group block">
                <Card className="h-full bg-navy-900 border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-36 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center text-5xl relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(240,196,60,0.3) 0%, transparent 70%)' }} />
                      <span className="relative z-10">{related.emoji}</span>
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2 py-0.5 bg-gold-500/15 text-gold-400 text-xs font-bold rounded mb-3">
                        {related.category}
                      </span>
                      <h3 className="font-bold text-base text-white mb-2 group-hover:text-gold-300 transition-colors leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-xs text-navy-500">{related.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Article typography styles */}
      <style>{`
        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid rgba(240,196,60,0.25);
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .article-content p {
          color: #94a3b8;
          font-size: 1.0625rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .article-content ul,
        .article-content ol {
          margin: 1.5rem 0;
          padding-left: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .article-content ul { list-style-type: disc; }
        .article-content ol { list-style-type: decimal; }
        .article-content li {
          color: #94a3b8;
          font-size: 1.0625rem;
          line-height: 1.7;
        }
        .article-content strong {
          font-weight: 700;
          color: #f0c43c;
        }
        .article-content a {
          color: #f0c43c;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-content a:hover { color: #fbbf24; }
      `}</style>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8 py-10 bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-navy-600">
          <p>{dict.footer.legal}</p>
        </div>
      </footer>
    </div>
  )
}
