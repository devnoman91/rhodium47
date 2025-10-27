'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface ProductHeroSectionProps {
  heroSection: {
    name?: string
    title?: string
    contentType?: 'video' | 'image'
    videoFile?: {
      asset: {
        url: string
      }
    }
    enableSound?: boolean
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
    primaryButton?: {
      text?: string
      link?: string
    }
    secondaryButton?: {
      text?: string
      link?: string
    }
  }
}

// Critical styles similar to HeroCarousel
const criticalInlineStyles = `
  .product-hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .product-hero-video-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    contain: layout style;
    transform: translateZ(0);
  }
  .product-hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .product-hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .product-hero-content {
    position: absolute;
    left: 2rem;
    top: 30%;
    transform: translateY(-50%) translateZ(0);
    color: white;
    max-width: 28rem;
    z-index: 10;
    contain: layout style;
    font-display: swap;
  }
  .product-hero-title {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }
  .product-hero-background {
    position: absolute;
    inset: 0;
    background: #000;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .product-hero-subtitle {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.32px;
    margin-bottom: 30px;
  }
  .product-hero-button {
    display: flex;
    height: auto;
    padding: 9px 25px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.4px;
    border-radius: 100px;
    border: 1px solid rgba(157, 192, 59, 0.00);
    background: #FFF;
    cursor: pointer;
  }
  .btn_wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .product-hero-secondary-button {
    display: flex;
    height: auto;
    padding: 9px 25px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-family: 'helveticaNeue';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.4px;
    border-radius: 100px;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .sound-toggle-button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.3s ease;
  }
  .sound-toggle-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  .sound-icon {
    width: 24px;
    height: 24px;
    color: white;
  }
@media (max-width: 767px) {
 .btn_wrapper {
    justify-content: center;
}
.product-hero-content {
    left: 0 !important;
    top: 20% !important;
    transform: unset !important;
    color: white;
    max-width: 100% !important;
    z-index: 10;
    contain: layout style;
    padding: 0 20px !important;
    text-align: center !important;
    font-display: swap;
}

}

`

