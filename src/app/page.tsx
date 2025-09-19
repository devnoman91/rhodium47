import Navbar from "@/components/Navbar";
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
import Footer from "@/components/Footer";
import { getHomeAboutData, getProductDetails, getProductBlogData, getProductShowcaseData, getShowcaseInnovationData, getProtectionData, getFAQData, getUtilityData, getKeepExploringData, getNewsUpdatesData, getExperienceXodiumData } from "@/lib/sanity";
export default async function Home() {
  // Fetch data from Sanity CMS
  const [aboutData, products, blogData, showcaseData, innovationData, protectionData, faqData, utilityData, keepExploringData, newsUpdatesData, experienceXodiumData] = await Promise.all([
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
    getExperienceXodiumData()
  ]);

  return (
    <div className="relative">
      <Navbar />
      <HeroCarousel />
      {aboutData && (
        <AboutSection
          aboutData={aboutData}
          products={products}
        />
      )}
 <VehicleShowcase />
      {blogData && (
        <BlogSection
          blogData={blogData}
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
      {utilityData && (
        <UtilitySection
          data={utilityData}
        />
      )}
      <VehicleDiagram />
      {keepExploringData && (
        <KeepExploringSection
          data={keepExploringData}
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
     
      
      <Footer/>
    </div>
  );
}
