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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
    if (!announcementData || !announcementData.enabled || !announcementData.announcements || announcementData.announcements.length <= 1) {
      return
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % announcementData.announcements.length
        )
      }, (announcementData.autoSlideInterval || 3) * 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [announcementData, isPaused])

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
  const currentAnnouncement = announcementData.announcements[currentIndex]

  // Safety check for current announcement
  if (!currentAnnouncement) {
    return null
  }

  return (
    <div
      className="w-full py-3 overflow-hidden relative"
      style={{ backgroundColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          key={currentIndex}
          className="flex items-center justify-center gap-3 transition-opacity duration-500"
        >
          {currentAnnouncement.icon && (
            <div className="w-6 h-6 relative flex-shrink-0">
              <Image
                src={currentAnnouncement.icon.asset.url}
                alt={currentAnnouncement.icon.alt || ''}
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
          )}

          <p
            className="text-sm md:text-base font-medium tracking-wide uppercase"
            style={{ color: textColor }}
          >
            {currentAnnouncement.text}
          </p>

          {currentAnnouncement.image && (
            <div className="w-6 h-6 relative flex-shrink-0">
              <Image
                src={currentAnnouncement.image.asset.url}
                alt={currentAnnouncement.image.alt || ''}
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

  
    </div>
  )
}
