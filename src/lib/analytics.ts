/**
 * Google Tag Manager イベント定義
 * GTM コンテナ ID: GT-T9B83QQ5
 * GA4 測定 ID: G-FNC897EGPG
 */

// Legacy analytics object for Golf DTV page compatibility
export const analytics = {
  languageChange: (locale: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'language_change',
        language: locale,
        timestamp: new Date().toISOString(),
      })
    }
  },
  sectionView: (section: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'section_view',
        section: section,
        timestamp: new Date().toISOString(),
      })
    }
  },
  scrollDepth: (depth: number) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'scroll_depth',
        depth: depth,
        timestamp: new Date().toISOString(),
      })
    }
  },
  menuToggle: (isOpen: boolean) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'menu_toggle',
        state: isOpen ? 'open' : 'closed',
        timestamp: new Date().toISOString(),
      })
    }
  },
  formSubmit: (formType: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submit',
        form_type: formType,
        timestamp: new Date().toISOString(),
      })
    }
  },
  formError: (errorType: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_error',
        error_type: errorType,
        timestamp: new Date().toISOString(),
      })
    }
  },
}

export const gtmEvents = {
  // Golf DTV リンククリック
  golfDtvClick: (source: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'golf_dtv_click',
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // CTA クリック（問い合わせ、詳細見るなど）
  ctaClick: (ctaType: string, source: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'cta_click',
        cta_type: ctaType, // 'contact', 'details', 'discord', etc.
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // Discord リンククリック
  discordClick: (source: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'discord_click',
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // ブログ記事クリック
  blogArticleClick: (articleTitle: string, articleUrl: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'blog_article_click',
        article_title: articleTitle,
        article_url: articleUrl,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // 内部リンククリック
  internalLinkClick: (linkText: string, linkUrl: string, source: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'internal_link_click',
        link_text: linkText,
        link_url: linkUrl,
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },
}
