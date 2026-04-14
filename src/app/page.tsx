import { redirect } from 'next/navigation'

// Root "/" redirects to default locale (ja)
// The middleware also handles this, but this is a fallback.
export default function RootPage() {
  redirect('/ja')
}
