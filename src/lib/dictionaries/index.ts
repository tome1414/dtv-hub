import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ja: () => import('./ja').then((m) => m.default),
  en: () => import('./en').then((m) => m.default),
  zh: () => import('./zh').then((m) => m.default),
  ko: () => import('./ko').then((m) => m.default),
  ru: () => import('./ru').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
