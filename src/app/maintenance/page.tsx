'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getMaintenance } from '@/content/queries'
import type { Maintenance } from '@/content/types'

const criticalInlineStyles = `
  .maintenance-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 170px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .maintenance-hero {
    text-align: center;
    // margin-bottom: 72px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .maintenance-hero-title {
   color: #000;
text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%;
letter-spacing: -1.28px;
margin-bottom:14px;
  }
  .maintenance-hero-description {
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
  .maintenance-container .info-sections {
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
    .maintenance-container {
      padding-inline: 15px;
      padding-top: 100px;
      padding-bottom: 37px;
    }
    .maintenance-hero-title {
      font-size: 40px;
    }
    .maintenance-hero-description {
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

// Expert Maintenance Section Component
const ExpertMaintenanceSection: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => description.split(' '), [description])

  return (
    <section className="py-12 md:pb-[90px] md:pt-[106px] ">
      <div className="max-w-[1304px] mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Left - Sunburst Icon */}
            <motion.div
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
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black max-w-[773px] ">
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-[27px] font-helvetica items-center uppercase">
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
      </div>
    </section>
  )
}

export default function MaintenancePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [maintenanceData, setMaintenanceData] = useState<Maintenance | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [cardWidth, setCardWidth] = useState(956) // 936px + 20px gap
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const maintenance = await getMaintenance()
        console.log('Maintenance data:', maintenance)
        setMaintenanceData(maintenance)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching maintenance:', err)
        setError('Failed to load maintenance page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // detect small screen for swipe behavior and calculate card width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsSmallScreen(width < 768)

      // Match actual card widths from CSS
      if (width < 768) {
        setCardWidth(Math.min(width, 420))
      } else if (width >= 1536) {
        setCardWidth(1100 + 20) // 2xl breakpoint: 1100px + gap
      } else {
        setCardWidth(936 + 20) // md breakpoint: 936px + gap
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = maintenanceData?.sliderSection.slides.length || 0
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
        <div className="maintenance-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading maintenance...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !maintenanceData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="maintenance-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No maintenance data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="maintenance-container">
        {/* Hero Section */}
        <motion.div
          className="maintenance-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="maintenance-hero-title font-helvetica">{maintenanceData.heroSection.title}</h1>
          <p className="maintenance-hero-description">{maintenanceData.heroSection.description}</p>
        </motion.div>
          {/* Expert Maintenance Section */}
          <ExpertMaintenanceSection
            title={maintenanceData.expertMaintenance.title}
            description={maintenanceData.expertMaintenance.description}
          />

        {/* Info Sections */}
        <div className="info-sections">
          {maintenanceData.infoSections.map((section, index) => (
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
      </div>

      {/* Slider Section */}
      {maintenanceData.sliderSection.slides.length > 0 && (
        <section className="pt-[50px] lg:pt-[79px] pb-[50px] lg:pb-[102px] bg-[#560100] text-white overflow-hidden mmd:px-0 px-[13px]" style={{ contain: 'layout style' }}>
          {/* Header Section */}
          <div className="max-w-[1304px] mx-auto md:mb-[64px] mb-[43px]" style={{ contain: 'layout style' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-16">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
                  <h2 className="md:text-left text-center text-white font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                    {maintenanceData.sliderSection.mainName}
                  </h2>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }} className="lg:col-span-1 flex items-center justify-end">
                  <p className="text-white md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
                    {maintenanceData.sliderSection.mainTitle}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Slider - Extending Full Width */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.15 }} className="relative">
            <div className="md:pl-6 lg:pl-[calc((100vw-1304px)/2)]">
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
                  {maintenanceData.sliderSection.slides.map((slide, index) => (
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
                          <h3 className="md:text-left text-center text-[#fff] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
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
                {maintenanceData.sliderSection.slides.map((_, index) => (
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

      <div className="maintenance-container" style={{ paddingTop: 0 }}>

        {/* Emergency Service Section (24/7) */}
        <section className="pt-[50px] lg:pt-[90px]  bg-[#F4F1F2] md:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
          <div className="max-w-[1304px] mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[30px] md:text-[64px] text-black font-medium leading-[110%] tracking-[-1.28px] font-helvetica mb-[14px]"
            >
              {maintenanceData.emergencyService.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[16px] font-[500] text-black leading-[150%] font-helvetica max-w-[855px] mx-auto md:mb-[52px] mb-[46px]"
            >
              {maintenanceData.emergencyService.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-[18px]  md:mb-[73px] mb-[15px] max-w-[720px] m-auto"
            >
              {maintenanceData.emergencyService.stats.map((stat, index) => (
                <div key={index} className="md:pb-0 pb-[18px] md:border-r border-b md:border-b-0 border-[#00000033] text-black md:last:border-r-0 last:border-b-0">
                  <div className="text-[50px] font-medium leading-[110%] font-helvetica mb-[3px]">
                    {stat.value}
                  </div>
                  <div className="text-[16px] leading-[24px] font-helvetica opacity-80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.a
                href={maintenanceData.emergencyService.buttonLink || '#'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative inline-block px-[32px] py-[8px] rounded-[50px] bg-[#560100] text-white font-helvetica text-[14px] font-medium overflow-hidden group cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Sliding white overlay */}
                <span
                  className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0"
                />

                {/* Text */}
                <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black">
                  {maintenanceData.emergencyService.buttonText}
                </span>
              </motion.a>

          </div>
        </section>

        {/* Pricing Section */}
        {maintenanceData.servicePricing.packages.length > 0 && (
          <section className="pt-[50px] lg:pt-[72px] md:pb-[50px] lg:pb-[90px] bg-[#F4F1F2] md:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
            <div className="max-w-[1304px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-[9px] gap-[20px]">
                {maintenanceData.servicePricing.packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-[25px] h-fit p-[35px] border-[3px] border-[#560100] shadow-[0_6px_0_0_#560100,0_3px_0_0_#560100] ${
                      pkg.featured
                        ? 'bg-[#560100] text-white border-[#560100]'
                        : 'bg-white text-black border-[#560100]'
                    }`}
                  >
                    {/* Package Name */}
                    <div className={`inline-block px-[16px] py-[6px] rounded-[50px] text-[14px] font-medium mb-[25px] ${
                      pkg.featured ? 'bg-white text-black' : 'bg-[#560100] text-white'
                    }`}>
                      {pkg.name}
                    </div>

                    {/* Price */}
                    <div className="mb-[15px]">
                      <span className="text-[48px] font-[800] leading-[110%] font-helvetica">
                        {pkg.price}
                      </span>
                    </div>
                    <div className={`text-[14px] mb-[34px] ${pkg.featured ? 'text-gray-400' : 'text-gray-600'}`}>
                      {pkg.priceDescription || 'Per service interval'}
                    </div>

                    {/* Features */}
                    <div className="space-y-[16px] mb-[32px]">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-[12px]">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                            <path d="M2.5 12.5L8.23083 16.9083C8.65932 17.2379 9.27218 17.1673 9.6145 16.7489L18 6.5" stroke="#828282" stroke-width="2" stroke-linecap="round"/>
                          </svg>
                          <span className="text-[14px] leading-[20px]">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                   <motion.a
                      href={pkg.buttonLink || '#'}
                      className={`relative flex gap-[10px] items-center justify-center w-full py-[15px] px-5 rounded-[50px] text-center font-helvetica text-[16px] font-medium overflow-hidden group cursor-pointer
                        ${pkg.featured ? 'bg-white text-black' : 'bg-[#560100] text-white'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Sliding white overlay */}
                      <span
                        className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0"
                      />

                      {/* Text + Icon */}
                      <span
                        className={`relative z-10 flex gap-[10px] items-center justify-center transition-colors duration-500 ease-in-out
                          ${pkg.featured ? 'group-hover:text-black' : 'group-hover:text-black'}`}
                      >
                        {pkg.buttonText}
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="16" viewBox="0 0 27 16" fill="none">
                          <path
                            d="M26.2071 8.70711C26.5976 8.31658 26.5976 7.68342 26.2071 7.29289L19.8431 0.928932C19.4526 0.538408 18.8195 0.538408 18.4289 0.928932C18.0384 1.31946 18.0384 1.95262 18.4289 2.34315L24.0858 8L18.4289 13.6569C18.0384 14.0474 18.0384 14.6805 18.4289 15.0711C18.8195 15.4616 19.4526 15.4616 19.8431 15.0711L26.2071 8.70711ZM0.5 8V9H25.5V8V7H0.5V8Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </motion.a>

                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

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
                  {maintenanceData.callToAction.title}
                </h1>

                {/* Desktop Button */}
                <div className="lg:col-span-1 space-y-8 md:block hidden">
                  <motion.a
                    href={maintenanceData.callToAction.buttonLink}
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
                      {maintenanceData.callToAction.buttonText}
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
                  {maintenanceData.callToAction.description.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] max-w-[575px]"
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
                href={maintenanceData.callToAction.buttonLink}
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
                  {maintenanceData.callToAction.buttonText}
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
