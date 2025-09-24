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
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  // Unique categories (without 'All')
  const categories = useMemo(() => {
    return [...new Set(blogData.products.map(product => product.category))]
  }, [blogData.products])

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!highlightedCategory) return blogData.products
    return blogData.products.filter(product => product.category === highlightedCategory)
  }, [blogData.products, highlightedCategory])

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

  // Initialize highlighted category to center category
  useMemo(() => {
    if (blogData.products.length > 0 && categories.length > 0) {
      const centerIndex = Math.floor(categories.length / 2)
      const centerCategory = categories[centerIndex]
      setHighlightedCategory(centerCategory)
      setActiveCategoryIndex(centerIndex)

      // Find center product of center category and set as current
      const categoryProducts = blogData.products.filter(product => product.category === centerCategory)
      if (categoryProducts.length > 0) {
        // Find the center product of this category
        const centerProductIndex = Math.floor(categoryProducts.length / 2)
        const centerProduct = categoryProducts[centerProductIndex]
        const productIndex = blogData.products.findIndex(product => product === centerProduct)
        if (productIndex !== -1) {
          setCurrentIndex(productIndex)
        }
      }
    }
  }, [blogData.products, categories])

  const handleCategoryChange = useCallback((category: string) => {
    console.log('Category clicked:', category)

    // Find first product of this category and scroll to it
    const firstProductOfCategory = blogData.products.find(product => product.category === category)
    console.log('First product found:', firstProductOfCategory)

    if (firstProductOfCategory) {
      const productIndex = blogData.products.findIndex(product => product === firstProductOfCategory)
      console.log('Product index:', productIndex)

      if (productIndex !== -1) {
        setCurrentIndex(productIndex)
        setHighlightedCategory(category)

        // Set active category index for centering
        const categoryIndex = categories.findIndex(cat => cat === category)
        setActiveCategoryIndex(categoryIndex)
        console.log('Updated currentIndex to:', productIndex, 'categoryIndex:', categoryIndex)
      }
    }
  }, [blogData.products, categories])

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
            className="mb-[80px] mx-auto overflow-hidden"
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: 'fit-content', maxWidth: '100%' }}
          >
            <div className="rounded-[50px] bg-black py-[12px] px-[16px] overflow-hidden">
              <motion.div
                className="flex gap-3"
                animate={{
                  x: categories.length <= 3 ? 0 :
                     -Math.max(0, Math.min(activeCategoryIndex - 1, categories.length - 3)) * 140
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  width: categories.length > 3 ? `${categories.length * 140}px` : 'auto'
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-[28px] py-[13px] rounded-[50px] flex items-center justify-center text-black no-underline font-helvetica text-[16px] leading-[24px] tracking-[0] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      highlightedCategory === category
                        ? 'bg-white text-gray-900 shadow-sm transform scale-105'
                        : 'text-white hover:text-gray-300 hover:scale-102'
                    }`}
                    style={{ minWidth: '120px' }}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
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
              left: -((blogData.products.length - 3) * 493),
              right: 0
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={{
              x: currentIndex <= 1 ? 0 :
                 currentIndex >= blogData.products.length - 2 ? -((blogData.products.length - 3) * 493) :
                 -((currentIndex - 1) * 493)
            }}
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
      className="group bg-white font-helvetica w-[32%] flex-shrink-0 h-[500px]"
    >
      {/* Image */}
      <div className="relative rounded-2xl h-[400px] w-full">
        <img
          src={product.image.asset.url}
          alt={product.image.alt || product.title}
          className="w-full h-full object-cover rounded-2xl"
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
