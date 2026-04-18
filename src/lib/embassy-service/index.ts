import embassiesData from '@/data/embassies/embassies.json'

export interface Embassy {
  id: string
  country: string
  countryJa: string
  city: string
  cityJa: string
  name: string
  nameJa: string
  type: string
  website: string
  notes: string
  latitude: number | null
  longitude: number | null
}

export function getEmbassyById(id: string): Embassy | null {
  return (embassiesData as Embassy[]).find((e) => e.id === id) || null
}

export function getEmbassiesByCountry(country: string): Embassy[] {
  return (embassiesData as Embassy[]).filter((e) => e.country === country)
}

export function getRelatedEmbassies(embassy: Embassy, limit = 3): Embassy[] {
  return getEmbassiesByCountry(embassy.country)
    .filter((e) => e.id !== embassy.id)
    .slice(0, limit)
}

export function getAllEmbassies(): Embassy[] {
  return embassiesData as Embassy[]
}

export function getEmbassyMetadata(embassy: Embassy, locale: string) {
  const isJa = locale === 'ja'
  const name = isJa ? embassy.nameJa : embassy.name
  const city = isJa ? embassy.cityJa : embassy.city

  return {
    title: isJa
      ? `${name} | DTV ビザ申請ガイド | DTV Club`
      : `${name} | DTV Visa Application | DTV Club`,
    description: isJa
      ? `${city}のタイ大使館・領事館でのDTVビザ申請について。住所、電話、営業時間、申請条件をご紹介。`
      : `Complete guide to DTV visa at ${name}. Address, contact info, office hours, and application requirements.`,
    keywords: isJa
      ? `DTV ビザ ${embassy.country} 申請, タイ大使館 ${city}, 長期滞在`
      : `DTV visa ${embassy.country}, Thai embassy ${city}, long-term residence`,
  }
}

export function getEmbassyJsonLd(embassy: Embassy, baseUrl: string, locale: string) {
  const isJa = locale === 'ja'

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: isJa ? embassy.nameJa : embassy.name,
    description: isJa ? `タイ王国領事館` : 'Thai Embassy/Consulate',
    url: embassy.website,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TH',
    },
    ...(embassy.latitude &&
      embassy.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: embassy.latitude,
          longitude: embassy.longitude,
        },
      }),
  }
}
