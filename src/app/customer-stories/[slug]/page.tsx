'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCustomerStoryBySlug } from '@/content/queries'
import { PortableText } from '@portabletext/react'
import type { CustomerStory } from '@/content/types'

// Portable Text Components for rich text rendering
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-[36px] lg:text-[48px] font-bold text-black mb-[24px] mt-[48px] leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-[28px] lg:text-[40px] font-bold text-black mb-[20px] mt-[40px] leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-[24px] lg:text-[32px] font-bold text-black mb-[16px] mt-[32px] leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-[16px] lg:text-[18px] text-gray-800 mb-[20px] leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-black pl-[24px] py-[16px] my-[32px] italic text-[18px] lg:text-[22px] text-gray-700 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-[8px] py-[4px] rounded text-[14px] font-mono text-gray-900">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black underline hover:text-gray-700 transition-colors font-medium"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      // The query now resolves the full URL via asset->
      const imageUrl = value?.asset?.url

      if (!imageUrl) {
        console.warn('Image missing URL:', value)
        return null
      }

      return (
        <div className="my-[40px] rounded-[16px] overflow-hidden">
          <div className="relative flex-row w-full h-[400px] lg:h-[600px]">
            <Image
              src={imageUrl}
              alt={value.alt || 'Story image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="text-[14px] text-gray-600 mt-[12px] text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
}

// Hero Section with Featured Image
const StoryHeroSection: React.FC<{
  title: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}> = ({ title, image }) => {
  return (
    <section  className=' pt-72'>
     

      {/* Content */}
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <Link
            href="/customer-stories"
            className="inline-flex items-center  text-black text-[14px] font-medium mb-[32px] transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Customer Stories
          </Link>

          {/* Story Title */}
          <h1 className="text-[36px] lg:text-[56px] xl:text-[64px] font-bold leading-tight text-white">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

// Story Content Section
const StoryContentSection: React.FC<{
  content: any[]
}> = ({ content }) => {
  return (
    <section className="py-[60px] lg:py-[100px] bg-white">
      <div className="max-w-[900px] mx-auto px-[20px] lg:px-[60px]">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <PortableText value={content} components={portableTextComponents} />
        </motion.article>
      </div>
    </section>
  )
}

// Call to Action Section
const CTASection: React.FC = () => {
  return (
    <section className="py-[60px] lg:py-[80px] bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[80px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[28px] lg:text-[40px] font-bold text-black mb-[16px]">
            Ready to Share Your Story?
          </h2>
          <p className="text-[16px] lg:text-[18px] text-gray-700 mb-[32px] max-w-[700px] mx-auto">
            Join our community of satisfied customers and experience the difference that quality makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-[16px] justify-center">
            <Link
              href="/contact"
              className="inline-block bg-black text-white px-[32px] py-[16px] rounded-full text-[16px] font-semibold hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/customer-stories"
              className="inline-block bg-white border-2 border-black text-black px-[32px] py-[16px] rounded-full text-[16px] font-semibold hover:bg-gray-50 transition-colors"
            >
              View More Stories
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function CustomerStoryDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [story, setStory] = useState<CustomerStory | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getCustomerStoryBySlug(slug)
        console.log('Customer Story response:', response)

        // The query returns { stories: {...} } structure
        if (response && response.stories) {
          setStory(response.stories)
        } else {
          setError('Story not found')
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Customer Story:', err)
        setError('Failed to load customer story')
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
          <p className="text-[18px] text-gray-600">Loading story...</p>
        </div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-[18px] text-red-600 mb-4">{error || 'Story not found'}</p>
          <Link
            href="/customer-stories"
            className="inline-block bg-black text-white px-[24px] py-[12px] rounded-full text-[14px] font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Customer Stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <StoryHeroSection title={story.title} image={story.image} />

      {/* Story Content */}
      {story.content && story.content.length > 0 && (
        <StoryContentSection content={story.content} />
      )}

      {/* Call to Action */}
      <CTASection />
    </main>
  )
}
