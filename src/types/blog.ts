export type ArticleType = 'comparison' | 'guide' | 'process' | 'local' | 'product_bridge'
export type PrimaryCategory = 'basic' | 'process' | 'documents' | 'comparison' | 'soft-power' | 'freelance' | 'locations' | 'life-in-thailand'
export type SearchIntentType = 'informational' | 'comparison' | 'transactional'
export type MonetizationType = 'none' | 'soft-consultation' | 'golf-dtv'
export type UpdatePriority = 'high' | 'medium' | 'low'
export type ImageStyle = 'comparison' | 'guide' | 'process' | 'local' | 'product'
export type SchemaType = 'Article' | 'FAQPage' | 'BreadcrumbList'
export type Lang = 'ja' | 'en' | 'zh-hans'

export interface BlogFrontmatter {
  title: string
  slug: string
  lang: Lang
  published_at: string
  updated_at: string
  primary_keyword: string
  secondary_keywords: string[]
  article_type: ArticleType
  primary_category: PrimaryCategory
  secondary_category?: PrimaryCategory
  search_intent_type: SearchIntentType
  monetization_type: MonetizationType
  update_priority: UpdatePriority
  primary_cta: string
  secondary_cta: string
  must_link_pages: string[]
  schema_types: SchemaType[]
  image_style: ImageStyle
  translation_targets: Lang[]
  avoid_topics: string[]
  excerpt: string
  read_time_minutes: number
}

export interface BlogPost extends BlogFrontmatter {
  content: string
  contentHtml: string
}

export interface BlogPostMeta extends BlogFrontmatter {
  // フロントマターのみ（一覧表示用）
}
