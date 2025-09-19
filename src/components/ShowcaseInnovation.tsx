'use client'

import React, { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { ShowcaseInnovation, CountItem, BlogItem } from '@/content/types'

interface ShowcaseInnovationProps {
  data: ShowcaseInnovation
}

// Animation variants for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const countVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

const ShowcaseInnovationComponent: React.FC<ShowcaseInnovationProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const cardsPerView = 3
  const totalSlides = Math.ceil(data.blogSection.length / cardsPerView)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50

    if (info.offset.x > threshold && currentIndex > 0) {
      // Dragged right - go to previous slide
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < totalSlides - 1) {
      // Dragged left - go to next slide
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-[#111111] text-white overflow-hidden">
      {/* Top Section - Constrained */}
      <div className="max-w-7xl mx-auto px-6 mb-16 lg:mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-8 lg:mb-12">
            <h1 className="text-[60px] not-italic tracking-normal leading-[1.1] font-medium font-helvetica">
              {data.main.title}
            </h1>
          </motion.div>

          {/* Count and Description Section Container */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
            {/* Count Section */}
            <motion.div
              variants={containerVariants}
              className="lg:flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              {data.main.countSection.slice(0, 4).map((item, index) => (
                <CountCard key={index} item={item} index={index} />
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="lg:flex-1"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica">
                {data.main.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Blog Section - Extending Full Width */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        {/* Left Padding for Content Alignment */}
        <div className="pl-6 lg:pl-[calc((100vw-1280px)/2+1.5rem)]">
          {/* Slider Container */}
          <div className="relative overflow-visible">
            <motion.div
              className="flex gap-6 cursor-grab active:cursor-grabbing pr-12"
              drag="x"
              dragConstraints={{ left: -((data.blogSection.length - 2.5) * 420), right: 0 }}
              onDragEnd={handleDragEnd}
              whileHover={{ x: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileDrag={{ cursor: "grabbing" }}
              style={{ width: 'max-content' }}
            >
              {data.blogSection.map((blog, index) => (
                <motion.div
                  key={blog.slug.current}
                  className="w-[380px] flex-shrink-0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }}
                >
                  <BlogCard blog={blog} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
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
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="text-left"
    >
      <div className="text-[29px] md:text-[36px] lg:text-[48px] not-italic tracking-normal leading-[1.1] font-medium font-helvetica mb-1 md:mb-2 max-w-[100px] md:max-w-[150px] lg:max-w-[150px] mx-auto lg:mx-0">
        {item.name}
      </div>
      <div className="text-[12px] md:text-[14px] lg:text-[16px] leading-[1.4] md:leading-[24px] tracking-[0] m-0 font-light font-helvetica max-w-[100px] md:max-w-[150px] lg:max-w-[150px] mx-auto lg:mx-0">
        {item.title}
      </div>
    </motion.div>
  )
})

// Separate BlogCard component for better performance
const BlogCard: React.FC<{ blog: BlogItem; index: number }> = React.memo(({ blog, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group backdrop-blur-sm rounded-[30px] flex flex-col justify-between h-[320px] w-[380px] p-6 bg-[#1B1B1B] transition-all duration-300 border border-gray-700/50"
    >
      {/* Content */}
      <div className="flex flex-col gap-4 flex-1">
        <h3 className="text-white font-helvetica text-[26px] font-normal leading-[49px] m-0">
          {blog.title}
        </h3>

        <p className="text-white/63 font-helvetica text-[16px] font-normal leading-[24px] m-0 flex-1">
          {blog.description}
        </p>
      </div>

      {/* Learn More Button */}
      <motion.button
      className="px-5 py-2 rounded-[50px] border-1 border-white text-white no-underline font-['Helvetica Neue'] text-[14px] leading-[20px] tracking-[0] font-normal transition ease-[0.4s] w-fit block cursor-pointer mt-auto"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          // Handle navigation to blog post
          if (blog.slug.current) {
            window.location.href = `/blog/${blog.slug.current}`
          }
        }}
      >
        <span>Learn More</span>
       
      </motion.button>
    </motion.div>
  )
})

CountCard.displayName = 'CountCard'
BlogCard.displayName = 'BlogCard'

export default ShowcaseInnovationComponent