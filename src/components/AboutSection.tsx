'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { HomeAbout, ProductDetail } from '@/content/types'

interface AboutSectionProps {
  aboutData: HomeAbout
  products: ProductDetail[]
}

// Move variants outside component for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const imageVariants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0.9,
    opacity: 0
  }
}

const textVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2 }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 }
  }
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Memoize current product to avoid unnecessary re-renders
  const currentProduct = useMemo(() => products[currentIndex], [products, currentIndex])

  // Memoize navigation functions
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
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-8xl mx-auto px-6">
        {/* Top Section - About Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 lg:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left - Animated Logo and Progress */}
            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-center lg:items-start">
              {/* Animated Logo */}
              <div className="relative mb-8">
                <motion.div
                  className="w-24 h-24 lg:w-32 lg:h-32 relative flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Sunburst rays */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-0.5 bg-gray-300"
                        style={{
                          height: i % 3 === 0 ? '20px' : '12px',
                          left: '50%',
                          top: '0',
                          transformOrigin: '50% 48px',
                          transform: `translateX(-50%) rotate(${i * 15}deg)`,
                        }}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Center arrow */}
                  <motion.div
                    className="w-8 h-8 lg:w-10 lg:h-10 relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="w-32 lg:w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${(currentIndex + 1) * (100 / products.length)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentIndex + 1) * (100 / products.length)}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>

            {/* Center - Section Label */}
            <motion.div variants={itemVariants} className="lg:col-span-3 lg:text-center">
              <motion.div
                className="inline-flex items-center space-x-2 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm font-helvetica font-medium tracking-wide uppercase text-gray-600">
                  {aboutData.sectionLabel}
                </span>
              </motion.div>
            </motion.div>

            {/* Right - Main Content */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-helvetica font-medium mb-6 leading-tight">
                <span className="text-gray-900">
                  {aboutData.mainHeading}
                </span>
              </h2>
            

             
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section - Product Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Product Carousel - Full Width */}
          <div className="lg:col-span-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Image Section */}
              <div className="lg:col-span-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100" style={{ contain: 'layout style paint' }}>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" style={{ contain: 'layout style paint' }} />
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
                        style={{
                          contain: 'layout style paint',
                          opacity: imageLoaded ? 1 : 0,
                          transition: 'opacity 0.3s ease'
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200 group"
                    aria-label="Previous product"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200 group"
                    aria-label="Next product"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                  </button>

                  {/* Auto-play Progress */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-6">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentIndex ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to product ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info Section - Separate Column */}
              <div className="lg:col-span-1 flex items-center">
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
                      <h3 className="text-xl font-helvetica font-medium text-gray-900 mb-3">
                        {currentProduct.title}
                      </h3>
                      <p className="text-gray-600 font-helvetica font-normal mb-4 leading-relaxed">
                        {currentProduct.description}
                      </p>
                      <motion.button
                        className="inline-flex items-center space-x-2 text-gray-900 font-helvetica font-medium hover:text-gray-600 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Learn more</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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