'use client'

import { useState } from 'react'
import type { Locale } from '@/middleware'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Question {
  q: string
  a: string
}

interface Category {
  id: string
  name: string
  questions: Question[]
}

interface FaqData {
  title: string
  categories: Category[]
}

export default function GolfDTVFaq({ data, locale }: { data: FaqData; locale: Locale }) {
  const [openCategory, setOpenCategory] = useState<string>('A')
  const [openQuestion, setOpenQuestion] = useState<string>(`A-0`)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">{data.title}</h2>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {data.categories.map((category) => (
            <div key={category.id} className="rounded-xl border border-gold-500/10 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => setOpenCategory(openCategory === category.id ? '' : category.id)}
                className="w-full px-6 py-4 bg-navy-900/50 hover:bg-navy-900/80 transition-colors flex items-center justify-between group"
              >
                <h3 className="text-lg font-bold text-white text-left">{category.name}</h3>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gold-400 transition-transform duration-300 flex-shrink-0',
                    openCategory === category.id && 'rotate-180'
                  )}
                />
              </button>

              {/* Category Content */}
              {openCategory === category.id && (
                <div className="bg-navy-950/50 border-t border-gold-500/10 space-y-0">
                  {category.questions.map((question, qIdx) => {
                    const questionId = `${category.id}-${qIdx}`
                    const isOpen = openQuestion === questionId

                    return (
                      <div key={qIdx} className="border-b border-gold-500/10 last:border-b-0">
                        <button
                          onClick={() => setOpenQuestion(isOpen ? '' : questionId)}
                          className="w-full px-6 py-4 flex items-start gap-4 hover:bg-white/5 transition-colors text-left group"
                        >
                          <span className="text-gold-400 font-bold text-sm flex-shrink-0 pt-1">Q{qIdx + 1}</span>
                          <div className="flex-1">
                            <p className="text-navy-200 font-semibold group-hover:text-gold-400 transition-colors">
                              {question.q}
                            </p>
                          </div>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 text-gold-400/60 transition-transform duration-300 flex-shrink-0 mt-1',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        {/* Answer */}
                        {isOpen && (
                          <div className="px-6 pb-4 bg-white/5 border-t border-gold-500/10">
                            <div className="flex gap-4">
                              <span className="text-gold-400/60 font-bold text-sm flex-shrink-0">A</span>
                              <p className="text-navy-300 text-sm leading-relaxed">{question.a}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
