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
    image?: {
      asset: {
        url: string
      }
      alt?: string
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
`

export default function ProductHeroSection({ heroSection }: ProductHeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const intersectionRef = useRef<HTMLDivElement>(null)

  console.log('ProductHeroSection props:', heroSection)

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
            <video
              ref={videoRef}
              key={`product-video-${heroSection.videoFile.asset.url}`}
              src={heroSection.videoFile.asset.url}
              className="product-hero-video"
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
            <button className="product-hero-button" style={{
              transition: 'background-color 0.2s ease'
            }}>
              Order Now
            </button>
            <button className="product-hero-secondary-button" style={{
              transition: 'background-color 0.2s ease'
            }}>
              Demo Drive
            </button>
          </div>
        </div>
      </div>
    </>
  )
}