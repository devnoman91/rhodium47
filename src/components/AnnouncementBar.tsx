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
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  // Calculate animation duration based on number of items (slower for more items)
  const animationDuration = announcements.length * (announcementData.autoSlideInterval || 3)

  // Duplicate announcements for seamless infinite loop
  const duplicatedAnnouncements = [...announcements, ...announcements]

  return (
    <div
      className="w-full py-3 overflow-hidden relative"
      style={{ backgroundColor }}
    >
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .slider-track {
          animation: slideLeft ${animationDuration}s linear infinite;
        }

        .slider-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className=" px-4">
        <div className="relative overflow-hidden">
          <div
            className={`slider-track flex items-center gap-8 ${isPaused ? 'paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedAnnouncements.map((announcement, idx) => (
              <div
                key={`announcement-${idx}`}
                className="flex items-center gap-2 flex-shrink-0"
                style={{
                  minWidth: `${100 / ITEMS_TO_SHOW}%`,
                }}
              >
                {announcement.icon && (
                  <div className="w-10 h-7 relative flex-shrink-0 mx-auto">
                    <Image
                      src={announcement.icon.asset.url}
                      alt={announcement.icon.alt || ''}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </div>
                )}

                <p
                  className="text-xs md:text-sm font-medium tracking-wide uppercase whitespace-nowrap text-center flex-1"
                  style={{ color: textColor }}
                >
                  {announcement.text}
                </p>

                {announcement.image && (
                  <div className="w-5 h-5 relative flex-shrink-0 mx-auto">
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
      </div>
    </div>
  )
}
