interface TrustData {
  successRate: string
  title: string
  items: string[]
}

export default function GolfDTVTrust({ data }: { data: TrustData }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900/50 border-y border-gold-500/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Success Rate */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="text-sm text-gold-400 font-semibold tracking-widest uppercase">成功率</span>
            </div>
            <div className="mb-4">
              <span className="text-7xl font-bold text-gold-400">{data.successRate}</span>
            </div>
            <p className="text-navy-300">のDTV取得成功実績</p>
          </div>

          {/* Right: Trust items */}
          <div className="space-y-4">
            {data.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-lg bg-white/5 border border-gold-500/10">
                <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gold-400 text-sm font-bold">✓</span>
                </div>
                <p className="text-navy-200 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
