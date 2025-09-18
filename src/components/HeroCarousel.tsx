'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { client } from '@/sanity/lib/client'
import { Video } from '@/content/types'
import { videoQueries } from '@/content/queries'

// Ultra-optimized critical styles for sub-1.5s LCP
const criticalInlineStyles = `
  .hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .hero-video-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    contain: layout style;
    transform: translateZ(0);
  }
  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .hero-content {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%) translateZ(0);
    color: white;
    max-width: 28rem;
    z-index: 10;
    contain: layout style;
    font-display: swap;
  }
  .hero-title {
    font-size: 2.25rem;
    font-weight: 300;
    margin: 0 0 1rem 0;
    letter-spacing: 0.025em;
    line-height: 1.2;
    contain: layout style;
    font-display: swap;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    will-change: auto;
    transform: translateZ(0);
  }
  .hero-background {
    position: absolute;
    inset: 0;
    background: #000;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .hero-subtitle {
    font-size: 1.125rem;
    margin: 0 0 2rem 0;
    opacity: 0.9;
    contain: layout style;
    font-display: swap;
  }
  .hero-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background-color: white;
    color: black;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    contain: layout style;
    font-display: swap;
    transform: translateZ(0);
  }
  @media (min-width: 768px) {
    .hero-content { left: 4rem; }
    .hero-title { font-size: 3.75rem; }
  }
`

// Segmented circular indicator + numeric list with divider
const SegmentedCircleIndicator = ({
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
        {/* Background dashed ring */}
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
        {/* Active segment only */}
        {total > 0 && (
          <circle
            r={radius}
            cx={0}
            cy={0}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={-current * (segmentLength + gap)}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        )}
      </g>
      {/* Click targets (optional) */}
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
}

const VideoControlsInline = ({ videos, currentIndex, onSlideChange }: {
  videos: Video[]
  currentIndex: number
  onSlideChange: (index: number) => void
}) => (
  <div className="absolute bottom-8 right-8 md:right-16 z-10">
    <SegmentedCircleIndicator total={videos.length} current={currentIndex} onClick={onSlideChange} />
  </div>
)

// Preload critical resources
const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload font display
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }
}

