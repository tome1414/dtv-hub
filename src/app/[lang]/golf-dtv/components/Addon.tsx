import Link from 'next/link'

interface AddonData {
  label: string
  title: string
  description: string
  price: number
  features: string[]
  cta: string
}

export default function GolfDTVAddon({ data }: { data: AddonData }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900/50 border-t border-gold-500/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold-400 mb-3">
            {data.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">{data.title}</h2>
          <p className="text-navy-300 text-base leading-relaxed">{data.description}</p>
        </div>

        {/* Addon Card */}
        <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-b from-gold-500/5 to-transparent p-8 sm:p-12">
          {/* Price */}
          <div className="mb-8 pb-8 border-b border-gold-500/10">
            <p className="text-navy-400 text-sm mb-2">追加料金</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-serif font-bold text-gold-400">{data.price.toLocaleString()}</span>
              <span className="text-navy-400 text-sm pb-1">THB</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8 space-y-3">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold-400 text-xs font-bold">✓</span>
                </div>
                <p className="text-navy-200 text-sm pt-0.5">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="#inquiry"
            className="inline-block py-3 px-6 rounded-lg bg-gold-500 text-navy-950 font-bold text-sm hover:bg-gold-400 transition-colors"
          >
            {data.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
