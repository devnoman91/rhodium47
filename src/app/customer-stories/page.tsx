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
    <section className="relative pt-[170px] md:pb-[62px] pb-[20px]  lg:pb-[80px]">
      <div className="max-w-[1440px] mx-auto px-[20px] lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-black mb-[14px] text-center font-helvetica md:text-[64px] text-[30px] font-medium leading-[110%] tracking-[-1.28px]">
            {sectionLabel}
          </p>
          <h1 className="text-[#111] text-center font-helvetica md:text-[24px] text-[16px] font-medium leading-[150%] max-w-[855px] mx-auto">
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
    <section className="md:pb-[62px] pb-[20px]">
      <div className="max-w-[1332px] mx-auto px-[15px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[57px] gap-y-[25px]">
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
                className="group block bg-white "
              >
                {/* Story Image */}
                <div className="relative h-[231px] w-full overflow-hidden">
                  <Image
                    src={story.image.asset.url}
                    alt={story.image.alt || story.title}
                    fill
                    className="object-cover transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Story Content */}
                <div className="px-[20px] py-[32px] flex gap-[22px] items-center justify-center">
                  <div className='border-r border-[#00000033] pr-[22px]'>
                    <h3 className="text-[#111] mb-[6px] font-helvetica text-[18px] font-bold leading-[150%] ">
                    {story.title}
                    </h3>
                    <p className="text-[#3F3E4B] font-helvetica text-[14px] italic font-medium leading-[20px]">
                      {story.excerpt}
                    </p>
                  </div>
                  <div className="text-[#111] text-center uppercase font-helvetica text-[14px] font-bold leading-[150%] tracking-[3px] ">
                    <span>Read</span>
                    {/* <svg
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
                    </svg> */}
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
    <main className=" bg-[#F4F1F2]">
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
