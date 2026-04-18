'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  isJa: boolean
}

export default function BackButton({ isJa }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-6 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm">{isJa ? '戻る' : 'Back'}</span>
    </button>
  )
}
