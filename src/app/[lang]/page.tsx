import Link from 'next/link'
import {
  Search,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Users,
  Clock,
  Languages,
  Star,
  Shield,
  TrendingUp,
} from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Locale
  const dict = await getDictionary(locale)

  return (
    <>
      {/* ── AI Summary (screen-reader / crawler only) ───────────────── */}
      <p className="sr-only" aria-hidden="true">
        {dict.aiSummary}
      </p>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-16"
        aria-label="Hero"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(240,196,60,0.3) 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
            <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
              {dict.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            {dict.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-navy-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {dict.hero.subheadline}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-gold-500/30 rounded-2xl p-2 focus-within:border-gold-400 transition-colors shadow-2xl shadow-black/30">
              <Search className="w-5 h-5 text-navy-400 ml-3 flex-shrink-0" />
              <input
                type="search"
                placeholder={dict.hero.searchPlaceholder}
                className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-navy-400 text-base outline-none"
                aria-label="Search"
              />
              <Button
                size="sm"
                className="px-5 py-2.5 h-auto bg-gold-gradient text-navy-950 font-bold text-sm rounded-xl flex-shrink-0 border-0 hover:opacity-90 shadow-lg"
              >
                {dict.hero.searchButton}
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-14 text-sm text-navy-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-500" />
              <span>10,000+ members</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold-500" />
              <span>Trusted since 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-gold-500" />
              <span>5 languages</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </div>
      </section>

      {/* ── Category Explorer ─────────────────────────────────────────── */}
      <section className="py-24 bg-navy-950" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              id="categories-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              {dict.categories.title}
            </h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.categories.items.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="group block">
                <Card className="h-full bg-navy-900 border-white/5 hover:border-gold-500/40 hover:bg-navy-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/10 rounded-2xl relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-navy-400 leading-relaxed">{item.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>詳しく見る</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gold-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Updates / Knowledge Base ───────────────────────────── */}
      <section className="py-24 bg-navy-900" aria-labelledby="updates-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <h2
                id="updates-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
              >
                {dict.updates.title}
              </h2>
              <p className="text-navy-400 max-w-xl">{dict.updates.subtitle}</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-gold-400 hover:text-gold-300 hover:bg-transparent flex-shrink-0 gap-1">
              <Link href={`/${locale}/knowledge`}>
                すべて見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.updates.articles.map((article, i) => (
              <Card
                key={i}
                className="group bg-navy-950 border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 rounded-2xl overflow-hidden"
              >
                <CardHeader className="p-0">
                  {/* Article image placeholder */}
                  <div className="h-44 bg-gradient-to-br from-navy-800 to-navy-900 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 30% 70%, rgba(240,196,60,0.4) 0%, transparent 60%)',
                      }}
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500/20 border border-gold-500/30 rounded-full text-xs font-semibold text-gold-400">
                      {article.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-navy-400 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-navy-500">
                      <Clock className="w-3.5 h-3.5" />
                      {article.date}
                    </div>
                    <span className="text-xs font-semibold text-gold-500 group-hover:text-gold-400 transition-colors">
                      {dict.updates.readMore} →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Services Banner ───────────────────────────────────── */}
      <section
        className="py-24 bg-hero-gradient relative overflow-hidden"
        aria-labelledby="premium-heading"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(240,196,60,0.4) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gold-500 text-navy-950 text-xs font-black rounded-full uppercase tracking-wider">
                  {dict.premium.badge}
                </span>
                <div className="flex items-center gap-1.5 text-sm text-gold-400 font-semibold">
                  <Shield className="w-4 h-4" />
                  {dict.premium.guarantee}
                </div>
              </div>

              <h2
                id="premium-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                {dict.premium.title}
              </h2>

              <p className="text-xl text-gold-400 font-semibold">{dict.premium.subtitle}</p>

              <ul className="space-y-3">
                {dict.premium.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-200 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="inline-flex items-center gap-3 px-8 py-4 h-auto bg-gold-gradient text-navy-950 font-black text-base rounded-2xl border-0 hover:opacity-90 shadow-2xl shadow-gold-500/30 mt-4"
                asChild
              >
                <Link href={`/${locale}/soft-power`}>
                  {dict.premium.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Visual card */}
            <div className="relative">
              <Card className="bg-navy-900/80 backdrop-blur-sm border-gold-500/30 rounded-3xl shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gold-gradient rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      ⛳
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Golf School DTV</div>
                      <div className="text-navy-400 text-sm">Soft Power Program</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: '取得成功率', value: '98%' },
                      { label: 'プログラム期間', value: '5日間' },
                      { label: '返金保証', value: '100%' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex justify-between items-center py-2.5 border-b border-white/5"
                      >
                        <span className="text-navy-400 text-sm">{stat.label}</span>
                        <span className="text-gold-400 font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-4 text-center">
                    <p className="text-gold-300 text-sm font-semibold">
                      🏅 タイ政府公認プログラム
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gold-gradient text-navy-950 text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                全額返金保証
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community CTA ─────────────────────────────────────────────── */}
      <section
        className="py-24 bg-navy-950 relative overflow-hidden"
        aria-labelledby="community-heading"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full mb-8">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-2 border-navy-950"
                />
              ))}
            </div>
            <span className="text-gold-400 text-sm font-bold">{dict.community.memberCount}</span>
          </div>

          <h2
            id="community-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            {dict.community.title}
          </h2>

          <p className="text-lg text-navy-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {dict.community.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {dict.community.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-gold-400 mb-1">{stat.value}</div>
                <div className="text-xs text-navy-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="inline-flex items-center gap-3 px-10 py-5 h-auto bg-gold-gradient text-navy-950 font-black text-lg rounded-2xl border-0 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-2xl shadow-gold-500/30"
            asChild
          >
            <a href="https://discord.gg/dtv-hub" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-6 h-6" />
              {dict.community.cta}
            </a>
          </Button>

          <p className="mt-4 text-xs text-navy-600">無料 · 登録不要 · 即時参加</p>
        </div>
      </section>

      {/* ── Design Variant Selector ───────────────────────────────────── */}
      <section className="py-12 bg-navy-900 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-navy-400 mb-4">🎨 デザインバリアント</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-gold-400 font-semibold">Original (現在)</span>
            <span className="text-navy-600">|</span>
            <Link href={`/${locale}/modern`} className="text-gold-400 hover:text-gold-300 transition-colors">Modern</Link>
            <span className="text-navy-600">|</span>
            <Link href={`/${locale}/light`} className="text-gold-400 hover:text-gold-300 transition-colors">Light</Link>
            <span className="text-navy-600">|</span>
            <Link href={`/${locale}/dark`} className="text-gold-400 hover:text-gold-300 transition-colors">Dark</Link>
            <span className="text-navy-600">|</span>
            <Link href={`/${locale}/wired`} className="text-gold-400 hover:text-gold-300 transition-colors">WIRED</Link>
          </div>
        </div>
      </section>
    </>
  )
}
