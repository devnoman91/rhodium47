'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExperienceXodium } from '@/content/types'

interface ExperienceXodiumSectionProps {
  data: ExperienceXodium
}

// Animation variants for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
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

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
}

const ExperienceXodiumSection: React.FC<ExperienceXodiumSectionProps> = ({ data }) => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Title and Button */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8 flex flex-col gap-[10px] justify-between">
                <h1 className="text-[60px] not-italic tracking-normal leading-[1.1] font-medium  font-helvetica text-black mb-0">
                  {data.name}
                </h1>

                {/* CTA Button */}
              <div className="lg:col-span-1 space-y-8 ">
                <motion.a
                  href={data.button.link}
                  variants={buttonVariants}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="px-6 py-3 rounded-[50px] border-1  text-white bg-black no-underline font-['Helvetica Neue'] text-[16px] leading-[24px] tracking-[0] font-normal transition ease-[0.4s] w-fit block cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base lg:text-lg">{data.button.text}</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="space-y-6">
                {/* Split description into paragraphs for better readability */}
                {data.description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px]"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceXodiumSection