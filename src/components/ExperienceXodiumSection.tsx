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
    <section className="pt-[74px] pb-[46px] md:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[71px] gap-[18px]">
            {/* Left - Title and Button */}
            <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-[24px]">
                <h1 className="md:text-[62px] text-[30px] not-italic tracking-[-1px] md:leading-[68px] leading-[33px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                  style={{
                    background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {data.name}
                </h1>
            {/* CTA Button */}
              <div className="lg:col-span-1 space-y-8">
                <motion.a
                  href={data.button.link}
                  variants={buttonVariants}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="hidden relative overflow-hidden px-[24px] py-[8px] rounded-[32px] 
                            border border-[#560100] bg-[#560100] text-white font-helvetica 
                            text-[14px] font-[700] leading-[20px]  w-fit md:block cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* sliding overlay */}
                  <span
                    className="absolute inset-0 bg-white translate-x-full 
                              transition-transform duration-500 ease-in-out rounded-[32px]
                              group-hover:translate-x-0"
                  />

                  {/* text */}
                  <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                    {data.button.text}
                  </span>
                </motion.a>
              </div>

            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="space-y-5 flex flex-col justify-end items-end">
                {/* Split description into paragraphs for better readability */}
                {data.description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className=" text-[16px] leading-[24px] tracking-[0] m-auto font-[400] font-helvetica text-black md:pb-[20px] max-w-[550px]"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
             {/* CTA Button */}
              <div className="col-span-1 space-y-8 md-hidden block mt-[46px] md:hidden ">
                <motion.a
                  href={data.button.link}
                  variants={buttonVariants}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="block relative overflow-hidden px-[24px] py-[8px] rounded-[32px] 
                            border border-[#560100] bg-[#560100] text-white font-helvetica 
                            text-[14px] font-[700] leading-[20px]  w-fit  cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* sliding overlay */}
                  <span
                    className="absolute inset-0 bg-white translate-x-full 
                              transition-transform duration-500 ease-in-out rounded-[32px]
                              group-hover:translate-x-0"
                  />

                  {/* text */}
                  <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                    {data.button.text}
                  </span>
                </motion.a>
              </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceXodiumSection