'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getTraining } from '@/content/queries'
import { getProductShowcaseData } from '@/sanity/lib/sanity'
import type { Training } from '@/content/types'
import type { ShowcaseProduct } from '@/content/types'
import ProductShowcase from '@/components/Productconsultation'

const criticalInlineStyles = `
  .training-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    // padding-bottom: 89px;
  }

  /* Hero Section */
  .training-hero {
    text-align: center;
    margin-bottom: 72px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .training-hero-title {
   color: #000;
text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%;
letter-spacing: -1.28px;
margin-bottom:14px;
  }
  .training-hero-description {
    color: #111;
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 150%;
text-transform: capitalize;
max-width: 855px;
margin:auto;
  }

  /* Info Sections */
  .training-container .info-sections {
    display:flex;
    gap: 30px;
    max-width: 1304px;
    margin: auto;
    margin-bottom: 0;
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
    overflow: hidden;
    display: flex;
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
  .training-container .info-card-name {
   color: #111;
text-align: left;
font-feature-settings: 'liga' off, 'clig' off;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 150%;
text-transform: capitalize;
    margin-bottom: 8px;
  }
 .training-container .info-card-description {
  color: #3F3E4B;
text-align: left;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .info-sections {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .training-container {
      padding-inline: 15px;
      padding-top: 100px;
    }
    .training-hero-title {
      font-size: 40px;
    }
    .training-hero-description {
      font-size: 16px;
    }
    .info-sections {
      flex-direction: column;
      gap: 41px;
    }
      .training-hero {
    margin-bottom: 29px;
}
  }
`

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

export default function TrainingPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trainingData, setTrainingData] = useState<Training | null>(null)
  const [showcaseData, setShowcaseData] = useState<ShowcaseProduct[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [training, showcase] = await Promise.all([
          getTraining(),
          getProductShowcaseData()
        ])
        console.log('Training data:', training)
        console.log('Showcase data:', showcase)
        setTrainingData(training)
        setShowcaseData(showcase)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching training:', err)
        setError('Failed to load training page')
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

  const totalSlides = trainingData?.sliderSection.slides.length || 0

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
        <div className="training-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading training...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !trainingData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="training-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No training data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="training-container">
        {/* Hero Section */}
        <motion.div
          className="training-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="training-hero-title font-helvetica">{trainingData.heroSection.title}</h1>
          <p className="training-hero-description">{trainingData.heroSection.description}</p>
        </motion.div>

        {/* Info Sections with Bullet Points */}
        <div className="info-sections md:pb-[89px] pb-[37px]">
          {trainingData.infoSections.map((section, index) => (
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
              <div className="info-card-content max-w-[347px]">
                <h3 className="info-card-name text-left">{section.name}</h3>
                <p className="info-card-description text-left">{section.description}</p>
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-4 space-y-2 text-left">
                    {section.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1 m-0 text-[14px] text-gray-700">
                        {/* <svg className="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg> */}
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="dot">
                          <circle cx="12" cy="12" r="4" fill="currentColor"/>
                        </svg>

                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {showcaseData.length > 0 && (
          <ProductShowcase
            products={showcaseData}
          />
        )}
      </div>

      {/* Slider Section (keeps desktop layout; improved mobile swipe) */}
      {trainingData.sliderSection.slides.length > 0 && (
        <section className="pt-[50px] lg:pt-[90px] pb-[35px] lg:pb-[67px] bg-[#F4F1F2] text-black overflow-hidden mmd:px-0 px-[13px]" style={{ contain: 'layout style' }}>
            {/* Header Section */}
            <div className="max-w-[1332px] mx-auto md:mb-[64px] mb-[43px]" style={{ contain: 'layout style' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[17px] lg:gap-16">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
                  <h2 className="md:text-left text-center text-black font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                    {trainingData.sliderSection.mainName}
                  </h2>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }} className="lg:col-span-1 flex items-center justify-end">
                  <p className="text-black md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
                    {trainingData.sliderSection.mainTitle}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Slider - Extending Full Width */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }} className="relative">
            <div className="md:pl-6 lg:pl-[calc((100vw-1280px)/2+-1.5rem)]">
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
                  {trainingData.sliderSection.slides.map((slide, index) => (
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
          </motion.div>
        </section>
      )}

      <div className="" style={{ paddingTop: 0 }}>
        {/* Training Levels Section */}
        {trainingData.trainingLevels.cards.length > 0 && (
          <section className="pt-[50px] px-[15px] lg:pt-[90px] pb-[50px] lg:pb-[115px] bg-[#111] md:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
            <div className="max-w-[1332px] mx-auto">
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px] lg:gap-16 md:mb-[79px] mb-[51px]">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-1"
                >
                  <h2 className="text-white font-medium md:text-left text-center md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                    {trainingData.trainingLevels.title}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="lg:col-span-1 flex items-center justify-end"
                >
                  <p className="text-[#FFFFFFA1] md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica max-w-[517px]">
                    {trainingData.trainingLevels.description}
                  </p>
                </motion.div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
                {trainingData.trainingLevels.cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#1d1d1d] rounded-[30px] pt-[61px] pb-[57px] px-[40px] "
                  >
                    <h3 className="text-[26px]  text-white font-[400] leading-[30px] font-helvetica mb-[21px]">
                      {card.name}
                    </h3>
                    <p className="text-[16px] leading-[24px] text-[#FFFFFFA1] max-w-[325px]">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Training Facilities Section */}
        {trainingData.trainingFacilities.facilities.length > 0 && (
          <section className="pt-[50px] px-[15px] lg:pt-[93px] pb-[50px] lg:pb-[87px] bg-[#F4F1F2] md:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
            <div className="max-w-[1332px] mx-auto">
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[13px] lg:gap-16 md:mb-[71px] mb-[24px]">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-1"
                >
                  <h2 className="text-black font-medium md:text-left text-center md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                    {trainingData.trainingFacilities.title}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="lg:col-span-1 flex items-center justify-end"
                >
                  <p className="text-black font-medium text-[16px] md:text-left text-center leading-[160%] font-helvetica max-w-[480px]">
                    {trainingData.trainingFacilities.description}
                  </p>
                </motion.div>
              </div>

              {/* Facilities Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {trainingData.trainingFacilities.facilities.map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 2) * 0.1 }}
                    className="group transition-all duration-300"
                  >
                    <div className="h-[468px] w-full relative overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                      {facility.image?.asset?.url && (
                        <Image
                          src={facility.image.asset.url}
                          alt={facility.image.alt || facility.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                          loading="lazy"
                          style={{ contain: 'layout style paint' }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
                    </div>

                    <div className="pt-[32px] max-w-[530px]">
                      <h3 className="text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                        {facility.title}
                      </h3>
                      <p className="text-[16px] leading-[20px] tracking-[0] m-0 font-normal font-helvetica text-[#3F3E4B] mb-4">
                        {facility.description}
                      </p>
                      {facility.bulletPoints && facility.bulletPoints.length > 0 && (
                        <ul className="space-y-2">
                          {facility.bulletPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[14px] m-0 text-[#3F3E4B]">
                              {/* <svg className="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg> */}
                              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="dot">
                                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                                </svg>

                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="pt-[40px] pb-[37px] lg:py-[120px] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[71px] gap-[18px]">
              <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col md:gap-[24px] gap-[18px]">
                <h1 className="pr-1 md:text-[64px] text-[30px] not-italic tracking-normal md:leading-[68px] leading-[33px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                  style={{
                    background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {trainingData.callToAction.title}
                </h1>

                <div className="lg:col-span-1 space-y-8 md:block hidden ">
                  <motion.a
                    href={trainingData.callToAction.buttonLink}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="relative overflow-hidden px-[24px] py-[8px] rounded-[50px]
                               border border-black bg-black text-white font-helvetica
                               text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="absolute inset-0 bg-white translate-x-full
                                 transition-transform duration-500 ease-in-out rounded-[50px]
                                 group-hover:translate-x-0"
                    />
                    <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                      {trainingData.callToAction.buttonText}
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
                  {trainingData.callToAction.description.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] max-w-[575px]"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
                 <div className="lg:col-span-1 mt-[10px] space-y-8 block md:hidden ">
                  <motion.a
                    href={trainingData.callToAction.buttonLink}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="relative overflow-hidden px-[24px] py-[8px] rounded-[50px]
                               border border-black bg-black text-white font-helvetica
                               text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="absolute inset-0 bg-white translate-x-full
                                 transition-transform duration-500 ease-in-out rounded-[50px]
                                 group-hover:translate-x-0"
                    />
                    <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                      {trainingData.callToAction.buttonText}
                    </span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