export default function ProductHeroSection({ heroSection }: ProductHeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const intersectionRef = useRef<HTMLDivElement>(null)

  console.log('ProductHeroSection props:', heroSection)
  console.log('Video URL:', heroSection?.videoFile?.asset?.url)
  console.log('Content Type:', heroSection?.contentType)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Reset loaded states when heroSection changes
    setVideoLoaded(false)
    setImageLoaded(false)
    setIsVideoReady(false)

    // Pause and cleanup previous video
    if (videoRef.current) {
      const video = videoRef.current
      if (!video.paused) {
        video.pause()
      }
      video.currentTime = 0
    }
  }, [heroSection])

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

      return () => {
        if (playPromise && video) {
          playPromise.catch(() => {
            // Silently handle aborted play promises
          })
        }
      }
    }
  }, [mounted, videoLoaded])

  const handleVideoLoad = useCallback(() => {
    console.log('Video loaded successfully')
    setVideoLoaded(true)
    setIsVideoReady(true)
  }, [])

  const handleVideoError = useCallback(() => {
    console.error('Video failed to load')
    setVideoLoaded(false)
    setIsVideoReady(false)
  }, [])

  const handleImageLoad = useCallback(() => {
    console.log('Image loaded successfully')
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    console.error('Image failed to load')
    setImageLoaded(false)
  }, [])

  const toggleSound = useCallback(() => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }, [isMuted])

  // Intersection Observer for content loading
  useEffect(() => {
    if (!intersectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (heroSection?.contentType === 'video' && videoRef.current && !isVideoReady) {
              videoRef.current.load()
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(intersectionRef.current)
    return () => observer.disconnect()
  }, [isVideoReady, heroSection?.contentType])

  // Cleanup video on component unmount
  useEffect(() => {
    const currentVideoRef = videoRef.current

    return () => {
      if (currentVideoRef) {
        if (!currentVideoRef.paused) {
          currentVideoRef.pause()
        }
        currentVideoRef.src = ''
        currentVideoRef.load()
      }
    }
  }, [])

  if (!mounted) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="product-hero-container">
          <div className="product-hero-background"></div>
          <div className="product-hero-video-container">
            <div className="product-hero-background"></div>
          </div>
        </div>
      </>
    )
  }

  if (!heroSection) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="product-hero-container">
          <div className="product-hero-background"></div>
          <div className="product-hero-video-container">
            <div className="product-hero-background"></div>
          </div>
          <div className="product-hero-content">
            <h1 className="product-hero-title">No Hero Content Available</h1>
          </div>
        </div>
      </>
    )
  }

  console.log('Rendering hero section with content type:', heroSection.contentType)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
      <div className="product-hero-container" ref={intersectionRef}>
        <div className="product-hero-background"></div>

        <div className="product-hero-video-container">
          {(!videoLoaded && !imageLoaded) && (
            <div className="product-hero-background"></div>
          )}

          {/* Render video if content type is video */}
          {heroSection.contentType === 'video' && heroSection.videoFile?.asset?.url && (
            <>
              <video
                ref={videoRef}
                key={`product-video-${heroSection.videoFile.asset.url}`}
                src={heroSection.videoFile.asset.url}
                className="product-hero-video"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onCanPlay={() => console.log('Video can play')}
                onPlay={() => console.log('Video playing')}
                onPause={() => console.log('Video paused')}
                style={{
                  opacity: videoLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
                poster=""
              />

              {/* Sound Toggle Button - only show if sound is enabled in schema */}
              {heroSection.enableSound && videoLoaded && (
                <button
                  className="sound-toggle-button"
                  onClick={toggleSound}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <svg className="sound-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="sound-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              )}
            </>
          )}

          {/* Render image if content type is image */}
          {heroSection.contentType === 'image' && heroSection.image?.asset?.url && (
            <img
              ref={imageRef}
              key={`product-image-${heroSection.image.asset.url}`}
              src={heroSection.image.asset.url}
              alt={heroSection.image.alt || heroSection.name || 'Product hero image'}
              className="product-hero-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
          )}
        </div>

        {/* Content overlay */}
        <div className="product-hero-content">
          {heroSection.name && (
            <h1 className="product-hero-title">
              {heroSection.name}
            </h1>
          )}
          {heroSection.title && (
            <p className="product-hero-subtitle">
              {heroSection.title}
            </p>
          )}

          <div className="btn_wrapper">
            {/* Primary Button (Order Now) */}
<a
  href={heroSection.primaryButton?.link || '#'}
  className="relative overflow-hidden inline-flex justify-center items-center
             product-hero-button rounded-full px-6 py-3 font-helvetica text-[16px] font-medium
             cursor-pointer group focus:outline-none border border-transparent
             transition-all"
  style={{
    transition: 'background-color 0.2s ease',
    textDecoration: 'none',
  }}
>
  {/* Sliding overlay */}
  <span
    className="absolute inset-0 bg-black translate-x-full
               transition-transform duration-500 ease-in-out rounded-full
               group-hover:translate-x-0"
  />
  {/* Text */}
  <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
    {heroSection.primaryButton?.text || 'Order Now'}
  </span>
</a>

{/* Secondary Button (Demo Drive) */}
<a
  href={heroSection.secondaryButton?.link || '#'}
  className="relative overflow-hidden inline-flex justify-center items-center
             product-hero-secondary-button rounded-full px-6 py-3 font-helvetica text-[16px] font-medium
             cursor-pointer group focus:outline-none border border-black
             transition-all"
  style={{
    transition: 'background-color 0.2s ease',
    textDecoration: 'none',
  }}
>
  {/* Sliding overlay */}
  <span
    className="absolute inset-0 bg-white translate-x-full
               transition-transform duration-500 ease-in-out rounded-full
               group-hover:translate-x-0"
  />
  {/* Text */}
  <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black ">
    {heroSection.secondaryButton?.text || 'Demo Drive'}
  </span>
</a>

          </div>
        </div>
      </div>
    </>
  )
}