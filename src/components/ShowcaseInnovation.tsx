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
    <section className="pt-[42px] pb-[98px] lg:py-24 bg-[#111111] text-white overflow-hidden">
      {/* Top Section - Constrained */}
      <div className="max-w-7xl mx-auto px-6 mb-16 lg:mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="md:mb-[70px] mb-[27px] ">
            <h1 className="md:text-[64px] text-[30px] not-italic tracking-normal md:leading-[70px] leading-[40px] md:text-left text-center font-medium font-helvetica">
              {data.main.title}
            </h1>
          </motion.div>
           {/* Description */}
            <motion.div
              variants={itemVariants}
              className="lg:flex-1 block md:hidden mb-[56px]"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-[16px] leading-[20px] tracking-[0] m-0 font-medium text-center font-helvetica opacity-70">
                {data.main.description}
              </p>
            </motion.div>

          {/* Count and Description Section Container */}
          <div className="md:grid md:grid-cols-[57%_38%] justify-between">
            {/* Count Section */}
            <motion.div
              variants={containerVariants}
              className="lg:flex-1 grid grid-cols-2 lg:grid-cols-4 gap-[62px] md:gap-6 lg:gap-8"
            >
              {data.main.countSection.slice(0, 4).map((item, index) => (
                <CountCard key={index} item={item} index={index} />
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="lg:flex-1 md:block hidden"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-[16px] leading-[30px] text-black tracking-[0] m-0 font-medium font-helvetica opacity-70">
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
        className="relative md:block hidden"
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
                  key={`blog-${index}`}
                  className="w-[455px] flex-shrink-0 "
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
      <div className="mb-[20px] text-[48px] not-italic tracking-normal leading-[50px] font-medium font-helvetica   md:max-w-[150px] lg:max-w-[150px] mx-auto lg:mx-0">
        {item.name}
      </div>
      <div className="text-[12px] md:text-[14px] lg:text-[16px] leading-[20px] md:leading-[20px] tracking-[0] m-0 font-normal font-helvetica  md:max-w-[150px] lg:max-w-[150px] mx-auto lg:mx-0 opacity-70">
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
      className="pt-[60px] pr-[60px] pb-[30px] pl-[60px] rounded-[30px] bg-[rgba(255,255,255,0.05)] group  flex flex-col justify-between h-[100%] w-[455px] p-6  duration-300"
    >
      {/* Content */}
      <div className="flex flex-col flex-1 mb-[30px]">
        <h3 className="text-white font-helvetica text-[26px] font-normal leading-[49px] mb-[12px]">
          {blog.title}
        </h3>

        <p className="text-white/63 font-helvetica text-[16px] font-normal leading-[24px] m-0 flex-1">
          {blog.description}
        </p>
      </div>

      {/* Button */}
   <motion.button
  className="relative overflow-hidden px-[24px] py-[5px] rounded-[50px]
             border border-white text-white font-helvetica text-[14px] leading-[24px]
             font-medium transition-colors duration-500 ease-in-out
             w-fit block cursor-pointer mt-auto group"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  onClick={() => {
    if (blog.buttonLink) {
      if (blog.buttonLink.startsWith('http')) {
        window.open(blog.buttonLink, '_blank')
      } else {
        window.location.href = blog.buttonLink
      }
    }
  }}
>
  {/* sliding overlay */}
  <span
    className="absolute inset-0 bg-white translate-x-full
               transition-transform duration-500 ease-in-out rounded-[50px]
               group-hover:translate-x-0"
  />

  {/* text */}
  <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-black">
    {blog.buttonText || 'Learn More'}
  </span>
</motion.button>

    </motion.div>
  )
})

CountCard.displayName = 'CountCard'
BlogCard.displayName = 'BlogCard'

export default ShowcaseInnovationComponent