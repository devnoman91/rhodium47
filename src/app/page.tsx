import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ProductShowcase from "@/components/ProductShowcase";
import ShowcaseInnovationComponent from "@/components/ShowcaseInnovation";
import ProtectionSection from "@/components/ProtectionSection";
import FAQSection from "@/components/FAQSection";
import UtilitySection from "@/components/UtilitySection";
import KeepExploringSection from "@/components/KeepExploringSection";
import NewsUpdatesSection from "@/components/NewsUpdatesSection";
import ExperienceXodiumSection from "@/components/ExperienceXodiumSection";
import VehicleShowcase from "@/components/VehicleShowcase";
import VehicleDiagram from "@/components/VehicleDiagram";
import { getExperienceXodiumData, getFAQData, getHomeAboutData, getKeepExploringData, getNewsUpdatesData, getProductBlogData, getProductDetails, getProductShowcaseData, getProtectionData, getShowcaseInnovationData, getUtilityData, getHeroVideos } from "@/sanity/lib/sanity";
import { getVehicleDiagram, getVehiclePricing } from "@/content/queries";
import { getProducts } from "@/lib/shopify";

// Revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  // Fetch data from Sanity CMS and Shopify
  const [heroVideos, aboutData, products, blogData, showcaseData, innovationData, protectionData, faqData, utilityData, keepExploringData, newsUpdatesData, experienceXodiumData, vehicleDiagramData, vehiclePricingData] = await Promise.all([
    getHeroVideos(),
    getHomeAboutData(),
    getProductDetails(),
    getProductBlogData(),
    getProductShowcaseData(),
    getShowcaseInnovationData(),
    getProtectionData(),
    getFAQData(),
    getUtilityData(),
    getKeepExploringData(),
    getNewsUpdatesData(),
    getExperienceXodiumData(),
    getVehicleDiagram(),
    getVehiclePricing()
  ]);

  let vehicles: any[] = [];

  try {
    // Fetch all products from Shopify
    const allProducts = await getProducts({});

    // Create a map of pricing data by handle for quick lookup
    const pricingMap = new Map(
      vehiclePricingData.map((item: any) => [item.productHandle, item.pricingLine])
    );

    // Map all products
    vehicles = allProducts.map((product) => {
      // Get custom pricing line from Sanity
      const customPricingLine = pricingMap.get(product.handle);

      return {
        id: product.id,
        name: product.title.toUpperCase(),
        model: product.title,
        description: product.description || 'Luxury vehicle with advanced features',
        pricingLine: customPricingLine || '',
        image: product.images[0]?.url || '/car.png',
        handle: product.handle
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    vehicles = [];
  }

  return (
    <div className="relative">
      <HeroCarousel initialVideos={heroVideos} />
       <VehicleShowcase vehicles={vehicles} />
      {aboutData && (
        <AboutSection
          aboutData={aboutData}
          products={products}
        />
      )}

    {showcaseData.length > 0 && (
        <ProductShowcase
          products={showcaseData}
        />
      )}
      {innovationData && (
        <ShowcaseInnovationComponent
          data={innovationData}
        />
      )}
       {utilityData && (
        <UtilitySection
          data={utilityData}
        />
      )}
      <VehicleDiagram data={vehicleDiagramData} />
      {protectionData && (
        <ProtectionSection
          data={protectionData}
        />
      )}
       {faqData && (
        <FAQSection
          data={faqData}
        />
      )}
      {keepExploringData && (
        <KeepExploringSection
          data={keepExploringData}
        />
      )}
      
     
        {blogData && (
        <BlogSection
          blogData={blogData}
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
  );
}
