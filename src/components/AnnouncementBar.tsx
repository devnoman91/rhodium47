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

  // Get visible announcements (6 at a time)
  const getVisibleAnnouncements = () => {
    if (announcements.length <= ITEMS_TO_SHOW) {
      return announcements
    }

    const visible = []
    for (let i = 0; i < ITEMS_TO_SHOW; i++) {
      const index = (currentStartIndex + i) % announcements.length
      visible.push(announcements[index])
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
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {visibleAnnouncements.map((announcement, idx) => (
            <div
              key={`${currentStartIndex}-${idx}`}
              className="flex items-center gap-2 transition-all duration-500"
            >
              {announcement.icon && (
                <div className="w-5 h-5 relative flex-shrink-0">
                  <Image
                    src={announcement.icon.asset.url}
                    alt={announcement.icon.alt || ''}
                    fill
                    sizes="20px"
                    className="object-contain"
                  />
                </div>
              )}

              <p
                className="text-xs md:text-sm font-medium tracking-wide uppercase whitespace-nowrap"
                style={{ color: textColor }}
              >
                {announcement.text}
              </p>

              {announcement.image && (
                <div className="w-5 h-5 relative flex-shrink-0">
                  <Image
                    src={announcement.image.asset.url}
                    alt={announcement.image.alt || ''}
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

      {/* Pagination Dots - Only show if more than 6 announcements */}
      {announcements.length > ITEMS_TO_SHOW && (
        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex gap-1">
          {Array.from({ length: Math.ceil(announcements.length / ITEMS_TO_SHOW) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStartIndex(index * ITEMS_TO_SHOW)}
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: Math.floor(currentStartIndex / ITEMS_TO_SHOW) === index ? textColor : `${textColor}40`,
                opacity: Math.floor(currentStartIndex / ITEMS_TO_SHOW) === index ? 1 : 0.4,
              }}
              aria-label={`Go to group ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
