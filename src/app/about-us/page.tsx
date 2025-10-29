'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { AboutUs } from '@/content/types'
import { getAboutUs } from '@/content/queries'

const criticalInlineStyles = `
  .about-us-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .about-us-hero {
    text-align: center;
    margin-bottom: 62px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .about-us-hero-title {
    color: #000;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: -1.28px;
    margin-bottom:14px;
  }
  .about-us-hero-description {
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
  .about-us-container .info-sections {
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
    .about-us-container {
      padding-inline: 15px;
      padding-top: 100px;
      padding-bottom: 37px;
    }
    .about-us-hero{
      margin-bottom:37px;
    }
    .about-us-hero-title {
      font-size: 30px;
      margin-bottom:6px;
    }
    .about-us-hero-description {
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

// Forever Starts Now Section Component (with word animation)
const ForeverStartsNowSection: React.FC<{
  mainName: string
  mainTitle: string
  slides: Array<{
    image: { asset: { url: string }; alt?: string }
    name: string
    description: string
    bulletPoints?: string[]
  }>
}> = ({ mainName, mainTitle, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => mainTitle ? mainTitle.split(' ') : [], [mainTitle])

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
    } else {
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

  return (
    <section className="pt-[37px] lg:pt-[108px] pb-[50px] lg:pb-[54px] bg-[#F4F1F2] lg:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black max-w-[810px] m-auto">
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span>{mainName}</span>
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

// Forever Section Component (Slider with Dark Background)
const ForeverSectionSlider: React.FC<{
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
  const constraintsRef = useRef<HTMLDivElement | null>(null)

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
    } else {
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

  return (
    <section className="pt-[50px] lg:pt-[79px] pb-[80px] lg:pb-[102px] bg-[#111111] text-white overflow-hidden md:px-0 px-[13px]" style={{ contain: 'layout style' }}>
      <div className="max-w-[1304px] mx-auto md:mb-[64px] mb-[43px]" style={{ contain: 'layout style' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[17px] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <h2 className="md:text-left text-center text-white font-medium md:text-[64px] text-[30px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                {title}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-1 flex items-center justify-end"
            >
              <p className="text-white md:text-left text-center font-medium text-[16px] leading-[160%] font-helvetica md:max-w-[480px]">
                {description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.15 }}
        className="relative"
      >
        <div className="md:pl-6 lg:pl-[calc((100vw-1280px)/2+-1rem)]">
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
                const threshold = isSmallScreen ? (cardWidth * 0.12) : 100
                const fastSwipe = Math.abs(velocity) > (isSmallScreen ? 400 : 800)

                if (offset > threshold || (fastSwipe && offset > 0)) {
                  slideLeft()
                } else if (offset < -threshold || (fastSwipe && offset < 0)) {
                  slideRight()
                } else {
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
                  <div className="h-[468px] w-full relative aspect-[1/0.55] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                    {card.image?.asset?.url && (
                      <Image
                        src={card.image.asset.url}
                        alt={card.image.alt || card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px] w-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        style={{ contain: 'layout style paint' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
                  </div>

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
      </motion.div>
    </section>
  )
}

// Core Values Section Component (with cards only)
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
    <section className="pt-[62px] pb-[50px] lg:pb-[90px] bg-[#F4F1F2] text-black overflow-hidden md:px-0 px-[15px]">
      {/* Top Section - Constrained */}
      <div className="max-w-7xl mx-auto md:px-6 md:mb-16 lg:mb-20 mb-[32px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="md:mb-[70px] mb-[65px] flex flex-col md:flex-row justify-between gap-4 md:gap-[182px]">
            <h1 className="md:text-[64px] text-[31px] md:text-left text-center not-italic tracking-normal md:leading-[70px] leading-[40px] font-medium font-helvetica">
              {title}
            </h1>
            <p className="text-[16px] md:text-left text-center leading-[24px] font-helvetica text-black max-w-[517px] md:ml-auto">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Cards Section - Desktop: Grid, Mobile: Column */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-[1304px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[32px]">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div className="relative h-[260px] rounded-[20px] overflow-hidden mb-[31px]">
                {card.image?.asset?.url && (
                  <Image
                    src={card.image.asset.url}
                    alt={card.image.alt || card.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#111] font-helvetica text-[16px] font-medium leading-[150%] capitalize text-center mb-[8px]">
                  {card.title}
                </h3>
                <p className="text-[#3F3E4B] font-helvetica text-[16px] font-normal leading-[20px] text-center m-0">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// Leadership Team Section Component
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
    <section className="pt-[62px] pb-[50px] lg:pb-[90px] bg-[#111111] text-white overflow-hidden md:px-0 px-[15px]">
      {/* Top Section - Constrained */}
      <div className="max-w-7xl mx-auto md:px-6 md:mb-16 lg:mb-20 mb-[32px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="md:mb-[70px] mb-[65px] flex flex-col md:flex-row justify-between gap-4 md:gap-[182px]">
            <h1 className="md:text-[64px] text-[31px] md:text-left text-center not-italic tracking-normal md:leading-[70px] leading-[40px] font-medium font-helvetica">
              {title}
            </h1>
            <p className="text-[16px] md:text-left text-center leading-[24px] font-helvetica text-white max-w-[517px] md:ml-auto">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Cards Section - Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-[1304px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[32px]">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.Name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div className='bg-white p-[21px] relative'>
                <div className="relative w-full h-[505px] mt-[-176px]">
                  {card.image?.asset?.url && (
                    <Image
                      src={card.image.asset.url}
                      alt={card.image.alt || card.Name}
                      fill
                      className="object-cover !relative object-top z-10"
                    />
                  )}
                </div>
                <div className='bg-[#111111] absolute top-5 right-0 left-0 h-[330px] w-full m-auto max-w-[365px] z-[1]'></div>
                <div className="pt-[15px]">
                  <h3 className="text-[27px] text-center font-[700] leading-[1] text-black">{card.Name}</h3>
                  <p className="text-[16px] text-center font-[400] text-black">{card.title}</p>
                </div>
              </div>
              <p className="max-w-[299px] mt-[17px] m-auto text-[16px] font-[300] leading-[120%] text-white font-helvetica text-center">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// By The Numbers Section Component (with word animation)
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

  const words = useMemo(() => description ? description.split(' ') : [], [description])

  return (
    <section className="pt-[37px] lg:pt-[108px] pb-[50px] lg:pb-[54px] bg-[#F4F1F2] lg:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
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
                <div className="border-b border-[#777777] text-[20px] tracking-[-0.4px] font-[400] text-[#16161880] font-helvetica mb-[24px] pb-[31px]">
                  {count.value}
                </div>
                <div className="text-[20px] tracking-[-0.8px] font-[500] text-[#7F7F7F] font-helvetica uppercase">
                  {count.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

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
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="about-us-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading About Us...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="about-us-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No About Us data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="about-us-container">
        {/* Hero Section */}
        <motion.div
          className="about-us-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about-us-hero-title font-helvetica">{data.heroSection.sectionLabel}</h1>
          <p className="about-us-hero-description">{data.heroSection.mainHeading}</p>
        </motion.div>

        {/* Forever Starts Now Section */}
        {data.foreverStartsNowSection && (
          <ForeverStartsNowSection
            mainName={data.foreverStartsNowSection.mainName}
            mainTitle={data.foreverStartsNowSection.mainTitle}
            slides={data.foreverStartsNowSection.slides}
          />
        )}
      </div>

      {/* Forever Section Slider */}
      {data.ForeversSection && (
        <ForeverSectionSlider
          title={data.ForeversSection.title}
          description={data.ForeversSection.description}
          cards={data.ForeversSection.cards}
        />
      )}

      <div className="about-us-container">
        {/* Core Values Section */}
        {data.coreValuesSection && (
          <CoreValuesSection
            title={data.coreValuesSection.title}
            description={data.coreValuesSection.description}
            cards={data.coreValuesSection.cards}
          />
        )}
      </div>

      {/* Leadership Team Section */}
      {data.leadershipTeamSection && (
        <LeadershipTeamSection
          title={data.leadershipTeamSection.title}
          description={data.leadershipTeamSection.description}
          cards={data.leadershipTeamSection.cards}
        />
      )}

      <div className="about-us-container">
        {/* By The Numbers Section */}
        {data.internByheNumbersSection && (
          <ByTheNumbersSection
            title={data.internByheNumbersSection.title}
            description={data.internByheNumbersSection.description}
            countSection={data.internByheNumbersSection.countSection}
          />
        )}
      </div>

      {/* Call to Action Section */}
      {data.callToAction && (
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
                    {data.callToAction.title}
                  </h1>

                  {/* Desktop Button */}
                  <div className="lg:col-span-1 space-y-8 md:block hidden">
                    <motion.a
                      href={data.callToAction.buttonLink}
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
                        {data.callToAction.buttonText}
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
                    {data.callToAction.description.split('\n\n').map((paragraph, index) => (
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
                  href={data.callToAction.buttonLink}
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
                    {data.callToAction.buttonText}
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}
