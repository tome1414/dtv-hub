/**
 * GolfDTV Application Support (申請代行) price — single source of truth for
 * values that are shown outside the dictionaries (e.g. the admin notification
 * email). Dictionaries' `addon.price` also reads this constant.
 *
 * NOTE: This is the GolfDTV service fee, NOT the Thai government visa fee
 * (~10,000 THB, nationality-dependent) and NOT the dependent support fee.
 */
export const APPLICATION_SUPPORT_PRICE_THB = 20000

export const formatThb = (amount: number): string => amount.toLocaleString('en-US')

/** Label used for the 申請代行 row of the inquiry notification email. */
export function agencyServiceEmailLabel(wanted: boolean): string {
  return wanted ? `希望する (+${formatThb(APPLICATION_SUPPORT_PRICE_THB)} THB)` : '希望しない'
}
