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
      videoFile?: { asset: { url: string } }
      image?: { asset: { url: string }; alt?: string }
    }>
  }
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

const ProductInteriorSection: React.FC<ProductInteriorSectionProps> = ({ interiorSection }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const constraintsRef = useRef(null)

  if (!interiorSection.sections || interiorSection.sections.length === 0) return null

  const totalSections = interiorSection.sections.length
  const cardWidth = 1000 + 20
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
      if (event.key === 'ArrowLeft') slideLeft()
      else if (event.key === 'ArrowRight') slideRight()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, totalSections])

  // Mobile scroll handler (to update dot state)
  const handleScroll = () => {
    if (!sliderRef.current) return
    const scrollLeft = sliderRef.current.scrollLeft
    const width = sliderRef.current.clientWidth
    const index = Math.round(scrollLeft / width)
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 lg:py-24 bg-[#F4F1F2] text-black overflow-hidden relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-[63px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap6 lg:gap-16">
            <motion.div variants={itemVariants}>
              <h1 className="text-black text-[30px] font-medium leading-[110%] tracking-[-0.6px] font-helvetica text-center md:text-[64px] md:tracking-[-1.28px] m-0">
                {interiorSection.name}
              </h1>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-end"
            >
              <p className="text-black text-center lg:text-right font-helvetica font-medium text-[16px] leading-[160%] max-w-[480px]">
                {interiorSection.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:block relative">
        <div className="md:pl-6 lg:pl-[calc((100vw-1280px)/2+1.5rem)]">
          <div className="relative overflow-visible" ref={constraintsRef}>
            <motion.div
              className="flex gap-5 cursor-grab active:cursor-grabbing md:w-fit"
              drag="x"
              dragConstraints={{ left: maxScroll, right: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              animate={{ x: dragX }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{ width: 'max-content' }}
            >
              {interiorSection.sections.map((section, index) => (
                <motion.div
                  key={`${section.name}-${index}`}
                  className="md:w-[1000px] w-full flex-shrink-0"
                >
                  <InteriorCard section={section} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Swipe (one by one) */}
      <div className="md:hidden relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-5 scrollbar-hide"
        >
          {interiorSection.sections.map((section, index) => (
            <div key={index} className="snap-center flex-shrink-0 w-full px-5">
              <InteriorCard section={section} index={index} />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {interiorSection.sections.map((_, i) => (
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
                i === currentIndex ? 'bg-black' : 'bg-black/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const InteriorCard: React.FC<{
  section: {
    name?: string
    title?: string
    contentType?: 'video' | 'image'
    videoFile?: { asset: { url: string } }
    image?: { asset: { url: string }; alt?: string }
  }
  index: number
}> = React.memo(({ section }) => {
  const isVideo = section.contentType === 'video' && section.videoFile?.asset?.url
  const isImage = section.contentType === 'image' && section.image?.asset?.url
  const contentUrl =
    (isVideo && section.videoFile?.asset.url) ||
    (isImage && section.image?.asset.url) ||
    '/placeholder-interior.jpg'

  return (
    <motion.div
      variants={cardVariants}
      className="group transition-all duration-300"
    >
      <div className="relative aspect-[1/0.55] overflow-hidden rounded-[20px]">
        {isVideo ? (
          <video
            src={contentUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-[20px]"
          />
        ) : (
          <Image
            src={contentUrl}
            alt={section.image?.alt || section.name || 'Interior feature'}
            fill
            className="object-cover rounded-[20px]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
      </div>

      <div className="pt-6 text-center md:text-left">
        <h3 className="text-[#111] font-medium text-[24px] capitalize font-helvetica mb-[4px]">
          {section.name || 'Interior Feature'}
        </h3>
        <p className="text-[16px] font-normal font-helvetica text-black opacity-60">
          {section.title || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>
      </div>
    </motion.div>
  )
})

InteriorCard.displayName = 'InteriorCard'

export default ProductInteriorSection
