import Link from 'next/link'
import type { Locale } from '@/middleware'

interface Plan {
  name: string
  price: number
  currency: string
  period: string
  badge?: string
  description: string
  features: {
    text: string
    included: boolean
    note?: string
  }[]
  cta: string
}

interface PlansData {
  intro: string
  subtext: string
  items: Plan[]
}

export default function GolfDTVPlans({ data, locale }: { data: PlansData; locale: Locale }) {
  return (
    <section id="plans" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">{data.intro}</h2>
          <p className="text-navy-400 text-sm max-w-xl mx-auto leading-relaxed">{data.subtext}</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
          {data.items.map((plan, idx) => {
            const isFeatured = plan.badge === 'Most Popular'
            return (
              <div
                key={idx}
                className={`relative rounded-2xl overflow-hidden border ${
                  isFeatured
                    ? 'border-gold-500/30 shadow-2xl shadow-gold-500/10 scale-105 lg:scale-110'
                    : 'border-gold-500/10 shadow-lg'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-block bg-gold-500 text-navy-950 text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header Section */}
                <div
                  className={`px-8 py-8 ${
                    isFeatured
                      ? 'bg-gradient-to-b from-gold-500/10 to-transparent border-b border-gold-500/20'
                      : 'bg-navy-900/50 border-b border-gold-500/10'
                  }`}
                >
                  <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${isFeatured ? 'text-gold-400' : 'text-gold-300'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-serif font-bold text-white">{plan.price.toLocaleString()}</span>
                    <span className="text-navy-400 text-sm pb-1">
                      {plan.currency} / {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-navy-400">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="px-8 py-8 space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included ? 'bg-gold-500/20' : 'bg-white/5'
                      }`}>
                        {feature.included ? (
                          <span className="text-gold-400 text-xs font-bold">✓</span>
                        ) : (
                          <span className="text-navy-500 text-xs font-bold">◎</span>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm ${feature.included ? 'text-navy-200 font-medium' : 'text-navy-400'}`}>
                          {feature.text}
                        </p>
                        {feature.note && <p className="text-xs text-navy-500 mt-0.5">{feature.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="px-8 pb-8">
                  <Link
                    href="#inquiry"
                    className={`block py-3 px-4 rounded-lg text-center font-bold text-sm transition-all ${
                      isFeatured
                        ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                        : 'bg-white/5 text-gold-400 hover:bg-white/10 border border-gold-500/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
