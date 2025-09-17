import { createClient } from '@sanity/client'
import { homeAboutQuery, productDetailsQuery, productBlogQuery, productShowcaseQuery, showcaseInnovationQuery, protectionQuery, faqQuery, utilityQuery, keepExploringQuery, newsUpdatesQuery, experienceXodiumQuery } from '@/content/queries'
import { HomeAbout, ProductDetail, ProductBlog, ShowcaseProduct, ShowcaseInnovation, Protection, FAQ, Utility, KeepExploring, NewsUpdates, ExperienceXodium } from '@/content/types'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2023-05-03',
})

export async function getHomeAboutData(): Promise<HomeAbout | null> {
  try {
    return await client.fetch(homeAboutQuery)
  } catch (error) {
    console.error('Error fetching home about data:', error)
    return null
  }
}

export async function getProductDetails(): Promise<ProductDetail[]> {
  try {
    return await client.fetch(productDetailsQuery)
  } catch (error) {
    console.error('Error fetching product details:', error)
    return []
  }
}

export async function getProductBlogData(): Promise<ProductBlog | null> {
  try {
    return await client.fetch(productBlogQuery)
  } catch (error) {
    console.error('Error fetching product blog data:', error)
    return null
  }
}

export async function getProductShowcaseData(): Promise<ShowcaseProduct[]> {
  try {
    return await client.fetch(productShowcaseQuery)
  } catch (error) {
    console.error('Error fetching product showcase data:', error)
    return []
  }
}

export async function getShowcaseInnovationData(): Promise<ShowcaseInnovation | null> {
  try {
    return await client.fetch(showcaseInnovationQuery)
  } catch (error) {
    console.error('Error fetching showcase innovation data:', error)
    return null
  }
}

export async function getProtectionData(): Promise<Protection | null> {
  try {
    return await client.fetch(protectionQuery)
  } catch (error) {
    console.error('Error fetching protection data:', error)
    return null
  }
}

export async function getFAQData(): Promise<FAQ | null> {
  try {
    return await client.fetch(faqQuery)
  } catch (error) {
    console.error('Error fetching FAQ data:', error)
    return null
  }
}

export async function getUtilityData(): Promise<Utility | null> {
  try {
    return await client.fetch(utilityQuery)
  } catch (error) {
    console.error('Error fetching utility data:', error)
    return null
  }
}

export async function getKeepExploringData(): Promise<KeepExploring | null> {
  try {
    return await client.fetch(keepExploringQuery)
  } catch (error) {
    console.error('Error fetching keep exploring data:', error)
    return null
  }
}

export async function getNewsUpdatesData(): Promise<NewsUpdates | null> {
  try {
    return await client.fetch(newsUpdatesQuery)
  } catch (error) {
    console.error('Error fetching news updates data:', error)
    return null
  }
}

export async function getExperienceXodiumData(): Promise<ExperienceXodium | null> {
  try {
    return await client.fetch(experienceXodiumQuery)
  } catch (error) {
    console.error('Error fetching experience xodium data:', error)
    return null
  }
}

export { client }