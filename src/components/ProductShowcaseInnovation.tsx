'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, PanInfo } from 'framer-motion'

interface BlogItem {
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
  slug: { current: string }
}

interface ProductShowcaseInnovationProps {
  showcaseInnovation: {
    main: { title: string; description: string }
    blogSection: BlogItem[]
  }
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

const ProductShowcaseInnovation: React.FC<ProductShowcaseInnovationProps> = ({
  showcaseInnovation
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const cardsPerView = 3
  const totalSlides = Math.ceil(showcaseInnovation.blogSection.length / cardsPerView)

  // detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleScroll = () => {
    if (!sliderRef.current) return
    const scrollLeft = sliderRef.current.scrollLeft
    const width = sliderRef.current.clientWidth
    const index = Math.round(scrollLeft / width)
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 lg:py-24 bg-[#560100] text-white overflow-hidden">
      {/* Top Section */}
      <div className="max-w-[1332px] mx-auto px-6 mb-16 lg:mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:gap-[117px] gap-[27px] md:items-start mb-[70px] text-center md:text-left"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex-shrink-0 w-full md:w-auto">
              <h1 className="text-white font-helvetica font-medium text-[30px] leading-[40px] md:text-[60px] md:leading-[70px]">
                {showcaseInnovation.main.title}
              </h1>
            </div>

            <div className="flex flex-col gap-3 max-w-[450px] md:ml-auto w-full">
              <p className="text-[16px] md:leading-[30px] font-medium font-helvetica text-white/63">
                {showcaseInnovation.main.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop - Framer Motion drag */}
      {!isMobile && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <div className="pl-6 lg:pl-[calc((100vw-1280px)/2+1.5rem)]">
            <div className="relative overflow-visible">
              <motion.div
                className="flex gap-6 cursor-grab active:cursor-grabbing pr-12 md:w-fit"
                drag="x"
                dragConstraints={{
                  left: -((showcaseInnovation.blogSection.length - 2.5) * 420),
                  right: 0
                }}
                onDragEnd={handleDragEnd}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ width: 'max-content' }}
              >
                {showcaseInnovation.blogSection.map((blog, index) => (
                  <motion.div
                    key={`${blog.slug.current}-${index}`}
                    className="md:w-[455px] w-full flex-shrink-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <BlogCard blog={blog} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile - Swipe one by one */}
      {isMobile && (
        <div className="relative w-full overflow-hidden">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-6 scrollbar-hide"
          >
            {showcaseInnovation.blogSection.map((blog, index) => (
              <div key={index} className="snap-center flex-shrink-0 w-full">
                <BlogCard blog={blog} index={index} />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {showcaseInnovation.blogSection.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({
                      left: i * sliderRef.current.clientWidth,
                      behavior: 'smooth'
                    })
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// BlogCard component
const BlogCard: React.FC<{ blog: BlogItem; index: number }> = React.memo(({ blog, index }) => (
  <motion.div
    variants={itemVariants}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="md:pt-[60px] py-[50px] md:pr-[60px] px-[45px] md:pb-[30px] md:pl-[60px] rounded-[30px] bg-[rgba(255,255,255,0.05)] flex flex-col justify-between h-full w-full duration-300"
  >
    <div className="flex flex-col flex-1 mb-[30px]">
      <h3 className="text-white font-helvetica text-[26px] font-normal leading-[35px] md:leading-[49px] mb-[12px]">
        {blog.title}
      </h3>
      <p className="text-white/63 font-helvetica text-[16px] leading-[24px] flex-1">{blog.description}</p>
    </div>

    <motion.button
      className="relative overflow-hidden cursor-pointer px-[24px] py-[5px] rounded-[50px] border  border-white text-white font-helvetica text-[14px] leading-[24px] font-medium w-fit block mt-auto group transition-colors duration-500 hover:border-[#560100]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => (window.location.href = blog.buttonLink || `/blog/${blog.slug.current}`)}
    >
      <span className="absolute inset-0 bg-[#560100] translate-x-full transition-transform duration-500 rounded-[50px] group-hover:translate-x-0" />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        {blog.buttonText || 'Learn More'}
      </span>
    </motion.button>
  </motion.div>
))

BlogCard.displayName = 'BlogCard'

export default ProductShowcaseInnovation
