'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getCareers } from '@/content/queries'
import type { Careers } from '@/content/types'

const criticalInlineStyles = `
  .careers-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 138px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 69px;
  }

  /* Hero Section */
  .careers-hero {
    text-align: center;
    margin-bottom: 62px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .careers-hero-title {
    color: #000;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: -1.28px;
    margin-bottom:14px;
  }
  .careers-hero-description {
    color: #111;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    max-width: 855px;
    margin:auto;
  }

  /* Info Sections */
  .careers-container .info-sections {
    display:flex;
    gap: 30px;
    max-width: 1304px;
    margin: auto;
    margin-bottom: 0px;
  }
  .info-card {
    max-width: 392px;
    width: 100%;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .info-card:nth-child(2){
    max-width: 463px;
    width: 100%;
  }
  .info-card-image-wrapper {
    position: relative;
    width: 100%;
    height: 260px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
  }
  .info-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .info-card:hover .info-card-image {
    transform: scale(1.05);
  }
  .info-card-content {
    padding-top: 31px;
  }
  .info-card-name {
    color: #111;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    margin-bottom: 8px;
  }
  .info-card-description {
    color: #3F3E4B;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .info-sections {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .info-card:nth-child(2),
    .info-card {
      max-width: 100%;
    }
    .careers-container {
      padding-inline: 15px;
      padding-top: 100px;
      padding-bottom: 37px;
    }
    .careers-hero{
      margin-bottom:37px;
    }
    .careers-hero-title {
      font-size: 30px;
      margin-bottom:6px;
    }
    .careers-hero-description {
      font-size: 16px;
    }
    .info-sections {
      flex-direction: column;
      gap: 40px !important;
    }
  }
`

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

