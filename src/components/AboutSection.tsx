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
    <section className="pt-[37px] lg:py-[80px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-[25px] lg:mb-[70px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20">
            {/* Left Logo + Progress */}
            <motion.div variants={itemVariants} className="hidden lg:flex lg:col-span-2 xl:col-span-2 flex-col justify-between items-center lg:items-start">
              {/* Sunburst Logo */}
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


              {/* Progress Bar */}
              <div className="w-60 lg:w-80 h-1 bg-gray-200 rounded-full overflow-hidden">
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
            <motion.div variants={itemVariants} className="col-span-1 md:ml-50 lg:ml-50 xl:ml-50 lg:col-span-10 xl:col-span-10">
              {/* Inline label to avoid grid gap */}
              <motion.div
                className="h-[1px] w-full bg-[#777] rounded-full mb-3"
                initial={{ opacity: 1, scaleX: 1 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
              <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-[#161618] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] uppercase">
                  {aboutData.sectionLabel}
                </span>
              </div>
            

              {/* Animated, per-word highlight on scroll (karaoke-style) */}
              <p
                ref={descriptionRef}
                className="text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[40px] leading-[120%] font-helvetica font-[500] max-w-[56ch] flex flex-wrap "
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-start"
          >
            <div className="lg:col-span-12">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                {/* Image */}
                <div className="w-full lg:w-[60%]">
                  <div className="relative aspect-[16/9] lg:aspect-auto md:h-full h-[371px] w-full rounded-2xl overflow-hidden bg-gray-100">
                    {!imageLoaded && (
                      <div className="absolute inset-0 animate-pulse" />
                    )}
                    <AnimatePresence mode="wait">
                      {currentProduct && (
                        <motion.img
                          key={currentProduct._id}
                          src={currentProduct.image.asset.url}
                          alt={currentProduct.image.alt || currentProduct.title}
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

                    {/* Arrows */}
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 cursor-pointer md:left-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                      aria-label="Previous product"
                    >
                      <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>

                    <button
                      onClick={goToNext}
                      className="absolute  right-2 cursor-pointer md:right-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                      aria-label="Next product"
                    >
                      <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-[40%] flex items-center">
                  <AnimatePresence mode="wait">
                    {currentProduct && (
                      <motion.div
                        key={`info-${currentProduct._id}`}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full md:block hidden"
                      >
                        <h3 className="text-[#161618] font-medium text-[24px] leading-[120%] tracking-[-0.48px] font-helvetica mb-[24px]">
                          {currentProduct.title}
                        </h3>
                        <p className="text-[#7F7F7F] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] mb-[24px]">
                          {currentProduct.description}
                        </p>
                        <motion.a
                          href={currentProduct.buttonLink}
                          className="inline-flex cursor-pointer items-center text-[#161618] font-helvetica text-[20px] gap-3 not-italic font-medium leading-[24px] tracking-[-0.4px]"
                          whileHover={{ x: 5 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                            <path d="M21.5536 10.9272L13.6786 18.8022C13.432 19.0488 13.0976 19.1873 12.7489 19.1873C12.4002 19.1873 12.0658 19.0488 11.8192 18.8022C11.5727 18.5556 11.4341 18.2212 11.4341 17.8725C11.4341 17.5238 11.5727 17.1894 11.8192 16.9428L17.4531 11.3111H1.375C1.0269 11.3111 0.693064 11.1728 0.446922 10.9267C0.200781 10.6805 0.0625 10.3467 0.0625 9.99861C0.0625 9.65051 0.200781 9.31667 0.446922 9.07053C0.693064 8.82438 1.0269 8.68611 1.375 8.68611H17.4531L11.8214 3.0511C11.5748 2.80454 11.4363 2.47012 11.4363 2.12142C11.4363 1.77272 11.5748 1.4383 11.8214 1.19173C12.068 0.945161 12.4024 0.806641 12.7511 0.806641C13.0998 0.806641 13.4342 0.945161 13.6808 1.19173L21.5558 9.06673C21.6782 9.18883 21.7752 9.3339 21.8414 9.49362C21.9075 9.65333 21.9415 9.82454 21.9413 9.99742C21.9411 10.1703 21.9067 10.3414 21.8402 10.501C21.7737 10.6605 21.6763 10.8054 21.5536 10.9272Z" fill="black" />
                          </svg>
                          <span>{currentProduct.buttonText}</span>
                        </motion.a>
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















