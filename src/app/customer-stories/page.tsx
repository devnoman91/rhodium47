'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getCustomerStories } from '@/content/queries'
import type { CustomerStories } from '@/content/types'

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

// Stories Grid Component
const StoriesGridSection: React.FC<{
  stories: Array<{
    title: string
    image: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    slug: {
      current: string
    }
    excerpt: string
  }>
}> = ({ stories }) => {
  return (
    <section className="py-[50px] lg:py-[90px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/customer-stories/${story.slug.current}`}
                className="group block bg-white rounded-[24px] overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-black"
              >
                {/* Story Image */}
                <div className="relative h-[280px] w-full overflow-hidden">
                  <Image
                    src={story.image.asset.url}
                    alt={story.image.alt || story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Story Content */}
                <div className="p-[24px] lg:p-[32px]">
                  <h3 className="text-[22px] lg:text-[24px] font-bold text-black mb-[12px] group-hover:text-gray-800 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-[14px] lg:text-[16px] text-gray-700 mb-[20px] line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center text-[14px] font-semibold text-black group-hover:translate-x-2 transition-transform duration-300">
                    <span>Read Story</span>
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="text-center py-[80px]">
            <p className="text-[18px] text-gray-600">No customer stories available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// Main Page Component
export default function CustomerStoriesPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<CustomerStories | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const customerStoriesData = await getCustomerStories()
        console.log('Customer Stories data:', customerStoriesData)
        setData(customerStoriesData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Customer Stories:', err)
        setError('Failed to load Customer Stories page')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-gray-600">Loading Customer Stories...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[18px] text-red-600">{error || 'No Customer Stories data found'}</p>
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

      {/* Stories Grid */}
      {data.stories && data.stories.length > 0 && (
        <StoriesGridSection stories={data.stories} />
      )}
    </main>
  )
}
