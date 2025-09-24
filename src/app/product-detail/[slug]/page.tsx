'use client'

import { useEffect, useState } from 'react'
import { getProductBySlug } from '../../../content/queries'
import { Product } from '../../../content/types'
import ProductHeroSection from '../../../components/ProductHeroSection'
import ProductAboutSection from '../../../components/ProductAboutSection'
import ProductInteriorSection from '../../../components/ProductInteriorSection'

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const getSlug = async () => {
      const { slug: paramSlug } = await params
      setSlug(paramSlug)
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      try {
        console.log('Fetching product with slug:', slug)
        const productData = await getProductBySlug(slug)
        console.log('Product data received:', productData)
        setProduct(productData)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    )
  }

  console.log('Rendering product:', product)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {product.heroSection && (
        <ProductHeroSection heroSection={product.heroSection} />
      )}

      {/* About Section */}
      {product.aboutSection && (
        <ProductAboutSection aboutSection={product.aboutSection} />
      )}

      {/* Interior Section */}
      {product.interiorSection && (
        <ProductInteriorSection interiorSection={product.interiorSection} />
      )}

      <div className="p-8">
        <div className="max-w-7xl mx-auto">

        {/* Full Spectrum Color Section */}
        {product.fullSpectrumColorSection && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Full Spectrum Color</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl mb-2">{product.fullSpectrumColorSection.name}</h3>
              {product.fullSpectrumColorSection.sections && product.fullSpectrumColorSection.sections.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Color Options:</h4>
                  <ul className="list-disc list-inside">
                    {product.fullSpectrumColorSection.sections.map((section, index) => (
                      <li key={index}>{section.name}: {section.description}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Model Specs Section */}
        {product.modelSpecsSection && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Model Specs</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl mb-2">{product.modelSpecsSection.name}</h3>
              <p className="mb-4">{product.modelSpecsSection.title}</p>
              {product.modelSpecsSection.mainSections && product.modelSpecsSection.mainSections.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Main Sections:</h4>
                  <ul className="list-disc list-inside">
                    {product.modelSpecsSection.mainSections.map((section, index) => (
                      <li key={index}>{section.name}: {section.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Warranty Section */}
        {product.warrantySection && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Warranty</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl mb-2">{product.warrantySection.name}</h3>
              <p>{product.warrantySection.title}</p>
            </div>
          </section>
        )}

        {/* Others Section */}
        {product.othersSection && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Others</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl mb-2">{product.othersSection.name}</h3>
              <p className="mb-4">{product.othersSection.title}</p>
              {product.othersSection.bulletPoints && product.othersSection.bulletPoints.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="list-disc list-inside">
                    {product.othersSection.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
        </div>
      </div>
    </div>
  )
}