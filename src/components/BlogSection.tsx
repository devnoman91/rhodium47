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
    <section className=" bg-white">
      <div className=" mx-auto px-6">
        {/* Title & Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 font-helvetica"
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {blogData.mainSectionTitle}
          </motion.h2>

          {/* Category Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex bg-gray-900 rounded-full p-1 font-helvetica">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-helvetica ${
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
              className="flex space-x-6 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{
                left: -((filteredProducts.length - 1) * 340), // card width approx
                right: 0
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {filteredProducts.map((product, index) => (
                <BlogCard
                  key={`${selectedCategory}-${product.slug.current}`}
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
      <div className="p-6">
        <h3 className="  font-bold   text-gray-900 mb-3  duration-200 font-helvetica">
          {product.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 font-helvetica">
          {product.description}
        </p>

        {/* Explore More Button */}
        <motion.button
          className="inline-flex items-center space-x-2 text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200 group/button"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span>Explore More</span>
          <motion.svg
            className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.button>
      </div>
    </motion.div>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogSection
