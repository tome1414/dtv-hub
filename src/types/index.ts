import type { Locale } from '@/middleware'

export type { Locale }

export interface Dictionary {
  meta: {
    title: string
    description: string
    siteName: string
  }
  nav: {
    guide: string
    requirements: string
    life: string
    softPower: string
    joinDiscord: string
  }
  hero: {
    headline: string
    subheadline: string
    searchPlaceholder: string
    searchButton: string
    badge: string
  }
  categories: {
    title: string
    items: {
      icon: string
      title: string
      description: string
      href: string
    }[]
  }
  updates: {
    title: string
    subtitle: string
    readMore: string
    articles: {
      category: string
      title: string
      excerpt: string
      date: string
    }[]
  }
  premium: {
    badge: string
    title: string
    subtitle: string
    features: string[]
    cta: string
    guarantee: string
  }
  community: {
    memberCount: string
    title: string
    description: string
    cta: string
    stats: { value: string; label: string }[]
  }
  footer: {
    tagline: string
    links: { label: string; href: string }[]
    legal: string
  }
  aiSummary: string
}