// Manufacturing Excellence Section Component (with word animation)
const ManufacturingExcellenceSection: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => description ? description.split(' ') : [], [description])

  return (
    <section className="pt-[37px] lg:pt-[108px] pb-[50px] lg:pb-[54px] bg-[#F4F1F2] lg:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black max-w-[810px] m-auto">
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
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

// Open Positions Section
const OpenPositionsSection: React.FC<{
  title: string
  description: string
  positions: Array<{
    name: string
    role: string
    location: string
    createdAt: string
    salary: string
    jobType: string
    slug: { current: string }
  }>
}> = ({ title, description, positions }) => {
  return (
    <section className="pt-[62px] pb-[50px] lg:pb-[90px] bg-[#111111] text-white overflow-hidden md:px-0 px-[15px]">
      {/* Top Section - Constrained */}
      <div className="max-w-7xl mx-auto md:px-6 md:mb-16 lg:mb-20 mb-[32px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="md:mb-[70px] mb-[65px] flex flex-col md:flex-row justify-between gap-4 md:gap-[182px]">
            <h1 className="md:text-[64px] text-[31px] md:text-left text-center not-italic tracking-normal md:leading-[70px] leading-[40px] font-medium font-helvetica">
              {title}
            </h1>
            <p className="text-[16px] md:text-left text-center leading-[24px] font-helvetica text-white max-w-[517px] md:ml-auto">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Position Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-[1440px] mx-auto md:px-[80px] px-[20px]"
      >
        <div className="space-y-[10px]">
          {positions.map((position, index) => (
            <motion.div
              key={`${position.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="bg-[#1d1d1d] rounded-[30px] px-[30px] md:px-[57px] py-[24px] lg:py-[32px] hover:shadow-xl transition-shadow"
            >
              <div className='flex justify-between items-center mb-[36px]'>
                <span className="flex p-2 flex-col font-[400] text-[14px] md:text-[16px] items-start gap-2 rounded-lg bg-white/10 text-white">10 min ago</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <mask id={`mask0_${index}`} style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white"/>
                  </mask>
                  <g mask={`url(#mask0_${index})`}>
                    <path d="M18.1875 0.937502H5.8125C4.77694 0.937502 3.9375 1.77521 3.9375 2.80856V22.2656L12 17.0156L20.0625 22.2406V2.80856C20.0625 1.77521 19.2231 0.937502 18.1875 0.937502Z" stroke="#6C757D" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                    <path d="M12 4.6875V13.125" stroke="#6C757D" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round"/>
                    <path d="M7.78125 8.90625H16.2188" stroke="#6C757D" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div className='flex gap-[20px] items-start mb-[32px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="flex-shrink-0">
                  <path d="M9.93596 30.451C13.0735 33.693 16.9335 36.1469 21.2005 37.6123C18.0779 39.6446 12.1682 37.7285 7.40693 32.9801C2.64564 28.2317 0.710159 22.322 2.74242 19.1865C4.21471 23.4579 6.68018 27.3186 9.93596 30.451Z" fill="url(#paint0_linear_579_1640)"/>
                  <path d="M32.4316 33.7731C32.146 34.3354 31.7737 34.8493 31.3284 35.2957C29.509 37.1151 26.6767 37.6248 23.4509 36.986L22.8058 36.8506C22.5929 36.7989 22.3864 36.7473 22.1606 36.6828C18.4445 35.6441 14.3413 33.1989 10.7348 29.586C7.12836 25.9731 4.68319 21.8764 3.63803 18.1602C3.57352 17.9473 3.51545 17.7409 3.46384 17.5151C3.41222 17.2893 3.36706 17.0893 3.32835 16.8699C2.68319 13.6441 3.19932 10.8118 5.01868 8.99249C5.46854 8.5465 5.98423 8.17225 6.54771 7.88281C6.25466 9.82387 6.38897 11.8055 6.94126 13.6893C7.14271 14.4563 7.39047 15.2103 7.68319 15.9473C7.76061 16.1473 7.85093 16.3538 7.9348 16.5538C8.01867 16.7538 8.11545 16.9731 8.21222 17.1989C9.76171 20.4532 11.8737 23.4083 14.4509 25.928C16.9581 28.4788 19.8928 30.5706 23.1219 32.1086L23.7671 32.386L24.3735 32.6376C25.1126 32.9246 25.8663 33.1723 26.6316 33.3796C27.9184 33.7335 29.2455 33.92 30.58 33.9344C31.2006 33.9329 31.82 33.8789 32.4316 33.7731Z" fill="url(#paint1_linear_579_1640)"/>
                  <path d="M37.8079 25.3025C37.8734 26.2971 37.7356 27.2946 37.4029 28.2341C37.0701 29.1736 36.5493 30.0355 35.8724 30.767C35.4267 31.2179 34.9102 31.5928 34.3434 31.8767C34.1239 31.9959 33.8952 32.0973 33.6595 32.1799C33.4384 32.2687 33.2122 32.3441 32.9821 32.4057C30.9814 32.866 28.8951 32.7948 26.9305 32.1993C25.9833 31.9452 25.056 31.6217 24.1563 31.2316L23.5111 30.9348C23.2788 30.8187 23.0401 30.709 22.8079 30.5864C17.2634 27.6571 12.7307 23.1244 9.80143 17.5799C9.67885 17.3477 9.56272 17.109 9.45304 16.8767C9.34337 16.6445 9.25305 16.438 9.16272 16.2316C8.77154 15.3337 8.44595 14.4087 8.18852 13.4638C7.59161 11.497 7.52264 9.40769 7.98853 7.40575C8.05304 7.17349 8.12402 6.94769 8.20789 6.72833C8.29186 6.50774 8.3888 6.29231 8.49821 6.08317C8.78859 5.50925 9.1674 4.98457 9.62078 4.52833C10.3332 3.86776 11.1705 3.35626 12.0834 3.02388C12.9964 2.6915 13.9665 2.54495 14.9369 2.59285H15.0724C14.9172 2.71369 14.7706 2.84519 14.6337 2.9864C13.777 3.8608 13.194 4.96619 12.9563 6.16704C12.9176 6.35414 12.8853 6.54769 12.853 6.74123C12.8208 6.93478 12.8079 7.12833 12.795 7.33478C12.4917 11.4187 14.8337 16.7606 19.2466 21.1735C23.4079 25.3348 28.395 27.6251 32.3756 27.6251C32.6143 27.6251 32.8466 27.6251 33.0788 27.6251C33.3111 27.6251 33.4853 27.6251 33.6853 27.5606C33.8871 27.5346 34.0874 27.498 34.2853 27.4509C34.5942 27.3863 34.8982 27.3001 35.195 27.1929C36.0358 26.8948 36.8002 26.4145 37.4337 25.7864C37.5694 25.6339 37.6945 25.4723 37.8079 25.3025Z" fill="url(#paint2_linear_579_1640)"/>
                  <defs>
                    <linearGradient id="paint0_linear_579_1640" x1="1.93597" y1="28.7994" x2="21.1682" y2="28.7994" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F08504"/>
                      <stop offset="1" stopColor="#E5322D"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_579_1640" x1="3.109" y1="22.5796" x2="32.4316" y2="22.5796" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E53282"/>
                      <stop offset="1" stopColor="#851D7B"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_579_1640" x1="7.64659" y1="17.6316" x2="37.8143" y2="17.6316" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3AB4E6"/>
                      <stop offset="1" stopColor="#004996"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className='flex-1'>
                  <h3 className="text-[18px] md:text-[20px] lg:text-[28px] font-[500] text-white mb-[12px] md:mb-[20px] leading-[1]">
                    {position.name}
                  </h3>
                  <p className='text-white leading-[1] font-helvetica text-[14px] md:text-[16px] not-italic font-normal'>{position.role}</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px]">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-[16px] md:gap-[24px] text-[14px] md:text-[16px] text-[#6C757D] uppercase">
                    <span className="flex items-center gap-[8px] md:gap-[12px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {position.location}
                    </span>
                    <span className="flex items-center gap-[8px] md:gap-[12px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {position.jobType}
                    </span>
                    <span className="flex items-center gap-[8px] md:gap-[12px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                        <mask id={`mask1_${index}`} style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <path d="M23 23V1H1V23H23Z" fill="white" stroke="white" strokeWidth="2" />
                        </mask>
                        <g mask={`url(#mask1_${index})`}>
                          <path d="M19.31 6.37V4.5c0-1.03-.84-1.87-1.87-1.87H2.81C1.77 2.63.93 3.46.93 4.5S1.77 6.37 2.81 6.37h18.38c1.03 0 1.87.84 1.87 1.87v2.81" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M23.06 16.69v2.81c0 1.03-.84 1.87-1.87 1.87H2.81c-1.04 0-1.88-.84-1.88-1.87V4.5" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M23.06 16.69h-4.69c-1.55 0-2.81-1.26-2.81-2.81s1.26-2.81 2.81-2.81h4.69v5.62Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                        </g>
                      </svg>
                      {position.salary}
                    </span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Link
                    href={`/careers/${position.slug.current}`}
                    className="relative overflow-hidden flex items-center justify-center gap-[12px] px-6 py-3 rounded-full
                              bg-white text-black font-helvetica font-medium text-[14px] md:text-[16px]
                              border border-transparent cursor-pointer group w-full md:w-auto mt-4 lg:mt-0"
                  >
                    <span
                      className="absolute inset-0 bg-black translate-x-full
                                transition-transform duration-500 ease-in-out rounded-full
                                group-hover:translate-x-0"
                    />
                    <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                      Apply Now
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// Benefits & Perks Section Component
const BenefitsPerksSection: React.FC<{
  title: string
  description: string
  benefits: Array<{
    title: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ title, description, benefits }) => {
  return (
    <section className="pt-[62px] pb-[50px] lg:pb-[90px] bg-[#F4F1F2] text-black overflow-hidden md:px-0 px-[15px]">
      {/* Top Section - Constrained */}
      <div className="max-w-7xl mx-auto md:px-6 md:mb-16 lg:mb-20 mb-[32px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="md:mb-[70px] mb-[65px] flex flex-col md:flex-row justify-between gap-4 md:gap-[182px]">
            <h1 className="md:text-[64px] text-[31px] md:text-left text-center not-italic tracking-normal md:leading-[70px] leading-[40px] font-medium font-helvetica">
              {title}
            </h1>
            <p className="text-[16px] md:text-left text-center leading-[24px] font-helvetica text-black max-w-[517px] md:ml-auto">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Cards Section - Desktop: Grid, Mobile: Column */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-[1304px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] md:gap-[32px]">
          {benefits.map((benefit, index) => (
            <motion.div
              key={`${benefit.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div className="relative h-[260px] rounded-[20px] overflow-hidden mb-[31px]">
                {benefit.image?.asset?.url && (
                  <img
                    src={benefit.image.asset.url}
                    alt={benefit.image.alt || benefit.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#111] font-helvetica text-[16px] font-medium leading-[150%] capitalize text-center mb-[8px]">
                  {benefit.title}
                </h3>
                <p className="text-[#3F3E4B] font-helvetica text-[16px] font-normal leading-[20px] text-center m-0">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// By The Numbers Section Component (with word animation)
const ByTheNumbersSection: React.FC<{
  title: string
  description: string
  countSection: Array<{ name: string; value: string }>
}> = ({ title, description, countSection }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => description ? description.split(' ') : [], [description])

  return (
    <section className="pt-[37px] lg:pt-[108px] pb-[50px] lg:pb-[54px] bg-[#F4F1F2] lg:-mx-[calc(var(--spacing)*12)] md:px-[calc(var(--spacing)*12)]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black max-w-[810px] m-auto">
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
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

        {/* Count Section */}
        {countSection && countSection.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-[52px] max-w-[1280px] m-auto"
          >
            {countSection.map((count, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="border-b border-[#777777] text-[20px] tracking-[-0.4px] font-[400] text-[#16161880] font-helvetica mb-[24px] pb-[31px]">
                  {count.name}
                </div>
                <div className="text-[20px] tracking-[-0.8px] font-[500] text-[#7F7F7F] font-helvetica uppercase">
                  {count.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default function CareersPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Careers | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const careersData = await getCareers()
        console.log('Careers data:', careersData)
        setData(careersData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Careers:', err)
        setError('Failed to load Careers page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="careers-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading Careers...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="careers-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No Careers data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="careers-container">
        {/* Hero Section */}
        <motion.div
          className="careers-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="careers-hero-title font-helvetica">{data.heroSection.sectionLabel}</h1>
          <p className="careers-hero-description">{data.heroSection.mainHeading}</p>
        </motion.div>

        {/* Manufacturing Excellence Section */}
        {data.manufacturingExcellence && (
          <ManufacturingExcellenceSection
            title={data.manufacturingExcellence.title}
            description={data.manufacturingExcellence.description}
          />
        )}

        {/* Info Sections */}
        {data.infoSections && data.infoSections.length > 0 && (
          <div className="info-sections">
            {data.infoSections.map((section, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="info-card-image-wrapper">
                  {section.image?.asset?.url && (
                    <img
                      src={section.image.asset.url}
                      alt={section.image.alt || section.name}
                      className="info-card-image"
                    />
                  )}
                </div>
                <div className="info-card-content">
                  <h3 className="info-card-name">{section.name}</h3>
                  <p className="info-card-description">{section.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Open Positions */}
      {data.openPositions && (
        <OpenPositionsSection
          title={data.openPositions.title}
          description={data.openPositions.description}
          positions={data.openPositions.positions}
        />
      )}

      <div className="careers-container">
        {/* Benefits & Perks */}
        {data.benefitsPerks && (
          <BenefitsPerksSection
            title={data.benefitsPerks.title}
            description={data.benefitsPerks.description}
            benefits={data.benefitsPerks.benefits}
          />
        )}

        {/* By The Numbers */}
        {data.byTheNumbersSection && (
          <ByTheNumbersSection
            title={data.byTheNumbersSection.title}
            description={data.byTheNumbersSection.description}
            countSection={data.byTheNumbersSection.countSection}
          />
        )}
      </div>

      {/* Call to Action Section */}
      {data.callToAction && (
        <section className="pt-[40px] pb-[35px] lg:py-[120px] bg-white">
          <div className="max-w-7xl mx-auto px-[15px]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[71px] gap-[18px]">
                <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-[24px]">
                  <h1 className="text-[30px] md:text-[62px] not-italic tracking-normal md:leading-[68px] leading-[33px] font-medium font-helvetica mb-0 bg-clip-text text-transparent"
                    style={{
                      background: "conic-gradient(from 180deg at 50% 116.28%, #000 0.91deg, rgba(0, 0, 0, 0.24) 360deg)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {data.callToAction.title}
                  </h1>

                  {/* Desktop Button */}
                  <div className="lg:col-span-1 space-y-8 md:block hidden">
                    <motion.a
                      href={data.callToAction.buttonLink}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                                 border border-black bg-black text-white font-helvetica
                                 text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span
                        className="absolute inset-0 bg-white translate-x-full
                                   transition-transform duration-500 ease-in-out rounded-[32px]
                                   group-hover:translate-x-0"
                      />
                      <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                        {data.callToAction.buttonText}
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
                    {data.callToAction.description.split('\n\n').map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] md:max-w-[575px]"
                      >
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Mobile Button - shown after description */}
              <div className="mt-[14px] space-y-8 block md:hidden">
                <motion.a
                  href={data.callToAction.buttonLink}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                             border border-black bg-black text-white font-helvetica
                             text-[14px] leading-[20px] font-bold w-fit block cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    className="absolute inset-0 bg-white translate-x-full
                               transition-transform duration-500 ease-in-out rounded-[32px]
                               group-hover:translate-x-0"
                  />
                  <span className="relative z-10 text-base lg:text-[14px] font-[700] transition-colors duration-500 ease-in-out group-hover:text-black">
                    {data.callToAction.buttonText}
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}
