'use client'

import React, { useState, useEffect } from 'react'
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

  const filteredVehicles = selectedCategory === 'all'
    ? vehicleData
    : vehicleData.filter(vehicle => vehicle.category === selectedCategory)

  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

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

  return (
    <section className="py-10 lg:py-10 bg-[#F4F1F2] relative overflow-hidden">
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
                animate={{ x: -currentIndex * 100 + '%' }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ width: `${filteredVehicles.length * 100}%` }}
              >
                {filteredVehicles.map((vehicle, index) => (
                  <VehicleSlide key={vehicle.id} vehicle={vehicle} index={index} />
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
const VehicleSlide: React.FC<{ vehicle: Vehicle; index: number }> = React.memo(({ vehicle, index }) => {
  return (
    <motion.div
      className="flex-shrink-0 flex flex-col items-center px-4 md:px-6"
      style={{ width: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Vehicle Image */}
      <div className="relative mb-8">
        <motion.img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl select-none"
          drag={false}
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
          <motion.button
            className="cursor-pointer py-[16px] px-[12px] flex w-[132px] h-[48px] justify-center items-center flex-shrink-0 bg-black text-white rounded-[50px] font-helvetica text-[16px] font-medium hover:bg-gray-800 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore
          </motion.button>
          <motion.button
            className="cursor-pointer py-[16px] px-[12px] flex w-[132px] h-[48px] justify-center items-center flex-shrink-0 bg-white text-black rounded-[50px] font-helvetica text-[16px] font-medium hover:bg-black hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})

VehicleSlide.displayName = 'VehicleSlide'

export default VehicleShowcase