import { getProductBySlug } from '../../../content/queries'
import ProductHeroSection from '../../../components/ProductHeroSection'
import ProductAboutSection from '../../../components/ProductAboutSection'
import ProductInteriorSection from '../../../components/ProductInteriorSection'
import ProductModelSpecsSection from '../../../components/ProductModelSpecsSection'
import ProductShowcaseInnovation from '../../../components/ProductShowcaseInnovation'
import ProtectionSection from '@/components/ProtectionSection'
import UtilitySection from '@/components/UtilitySection'
import NewsUpdatesSection from '@/components/NewsUpdatesSection'
import ExperienceXodiumSection from '@/components/ExperienceXodiumSection'
import { getProtectionData, getUtilityData, getNewsUpdatesData, getExperienceXodiumData } from '@/sanity/lib/sanity'

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params

  // Fetch data from Sanity CMS and product data in parallel
  const [product, protectionData, utilityData, newsUpdatesData, experienceXodiumData] = await Promise.all([
    getProductBySlug(slug),
    getProtectionData(),
    getUtilityData(),
    getNewsUpdatesData(),
    getExperienceXodiumData(),
  ])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    )
  }

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

      <div className="p-8 bg-white">
        <div className="max-w-7xl mx-auto">

        {/* Full Spectrum Color Section */}
        {product.fullSpectrumColorSection && (
          <section className="mb-16 py-12 bg-white">
            <h2 className="text-4xl font-bold text-center mb-12 text-black">{product.fullSpectrumColorSection.name}</h2>
            {product.fullSpectrumColorSection.sections && product.fullSpectrumColorSection.sections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.fullSpectrumColorSection.sections.map((section, index) => (
                  <div key={index} className="text-center">
                    {section.image?.asset && (
                      <div className="mb-6">
                        <img
                          src={section.image.asset.url}
                          alt={section.image.alt || section.name}
                          className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                      
                    )}
                    <h3 className="text-xl font-semibold mb-4 text-black">{section.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        </div>
      </div>

    

      {/* Showcase Innovation Section */}
      {product.showcaseInnovation && (
        <ProductShowcaseInnovation showcaseInnovation={product.showcaseInnovation} />
      )}
      {/* Protection Section - Global data like home page */}
      {protectionData && (
        <ProtectionSection
          data={protectionData}
        />
      )}
  {/* Model Specs Section */}
      {product.modelSpecsSection && (
        <ProductModelSpecsSection modelSpecsSection={product.modelSpecsSection} />
      )}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">

        {/* Warranty Section */}
       

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

      
      {utilityData && (
        <UtilitySection
          data={utilityData}
        />
      )}
      {newsUpdatesData && (
        <NewsUpdatesSection
          data={newsUpdatesData}
        />
      )}
      {experienceXodiumData && (
        <ExperienceXodiumSection
          data={experienceXodiumData}
        />
      )}
    </div>
  )
}