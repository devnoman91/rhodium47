'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { KeepExploring, KeepExploringSection as KeepExploringSectionType } from '@/content/types'

interface KeepExploringSectionProps {
  data: KeepExploring
}

// Animation variants for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const KeepExploringSection: React.FC<KeepExploringSectionProps> = ({ data }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Sunburst Icon */}
            <motion.div
           
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-gray-900"
                  fill="currentColor"
                >
                  {/* Sunburst rays */}
                  {Array.from({ length: 40 }, (_, i) => {
                    const angle = (i * 360) / 40
                    const isLong = i % 2 === 0
                    const length = isLong ? 35 : 25
                    const width = isLong ? 2 : 1.5
                    return (
                      <motion.rect
                        key={i}
                        x={-width / 2}
                        y={-length}
                        width={width}
                        height={length}
                        transform={`translate(100, 100) rotate(${angle})`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + (i * 0.01),
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      />
                    )
                  })}

                  {/* Center circle with arrow */}
                  <circle cx="100" cy="100" r="25" fill="currentColor" />

                  {/* Arrow inside circle */}
                  <motion.path
                    d="M85 100 L115 100 M105 90 L115 100 L105 110"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Section Label */}
              <div className="inline-flex items-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span className="text-sm lg:text-base font-medium text-gray-900 tracking-wider uppercase">
                  {data.name}
                </span>
              </div>

              {/* Main Description */}
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                  {data.description.split('Connect with the world around you.')[0].trim()}
                  <span className="text-gray-500">
                    {data.description.includes('Connect with the world around you.')
                      ? ` Connect with the world around you.${data.description.split('Connect with the world around you.')[1] || ''}`
                      : ''
                    }
                  </span>
                </p>
              </div>

              {/* Navigation Buttons */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-4"
              >
                {data.section && data.section.map((item, index) => (
                  <NavigationButton key={item.name} item={item} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Separate NavigationButton component for better performance
const NavigationButton: React.FC<{ item: KeepExploringSectionType; index: number }> = React.memo(({ item, index }) => {
  return (
    <motion.a
      href={item.link}
      variants={buttonVariants}
      transition={{
        duration: 0.5,
        delay: index * 0.1 + 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group inline-flex items-center px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-900 rounded-full font-medium hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.svg
        className="w-4 h-4 mr-3 group-hover:translate-x-0.5 transition-transform duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </motion.svg>
      <span>{item.name}</span>
    </motion.a>
  )
})

NavigationButton.displayName = 'NavigationButton'

export default KeepExploringSection