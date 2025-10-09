'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getCustomDesign } from '@/content/queries'
import type { CustomDesign } from '@/content/types'

const criticalInlineStyles = `
  .custom-design-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 120px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 42px;
  }

  /* Hero Section */
  .custom-design-hero {
    text-align: center;
    // margin-bottom: 72px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .custom-design-hero-title {
   color: #000;
text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%; /* 70.4px */
letter-spacing: -1.28px;
margin-bottom:14px;
  }
  .custom-design-hero-description {
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

  /* Responsive */
  @media (max-width: 1024px) {
    .info-sections {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .custom-design-container {
      padding-inline: 20px;
      padding-top: 100px;
    }
    .custom-design-hero-title {
      font-size: 40px;
    }
    .custom-design-hero-description {
      font-size: 16px;
    }
    .info-sections {
      grid-template-columns: 1fr;
      gap: 20px;
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

// Separate component for Design Philosophy to avoid hydration issues
const DesignPhilosophySection: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => description.split(' '), [description])

  return (
    <section className="py-12 md:pb-[90px] md:pt-[106px] ">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
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
                {/* Rotating circle with lines */}
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

                {/* Static centered arrow */}
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div
                    className="text-lg md:text-2xl lg:text-3xl text-gray-900"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black max-w-[783px] ">
              {/* Section Label */}
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span className="">
                  {title}
                </span>
              </div>

              {/* Main Description with Word Scrolling Effect */}
              <div className="space-y-6">
                <p
                  ref={descriptionRef}
                  className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-normal m-0 flex flex-wrap"
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

export default function CustomDesignPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customDesignData, setCustomDesignData] = useState<CustomDesign | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const constraintsRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const customDesign = await getCustomDesign()
        console.log('Custom Design data:', customDesign)
        setCustomDesignData(customDesign)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching custom design:', err)
        setError('Failed to load custom design page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalSlides = customDesignData?.sliderSection.slides.length || 0
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
        <div className="custom-design-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading custom design...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !customDesignData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="custom-design-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No custom design data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="custom-design-container">
        {/* Hero Section */}
        <motion.div
          className="custom-design-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="custom-design-hero-title font-helvetica">{customDesignData.heroSection.title}</h1>
          <p className="custom-design-hero-description">{customDesignData.heroSection.description}</p>
        </motion.div>
        
          {/* Design Philosophy Section */}
          <DesignPhilosophySection
            title={customDesignData.designPhilosophy.title}
            description={customDesignData.designPhilosophy.description}
          />

        {/* Info Sections */}
        <div className="info-sections">
          {customDesignData.infoSections.map((section, index) => (
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

    

      <div className="custom-design-container" style={{ paddingTop: 0 }}>
        {/* Slider Section */}
        {customDesignData.sliderSection.slides.length > 0 && (
          <section className=" bg-[#F4F1F2] text-black overflow-hidden -mx-[calc(var(--spacing)*12)] px-0" style={{ contain: 'layout style' }}>
            {/* Header Section - Constrained max-w-7xl */}
            <div className="max-w-[1304px] mx-auto mb-[64px]" style={{ contain: 'layout style' }}>
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
                      {customDesignData.sliderSection.mainName}
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
                      {customDesignData.sliderSection.mainTitle}
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
                    {customDesignData.sliderSection.slides.map((slide, index) => (
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
                        <div className="h-[468px] w-full relative aspect-[1/0.55] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
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

        {/* Design Process Section */}
        {customDesignData.designProcess.sections.length > 0 && (
          <section className="pt-[50px] lg:pt-[94px] bg-[#F4F1F2] text-black -mx-[calc(var(--spacing)*12)] px-[calc(var(--spacing)*12)]" style={{ contain: 'layout style' }}>
            {/* Header Section */}
            <div className="max-w-[1304px] mx-auto mb-[62px]" style={{ contain: 'layout style' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.15 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  lg:gap-16">
                  {/* Left - Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1"
                  >
                    <h2 className="text-black font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                      {customDesignData.designProcess.title}
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
                      {customDesignData.designProcess.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Design Process Grid - 2 columns */}
            <div className="max-w-[1304px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-[42px]">
                {customDesignData.designProcess.sections.map((section, index) => (
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
                    <div className="pt-[42px] max-w-[656px]">
                      <div className="">
                        <h3 className="text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                          {section.title}
                        </h3>
                        <p className="text-[16px] leading-[20px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left - Title and Button */}
              <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-[24px]">
                <h1 className="text-[62px] not-italic tracking-normal leading-[68px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                  style={{
                    background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {customDesignData.callToAction.title}
                </h1>

                {/* CTA Button */}
                <div className="lg:col-span-1 space-y-8">
                  <motion.a
                    href={customDesignData.callToAction.buttonLink}
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
                    {/* sliding overlay */}
                    <span
                      className="absolute inset-0 bg-white translate-x-full
                                 transition-transform duration-500 ease-in-out rounded-[50px]
                                 group-hover:translate-x-0"
                    />

                    {/* text */}
                    <span className="relative z-10 text-base lg:text-lg transition-colors duration-500 ease-in-out group-hover:text-black">
                      {customDesignData.callToAction.buttonText}
                    </span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Right - Description */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-1"
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="space-y-5 flex flex-col justify-end items-end">
                  {/* Split description into paragraphs for better readability */}
                  {customDesignData.callToAction.description.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] max-w-[550px]"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
