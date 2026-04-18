import { ArrowLeft, Globe, MapPin, Phone, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Embassy } from '@/lib/embassy-service'
import RelatedEmbassies from './RelatedEmbassies'
import EmbassyJsonLd from './EmbassyJsonLd'
import BackButton from './BackButton'

interface EmbassyDetailProps {
  embassy: Embassy
  locale: string
  relatedEmbassies: Embassy[]
}

export default function EmbassyDetail({
  embassy,
  locale,
  relatedEmbassies,
}: EmbassyDetailProps) {
  const isJa = locale === 'ja'

  return (
    <>
      <EmbassyJsonLd embassy={embassy} locale={locale} />

      <div className="min-h-screen bg-navy-950 text-white">
        {/* Header */}
        <div className="border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <BackButton isJa={isJa} />

            <h1 className="text-4xl font-bold mb-4">
              {isJa ? embassy.nameJa : embassy.name}
            </h1>
            <p className="text-navy-400">
              {isJa ? embassy.cityJa : embassy.city}, {embassy.country}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2">
              {/* Key Information */}
              <div className="bg-navy-900 rounded-lg p-8 border border-white/10 mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  {isJa ? '基本情報' : 'Key Information'}
                </h2>

                <div className="space-y-6">
                  {/* Website */}
                  {embassy.website && (
                    <div className="flex items-start gap-4">
                      <Globe className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-sm mb-2">
                          {isJa ? '公式サイト' : 'Official Website'}
                        </h3>
                        <a
                          href={embassy.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold-400 hover:text-gold-300 break-all"
                        >
                          {embassy.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-sm mb-2">
                        {isJa ? '住所' : 'Address'}
                      </h3>
                      <p className="text-navy-300">
                        {isJa ? embassy.cityJa : embassy.city}, {embassy.country}
                      </p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-sm mb-2">
                        {isJa ? '公館種別' : 'Type'}
                      </h3>
                      <p className="text-navy-300">
                        {isJa ? embassy.type : embassy.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {embassy.notes && (
                <div className="bg-navy-900 rounded-lg p-8 border border-white/10 mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {isJa ? '申請時のご注意' : 'Important Notes'}
                  </h2>
                  <p className="text-navy-300 leading-relaxed">
                    {embassy.notes}
                  </p>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-gold-400/10 to-gold-600/10 rounded-lg p-8 border border-gold-400/20">
                <h2 className="text-2xl font-bold mb-4">
                  {isJa ? 'DTV ビザ申請をお考えですか？' : 'Ready to Apply for DTV Visa?'}
                </h2>
                <p className="text-navy-300 mb-6">
                  {isJa
                    ? '公式サイトで最新情報をご確認の上、申請手続きをお進みください。'
                    : 'Visit the official website for the latest information and application procedures.'}
                </p>
                {embassy.website && (
                  <a
                    href={embassy.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gold-400 text-navy-950 font-semibold rounded-lg hover:bg-gold-300 transition-colors"
                  >
                    {isJa ? '公式サイトへ' : 'Visit Official Site'}
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Embassy Details Card */}
              <div className="bg-navy-900 rounded-lg p-6 border border-white/10 sticky top-8">
                <h3 className="text-lg font-bold mb-4">
                  {isJa ? 'この領事館について' : 'About'}
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-navy-400 mb-1">{isJa ? '国' : 'Country'}</p>
                    <p className="font-semibold">{embassy.country}</p>
                  </div>
                  <div>
                    <p className="text-navy-400 mb-1">{isJa ? '都市' : 'City'}</p>
                    <p className="font-semibold">
                      {isJa ? embassy.cityJa : embassy.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-navy-400 mb-1">{isJa ? '公館種別' : 'Type'}</p>
                    <p className="font-semibold">{embassy.type}</p>
                  </div>
                  {embassy.latitude && embassy.longitude && (
                    <div>
                      <p className="text-navy-400 mb-1">
                        {isJa ? '座標' : 'Coordinates'}
                      </p>
                      <p className="font-semibold text-xs">
                        {embassy.latitude.toFixed(4)}, {embassy.longitude.toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Embassies */}
              <RelatedEmbassies
                embassies={relatedEmbassies}
                locale={locale}
                className="mt-6"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
