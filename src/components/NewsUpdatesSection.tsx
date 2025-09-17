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
    <section className="py-16 lg:py-24 bg-gray-900 text-white" style={{ contain: 'layout style' }}>
      <div className="max-w-7xl mx-auto px-6" style={{ contain: 'layout style' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">
            {/* Left - Title */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {data.name}
              </h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-center"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                {data.description}
              </p>
            </motion.div>
          </div>

          {/* News Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {data.newsSection && data.newsSection.map((newsItem, index) => (
              <NewsCard key={newsItem.slug.current} newsItem={newsItem} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
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
      className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ contain: 'layout style paint' }}>
        <Image
          src={newsItem.image.asset.url}
          alt={newsItem.image.alt || newsItem.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw="
          style={{ contain: 'layout style paint' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h3 className="text-xl lg:text-2xl font-bold mb-4 group-hover:text-gray-100 transition-colors duration-200 leading-tight">
            {newsItem.title}
          </h3>

          <p className="text-gray-300 leading-relaxed text-sm lg:text-base line-clamp-3">
            {newsItem.description}
          </p>
        </div>

        {/* Learn More Button */}
        <motion.button
          className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-gray-400 text-gray-300 rounded-full font-medium hover:border-white hover:text-white transition-all duration-300 group/button"
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
          <motion.svg
            className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </motion.button>
      </div>
    </motion.div>
  )
})

NewsCard.displayName = 'NewsCard'

export default NewsUpdatesSection