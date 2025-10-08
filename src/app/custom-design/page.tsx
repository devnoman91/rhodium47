'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getCustomDesign } from '@/content/queries'
import type { CustomDesign } from '@/content/types'

const criticalInlineStyles = `
  .custom-design-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 120px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 80px;
  }

  /* Hero Section */
  .custom-design-hero {
    text-align: center;
    margin-bottom: 80px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .custom-design-hero-title {
   color: #000;
text-align: center;
font-family: "Helvetica Neue";
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%; /* 70.4px */
letter-spacing: -1.28px;
  }
  .custom-design-hero-description {
    color: #111;
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-family: "Helvetica Neue";
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 36px */
text-transform: capitalize;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .custom-design-container {
      padding-inline: 20px;
      padding-top: 100px;
    }
    .custom-design-hero-title {
      font-size: 40px;
    }
    .custom-design-hero-description {
      font-size: 16px;
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

// Separate component for Design Philosophy to avoid hydration issues
const DesignPhilosophySection: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => description.split(' '), [description])

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Left - Sunburst Icon */}
            <motion.div
              className="w-full max-w-[400px] hidden lg:flex lg:justify-start justify-center"
            >
              <div className="relative mb-8 w-20 h-20 lg:w-20 lg:h-20 xl:w-25 xl:h-25 flex items-center justify-center">
                {/* Rotating circle with lines */}
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

                {/* Static centered arrow */}
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div
                    className="text-lg md:text-2xl lg:text-3xl text-gray-900"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 1V14C18.0006 14.2652 17.8952 14.5196 17.7077 14.7071C17.5201 14.8946 17.2658 15 17.0006 15C16.7353 15 16.481 14.8946 16.2934 14.7071C16.1059 14.5196 16.0006 14.2652 16.0006 14V3.41375L1.70806 17.7075C1.52042 17.8951 1.26592 18.0006 1.00056 18.0006C0.735192 18.0006 0.480697 17.8951 0.293056 17.7075C0.105415 17.5199 0 17.2654 0 17C0 16.7346 0.105415 16.4801 0.293056 16.2925L14.5868 2H4.00056C3.73534 2 3.48099 1.89464 3.29345 1.70711C3.10591 1.51957 3.00056 1.26522 3.00056 1C3.00056 0.734784 3.10591 0.48043 3.29345 0.292893C3.48099 0.105357 3.73534 0 4.00056 0H17.0006C17.2658 0 17.5201 0.105357 17.7077 0.292893C17.8952 0.48043 18.0006 0.734784 18.0006 1Z" fill="#343330"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="my-0 pt-3 border-t border-black mb-8 md:mb-12 lg:mb-[60px]">
              {/* Section Label */}
              <div className="flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal pb-4 md:pb-6 font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                <span className="">
                  {title}
                </span>
              </div>

              {/* Main Description with Word Scrolling Effect */}
              <div className="space-y-6">
                <p
                  ref={descriptionRef}
                  className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-normal m-0 font-medium font-helvetica mb-6 md:mb-8 lg:mb-[50px] flex flex-wrap"
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

export default function CustomDesignPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customDesignData, setCustomDesignData] = useState<CustomDesign | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const customDesign = await getCustomDesign()
        console.log('Custom Design data:', customDesign)
        setCustomDesignData(customDesign)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching custom design:', err)
        setError('Failed to load custom design page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="custom-design-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading custom design...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !customDesignData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="custom-design-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No custom design data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="custom-design-container">
        {/* Hero Section */}
        <motion.div
          className="custom-design-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="custom-design-hero-title">{customDesignData.heroSection.title}</h1>
          <p className="custom-design-hero-description">{customDesignData.heroSection.description}</p>
        </motion.div>
      </div>

      {/* Design Philosophy Section */}
      <DesignPhilosophySection
        title={customDesignData.designPhilosophy.title}
        description={customDesignData.designPhilosophy.description}
      />
    </>
  )
}
