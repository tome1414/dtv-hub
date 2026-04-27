import type { MetadataRoute } from 'next'
import { getBlogPostSlugs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dtvclub.com'
  const locales = ['ja', 'en']

  const staticPages = [
    '',
    '/golf-dtv',
    '/blog',
    '/embassy-map',
    '/requirements',
    '/soft-power',
    '/dtv-application',
    '/dtv-soft-power-vs-freelance',
    '/who-should-choose-golf-dtv',
  ]

  const urls: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }

    const blogSlugs = getBlogPostSlugs(locale as 'ja' | 'en')
    for (const slug of blogSlugs) {
      urls.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return urls
}
