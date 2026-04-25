/**
 * Google Analytics イベント追跡
 */

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// 主要なイベント
export const analytics = {
  // フォーム関連
  formSubmit: (planName?: string) => trackEvent('form_submit', { plan: planName }),
  formError: (errorMessage?: string) => trackEvent('form_error', { error: errorMessage }),

  // セクション関連
  sectionView: (sectionName: string) => trackEvent('section_view', { section: sectionName }),

  // ボタンクリック
  buttonClick: (buttonName: string) => trackEvent('button_click', { button: buttonName }),

  // リンククリック
  linkClick: (url: string, text?: string) => trackEvent('link_click', { url, text }),

  // 言語変更
  languageChange: (language: string) => trackEvent('language_change', { language }),

  // ハンバーガーメニュー
  menuToggle: (isOpen: boolean) => trackEvent('menu_toggle', { menu_open: isOpen }),

  // スクロール深度
  scrollDepth: (percentage: number) => trackEvent('scroll_depth', { scroll_percentage: percentage }),
}

// グローバル window オブジェクトの拡張
declare global {
  interface Window {
    gtag: any
  }
}
