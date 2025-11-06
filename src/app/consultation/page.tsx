'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getConsultation } from '@/content/queries'
import { getProductShowcaseData, getExperienceXodiumData } from '@/sanity/lib/sanity'
import type { Consultation } from '@/content/types'
import type { ShowcaseProduct } from '@/content/types'

import ExperienceXodiumSection from '@/components/ExperienceXodiumSection'
import ProductShowcase from '@/components/Productconsultation'

const criticalInlineStyles = `
  .consultation-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 170px;
    background: #F4F1F2;
    // padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .consultation-hero {
    text-align: center;
    margin-bottom: 72px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding:0 13px;
  }
  .consultation-hero-title {
   color: #000;
text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%; /* 70.4px */
letter-spacing: -1.28px;
margin-bottom:24px;
  }
  .consultation-hero-description {
    color: #111;
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;

font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 36px */
text-transform: capitalize;
max-width: 855px;
margin:auto;
  }

  /* Info Sections */
  .info-sections {
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    display:flex;
    gap: 30px;
    max-width: 1304px;
    margin: auto;
    margin-bottom: 49px;
    padding:0 13px;
  }
  .info-card {
    max-width: 392px;
    width: 100%;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .info-card:nth-child(2){
      max-width: 463px;
      width: 100%;
  }
  .info-card-image-wrapper {
    position: relative;
    width: 100%;
    height: 260px;
        border-radius: 20px;
    overflow: hidden;    display: flex;
  }
  .info-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .info-card:hover .info-card-image {
    transform: scale(1.05);
  }
  .info-card-content {
    padding-top: 31px;
  }
  .info-card-name {
   color: #111;
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;

font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 24px */
text-transform: capitalize;
    margin-bottom: 8px;
  }
  .info-card-description {
  color: #3F3E4B;
text-align: center;

font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 125% */
  }

  /* Slider Section */
  .slider-section {
    margin-bottom: 60px;
  }
  .slider-header {
    text-align: center;
    margin-bottom: 60px;
  }
  .slider-main-name {
    color: #666;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }
  .slider-main-title {
    color: #000;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.96px;
  }

  /* Slider */
  .slider-container {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
  }
  .slider-wrapper {
    overflow: hidden;
    position: relative;
  }
  .slider-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .slide-card {
    min-width: calc(33.333% - 20px);
    margin-right: 30px;
    background: #FFF;
    border-radius: 16px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .slide-image-wrapper {
    position: relative;
    width: 100%;
    height: 350px;
    overflow: hidden;
  }
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .slide-content {
    padding: 30px;
  }
  .slide-name {
    color: #000;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    margin-bottom: 12px;
  }
  .slide-description {
    color: #333;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  /* Slider Navigation */
  .slider-nav {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }
  .slider-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000;
    border: none;
    color: #FFF;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease, transform 0.2s ease;
    font-size: 20px;
  }
  .slider-button:hover {
    background: #333;
    transform: scale(1.1);
  }
  .slider-button:disabled {
    background: #CCC;
    cursor: not-allowed;
    transform: scale(1);
  }
  .slider-dots {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 30px;
  }
  .slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #DDD;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }
  .slider-dot.active {
    background: #000;
    transform: scale(1.3);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .info-sections {
      grid-template-columns: repeat(2, 1fr);
    }
    .slide-card {
      min-width: calc(50% - 15px);
    }
  }
  @media (max-width: 768px) {
    .consultation-container {
      padding-top: 100px;
    padding-bottom: 59px;
}
        .consultation-hero {
    margin-bottom: 29px;
}
    .consultation-hero-title {
      font-size: 34px;
      margin-bottom:6px;
    }
    .consultation-hero-description {
      font-size: 16px;
    }
    .info-sections {
      flex-direction:column;
      gap: 41px;
    }
    .slider-main-title {
      font-size: 32px;
    }
    .slide-card {
      min-width: 100%;
    }
  }
`

