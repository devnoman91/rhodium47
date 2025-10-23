'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface ProductAboutSectionProps {
  aboutSection: {
    name?: string
    description?: string
    images?: Array<{
      name?: string
      title?: string
      image?: {
        asset: {
          url: string
        }
        alt?: string
      }
      counts?: Array<{
        name?: string
        title?: string
        value?: number
      }>
    }>
  }
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

const ProductAboutSection: React.FC<ProductAboutSectionProps> = ({ aboutSection }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })

  const words = useMemo(() => (aboutSection.description || '').split(' '), [aboutSection.description])
  const images = aboutSection.images || []
  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % images.length)
  }, [images.length])

  // Auto-advance slider
  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      goToNext()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [images.length, goToNext])

  return (
    <section className="py-6 lg:py-[80px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-[40px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20">
            {/* Left Logo */}
            <motion.div variants={itemVariants} className="hidden lg:flex lg:col-span-2 xl:col-span-2 flex-col justify-start items-center lg:items-start">
              {/* Rotating icon */}
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 mx-auto flex items-center justify-center">
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
                    className="text-2xl lg:text-3xl text-gray-900"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Heading + Description */}
            <motion.div variants={itemVariants} className="col-span-1 md:ml-50 lg:ml-50 xl:ml-50 lg:col-span-10 xl:col-span-10">
              {/* Section divider line */}
              <motion.div
                className="h-[1px] w-full bg-[#777] rounded-full mb-3"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />

              {/* Section Label */}
              <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-[#161618] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] uppercase">
                  {aboutSection.name || 'About'}
                </span>
              </div>

              {/* Animated, per-word highlight on scroll (karaoke-style) */}
              {aboutSection.description && (
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
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section - Image and Counts Slider */}
        {images.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-start"
          >
            <div className="lg:col-span-12">
              <div className="flex flex-col lg:flex-row ">
                {/* Image with Navigation */}
                <div className="w-full lg:w-[50%]">
                  <div className="relative aspect-[1/0.65] h-full rounded-2xl overflow-hidden bg-gray-100">
                    {!imageLoaded && (
                      <div className="absolute inset-0 animate-pulse" />
                    )}
                    <AnimatePresence mode="wait">
                      {currentImage?.image?.asset?.url && (
                        <motion.img
                          key={currentIndex}
                          src={currentImage.image.asset.url}
                          alt={currentImage.image.alt || currentImage.name || 'Product about image'}
                          className="w-full h-full object-cover aspect-[1/0.54]"
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

                    {/* Navigation Arrows (only show if multiple images) */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevious}
                          className="absolute left-2 cursor-pointer md:left-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                          aria-label="Previous image"
                        >
                          <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </button>

                        <button
                          onClick={goToNext}
                          className="absolute right-2 cursor-pointer md:right-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                          aria-label="Next image"
                        >
                          <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Product Info and Counts */}
                <div className="w-full lg:w-[50%] flex items-center relative left-[-6%]">
                  <AnimatePresence mode="wait">
                    {currentImage && (
                      <motion.div
                        key={`counts-${currentIndex}`}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                      >
                        {/* Counts Section */}
                        {currentImage.counts && currentImage.counts.length > 0 && (
                          <div className="rounded-[22px] bg-white  p-[20px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {currentImage.counts.map((count, index) => (
                                <motion.div
                                  key={index}
                                  className=""
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className={`flex flex-col items-center text-center justify-center  px-[20px] lg:md:border-r md:border-r border-[#ddd] ${((index + 1) % 3 === 0) ? 'border-r-0' : ''}`}>
                                    <span className="text-black text-center font-helvetica text-[50px] not-italic font-bold leading-[120%] tracking-[-1px]">
                                      {count.value}
                                    </span>
                                    <span className="text-black text-center font-helvetica text-[20px] not-italic font-normal leading-[120%] tracking-[-0.4px]">
                                      {count.name}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProductAboutSection