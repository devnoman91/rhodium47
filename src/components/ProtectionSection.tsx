'use client'

import React, { useMemo } from 'react'
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
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })
  const words = useMemo(() => (data.description || '').split(' '), [data.description])

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Content - Centered Flex Column */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="my-0 mx-auto max-w-[820px] pt-3 border-t border-black mb-8 md:mb-12 lg:mb-[60px]"
          >
            {/* Section Label */}
            <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
              <span className="">
                {data.name}
              </span>
            </div>

            {/* Animated, per-word highlight on scroll (karaoke-style) */}
            <p
              ref={descriptionRef}
              className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-normal m-0 font-medium font-helvetica flex flex-wrap"
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

          {/* Stats Section */}
         
        </motion.div>
        <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12"
          >
            {data.countSection.map((item, index) => (
              <CountCard key={index} item={item} index={index} />
            ))}
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
      className="text-center"
    >
      <div className="text-[rgba(22,22,24,0.5)] text-center text-[16px] md:text-[18px] lg:text-[20px] not-italic font-normal leading-[120%] tracking-[-0.4px] pb-4 md:pb-6 lg:pb-[30px] border-b border-black font-helvetica">
        {item.name}
      </div>
      <div className="text-[#7F7F7F] text-[16px] md:text-[18px] lg:text-[20px] not-italic font-medium leading-[120%] tracking-[-0.4px] uppercase font-helvetica pt-4 md:pt-5 lg:pt-[24px] text-center">
        {item.title}
      </div>
    </motion.div>
  )
})

CountCard.displayName = 'CountCard'

export default ProtectionSection