export default function ConsultationPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consultationData, setConsultationData] = useState<Consultation | null>(null)
  const [showcaseData, setShowcaseData] = useState<ShowcaseProduct[]>([])
  const [experienceXodiumData, setExperienceXodiumData] = useState<any>(null)

  // slider state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [consultation, showcase, experienceXodium] = await Promise.all([
          getConsultation(),
          getProductShowcaseData(),
          getExperienceXodiumData()
        ])
        setConsultationData(consultation)
        setShowcaseData(showcase)
        setExperienceXodiumData(experienceXodium)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching consultation:', err)
        setError('Failed to load consultation page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // detect small screen for swipe behavior
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = consultationData?.sliderSection.slides.length || 0

  // cardWidth should match the visible slide size on the current screen
  const cardWidth = isSmallScreen ? (Math.min(window.innerWidth, 420)) : 1000 + 20 // desktop original approx
  // max scroll left value
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

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="consultation-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading consultation...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !consultationData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="consultation-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No consultation data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="consultation-container">
        {/* Hero Section */}
        <motion.div
          className="consultation-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="consultation-hero-title font-helvetica">{consultationData.heroSection.title}</h1>
          <p className="consultation-hero-description">{consultationData.heroSection.description}</p>
        </motion.div>

        {/* Info Sections */}
        <div className="info-sections">
          {consultationData.infoSections.map((section, index) => (
            <motion.div
              key={index}
              className="info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="info-card-image-wrapper">
                {section.image?.asset?.url && (
                  <img
                    src={section.image.asset.url}
                    alt={section.image.alt || section.name}
                    className="info-card-image"
                  />
                )}
              </div>
              <div className="info-card-content">
                <h3 className="info-card-name">{section.name}</h3>
                <p className="info-card-description">{section.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {showcaseData.length > 0 && (
          <ProductShowcase products={showcaseData} />
        )}

        {/* Slider Section (keeps desktop layout; improved mobile swipe) */}
        {consultationData.sliderSection.slides.length > 0 && (
          <section className="pt-[50px] lg:pt-[90px] bg-[#F4F1F2] mmd:px-0 px-[13px] text-black overflow-hidden " style={{ contain: 'layout style' }}>
            {/* Header Section */}
            <div className="max-w-[1304px] mx-auto md:mb-[64px] mb-[43px]" style={{ contain: 'layout style' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] lg:gap-16">
                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
                    <h2 className="md:text-left text-center text-black font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                      {consultationData.sliderSection.mainName}
                    </h2>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }} className="lg:col-span-1 flex items-center justify-end">
                    <p className="text-black md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
                      {consultationData.sliderSection.mainTitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Slider - Extending Full Width */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }} className="relative">
              <div className="md:pl-6 lg:pl-[calc((100vw-1280px)/2+-1rem)]">
                <div className="relative overflow-visible" ref={constraintsRef}>
                  <motion.div
                    className="flex gap-5 cursor-grab active:cursor-grabbing md:w-fit !w-full"
                    drag="x"
                    dragConstraints={{ left: maxScroll, right: 0 }}
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
                    {consultationData.sliderSection.slides.map((slide, index) => (
                      <motion.div
                        key={`${slide.name}-${index}`}
                        // Responsive widths — keep desktop look, but mobile shows one centered card
                        className="w-full md:w-[936px] 2xl:w-[1100px] flex-shrink-0 group transition-all duration-300 mx-auto"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.6,
                            ease: 'easeOut'
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
                              className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px] w-full"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              loading="lazy"
                              style={{ contain: 'layout style paint' }}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
                        </div>

                        {/* Content */}
                        <div className="md:pt-[42px] pt-[15px] md:max-w-[656px] w-full">
                          <div>
                            <h3 className="md:text-left text-center text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                              {slide.name}
                            </h3>
                            <p className="sm:max-w-fit max-w-[283px] text-[16px] md:text-left text-center leading-[20px] tracking-[0] m-0 mx-auto font-normal font-helvetica text-black opacity-60">
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
                  {consultationData.sliderSection.slides.map((_, index) => (
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
                            : 'bg-gray-400 hover:bg-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </section>
        )}
      </div>

      {experienceXodiumData && (
        <ExperienceXodiumSection data={experienceXodiumData} />
      )}
    </>
  )
}
