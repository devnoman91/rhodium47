'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Protection, CountItem } from '@/content/types'

interface ProtectionSectionProps {
  data: Protection
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

const countVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

const ProtectionSection: React.FC<ProtectionSectionProps> = ({ data }) => {
  const { scrollYProgress } = useScroll()

  // Transform scroll progress to color values
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['rgb(75, 85, 99)', 'rgb(107, 114, 128)', 'rgb(156, 163, 175)', 'rgb(209, 213, 219)']
  )

  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ['rgb(31, 41, 55)', 'rgb(55, 65, 81)', 'rgb(75, 85, 99)', 'rgb(107, 114, 128)', 'rgb(156, 163, 175)']
  )

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Label */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
              <span className="text-sm lg:text-base font-medium text-gray-900 tracking-wider uppercase">
                {data.name}
              </span>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 lg:mb-20">
            {/* Left - Main Heading */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <motion.h1
                style={{ color: headingColor }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                The Future of Protection.
              </motion.h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-start lg:items-center"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.p
                style={{ color: textColor }}
                className="text-lg lg:text-xl leading-relaxed"
              >
                {data.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
          >
            {data.countSection.map((item, index) => (
              <CountCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Separate CountCard component for better performance
const CountCard: React.FC<{ item: CountItem; index: number }> = React.memo(({ item, index }) => {
  return (
    <motion.div
      variants={countVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="text-center lg:text-left"
    >
      <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 text-gray-900">
        {item.name}
      </div>
      <div className="text-xs lg:text-sm text-gray-600 leading-relaxed uppercase tracking-wider">
        {item.title}
      </div>
    </motion.div>
  )
})

CountCard.displayName = 'CountCard'

export default ProtectionSection