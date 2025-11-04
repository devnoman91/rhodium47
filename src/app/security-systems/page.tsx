'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getSecuritySystems } from '@/content/queries'
import type { SecuritySystems } from '@/content/types'

const criticalInlineStyles = `
  .security-systems-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 89px;
  }

  /* Hero Section */
  .security-systems-hero {
    text-align: center;
    margin-bottom: 89px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .security-systems-hero-title {
   color: #000;
text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%;
letter-spacing: -1.28px;
margin-bottom:14px;
  }
  .security-systems-hero-description {
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
    margin-bottom: 62px;
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
  .security-systems-hero {
    margin-bottom: 44px;
}
  .info-card:nth-child(2),
  .info-card {
    max-width: 100%;
   }
    .security-systems-container {
      padding-inline: 15px;
      padding-top: 100px;
      padding-bottom: 37px;
    }
    .security-systems-hero-title {
      font-size: 40px;
    }
    .security-systems-hero-description {
      font-size: 16px;
    }
    .info-sections {
      flex-direction: column;
      gap: 21px;
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

// Security Features Section Component (with bullet points and cards)
const SecurityFeaturesSection: React.FC<{
  title: string
  description: string
  bulletPoints?: string[]
  cards?: Array<{ title: string; description: string }>
}> = ({ title, description, bulletPoints, cards }) => {
  return (
    <section className="pt-[79px] px-[15px] lg:pb-[93px] bg-[#111111]">
      <div className="max-w-[1304px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-medium md:text-[64px] text-[30px] md:text-left text-center leading-[110%] tracking-[-1.28px] font-helvetica mb-[44px]"
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
            className="space-y-4 mb-[68px]"
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

// Advanced Protection Section Component (with description, bullet points and cards)
const AdvancedProtectionSection: React.FC<{
  title: string
  description: string
  bulletPoints: string[]
  cards: Array<{ title: string; description: string }>
}> = ({ title, description, bulletPoints, cards }) => {
  return (
    <section className="pt-[79px] pb-[50px] lg:pb-[93px] bg-[#111111] ">
      <div className="max-w-[1304px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica mb-[44px]"
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
            className="space-y-4 mb-[68px]"
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

export default function SecuritySystemsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [securityData, setSecurityData] = useState<SecuritySystems | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const security = await getSecuritySystems()
        console.log('Security Systems data:', security)
        setSecurityData(security)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Security Systems:', err)
        setError('Failed to load Security Systems page')
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

  const totalSlides = securityData?.sliderSection.slides.length || 0
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
        <div className="security-systems-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading Security Systems...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !securityData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="security-systems-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No Security Systems data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="security-systems-container">
        {/* Hero Section */}
        <motion.div
          className="security-systems-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="security-systems-hero-title font-helvetica">{securityData.heroSection.title}</h1>
          <p className="security-systems-hero-description">{securityData.heroSection.description}</p>
        </motion.div>

        {/* Info Sections */}
        <div className="info-sections">
          {securityData.infoSections.map((section, index) => (
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

        {/* Security Features Section */}
        {securityData.securityFeatures && (
          <SecurityFeaturesSection
            title={securityData.securityFeatures.title}
            description={securityData.securityFeatures.description}
            bulletPoints={securityData.securityFeatures.bulletPoints}
            cards={securityData.securityFeatures.cards}
          />
        )}

        
      </div>
      
      {/* Advanced Protection Section */}
        {securityData.advancedProtection && (
          <AdvancedProtectionSection
            title={securityData.advancedProtection.title}
            description={securityData.advancedProtection.description}
            bulletPoints={securityData.advancedProtection.bulletPoints}
            cards={securityData.advancedProtection.cards}
          />
        )}

      {/* Slider Section */}
      {securityData.sliderSection.slides.length > 0 && (
        <section className="pt-[58px] lg:pt-[79px] pb-[40px] lg:pb-[102px] bg-[#F4F1F2] text-black overflow-hidden mmd:px-0 px-[15px]" style={{ contain: 'layout style' }}>
          {/* Header Section */}
          <div className="max-w-[1304px] mx-auto md:mb-[64px] mb-[24px]" style={{ contain: 'layout style' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[17px] lg:gap-16">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
                  <h2 className="md:text-left text-center text-black font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                    {securityData.sliderSection.mainName}
                  </h2>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }} className="lg:col-span-1 flex items-center justify-end">
                  <p className="text-black md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica md:max-w-[480px]">
                    {securityData.sliderSection.mainTitle}
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
                  {securityData.sliderSection.slides.map((slide, index) => (
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
                  {securityData.callToAction.title}
                </h1>

                {/* Desktop Button */}
                <div className="lg:col-span-1 space-y-8 md:block hidden">
                  <motion.a
                    href={securityData.callToAction.buttonLink}
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
                      {securityData.callToAction.buttonText}
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
                  {securityData.callToAction.description.split('\n\n').map((paragraph, index) => (
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
                href={securityData.callToAction.buttonLink}
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
                  {securityData.callToAction.buttonText}
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
