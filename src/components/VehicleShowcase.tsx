'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

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
  return (
    <section className="py-2 lg:py-3  bg-[#F4F1F2] relative overflow-hidden">
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
              <h1 className="text-black font-['Helvetica_Neue'] text-[64px] font-medium leading-[110%] tracking-[-1.28px]">
                Our Advanced<br />
                Car Models
              </h1>
            </motion.div>

            {/* Right - Description and Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col items-start  max-w-md">
              <p className="text-black font-['Helvetica_Neue'] text-[16px] font-medium leading-[160%] m-0 mb-1">
                Discover our range of luxury armored vehicles, each offering
                unparalleled protection and sophistication.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <button className="flex w-[136px] h-[48px] flex-shrink-0 bg-black text-white rounded-[50px] font-['Helvetica_Neue'] text-[16px] font-medium hover:bg-gray-800 transition-colors duration-200 justify-center items-center">
                  Our Models
                </button>
                <button className="flex w-[215px] h-[48px] flex-shrink-0 bg-gray-300 text-black rounded-[50px] font-['Helvetica_Neue'] text-[16px] font-medium hover:bg-gray-400 transition-colors duration-200 justify-center items-center">
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
          {/* Vehicle Image */}
          <div className="flex justify-center items-center py-2 lg:py-3">
            <img
              src="/car.png"
              alt="Mercedes G-Class Armored Vehicle"
              className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* 360 Button */}
          <div className="flex justify-center mb-1">
            <motion.button
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-helvetica text-[14px] font-medium hover:bg-gray-800 transition-colors duration-200 relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              360
            </motion.button>
          </div>

          {/* Vehicle Info Section - Inside the same background */}
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-black font-['Helvetica_Neue'] text-[100px] font-bold leading-[150%] tracking-[-8px] uppercase mb-1">
              AVANTGARDE
            </h2>
            <p className="text-[#111] font-['Helvetica_Neue'] text-[24px] font-bold leading-[110%] tracking-[-0.24px] mb-0">
              All-electric, 8-seat SUV built for safety, luxury, and performance.
            </p>
            <p className="text-[#6B7280] text-center font-['Helvetica_Neue'] text-[18px] font-medium leading-[120%] mb-1">
              From $75,900 • Est. $609/mo* | EPA est. range 410 mi*
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-1 justify-center items-center">
              <motion.button
                className="px-8 py-3 bg-black text-white rounded-[50px] font-helvetica text-[16px] font-medium hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore
              </motion.button>
              <motion.button
                className="px-8 py-3 bg-transparent text-black border border-gray-300 rounded-[50px] font-helvetica text-[16px] font-medium hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default VehicleShowcase