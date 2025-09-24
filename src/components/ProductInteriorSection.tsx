'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProductInteriorSectionProps {
  interiorSection: {
    name?: string
    description?: string
    sections?: Array<{
      name?: string
      title?: string
      contentType?: 'video' | 'image'
      videoFile?: {
        asset: {
          url: string
        }
      }
      image?: {
        asset: {
          url: string
        }
        alt?: string
      }
    }>
  }
}

// Animation variants
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

const ProductInteriorSection: React.FC<ProductInteriorSectionProps> = ({ interiorSection }) => {

  if (!interiorSection.sections || interiorSection.sections.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white text-black overflow-hidden" style={{ contain: 'layout style' }}>
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
              <h1 className="text-[64px] not-italic tracking-normal leading-[70px] font-bold font-helvetica text-black mb-0">
                {interiorSection.name || 'Interior'}
              </h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-center justify-end"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-[16px] leading-[25px] tracking-[0] m-0 font-medium font-helvetica max-w-[480px] text-black">
                {interiorSection.description || 'Experience the ultimate in luxury and technology.'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Interior Slider - Extending Full Width */}
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
              dragConstraints={{
                left: -((interiorSection.sections.length - 2.5) * 400),
                right: 0
              }}
              whileHover={{ x: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileDrag={{ cursor: "grabbing" }}
              style={{ width: 'max-content' }}
            >
              {interiorSection.sections.map((section, index) => (
                <motion.div
                  key={`${section.name}-${index}`}
                  className="w-[550px] flex-shrink-0"
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
                  <InteriorCard section={section} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}

// Separate InteriorCard component for better performance
const InteriorCard: React.FC<{
  section: {
    name?: string
    title?: string
    contentType?: 'video' | 'image'
    videoFile?: {
      asset: {
        url: string
      }
    }
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
  }
  index: number
}> = React.memo(({ section, index }) => {

  const hasContent = () => {
    return (section.contentType === 'image' && section.image?.asset?.url) ||
           (section.contentType === 'video' && section.videoFile?.asset?.url)
  }

  const getContentUrl = () => {
    if (section.contentType === 'image' && section.image?.asset?.url) {
      return section.image.asset.url
    }
    if (section.contentType === 'video' && section.videoFile?.asset?.url) {
      return section.videoFile.asset.url
    }
    return '/placeholder-interior.jpg' // Fallback placeholder
  }

  const contentUrl = getContentUrl()

  if (!hasContent()) {
    // Show placeholder card for sections without media content
    return (
      <motion.div
        variants={cardVariants}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="group transition-all duration-300"
      >
        {/* Placeholder Media Content */}
        <div className="relative aspect-[1/0.85] overflow-hidden rounded-[20px] bg-gray-800 flex items-center justify-center" style={{ contain: 'layout style paint' }}>
          <div className="text-white/40 text-center">
            <div className="text-4xl mb-2">{section.contentType === 'video' ? '🎥' : '🖼️'}</div>
            <div className="text-sm">Content Coming Soon</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="pt-6 pr-[5%]">
          <div className="mb-[48px]">
            <h3 className="text-black font-medium text-[24px] leading-[110%] tracking-[-0.24px] mb-2 font-helvetica">
              {section.name || 'Interior Feature'}
            </h3>

            <p className="text-[16px] leading-[21px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
              {section.title || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices nulla vitae faucibus rutrum. Quisque viverra, massa.'}
            </p>
          </div>

          {/* Learn More Button */}
          <motion.button
            className="px-[24px] py-[5px] rounded-[50px] border-1 border-black text-black no-underline font-helvetica text-[14px] leading-[24px] tracking-[0] font-medium transition ease-[0.4s] w-fit block cursor-pointer mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span>Learn More</span>
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group transition-all duration-300"
    >
      {/* Media Content */}
      <div className="relative aspect-[1/0.85] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
        {section.contentType === 'video' && section.videoFile?.asset?.url ? (
          <video
            src={section.videoFile.asset.url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
            autoPlay
            muted
            loop
            playsInline
            style={{ contain: 'layout style paint' }}
          />
        ) : (
          <Image
            src={contentUrl}
            alt={section.image?.alt || section.name || 'Interior feature'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw="
            style={{ contain: 'layout style paint' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="w-2 h-2 bg-white/60 rounded-full" />
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-6 pr-[5%]">
        <div className="mb-[48px]">
          <h3 className="text-black font-medium text-[24px] leading-[110%] tracking-[-0.24px] mb-2 font-helvetica">
            {section.name || 'Interior Feature'}
          </h3>

          <p className="text-[16px] leading-[21px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
            {section.title || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices nulla vitae faucibus rutrum. Quisque viverra, massa.'}
          </p>
        </div>

        {/* Learn More Button */}
        <motion.button
          className="px-[24px] py-[5px] rounded-[50px] border-1 border-black text-black no-underline font-helvetica text-[14px] leading-[24px] tracking-[0] font-medium transition ease-[0.4s] w-fit block cursor-pointer mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <span>Learn More</span>
        </motion.button>
      </div>
    </motion.div>
  )
})

InteriorCard.displayName = 'InteriorCard'

export default ProductInteriorSection