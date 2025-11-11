'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getCareers } from '@/content/queries'
import type { Careers } from '@/content/types'

// Hero Section Component
const HeroSection: React.FC<{ sectionLabel: string; mainHeading: string }> = ({
  sectionLabel,
  mainHeading,
}) => {
  return (
    <section className="relative bg-[#F4F1F2] pt-[170px]  md:pb-[106px] px-[15px] pb-[42px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="md:text-[64px] text-[34px] font-medium leading-[110%] tracking-[-1.28px] text-black max-w-[1200px] mx-auto md:mb-6 mb-2 font-helvetica">
             {sectionLabel}
          </h1>
          <p className="md:text-[24px] text-[16px] font-medium text-[#111] leading-[150%] capitalize max-w-[855px] mx-auto md:mb-[14px] font-helvetica">
           {mainHeading}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Manufacturing Excellence Section with word animation
const ManufacturingExcellenceSection: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })

  const words = description.split(' ')

  return (
    <section className="md:pb-[60px] pb-[39px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className=""
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20">
            {/* Left Logo */}
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
            </motion.div>

            {/* Heading + Description with word animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-1 lg:ml-50 xl:ml-50 lg:col-span-10 xl:col-span-10"
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
                  {title}
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
      </div>
    </section>
  )
}


const InfoSectionsComponent: React.FC<{
  sections: Array<{
    name: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ sections }) => {
  return (
    <section className="pb-[50px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-[30px] md:gap-[30px]">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`overflow-hidden transition-transform duration-300 ease-in-out ${
                index === 1 ? 'md:max-w-[463px] w-full' : 'md:max-w-[392px] w-full'
              }`}
            >
              <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden flex">
                <img
                  src={section.image.asset.url}
                  alt={section.image.alt || section.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
              <div className="pt-[31px]">
                <h3 className="text-[#111] text-center font-[500] text-[16px] leading-[150%] capitalize mb-[8px] font-helvetica">
                  {section.name}
                </h3>
                <p className="text-[#3F3E4B] text-center text-[16px] font-[400] leading-[20px]">
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
    buttontext: string
    jobType: string
    slug: { current: string }
  }>
}> = ({ title, description, positions }) => {
  return (
    <section className="py-[30px] lg:pt-[79px] lg:pb-[55px] bg-[#560100]">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:mb-[56px] mb-[36px]  flex md:flex-row flex-col justify-between lg:gap-[182px] md:gap-[100px] gap-[20px]"
        >
          <h2 className="md:text-[64px] text-[34px] md:text-left text-center lg:text-[48px] font-[500] text-white md:mb-[16px]">{title}</h2>
          <p className="text-[16px] md:text-right text-center lg:text-[18px] text-white md:max-w-[517px] md:ml-auto">
            {description}
          </p>
        </motion.div>

        <div className="space-y-[10px]">
          {positions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1d1d1d]  rounded-[30px] md:px-[57px] px-[20px] py-[32px]  hover:shadow-xl transition-shadow"
            >
              <div className='flex justify-between items-center mb-[36px]'>
                <span className="flex  p-2 flex-col font-[400] text-[16px] items-start gap-2 rounded-lg bg-white/10 text-white">10 min ago</span>
             <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <mask
                    id="mask0_579_1953"
                    style={{ maskType: 'luminance' }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M0 1.90735e-06H24V24H0V1.90735e-06Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_579_1953)">
                    <path
                      d="M18.1875 0.937502H5.8125C4.77694 0.937502 3.9375 1.77521 3.9375 2.80856V22.2656L12 17.0156L20.0625 22.2406V2.80856C20.0625 1.77521 19.2231 0.937502 18.1875 0.937502Z"
                      stroke="#6C757D"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 4.6875V13.125"
                      stroke="#6C757D"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.78125 8.90625H16.2188"
                      stroke="#6C757D"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

              </div>
              <div className='flex gap-[20px] md:flex-row flex-col items-start mb-[32px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M9.93596 30.451C13.0735 33.693 16.9335 36.1469 21.2005 37.6123C18.0779 39.6446 12.1682 37.7285 7.40693 32.9801C2.64564 28.2317 0.710159 22.322 2.74242 19.1865C4.21471 23.4579 6.68018 27.3186 9.93596 30.451Z" fill="url(#paint0_linear_579_1640)"/>
                    <path d="M32.4316 33.7731C32.146 34.3354 31.7737 34.8493 31.3284 35.2957C29.509 37.1151 26.6767 37.6248 23.4509 36.986L22.8058 36.8506C22.5929 36.7989 22.3864 36.7473 22.1606 36.6828C18.4445 35.6441 14.3413 33.1989 10.7348 29.586C7.12836 25.9731 4.68319 21.8764 3.63803 18.1602C3.57352 17.9473 3.51545 17.7409 3.46384 17.5151C3.41222 17.2893 3.36706 17.0893 3.32835 16.8699C2.68319 13.6441 3.19932 10.8118 5.01868 8.99249C5.46854 8.5465 5.98423 8.17225 6.54771 7.88281C6.25466 9.82387 6.38897 11.8055 6.94126 13.6893C7.14271 14.4563 7.39047 15.2103 7.68319 15.9473C7.76061 16.1473 7.85093 16.3538 7.9348 16.5538C8.01867 16.7538 8.11545 16.9731 8.21222 17.1989C9.76171 20.4532 11.8737 23.4083 14.4509 25.928C16.9581 28.4788 19.8928 30.5706 23.1219 32.1086L23.7671 32.386L24.3735 32.6376C25.1126 32.9246 25.8663 33.1723 26.6316 33.3796C27.9184 33.7335 29.2455 33.92 30.58 33.9344C31.2006 33.9329 31.82 33.8789 32.4316 33.7731Z" fill="url(#paint1_linear_579_1640)"/>
                    <path d="M37.8079 25.3025C37.8734 26.2971 37.7356 27.2946 37.4029 28.2341C37.0701 29.1736 36.5493 30.0355 35.8724 30.767C35.4267 31.2179 34.9102 31.5928 34.3434 31.8767C34.1239 31.9959 33.8952 32.0973 33.6595 32.1799C33.4384 32.2687 33.2122 32.3441 32.9821 32.4057C30.9814 32.866 28.8951 32.7948 26.9305 32.1993C25.9833 31.9452 25.056 31.6217 24.1563 31.2316L23.5111 30.9348C23.2788 30.8187 23.0401 30.709 22.8079 30.5864C17.2634 27.6571 12.7307 23.1244 9.80143 17.5799C9.67885 17.3477 9.56272 17.109 9.45304 16.8767C9.34337 16.6445 9.25305 16.438 9.16272 16.2316C8.77154 15.3337 8.44595 14.4087 8.18852 13.4638C7.59161 11.497 7.52264 9.40769 7.98853 7.40575C8.05304 7.17349 8.12402 6.94769 8.20789 6.72833C8.29186 6.50774 8.3888 6.29231 8.49821 6.08317C8.78859 5.50925 9.1674 4.98457 9.62078 4.52833C10.3332 3.86776 11.1705 3.35626 12.0834 3.02388C12.9964 2.6915 13.9665 2.54495 14.9369 2.59285H15.0724C14.9172 2.71369 14.7706 2.84519 14.6337 2.9864C13.777 3.8608 13.194 4.96619 12.9563 6.16704C12.9176 6.35414 12.8853 6.54769 12.853 6.74123C12.8208 6.93478 12.8079 7.12833 12.795 7.33478C12.4917 11.4187 14.8337 16.7606 19.2466 21.1735C23.4079 25.3348 28.395 27.6251 32.3756 27.6251C32.6143 27.6251 32.8466 27.6251 33.0788 27.6251C33.3111 27.6251 33.4853 27.6251 33.6853 27.5606C33.8871 27.5346 34.0874 27.498 34.2853 27.4509C34.5942 27.3863 34.8982 27.3001 35.195 27.1929C36.0358 26.8948 36.8002 26.4145 37.4337 25.7864C37.5694 25.6339 37.6945 25.4723 37.8079 25.3025Z" fill="url(#paint2_linear_579_1640)"/>
                    <path d="M38.0781 20.6831C38.0796 21.1287 38.0407 21.5736 37.962 22.0121C37.8948 22.4303 37.7801 22.8394 37.6201 23.2315C37.3795 23.8566 37.0127 24.4254 36.5426 24.9025C35.8383 25.5837 34.9581 26.0551 34.0007 26.2638C33.8007 26.3154 33.6007 26.3476 33.3942 26.3799C33.1878 26.4121 32.9942 26.4251 32.7491 26.4315C29.0717 26.6444 24.162 24.4057 20.0459 20.2896C15.9297 16.1734 13.6781 11.2573 13.8975 7.56699C13.9066 7.36613 13.926 7.16587 13.9555 6.96699C13.9815 6.77372 14.0181 6.58204 14.0652 6.39279C14.2631 5.41883 14.7381 4.52273 15.433 3.81215C15.8927 3.35288 16.4386 2.98893 17.0394 2.74118C17.4525 2.57447 17.8832 2.45542 18.3233 2.38634C18.7808 2.30254 19.2452 2.2615 19.7104 2.26376H20.1297C20.6782 2.28814 21.2239 2.355 21.762 2.46376C21.6225 2.53981 21.4888 2.62607 21.362 2.72183C21.1707 2.85404 20.9915 3.00302 20.8265 3.16699C20.6846 3.31196 20.551 3.4649 20.4265 3.62505C19.4652 4.91537 19.2136 6.63795 19.5942 8.56053C19.6459 8.8272 19.7104 9.09172 19.7878 9.35408C19.8652 9.64441 19.962 9.94118 20.0717 10.2315C20.9622 12.5082 22.3306 14.5674 24.0846 16.2702C25.7848 18.0228 27.842 19.3892 30.1168 20.2767C30.4136 20.3863 30.7039 20.4831 30.9942 20.5605C31.2614 20.6403 31.5328 20.7049 31.8071 20.7541C32.3463 20.8654 32.8954 20.9216 33.4459 20.9218C34.1509 20.9307 34.852 20.8149 35.5168 20.5799C35.9517 20.4279 36.3607 20.2104 36.7297 19.9347C36.8921 19.8178 37.0433 19.6861 37.1813 19.5412C37.3377 19.3844 37.4822 19.2162 37.6136 19.038C37.7078 18.9101 37.794 18.7765 37.8717 18.638C37.9797 19.1805 38.0466 19.7305 38.0717 20.2831C38.0717 20.3863 38.0781 20.5476 38.0781 20.6831Z" fill="url(#paint3_linear_579_1640)"/>
                    <path d="M37.3032 15.8699C37.3032 16.0958 37.3032 16.3087 37.3032 16.5151C37.2591 16.9003 37.1637 17.2778 37.0194 17.6377C36.9252 17.8639 36.8085 18.0801 36.671 18.2829C36.5652 18.4328 36.4465 18.5731 36.3161 18.7022L36.2387 18.7796C35.0581 19.8828 33.071 19.9861 30.8839 19.2635C30.5613 19.1538 30.2387 19.0312 29.9032 18.8893C29.5677 18.7474 29.1484 18.5409 28.7677 18.3345C25.9531 16.7674 23.6316 14.4459 22.0645 11.6312C21.858 11.2604 21.6707 10.8793 21.5032 10.4893C21.3613 10.1667 21.2387 9.84414 21.1355 9.52801C20.4129 7.34091 20.4903 5.35382 21.6064 4.16672L21.6903 4.08285C21.8211 3.95432 21.9613 3.83571 22.1097 3.72801C22.3102 3.58511 22.5267 3.46602 22.7548 3.37317C23.1166 3.2302 23.4967 3.13898 23.8839 3.1022C24.0871 3.07585 24.2918 3.06292 24.4968 3.06349C24.8556 3.0658 25.2136 3.096 25.5677 3.15382C25.6903 3.15382 25.8194 3.19253 25.9484 3.21833C25.9249 3.24469 25.9033 3.27272 25.8839 3.30221C25.7631 3.46418 25.6613 3.63953 25.5806 3.82479C25.4446 4.12753 25.347 4.44614 25.2903 4.77317C25.2564 4.99955 25.2391 5.22813 25.2387 5.45704C25.2326 5.70927 25.2456 5.9616 25.2774 6.21188C25.3168 6.52363 25.3793 6.83201 25.4645 7.13446C26.0147 8.9723 27.0303 10.6368 28.4129 11.9667C29.9397 13.6092 31.9598 14.7099 34.1677 15.1022C34.3815 15.132 34.5971 15.1471 34.8129 15.1474H34.8968C35.1131 15.1461 35.3289 15.1266 35.5419 15.0893C35.8702 15.0377 36.1894 14.9399 36.4903 14.799C36.6806 14.7245 36.8589 14.6223 37.0194 14.4958C37.0523 14.4849 37.0814 14.4647 37.1032 14.4377C37.1032 14.5732 37.1548 14.7022 37.1742 14.8312C37.2439 15.1736 37.287 15.5209 37.3032 15.8699Z" fill="url(#paint4_linear_579_1640)"/>
                    <path d="M37.1488 12.29C37.1003 12.499 37.0198 12.6992 36.9101 12.8836C36.8709 12.9505 36.8278 13.0151 36.7811 13.0771C36.7287 13.1466 36.6727 13.2134 36.6134 13.2771L36.4908 13.3803C36.3359 13.5148 36.1592 13.6217 35.9682 13.6965C35.6056 13.843 35.2173 13.9153 34.8263 13.9094C34.5622 13.905 34.299 13.8791 34.0392 13.8319C33.7205 13.7759 33.4075 13.6917 33.1037 13.5803C31.6649 13.0265 30.3582 12.1771 29.2681 11.0869C28.1779 9.99677 27.3285 8.6901 26.7747 7.2513C26.723 7.10291 26.6843 6.96097 26.6392 6.80614C26.5962 6.64898 26.5617 6.4896 26.5359 6.32872C26.4821 6.07194 26.454 5.81043 26.4521 5.54807C26.4423 5.15733 26.5125 4.76871 26.6585 4.40614C26.7384 4.22167 26.8449 4.04995 26.9747 3.89646C27.0078 3.85264 27.0444 3.81164 27.0843 3.77388C27.1427 3.71125 27.2076 3.65502 27.2779 3.60614C27.3354 3.5595 27.3957 3.51641 27.4585 3.4771C27.6457 3.36687 27.8477 3.2843 28.0585 3.23194C28.3186 3.17106 28.5849 3.14074 28.8521 3.14162C29.0527 3.14207 29.2531 3.155 29.4521 3.18033C31.3639 3.55848 33.111 4.52111 34.4521 5.93517C35.8696 7.26592 36.839 9.00401 37.2263 10.9094C37.2928 11.3701 37.2665 11.8396 37.1488 12.29Z" fill="url(#paint5_linear_579_1640)"/>
                    <defs>
                      <linearGradient id="paint0_linear_579_1640" x1="1.93597" y1="28.7994" x2="21.1682" y2="28.7994" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F08504"/>
                        <stop offset="1" stop-color="#E5322D"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_579_1640" x1="3.109" y1="22.5796" x2="32.4316" y2="22.5796" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E53282"/>
                        <stop offset="1" stop-color="#851D7B"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear_579_1640" x1="7.64659" y1="17.6316" x2="37.8143" y2="17.6316" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3AB4E6"/>
                        <stop offset="1" stop-color="#004996"/>
                      </linearGradient>
                      <linearGradient id="paint3_linear_579_1640" x1="13.9168" y1="14.3541" x2="38.0781" y2="14.3541" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#97BE11"/>
                        <stop offset="1" stop-color="#258F2D"/>
                      </linearGradient>
                      <linearGradient id="paint4_linear_579_1640" x1="20.6387" y1="11.3861" x2="37.3032" y2="11.3861" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F08504"/>
                        <stop offset="1" stop-color="#E5322D"/>
                      </linearGradient>
                      <linearGradient id="paint5_linear_579_1640" x1="26.4521" y1="8.50936" x2="37.2456" y2="8.50936" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E53282"/>
                        <stop offset="1" stop-color="#851D7B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className=''>
                      <h3 className="text-[24px] leading-[1] lg:text-[28px] font-[500] text-white md:mb-[20px] mb-[27px]">
                        {position.name}
                       </h3>
                       <p className='text-white leading-[1] font-helvetica text-[16px] not-italic font-normal '>{position.role}</p>
                  </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between md:gap-[16px] gap-[35px]">
                <div className="flex-1">
                  <div className="grid grid-cols-2  md:flex flex-wrap md:gap-[24px] gap-y-[33px] font-[500] gap-x-[25px] text-[16px] text-[#6C757D] uppercase">
                   
                    <span className="flex items-center gap-[12px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                      {position.location}
                    </span>
                    <span className="flex items-center gap-[12px]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                      {position.jobType}
                    </span>
                    
                     <span className="flex items-center gap-[12px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_579_1647)">
                                  <path d="M6.5625 5.71875V3.6315C6.5625 2.80078 7.24219 2.12109 8.07291 2.12109H15.9271C16.7579 2.12109 17.4375 2.80078 17.4375 3.6315V5.71875" stroke="white" stroke-width="2" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M22.3594 12.4688V20.4727C22.3594 21.246 21.7264 21.8789 20.9531 21.8789H3.04688C2.27358 21.8789 1.64062 21.2461 1.64062 20.4727V12.5156" stroke="white" stroke-width="2" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.125 14.8359C5.16614 14.5524 0.703125 13.1344 0.703125 10.5819V7.25391C0.703125 6.47939 1.33481 5.84766 2.10938 5.84766H21.8906C22.6651 5.84766 23.2969 6.47944 23.2969 7.25391V10.5819C23.2969 13.1504 18.7775 14.5701 13.7812 14.8411" stroke="white" stroke-width="2" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2656 13.4414H13.7344V15.0586C13.7344 15.948 13.0066 16.6758 12.1172 16.6758H11.8828C10.9934 16.6758 10.2656 15.948 10.2656 15.0586V13.4414Z" stroke="white" stroke-width="2" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_579_1647">
                                    <rect width="24" height="24" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>

                              {position.salary}
                            </span>
                  </div>
                </div>
               <motion.div
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Link
                      href={`/`}
                      className="relative overflow-hidden flex items-center gap-[12px] px-[20px] py-[14px] rounded-[8px] w-fit
                                bg-white text-black font-helvetica font-medium text-[16px]
                                border border-transparent cursor-pointer group
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {/* sliding overlay */}
                      <span
                        className="absolute inset-0 bg-[#560100] translate-x-full
                                  transition-transform duration-500 ease-in-out rounded-[8px]
                                  group-hover:translate-x-0"
                      />

                      {/* text */}
                      <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                       {position.button}
                      </span>
                    </Link>
                  </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Benefits & Perks Section
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
    <section className="md:pt-[101px] pt-[50px] px-[15px] lg:pb-[104px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] m-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:mb-[54px] mb-[31px] flex md:flex-row flex-col justify-between md:gap-[100px] lg:gap-[182px] gap-[5px]"
        >
          <h2 className="text-[34px] md:text-left text-center leading-normal md:text-[48px] font-[500] text-black md:mb-[16px] ">{title}</h2>
          <p className="text-[16px] md:text-right text-center lg:text-[18px] text-black md:max-w-[517px]  md:ml-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-[32px] gap-[49px]">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className=""
            >
              <div className="relative h-[260px] rounded-[20px] overflow-hidden md:mb-[31px] mb-[15px] mx-auto">
                <img
                  src={benefit.image.asset.url}
                  alt={benefit.image.alt || benefit.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[16px] leading-[1] font-[500] text-black mb-[8px] text-center">
                {benefit.title}
              </h3>
              <p className="text-[16px] text-[#3F3E4B] font-[400] text-center">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// By The Numbers Section with word animation
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

  const words = description ? description.split(' ') : []

  return (
    <section className="pt-[51px] lg:pt-[108px] px-[15px] pb-[32px] lg:pb-[54px] bg-[#F4F1F2]">
      <div className="max-w-[1304px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 md:mb-[96px] mb-[67px]">
            {/* Content */}
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

// Animation variants for Call to Action
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

const CallToActionSection: React.FC<{
  title: string
  description: string
  buttonText: string
  buttonLink: string
}> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="pt-[48px] pb-[54px] lg:py-[120px] bg-white">
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
                {title}
              </h1>

              {/* Desktop Button */}
              <div className="lg:col-span-1 space-y-8 md:block hidden">
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
                  className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                             border border-black bg-[#560100] text-white font-helvetica
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
                    className="text-[16px] leading-[24px] tracking-[0] m-0 font-light font-helvetica text-black pb-[20px] lg:max-w-[575px]"
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
              href={buttonLink}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative overflow-hidden px-[24px] py-[8px] rounded-[32px]
                         border border-black bg-[#560100] text-white font-helvetica
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
                {buttonText}
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-gray-600">Loading Careers...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-red-600">{error || 'No Careers data found'}</p>
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
        <InfoSectionsComponent sections={data.infoSections} />
      )}

      {/* Open Positions */}
      {data.openPositions && (
        <OpenPositionsSection
          title={data.openPositions.title}
          description={data.openPositions.description}
          positions={data.openPositions.positions}
        />
      )}

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