'use client'

import { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import type { Dictionary } from '@/types'
import SidePanel from './SidePanel'
import WorldMapSVG from './WorldMapSVG'
import embassiesData from '@/data/embassies/embassies.json'

const MapDisplay = lazy(() => import('./MapDisplay'))

interface Embassy {
  id: string
  country: string
  countryJa: string
  city: string
  cityJa: string
  name: string
  nameJa: string
  type: string
  website: string
  notes: string
  latitude: number | null
  longitude: number | null
}

type NavigationLevel = 'continent' | 'country' | 'embassy'

const CONTINENTS = {
  asia:     { name: 'Asia',     nameJa: 'アジア',      emoji: '🌏' },
  europe:   { name: 'Europe',   nameJa: 'ヨーロッパ',   emoji: '🌍' },
  americas: { name: 'Americas', nameJa: 'アメリカ大陸', emoji: '🌎' },
  africa:   { name: 'Africa',   nameJa: 'アフリカ',    emoji: '🌍' },
  oceania:  { name: 'Oceania',  nameJa: 'オセアニア',   emoji: '🏝️' },
}

const CONTINENT_MAP: Record<string, keyof typeof CONTINENTS> = {
  'Japan': 'asia', 'Taiwan': 'asia', 'South Korea': 'asia', 'China': 'asia',
  'Vietnam': 'asia', 'Thailand': 'asia', 'Laos': 'asia', 'Cambodia': 'asia',
  'Myanmar': 'asia', 'Malaysia': 'asia', 'Singapore': 'asia', 'Indonesia': 'asia',
  'Philippines': 'asia', 'India': 'asia', 'Bangladesh': 'asia', 'Nepal': 'asia',
  'Sri Lanka': 'asia', 'Pakistan': 'asia', 'Kazakhstan': 'asia',
  'United Kingdom': 'europe', 'France': 'europe', 'Germany': 'europe', 'Italy': 'europe',
  'Spain': 'europe', 'Netherlands': 'europe', 'Belgium': 'europe', 'Austria': 'europe',
  'Switzerland': 'europe', 'Sweden': 'europe', 'Denmark': 'europe', 'Norway': 'europe',
  'Finland': 'europe', 'Poland': 'europe', 'Czech Republic': 'europe', 'Hungary': 'europe',
  'Romania': 'europe', 'Greece': 'europe', 'Portugal': 'europe', 'Turkey': 'europe',
  'United States of America': 'americas', 'Canada': 'americas', 'Mexico': 'americas',
  'Argentina': 'americas', 'Brazil': 'americas', 'Chile': 'americas', 'Peru': 'americas',
  'Egypt': 'africa', 'Kenya': 'africa', 'Nigeria': 'africa', 'Senegal': 'africa',
  'South Africa': 'africa', 'Morocco': 'africa', 'Mozambique': 'africa',
  'Australia': 'oceania', 'New Zealand': 'oceania',
  'United Arab Emirates': 'asia', 'Saudi Arabia': 'asia', 'Iran': 'asia',
  'Israel': 'asia', 'Oman': 'asia', 'Qatar': 'asia', 'Bahrain': 'asia',
  'Jordan': 'asia', 'Kuwait': 'asia',
  'Brunei': 'asia', 'Timor-Leste': 'asia', 'Republic of Korea': 'asia',
  'Russian Federation': 'europe',
}

export default function EmbassyMap({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [navigationLevel, setNavigationLevel] = useState<NavigationLevel>('continent')
  const [selectedContinent, setSelectedContinent] = useState<keyof typeof CONTINENTS | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const embassiesByContinent = useMemo(() => {
    const result: Record<keyof typeof CONTINENTS, Map<string, Embassy[]>> = {
      asia: new Map(), europe: new Map(), americas: new Map(),
      africa: new Map(), oceania: new Map(),
    }
    embassiesData.forEach((embassy) => {
      const continent = CONTINENT_MAP[embassy.country] || 'asia'
      if (!result[continent].has(embassy.country)) result[continent].set(embassy.country, [])
      result[continent].get(embassy.country)!.push(embassy)
    })
    return result
  }, [])

  const handleContinentSelect = useCallback((continent: keyof typeof CONTINENTS) => {
    setSelectedContinent(continent)
    setSelectedCountry(null)
    setNavigationLevel('country')
  }, [])

  const handleCountrySelect = useCallback((country: string) => {
    setSelectedCountry(country)
    setNavigationLevel('embassy')
  }, [])

  const handleBack = useCallback(() => {
    if (navigationLevel === 'country') {
      setNavigationLevel('continent')
      setSelectedContinent(null)
    } else if (navigationLevel === 'embassy') {
      setNavigationLevel('country')
      setSelectedCountry(null)
    }
  }, [navigationLevel])

  const currentEmbassies = useMemo(() => {
    if (!selectedContinent || !selectedCountry) return []
    return embassiesByContinent[selectedContinent].get(selectedCountry) || []
  }, [selectedContinent, selectedCountry, embassiesByContinent])

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <div className="flex h-screen flex-col lg:flex-row">

        {/* Left Panel */}
        <SidePanel
          navigationLevel={navigationLevel}
          continents={CONTINENTS}
          selectedContinent={selectedContinent}
          selectedCountry={selectedCountry}
          embassiesByContinent={embassiesByContinent}
          currentEmbassies={currentEmbassies}
          onContinentSelect={handleContinentSelect}
          onCountrySelect={handleCountrySelect}
          onBack={handleBack}
          locale={locale}
        />

        {/* Right Panel */}
        <div className="flex-1 overflow-hidden">
          {navigationLevel === 'continent' ? (
            /* 大陸選択: SVG世界地図 */
            <WorldMapSVG
              selectedContinent={selectedContinent}
              onContinentSelect={handleContinentSelect}
              locale={locale}
            />
          ) : (
            /* 国・領事館表示: Leafletマップ */
            <Suspense fallback={<div className="flex-1 bg-navy-900 h-full" />}>
              <MapDisplay
                embassies={currentEmbassies.length > 0 ? currentEmbassies : (embassiesData as Embassy[])}
                selectedEmbassy={null}
                navigationLevel={navigationLevel}
                selectedContinent={selectedContinent}
                onContinentSelect={handleContinentSelect}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
