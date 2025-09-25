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
        <div className="">

        {/* Full Spectrum Color Section */}
        {product.fullSpectrumColorSection && (
          <section className="mb-16 py-12 bg-white">
            <h2 className="text-black text-center font-helvetica text-[64px] font-medium leading-[110%] tracking-[-1.28px] mb-[60px]">{product.fullSpectrumColorSection.name}</h2>
            {product.fullSpectrumColorSection.sections && product.fullSpectrumColorSection.sections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
                {product.fullSpectrumColorSection.sections.map((section, index) => (
                  <div key={index} className="text-center">
                    {section.image?.asset && (
                      <div className="mb-[36px]">
                        <img
                          src={section.image.asset.url}
                          alt={section.image.alt || section.name}
                          className="w-full object-cover rounded-[20px] aspect-[1/0.6]"
                        />
                      </div>
                      
                    )}
                    <h3 className="text-[#111] text-center font-helvetica text-[16px] font-medium leading-[150%] capitalize mb-[14px]">{section.name}</h3>
                    <p className="text-center text-[16px] font-normal leading-[20px] font-helvetica">{section.description}</p>
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
        <ProductModelSpecsSection
          modelSpecsSection={product.modelSpecsSection}
          othersSection={product.othersSection}
        />
      )}

      
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