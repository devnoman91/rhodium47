'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { TexasFacility } from '@/content/types'
import { getTexasFacility } from '@/content/queries'

// Hero Section Component
const HeroSection: React.FC<{ sectionLabel: string; mainHeading: string }> = ({
  sectionLabel,
  mainHeading,
}) => {
  return (
    <section className="relative pb-[106px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-[64px] pt-30 font-medium leading-[110%] tracking-[-1.28px] text-black max-w-[1200px] mx-auto mb-6 font-helvetica">
             {sectionLabel}
          </h1>
          <p className="text-[24px] font-medium text-[#111] leading-[150%] capitalize max-w-[855px] mx-auto mb-[14px] font-helvetica">
           {mainHeading}
          </p>

        </motion.div>
      </div>
    </section>
  )
}

// Manufacturing Excellence Section
const ManufacturingExcellenceSection: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = React.useMemo(() => description.split(' '), [description])

  return (
    <section className="py-12 md:pb-[90px] md:pt-[106px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Left - Sunburst Icon */}
            <motion.div
              className="w-full max-w-[400px] hidden lg:flex lg:justify-start justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 flex items-center justify-center">
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 102 102"
                >
                <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="51" cy="51" r="40" stroke="#161618" strokeWidth="22" strokeDasharray="2 4"/>
                  </svg>
                </motion.svg>

                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div className="text-lg md:text-2xl lg:text-3xl text-gray-900" style={{ transform: 'rotate(0deg)' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-0 pt-3 border-t border-black max-w-[773px]"
            >
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-[27px] font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span>{title}</span>
              </div>

              <div className="space-y-6">
                <p
                  ref={descriptionRef}
                  className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-0.8px] m-0 font-medium font-helvetica flex flex-wrap"
                >
                  {words.map((word, i) => {
                    const start = i / words.length
                    const end = (i + 1) / words.length
                    const color = useTransform(scrollYProgress, [start, end], ['#7F7F7F', '#161618'])
                    const opacity = useTransform(scrollYProgress, [start, end], [0.6, 1])
                    return (
                      <motion.span key={i} style={{ color, opacity }} className="mr-2">
                        {word}
                      </motion.span>
                    )
                  })}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Info Sections Component
const InfoSections: React.FC<{
  sections: Array<{
    name: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ sections }) => {
  return (
    <section className="bg-[#F4F1F2] pb-[49px]">
      <div className="max-w-[1304px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`${
                index === 1 ? 'max-w-[463px]' : 'max-w-[392px]'
              } w-full overflow-hidden`}
            >
              <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden">
                {section.image?.asset?.url && (
                  <img
                    src={section.image.asset.url}
                    alt={section.image.alt || section.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
              <div className="pt-[31px]">
                <h3 className="text-[#111] text-center font-medium text-[16px] leading-[150%] capitalize mb-[8px]">
                  {section.name}
                </h3>
                <p className="text-[#3F3E4B] text-center text-[16px] font-normal leading-[20px]">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// Slider Section Component
const SliderSection: React.FC<{
  mainName: string
  mainTitle: string
  slides: Array<{
    name: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ mainName, mainTitle, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })

  const words = mainTitle.split(' ')

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-[80px] bg-[#F4F1F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section - with word animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="mb-20 lg:mb-[70px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20">
            {/* Left Logo + Progress */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex lg:col-span-2 xl:col-span-2 flex-col justify-between items-center lg:items-start"
            >
              {/* Sunburst Logo */}
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 mx-auto flex items-center justify-center">
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 102 102"
                >
               <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="51" cy="51" r="40" stroke="#161618" strokeWidth="22" strokeDasharray="2 4"/>
                  </svg>
                </motion.svg>

                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div className="text-lg md:text-2xl lg:text-3xl text-gray-900" style={{ transform: 'rotate(0deg)' }}>
                     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                  </svg>

                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-60 lg:w-80 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${(currentSlide + 1) * (100 / slides.length)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentSlide + 1) * (100 / slides.length)}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>

            {/* Heading + Description with word animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-1 md:ml-50 lg:ml-50 xl:ml-50 lg:col-span-10 xl:col-span-10"
            >
              <motion.div
                className="h-[1px] w-full bg-[#777] rounded-full mb-3"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
              <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-[#161618] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] uppercase">
                  {mainName}
                </span>
              </div>

              {/* Animated word-by-word description */}
              <p
                ref={descriptionRef}
                className="text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[40px] leading-[120%] font-helvetica font-[500] max-w-[56ch] flex flex-wrap"
              >
                {words.map((word, i) => {
                  const start = i / words.length
                  const end = (i + 1) / words.length
                  const color = useTransform(scrollYProgress, [start, end], ['#7F7F7F', '#161618'])
                  const opacity = useTransform(scrollYProgress, [start, end], [0.6, 1])
                  return (
                    <motion.span key={i} style={{ color, opacity }} className="mr-2">
                      {word}
                    </motion.span>
                  )
                })}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section - Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-start"
        >
          <div className="lg:col-span-12">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 xl:gap-16">
              {/* Image */}
              <div className="w-full lg:w-[60%]">
                <div className="relative aspect-[16/9] lg:aspect-auto h-full rounded-2xl overflow-hidden bg-gray-100">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].image.asset.url}
                    alt={slides[currentSlide].image.alt || slides[currentSlide].name}
                    className="w-full h-full object-cover aspect-[1/0.54]"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 cursor-pointer md:left-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Previous slide"
                  >
                      <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="51" cy="51" r="40" stroke="#161618" strokeWidth="22" strokeDasharray="2 4"/>
                  </svg>

                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 cursor-pointer md:right-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Next slide"
                  >
                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                  </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full lg:w-[40%] flex items-center">
                <motion.div
                  key={`info-${currentSlide}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full"
                >
                  <h3 className="text-[#161618] font-medium text-[24px] leading-[120%] tracking-[-0.48px] font-helvetica mb-[24px]">
                    {slides[currentSlide].name}
                  </h3>
                  <p className="text-[#7F7F7F] font-helvetica text-[20px] not-italic font-normal leading-[24px] tracking-[-0.4px] mb-[24px]">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Design Process Section
const DesignProcessSection: React.FC<{
  title: string
  description: string
  sections: Array<{
    title: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ title, description, sections }) => {
  return (
    <section className="pt-[50px] lg:pt-[94px] bg-[#F4F1F2] text-black" style={{ contain: 'layout style' }}>
      {/* Header Section */}
      <div className="max-w-[1304px] mx-auto mb-[62px]" style={{ contain: 'layout style' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  lg:gap-16">
            {/* Left - Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <h2 className="text-black font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica m-0">
                {title}
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-1 flex items-center justify-end"
            >
              <p className="text-black font-medium text-[16px] leading-[160%] font-helvetica max-w-[480px]">
                {description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Design Process Grid - 2 columns */}
      <div className="max-w-[1304px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-[42px]">
          {sections.map((section, index) => (
            <motion.div
              key={`${section.title}-${index}`}
              className="group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: (index % 2) * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              {/* Media Content */}
              <div className="h-[468px] w-full relative overflow-hidden rounded-[20px]" style={{ contain: 'layout style paint' }}>
                {section.image?.asset?.url && (
                  <Image
                    src={section.image.asset.url}
                    alt={section.image.alt || section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[20px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    loading="lazy"
                    style={{ contain: 'layout style paint' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" style={{ contain: 'layout style paint' }} />
              </div>

              {/* Content */}
              <div className="pt-[42px] max-w-[656px]">
                <div className="">
                  <h3 className="text-[#111] font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[9px]">
                    {section.title}
                  </h3>
                  <p className="text-[16px] leading-[20px] tracking-[0] m-0 font-normal font-helvetica text-black opacity-60">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// By The Numbers Section
const ByTheNumbersSection: React.FC<{
  title: string
  description: string
  countSection: Array<{ name: string; value: string }>
}> = ({ title, description, countSection }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const words = description.split(' ')

  return (
    <section ref={containerRef} className="pt-[50px] pb-[50px] lg:pb-[90px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[96px] max-w-[810px] m-auto"
        >
          <div className="pt-3 border-t border-black flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-[30px] font-helvetica items-center uppercase">
            <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
             <h2>{title}</h2>
          </div>

          <div className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-0.8px] m-0 font-medium font-helvetica flex flex-wrap max-w-[810px] mx-auto">
            {words.map((word, index) => {
              const start = index / words.length
              const end = start + 1 / words.length
              const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1])
              const color = useTransform(
                scrollYProgress,
                [start, end],
                ['rgb(156, 163, 175)', 'rgb(0, 0, 0)']
              )

              return (
                <motion.span
                  key={index}
                  style={{ opacity, color }}
                  className="inline-block mr-[0.2em]"
                >
                  {word}
                </motion.span>
              )
            })}
          </div>
        </motion.div>

        {/* Count Section */}
        <div className="max-[1280px] m-auto grid grid-cols-2 md:grid-cols-4 gap-[24px] lg:gap-[48px] mt-[48px]">
          {countSection.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="border-b  border-[#777777] text-[20px] tracking-[-0.8px] font-[400] text-[#16161880] font-helvetica mb-[24px] pb-[31px]">
                {item.value}
              </p>
              <p className="text-[20px] tracking-[-0.8px]  font-[500] text-[#7F7F7F] font-helvetica uppercase ">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
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

// Call to Action Section
const CallToActionSection: React.FC<{
  title: string
  description: string
  buttonText: string
  buttonLink: string
}> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="py-16 lg:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[71px]">
            <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-[24px]">
              <h1 className="pr-1 text-[62px] not-italic tracking-normal leading-[68px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                style={{
                  background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </h1>

              <div className="lg:col-span-1 space-y-8">
                <motion.a
                  href={buttonLink}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="relative overflow-hidden px-[24px] py-[8px] rounded-[50px]
                             border border-black bg-black text-white font-helvetica
                             text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    className="absolute inset-0 bg-white translate-x-full
                               transition-transform duration-500 ease-in-out rounded-[50px]
                               group-hover:translate-x-0"
                  />
                  <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                    {buttonText}
                  </span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="space-y-5 flex flex-col justify-end items-end">
                {description.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] max-w-[575px]"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function TexasFacilityPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TexasFacility | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const texasFacilityData = await getTexasFacility()
        console.log('Texas Facility data:', texasFacilityData)
        setData(texasFacilityData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Texas Facility:', err)
        setError('Failed to load Texas Facility page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-gray-600">Loading Texas Facility...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-red-600">{error || 'No Texas Facility data found'}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      {data.heroSection && (
        <HeroSection
          sectionLabel={data.heroSection.sectionLabel}
          mainHeading={data.heroSection.mainHeading}
        />
      )}

      {/* Manufacturing Excellence Section */}
      {data.manufacturingExcellence && (
        <ManufacturingExcellenceSection
          title={data.manufacturingExcellence.title}
          description={data.manufacturingExcellence.description}
        />
      )}

      {/* Info Sections */}
      {data.infoSections && data.infoSections.length > 0 && (
        <InfoSections sections={data.infoSections} />
      )}

      {/* Slider Section */}
      {data.sliderSection && (
        <SliderSection
          mainName={data.sliderSection.mainName}
          mainTitle={data.sliderSection.mainTitle}
          slides={data.sliderSection.slides}
        />
      )}

      {/* Design Process Section */}
      {data.designProcess && (
        <DesignProcessSection
          title={data.designProcess.title}
          description={data.designProcess.description}
          sections={data.designProcess.sections}
        />
      )}

      {/* By The Numbers Section */}
      {data.byTheNumbersSection && (
        <ByTheNumbersSection
          title={data.byTheNumbersSection.title}
          description={data.byTheNumbersSection.description}
          countSection={data.byTheNumbersSection.countSection}
        />
      )}

      {/* Call to Action */}
      {data.callToAction && (
        <CallToActionSection
          title={data.callToAction.title}
          description={data.callToAction.description}
          buttonText={data.callToAction.buttonText}
          buttonLink={data.callToAction.buttonLink}
        />
      )}
    </main>
  )
}