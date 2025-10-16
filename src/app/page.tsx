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
import { getVehicleDiagram } from "@/content/queries";
import { getCollections, getCollectionProducts } from "@/lib/shopify";

// Revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  // Fetch data from Sanity CMS and Shopify
  const [aboutData, products, blogData, showcaseData, innovationData, protectionData, faqData, utilityData, keepExploringData, newsUpdatesData, experienceXodiumData, vehicleDiagramData, collections] = await Promise.all([
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
    getCollections()
  ]);

  // Find the two specific collections we want to display
  const ourModelsCollection = collections.find(col =>
    col.title.toLowerCase().includes('our models') ||
    col.handle === 'our-models'
  );

  const armoredCollection = collections.find(col =>
    col.title.toLowerCase().includes('armored') ||
    col.handle === 'armored-collection'
  );

  let vehicles: any[] = [];

  try {
    // Fetch products from both collections
    const [standardProducts, armoredProducts] = await Promise.all([
      ourModelsCollection ? getCollectionProducts({ collection: ourModelsCollection.handle }) : Promise.resolve([]),
      armoredCollection ? getCollectionProducts({ collection: armoredCollection.handle }) : Promise.resolve([])
    ]);

    // Map standard products
    const standardVehicles = standardProducts.map((product) => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      const monthlyPayment = Math.round(price * 0.008);

      return {
        id: product.id,
        name: product.title.toUpperCase(),
        model: product.title,
        description: product.description || 'Luxury vehicle with advanced features',
        price: `$${price.toLocaleString()}`,
        monthlyPayment: `$${monthlyPayment.toLocaleString()}/mo*`,
        range: '400 mi*',
        image: product.images[0]?.url || '/car.png',
        category: 'standard' as 'standard' | 'armored',
        handle: product.handle
      };
    });

    // Map armored products
    const armoredVehicles = armoredProducts.map((product) => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      const monthlyPayment = Math.round(price * 0.008);

      return {
        id: product.id,
        name: product.title.toUpperCase(),
        model: product.title,
        description: product.description || 'Luxury armored vehicle with advanced protection',
        price: `$${price.toLocaleString()}`,
        monthlyPayment: `$${monthlyPayment.toLocaleString()}/mo*`,
        range: '400 mi*',
        image: product.images[0]?.url || '/car.png',
        category: 'armored' as 'standard' | 'armored',
        handle: product.handle
      };
    });

    vehicles = [...standardVehicles, ...armoredVehicles];
  } catch (error) {
    console.error('Error fetching collection products:', error);
    vehicles = [];
  }

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
