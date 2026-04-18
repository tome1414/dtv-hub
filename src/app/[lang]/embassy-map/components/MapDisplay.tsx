'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import continentsData from '@/data/continents.json'

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

const DEFAULT_CENTER: [number, number] = [20, 0]
const DEFAULT_ZOOM = 2

interface MapDisplayProps {
  embassies: Embassy[]
  selectedEmbassy: Embassy | null
  navigationLevel: 'continent' | 'country' | 'embassy'
  selectedContinent?: string | null
  onContinentSelect?: (continent: any) => void
}

export default function MapDisplay({
  embassies,
  selectedEmbassy,
  navigationLevel,
  selectedContinent,
  onContinentSelect,
}: MapDisplayProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const continentLayersRef = useRef<Map<string, L.Layer>>(new Map())

  // Initialize map with continent layers
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = L.map(mapContainer.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current)

    // Add continent layers
    continentsData.features.forEach((feature) => {
      const continentId = feature.properties.id
      const color = feature.properties.color

      const layer = L.geoJSON(feature as any, {
        style: {
          fillColor: color,
          fillOpacity: 0.3,
          color: color,
          weight: 2,
          opacity: 0.8,
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            if (onContinentSelect) {
              onContinentSelect(continentId)
            }
          })

          layer.on('mouseover', () => {
            if (layer instanceof L.Path) {
              layer.setStyle({
                fillOpacity: 0.5,
                weight: 3,
              })
            }
          })

          layer.on('mouseout', () => {
            if (layer instanceof L.Path) {
              layer.setStyle({
                fillOpacity: selectedContinent === continentId ? 0.6 : 0.3,
                weight: 2,
              })
            }
          })
        },
      }).addTo(map.current!)

      continentLayersRef.current.set(continentId, layer)
    })
  }, [onContinentSelect])

  // Update continent selection styling
  useEffect(() => {
    continentLayersRef.current.forEach((layer, continentId) => {
      if (layer instanceof L.GeoJSON) {
        layer.eachLayer((sublayer) => {
          if (sublayer instanceof L.Path) {
            sublayer.setStyle({
              fillOpacity: selectedContinent === continentId ? 0.6 : 0.3,
              weight: selectedContinent === continentId ? 3 : 2,
            })
          }
        })
      }
    })
  }, [selectedContinent])

  // Update markers
  useEffect(() => {
    if (!map.current) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Only show markers when viewing embassies (not continents)
    if (navigationLevel !== 'embassy') {
      map.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
      return
    }

    // Add new markers
    const embassiesWithCoords = embassies.filter((e) => e.latitude && e.longitude)

    if (embassiesWithCoords.length === 0) {
      map.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
      return
    }

    embassiesWithCoords.forEach((embassy) => {
      if (!embassy.latitude || !embassy.longitude || !map.current) return

      const marker = L.marker([embassy.latitude, embassy.longitude], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      })
        .bindPopup(`<div class="text-black"><strong>${embassy.name}</strong><br>${embassy.city}</div>`)
        .addTo(map.current)

      markersRef.current.push(marker)
    })

    // Fit bounds
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current)
      map.current.fitBounds(group.getBounds(), { padding: [50, 50] })
    }
  }, [embassies, navigationLevel])

  return (
    <div className="flex-1 lg:h-auto">
      <div ref={mapContainer} className="h-full min-h-[400px] lg:h-screen" />
    </div>
  )
}
