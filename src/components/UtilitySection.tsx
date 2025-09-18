'use client'

import React from 'react'
import { motion } from 'framer-motion'
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
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="my-0 mx-auto max-w-[820px] pt-3 border-t border-black mb-[60px]">
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
              <div className="flex flex-row  text-black text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-6 font-helvetica items-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span className="text-sm lg:text-base font-medium text-gray-900 tracking-wider uppercase">
                  {data.name}
                </span>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="mb-16 lg:mb-20">
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="max-w-5xl"
              >
                <p className="text-[40px] leading-[1.2] tracking-normal m-0 font-medium font-helvetica text-black">
                  {data.description.split('In the end,')[0].trim()}
                  <span className="text-gray-500">
                    {data.description.includes('In the end,') ? ` In the end,${data.description.split('In the end,')[1]}` : ''}
                  </span>
                </p>
              </motion.div>
            </div>

          </motion.div>
        </div>
            {/* Categories Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
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
      <div className="mb-8">
        <p className="text-[rgba(22,22,24,0.5)] text-center  text-[20px] not-italic font-normal leading-[120%] tracking-[-0.4px] font-helvetica">
          {item.title}
        </p>
      </div>

      {/* Category Label with Line */}
      <div className="relative">
        <div className="w-full h-px bg-gray-300 mb-4"></div>
        <h3 className="text-[#7F7F7F] text-[20px] not-italic font-medium leading-[120%] tracking-[-0.4px] uppercase font-helvetica text-center ">
          {item.name}
        </h3>
      </div>
    </motion.div>
  )
})

CategoryCard.displayName = 'CategoryCard'

export default UtilitySection