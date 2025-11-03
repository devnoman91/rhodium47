'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { AnnouncementBar as AnnouncementBarType } from '@/content/types'

// Lazy load the query function to avoid SSR issues
const getAnnouncementBar = async () => {
  try {
    const { getAnnouncementBar: fetchFn } = await import('@/content/queries')
    return await fetchFn()
  } catch (error) {
    console.error('Error importing announcement bar query:', error)
    return null
  }
}

export default function AnnouncementBar() {
  const [announcementData, setAnnouncementData] = useState<AnnouncementBarType | null>(null)
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const ITEMS_TO_SHOW = 6 // Show 6 announcements at a time

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const data = await getAnnouncementBar()
        if (data) {
          setAnnouncementData(data)
        }
      } catch (error) {
        console.error('Error fetching announcement bar data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnnouncementData()
  }, [])

  useEffect(() => {
    // Only auto-scroll if there are more than 6 announcements
    if (!announcementData || !announcementData.enabled || !announcementData.announcements || announcementData.announcements.length <= ITEMS_TO_SHOW) {
      return
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true)
        setCurrentStartIndex((prevIndex) =>
          (prevIndex + 1) % announcementData.announcements.length
        )
      }, (announcementData.autoSlideInterval || 3) * 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [announcementData, isPaused, ITEMS_TO_SHOW])

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500) // Match transition duration
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Don't render while loading or if no data
  if (isLoading) {
    return null
  }

  // Don't render if no data or disabled or no announcements
  if (!announcementData || !announcementData.enabled || !announcementData.announcements || announcementData.announcements.length === 0) {
    return null
  }

  const backgroundColor = announcementData.backgroundColor || '#000000'
  const textColor = announcementData.textColor || '#FFFFFF'
  const announcements = announcementData.announcements

  // Get visible announcements (6 at a time) + duplicates for seamless loop
  const getVisibleAnnouncements = () => {
    if (announcements.length <= ITEMS_TO_SHOW) {
      return announcements.map((ann, i) => ({ announcement: ann, uniqueKey: `${currentStartIndex}-${i}` }))
    }

    const visible = []
    // Add 2 extra sets for seamless infinite loop effect
    for (let i = 0; i < ITEMS_TO_SHOW + 2; i++) {
      const index = (currentStartIndex + i) % announcements.length
      visible.push({ announcement: announcements[index], uniqueKey: `${currentStartIndex}-${i}` })
    }
    return visible
  }

  const visibleAnnouncements = getVisibleAnnouncements()

  return (
    <div
      className="w-full py-3 overflow-hidden relative"
      style={{ backgroundColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <div
            className={`flex items-center justify-start gap-8 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{
              transform: announcements.length > ITEMS_TO_SHOW ? 'translateX(0)' : 'none',
            }}
          >
            {visibleAnnouncements.map((item, idx) => (
              <div
                key={item.uniqueKey}
                className="flex items-center gap-2 flex-shrink-0"
                style={{
                  minWidth: `${100 / ITEMS_TO_SHOW}%`,
                  opacity: idx >= ITEMS_TO_SHOW ? 0 : 1,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                {item.announcement.icon && (
                  <div className="w-5 h-5 relative flex-shrink-0 mx-auto">
                    <Image
                      src={item.announcement.icon.asset.url}
                      alt={item.announcement.icon.alt || ''}
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                )}

                <p
                  className="text-xs md:text-sm font-medium tracking-wide uppercase whitespace-nowrap text-center flex-1"
                  style={{ color: textColor }}
                >
                  {item.announcement.text}
                </p>

                {item.announcement.image && (
                  <div className="w-5 h-5 relative flex-shrink-0 mx-auto">
                    <Image
                      src={item.announcement.image.asset.url}
                      alt={item.announcement.image.alt || ''}
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
