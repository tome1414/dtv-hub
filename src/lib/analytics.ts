/**
 * Analytics helpers — GolfDTV dataLayer events
 * GTM Container: GTM-WKL9MZMB
 * GA4 Measurement ID: G-FNC897EGPG (managed inside GTM — verify tag in GTM before use)
 */

// ─── Global type ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

// ─── Production guard ────────────────────────────────────────────────────────
// Events fire only on the production hostname.
// GTM Preview Mode runs as a browser overlay on the live site,
// so hostname stays "dtvclub.com" — Preview testing continues to work.

function isProduction(): boolean {
  if (typeof window === 'undefined') return false
  const { hostname } = window.location
  return hostname === 'dtvclub.com' || hostname === 'www.dtvclub.com'
}

function push(payload: Record<string, unknown>): void {
  if (!isProduction()) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

// ─── GolfDTV LP events ───────────────────────────────────────────────────────

export function pushGolfDtvView(lang: string): void {
  push({
    event: 'golf_dtv_view',
    page_language: lang,
    page_type: 'golf_dtv_lp',
  })
}

export function pushGolfDtvCtaClick(
  lang: string,
  ctaName: string,
  destination: string,
): void {
  push({
    event: 'golf_dtv_cta_click',
    page_language: lang,
    cta_name: ctaName,
    destination,
  })
}

export function pushGolfDtvFormStart(lang: string): void {
  push({
    event: 'golf_dtv_form_start',
    page_language: lang,
    form_name: 'golf_dtv_inquiry',
  })
}

export function pushGolfDtvLead(
  lang: string,
  selectedPlan: 'silver' | 'gold' | 'platinum' | 'undecided',
  agencyService: boolean,
  fiveYearPlan: boolean,
  annualRenewal: boolean,
): void {
  push({
    event: 'golf_dtv_lead',
    page_language: lang,
    form_name: 'golf_dtv_inquiry',
    selected_plan: selectedPlan,
    agency_service: agencyService,
    five_year_plan: fiveYearPlan,
    annual_renewal: annualRenewal,
  })
}

export function pushGolfDtvFormError(
  lang: string,
  errorType: 'validation' | 'api' | 'network' | 'unknown',
): void {
  push({
    event: 'golf_dtv_form_error',
    page_language: lang,
    form_name: 'golf_dtv_inquiry',
    error_type: errorType,
  })
}

// ─── Legacy exports ───────────────────────────────────────────────────────────
// Used by GolfDTVClient (scroll / menu tracking) and golf-dtv-cta.tsx.
// All calls respect the production guard via push().

export const analytics = {
  languageChange: (locale: string) => {
    push({ event: 'language_change', language: locale })
  },
  sectionView: (section: string) => {
    push({ event: 'section_view', section })
  },
  scrollDepth: (depth: number) => {
    push({ event: 'scroll_depth', depth })
  },
  menuToggle: (isOpen: boolean) => {
    push({ event: 'menu_toggle', state: isOpen ? 'open' : 'closed' })
  },
  formSubmit: (formType: string) => {
    push({ event: 'form_submit', form_type: formType })
  },
  formError: (errorType: string) => {
    push({ event: 'form_error', error_type: errorType })
  },
}

export const gtmEvents = {
  golfDtvClick: (source: string) => {
    push({ event: 'golf_dtv_click', source_page: source })
  },
  ctaClick: (ctaType: string, source: string) => {
    push({ event: 'cta_click', cta_type: ctaType, source_page: source })
  },
  discordClick: (source: string) => {
    push({ event: 'discord_click', source_page: source })
  },
  blogArticleClick: (articleTitle: string, articleUrl: string) => {
    push({ event: 'blog_article_click', article_title: articleTitle, article_url: articleUrl })
  },
  internalLinkClick: (linkText: string, linkUrl: string, source: string) => {
    push({ event: 'internal_link_click', link_text: linkText, link_url: linkUrl, source_page: source })
  },
}
