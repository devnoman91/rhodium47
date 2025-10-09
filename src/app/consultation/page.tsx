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
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .consultation-hero {
    text-align: center;
    margin-bottom: 72px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .consultation-hero-title {
   color: #000;
text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%; /* 70.4px */
letter-spacing: -1.28px;
margin-bottom:14px;
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
      padding-inline: 20px;
      padding-top: 100px;
    }
    .consultation-hero-title {
      font-size: 40px;
    }
    .consultation-hero-description {
      font-size: 16px;
    }
    .info-sections {
      grid-template-columns: 1fr;
      gap: 20px;
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const constraintsRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [consultation, showcase, experienceXodium] = await Promise.all([
          getConsultation(),
          getProductShowcaseData(),
          getExperienceXodiumData()
        ])
        console.log('Consultation data:', consultation)
        console.log('Showcase data:', showcase)
        console.log('Experience Xodium data:', experienceXodium)
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

  const totalSlides = consultationData?.sliderSection.slides.length || 0
  const cardWidth = 1000 + 20 // card width + gap
  const maxScroll = -(totalSlides - 1) * cardWidth

  const slideLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setDragX(-newIndex * cardWidth)
    }
  }

  const slideRight = () => {
    if (currentIndex < totalSlides - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setDragX(-newIndex * cardWidth)
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
        <ProductShowcase
          products={showcaseData}
        />
      )}
        {/* Slider Section */}
        {consultationData.sliderSection.slides.length > 0 && (
          <section className="pt-[50px] lg:pt-[90px] bg-[#F4F1F2] text-black overflow-hidden -mx-[calc(var(--spacing)*12)] px-0" style={{ contain: 'layout style' }}>
            {/* Header Section - Constrained max-w-7xl */}
            <div className="max-w-[1304px] mx-auto  mb-[64px]" style={{ contain: 'layout style' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.15 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                  {/* Left - Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1"
                  >
                    <h2 className="text-black font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                      {consultationData.sliderSection.mainName}
                    </h2>
                  </motion.div>

                  {/* Right - Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="lg:col-span-1 flex items-center justify-end"
                  >
                    <p className="text-black font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
                      {consultationData.sliderSection.mainTitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Slider - Extending Full Width */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.15 }}
              className="relative"
            >
              {/* Left Padding for Content Alignment */}
              <div className="pl-6 lg:pl-[calc((100vw-1280px)/2+-1rem)]">
                {/* Slider Container */}
                <div className="relative overflow-visible" ref={constraintsRef}>
                  <motion.div
                    className="flex gap-5 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{
                      left: maxScroll,
                      right: 0
                    }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    animate={{ x: dragX }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    onDragEnd={(_, info) => {
                      const offset = info.offset.x
                      const velocity = info.velocity.x

                      if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
                        if (offset > 0 && currentIndex > 0) {
                          slideLeft()
                        } else if (offset < 0 && currentIndex < totalSlides - 1) {
                          slideRight()
                        }
                      }
                    }}
                    style={{ width: 'max-content' }}
                  >
                    {consultationData.sliderSection.slides.map((slide, index) => (
                      <motion.div
                        key={`${slide.name}-${index}`}
                        className="w-[936px] flex-shrink-0 group transition-all duration-300"
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
                        <div className= " h-[468px] w-full relative aspect-[1/0.55] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                          {slide.image?.asset?.url && (
                            <Image
                              src={slide.image.asset.url}
                              alt={slide.image.alt || slide.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              loading="lazy"
                              style={{ contain: 'layout style paint' }}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
                        </div>

                        {/* Content */}
                        <div className="pt-[42px] max-w-[656px]">
                          <div className="">
                            <h3 className="text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                              {slide.name}
                            </h3>
                            <p className="text-[16px] leading-[20px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </div>
        {experienceXodiumData && (
        <ExperienceXodiumSection
          data={experienceXodiumData}
        />
      )}
    </>
  )
}
