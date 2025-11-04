'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { Video } from '@/content/types'
import Link from 'next/link'
import Image from 'next/image'

// Memoized segmented circular indicator - lazy loaded
const SegmentedCircleIndicator = memo(({
  total,
  current,
  onClick,
}: {
  total: number
  current: number
  onClick?: (index: number) => void
}) => {
  const size = 64
  const strokeWidth = 5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const gap = Math.max(circumference * 0.02, 2)
  const segmentLength = Math.max(((circumference - gap * Math.max(total, 1)) / Math.max(total, 1)), 0)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
        <circle
          r={radius}
          cx={0}
          cy={0}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${segmentLength} ${gap}`}
        />
        {Array.from({ length: current + 1 }).map((_, index) => (
          <circle
            key={`active-${index}`}
            r={radius}
            cx={0}
            cy={0}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={-index * (segmentLength + gap)}
          />
        ))}
      </g>
      {onClick && (
        <g>
          {Array.from({ length: total }).map((_, i) => (
            <circle
              key={`hit-${i}`}
              cx={size / 2}
              cy={size / 2}
              r={size / 2}
              fill="transparent"
              onClick={() => onClick(i)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </g>
      )}
    </svg>
  )
})
SegmentedCircleIndicator.displayName = 'SegmentedCircleIndicator'

const VideoControlsInline = memo(({ videos, currentIndex, onSlideChange }: {
  videos: Video[]
  currentIndex: number
  onSlideChange: (index: number) => void
}) => (
  <div className="absolute bottom-8 right-8 md:right-16 z-10 md:block hidden">
    <SegmentedCircleIndicator total={videos.length} current={currentIndex} onClick={onSlideChange} />
  </div>
))
VideoControlsInline.displayName = 'VideoControlsInline'

interface HeroCarouselProps {
  initialVideos: Video[]
}

export default function HeroCarousel({ initialVideos = [] }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Direct access - avoid useMemo for critical path
  const currentVideo = initialVideos[currentIndex]

  // Consolidated auto-advance and video playback effect
  useEffect(() => {
    if (initialVideos.length <= 1) return

    // Auto-advance interval
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % initialVideos.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)

    // Video playback
    const video = videoRef.current
    if (video && !isTransitioning) {
      video.play().catch(() => {
        // Silently handle autoplay errors
      })
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (video && !video.paused) video.pause()
    }
  }, [initialVideos.length, currentIndex, isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)

    // Reset interval
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % initialVideos.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)
  }, [currentIndex, isTransitioning, initialVideos.length])

  // Early return with minimal processing
  if (!initialVideos.length || !currentVideo) {
    return (
      <div className="hero-container">
        <div className="hero-background"></div>
      </div>
    )
  }

  // Compute URLs only when needed
  const isVideo = currentVideo.contentType === 'video'
  const isImage = currentVideo.contentType === 'image'

  const desktopVideoUrl = isVideo ? currentVideo.desktopVideoFile?.asset?.url : null
  const mobileVideoUrl = isVideo ? (currentVideo.mobileVideoFile?.asset?.url || desktopVideoUrl) : null
  const desktopImageUrl = isImage ? currentVideo.desktopImage?.asset?.url : null
  const mobileImageUrl = isImage ? (currentVideo.mobileImage?.asset?.url || desktopImageUrl) : null
  const imageAlt = isImage ? (currentVideo.desktopImage?.alt || currentVideo.desktopName || 'Hero image') : 'Hero content'

  return (
    <div className="hero-container">
      {/* Stable background */}
      <div className="hero-background"></div>

      {/* Content container */}
      <div className="hero-video-container">
        {/* Render video if content type is video */}
        {currentVideo?.contentType === 'video' && (
          <>
            {/* Desktop video - hidden on mobile */}
            {desktopVideoUrl && (
              <video
                ref={videoRef}
                key={`video-desktop-${currentVideo?._id}`}
                src={desktopVideoUrl}
                className="hero-video md:block hidden"
                autoPlay
                muted
                loop
                playsInline
                preload={currentIndex === 0 ? "auto" : "metadata"}
                controls={false}
                disablePictureInPicture
                style={{ opacity: isTransitioning ? 0 : 1 }}
              />
            )}
            {/* Mobile video - hidden on desktop */}
            {mobileVideoUrl && (
              <video
                key={`video-mobile-${currentVideo?._id}`}
                src={mobileVideoUrl}
                className="hero-video md:hidden block"
                autoPlay
                muted
                loop
                playsInline
                preload={currentIndex === 0 ? "auto" : "metadata"}
                controls={false}
                disablePictureInPicture
                style={{ opacity: isTransitioning ? 0 : 1 }}
              />
            )}
          </>
        )}

        {/* Render image if content type is image */}
        {currentVideo?.contentType === 'image' && (
          <>
            {/* Desktop image */}
            {desktopImageUrl && (
              <div className="md:block hidden w-full h-full relative">
                <Image
                  key={`image-desktop-${currentVideo?._id}`}
                  src={desktopImageUrl}
                  alt={imageAlt}
                  fill
                  priority={currentIndex === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                  style={{ opacity: isTransitioning ? 0 : 1 }}
                />
              </div>
            )}
            {/* Mobile image */}
            {mobileImageUrl && (
              <div className="md:hidden block w-full h-full relative">
                <Image
                  key={`image-mobile-${currentVideo?._id}`}
                  src={mobileImageUrl}
                  alt={imageAlt}
                  fill
                  priority={currentIndex === 0}
                  quality={85}
                  sizes="100vw"
                  className="object-cover"
                  style={{ opacity: isTransitioning ? 0 : 1 }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Content with stable positioning - Critical LCP element */}
      <div className="hero-content">
        {/* Progress bar */}
        <div className='md:block hidden hero-progress-bar'>
          <div
            className="hero-progress-fill"
            style={{ width: `${((currentIndex + 1) / initialVideos.length) * 100}%` }}
          ></div>
        </div>

        {/* Hero title - LCP element - render immediately */}
        {currentVideo.desktopName && (
          <h1 className="hero-title">
            {currentVideo.desktopName}
          </h1>
        )}

        <div>
          {/* Hero subtitle */}
          {currentVideo.desktopSubtitle && (
            <p className="hero-subtitle">
              {currentVideo.desktopSubtitle}
            </p>
          )}

          {/* CTA button */}
          {currentVideo.buttonText && currentVideo.buttonLink && (
            <Link href={currentVideo.buttonLink}>
              <button
                className="md:m-0 m-auto relative overflow-hidden flex items-center gap-[12px] px-6 py-3 rounded-full
                          bg-white text-black font-helvetica font-medium text-[16px]
                          border-none cursor-pointer group
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
                          transition-transform duration-150 ease-out
                          hover:scale-105 active:scale-95"
                aria-label={currentVideo.buttonText}
              >
                <span className="absolute inset-0 bg-[#560100] translate-x-full transition-transform duration-500 ease-in-out rounded-full group-hover:translate-x-0" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="currentColor"
                  className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white"
                >
                  <path d="M21.2441 9.61955L13.3691 17.4946C13.2049 17.6587 12.9822 17.751 12.75 17.751C12.5178 17.751 12.2951 17.6587 12.1309 17.4946C11.9668 17.3304 11.8745 17.1077 11.8745 16.8755C11.8745 16.6433 11.9668 16.4206 12.1309 16.2564L18.513 9.87549H1.375C1.14294 9.87549 0.920376 9.7833 0.756282 9.61921C0.592187 9.45511 0.5 9.23255 0.5 9.00049C0.5 8.76842 0.592187 8.54586 0.756282 8.38177C0.920376 8.21767 1.14294 8.12549 1.375 8.12549H18.513L12.1309 1.74455C11.9668 1.58036 11.8745 1.35768 11.8745 1.12549C11.8745 0.893293 11.9668 0.67061 12.1309 0.506424C12.2951 0.342238 12.5178 0.25 12.75 0.25C12.9822 0.25 13.2049 0.342238 13.3691 0.506424L21.2441 8.38142C21.3254 8.46269 21.39 8.55919 21.434 8.66541C21.478 8.77164 21.5007 8.8855 21.5007 9.00049C21.5007 9.11548 21.478 9.22934 21.434 9.33556C21.39 9.44178 21.3254 9.53829 21.2441 9.61955Z" />
                </svg>
                <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                  {currentVideo.buttonText}
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>

      <VideoControlsInline
        videos={initialVideos}
        currentIndex={currentIndex}
        onSlideChange={goToSlide}
      />

      {/* Left-side numbers control */}
      <div className="absolute md:bottom-8 bottom-5 left-0 right-0 m-auto md:left-16 z-10 flex items-center md:justify-start justify-center space-x-3">
        <button
          className="text-white text-2xl font-helvetica font-medium leading-none"
          onClick={() => goToSlide(currentIndex)}
          aria-label={`Current video ${currentIndex + 1}`}
        >
          {String(currentIndex + 1).padStart(2, '0')}
        </button>
        <div className="w-8 h-px bg-white/40" />
        <div className="flex items-center space-x-2">
          {initialVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`text-base font-helvetica font-normal transition-opacity ${
                index === currentIndex ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
              aria-label={`Go to video ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
