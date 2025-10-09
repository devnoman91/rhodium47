'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { AboutUs } from '@/content/types'
import { getAboutUs } from '@/content/queries'

// Hero Section Component
const HeroSection: React.FC<{ sectionLabel: string; mainHeading: string }> = ({
  sectionLabel,
  mainHeading,
}) => {
  return (
    <section className="relative pt-[120px] pb-[60px] lg:pt-[160px] lg:pb-[80px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[14px] lg:text-[16px] font-medium text-gray-600 mb-[16px] uppercase tracking-wider">
            {sectionLabel}
          </p>
          <h1 className="text-[32px] lg:text-[56px] xl:text-[64px] font-bold leading-tight text-black max-w-[1000px] mx-auto">
            {mainHeading}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

// Forever Starts Now Slider Section
const ForeverStartsNowSection: React.FC<{
  mainName: string
  mainTitle: string
  slides: Array<{
    image: { asset: { url: string }; alt?: string }
    name: string
    description: string
    bulletPoints?: string[]
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
    <section className="py-6 lg:py-[80px] bg-white">
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
                  <circle cx="51" cy="51" r="40" stroke="#161618" strokeWidth="22" strokeDasharray="2 4"/>
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
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 cursor-pointer md:right-4 top-auto bottom-[10px] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                  {slides[currentSlide].bulletPoints && slides[currentSlide].bulletPoints!.length > 0 && (
                    <ul className="space-y-[12px] mb-[24px]">
                      {slides[currentSlide].bulletPoints!.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-[12px]">
                          <span className="w-[6px] h-[6px] bg-black rounded-full mt-[8px] flex-shrink-0" />
                          <span className="text-[16px] text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <motion.button
                    className="inline-flex cursor-pointer items-center text-[#161618] font-helvetica text-[20px] gap-3 not-italic font-medium leading-[24px] tracking-[-0.4px]"
                    whileHover={{ x: 5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                      <path d="M21.5536 10.9272L13.6786 18.8022C13.432 19.0488 13.0976 19.1873 12.7489 19.1873C12.4002 19.1873 12.0658 19.0488 11.8192 18.8022C11.5727 18.5556 11.4341 18.2212 11.4341 17.8725C11.4341 17.5238 11.5727 17.1894 11.8192 16.9428L17.4531 11.3111H1.375C1.0269 11.3111 0.693064 11.1728 0.446922 10.9267C0.200781 10.6805 0.0625 10.3467 0.0625 9.99861C0.0625 9.65051 0.200781 9.31667 0.446922 9.07053C0.693064 8.82438 1.0269 8.68611 1.375 8.68611H17.4531L11.8214 3.0511C11.5748 2.80454 11.4363 2.47012 11.4363 2.12142C11.4363 1.77272 11.5748 1.4383 11.8214 1.19173C12.068 0.945161 12.4024 0.806641 12.7511 0.806641C13.0998 0.806641 13.4342 0.945161 13.6808 1.19173L21.5558 9.06673C21.6782 9.18883 21.7752 9.3339 21.8414 9.49362C21.9075 9.65333 21.9415 9.82454 21.9413 9.99742C21.9411 10.1703 21.9067 10.3414 21.8402 10.501C21.7737 10.6605 21.6763 10.8054 21.5536 10.9272Z" fill="black" />
                    </svg>
                    <span>Learn more</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Forever Section with Cards
const ForeverSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    title: string
    image: { asset: { url: string }; alt?: string }
    description: string
  }>
}> = ({ title, description, cards }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <section className="pt-[50px] pb-[50px] lg:pb-[90px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[48px]"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-black mb-[16px]">{title}</h2>
          <p className="text-[16px] lg:text-[18px] text-gray-700 max-w-[800px] mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Slider for mobile, grid for desktop */}
        <div className="lg:hidden">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[24px] border-2 border-black p-[24px]"
            >
              <div className="relative h-[200px] rounded-[16px] overflow-hidden mb-[16px]">
                <Image
                  src={cards[currentIndex].image.asset.url}
                  alt={cards[currentIndex].image.alt || cards[currentIndex].title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-bold text-black mb-[12px]">
                {cards[currentIndex].title}
              </h3>
              <p className="text-[14px] text-gray-700">{cards[currentIndex].description}</p>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-[16px] mt-[24px]">
              <button
                onClick={prevCard}
                className="w-[40px] h-[40px] rounded-full bg-black text-white flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={nextCard}
                className="w-[40px] h-[40px] rounded-full bg-black text-white flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Grid for desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-[24px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-[24px] border-2 border-black p-[24px] hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[200px] rounded-[16px] overflow-hidden mb-[16px]">
                <Image
                  src={card.image.asset.url}
                  alt={card.image.alt || card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-bold text-black mb-[12px]">{card.title}</h3>
              <p className="text-[14px] text-gray-700">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Core Values Section
const CoreValuesSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    title: string
    image: { asset: { url: string }; alt?: string }
    description: string
  }>
}> = ({ title, description, cards }) => {
  return (
    <section className="pt-[50px] pb-[50px] lg:pb-[90px] bg-[#F4F1F2]">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[48px]"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-black mb-[16px]">{title}</h2>
          <p className="text-[16px] lg:text-[18px] text-gray-700 max-w-[800px] mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-[24px] p-[32px] border-2 border-black hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[80px] w-[80px] rounded-full overflow-hidden mb-[24px] mx-auto">
                <Image
                  src={card.image.asset.url}
                  alt={card.image.alt || card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-bold text-black mb-[12px] text-center">
                {card.title}
              </h3>
              <p className="text-[14px] text-gray-700 text-center">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Leadership Team Section
const LeadershipTeamSection: React.FC<{
  title: string
  description: string
  cards: Array<{
    Name: string
    title: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ title, description, cards }) => {
  return (
    <section className="pt-[50px] pb-[50px] lg:pb-[90px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[48px]"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-black mb-[16px]">{title}</h2>
          <p className="text-[16px] lg:text-[18px] text-gray-700 max-w-[800px] mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden border-2 border-black hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[300px] w-full">
                <Image
                  src={card.image.asset.url}
                  alt={card.image.alt || card.Name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-[24px]">
                <h3 className="text-[22px] font-bold text-black mb-[8px]">{card.Name}</h3>
                <p className="text-[16px] font-semibold text-gray-600 mb-[12px]">{card.title}</p>
                <p className="text-[14px] text-gray-700">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// By The Numbers Section with Word Animation
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
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[48px]"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-black mb-[24px]">{title}</h2>
          <div className="text-[16px] lg:text-[20px] leading-relaxed max-w-[900px] mx-auto">
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
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              )
            })}
          </div>
        </motion.div>

        {/* Count Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] lg:gap-[48px] mt-[48px]">
          {countSection.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-[36px] lg:text-[56px] font-bold text-black mb-[8px]">
                {item.value}
              </p>
              <p className="text-[14px] lg:text-[16px] text-gray-700">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Call to Action Section
const CallToActionSection: React.FC<{
  title: string
  description: string
  buttonText: string
  buttonLink: string
}> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="pt-[50px] pb-[50px] lg:pb-[90px] bg-black">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-white mb-[16px]">{title}</h2>
          <p className="text-[16px] lg:text-[18px] text-gray-300 max-w-[800px] mx-auto mb-[32px]">
            {description}
          </p>
          <Link
            href={buttonLink}
            className="inline-block bg-white text-black px-[32px] py-[16px] rounded-full text-[16px] font-semibold hover:bg-gray-200 transition-colors"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function AboutUsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AboutUs | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const aboutUsData = await getAboutUs()
        console.log('About Us data:', aboutUsData)
        setData(aboutUsData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching About Us:', err)
        setError('Failed to load About Us page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-gray-600">Loading About Us...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-red-600">{error || 'No About Us data found'}</p>
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

      {/* Forever Starts Now Section */}
      {data.foreverStartsNowSection && (
        <ForeverStartsNowSection
          mainName={data.foreverStartsNowSection.mainName}
          mainTitle={data.foreverStartsNowSection.mainTitle}
          slides={data.foreverStartsNowSection.slides}
        />
      )}

      {/* Forever Section Slider */}
      {data.ForeversSection && (
        <ForeverSection
          title={data.ForeversSection.title}
          description={data.ForeversSection.description}
          cards={data.ForeversSection.cards}
        />
      )}

      {/* Core Values Section */}
      {data.coreValuesSection && (
        <CoreValuesSection
          title={data.coreValuesSection.title}
          description={data.coreValuesSection.description}
          cards={data.coreValuesSection.cards}
        />
      )}

      {/* Leadership Team Section */}
      {data.leadershipTeamSection && (
        <LeadershipTeamSection
          title={data.leadershipTeamSection.title}
          description={data.leadershipTeamSection.description}
          cards={data.leadershipTeamSection.cards}
        />
      )}

      {/* By The Numbers Section */}
      {data.internByheNumbersSection && (
        <ByTheNumbersSection
          title={data.internByheNumbersSection.title}
          description={data.internByheNumbersSection.description}
          countSection={data.internByheNumbersSection.countSection}
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
