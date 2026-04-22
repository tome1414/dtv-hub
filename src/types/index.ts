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
  golfDTV?: {
    meta: {
      title: string
      description: string
    }
    hero: {
      badge: string
      headline: string
      subheadline: string
      cta: string
    }
    plans: {
      intro: string
      subtext: string
      items: {
        name: string
        price: number
        currency: string
        period: string
        badge?: string
        description: string
        features: {
          text: string
          included: boolean
          note?: string
        }[]
        cta: string
      }[]
    }
    addon: {
      label: string
      title: string
      description: string
      price: number
      features: string[]
      cta: string
    }
    faq: {
      title: string
      categories: {
        id: string
        name: string
        questions: {
          q: string
          a: string
        }[]
      }[]
    }
    inquiry: {
      title: string
      description: string
      steps: {
        number: number
        label: string
      }[]
      cta: string
    }
    trust: {
      successRate: string
      title: string
      items: string[]
    }
    whySafe: {
      sectionLabel: string
      title: string
      items: {
        number: string
        title: string
        subtitle: string
        body: string
      }[]
    }
    flow: {
      sectionLabel: string
      title: string
      steps: {
        number: string
        icon: string
        title: string
        body: string
      }[]
    }
    ticker: string[]
    form: {
      planLabel: string
      planPlaceholder: string
      planUndecided: string
      agencyLabel: string
      agencyBullets: string[]
      nationalityLabel: string
      nationalityPlaceholder: string
      nameLabel: string
      emailLabel: string
      required: string
      referralLabel: string
      referralNote: string
      referralPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      privacyConsent: string
      successMessage: string
    }
    nav: {
      plans: string
      faq: string
      inquiry: string
    }
    footerNav: {
      about: string
      services: string
      support: string
      serviceLinks: string[][]
      supportLinks: string[][]
      copyright: string
      disclaimer: string
    }
  }
}
