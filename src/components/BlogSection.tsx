'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductBlog, BlogProduct } from '@/content/types'

interface BlogSectionProps {
  blogData: ProductBlog
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [highlightedCategory, setHighlightedCategory] = useState<string>('')

  // Unique categories (without 'All')
  const categories = useMemo(() => {
    return [...new Set(blogData.products.map(product => product.category))]
  }, [blogData.products])

  // Get center card's category based on scroll position
  const getCenterCardCategory = (dragX: number = 0) => {
    const cardWidth = 450
    const centerPosition = Math.abs(dragX) + (window.innerWidth / 2)
    const centerIndex = Math.round(centerPosition / cardWidth)
    const clampedIndex = Math.max(0, Math.min(centerIndex, blogData.products.length - 1))
    const centerProduct = blogData.products[clampedIndex]
    return centerProduct ? centerProduct.category : ''
  }

  // Update highlighted category during drag
  const handleDrag = (event: any, info: any) => {
    const currentDragX = -currentIndex * 450 + info.offset.x
    const centerCategory = getCenterCardCategory(currentDragX)
    setHighlightedCategory(centerCategory)
  }

  // Update highlighted category when sliding
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100

    if (info.offset.x > threshold && currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
    } else if (info.offset.x < -threshold && currentIndex < blogData.products.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
    }

    // Update highlighted category based on final position
    setTimeout(() => {
      const finalCategory = getCenterCardCategory(-currentIndex * 450)
      setHighlightedCategory(finalCategory)
    }, 100)
  }

  // Initialize highlighted category
  useMemo(() => {
    if (blogData.products.length > 0) {
      setHighlightedCategory(blogData.products[0].category)
    }
  }, [blogData.products])

  const handleCategoryChange = useCallback((category: string) => {
    // Find first product of this category and scroll to it
    const categoryIndex = blogData.products.findIndex(product => product.category === category)
    if (categoryIndex !== -1) {
      setCurrentIndex(categoryIndex)
      setHighlightedCategory(category)
    }
  }, [blogData.products])

  return (
    <section className=" bg-white pt-30">
      <div className=" mx-auto px-6">
        {/* Title & Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-[32px] md:text-[48px] lg:text-[56px] xl:text-[64px] not-italic tracking-[0] leading-[110%] text-black font-medium max-w-[730px] text-center mx-auto mb-[50px] md:mb-8 lg:mb-[50px] font-helvetica"
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {blogData.mainSectionTitle}
          </motion.h2>

          {/* Category Tabs */}
          <motion.div
            variants={itemVariants}
            className="mb-[80px] m-auto rounded-[50px] bg-black w-fit py-[12px] px-[16px]"
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-[28px] py-[13px] rounded-[50px] not-first:flex items-center gap-4  text-black no-underline font-helvetica text-[16px] leading-[24px] tracking-[0] font-medium transition ease-[0.4s] w-fit cursor-pointer ${
                    highlightedCategory === category
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Blog Cards Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.div
            className="flex space-x-[43px] cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{
              left: -((blogData.products.length - 1) * 450),
              right: 0
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentIndex * 450 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {blogData.products.map((product, index) => (
              <BlogCard
                key={`${product.slug.current}-${index}`}
                product={product}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// BlogCard component
const BlogCard: React.FC<{ product: BlogProduct; index: number }> = React.memo(({ product, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-white font-helvetica w-[430px] flex-shrink-0"
    >
      {/* Image */}
      <div className="relative  rounded-2xl">
        <motion.img
          src={product.image.asset.url}
          alt={product.image.alt || product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 rounded-2xl">
          <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 font-helvetica">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-[28px]">
        <h3 className="  text-[16px] leading-[20px] tracking-[0] m-0 font-normal  text-[#3F3E4B] text-center font-helvetica">
          {product.title}
        </h3>

      
      </div>
    </motion.div>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogSection
