'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, Variants, PanInfo } from 'framer-motion'

interface Vehicle {
  id: number
  name: string
  model: string
  description: string
  price: string
  monthlyPayment: string
  range: string
  image: string
  category: 'standard' | 'armored'
}

const vehicleData: Vehicle[] = [
  {
    id: 1,
    name: 'AVANTGARDE',
    model: 'G-Class Elite',
    description: 'All-electric, 8-seat SUV built for safety, luxury, and performance.',
    price: '$75,900',
    monthlyPayment: '$609/mo*',
    range: '410 mi*',
    image: '/car.png',
    category: 'standard'
  },
  {
    id: 2,
    name: 'SENTINEL',
    model: 'Armored Guardian',
    description: 'Military-grade protection with luxury amenities for ultimate security.',
    price: '$125,900',
    monthlyPayment: '$1,089/mo*',
    range: '380 mi*',
    image: '/car.png',
    category: 'armored'
  },
  {
    id: 3,
    name: 'FORTRESS',
    model: 'Urban Shield',
    description: 'Compact armored vehicle designed for city protection and mobility.',
    price: '$95,900',
    monthlyPayment: '$829/mo*',
    range: '420 mi*',
    image: '/car.png',
    category: 'armored'
  },
  {
    id: 4,
    name: 'PHANTOM',
    model: 'Stealth Series',
    description: 'Advanced stealth technology combined with luxury transportation.',
    price: '$155,900',
    monthlyPayment: '$1,349/mo*',
    range: '350 mi*',
    image: '/car.png',
    category: 'standard'
  }
]

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

const VehicleShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'standard' | 'armored'>('standard')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTime = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isSliderComplete = useRef(false)

  const filteredVehicles = selectedCategory === 'all'
    ? vehicleData
    : vehicleData.filter(vehicle => vehicle.category === selectedCategory)

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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 20 // Very small threshold for immediate response

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
    setScrollDirection(direction)

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
        // Allow natural scroll to continue to next section
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
        // Allow natural scroll to continue to previous section
      }
    }
  }, [currentIndex, filteredVehicles.length])

  useEffect(() => {
    // Add event listener to window instead of container for better scroll detection
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
        scrollBehavior: isSliderComplete.current ? 'smooth' : 'auto'
      }}
    >
      {/* Scroll indicator */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r "
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
      {/* Header Section */}
      <div className="max-w-7xl mx-auto  px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-1 lg:mb-2">
            {/* Left - Title */}
            <motion.div variants={itemVariants} className="mb-1 lg:mb-0">
              <h1 className="text-black font-helvetica text-[64px] not-italic font-medium leading-[110%] tracking-[-1.28px]">
                Our Advanced<br />
                Car Models
              </h1>
            </motion.div>

            {/* Right - Description and Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col items-start  max-w-md">
              <p className="text-black font-helvetica text-[16px] not-italic font-medium leading-[160%] mb-[16px]">
                Discover our range of luxury armored vehicles, each offering
                unparalleled protection and sophistication.
              </p>

              {/* Category Filter Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleCategoryChange('standard')}
                  className={`cursor-pointer flex w-[136px] h-[48px] flex-shrink-0 rounded-[50px] px-[16px] py-[14px] text-center font-helvetica text-[16px] not-italic font-bold leading-[150%] transition-colors duration-200 justify-center items-center ${
                    selectedCategory === 'standard' ? 'bg-black text-white' : 'bg-gray-300 text-black hover:bg-gray-400'
                  }`}
                >
                  Our Models
                </button>
                <button
                  onClick={() => handleCategoryChange('armored')}
                  className={`cursor-pointer flex w-[215px] h-[48px] flex-shrink-0 rounded-[50px] px-[16px] py-[14px] text-center font-helvetica text-[16px] not-italic font-bold leading-[150%] transition-colors duration-200 justify-center items-center ${
                    selectedCategory === 'armored' ? 'bg-black text-white' : 'bg-[#CDCDCD] text-white hover:bg-gray-400'
                  }`}
                >
                  Armored Collection
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Vehicle Image Section - Full Width */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mb-1 lg:mb-2"
      >
        <div className="relative overflow-hidden pb-1 lg:pb-2">
          {/* Vehicle Slider */}
          <div className="relative overflow-hidden py-2 lg:py-3">
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
                  duration: isScrolling ? 0.8 : 0.4,
                  ease: isScrolling ? [0.25, 0.46, 0.45, 0.94] : [0.4, 0, 0.2, 1],
                  scale: {
                    duration: 0.3,
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
        duration: isScrolling ? 0.8 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Vehicle Image */}
      <div className="relative mb-8">
        <motion.img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full max-w-[800px] h-auto object-contain drop-shadow-2xl select-none"
          drag={false}
          animate={{
            rotateY: isScrolling ? (isActive ? 0 : 15) : 0,
            filter: isActive ? "brightness(1)" : "brightness(0.8)"
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Vehicle Info */}
      <div className="text-center">
        <h2 className="text-black font-helvetica text-[100px] not-italic font-bold leading-[150%] tracking-[-8px] uppercase mb-4">
          {vehicle.name}
        </h2>
        <p className="text-[#111] font-helvetica text-[24px] not-italic font-bold leading-[110%] tracking-[-0.24px] mb-[15px]">
          {vehicle.description}
        </p>
        <p className="text-[color:var(--Sub-Heading,#6B7280)] text-center font-helvetica text-[18px] not-italic font-medium leading-[120%] mb-[30px]">
          From {vehicle.price} • Est. {vehicle.monthlyPayment} | EPA est. range {vehicle.range}
        </p>

        {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row gap-[16px] justify-center items-center">
  {/* Black → White */}
  <motion.button
    className="relative overflow-hidden cursor-pointer w-[132px] h-[48px] flex justify-center items-center 
               rounded-[50px] font-helvetica text-[16px] font-medium bg-black text-white border border-black group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* sliding overlay (white) */}
    <span className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0" />
    {/* text */}
    <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black">
      Explore
    </span>
  </motion.button>

  {/* White → Black */}
  <motion.button
    className="relative overflow-hidden cursor-pointer w-[132px] h-[48px] flex justify-center items-center 
               rounded-[50px] font-helvetica text-[16px] font-medium bg-white text-black border border-black group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* sliding overlay (black) */}
    <span className="absolute inset-0 bg-black translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0" />
    {/* text */}
    <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
      Buy Now
    </span>
  </motion.button>
</div>


      </div>
    </motion.div>
  )
})

VehicleSlide.displayName = 'VehicleSlide'

export default VehicleShowcase