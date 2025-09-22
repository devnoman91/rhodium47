'use client'

import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Utility, UtilitySection as UtilitySectionType } from '@/content/types'

interface UtilitySectionProps {
  data: Utility
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const UtilitySection: React.FC<UtilitySectionProps> = ({ data }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => data.description.split(' '), [data.description])

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="my-0 mx-auto max-w-[820px] pt-3 border-t border-black mb-8 md:mb-12 lg:mb-[90px]">
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
              
            >
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span className="">
                  {data.name}
                </span>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="mb-8 md:mb-12 lg:mb-16 xl:mb-20">
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="max-w-sm md:max-w-3xl lg:max-w-5xl mx-auto text-center md:text-left"
              >
                <p
                  ref={descriptionRef}
                  className="text-[20px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-normal m-0 font-medium font-helvetica flex flex-wrap justify-center md:justify-start"
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
        </div>
            {/* Categories Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12"
            >
              {data.section.map((item, index) => (
                <CategoryCard key={item.name} item={item} index={index} />
              ))}
            </motion.div>
      </div>
    </section>
  )
}

// Separate CategoryCard component for better performance
const CategoryCard: React.FC<{ item: UtilitySectionType; index: number }> = React.memo(({ item, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group"
    >
      {/* Content */}
      <div className="mb-6 md:mb-8">
        <p className="text-[rgba(22,22,24,0.5)] text-center text-[16px] md:text-[18px] lg:text-[20px] not-italic font-normal leading-[120%] tracking-[-0.4px] font-helvetica">
          {item.title}
        </p>
      </div>

      {/* Category Label with Line */}
      <div className="relative">
        <div className="w-full h-px bg-gray-300 mb-3 md:mb-4"></div>
        <h3 className="text-[#7F7F7F] text-[16px] md:text-[18px] lg:text-[20px] not-italic font-medium leading-[120%] tracking-[-0.4px] uppercase font-helvetica text-center">
          {item.name}
        </h3>
      </div>
    </motion.div>
  )
})

CategoryCard.displayName = 'CategoryCard'

export default UtilitySection