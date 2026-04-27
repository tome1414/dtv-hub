import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import type { BlogPost, BlogPostMeta, BlogFrontmatter, Lang } from '@/types/blog'

const contentDir = path.join(process.cwd(), 'src/content/blog')

export function getBlogPostSlugs(lang: Lang): string[] {
  const langDir = path.join(contentDir, lang)
  if (!fs.existsSync(langDir)) return []
  return fs.readdirSync(langDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export async function getBlogPost(slug: string, lang: Lang): Promise<BlogPost | null> {
  const filePath = path.join(contentDir, lang, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
  const contentHtml = processed.toString()

  return {
    ...(data as BlogFrontmatter),
    content,
    contentHtml,
  }
}

export function getBlogPostMeta(slug: string, lang: Lang): BlogPostMeta | null {
  const filePath = path.join(contentDir, lang, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data as BlogPostMeta
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split('\n')
  const items: TocItem[] = []
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w぀-ヿ㐀-鿿]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      items.push({ id, text, level })
    }
  }
  return items
}

export function getAllBlogPostsMeta(lang: Lang): BlogPostMeta[] {
  const slugs = getBlogPostSlugs(lang)
  return slugs
    .map(slug => getBlogPostMeta(slug, lang))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
}
