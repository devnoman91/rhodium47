'use client'

import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => data.description.split(' '), [data.description])

  return (
    <section className="pt-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Left - Sunburst Icon */}
            <motion.div
              className="w-full flex justify-center lg:justify-start max-w-[400px] hidden lg:flex"
            >
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 flex items-center justify-center">
                {/* Rotating circle with lines */}
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 102 102"
                >

                <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="51" cy="51" r="40" stroke="#161618" strokeWidth="22" strokeDasharray="2 4"/>
                </svg>



                </motion.svg>

                {/* Static centered arrow */}
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div
                    className="text-lg md:text-2xl lg:text-3xl text-gray-900"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                  </svg>

                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black md:mb-12 lg:mb-[60px]">
              {/* Section Label */}
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span className="">
                  {data.name}
                </span>
              </div>

              {/* Main Description */}
              <div className="space-y-6">
                <p
                  ref={descriptionRef}
                  className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-normal m-0 font-medium font-helvetica mb-6 md:mb-8 lg:mb-[50px] flex flex-wrap"
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
              </div>

              {/* Navigation Buttons */}
              <motion.div
                variants={containerVariants}
                className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4"
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
    ease: [0.4, 0, 0.2, 1],
  }}
  className="relative overflow-hidden px-[32px] py-[14px] rounded-[50px] border border-[#ddd] 
             flex items-center gap-[8px] text-black no-underline font-helvetica text-[20px] 
             leading-[24px] font-medium w-fit cursor-pointer group"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {/* sliding overlay */}
  <span
    className="absolute inset-0 bg-black translate-x-full 
               transition-transform duration-500 ease-in-out rounded-[50px]
               group-hover:translate-x-0"
  />

  {/* text + icon */}
  <span className="relative z-10 flex items-center gap-[8px] transition-colors duration-500 ease-in-out group-hover:text-white">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="15"
      viewBox="0 0 22 18"
      fill="currentColor"
      className="md:w-[20px] md:h-[17px] transition-transform duration-300 ease-out"
      whileHover={{ x: 4 }} // arrow slides right
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <path d="M21.2441 9.61857L13.3691 17.4936C13.2049 17.6578 12.9822 17.75 12.75 17.75C12.5178 17.75 12.2951 17.6578 12.1309 17.4936C11.9668 17.3294 11.8745 17.1067 11.8745 16.8745C11.8745 16.6423 11.9668 16.4196 12.1309 16.2554L18.513 9.87451H1.375C1.14294 9.87451 0.920376 9.78232 0.756282 9.61823C0.592187 9.45413 0.5 9.23157 0.5 8.99951C0.5 8.76745 0.592187 8.54489 0.756282 8.38079C0.920376 8.2167 1.14294 8.12451 1.375 8.12451H18.513L12.1309 1.74357C11.9668 1.57939 11.8745 1.3567 11.8745 1.12451C11.8745 0.892316 11.9668 0.669633 12.1309 0.505447C12.2951 0.341262 12.5178 0.249023 12.75 0.249023C12.9822 0.249023 13.2049 0.341262 13.3691 0.505447L21.2441 8.38045C21.3254 8.46171 21.39 8.55821 21.434 8.66444C21.478 8.77066 21.5007 8.88452 21.5007 8.99951C21.5007 9.1145 21.478 9.22836 21.434 9.33458C21.39 9.44081 21.3254 9.53731 21.2441 9.61857Z" />
    </motion.svg>
    {item.name}
  </span>
</motion.a>


  )
})

NavigationButton.displayName = 'NavigationButton'

export default KeepExploringSection