'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getHybridElectric } from '@/content/queries'
import type { HybridElectric } from '@/content/types'

const criticalInlineStyles = `
  .hybrid-electric-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .hybrid-electric-hero {
    text-align: center;
    margin-bottom: 56px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .hybrid-electric-hero-title {
   color: #000;
  text-align: center;
  font-size: 64px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  letter-spacing: -1.28px;
  margin-bottom:14px;
  }
  .hybrid-electric-hero-description {
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
  .info-sections {
    display:flex;
    gap: 30px;
    max-width: 1304px;
    margin: auto;
    margin-bottom: 49px;
    // flex-wrap: wrap;
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
  .info-card-name {
   color: #111;
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 150%;
text-transform: capitalize;
    margin-bottom: 8px;
  }
  .info-card-description {
  color: #3F3E4B;
text-align: center;
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
  .info-sections{
  margin-bottom:0;
  }
  .info-card:nth-child(2),
  .info-card {
    max-width: 100%;
}
    .hybrid-electric-hero{
    margin-bottom:20px;
    }
    .hybrid-electric-container {
      padding-inline: 15px;
      padding-top: 100px;
      padding-bottom: 37px;
    }
    .hybrid-electric-hero-title {
      font-size: 30px;
      margin-bottom:9px
    }
    .hybrid-electric-hero-description {
      font-size: 16px;
    }
    .info-sections {
      flex-direction: column;
      gap: 41px;
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

// Performance Metrics Section Component (with word animation)
const PerformanceMetricsSection: React.FC<{
  title: string
  description: string
  countSection: Array<{ name: string; value: string }>
}> = ({ title, description, countSection }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => description ? description.split(' ') : [], [description])

  return (
    <section className="pt-[46px] lg:pt-[90px] pb-[50px] lg:pb-[78px] bg-[#F4F1F2] lg:-mx-[calc(var(--spacing)*12)] lg:px-[calc(var(--spacing)*12)]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 mb-[64px]">
            {/* Left - Sunburst Icon */}
            {/* <motion.div
              className="w-full max-w-[400px] hidden lg:flex lg:justify-start justify-center"
            >
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 flex items-center justify-center">
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 102 102"
                >
                  <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="51" cy="51" r="40" stroke="#161618" strokeWidth="22" strokeDasharray="2 4"/>
                  </svg>
                </motion.svg>

                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div className="text-lg md:text-2xl lg:text-3xl text-gray-900" style={{ transform: 'rotate(0deg)' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div> */}

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black max-w-[810px] m-auto">
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span>{title}</span>
              </div>

              <div className="space-y-6">
                <p
                  ref={descriptionRef}
                  className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-0.8px] m-0 font-medium font-helvetica flex flex-wrap"
                >
                  {words.map((word, i) => {
                    const start = i / words.length
                    const end = (i + 1) / words.length
                    const color = useTransform(scrollYProgress, [start, end], ['#7F7F7F', '#161618'])
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
               <div className="border-b  border-[#777777] text-[20px] tracking-[-0.8px] font-[400] text-[#16161880] font-helvetica mb-[24px] pb-[31px]">
                  {count.name}
                </div>
                <div className="text-[20px] tracking-[-0.8px]  font-[500] text-[#7F7F7F] font-helvetica uppercase ">
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

// Intelligent Power Management Section Component (with description, bullet points and cards)
const IntelligentPowerManagementSection: React.FC<{
  title: string
  description: string
  bulletPoints: string[]
  cards: Array<{ title: string; description: string }>
}> = ({ title, description, bulletPoints, cards }) => {
  return (
    <section className="pt-[79px] px-[15px] pb-[50px] lg:pb-[93px] bg-[#111111] ">
      <div className="max-w-[1304px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-medium md:text-[64px] text-center md:text-left text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica mb-[44px]"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[16px] leading-[20px] text-[#FFFFFF80] mb-[20px] max-w-[855px]"
        >
          {description}
        </motion.p>

        {/* Bullet Points */}
        {bulletPoints && bulletPoints.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 md:mb-[68px] mb-[48px]"
          >
            {bulletPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 m-0"
              >
                <div className="w-2 h-2 bg-[#FFFFFF80] rounded-full flex-shrink-0"></div>
                <span className="text-[16px] leading-[24px] text-[#FFFFFF80]">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* Cards */}
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[11px]">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1d1d1d] rounded-[30px] px-[40px] pt-[61px] pb-[67px]"
              >
                <h3 className="text-[26px] text-white font-[400] leading-[30px] font-helvetica mb-[21px]">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[26px] text-[#FFFFFFA1] max-w-[325px]">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function HybridElectricPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hybridData, setHybridData] = useState<HybridElectric | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const hybrid = await getHybridElectric()
        console.log('Hybrid Electric data:', hybrid)
        setHybridData(hybrid)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Hybrid Electric:', err)
        setError('Failed to load Hybrid Electric page')
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

  const totalSlides = hybridData?.sliderSection.slides.length || 0
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
        <div className="hybrid-electric-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading Hybrid Electric...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !hybridData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="hybrid-electric-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No Hybrid Electric data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="hybrid-electric-container">
        {/* Hero Section */}
        <motion.div
          className="hybrid-electric-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hybrid-electric-hero-title font-helvetica">{hybridData.heroSection.title}</h1>
          <p className="hybrid-electric-hero-description">{hybridData.heroSection.description}</p>
        </motion.div>

        {/* Info Sections */}
        <div className="info-sections">
          {hybridData.infoSections.map((section, index) => (
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

        {/* Performance Metrics Section */}
        <PerformanceMetricsSection
          title={hybridData.performanceMetrics.title}
          description={hybridData.performanceMetrics.description}
          countSection={hybridData.performanceMetrics.countSection}
        />

       
      </div>
      
       {/* Intelligent Power Management Section */}
        <IntelligentPowerManagementSection
          title={hybridData.intelligentPowerManagement.title}
          description={hybridData.intelligentPowerManagement.description}
          bulletPoints={hybridData.intelligentPowerManagement.bulletPoints}
          cards={hybridData.intelligentPowerManagement.cards}
        />     

      {/* Slider Section */}
      {hybridData.sliderSection.slides.length > 0 && (
        <section className="pt-[50px] lg:pt-[79px] pb-[50px] lg:pb-[102px] bg-[#F4F1F2] text-black overflow-hidden mmd:px-0 px-[13px]" style={{ contain: 'layout style' }}>
          {/* Header Section */}
          <div className="max-w-[1304px] mx-auto md:mb-[64px] mb-[24px]" style={{ contain: 'layout style' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[32px] gap-[17px] lg:gap-16">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
                  <h2 className="md:text-left text-center text-black font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                    {hybridData.sliderSection.mainName}
                  </h2>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }} className="lg:col-span-1 flex items-center justify-end">
                  <p className="text-black md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica md:max-w-[480px]">
                    {hybridData.sliderSection.mainTitle}
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
                  {hybridData.sliderSection.slides.map((slide, index) => (
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

      {/* Call to Action Section */}
      <section className="pt-[40px] pb-[35px] lg:py-[120px] bg-white">
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
                  {hybridData.callToAction.title}
                </h1>

                {/* Desktop Button */}
                <div className="lg:col-span-1 space-y-8 md:block hidden">
                  <motion.a
                    href={hybridData.callToAction.buttonLink}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                               border border-black bg-black text-white font-helvetica
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
                      {hybridData.callToAction.buttonText}
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
                  {hybridData.callToAction.description.split('\n\n').map((paragraph, index) => (
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
                href={hybridData.callToAction.buttonLink}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                           border border-black bg-black text-white font-helvetica
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
                  {hybridData.callToAction.buttonText}
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
