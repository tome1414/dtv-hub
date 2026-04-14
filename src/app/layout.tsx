import type { Metadata } from 'next'
import { Inter, Geist_Mono, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    template: '%s | DTV HUB',
    default: 'DTV HUB | Thailand Destination Thailand Visa Portal',
  },
  description: 'The most comprehensive portal for Thailand\'s DTV visa.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={cn(inter.variable, geistMono.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  )
}
