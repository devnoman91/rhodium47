'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Vehicle {
  id: string
  name: string
  model: string
  description: string
  pricingLine: string
  image: string
  handle: string
}

interface VehicleShowcaseProps {
  vehicles: Vehicle[]
}

const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({ vehicles }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const filteredVehicles = vehicles.filter(vehicle =>
    !vehicle.name.toLowerCase().includes('due today') &&
    !vehicle.model.toLowerCase().includes('due today')
  )

  // Auto-play slider
  useEffect(() => {
    if (filteredVehicles.length <= 1) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredVehicles.length)
    }, 8000) // Change slide every 8 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [filteredVehicles.length])

  const goToSlide = (index: number) => {
    if (index === currentIndex) return

    setCurrentIndex(index)

    // Reset auto-play timer when manually changing slide
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredVehicles.length)
    }, 8000)
  }

  return (
    <section className="py-[35px] lg:py-10 bg-[#F4F1F2] relative overflow-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 md:block hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-1 lg:mb-2">
            {/* Left - Title */}
            <div className="mb-[24px] lg:mb-0 m-auto">
              <h1 className="md:text-left text-center text-black font-helvetica md:text-[64px] text-[30px] not-italic font-medium md:leading-[110%] leading-[40px] tracking-[-1.28px]">
                Our Advanced<br />Car Models
              </h1>
            </div>

            {/* Right - Description */}
            <div className="flex flex-col items-start max-w-md">
              <p className="md:text-left text-center text-black font-helvetica text-[16px] not-italic font-medium leading-[160%] mb-[16px]">
                Discover our range of luxury armored vehicles, each offering
                unparalleled protection and sophistication.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vehicle Slider */}
      {filteredVehicles.length > 0 ? (
        <div className="relative py-2 lg:py-3">
          <div className="relative w-full md:min-h-[600px] min-h-[505px] overflow-hidden">
            {filteredVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="absolute inset-0 w-full"
                style={{
                  pointerEvents: currentIndex === index ? 'auto' : 'none',
                  zIndex: currentIndex === index ? 10 : 1
                }}
              >
                <VehicleSlide
                  vehicle={vehicle}
                  isActive={currentIndex === index}
                  slideIndex={index}
                  currentIndex={currentIndex}
                  totalSlides={filteredVehicles.length}
                />
              </div>
            ))}
          </div>

          {/* Dot Navigation */}
          {filteredVehicles.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              {filteredVehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'bg-black scale-110'
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
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
    </section>
  )
}

// Separate VehicleSlide component
const VehicleSlide: React.FC<{
  vehicle: Vehicle;
  isActive: boolean;
  slideIndex: number;
  currentIndex: number;
  totalSlides: number;
}> = React.memo(({ vehicle, isActive, slideIndex, currentIndex, totalSlides }) => {
  // Determine position: ALL slides come from RIGHT, exit to LEFT
  const getPosition = () => {
    if (isActive) return '0%'; // Active slide at center

    // Handle wrap-around: if current is at end (last slide) and slide is at start (first slide)
    // the first slide should come from RIGHT, not LEFT
    const isWrappingToStart = currentIndex === totalSlides - 1 && slideIndex === 0;

    if (isWrappingToStart) {
      return '100%'; // First slide waits on RIGHT when looping from last
    }

    return slideIndex > currentIndex ? '100%' : '-100%'; // Future on right, past on left
  };

  return (
    <motion.div
      className="flex flex-col items-center px-4 md:px-6 w-full"
      initial={false}
      animate={{
        x: getPosition(),
        opacity: isActive ? 1 : 0
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {/* Vehicle Image */}
      <div className="relative mb-2 md:h-[390px] h-[280px] flex items-center justify-center w-full max-w-[800px] mx-auto">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={800}
          height={390}
          quality={85}
          priority={isActive}
          sizes="(max-width: 768px) 100vw, 800px"
          className="w-full h-auto object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* Vehicle Info */}
      <div className="text-center">
        <h2 className="max-w-[660px] m-auto text-black font-helvetica text-[30px] not-italic font-bold leading-[120%] tracking-[-2px] uppercase mb-4">
          {vehicle.name}
        </h2>

        <p className="text-[color:var(--Sub-Heading,#6B7280)] text-center font-helvetica text-[18px] not-italic font-medium leading-[120%] mb-[30px]">
          {vehicle.pricingLine}

        </p>

        {/* Action Buttons */}
        <div className="flex flex-row gap-[16px] justify-center items-center">
          {/* Explore Button */}
          <Link href={`/product-detail/${vehicle.handle}`}>
            <motion.button
              className="relative overflow-hidden cursor-pointer w-[132px] h-[48px] flex justify-center items-center
                        rounded-[50px] font-helvetica text-[16px] font-medium bg-black text-white border border-black group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-white translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0" />
              <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black">
                Explore
              </span>
            </motion.button>
          </Link>

          {/* Buy Now Button */}
          <Link href={`/inventory/${vehicle.handle}`}>
            <motion.button
              className="relative overflow-hidden cursor-pointer w-[132px] h-[48px] flex justify-center items-center
                        rounded-[50px] font-helvetica text-[16px] font-medium bg-white text-black border border-black group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-black translate-x-full transition-transform duration-500 ease-in-out rounded-[50px] group-hover:translate-x-0" />
              <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                Buy Now
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
})

VehicleSlide.displayName = 'VehicleSlide'

export default VehicleShowcase
