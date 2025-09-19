'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { NewsUpdates, NewsItem } from '@/content/types'

interface NewsUpdatesSectionProps {
  data: NewsUpdates
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const NewsUpdatesSection: React.FC<NewsUpdatesSectionProps> = ({ data }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#111] text-white overflow-hidden" style={{ contain: 'layout style' }}>
      {/* Header Section - Constrained */}
      <div className="max-w-7xl mx-auto px-6 mb-[63px]" style={{ contain: 'layout style' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Title */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h1 className="text-[60px] not-italic tracking-normal leading-[1.1] font-medium  font-helvetica text-white mb-0">
                {data.name}
              </h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-center"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica">
                {data.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* News Slider - Extending Full Width */}
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
              className="flex gap-5 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -((data.newsSection?.length || 0 - 2.5) * 400), right: 0 }}
              whileHover={{ x: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileDrag={{ cursor: "grabbing" }}
              style={{ width: 'max-content' }}
            >
              {data.newsSection && data.newsSection.map((newsItem, index) => (
                <motion.div
                  key={newsItem.slug.current}
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
                  <NewsCard newsItem={newsItem} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Separate NewsCard component for better performance
const NewsCard: React.FC<{ newsItem: NewsItem; index: number }> = React.memo(({ newsItem, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group  transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
        <Image
          src={newsItem.image.asset.url}
          alt={newsItem.image.alt || newsItem.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw="
          style={{ contain: 'layout style paint' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
      </div>

      {/* Content */}
      <div className="pt-6 pr-[5%]">
        <div className="mb-[48px]">
          <h3 className="text-white font-medium text-[24px] leading-[110%] tracking-[-0.24px] mb-2 font-helvetica">
            {newsItem.title}
          </h3>

          <p className="text-[16px] leading-[130%] tracking-[0] m-0 font-light font-helvetica opacity-60">
            {newsItem.description}
          </p>
        </div>

        {/* Learn More Button */}
        <motion.button
          className="px-6 py-2 rounded-[50px] border-1 flex items-center gap-4 border-[#fff]  text-white no-underline font-helvetica text-[16px] leading-[24px] tracking-[0] font-normal transition ease-[0.4s] w-fit block cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            // Handle navigation to news post
            if (newsItem.slug.current) {
              window.location.href = `/news/${newsItem.slug.current}`
            }
          }}
        >
          <span>Learn More</span>
        </motion.button>
      </div>
    </motion.div>
  )
})

NewsCard.displayName = 'NewsCard'

export default NewsUpdatesSection