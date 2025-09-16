'use client'

import { useState, useEffect, useRef } from 'react'
import { client } from '@/sanity/lib/client'
import { Video } from '@/content/types'
import { videoQueries } from '@/content/queries'

export default function HeroCarousel() {
  const [videos, setVideos] = useState<Video[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchVideos = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedVideos = await client.fetch(videoQueries.getAllVideos)
        

        if (!fetchedVideos || fetchedVideos.length === 0) {
          setError('No product videos found')
          setLoading(false)
          return
        }

        const validVideos = fetchedVideos.filter((video: Video) => {
          const isValid = video && video.name && video.videoFile?.asset?.url
          
          return isValid
        })

        if (validVideos.length === 0) {
          setError('No valid video content available')
          setLoading(false)
          return
        }

        setVideos(validVideos)
        setLoading(false)
      } catch (error) {
        setError('Failed to load videos. Please try again later.')
        setLoading(false)
      }
    }

    fetchVideos()
  }, [mounted])

  useEffect(() => {
    if (videos.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
        setVideoLoaded(false) // Reset video loaded state for new video
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [videos.length])

  useEffect(() => {
    // Reset video loaded state when current video changes
    setVideoLoaded(false)
  }, [currentIndex])

  useEffect(() => {
    // Try to play video when it's loaded
    if (videoRef.current && mounted) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
     
        } catch (error) {
          console.error('Error playing video:', error)
        }
      }
      playVideo()
    }
  }, [currentIndex, mounted, videoLoaded])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }



  const handleVideoLoad = () => {
    
  }

  const handleVideoError = (e: any) => {
   
    setVideoLoaded(false)
  }

  // Render loading state consistently on server and client
  if (!mounted || loading) {
    return (
      <div className="relative w-full h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">Loading videos...</div>
        </div>
      </div>
    )
  }

  if (error || videos.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">
            {error || 'No product videos found. Please add product videos in Sanity Studio.'}
          </div>
        </div>
      </div>
    )
  }

  const currentVideo = videos[currentIndex]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        {!videoLoaded && (
          <div className="a" />
        )}
        <video
          ref={videoRef}
          key={currentVideo._id}
          src={currentVideo.videoFile?.asset?.url}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onLoadStart={() => console.log('Video load started')}
          onCanPlay={() => console.log('Video can play')}
          onPlay={() => console.log('Video started playing')}
          style={{ objectFit: 'cover' }}
        />
       
      </div>

      <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white max-w-lg">
        <div className="w-16 h-1 bg-white mb-6"></div>
        <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
          {currentVideo?.name || 'Loading...'}
        </h1>
        {currentVideo?.subtitle && (
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {currentVideo.subtitle}
          </p>
        )}

      

        <button className="flex items-center space-x-3 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium">Explore Models</span>
        </button>
      </div>


      <div className="absolute bottom-8 left-8 md:left-16 flex items-center space-x-4">
        <div className="flex space-x-1">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`text-2xl font-bold transition-all ${
                index === currentIndex ? 'text-white' : 'text-white text-opacity-40'
              }`}
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
    </div>
  )
}