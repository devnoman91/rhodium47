'use client'

import React, { useState, useRef, useEffect } from 'react'
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const constraintsRef = useRef(null)

  if (!interiorSection.sections || interiorSection.sections.length === 0) {
    return null
  }

  const totalSections = interiorSection.sections.length
  const cardWidth = 1000 + 20 // card width + gap
  const maxScroll = -(totalSections - 1) * cardWidth

  const slideLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setDragX(-newIndex * cardWidth)
    }
  }

  const slideRight = () => {
    if (currentIndex < totalSections - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setDragX(-newIndex * cardWidth)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        slideLeft()
      } else if (event.key === 'ArrowRight') {
        slideRight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, totalSections])

  return (
    <section className="py-16 lg:py-24 bg-[#F4F1F2] text-black overflow-hidden" style={{ contain: 'layout style' }}>
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
              <h1 className="text-black font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                {interiorSection.name || 'Interior'}
              </h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-center justify-end"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-black font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px] ">
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
          <div className="relative overflow-visible" ref={constraintsRef}>
            <motion.div
              className="flex gap-5 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{
                left: maxScroll,
                right: 0
              }}
              dragElastic={0.1}
              dragMomentum={false}
              animate={{ x: dragX }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onDragEnd={(_, info) => {
                const offset = info.offset.x
                const velocity = info.velocity.x

                if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
                  if (offset > 0 && currentIndex > 0) {
                    slideLeft()
                  } else if (offset < 0 && currentIndex < totalSections - 1) {
                    slideRight()
                  }
                }
              }}
              style={{ width: 'max-content' }}
            >
              {interiorSection.sections.map((section, index) => (
                <motion.div
                  key={`${section.name}-${index}`}
                  className="w-[1000px] flex-shrink-0"
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
        <div className="relative aspect-[1/0.55] overflow-hidden rounded-[20px] bg-gray-800 flex items-center justify-center" style={{ contain: 'layout style paint' }}>
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
        <div className="pt-6 max-w-[420px]">
          <div className="mb-0">
            <h3 className="text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[4px]">
              {section.name || 'Interior Feature'}
            </h3>

            <p className="text-[16px] leading-[21px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
              {section.title || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices nulla vitae faucibus rutrum. Quisque viverra, massa.'}
            </p>
          </div>
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
      <div className="relative aspect-[1/0.55] overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
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
      <div className="pt-6 max-w-[420px]">
        <div className="mb-[48px]">
          <h3 className="text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[4px]">
            {section.name || 'Interior Feature'}
          </h3>

          <p className="text-[16px] leading-[20px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
            {section.title || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices nulla vitae faucibus rutrum. Quisque viverra, massa.'}
          </p>
        </div>
      </div>
    </motion.div>
  )
})

InteriorCard.displayName = 'InteriorCard'

export default ProductInteriorSection