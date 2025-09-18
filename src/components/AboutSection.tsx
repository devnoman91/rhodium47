'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { HomeAbout, ProductDetail } from '@/content/types'

interface AboutSectionProps {
  aboutData: HomeAbout
  products: ProductDetail[]
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const imageVariants = {
  initial: { scale: 1.05, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 }
}

const textVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2 }
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })
  const words = useMemo(() => (aboutData.description || '').split(' '), [aboutData.description])

  const currentProduct = useMemo(() => products[currentIndex], [products, currentIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + products.length) % products.length)
    setProgress(0)
  }, [products.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % products.length)
    setProgress(0)
  }, [products.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % products.length)
          return 0
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [products.length])

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20 lg:mb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 ">
            {/* Left Logo + Progress */}
            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-center lg:items-start">
              {/* Sunburst Logo */}
              <div className="relative mb-8">
                <motion.div
                  className="w-28 h-28 lg:w-36 lg:h-36 relative flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 bg-gray-400"
                      style={{
                        height: i % 3 === 0 ? '24px' : '14px',
                        left: '50%',
                        top: '0',
                        transformOrigin: '50% 56px',
                        transform: `translateX(-50%) rotate(${i * 15}deg)`
                      }}
                    />
                  ))}
                  <svg viewBox="0 0 24 24" className="w-8 h-8 lg:w-10 lg:h-10 text-gray-900">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="w-60 lg:w-96 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${(currentIndex + 1) * (100 / products.length)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentIndex + 1) * (100 / products.length)}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>

            

            {/* Heading + Description */}
            <motion.div variants={itemVariants} className="lg:col-span-10  ml-70 ">
              {/* Inline label to avoid grid gap */}
              <motion.div
                className="h-1 w-16 bg-gray-900 rounded-full mb-6"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
              <div className="inline-flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-sm md:text-base font-medium uppercase tracking-wide text-gray-600">
                  {aboutData.sectionLabel}
                </span>
              </div>
            

              {/* Animated, per-word highlight on scroll (karaoke-style) */}
              <p
                ref={descriptionRef}
                className="text-[40px] md:text-[40px] leading-[1.2] font-helvetica font-normal max-w-[56ch] flex flex-wrap"
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          <div className="lg:col-span-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* Image */}
              <div className="lg:col-span-2">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                  {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse" />
                  )}
                  <AnimatePresence mode="wait">
                    {currentProduct && (
                      <motion.img
                        key={currentProduct._id}
                        src={currentProduct.image.asset.url}
                        alt={currentProduct.image.alt || currentProduct.title}
                        className="w-full h-full object-cover"
                        variants={imageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                      />
                    )}
                  </AnimatePresence>

                  {/* Arrows */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Previous product"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Next product"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                  </button>

              
                </div>

                
              </div>

              {/* Product Info */}
              <div className="lg:col-span-2 flex items-center">
                <AnimatePresence mode="wait">
                  {currentProduct && (
                    <motion.div
                      key={`info-${currentProduct._id}`}
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-full"
                    >
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {currentProduct.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {currentProduct.description}
                      </p>
                      <motion.button
                        className="inline-flex items-center text-gray-900 font-medium hover:text-gray-600 transition"
                        whileHover={{ x: 5 }}
                      >
                        <span>Learn more</span>
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
