/**
 * Google Tag Manager イベント定義
 * GTM コンテナ ID: GT-T9B83QQ5
 * GA4 測定 ID: G-FNC897EGPG
 */

export const gtmEvents = {
  // Golf DTV リンククリック
  golfDtvClick: (source: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'golf_dtv_click',
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // CTA クリック（問い合わせ、詳細見るなど）
  ctaClick: (ctaType: string, source: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        cta_type: ctaType, // 'contact', 'details', 'discord', etc.
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // Discord リンククリック
  discordClick: (source: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'discord_click',
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // ブログ記事クリック
  blogArticleClick: (articleTitle: string, articleUrl: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'blog_article_click',
        article_title: articleTitle,
        article_url: articleUrl,
        timestamp: new Date().toISOString(),
      })
    }
  },

  // 内部リンククリック
  internalLinkClick: (linkText: string, linkUrl: string, source: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'internal_link_click',
        link_text: linkText,
        link_url: linkUrl,
        source_page: source,
        timestamp: new Date().toISOString(),
      })
    }
  },
}
