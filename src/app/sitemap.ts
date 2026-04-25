import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dtvclub.com'
  const locales = ['ja', 'en']

  // Static pages
  const staticPages = [
    '',
    '/golf-dtv',
    '/blog',
    '/embassy-map',
  ]

  const urls: MetadataRoute.Sitemap = []

  // Add all locale + page combinations
  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  return urls
}
