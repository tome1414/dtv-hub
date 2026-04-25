'use client'

import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gtmEvents } from '@/lib/analytics'

interface DiscordCTAProps {
  label: string
  source?: string
}

export function DiscordCTA({ label, source = 'unknown' }: DiscordCTAProps) {
  const handleClick = () => {
    gtmEvents.discordClick(source)
  }

  return (
    <Button
      size="lg"
      className="inline-flex items-center gap-3 px-10 py-5 h-auto bg-gold-gradient text-navy-950 font-black text-lg rounded-2xl border-0 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-2xl shadow-gold-500/30"
      onClick={handleClick}
      asChild
    >
      <a href="https://discord.gg/dtv-hub" target="_blank" rel="noopener noreferrer">
        <MessageSquare className="w-6 h-6" />
        {label}
      </a>
    </Button>
  )
}
