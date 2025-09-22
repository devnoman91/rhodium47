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
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(blogData.products.map(product => product.category))]
    return ['All', ...uniqueCategories]
  }, [blogData.products])

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return blogData.products
    return blogData.products.filter(product => product.category === selectedCategory)
  }, [blogData.products, selectedCategory])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

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
                    selectedCategory === category
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
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <motion.div
              className="flex space-x-10 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{
                left: -((filteredProducts.length - 1) * 340), // card width approx
                right: 0
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {filteredProducts.map((product, index) => (
                <BlogCard
                  key={`${selectedCategory}-${product.slug.current}-${index}`}
                  product={product}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
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
      className="group bg-white  font-helvetica w-[430px] flex-shrink-0"
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

      
        {/* Explore More Button */}
        <motion.button
          className="text-[16px] leading-[150%] flex tracking-[0] font-medium text-center no-underline content-center gap-2.5  mx-auto mt-[20px] transition ease-[0.4s] text-[#111] relative w-fit font-helvetica"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span>Explore More</span>
        </motion.button>
      </div>
    </motion.div>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogSection
