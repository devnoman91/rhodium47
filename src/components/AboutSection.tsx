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
    <section className="py-6 lg:py-[80px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20 lg:mb-[70px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 ">
            {/* Left Logo + Progress */}
            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col ßjustify-between items-center lg:items-start">
              {/* Sunburst Logo */}
              <div className="relative mb-8 w-30 h-30 lg:w-36 lg:h-36 mx-auto flex items-center justify-center">
                {/* Rotating circle with lines */}
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 102 102"
                >

          <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="51" cy="51" r="40" stroke="#161618" stroke-width="22" stroke-dasharray="2 4"/>
          </svg>



                </motion.svg>

                {/* Static centered arrow */}
                <div className="relative w-15 h-15 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div
                    className="text-2xl lg:text-3xl text-gray-900"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                  </svg>

                  </div>
                </div>
              </div>


              {/* Progress Bar */}
              <div className="w-60 lg:w-98 h-1 bg-gray-200 rounded-full overflow-hidden">
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
                className="h-[1px] w-[700px] bg-gray-900 rounded-full mb-3"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-sm md:text-base font-helvetica font-medium uppercase  tracking-wide text-gray-600">
                  {aboutData.sectionLabel}
                </span>
              </div>
            

              {/* Animated, per-word highlight on scroll (karaoke-style) */}
              <p
                ref={descriptionRef}
                className="text-[40px] md:text-[40px] leading-[1.2] font-helvetica font-[500] max-w-[56ch] flex flex-wrap"
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
                      <h3 className="text-2xl font-[500] font-helvetica text-gray-900 mb-4">
                        {currentProduct.title}
                      </h3>
                      <p className="text-gray-600 text-lg font-[400] leading-relaxed font-helvetica mb-6">
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
