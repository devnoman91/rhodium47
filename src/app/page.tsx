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
import { getExperienceXodiumData, getFAQData, getHomeAboutData, getKeepExploringData, getNewsUpdatesData, getProductBlogData, getProductDetails, getProductShowcaseData, getProtectionData, getShowcaseInnovationData, getUtilityData } from "@/sanity/lib/sanity";
import { getProducts } from "@/lib/shopify";

// Revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  // Fetch data from Sanity CMS and Shopify
  const [aboutData, products, blogData, showcaseData, innovationData, protectionData, faqData, utilityData, keepExploringData, newsUpdatesData, experienceXodiumData, shopifyProducts] = await Promise.all([
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
    getProducts({})
  ]);

  // Map Shopify products to vehicle format
  const vehicles = shopifyProducts.map((product) => {
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const monthlyPayment = Math.round(price * 0.008); // Rough estimate: ~0.8% of price per month

    // Determine category based on product title or tags
    const isArmored = product.title.toLowerCase().includes('armored') ||
                      product.title.toLowerCase().includes('sentinel') ||
                      product.title.toLowerCase().includes('fortress') ||
                      product.tags.some(tag => tag.toLowerCase().includes('armored'));

    return {
      id: product.id,
      name: product.title.toUpperCase(),
      model: product.title,
      description: product.description || 'Luxury vehicle with advanced features',
      price: `$${price.toLocaleString()}`,
      monthlyPayment: `$${monthlyPayment.toLocaleString()}/mo*`,
      range: '400 mi*', // Default range, can be made dynamic with product metafields
      image: product.images[0]?.url || '/car.png',
      category: (isArmored ? 'armored' : 'standard') as 'standard' | 'armored',
      handle: product.handle
    };
  });

  return (
    <div className="relative">
      <HeroCarousel />
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
      <VehicleDiagram />
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
