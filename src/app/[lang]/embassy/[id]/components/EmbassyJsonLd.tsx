import type { Embassy } from '@/lib/embassy-service'
import { getEmbassyJsonLd } from '@/lib/embassy-service'

interface EmbassyJsonLdProps {
  embassy: Embassy
  locale: string
}

export default function EmbassyJsonLd({ embassy, locale }: EmbassyJsonLdProps) {
  const jsonLd = getEmbassyJsonLd(embassy, 'https://dtvclub.com', locale)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
