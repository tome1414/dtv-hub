'use client'

interface Continent {
  id: string
  name: string
  nameJa: string
  color: string
  labelX: number
  labelY: number
}

const CONTINENTS: Continent[] = [
  { id: 'asia',     name: 'Asia',     nameJa: 'アジア州',    color: '#60a5fa', labelX: 560, labelY: 175 },
  { id: 'europe',   name: 'Europe',   nameJa: 'ヨーロッパ州', color: '#f87171', labelX: 450, labelY: 135 },
  { id: 'americas', name: 'Americas', nameJa: '南北アメリカ州',color: '#34d399', labelX: 195, labelY: 190 },
  { id: 'africa',   name: 'Africa',   nameJa: 'アフリカ州',  color: '#fbbf24', labelX: 470, labelY: 270 },
  { id: 'oceania',  name: 'Oceania',  nameJa: 'オセアニア州', color: '#c084fc', labelX: 690, labelY: 315 },
]

interface WorldMapSVGProps {
  selectedContinent: string | null
  onContinentSelect: (id: any) => void
  locale: string
}

export default function WorldMapSVG({ selectedContinent, onContinentSelect, locale }: WorldMapSVGProps) {
  const isJa = locale === 'ja'

  return (
    <div className="w-full h-full flex items-center justify-center bg-navy-950 p-4">
      <div className="relative w-full max-w-4xl">
        <svg
          viewBox="0 0 900 450"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ocean background */}
          <rect width="900" height="450" fill="#0f172a" />

          {/* ─── Americas ─── */}
          <path
            d="
              M 130,25  L 150,30  L 175,35  L 195,30  L 210,40
              L 215,55  L 205,70  L 195,80  L 200,95
              L 210,105 L 215,115 L 210,130 L 205,145
              L 210,155 L 205,165 L 195,170 L 185,175
              L 185,185 L 195,195 L 195,210 L 185,220
              L 175,225 L 170,235 L 165,250 L 160,265
              L 155,280 L 150,295 L 145,310 L 150,325
              L 155,340 L 155,355 L 150,365 L 145,360
              L 140,345 L 135,330 L 130,315 L 125,300
              L 120,285 L 115,270 L 110,255 L 108,240
              L 110,225 L 115,215 L 120,210 L 118,200
              L 115,190 L 118,180 L 120,170 L 118,160
              L 112,155 L 108,145 L 110,130 L 115,115
              L 120,100 L 118,90  L 112,82  L 108,70
              L 110,58  L 115,48  L 120,38  L 125,30
              Z
            "
            fill={selectedContinent === 'americas' ? '#34d399' : '#22c55e'}
            fillOpacity={selectedContinent && selectedContinent !== 'americas' ? 0.4 : 0.75}
            stroke="#0f172a"
            strokeWidth="1.5"
            style={{ cursor: 'pointer', transition: 'fill-opacity 0.3s' }}
            onClick={() => onContinentSelect('americas')}
          />

          {/* ─── Europe ─── */}
          <path
            d="
              M 408,62  L 420,58  L 435,55  L 445,60
              L 455,58  L 465,62  L 470,70  L 465,78
              L 468,85  L 462,90  L 458,98  L 462,105
              L 470,110 L 475,118 L 472,125 L 465,128
              L 458,125 L 450,128 L 445,135 L 440,140
              L 433,145 L 428,140 L 422,138 L 415,140
              L 410,135 L 405,130 L 402,122 L 405,115
              L 402,108 L 398,100 L 400,92  L 405,85
              L 402,78  L 405,70
              Z
            "
            fill={selectedContinent === 'europe' ? '#f87171' : '#ef4444'}
            fillOpacity={selectedContinent && selectedContinent !== 'europe' ? 0.4 : 0.75}
            stroke="#0f172a"
            strokeWidth="1.5"
            style={{ cursor: 'pointer', transition: 'fill-opacity 0.3s' }}
            onClick={() => onContinentSelect('europe')}
          />

          {/* ─── Africa ─── */}
          <path
            d="
              M 415,150 L 428,148 L 440,150 L 450,155
              L 460,162 L 468,170 L 472,180 L 470,192
              L 472,205 L 468,218 L 462,230 L 458,242
              L 455,255 L 452,268 L 448,280 L 445,292
              L 440,302 L 435,310 L 430,315 L 425,310
              L 418,305 L 412,298 L 408,288 L 405,278
              L 402,268 L 400,255 L 398,242 L 398,228
              L 400,215 L 402,202 L 402,190 L 400,178
              L 398,168 L 400,158 L 408,153
              Z
            "
            fill={selectedContinent === 'africa' ? '#fbbf24' : '#f59e0b'}
            fillOpacity={selectedContinent && selectedContinent !== 'africa' ? 0.4 : 0.75}
            stroke="#0f172a"
            strokeWidth="1.5"
            style={{ cursor: 'pointer', transition: 'fill-opacity 0.3s' }}
            onClick={() => onContinentSelect('africa')}
          />

          {/* ─── Asia ─── */}
          <path
            d="
              M 470,62  L 490,55  L 510,52  L 530,50
              L 555,52  L 575,55  L 595,58  L 615,62
              L 635,65  L 650,72  L 660,80  L 668,90
              L 672,102 L 668,112 L 660,118 L 655,128
              L 648,138 L 640,145 L 630,148 L 618,150
              L 605,152 L 592,155 L 578,158 L 565,162
              L 552,165 L 540,162 L 528,158 L 515,155
              L 505,150 L 498,142 L 492,135 L 488,125
              L 485,115 L 482,105 L 480,95  L 478,85
              L 475,75
              Z
            "
            fill={selectedContinent === 'asia' ? '#60a5fa' : '#3b82f6'}
            fillOpacity={selectedContinent && selectedContinent !== 'asia' ? 0.4 : 0.75}
            stroke="#0f172a"
            strokeWidth="1.5"
            style={{ cursor: 'pointer', transition: 'fill-opacity 0.3s' }}
            onClick={() => onContinentSelect('asia')}
          />

          {/* ─── Oceania ─── */}
          <path
            d="
              M 645,250 L 660,245 L 680,248 L 695,255
              L 708,265 L 715,278 L 715,292 L 708,305
              L 698,312 L 685,315 L 672,312 L 660,305
              L 650,295 L 645,282 L 642,268
              Z
            "
            fill={selectedContinent === 'oceania' ? '#c084fc' : '#a855f7'}
            fillOpacity={selectedContinent && selectedContinent !== 'oceania' ? 0.4 : 0.75}
            stroke="#0f172a"
            strokeWidth="1.5"
            style={{ cursor: 'pointer', transition: 'fill-opacity 0.3s' }}
            onClick={() => onContinentSelect('oceania')}
          />

          {/* ─── Continent Labels ─── */}
          {CONTINENTS.map((c) => (
            <g
              key={c.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onContinentSelect(c.id)}
            >
              <rect
                x={c.labelX - 50}
                y={c.labelY - 16}
                width="100"
                height="28"
                rx="14"
                fill={selectedContinent === c.id ? c.color : '#0f172a'}
                fillOpacity={selectedContinent === c.id ? 1 : 0.85}
                stroke={c.color}
                strokeWidth="1.5"
              />
              <text
                x={c.labelX}
                y={c.labelY + 5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill={selectedContinent === c.id ? '#0f172a' : c.color}
                fontFamily="sans-serif"
              >
                {isJa ? c.nameJa : c.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 flex gap-3 flex-wrap justify-end">
          {CONTINENTS.map((c) => (
            <button
              key={c.id}
              onClick={() => onContinentSelect(c.id)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background: selectedContinent === c.id ? c.color : 'rgba(15,23,42,0.8)',
                color: selectedContinent === c.id ? '#0f172a' : c.color,
                border: `1px solid ${c.color}`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: c.color }}
              />
              {isJa ? c.nameJa : c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
