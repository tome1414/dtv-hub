'use client'

import { ArrowLeft, MapPin, Globe, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Embassy {
  id: string
  country: string
  city: string
  name: string
  nameJa: string
  website: string
  latitude: number | null
  longitude: number | null
}

interface Continent {
  name: string
  nameJa: string
  emoji: string
}

interface SidePanelProps {
  navigationLevel: 'continent' | 'country' | 'embassy'
  continents: Record<string, Continent>
  selectedContinent: string | null
  selectedCountry: string | null
  embassiesByContinent: Record<string, Map<string, Embassy[]>>
  currentEmbassies: Embassy[]
  onContinentSelect: (continent: any) => void
  onCountrySelect: (country: string) => void
  onBack: () => void
  locale: string
}

export default function SidePanel({
  navigationLevel,
  continents,
  selectedContinent,
  selectedCountry,
  embassiesByContinent,
  currentEmbassies,
  onContinentSelect,
  onCountrySelect,
  onBack,
  locale,
}: SidePanelProps) {
  const isJapanese = locale === 'ja'

  return (
    <div className="w-full lg:w-80 bg-navy-900 border-r border-white/10 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-bold">{isJapanese ? 'セレクト' : 'SELECT'}</h2>
        </div>
        <p className="text-sm text-navy-400">
          {isJapanese ? 'タイ領事館を検索' : 'Find Thai Embassies'}
        </p>
      </div>

      {/* Back Button */}
      {navigationLevel !== 'continent' && (
        <button
          onClick={onBack}
          className="mx-4 mt-4 p-2 flex items-center gap-2 text-navy-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{isJapanese ? '戻る' : 'Back'}</span>
        </button>
      )}

      {/* Content */}
      <div className="flex-1 p-4">
        {navigationLevel === 'continent' && (
          <div className="space-y-6">
            <div className="bg-navy-800 rounded-lg p-6 border border-gold-400/30">
              <h3 className="text-lg font-bold text-gold-400 mb-3">
                {isJapanese ? '地図上で大陸を選択' : 'Select a Continent'}
              </h3>
              <p className="text-sm text-navy-400 leading-relaxed">
                {isJapanese
                  ? '左の世界地図上で、色付けされた大陸をクリックしてください。'
                  : 'Click on any colored continent on the map to the left.'}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gold-400 uppercase mb-3">
                {isJapanese ? 'または選択:' : 'Or select:'}
              </h3>
              {Object.entries(continents).map(([key, continent]) => (
                <button
                  key={key}
                  onClick={() => onContinentSelect(key as any)}
                  className="w-full p-3 text-left rounded-lg bg-navy-800 hover:bg-navy-700 border border-white/10 hover:border-gold-400 transition-all group text-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold group-hover:text-gold-400 transition-colors">
                        {continent.emoji} {isJapanese ? continent.nameJa : continent.name}
                      </div>
                    </div>
                    <div className="text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {navigationLevel === 'country' && selectedContinent && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gold-400 uppercase mb-4">
              {isJapanese
                ? continents[selectedContinent].nameJa
                : continents[selectedContinent].name}{' '}
              {isJapanese ? '内の国' : 'Countries'}
            </h3>
            {Array.from(embassiesByContinent[selectedContinent].keys())
              .sort()
              .map((country) => (
                <button
                  key={country}
                  onClick={() => onCountrySelect(country)}
                  className="w-full p-3 text-left rounded-lg bg-navy-800 hover:bg-navy-700 border border-white/10 hover:border-gold-400 transition-all text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{country}</span>
                    <span className="text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </button>
              ))}
          </div>
        )}

        {navigationLevel === 'embassy' && selectedCountry && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gold-400 uppercase mb-4">
              {selectedCountry} {isJapanese ? '内の領事館' : 'Embassies'}
            </h3>
            {currentEmbassies.map((embassy) => (
              <Link
                key={embassy.id}
                href={`/${locale}/embassy/${embassy.id}`}
                className="block p-3 rounded-lg bg-navy-800 border border-white/10 hover:bg-navy-700 hover:border-gold-400 transition-all group"
              >
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-gold-400 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm group-hover:text-gold-400 transition-colors">
                      {isJapanese ? embassy.nameJa : embassy.name}
                    </div>
                    <div className="text-xs text-navy-400 mt-1">{embassy.city}</div>
                    <div className="text-xs text-gold-400 mt-2 inline-flex items-center gap-1">
                      {isJapanese ? '詳細を見る' : 'View Details'}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