export default function HeroCarousel() {
  const [videos, setVideos] = useState<Video[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intersectionRef = useRef<HTMLDivElement>(null)

  // Preload critical resources on mount - Immediate for LCP
  useEffect(() => {
    setMounted(true)
    preloadCriticalResources()
  }, [])

  // Optimized video fetching with chunked processing
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Set timeout for faster fallback
      timeoutRef.current = setTimeout(() => {
        if (loading) {
          setError('Loading timeout - using fallback content')
          setLoading(false)
        }
      }, 500) // Reduced to 500ms for immediate fallback

      // Immediate processing for faster content availability
      const processVideos = (fetchedVideos: Video[]) => {
        const validVideos = fetchedVideos.filter((video: Video) => {
          const hasRequiredFields = video && video.name && video.contentType
          const hasValidContent =
            (video.contentType === 'video' && video.videoFile?.asset?.url) ||
            (video.contentType === 'image' && video.image?.asset?.url)
          return hasRequiredFields && hasValidContent
        })
        return Promise.resolve(validVideos)
      }

      const fetchedVideos = await client.fetch(videoQueries.getAllVideos)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (!fetchedVideos || fetchedVideos.length === 0) {
        setError('No product videos found')
        setLoading(false)
        return
      }

      const validVideos = await processVideos(fetchedVideos)

      if (validVideos.length === 0) {
        setError('No valid video content available')
        setLoading(false)
        return
      }

      setVideos(validVideos)
      setLoading(false)

      // Immediate first content preload for faster LCP
      if (validVideos[0]) {
        const firstItem = validVideos[0]
        if (firstItem.contentType === 'video' && firstItem.videoFile?.asset?.url) {
          const video = document.createElement('video')
          video.preload = 'metadata'
          video.src = firstItem.videoFile.asset.url
        } else if (firstItem.contentType === 'image' && firstItem.image?.asset?.url) {
          const img = new Image()
          img.src = firstItem.image.asset.url
        }
      }
    } catch {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setError('Failed to load videos. Please try again later.')
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    if (!mounted) return
    fetchVideos()
  }, [mounted, fetchVideos])

  useEffect(() => {
    if (videos.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
        setVideoLoaded(false) // Reset video loaded state for new content
        setImageLoaded(false) // Reset image loaded state for new content
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [videos.length])

  useEffect(() => {
    // Reset loaded states and pause previous video when current content changes
    setVideoLoaded(false)
    setImageLoaded(false)

    // Pause and cleanup previous video to prevent interrupted play promises
    if (videoRef.current) {
      const video = videoRef.current
      if (!video.paused) {
        video.pause()
      }
      video.currentTime = 0
    }
  }, [currentIndex])

  useEffect(() => {
    // Try to play video when it's loaded
    if (videoRef.current && mounted && videoLoaded) {
      const video = videoRef.current
      let playPromise: Promise<void> | undefined

      const playVideo = async () => {
        try {
          if (video && !video.paused && !video.ended) return
          playPromise = video?.play()
          await playPromise
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Error playing video:', error)
          }
        }
      }

      playVideo()

      // Cleanup function to handle component unmount
      return () => {
        if (playPromise && video) {
          playPromise.catch(() => {
            // Silently handle aborted play promises
          })
        }
      }
    }
  }, [currentIndex, mounted, videoLoaded])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true)
    setIsVideoReady(true)
  }, [])

  const handleVideoError = useCallback(() => {
    setVideoLoaded(false)
    setIsVideoReady(false)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageLoaded(false)
  }, [])

  // Must call useMemo before any conditional returns
  const currentVideo = useMemo(() => videos[currentIndex], [videos, currentIndex])

  // Intersection Observer for immediate content loading
  useEffect(() => {
    if (!intersectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (currentVideo?.contentType === 'video' && videoRef.current && !isVideoReady) {
              videoRef.current.load()
            }
            // Images load automatically when src is set, no need for manual loading
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(intersectionRef.current)
    return () => observer.disconnect()
  }, [isVideoReady, currentVideo?.contentType])

  // Cleanup video on component unmount to prevent AbortError
  useEffect(() => {
    const currentVideoRef = videoRef.current
    const currentTimeout = timeoutRef.current

    return () => {
      if (currentVideoRef) {
        if (!currentVideoRef.paused) {
          currentVideoRef.pause()
        }
        currentVideoRef.src = ''
        currentVideoRef.load()
      }
      if (currentTimeout) {
        clearTimeout(currentTimeout)
      }
    }
  }, [])

  // Fast loading fallback with stable layout - CLS Prevention
  if (!mounted) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="hero-container">
          {/* Stable background container */}
          <div className="hero-background"></div>
          {/* Reserved video space */}
          <div className="hero-video-container">
            <div className="hero-background"></div>
          </div>
          {/* Stable content positioning */}
          <div className="hero-content">
            <div style={{
           width: '20rem',
              height: '0.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '1.5rem',
              contain: 'layout style paint'
            }}></div>
            <h1 className="hero-title">XHODIUM Vehicles</h1>
            <p className="hero-subtitle">
              Revolutionary armor technology and luxury automotive excellence
            </p>
            <button className="hero-button">
              <span>Explore Models</span>
            </button>
          </div>
          {loading && (
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              color: 'white',
              fontSize: '0.875rem',
              opacity: 0.7,
              contain: 'layout style'
            }}>
              Loading...
            </div>
          )}
          {/* Controls placeholder to keep indicator visible during mount */}
          <div className="absolute bottom-8 right-8 md:right-16 z-10">
            <SegmentedCircleIndicator total={1} current={0} />
          </div>
        </div>
      </>
    )
  }

  if (error || videos.length === 0) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="hero-container">
          <div className="hero-background"></div>
          <div className="hero-video-container">
            <div className="hero-background"></div>
          </div>
          <div className="hero-content">
            <div style={{
           width: '20rem',
              height: '0.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '1.5rem',
              contain: 'layout style paint'
            }}></div>
            <h1 className="hero-title">XHODIUM Vehicles</h1>
            <p className="hero-subtitle">
              Revolutionary armor technology and luxury automotive excellence
            </p>
            <button className="hero-button">
              <span>Explore Models</span>
            </button>
          </div>
          {/* Controls placeholder when no videos */}
          <div className="absolute bottom-8 right-8 md:right-16 z-10">
            <SegmentedCircleIndicator total={1} current={0} />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
      <div className="hero-container" ref={intersectionRef}>
        {/* Stable background - always present */}
        <div className="hero-background"></div>

        {/* Content container with fixed dimensions - CLS Prevention */}
        <div className="hero-video-container">
          {(!videoLoaded && !imageLoaded) && (
            <div className="hero-background"></div>
          )}

          {/* Render video if content type is video */}
          {currentVideo?.contentType === 'video' && (
            <video
              ref={videoRef}
              key={`video-${currentVideo?._id}`}
              src={currentVideo?.videoFile?.asset?.url}
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              controls={false}
              disablePictureInPicture
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              style={{
                opacity: videoLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
              poster=""
            />
          )}

          {/* Render image if content type is image */}
          {currentVideo?.contentType === 'image' && (
            <img
              ref={imageRef}
              key={`image-${currentVideo?._id}`}
              src={currentVideo?.image?.asset?.url}
              alt={currentVideo?.image?.alt || currentVideo?.name || 'Hero image'}
              className="hero-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
          )}
        </div>

        {/* Content with stable positioning */}
        <div className="hero-content">
          <div style={{
         width: '20rem',
            height: '0.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginBottom: '1.5rem',
            contain: 'layout style paint',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentIndex + 1) / videos.length) * 100}%`,
              height: '100%',
              backgroundColor: 'white',
              transition: 'width 0.5s ease',
              contain: 'layout style paint'
            }}></div>
          </div>
          <h1 className="hero-title">
            {currentVideo?.name || 'XHODIUM Vehicles'}
          </h1>
          {currentVideo?.subtitle && (
            <p className="hero-subtitle">
              {currentVideo.subtitle}
            </p>
          )}

          <button className="hero-button" style={{
            transition: 'background-color 0.2s ease'
          }}>
            <svg style={{
              width: '1.25rem',
              height: '1.25rem',
              contain: 'layout style paint'
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Explore Models</span>
          </button>
        </div>

        <VideoControlsInline
          videos={videos}
          currentIndex={currentIndex}
          onSlideChange={goToSlide}
        />
        {/* Left-side numbers control */}
        <div className="absolute bottom-8 left-8 md:left-16 z-10 flex items-center space-x-3">
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