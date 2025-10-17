'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, Variants, PanInfo } from 'framer-motion'
import Link from 'next/link'

interface Vehicle {
  id: string
  name: string
  model: string
  description: string
  price: string
  monthlyPayment: string
  range: string
  image: string
  category: 'standard' | 'armored'
  handle: string
}

interface VehicleShowcaseProps {
  vehicles: Vehicle[]
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Enhanced title animation with split text effect
const titleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
}

const titleLineVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Button animation variants
const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({ vehicles }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'standard' | 'armored'>('standard')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTime = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isSliderComplete = useRef(false)

  const filteredVehicles = selectedCategory === 'all'
    ? vehicles
    : vehicles.filter(vehicle => vehicle.category === selectedCategory)

  useEffect(() => {
    setCurrentIndex(0)
    isSliderComplete.current = false
  }, [selectedCategory])

  // Reset slider completion when entering the section
  useEffect(() => {
    if (isInView && !isScrolling) {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerBottom = containerRect.bottom
      const windowHeight = window.innerHeight

      // Reset slider state when section comes into view from outside
      if (containerTop > windowHeight * 0.8) {
        // Coming from top - reset to first slide
        setCurrentIndex(0)
        isSliderComplete.current = false
      } else if (containerBottom < windowHeight * 0.2) {
        // Coming from bottom - reset to last slide
        setCurrentIndex(filteredVehicles.length - 1)
        isSliderComplete.current = false
      }
    }
  }, [isInView, isScrolling, filteredVehicles.length])

  const handleCategoryChange = (category: 'all' | 'standard' | 'armored') => {
    setSelectedCategory(category)
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 20

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < filteredVehicles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleScroll = useCallback((event: WheelEvent) => {
    const container = containerRef.current
    if (!container) return

    // Get the container's position relative to viewport
    const containerRect = container.getBoundingClientRect()
    const containerTop = containerRect.top
    const containerBottom = containerRect.bottom
    const windowHeight = window.innerHeight

    // Check if section is in view
    const inView = containerTop <= windowHeight * 0.5 && containerBottom >= windowHeight * 0.5
    setIsInView(inView)

    // If not in view, allow normal scrolling
    if (!inView) {
      isSliderComplete.current = false
      return
    }

    // Determine scroll direction
    const direction = event.deltaY > 0 ? 'down' : 'up'

    // Check if slider is at boundaries
    const isAtFirstSlide = currentIndex === 0
    const isAtLastSlide = currentIndex === filteredVehicles.length - 1

    // Handle scroll behavior based on direction and slider position
    if (direction === 'down') {
      if (!isAtLastSlide) {
        // Prevent page scroll, advance slider
        event.preventDefault()

        const now = Date.now()
        const timeSinceLastScroll = now - lastScrollTime.current

        if (timeSinceLastScroll < 400) return

        lastScrollTime.current = now
        setIsScrolling(true)
        setCurrentIndex(prev => prev + 1)

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 600)
      } else {
        // At last slide, mark slider as complete and allow smooth scroll down
        isSliderComplete.current = true
      }
    } else if (direction === 'up') {
      if (!isAtFirstSlide) {
        // Prevent page scroll, go to previous slide
        event.preventDefault()

        const now = Date.now()
        const timeSinceLastScroll = now - lastScrollTime.current

        if (timeSinceLastScroll < 400) return

        lastScrollTime.current = now
        setIsScrolling(true)
        setCurrentIndex(prev => prev - 1)

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 600)
      } else {
        // At first slide, mark slider as complete and allow smooth scroll up
        isSliderComplete.current = true
      }
    }
  }, [currentIndex, filteredVehicles.length])

  useEffect(() => {
    // Add event listener to window for better scroll detection
    window.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  return (
    <section
      ref={containerRef}
      className="py-10 lg:py-10 bg-[#F4F1F2] relative overflow-hidden"
      style={{
        scrollSnapType: 'y proximity',
        scrollBehavior: isSliderComplete.current ? 'smooth' : 'auto'
      }}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-1 lg:mb-2">
            {/* Left - Title with Enhanced Animation */}
            <motion.div
              variants={titleVariants}
              className="mb-1 lg:mb-0"
            >
              <motion.button
                className="relative overflow-hidden cursor-pointer text-left group bg-transparent border-none p-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* sliding overlay */}
                <span className="absolute inset-0 bg-black translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0" />

                <h1 className="relative z-10 text-black font-helvetica text-[64px] not-italic font-medium leading-[110%] tracking-[-1.28px] transition-colors duration-500 ease-in-out group-hover:text-white">
                  <motion.span
                    variants={titleLineVariants}
                    className="block"
                    style={{ perspective: '1000px' }}
                  >
                    Our Advanced
                  </motion.span>
                  <motion.span
                    variants={titleLineVariants}
                    className="block"
                    style={{ perspective: '1000px' }}
                  >
                    Car Models
                  </motion.span>
                </h1>
              </motion.button>
            </motion.div>

            {/* Right - Description and Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col items-start max-w-md">
              <motion.p
                className="text-black font-helvetica text-[16px] not-italic font-medium leading-[160%] mb-[16px]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Discover our range of luxury armored vehicles, each offering
                unparalleled protection and sophistication.
              </motion.p>

              {/* Category Filter Buttons with Enhanced Animations */}
              <motion.div
                className="flex gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.button
                  variants={buttonVariants}
                  onClick={() => handleCategoryChange('standard')}
                  className={`cursor-pointer flex w-[136px] h-[48px] flex-shrink-0 rounded-[50px] px-[16px] py-[14px] text-center font-helvetica text-[16px] not-italic font-bold leading-[150%] transition-all duration-300 justify-center items-center ${
                    selectedCategory === 'standard' ? 'bg-black text-white' : 'bg-gray-300 text-black hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Models
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  onClick={() => handleCategoryChange('armored')}
                  className={`cursor-pointer flex w-[215px] h-[48px] flex-shrink-0 rounded-[50px] px-[16px] py-[14px] text-center font-helvetica text-[16px] not-italic font-bold leading-[150%] transition-all duration-300 justify-center items-center ${
                    selectedCategory === 'armored' ? 'bg-black text-white' : 'bg-[#CDCDCD] text-white '
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Armored Collection
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Vehicle Image Section - Full Width with Scroll-Snap */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mb-1 lg:mb-2"
      >
        <div className="relative overflow-hidden pb-1 lg:pb-2">
          {/* Vehicle Slider or Not Available Message */}
          {filteredVehicles.length > 0 ? (
            <div
              ref={sliderRef}
              className="relative overflow-hidden py-2 lg:py-3"
              style={{
                scrollSnapAlign: 'center',
              }}
            >
              <div className="w-full flex justify-center">
                <motion.div
                  className="flex cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: -30, right: 30 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  animate={{
                    x: -currentIndex * 100 + '%',
                    scale: isScrolling ? 0.98 : 1
                  }}
                  transition={{
                    duration: isScrolling ? 1.2 : 0.7,
                    ease: isScrolling ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1],
                    scale: {
                      duration: 0.4,
                      ease: "easeInOut"
                    }
                  }}
                  style={{ width: `${filteredVehicles.length * 100}%` }}
                >
                  {filteredVehicles.map((vehicle) => (
                    <VehicleSlide
                      key={vehicle.id}
                      vehicle={vehicle}
                      isActive={filteredVehicles[currentIndex]?.id === vehicle.id}
                      isScrolling={isScrolling}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="relative py-16 lg:py-24">
              <div className="w-full flex justify-center items-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-gray-600 font-helvetica text-[48px] not-italic font-medium leading-[110%] tracking-[-0.96px] mb-4">
                    Not Available
                  </h3>
                  <p className="text-gray-500 font-helvetica text-[18px] not-italic font-normal leading-[160%]">
                    No products found in this category at the moment.
                  </p>
                </motion.div>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </section>
  )
}

// Separate VehicleSlide component for performance
const VehicleSlide: React.FC<{
  vehicle: Vehicle;
  isActive: boolean;
  isScrolling: boolean;
}> = React.memo(({ vehicle, isActive, isScrolling }) => {
  return (
    <motion.div
      className="flex-shrink-0 flex flex-col items-center px-4 md:px-6"
      style={{ width: '100%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        y: isActive ? 0 : 10,
        scale: isActive ? 1 : 0.95
      }}
      transition={{
        duration: isScrolling ? 1.2 : 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Vehicle Image with Enhanced Animation */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{
          opacity: isActive ? 1 : 0.6,
          scale: isActive ? 1 : 0.9,
          y: isActive ? 0 : 30
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full max-w-[800px] h-auto object-contain drop-shadow-2xl select-none"
          drag={false}
          initial={{ rotateY: -20 }}
          animate={{
            rotateY: isScrolling ? (isActive ? 0 : 15) : 0,
            filter: isActive ? "brightness(1)" : "brightness(0.8)"
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </motion.div>

      {/* Vehicle Info with Animations */}
      <div className="text-center">
        <motion.h2
          className="max-w-[660px] m-auto text-black font-helvetica text-[45px] not-italic font-bold leading-[120%] tracking-[-3px] uppercase mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isActive ? 1 : 0.5,
            y: isActive ? 0 : 20
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {vehicle.name}
        </motion.h2>

        <motion.p
          className="text-[color:var(--Sub-Heading,#6B7280)] text-center font-helvetica text-[18px] not-italic font-medium leading-[120%] mb-[30px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isActive ? 1 : 0.4,
            y: isActive ? 0 : 15
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          From {vehicle.price} • Est. {vehicle.monthlyPayment} | EPA est. range {vehicle.range}
        </motion.p>

   {/* Action Buttons with Enhanced Animations */}
  <motion.div
    className="flex flex-col sm:flex-row gap-[16px] justify-center items-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{
      opacity: isActive ? 1 : 0.3,
      y: isActive ? 0 : 20
    }}
    transition={{
      duration: 0.8,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {/* Explore Button - Links to product-detail */}
    <Link href={`/product-detail/${vehicle.handle}`}>
      <motion.button
        className="relative overflow-hidden cursor-pointer w-[132px] h-[48px] flex justify-center items-center
                  rounded-[50px] font-helvetica text-[16px] font-medium bg-black text-white border border-black group"
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isActive ? 1 : 0.5,
          x: isActive ? 0 : -10
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* sliding overlay (white) */}
        <span className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0" />
        {/* text */}
        <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black">
          Explore
        </span>
      </motion.button>
    </Link>

    {/* Buy Now Button - Links to product-design */}
    <Link href={`/product-design/${vehicle.handle}`}>
      <motion.button
        className="relative overflow-hidden cursor-pointer w-[132px] h-[48px] flex justify-center items-center
                  rounded-[50px] font-helvetica text-[16px] font-medium bg-white text-black border border-black group"
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isActive ? 1 : 0.5,
          x: isActive ? 0 : 10
        }}
        transition={{
          duration: 0.6,
          delay: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* sliding overlay (black) */}
        <span className="absolute inset-0 bg-black translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0" />
        {/* text */}
        <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
          Buy Now
        </span>
      </motion.button>
    </Link>
</motion.div>


      </div>
    </motion.div>
  )
})

VehicleSlide.displayName = 'VehicleSlide'

export default VehicleShowcase
