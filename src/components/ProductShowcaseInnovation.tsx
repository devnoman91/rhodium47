'use client'

import React, { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'

interface BlogItem {
  title: string
  description: string
  slug: {
    current: string
  }
}

interface ProductShowcaseInnovationProps {
  showcaseInnovation: {
    main: {
      title: string
      description: string
    }
    blogSection: BlogItem[]
  }
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

const ProductShowcaseInnovation: React.FC<ProductShowcaseInnovationProps> = ({ showcaseInnovation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const cardsPerView = 3
  const totalSlides = Math.ceil(showcaseInnovation.blogSection.length / cardsPerView)

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
          {/* Title and Description Section - Flex Layout */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mb-[70px]"
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Title Section */}
            <div className="flex-shrink-0">
              <h1 className="text-white font-helvetica text-[64px] font-medium leading-[70px]">
                {showcaseInnovation.main.title}
              </h1>
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-3 max-w-[450px] ml-auto">
              <p className="text-[16px] leading-[30px] tracking-[0] m-0 font-normal font-helvetica opacity-70">
                {showcaseInnovation.main.description}
              </p>
            </div>
          </motion.div>
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
              dragConstraints={{ left: -((showcaseInnovation.blogSection.length - 2.5) * 420), right: 0 }}
              onDragEnd={handleDragEnd}
              whileHover={{ x: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileDrag={{ cursor: "grabbing" }}
              style={{ width: 'max-content' }}
            >
              {showcaseInnovation.blogSection.map((blog, index) => (
                <motion.div
                  key={`${blog.slug.current}-${index}`}
                  className="w-[455px] flex-shrink-0"
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
      className="pt-[60px] pr-[60px] pb-[30px] pl-[60px] rounded-[30px] bg-[rgba(255,255,255,0.05)] group flex flex-col justify-between h-[100%] w-[455px] p-6 duration-300"
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

      {/* Learn More Button */}
      <motion.button
        className="px-[24px] py-[5px] rounded-[50px] border-1 border-white text-white no-underline font-helvetica text-[14px] leading-[24px] tracking-[0] font-medium transition ease-[0.4s] w-fit block cursor-pointer mt-auto"
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

BlogCard.displayName = 'BlogCard'

export default ProductShowcaseInnovation