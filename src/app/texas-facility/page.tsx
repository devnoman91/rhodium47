'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { TexasFacility } from '@/content/types'
import { getTexasFacility } from '@/content/queries'

// Hero Section Component
const HeroSection: React.FC<{ sectionLabel: string; mainHeading: string }> = ({
  sectionLabel,
  mainHeading,
}) => {
  return (
    <section className="relative  bg-[#F4F1F2]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="md:text-[64px] text-[30px] md:pt-[170px] pt-[102px] font-medium leading-[110%] tracking-[-1.28px] text-black max-w-[1200px] mx-auto md:mb-6 mb-[10px] font-helvetica">
             {sectionLabel}
          </h1>
          <p className="md:text-[24px] text-[16px] font-medium text-[#111] leading-[150%] capitalize max-w-[855px] mx-auto font-helvetica">
           {mainHeading}
          </p>

        </motion.div>
      </div>
    </section>
  )
}

// Video Section Component
const VideoSection: React.FC<{
  title?: string
  description?: string
  desktopVideoFile?: { asset: { url: string } }
  mobileVideoFile?: { asset: { url: string } }
  videoUrl?: string
  thumbnail?: { asset: { url: string }; alt?: string }
}> = ({ title, description, desktopVideoFile, mobileVideoFile, videoUrl, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Determine if we're using uploaded video files or external URLs
  const hasUploadedVideo = !!(desktopVideoFile?.asset?.url || mobileVideoFile?.asset?.url)
  const desktopVideoUrl = desktopVideoFile?.asset?.url
  const mobileVideoUrl = mobileVideoFile?.asset?.url || desktopVideoUrl

  // Extract video ID and type from URL for YouTube/Vimeo
  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('/').pop()?.split('?')[0]
        : new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    } else if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return url
  }

  const handlePlayVideo = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <section className="py-[42px] md:py-[90px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto px-4 md:px-6">
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            {title && <h2 className="text-[30px] md:text-[48px] font-medium text-black mb-4">{title}</h2>}
            {description && <p className="text-[16px] md:text-[18px] text-gray-700 max-w-[800px] mx-auto">{description}</p>}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-video rounded-[20px] overflow-hidden bg-black"
        >
          {/* Direct uploaded video files - autoplay like HeroCarousel */}
          {hasUploadedVideo ? (
            <>
              {/* Desktop video */}
              {desktopVideoUrl && (
                <video
                  ref={videoRef}
                  src={desktopVideoUrl}
                  className="w-full h-full object-cover md:block hidden"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                />
              )}
              {/* Mobile video */}
              {mobileVideoUrl && (
                <video
                  src={mobileVideoUrl}
                  className="w-full h-full object-cover md:hidden block"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                />
              )}
            </>
          ) : videoUrl && !isPlaying ? (
            <>
              {/* Thumbnail for YouTube/Vimeo */}
              <div className="relative w-full h-full">
                {thumbnail?.asset?.url ? (
                  <img
                    src={thumbnail.asset.url}
                    alt={thumbnail.alt || 'Video thumbnail'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}

                {/* Play Button Overlay */}
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 md:w-12 md:h-12 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>
            </>
          ) : videoUrl && isPlaying ? (
            <>
              {/* YouTube/Vimeo iframe after play button clicked */}
              {(videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com')) ? (
                <iframe
                  src={getVideoEmbedUrl(videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}

// Facility Features Section
const FacilityFeaturesSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    title: string
    image: { asset: { url: string }; alt?: string }
    description: string
  }>
}> = ({ title, description, cards }) => {
  return (
    <section className="pt-[50px] pb-[50px] lg:pb-[90px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] m-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-[54px] flex flex-col lg:flex-row justify-between gap-8 lg:gap-[182px]"
        >
          <h2 className="text-[48px] lg:text-[64px] font-[500] text-black mb-0">{title}</h2>
          <p className="text-[16px] lg:text-[16px] font-medium text-black max-w-[517px] lg:ml-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-[260px] rounded-[20px] overflow-hidden mb-[31px] mx-auto">
                <Image
                  src={card.image.asset.url}
                  alt={card.image.alt || card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[16px] leading-[1] font-[500] text-black mb-[8px] text-center">
                {card.title}
              </h3>
              <p className="text-[16px] text-[#3F3E4B] font-[400] text-center">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// Slider Section Component (Horizontal Draggable Slider - Forever Section Style)
const SliderSection: React.FC<{
  mainName: string
  mainTitle: string
  slides: Array<{
    name: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ mainName, mainTitle, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const constraintsRef = useRef(null)

  // detect small screen for swipe behavior
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = slides.length
  const cardWidth = isSmallScreen ? (Math.min(window.innerWidth, 420)) : 1000 + 20
  const maxScroll = -(totalSlides - 1) * cardWidth

  // ensure dragX follows currentIndex and cardWidth changes
  useEffect(() => {
    setDragX(-currentIndex * cardWidth)
  }, [currentIndex, cardWidth])

  const slideLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      // setDragX will be applied by effect
    } else {
      // snap back
      setDragX(-currentIndex * cardWidth)
    }
  }

  const slideRight = () => {
    if (currentIndex < totalSlides - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
    } else {
      setDragX(-currentIndex * cardWidth)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        slideLeft()
      } else if (event.key === 'ArrowRight') {
        slideRight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, totalSlides])

  return (
    <section className="pt-[30px] lg:pt-[89px] pb-[50px] lg:pb-[102px] bg-[#560100] text-white overflow-hidden md:px-0 px-[13px]" style={{ contain: 'layout style' }}>
      {/* Header Section */}
      <div className="max-w-[1304px] mx-auto md:mb-[64px] mb-[43px]" style={{ contain: 'layout style' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] lg:gap-16">
            {/* Left - Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <h2 className="md:text-left text-center text-white font-medium md:text-[64px] text-[34px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                {mainName}
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-1 flex items-center justify-end"
            >
              <p className="text-white md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica md:max-w-[480px]">
                {mainTitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Draggable Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.15 }}
        className="relative"
      >
        {/* Left Padding for Content Alignment */}
        <div className="md:pl-6 lg:pl-[calc((100vw-1280px)/2+-1rem)]">
          {/* Slider Container */}
          <div className="relative overflow-visible" ref={constraintsRef}>
            <motion.div
              className="flex gap-5 cursor-grab active:cursor-grabbing md:w-fit !w-full"
              drag="x"
              dragConstraints={{
                left: maxScroll,
                right: 0
              }}
              dragElastic={0.12}
              dragMomentum={false}
              animate={{ x: dragX }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onDragEnd={(_, info) => {
                const offset = info.offset.x
                const velocity = info.velocity.x
                // threshold smaller on mobile
                const threshold = isSmallScreen ? (cardWidth * 0.12) : 100
                const fastSwipe = Math.abs(velocity) > (isSmallScreen ? 400 : 800)

                if (offset > threshold || (fastSwipe && offset > 0)) {
                  // move to previous
                  slideLeft()
                } else if (offset < -threshold || (fastSwipe && offset < 0)) {
                  slideRight()
                } else {
                  // snap back to current
                  setDragX(-currentIndex * cardWidth)
                }
              }}
              style={{ width: 'max-content' }}
            >
              {slides.map((slide, index) => (
                <motion.div
                  key={`${slide.name}-${index}`}
                  className="w-full md:w-[936px] 2xl:w-[1100px] flex-shrink-0 group transition-all duration-300 mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }}
                >
                  {/* Media Content */}
                  <div className="h-[468px] w-full relative aspect-[1/0.55] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                    {slide.image?.asset?.url && (
                      <Image
                        src={slide.image.asset.url}
                        alt={slide.image.alt || slide.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        loading="lazy"
                        style={{ contain: 'layout style paint' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
                  </div>

                  {/* Content */}
                  <div className="md:pt-[42px] pt-[20px] md:max-w-[656px] w-full">
                    <div>
                      <h3 className="md:text-left text-center font-medium text-[24px] leading-[150%] text-white capitalize font-helvetica mb-[10px]">
                        {slide.name}
                      </h3>
                      <p className="sm:max-w-fit max-w-[283px] text-[16px] md:text-left text-center leading-[20px] tracking-[0] m-0 mx-auto font-normal font-helvetica text-white opacity-60">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot Navigation */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                }}
                className="group cursor-pointer relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-[#560100] scale-110'
                      : 'bg-white hover:bg-white'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

// Design Process Section
const DesignProcessSection: React.FC<{
  title: string
  description: string
  sections: Array<{
    title: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ title, description, sections }) => {
  return (
    <section className="pt-[50px] lg:pt-[94px] pb-[64px] bg-[#F4F1F2] text-black md:px-0 px-[13px]" style={{ contain: 'layout style' }}>
      {/* Header Section */}
      <div className="max-w-[1304px] mx-auto md:mb-[62px] mb-[43px]" style={{ contain: 'layout style' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[17px] lg:gap-16">
            {/* Left - Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <h2 className="md:text-left text-center text-black font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                {title}
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-1 flex items-center justify-end"
            >
              <p className="text-black md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica md:max-w-[480px]">
                {description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Design Process Grid - 2 columns */}
      <div className="max-w-[1304px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-x-5 gap-[18px] md:gap-y-[42px]">
          {sections.map((section, index) => (
            <motion.div
              key={`${section.title}-${index}`}
              className="group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: (index % 2) * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              {/* Media Content */}
              <div className="h-[468px] w-full relative overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                {section.image?.asset?.url && (
                  <Image
                    src={section.image.asset.url}
                    alt={section.image.alt || section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    loading="lazy"
                    style={{ contain: 'layout style paint' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
              </div>

              {/* Content */}
              <div className="md:pt-[42px] pt-[20px] md:max-w-[656px]">
                <div className="">
                  <h3 className="text-[#111] md:text-left text-center font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                    {section.title}
                  </h3>
                  <p className="text-[16px] leading-[20px] md:text-left text-center tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// By The Numbers Section
const ByTheNumbersSection: React.FC<{
  title: string
  description: string
  countSection: Array<{ name: string; value: string }>
}> = ({ title, description, countSection }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = description ? description.split(' ') : []

  return (
    <section className="pt-[37px] lg:pt-[108px] pb-[50px] lg:pb-[54px] bg-[#560100] px-[15px]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-white max-w-[810px] m-auto">
              <div className="flex flex-row text-white text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span>{title}</span>
              </div>

              <div className="space-y-6">
                <p
                  ref={descriptionRef}
                  className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-0.8px] m-0 font-medium font-helvetica flex flex-wrap text-white"
                >
                  {words.map((word, i) => {
                    const start = i / words.length
                    const end = (i + 1) / words.length
                    const color = useTransform(scrollYProgress, [start, end], ['rgba(255, 255, 255, 0.5)', '#ffffff'])
                    const opacity = useTransform(scrollYProgress, [start, end], [0.6, 1])
                    return (
                      <motion.span key={i} style={{ color, opacity }} className="mr-2">
                        {word}
                      </motion.span>
                    )
                  })}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Count Section */}
        {countSection && countSection.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-[52px] max-w-[1280px] m-auto"
          >
            {countSection.map((count, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="border-b border-[#fff] text-[20px] tracking-[-0.4px] font-[400] text-[#fff] font-helvetica mb-[24px] pb-[31px]">
                  {count.name}
                </div>
                <div className="text-[20px] tracking-[-0.8px] font-[500] text-[#fff] font-helvetica uppercase">
                  {count.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0
  }
}

// Call to Action Section
const CallToActionSection: React.FC<{
  title: string
  description: string
  buttonText: string
  buttonLink: string
}> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="pt-[46px] pb-[54px] lg:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-[15px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[71px] gap-[18px]">
            <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-[24px]">
              <h1 className="text-[30px] md:text-[62px] not-italic tracking-normal md:leading-[68px] leading-[33px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                style={{
                  background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </h1>

              {/* Desktop Button */}
              <div className="lg:col-span-1 space-y-8 md:block hidden">
                <motion.a
                  href={buttonLink}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                             border border-black bg-[#560100] text-white font-helvetica
                             text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    className="absolute inset-0 bg-white translate-x-full
                               transition-transform duration-500 ease-in-out rounded-[32px]
                               group-hover:translate-x-0"
                  />
                  <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                    {buttonText}
                  </span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="space-y-5 flex flex-col justify-end items-end">
                {description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] md:max-w-[575px]"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile Button - shown after description */}
          <div className="mt-[14px] space-y-8 block md:hidden">
            <motion.a
              href={buttonLink}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                         border border-black bg-[#560100] text-white font-helvetica
                         text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="absolute inset-0 bg-white translate-x-full
                           transition-transform duration-500 ease-in-out rounded-[32px]
                           group-hover:translate-x-0"
              />
              <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                {buttonText}
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function TexasFacilityPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TexasFacility | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const texasFacilityData = await getTexasFacility()
        setData(texasFacilityData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Texas Facility:', err)
        setError('Failed to load Texas Facility page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-gray-600">Loading Texas Facility...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-red-600">{error || 'No Texas Facility data found'}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      {data.heroSection && (
        <HeroSection
          sectionLabel={data.heroSection.sectionLabel}
          mainHeading={data.heroSection.mainHeading}
        />
      )}

      {/* Video Section */}
      {data.videoSection && (
        <VideoSection
          title={data.videoSection.title}
          description={data.videoSection.description}
          desktopVideoFile={data.videoSection.desktopVideoFile}
          mobileVideoFile={data.videoSection.mobileVideoFile}
          videoUrl={data.videoSection.videoUrl}
          thumbnail={data.videoSection.thumbnail}
        />
      )}

      {/* Facility Features */}
      {data.facilityFeatures && (
        <FacilityFeaturesSection
          title={data.facilityFeatures.title}
          description={data.facilityFeatures.description}
          cards={data.facilityFeatures.cards}
        />
      )}

      {/* Slider Section */}
      {data.sliderSection && (
        <SliderSection
          mainName={data.sliderSection.mainName}
          mainTitle={data.sliderSection.mainTitle}
          slides={data.sliderSection.slides}
        />
      )}

      {/* Design Process Section */}
      {data.designProcess && (
        <DesignProcessSection
          title={data.designProcess.title}
          description={data.designProcess.description}
          sections={data.designProcess.sections}
        />
      )}

      {/* By The Numbers Section */}
      {data.byTheNumbersSection && (
        <ByTheNumbersSection
          title={data.byTheNumbersSection.title}
          description={data.byTheNumbersSection.description}
          countSection={data.byTheNumbersSection.countSection}
        />
      )}

      {/* Call to Action */}
      {data.callToAction && (
        <CallToActionSection
          title={data.callToAction.title}
          description={data.callToAction.description}
          buttonText={data.callToAction.buttonText}
          buttonLink={data.callToAction.buttonLink}
        />
      )}
    </main>
  )
}