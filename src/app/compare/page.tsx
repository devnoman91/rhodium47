import { Suspense } from 'react'
import Link from 'next/link'
import { getProducts } from '@/lib/shopify'
import CompareClient from './CompareClient'

interface ComparisonProduct {
  id: string
  handle: string
  title: string
  image: string
  price: number
  leasePrice?: number
  tagline?: string
  descriptionHtml?: string
  specs: {
    motorConfig?: string
    range?: string
    acceleration?: string
    horsepower?: string
    torque?: string
    towing?: string
    payload?: string
  }
  design?: {
    paint?: string[]
    wheels?: number
    interior?: string[]
    accents?: string[]
  }
  dimensions?: {
    [key: string]: string
  }
  cargoCapacity?: {
    [key: string]: string
  }
  driveModes?: string[]
}

export default async function ComparePage() {
  // Fetch products from Shopify server-side
  const shopifyProducts = await getProducts({})

  // Transform Shopify products to comparison format
  const allProducts: ComparisonProduct[] = shopifyProducts.map((product: any) => {
    const specs = parseSpecs(product.descriptionHtml || '')

    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      image: product.images[0]?.url || '/images/vehicle.png',
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      tagline: extractTagline(product.description),
      descriptionHtml: product.descriptionHtml, // Include the full HTML description
      specs,
      design: parseDesignOptions(product.descriptionHtml || ''),
      dimensions: parseDimensions(product.descriptionHtml || ''),
      cargoCapacity: parseCargoCapacity(product.descriptionHtml || ''),
      driveModes: parseDriveModes(product.descriptionHtml || '')
    }
  })

  return (
    <div className="min-h-screen bg-[#F4F1F2] font-helvetica text-[#000]">
      {/* Header Section */}
      <div className="bg-[#F4F1F2] text-center pt-[138px] pb-[163px]">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-black text-center font-medium text-[64px] leading-[110%] tracking-[-1.28px] font-helvetica mb-[26px]">
            Compare Models
          </h1>
          <p className="text-[#111] max-w-[855px] m-auto text-center font-medium text-[24px] leading-[150%] capitalize font-helvetica mb-[32px]">
            Discover which Tesla models meet your needs by answering questions about your budget, driving habits and lifestyle.
          </p>
          <Link href="/product-design">
            <button className="bg-black cursor-pointer rounded-full hover:bg-gray-800 transition-colors p-[14px] max-w-[372px] w-full text-white text-center font-bold text-[16px] leading-[150%] font-helvetica">
              Help Me Choose
            </button>
          </Link>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <p className="text-black text-[20px] font-helvetica">Loading comparison...</p>
        </div>
      }>
        <CompareClient products={allProducts} />
      </Suspense>
    </div>
  )
}

// Helper Functions
function parseSpecs(html: string) {
  const specs: any = {}

  const rangeMatch = html.match(/(\d+)\s*mi\s*(Range|EPA)/i)
  if (rangeMatch) specs.range = `${rangeMatch[1]} mi`

  const accelerationMatch = html.match(/(\d+\.?\d*)\s*sec/i)
  if (accelerationMatch) specs.acceleration = `${accelerationMatch[1]} sec`

  const horsepowerMatch = html.match(/(\d+,?\d*)\s*hp/i)
  if (horsepowerMatch) specs.horsepower = horsepowerMatch[1].replace(',', '') + ' hp'

  return specs
}

function extractTagline(description: string): string {
  const firstSentence = description.split('.')[0]
  return firstSentence.length > 60 ? firstSentence.substring(0, 60) + '...' : firstSentence
}

function parseDesignOptions(html: string) {
  return {
    paint: extractColors(html),
    wheels: countWheelOptions(html),
    interior: extractInteriorColors(html)
  }
}

function parseDimensions(_html: string) {
  const dimensions: any = {}
  return dimensions
}

function parseCargoCapacity(_html: string) {
  const cargo: any = {}
  return cargo
}

function parseDriveModes(_html: string): string[] {
  return []
}

function extractColors(html: string): string[] {
  const colorPattern = /#[0-9A-Fa-f]{6}/g
  const matches = html.match(colorPattern)
  return matches ? [...new Set(matches)].slice(0, 8) : []
}

function countWheelOptions(html: string): number {
  const wheelMatch = html.match(/(\d+)\s*wheel/i)
  return wheelMatch ? parseInt(wheelMatch[1]) : 0
}

function extractInteriorColors(_html: string): string[] {
  return []
}
