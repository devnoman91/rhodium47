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
    <section className="py-6 lg:py-[80px] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-12"
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

// Info Sections Component
const InfoSectionsComponent: React.FC<{
  sections: Array<{
    name: string
    description: string
    image: { asset: { url: string }; alt?: string }
  }>
}> = ({ sections }) => {
  return (
    <section className="py-[50px] lg:py-[90px] bg-[#F4F1F2]">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[260px] w-full">
                <Image
                  src={section.image.asset.url}
                  alt={section.image.alt || section.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-[32px]">
                <h3 className="text-[20px] font-semibold text-black mb-[12px]">{section.name}</h3>
                <p className="text-[14px] text-gray-700">{section.description}</p>
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
    jobType: string
    slug: { current: string }
  }>
}> = ({ title, description, positions }) => {
  return (
    <section className="py-[50px] lg:py-[90px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-[48px]"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-black mb-[16px]">{title}</h2>
          <p className="text-[16px] lg:text-[18px] text-gray-700 max-w-[800px] mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="space-y-[16px]">
          {positions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-black rounded-[24px] p-[24px] lg:p-[32px] hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px]">
                <div className="flex-1">
                  <h3 className="text-[20px] lg:text-[24px] font-bold text-black mb-[8px]">
                    {position.name}
                  </h3>
                  <div className="flex flex-wrap gap-[12px] text-[14px] text-gray-600">
                    <span className="flex items-center gap-[6px]">
                      <span className="w-[4px] h-[4px] bg-gray-600 rounded-full" />
                      {position.role}
                    </span>
                    <span className="flex items-center gap-[6px]">
                      <span className="w-[4px] h-[4px] bg-gray-600 rounded-full" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-[6px]">
                      <span className="w-[4px] h-[4px] bg-gray-600 rounded-full" />
                      {position.jobType}
                    </span>
                    <span className="flex items-center gap-[6px]">
                      <span className="w-[4px] h-[4px] bg-gray-600 rounded-full" />
                      {position.salary}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/careers/${position.slug.current}`}
                  className="inline-block bg-black text-white px-[24px] py-[12px] rounded-full text-[14px] font-semibold hover:bg-gray-800 transition-colors"
                >
                  Apply Now
                </Link>
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
    <section className="py-[50px] lg:py-[90px] bg-[#F4F1F2]">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-[48px]"
        >
          <h2 className="text-[28px] lg:text-[48px] font-bold text-black mb-[16px]">{title}</h2>
          <p className="text-[16px] lg:text-[18px] text-gray-700 max-w-[800px] mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[24px] p-[32px] border-2 border-black hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[80px] w-[80px] rounded-full overflow-hidden mb-[24px] mx-auto">
                <Image
                  src={benefit.image.asset.url}
                  alt={benefit.image.alt || benefit.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[20px] font-bold text-black mb-[12px] text-center">
                {benefit.title}
              </h3>
              <p className="text-[14px] text-gray-700 text-center">{benefit.description}</p>
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const words = description.split(' ')

  return (
    <section ref={containerRef} className="pt-[50px] pb-[50px] lg:pb-[90px] bg-white">
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
