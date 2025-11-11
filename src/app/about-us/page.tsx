'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { AboutUs } from '@/content/types'
import { getAboutUs } from '@/content/queries'

const criticalInlineStyles = `
  .consultation-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 170px;
    background: #F4F1F2;
    padding-inline: 15px;
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

  @media (max-width: 776px){
  .consultation-container{
  padding-top:170px;
  }
  }
`

// Hero Section Component
const HeroSection: React.FC<{ sectionLabel: string; mainHeading: string }> = ({
  sectionLabel,
  mainHeading,
}) => {
  return (
    <section className="relative md:pb-[106px] pb-[43px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="md:text-[64px] text-[34px] font-medium leading-[110%] tracking-[-1.28px] text-black max-w-[1200px] mx-auto md:mb-6 mb-[10px] font-helvetica">
             {sectionLabel}
          </h1>
          <p className="md:text-[24px] text-[16px] font-medium text-[#111] leading-[150%] capitalize max-w-[855px] mx-auto mb-[14px] font-helvetica">
           {mainHeading}
          </p>
          
        </motion.div>
      </div>
    </section>
  )
}

// Forever Starts Now Slider Section
const ForeverStartsNowSection: React.FC<{
  mainName: string
  mainTitle: string
  images: Array<{
    asset: { url: string }
    alt?: string
  }>
  content: {
    name: string
    description: string
    bulletPoints?: string[]
    buttonText?: string
    buttonLink?: string
  }
}> = ({ mainName, mainTitle, images, content }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })

  const words = mainTitle.split(' ')

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className=" pb-[54px]">
      <div className="max-w-[1304px] mx-auto md:px-6">
        {/* Top Section - with word animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="mb-[20px] lg:mb-[79px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20">
            {/* Left Logo + Progress */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden md:flex lg:col-span-2 xl:col-span-2 flex-col justify-between items-center lg:items-start"
            >
              {/* Sunburst Logo */}
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 mx-auto flex items-center justify-center">
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

              {/* Progress Bar */}
              <div className="w- lg:max-w-[783px] h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${(currentSlide + 1) * (100 / images.length)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentSlide + 1) * (100 / images.length)}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>

            {/* Heading + Description with word animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-1 lg:ml-50 xl:ml-50 lg:col-span-10 xl:col-span-10"
            >
              <motion.div
                className="h-[1px] w-full bg-[#777] rounded-full mb-3"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
              <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-[#161618] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] uppercase">
                  {mainName}
                </span>
              </div>

              {/* Animated word-by-word description */}
              <p
                ref={descriptionRef}
                className="text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[40px] leading-[120%] font-helvetica font-[500] max-w-[56ch] flex flex-wrap"
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
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section - Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-start"
        >
          <div className="lg:col-span-12">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[89px]">
              {/* Image */}
              <div className="w-full max-[758px]">
                <div className="relative aspect-[16/9] lg:aspect-auto h-full rounded-2xl overflow-hidden bg-gray-100">
                  <motion.img
                    key={currentSlide}
                    src={images[currentSlide].asset.url}
                    alt={images[currentSlide].alt || content.name}
                    className="w-full h-full object-cover aspect-[1/0.54]"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 cursor-pointer md:left-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 cursor-pointer md:right-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full lg:max-w-[433px] flex items-center">
                <div className="w-full">
                  <h3 className="text-[#161618] font-medium text-[24px] leading-[120%] tracking-[-0.48px] font-helvetica mb-[24px]">
                    {content.name}
                  </h3>
                  <p className="text-[#7F7F7F] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] mb-[24px]">
                    {content.description}
                  </p>
                  {content.bulletPoints && content.bulletPoints.length > 0 && (
                    <ul className="space-y-[12px] mb-[24px]">
                      {content.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-[12px] m-0">
                          <span className="w-[6px] h-[6px] bg-[#7F7F7F] rounded-full mt-[8px] flex-shrink-0" />
                          <span className="text-[16px] text-[#7F7F7F]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {content.buttonText && (
                    <Link href={content.buttonLink || '#'}>
                      <motion.button
                        className="inline-flex cursor-pointer items-center text-[#161618] font-helvetica text-[20px] gap-3 not-italic font-medium leading-[24px] tracking-[-0.4px]"
                        whileHover={{ x: 5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                          <path d="M21.5536 10.9272L13.6786 18.8022C13.432 19.0488 13.0976 19.1873 12.7489 19.1873C12.4002 19.1873 12.0658 19.0488 11.8192 18.8022C11.5727 18.5556 11.4341 18.2212 11.4341 17.8725C11.4341 17.5238 11.5727 17.1894 11.8192 16.9428L17.4531 11.3111H1.375C1.0269 11.3111 0.693064 11.1728 0.446922 10.9267C0.200781 10.6805 0.0625 10.3467 0.0625 9.99861C0.0625 9.65051 0.200781 9.31667 0.446922 9.07053C0.693064 8.82438 1.0269 8.68611 1.375 8.68611H17.4531L11.8214 3.0511C11.5748 2.80454 11.4363 2.47012 11.4363 2.12142C11.4363 1.77272 11.5748 1.4383 11.8214 1.19173C12.068 0.945161 12.4024 0.806641 12.7511 0.806641C13.0998 0.806641 13.4342 0.945161 13.6808 1.19173L21.5558 9.06673C21.6782 9.18883 21.7752 9.3339 21.8414 9.49362C21.9075 9.65333 21.9415 9.82454 21.9413 9.99742C21.9411 10.1703 21.9067 10.3414 21.8402 10.501C21.7737 10.6605 21.6763 10.8054 21.5536 10.9272Z" fill="black" />
                        </svg>
                        <span>{content.buttonText}</span>
                      </motion.button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Forever Section with Cards
const ForeverSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    title: string
    image: { asset: { url: string }; alt?: string }
    description: string
  }>
}> = ({ title, description, cards }) => {
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

  const totalSlides = cards.length
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
    <section className="pt-[50px] lg:pt-[89px] px-[15px] pb-[80px] lg:pb-[102px] bg-[#560100] text-white overflow-hidden " style={{ contain: 'layout style' }}>
      {/* Header Section - Constrained max-w-7xl */}
      <div className="max-w-[1304px] mx-auto lg:mb-[64px] mb-[20px]" style={{ contain: 'layout style' }}>
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
              <h2 className="lg:text-left text-center text-white font-medium lg:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
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
              <p className="text-white lg:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica lg:max-w-[480px]">
                {description}
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
              {cards.map((card, index) => (
                <motion.div
                  key={`${card.title}-${index}`}
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
                  <div className= "h-[468px] w-full relative aspect-[1/0.55] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                    {card.image?.asset?.url && (
                      <Image
                        src={card.image.asset.url}
                        alt={card.image.alt || card.title}
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
                  <div className="md:pt-[42px] pt-[15px] md:max-w-[656px] w-full">
                    <div>
                      <h3 className="md:text-left text-center text-white font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                        {card.title}
                      </h3>
                      <p className="sm:max-w-fit max-w-[283px] text-[16px] md:text-left text-center leading-[20px] tracking-[0] m-0 mx-auto font-normal font-helvetica text-white opacity-60">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot Navigation */}
        {cards.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {cards.map((_, index) => (
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
                      ? 'bg-white scale-110'
                      : 'bg-gray-400 hover:bg-gray-300'
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

// Core Values Section
const CoreValuesSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    title: string
    image: { asset: { url: string }; alt?: string }
    description: string
  }>
}> = ({ title, description, cards }) => {
  return (
    <section className="md:pt-[77px] pt-[40px] px-[15px] pb-[63px] md:pb-[103] !bg-white">
      <div className="max-w-[1304px] m-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:mb-[54px] mb-[30px] flex md:flex-row flex-col justify-between lg:gap-[102px]  gap-[9px] "
        >
          <h2 className="md:text-[64px] text-[30px] md:text-left text-center leading-[40px] lg:text-[48px] font-[500] text-black md:mb-[16px]">{title}</h2>
          <p className="text-[16px] md:text-right text-center lg:text-[18px] text-black md:max-w-[517px] md:ml-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-[32px] gap-[41px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className=""
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

// Leadership Team Section
const LeadershipTeamSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    Name: string
    title: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ title, description, cards }) => {
  return (
    <section className="pt-[50px] pb-[70px] lg:pb-[117px] bg-[#560100] px-[15px]">
      <div className="max-w-[1400px] m-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left md:mb-[228px] mb-[165px]  flex md:flex-row flex-col  justify-between md:gap-[182px] gap-[32px]"
        >
          <h2 className="text-[28px] md:text-left text-center lg:text-[48px] font-bold text-white md:mb-[16px]">{title}</h2>
          <p className="text-[16px] md:text-right text-center lg:text-[18px] text-white md:max-w-[517px] md:ml-auto">
            {description}
          </p>
        </motion.div>
         {/* md:grid-cols-2 lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start  md:gap-x-[100px] gap-x-[50px] gap-y-[200px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className=" transition-shadow flex lg:flex-row flex-col gap-[30px]"
            >
              <div className='bg-white h-fit p-[10px] relative m-auto lg:m-0  lg:max-w-[300px] max-w-[400px]  w-full'>
                 <div className="relative w-full h-[505px] mt-[-176px]">
                  <Image
                    src={card.image.asset.url}
                    alt={card.image.alt || card.Name}
                    fill
                    className="object-cover !relative object-top z-10"
                  />
                </div>
                <div className='bg-[#560100] absolute top-3 right-0 left-0 h-[327px] w-[94%] m-auto  z-[1]'></div>
              </div>
              <div className='border-t border-[#fff] pt-5 lg:max-w-[833px] w-full'>
               
                <h3 className="text-[27px] text-left font-[700] leading-[1] text-white mb-4 ">{card.Name}</h3>
                 <p className="text-[16px]  text-left font-[400] text-white mb-4">{card.title}</p>
                 <p className="mt-[17px] m-auto text-[30px] md:text-[20px] font-[300] leading-[120%] text-white font-helvetica text-left">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// By The Numbers Section with Word Animation
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
    <section className="pt-[63px] lg:pt-[108px] pb-[60px] lg:pb-[54px] px-[15px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Content */}
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
                <div className="border-b border-[#777777] text-[20px] tracking-[-0.4px] font-[400] text-[#16161880] font-helvetica mb-[24px] pb-[31px]">
                  {count.name}
                </div>
                <div className="text-[20px] tracking-[-0.8px] font-[500] text-[#7F7F7F] font-helvetica uppercase">
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
// Animation variants for Call to Action
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

const CallToActionSection: React.FC<{
  title: string
  description: string
  buttonText: string
  buttonLink: string
}> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="pt-[48px] pb-[54px] lg:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-[15px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[31px]">
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
              <div className="lg:col-span-1 space-y-8 lg:block hidden">
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
              <div className="space-y-5 flex flex-col justify-end ld:items-end">
                {description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] lg:max-w-[575px]"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile Button - shown after description */}
          <div className="mt-[14px] space-y-8 block lg:hidden">
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
                         border border-black !bg-[#560100] text-white font-helvetica
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
export default function AboutUsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AboutUs | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const aboutUsData = await getAboutUs()
        console.log('About Us data:', aboutUsData)
        setData(aboutUsData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching About Us:', err)
        setError('Failed to load About Us page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-gray-600">Loading About Us...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-red-600">{error || 'No About Us data found'}</p>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

    <div className="consultation-container ">
      {/* Hero Section */}
      {data.heroSection && (
        <HeroSection
          sectionLabel={data.heroSection.sectionLabel}
          mainHeading={data.heroSection.mainHeading}
        />
      )}

      {/* Forever Starts Now Section */}
      {data.foreverStartsNowSection && (
        <ForeverStartsNowSection
          mainName={data.foreverStartsNowSection.mainName}
          mainTitle={data.foreverStartsNowSection.mainTitle}
          images={data.foreverStartsNowSection.images}
          content={data.foreverStartsNowSection.content}
        />
      )}

      
    </div>
    {/* Forever Section Slider */}
      {data.ForeversSection && (
        <ForeverSection
          title={data.ForeversSection.title}
          description={data.ForeversSection.description}
          cards={data.ForeversSection.cards}
        />
      )}

      {/* Core Values Section */}
      {data.coreValuesSection && (
        <CoreValuesSection
          title={data.coreValuesSection.title}
          description={data.coreValuesSection.description}
          cards={data.coreValuesSection.cards}
        />
      )}

      {/* Leadership Team Section */}
      {data.leadershipTeamSection && (
        <LeadershipTeamSection
          title={data.leadershipTeamSection.title}
          description={data.leadershipTeamSection.description}
          cards={data.leadershipTeamSection.cards}
        />
      )}

      {/* By The Numbers Section */}
      {data.internByheNumbersSection && (
        <ByTheNumbersSection
          title={data.internByheNumbersSection.title}
          description={data.internByheNumbersSection.description}
          countSection={data.internByheNumbersSection.countSection}
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
 
  </>
  )
}

