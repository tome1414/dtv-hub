import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dtvclub.com'
  const locales = ['ja', 'en', 'zh', 'ko', 'ru']

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
        changeFrequency: page === '/golf-dtv' ? 'daily' : 'weekly',
        priority: page === '' || page === '/golf-dtv' ? 1.0 : 0.8,
      })
    }

    // Get blog slugs directly from filesystem
    const langDir = path.join(process.cwd(), 'src/content/blog', locale)
    if (fs.existsSync(langDir)) {
      const slugs = fs.readdirSync(langDir)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace(/\.md$/, ''))

      for (const slug of slugs) {
        urls.push({
          url: `${baseUrl}/${locale}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  return urls
}
