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

// Simple video controls inline for better performance
const VideoControlsInline = ({ videos, currentIndex, onSlideChange }: {
  videos: Video[]
  currentIndex: number
  onSlideChange: (index: number) => void
}) => (
  <div className="absolute bottom-8 left-8 md:left-16 flex items-center space-x-4">
    <div className="flex space-x-1">
      {videos.map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`text-2xl font-bold transition-all ${
            index === currentIndex ? 'text-white' : 'text-white text-opacity-40'
          }`}
          aria-label={`Go to video ${index + 1}`}
        >
          {String(index + 1).padStart(2, '0')}
        </button>
      ))}
    </div>
    <div className="w-32 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
      <div
        className="h-full bg-white transition-all duration-300"
        style={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
      />
    </div>
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
  const [mounted, setMounted] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [showFallback, setShowFallback] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const intersectionRef = useRef<HTMLDivElement>(null)

  // Preload critical resources on mount
  useEffect(() => {
    setMounted(true)
    preloadCriticalResources()

    // Hide fallback after animation
    const timer = setTimeout(() => setShowFallback(false), 50)
    return () => clearTimeout(timer)
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
      }, 800) // Reduced to 800ms for faster fallback

      // Use requestIdleCallback for non-blocking processing
      const processVideos = (fetchedVideos: any[]) => {
        return new Promise<Video[]>((resolve) => {
          const process = () => {
            const validVideos = fetchedVideos.filter((video: Video) => {
              const isValid = video && video.name && video.videoFile?.asset?.url
              return isValid
            })
            resolve(validVideos)
          }

          if ('requestIdleCallback' in window) {
            requestIdleCallback(process, { timeout: 100 })
          } else {
            setTimeout(process, 0)
          }
        })
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

      // Preload first video with requestIdleCallback
      if (validVideos[0]?.videoFile?.asset?.url) {
        const preloadVideo = () => {
          const video = document.createElement('video')
          video.preload = 'metadata'
          video.src = validVideos[0].videoFile.asset.url
        }

        if ('requestIdleCallback' in window) {
          requestIdleCallback(preloadVideo, { timeout: 200 })
        } else {
          setTimeout(preloadVideo, 100)
        }
      }
    } catch (error) {
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
        // Use requestIdleCallback for non-blocking state updates
        const updateIndex = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
          setVideoLoaded(false) // Reset video loaded state for new video
        }

        if ('requestIdleCallback' in window) {
          requestIdleCallback(updateIndex, { timeout: 50 })
        } else {
          updateIndex()
        }
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [videos.length])

  useEffect(() => {
    // Reset video loaded state when current video changes
    setVideoLoaded(false)
  }, [currentIndex])

  useEffect(() => {
    // Try to play video when it's loaded with requestIdleCallback
    if (videoRef.current && mounted) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
        } catch (error) {
          console.error('Error playing video:', error)
        }
      }

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => playVideo(), { timeout: 100 })
      } else {
        setTimeout(playVideo, 16) // Next frame
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

  // Intersection Observer for performance with requestIdleCallback
  useEffect(() => {
    if (!intersectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isVideoReady) {
            const loadVideo = () => {
              if (videoRef.current) {
                videoRef.current.load()
              }
            }

            if ('requestIdleCallback' in window) {
              requestIdleCallback(loadVideo, { timeout: 150 })
            } else {
              setTimeout(loadVideo, 50)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(intersectionRef.current)
    return () => observer.disconnect()
  }, [isVideoReady])

  // Must call useMemo before any conditional returns
  const currentVideo = useMemo(() => videos[currentIndex], [videos, currentIndex])

  // Fast loading fallback with stable layout - CLS Prevention
  if (!mounted || (loading && showFallback)) {
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
              width: '4rem',
              height: '0.25rem',
              backgroundColor: 'white',
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
              width: '4rem',
              height: '0.25rem',
              backgroundColor: 'white',
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

        {/* Video container with fixed dimensions - CLS Prevention */}
        <div className="hero-video-container">
          {!videoLoaded && (
            <div className="hero-background"></div>
          )}
          <video
            ref={videoRef}
            key={currentVideo?._id}
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
        </div>

        {/* Content with stable positioning */}
        <div className="hero-content">
          <div style={{
            width: '4rem',
            height: '0.25rem',
            backgroundColor: 'white',
            marginBottom: '1.5rem',
            contain: 'layout style paint'
          }}></div>
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
      </div>
    </>
  )
}