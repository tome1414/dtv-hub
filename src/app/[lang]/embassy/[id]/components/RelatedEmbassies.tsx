import Link from 'next/link'
import { Globe } from 'lucide-react'
import type { Embassy } from '@/lib/embassy-service'

interface RelatedEmbassiesProps {
  embassies: Embassy[]
  locale: string
  className?: string
}

export default function RelatedEmbassies({
  embassies,
  locale,
  className,
}: RelatedEmbassiesProps) {
  const isJa = locale === 'ja'

  if (embassies.length === 0) return null

  return (
    <div className={`bg-navy-900 rounded-lg p-6 border border-white/10 ${className}`}>
      <h3 className="text-lg font-bold mb-4">
        {isJa ? 'この国の他の領事館' : 'Other Embassies in This Country'}
      </h3>
      <div className="space-y-3">
        {embassies.map((embassy) => (
          <Link
            key={embassy.id}
            href={`/${locale}/embassy/${embassy.id}`}
            className="block p-3 rounded-lg bg-navy-800 hover:bg-navy-700 border border-white/10 hover:border-gold-400 transition-all group"
          >
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm group-hover:text-gold-400 transition-colors">
                  {isJa ? embassy.nameJa : embassy.name}
                </div>
                <div className="text-xs text-navy-400">
                  {isJa ? embassy.cityJa : embassy.city}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
