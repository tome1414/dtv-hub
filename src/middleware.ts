import { NextRequest, NextResponse } from 'next/server'

export const locales = ['ja', 'en', 'zh', 'ko', 'ru'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

function getLocaleFromAcceptLanguage(request: NextRequest): Locale {
  const acceptLang = request.headers.get('accept-language') ?? ''
  for (const segment of acceptLang.split(',')) {
    const lang = segment.split(';')[0].trim().toLowerCase()
    const twoChar = lang.slice(0, 2) as Locale
    if ((locales as readonly string[]).includes(twoChar)) return twoChar
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, _next internals, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to detected locale
  const locale = getLocaleFromAcceptLanguage(request)
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
