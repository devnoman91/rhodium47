import { client } from '@/sanity/lib/client'
import { comparePageQuery } from './queries'

export interface ComparePageContent {
  heroSection: {
    title: string
    description: string
    ctaButton: {
      text: string
      link: string
    }
  }
}

export async function getComparePageContent(): Promise<ComparePageContent> {
  const comparePage = await client.fetch<ComparePageContent>(comparePageQuery)
  return comparePage || {
    heroSection: {
      title: 'Compare Models',
      description: 'Discover which Tesla models meet your needs by answering questions about your budget, driving habits and lifestyle.',
      ctaButton: {
        text: 'Help Me Choose',
        link: '/choose',
      }
    }
  }
}