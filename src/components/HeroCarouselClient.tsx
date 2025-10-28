'use client'

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { Video } from '@/content/types'
import Image from 'next/image'
import Link from 'next/link'

// Ultra-optimized critical styles for sub-1.5s LCP
const criticalInlineStyles = `
  .hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
    contain: layout style paint;
  }
  .hero-video-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    contain: layout style;
  }
  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .hero-content {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    max-width: 28rem;
    z-index: 10;
  }
  .hero-title {
    color: #FFF;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }
  .hero-background {
    position: absolute;
    inset: 0;
    background: #000;
  }
  .hero-subtitle {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.32px;
    margin-bottom: 30px;
  }
  .hero-button {
    display: flex;
    height: auto;
    padding: 14.5px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #000;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.4px;
    border-radius: 100px;
    background: #FFF;
    cursor: pointer;
    border: none;
    transition: transform 150ms ease, background-color 500ms ease, color 500ms ease;
  }
  .hero-button:hover {
    transform: scale(1.05);
  }
  .hero-button:active {
    transform: scale(0.95);
  }
  .hero-button-overlay {
    position: absolute;
    inset: 0;
    bg-color: #000;
    transform: translateX(100%);
    transition: transform 500ms ease;
    border-radius: 100px;
  }
  .hero-button:hover .hero-button-overlay {
    transform: translateX(0);
  }
  .hero-button:hover .hero-button-text,
  .hero-button:hover .hero-button-icon {
    color: white;
  }
  @media (max-width: 767px) {
    .hero-content {
      display: flex;
      width: 100% !important;
      height: 75%;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      max-width: 100% !important;
      right: 20px;
      transform: unset;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      text-align: center;
      padding: 0 20px;
    }
  }
`

// Memoized circular indicator component
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
          style={{ transition: 'stroke 0.2s ease' }}
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
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
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

// Memoized video controls component
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

// Memoized button component (replaces Framer Motion)
const HeroButton = memo(({ text, link }: { text: string; link: string }) => (
  <Link href={link}>
    <button
      className="md:m-0 m-auto relative overflow-hidden flex items-center gap-[12px] px-6 py-3 rounded-full
                bg-white text-black font-helvetica font-medium text-[16px]
                border-none cursor-pointer group
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
                hover:scale-105 active:scale-95 transition-transform duration-150"
      aria-label={text}
    >
      <span
        className="absolute inset-0 bg-black translate-x-full
                  transition-transform duration-500 ease-in-out rounded-full
                  group-hover:translate-x-0"
      />
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
        {text}
      </span>
    </button>
  </Link>
))
HeroButton.displayName = 'HeroButton'

interface HeroCarouselClientProps {
  videos: Video[]
  error: string | null
}

export default function HeroCarouselClient({ videos, error }: HeroCarouselClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile device once on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()

    const handler = () => checkMobile()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (videos.length <= 1) return

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [videos.length])

  // Handle video playback
  useEffect(() => {
    const video = videoRef.current
    if (!video || isTransitioning || !mediaLoaded) return

    const playVideo = async () => {
      if (!video.paused && video.currentTime > 0) return

      try {
        await video.play()
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error playing video:', error)
        }
      }
    }

    playVideo()
  }, [currentIndex, mediaLoaded, isTransitioning])

  // Reset media loaded state when index changes
  useEffect(() => {
    setMediaLoaded(false)
  }, [currentIndex])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        videoRef.current.src = ''
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }, [currentIndex, isTransitioning])

  const handleMediaLoad = useCallback(() => {
    setMediaLoaded(true)
  }, [])

  const currentVideo = useMemo(() => videos[currentIndex], [videos, currentIndex])

  // Error or loading state
  if (error || videos.length === 0) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="hero-container">
          <div className="hero-background" />
        </div>
      </>
    )
  }

  // Get responsive content URLs
  const getVideoUrl = () => {
    if (!currentVideo || currentVideo.contentType !== 'video') return null
    return isMobile && currentVideo.mobileVideoFile?.asset?.url
      ? currentVideo.mobileVideoFile.asset.url
      : currentVideo.desktopVideoFile?.asset?.url
  }

  const getImageUrl = () => {
    if (!currentVideo || currentVideo.contentType !== 'image') return null
    return isMobile && currentVideo.mobileImage?.asset?.url
      ? currentVideo.mobileImage.asset.url
      : currentVideo.desktopImage?.asset?.url
  }

  const getDisplayName = () => {
    if (!currentVideo) return ''
    return isMobile && currentVideo.mobileName
      ? currentVideo.mobileName
      : currentVideo.desktopName
  }

  const getDisplaySubtitle = () => {
    if (!currentVideo) return ''
    return isMobile && currentVideo.mobileSubtitle
      ? currentVideo.mobileSubtitle
      : currentVideo.desktopSubtitle
  }

  const videoUrl = getVideoUrl()
  const imageUrl = getImageUrl()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
      <div className="hero-container">
        <div className="hero-background" />

        <div className="hero-video-container">
          {!mediaLoaded && <div className="hero-background" />}

          {/* Video content */}
          {currentVideo?.contentType === 'video' && videoUrl && (
            <video
              ref={videoRef}
              key={`video-${currentVideo._id}-${isMobile ? 'mobile' : 'desktop'}`}
              src={videoUrl}
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
              onLoadedData={handleMediaLoad}
              style={{
                opacity: (mediaLoaded && !isTransitioning) ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          )}

          {/* Image content - using Next.js Image for optimization */}
          {currentVideo?.contentType === 'image' && imageUrl && (
            <Image
              key={`image-${currentVideo._id}-${isMobile ? 'mobile' : 'desktop'}`}
              src={imageUrl}
              alt={currentVideo.desktopImage?.alt || currentVideo.desktopName || 'Hero image'}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
              onLoad={handleMediaLoad}
              style={{
                opacity: (mediaLoaded && !isTransitioning) ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          )}
        </div>

        {/* Content overlay */}
        <div className="hero-content">
          <div className='md:block hidden' style={{
            width: '30rem',
            height: '0.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginBottom: '20px',
            borderRadius: '100px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentIndex + 1) / videos.length) * 100}%`,
              height: '100%',
              backgroundColor: 'white',
              transition: 'width 0.5s ease'
            }} />
          </div>

          {getDisplayName() && (
            <h1 className="hero-title">{getDisplayName()}</h1>
          )}

          <div>
            {getDisplaySubtitle() && (
              <p className="hero-subtitle">{getDisplaySubtitle()}</p>
            )}

            {currentVideo?.buttonText && currentVideo?.buttonLink && (
              <HeroButton text={currentVideo.buttonText} link={currentVideo.buttonLink} />
            )}
          </div>
        </div>

        <VideoControlsInline
          videos={videos}
          currentIndex={currentIndex}
          onSlideChange={goToSlide}
        />

        {/* Bottom navigation */}
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
            {videos.map((_, index) => (
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
    </>
  )
}
