'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { TexasFacility } from '@/content/types'
import { getTexasFacility } from '@/content/queries'

const criticalInlineStyles = `
  .texas-facility-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .texas-facility-hero {
    text-align: center;
    margin-bottom: 62px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .texas-facility-hero-title {
    color: #000;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: -1.28px;
    margin-bottom:14px;
  }
  .texas-facility-hero-description {
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
  .texas-facility-container .info-sections {
    display:flex;
    gap: 30px;
    max-width: 1304px;
    margin: auto;
    margin-bottom: 0px;
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
    .info-card:nth-child(2),
    .info-card {
      max-width: 100%;
    }
    .texas-facility-container {
      padding-inline: 15px;
      padding-top: 100px;
      padding-bottom: 37px;
    }
    .texas-facility-hero{
      margin-bottom:37px;
    }
    .texas-facility-hero-title {
      font-size: 30px;
      margin-bottom:6px;
    }
    .texas-facility-hero-description {
      font-size: 16px;
    }
    .info-sections {
      flex-direction: column;
      gap: 40px !important;
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

// Manufacturing Excellence Section
const ManufacturingExcellenceSection: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = React.useMemo(() => description.split(' '), [description])

  return (
    <section className="pt-[37px] lg:pt-[108px] pb-[50px] lg:pb-[54px] bg-[#F4F1F2] lg:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-0 pt-3 border-t border-black max-w-[773px]"
            >
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

// Info Sections Component
const InfoSections: React.FC<{
  sections: Array<{
    name: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ sections }) => {
  return (
    <section className="bg-[#F4F1F2] pb-[69px]">
      <div className="max-w-[1304px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`${
                index === 1 ? 'max-w-[463px]' : 'max-w-[392px]'
              } w-full overflow-hidden`}
            >
              <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden">
                {section.image?.asset?.url && (
                  <img
                    src={section.image.asset.url}
                    alt={section.image.alt || section.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
              <div className="pt-[31px]">
                <h3 className="text-[#111] text-center font-medium text-[16px] leading-[150%] capitalize mb-[8px]">
                  {section.name}
                </h3>
                <p className="text-[#3F3E4B] text-center text-[16px] font-normal leading-[20px]">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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
  const constraintsRef = useRef(null)

  const totalSlides = slides.length
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

  return (
    <section className="pt-[50px] lg:pt-[90px] pb-[102px] bg-[#111111] overflow-hidden" style={{ contain: 'layout style' }}>
      {/* Header Section */}
      <div className="max-w-[1304px] mx-auto px-6 mb-[64px]" style={{ contain: 'layout style' }}>
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
              <h2 className="text-white font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
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
              <p className="text-white font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
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
              {slides.map((slide, index) => (
                <motion.div
                  key={`${slide.name}-${index}`}
                  className="w-[936px] 2xl:w-[1100px] flex-shrink-0 group transition-all duration-300"
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
                  <div className="pt-[42px] max-w-[656px]">
                    <div className="">
                      <h3 className="font-medium text-[24px] leading-[150%] text-white capitalize font-helvetica mb-[9px]">
                        {slide.name}
                      </h3>
                      <p className="text-[16px] leading-[20px]  tracking-[0] m-0 font-normal font-helvetica text-white opacity-60">
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
    <section className="pt-[50px] lg:pt-[94px] lg:pb-[64px] bg-[#F4F1F2] text-black" style={{ contain: 'layout style' }}>
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
              <p className="text-black font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
                {description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Design Process Grid - 2 columns */}
      <div className="max-w-[1304px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-[42px]">
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
  )
}

// By The Numbers Section
const ByTheNumbersSection: React.FC<{
  title: string
  description: string
  countSection: Array<{ name: string; value: string }>
}> = ({ title, description, countSection }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const words = description.split(' ')

  return (
    <section ref={containerRef} className="pt-[50px] pb-[50px] lg:pb-[90px] bg-[#111111]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[96px] max-w-[810px] m-auto"
        >
          <div className="pt-3 border-t border-white flex flex-row text-white text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-[30px] font-helvetica items-center uppercase">
            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
             <h2>{title}</h2>
          </div>

          <div className="text-[24px] md:text-[32px] text-white lg:text-[40px] leading-[1.2] tracking-[-0.8px] m-0 font-medium font-helvetica flex flex-wrap max-w-[810px] mx-auto">
            {words.map((word, index) => {
              const start = index / words.length
              const end = start + 1 / words.length
              const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1])
              const color = useTransform(
                scrollYProgress,
                [start, end],
                ['#fff', '#fff']
              )

              return (
                <motion.span
                  key={index}
                  style={{ opacity, color }}
                  className="inline-block text-white mr-[0.2em]"
                >
                  {word}
                </motion.span>
              )
            })}
          </div>
        </motion.div>

        {/* Count Section */}
        <div className="max-[1280px] m-auto grid grid-cols-2 md:grid-cols-4 gap-[24px] lg:gap-[48px] mt-[48px]">
          {countSection.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="border-b  border-[#fff] text-[20px] tracking-[-0.8px] font-[400] text-[#fff] font-helvetica mb-[24px] pb-[31px]">
                {item.value}
              </p>
              <p className="text-[20px] tracking-[-0.8px]  font-[500] text-[#fff] font-helvetica uppercase ">{item.name}</p>
            </motion.div>
          ))}
        </div>
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
    <section className="py-16 lg:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[71px]">
            <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-[24px]">
              <h1 className="pr-1 text-[62px] not-italic tracking-normal leading-[68px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                style={{
                  background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </h1>

              <div className="lg:col-span-1 space-y-8">
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
                    className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] max-w-[575px]"
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

      {/* Manufacturing Excellence Section */}
      {data.manufacturingExcellence && (
        <ManufacturingExcellenceSection
          title={data.manufacturingExcellence.title}
          description={data.manufacturingExcellence.description}
        />
      )}

      {/* Info Sections */}
      {data.infoSections && data.infoSections.length > 0 && (
        <InfoSections sections={data.infoSections} />
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