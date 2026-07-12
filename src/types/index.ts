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
      feeNote: string  // Fee note disclaimer for visa application fees
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
    fiveYearPlan?: {
      badge: string
      title: string
      discount: string
      description: string
      note: string
      cta: string
    }
    annualRenewal?: {
      badge: string
      title: string
      discount: string
      description: string
      note: string
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
      phases: {
        number: string
        title: string
        duration?: string
        note?: string
        steps: {
          number: string
          title: string
          body?: string
        }[]
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
      sourceLabel?: string
      sourceNote?: string
      sourceOptions?: string[]
      referralLabel: string
      referralNote: string
      referralPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      privacyConsent: string
      refundPolicyConsent?: string
      restrictedWarning?: {
        title: string
        bullets: string[]
        footer: string
      }
      successMessage: string
    }
    nav: {
      plans: string
      flow: string
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
    affiliate?: {
      footerLink: string
      footerDesc: string
      footerCta: string
      modalTitle: string
      modalDesc: string
      nameLabel: string
      emailLabel: string
      platformLabel: string
      platformPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      required: string
      submit: string
      success: string
    }
    legal?: {
      title: string
      sections: {
        id: string
        title: string
        rows: [string, string][]
      }[]
      privacy: {
        intro: string
        items: [string, string][]
        date: string
      }
    }
  }
}
