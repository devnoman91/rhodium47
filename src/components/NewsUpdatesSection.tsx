'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { NewsUpdates, NewsItem } from '@/content/types'

interface NewsUpdatesSectionProps {
  data: NewsUpdates
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const NewsUpdatesSection: React.FC<NewsUpdatesSectionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Handle swipe scroll
  const handleScroll = () => {
    if (!sliderRef.current) return
    const scrollLeft = sliderRef.current.scrollLeft
    const cardWidth = 550 + 20 // card width + gap
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(index)
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
    sliderRef.current.style.cursor = 'grabbing'
    sliderRef.current.style.scrollBehavior = 'auto'
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab'
      sliderRef.current.style.scrollBehavior = 'smooth'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      if (sliderRef.current) {
        sliderRef.current.style.cursor = 'grab'
      }
    }
  }

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll)
    el.style.cursor = 'grab'
    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="py-16 lg:py-24 px-5 bg-[#560100] text-white overflow-hidden relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:mb-[63px] mb-[85px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div variants={itemVariants}>
              <h1 className="md:text-[64px] text-[30px] md:text-left text-center font-bold font-helvetica text-white">
                {data.name}
              </h1>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="hidden md:flex items-center justify-end"
            >
              <p className="text-[16px] leading-[25px] font-medium font-helvetica max-w-[480px]">
                {data.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* News Slider */}
      <div className="relative w-full">
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="md:pl-6 lg:pl-[calc((100vw-1280px)/2+1.5rem)]">
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {data.newsSection?.map((newsItem, index) => (
              <motion.div
                key={newsItem.slug.current}
                className="snap-center flex-shrink-0 w-full md:w-[550px]"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
              >
                <NewsCard newsItem={newsItem} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dot Navigation */}
        {data.newsSection && data.newsSection.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {data.newsSection.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (sliderRef.current) {
                    const cardWidth = 550 + 20 // card width + gap
                    sliderRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    })
                  }
                }}
                className="group cursor-pointer relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-white scale-110'
                      : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom fade overlay */}
      <div
        className="absolute w-full bottom-0 left-0 h-32 pointer-events-none md:block hidden"
        style={{
          background: 'linear-gradient(0deg, #111 0%, rgba(17, 17, 17, 0) 100%)'
        }}
      />
    </section>
  )
}

const NewsCard: React.FC<{ newsItem: NewsItem; index: number }> = React.memo(
  ({ newsItem, index }) => (
    <motion.div
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[1/0.85] overflow-hidden rounded-[20px] md:block hidden">
        <Image
          src={newsItem.image.asset.url}
          alt={newsItem.image.alt || newsItem.title}
          fill
          className="object-cover rounded-[20px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="pt-6 pr-[5%] w-full">
        <div className="mb-[48px]">
          <h3 className="text-white font-medium text-[24px] leading-[110%] font-helvetica mb-2">
            {newsItem.title}
          </h3>
          <p className="text-[16px] leading-[21px] font-normal font-helvetica opacity-60">
            {newsItem.description}
          </p>
        </div>

        {/* Learn More Button */}
        <Link href={`/news/${newsItem.slug.current}`}>
          <motion.button
            className="relative overflow-hidden px-[24px] py-[5px] rounded-[50px]
                       border border-white text-white font-helvetica text-[14px] leading-[24px]
                       font-medium transition-colors duration-500 ease-in-out
                       w-fit block cursor-pointer mt-auto group group-hover:border-[#fff]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="absolute inset-0 bg-[#fff] translate-x-full
                         transition-transform duration-500 ease-in-out rounded-[50px]
                         group-hover:translate-x-0"
            />
            <span className="relative z-10 group-hover:text-black transition-all duration-500 ease-in-out ">
              Learn More
            </span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
)

NewsCard.displayName = 'NewsCard'
export default NewsUpdatesSection
