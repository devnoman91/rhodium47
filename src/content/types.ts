export interface Video {
  _id: string
  desktopName: string
  mobileName?: string
  desktopSubtitle?: string
  mobileSubtitle?: string
  slug?: {
    current: string
  }
  contentType: 'video' | 'image'
  desktopVideoFile?: {
    asset: {
      _ref: string
      url: string
    }
  }
  mobileVideoFile?: {
    asset: {
      _ref: string
      url: string
    }
  }
  desktopImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  mobileImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description?: string
  buttonText?: string
  buttonLink?: string
}

export interface VideoCarousel {
  videos: Video[]
  currentIndex: number
  isPlaying: boolean
}

export interface HomeAbout {
  sectionLabel: string
  mainHeading: string
  description: string
}

export interface ProductDetail {
  _id: string
  title: string
  slug: {
    current: string
  }
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description: string
  buttonText: string
  buttonLink: string
}

export interface ProductCarousel {
  products: ProductDetail[]
  currentIndex: number
}

export interface BlogProduct {
  title: string
  category: string
  description: string
  slug: {
    current: string
  }
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface ProductBlog {
  mainSectionTitle: string
  products: BlogProduct[]
}

export interface ShowcaseProduct {
  productName: string
  title: string
  description: string
  buttonText: string
  buttonLink?: string
  slug: {
    current: string
  }
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface CountItem {
  name: string
  title: string
}

export interface BlogItem {
  title: string
  description: string
  buttonText: string
  buttonLink?: string
  slug: {
    current: string
  }
}

export interface ShowcaseInnovation {
  main: {
    title: string
    description: string
    countSection: CountItem[]
  }
  blogSection: BlogItem[]
}

export interface Protection {
  name: string
  description: string
  countSection: CountItem[]
}

export interface FAQQuestion {
  category: string
  name: string
  description: string
}

export interface FAQ {
  name: string
  description: string
  questionsSection: FAQQuestion[]
}

export interface UtilitySection {
  name: string
  title: string
}

export interface Utility {
  name: string
  description: string
  section: UtilitySection[]
}

export interface KeepExploringSection {
  name: string
  link: string
}

export interface KeepExploring {
  name: string
  description: string
  section: KeepExploringSection[]
}

export interface NewsItem {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  title: string
  description: string
  slug: {
    current: string
  }
  content?: any[] // Portable Text content
}

export interface NewsUpdates {
  name: string
  description: string
  newsSection: NewsItem[]
}

export interface ExperienceXodiumButton {
  text: string
  link: string
}

export interface ExperienceXodium {
  name: string
  description: string
  button: ExperienceXodiumButton
}

export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  heroSection?: {
    name?: string
    title?: string
    contentType?: 'video' | 'image'
    videoFile?: {
      asset: {
        url: string
      }
    }
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
  }
  aboutSection?: {
    name?: string
    description?: string
    images?: Array<{
      name?: string
      title?: string
      image?: {
        asset: {
          url: string
        }
        alt?: string
      }
      counts?: Array<{
        name?: string
        title?: string
        value?: number
      }>
    }>
  }
  interiorSection?: {
    name?: string
    description?: string
    sections?: Array<{
      name?: string
      title?: string
      contentType?: 'video' | 'image'
      videoFile?: {
        asset: {
          url: string
        }
      }
      image?: {
        asset: {
          url: string
        }
        alt?: string
      }
    }>
  }
  fullSpectrumColorSection?: {
    name?: string
    sections?: Array<{
      name?: string
      description?: string
      image?: {
        asset: {
          url: string
        }
        alt?: string
      }
    }>
  }
  modelSpecsSection?: {
    title?: string
    specificationSections?: Array<{
      name: string
      image?: {
        asset: {
          url: string
        }
        alt?: string
      }
      specifications: Array<{
        label: string
        value: string
      }>
    }>
    othersSection?: {
      title?: string
      bulletPoints?: string[]
    }
  }
  warrantySection?: {
    name?: string
    title?: string
  }
  othersSection?: {
    name?: string
    title?: string
    bulletPoints?: string[]
  }
  showcaseInnovation?: {
    main: {
      title: string
      description: string
    }
    blogSection: Array<{
      title: string
      description: string
      buttonText: string
      buttonLink?: string
      slug: {
        current: string
      }
    }>
  }
}

export interface SanityImageAsset {
  _id: string
  url: string
}

export interface SanityFileAsset {
  _id: string
  url: string
}

export interface SanityImage {
  asset: SanityImageAsset
  alt?: string
}

export interface SanityFile {
  asset: SanityFileAsset
}

export interface EmailSubscription {
  _id: string;
  email: string;
  zip: string;
  subscribedAt: string;
  isActive: boolean;
  source?: string;
}

export interface SurveyFormField {
  fieldName: string;
  fieldType: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface SurveyFormSection {
  title: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  fields: SurveyFormField[];
}

export interface SurveyForm {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  heroSection?: {
    name?: string;
    title?: string;
    contentType?: 'video' | 'image';
    videoFile?: {
      asset: {
        url: string;
      };
    };
    image?: {
      asset: {
        url: string;
      };
      alt?: string;
    };
  };
  formSection?: {
    name?: string;
    title?: string;
    image?: {
      asset: {
        url: string;
      };
      alt?: string;
    };
    fields: SurveyFormField[];
    additionalSections?: SurveyFormSection[];
  };
  postSubmissionSection?: {
    title?: string;
    products?: Array<{
      name: string;
      description?: string;
      image: {
        asset: {
          url: string;
        };
        alt?: string;
      };
      priceSection?: {
        priceName: string;
        priceValue: string;
      };
      options?: Array<{
        optionName: string;
        optionPrice?: string;
      }>;
      primaryButton?: {
        text?: string;
        link?: string;
      };
      secondaryButton?: {
        text?: string;
        link?: string;
      };
    }>;
  };
}

export interface NavLink {
  label: string
  href: string
  order: number
}

export interface NavbarCTA {
  text: string
  link?: string
}

export interface Navbar {
  _id: string
  logo: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  logoAlt: string
  links: NavLink[]
  ctaButton: NavbarCTA
}

export interface AnnouncementItem {
  icon?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  text: string
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  order: number
}

export interface AnnouncementBar {
  _id: string
  enabled: boolean
  backgroundColor?: string
  textColor?: string
  autoSlideInterval: number
  announcements: AnnouncementItem[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterSocialLinks {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
}

export interface Footer {
  _id: string
  logo: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  logoAlt: string
  contactEmail: string
  description: string
  learnMoreText: string
  learnMoreLink?: string
  newsletterTitle: string
  newsletterPlaceholder: string
  footerSections: FooterSection[]
  copyrightText: string
  socialLinks: FooterSocialLinks
}

export interface ConsultationInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface ConsultationSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface Consultation {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  infoSections: ConsultationInfoSection[]
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: ConsultationSlide[]
  }
}

export interface CustomDesignInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface CustomDesignSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface CustomDesignProcessSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  title: string
  description: string
}

export interface CustomDesign {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  designPhilosophy: {
    title: string
    description: string
  }
  infoSections: CustomDesignInfoSection[]
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: CustomDesignSlide[]
  }
  designProcess: {
    title: string
    description: string
    sections: CustomDesignProcessSection[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface MaintenanceInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface MaintenanceSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface MaintenanceStat {
  value: string
  label: string
}

export interface MaintenancePackage {
  name: string
  price: string
  priceDescription?: string
  features: string[]
  buttonText: string
  buttonLink?: string
  featured: boolean
}

export interface Maintenance {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  expertMaintenance: {
    title: string
    description: string
  }
  infoSections: MaintenanceInfoSection[]
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: MaintenanceSlide[]
  }
  emergencyService: {
    title: string
    description: string
    stats: MaintenanceStat[]
    buttonText: string
    buttonLink?: string
  }
  servicePricing: {
    packages: MaintenancePackage[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface TrainingInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
  bulletPoints: string[]
}

export interface TrainingSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface TrainingLevelCard {
  name: string
  description: string
}

export interface TrainingFacility {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  title: string
  description: string
  bulletPoints: string[]
}

export interface Training {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  infoSections: TrainingInfoSection[]
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: TrainingSlide[]
  }
  trainingLevels: {
    title: string
    description: string
    cards: TrainingLevelCard[]
  }
  trainingFacilities: {
    title: string
    description: string
    facilities: TrainingFacility[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface XodiumArmorInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface XodiumArmorSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface XodiumArmorSpecificationCard {
  name: string
  description: string
}

export interface XodiumArmorCountItem {
  name: string
  value: string
}

export interface XodiumArmor {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  manufacturingExcellence: {
    title: string
    description: string
  }
  infoSections: XodiumArmorInfoSection[]
  technicalSpecifications: {
    title: string
    countSection: XodiumArmorCountItem[]
    cards: XodiumArmorSpecificationCard[]
  }
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: XodiumArmorSlide[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface BR6ProtectionInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface BR6ProtectionCountItem {
  name: string
  value: string
}

export interface BR6ProtectionSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface BR6ProtectionThreatCard {
  title: string
  description: string
}

export interface BR6Protection {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  internationalCertifications: {
    title: string
    description: string
    countSection: BR6ProtectionCountItem[]
  }
  infoSections: BR6ProtectionInfoSection[]
  testingCertificationSlider: {
    mainName: string
    mainTitle: string
    slides: BR6ProtectionSlide[]
  }
  threatProtectionMatrix: {
    title: string
    description: string
    cards: BR6ProtectionThreatCard[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface HybridElectricInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface HybridElectricCountItem {
  name: string
  value: string
}

export interface HybridElectricSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface HybridElectricCard {
  title: string
  description: string
}

export interface HybridElectric {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  infoSections: HybridElectricInfoSection[]
  performanceMetrics: {
    title: string
    description: string
    countSection: HybridElectricCountItem[]
  }
  intelligentPowerManagement: {
    title: string
    description: string
    bulletPoints: string[]
    cards: HybridElectricCard[]
  }
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: HybridElectricSlide[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface SecuritySystemsInfoSection {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface SecuritySystemsCountItem {
  name: string
  value: string
}

export interface SecuritySystemsSlide {
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  name: string
  description: string
}

export interface SecuritySystemsCard {
  title: string
  description: string
}

export interface SecuritySystems {
  _id: string
  heroSection: {
    title: string
    description: string
  }
  infoSections: SecuritySystemsInfoSection[]
  securityFeatures: {
    title: string
    description: string
    bulletPoints?: string[]
    cards?: SecuritySystemsCard[]
  }
  advancedProtection: {
    title: string
    description: string
    bulletPoints: string[]
    cards: SecuritySystemsCard[]
  }
  sliderSection: {
    mainName: string
    mainTitle: string
    slides: SecuritySystemsSlide[]
  }
  callToAction: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export interface AboutUsHeroSection {
  sectionLabel: string
  mainHeading: string
}

export interface AboutUsContent {
  name: string
  description: string
  bulletPoints?: string[]
  buttonText?: string
  buttonLink?: string
}

export interface AboutUsForeverStartsNowSection {
  mainName: string
  mainTitle: string
  images: Array<{
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }>
  content: AboutUsContent
}

export interface AboutUsForeverCard {
  title: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description: string
}

export interface AboutUsForeverSection {
  title: string
  description: string
  cards: AboutUsForeverCard[]
}

export interface AboutUsCoreValueCard {
  title: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description: string
}

export interface AboutUsCoreValuesSection {
  title: string
  description: string
  cards: AboutUsCoreValueCard[]
}

export interface AboutUsLeadershipCard {
  Name: string
  title: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface AboutUsLeadershipTeamSection {
  title: string
  description: string
  cards: AboutUsLeadershipCard[]
}

export interface AboutUsByTheNumbersSection {
  title: string
  description: string
  countSection: Array<{
    name: string
    value: string
  }>
}

export interface AboutUsCallToAction {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export interface AboutUs {
  _id: string
  heroSection: AboutUsHeroSection
  foreverStartsNowSection: AboutUsForeverStartsNowSection
  ForeversSection: AboutUsForeverSection
  coreValuesSection: AboutUsCoreValuesSection
  leadershipTeamSection: AboutUsLeadershipTeamSection
  internByheNumbersSection: AboutUsByTheNumbersSection
  callToAction: AboutUsCallToAction
}

export interface TexasFacilityHeroSection {
  sectionLabel: string
  mainHeading: string
}

export interface TexasFacilityVideoSection {
  title?: string
  description?: string
  desktopVideoFile?: {
    asset: {
      _id: string
      url: string
    }
  }
  mobileVideoFile?: {
    asset: {
      _id: string
      url: string
    }
  }
  videoUrl?: string
  thumbnail?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface TexasFacilityFeatureCard {
  title: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface TexasFacilityFeatures {
  title: string
  description: string
  cards: TexasFacilityFeatureCard[]
}

export interface TexasFacilitySlide {
  name: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface TexasFacilitySliderSection {
  mainName: string
  mainTitle: string
  slides: TexasFacilitySlide[]
}

export interface TexasFacilityDesignProcessSection {
  title: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface TexasFacilityDesignProcess {
  title: string
  description: string
  sections: TexasFacilityDesignProcessSection[]
}

export interface TexasFacilityCountItem {
  name: string
  value: string
}

export interface TexasFacilityByTheNumbersSection {
  title: string
  description: string
  countSection: TexasFacilityCountItem[]
}

export interface TexasFacilityCallToAction {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export interface TexasFacility {
  _id: string
  heroSection: TexasFacilityHeroSection
  videoSection?: TexasFacilityVideoSection
  facilityFeatures: TexasFacilityFeatures
  sliderSection: TexasFacilitySliderSection
  designProcess: TexasFacilityDesignProcess
  byTheNumbersSection: TexasFacilityByTheNumbersSection
  callToAction: TexasFacilityCallToAction
}

export interface CareersHeroSection {
  sectionLabel: string
  mainHeading: string
}

export interface CareersManufacturingExcellence {
  title: string
  description: string
}

export interface CareersInfoSection {
  name: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface CareersPosition {
  name: string
  role: string
  location: string
  createdAt: string
  salary: string
  jobType: 'Hybrid' | 'In Person'
  slug: {
    current: string
  }
}

export interface CareersOpenPositions {
  title: string
  description: string
  positions: CareersPosition[]
}

export interface CareersBenefit {
  title: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export interface CareersBenefitsPerks {
  title: string
  description: string
  benefits: CareersBenefit[]
}

export interface CareersCountItem {
  name: string
  value: string
}

export interface CareersByTheNumbersSection {
  title: string
  description: string
  countSection: CareersCountItem[]
}

export interface CareersCallToAction {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export interface Careers {
  _id: string
  heroSection: CareersHeroSection
  manufacturingExcellence: CareersManufacturingExcellence
  infoSections: CareersInfoSection[]
  openPositions: CareersOpenPositions
  benefitsPerks: CareersBenefitsPerks
  byTheNumbersSection: CareersByTheNumbersSection
  callToAction: CareersCallToAction
}

export interface CustomerStoriesHeroSection {
  sectionLabel: string
  mainHeading: string
}

export interface CustomerStory {
  title: string
  image: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  slug: {
    current: string
  }
  excerpt: string
  content: any[] // Portable Text content
}

export interface CustomerStories {
  _id: string
  heroSection: CustomerStoriesHeroSection
  stories: CustomerStory[]
}

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: string
  featuredImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  eventDate: string
  eventEndDate?: string
  shortDescription: string
  detailDescription: string
  overviewText?: string
  additionalInfo?: string
  location: {
    venueName: string
    address: string
    mapLink?: string
  }
  registrationEnabled: boolean
  maxAttendees?: number
  featured: boolean
}

export interface EventsPageHeroSection {
  title: string
  description: string
}

export interface EventsPage {
  _id: string
  heroSection: EventsPageHeroSection
}

export interface EventRegistration {
  _id: string
  event: {
    _ref: string
    _type: string
  }
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  region: string
  zipCode: string
  getUpdates: boolean
  consentText?: string
  registeredAt: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended'
  notes?: string
}

export interface ContactPageEmail {
  label: string
  email: string
}

export interface ContactPagePhone {
  label: string
  phone: string
}

export interface ContactPageAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface ContactPageBusinessHours {
  day: string
  hours: string
}

export interface ContactPageHeroSection {
  title: string
  description: string
}

export interface ContactPageInfo {
  sectionTitle: string
  emails: ContactPageEmail[]
  phones: ContactPagePhone[]
  address: ContactPageAddress
  businessHours: ContactPageBusinessHours[]
}

export interface ContactPage {
  _id: string
  heroSection: ContactPageHeroSection
  contactInfo: ContactPageInfo
}

export interface ContactFormSubmission {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: string
  status: 'new' | 'read' | 'responded'
  notes?: string
}

export interface SupportQuestionAnswer {
  question: string
  answer: any[] // Portable Text content
}

export interface SupportSection {
  sectionTitle: string
  questions: SupportQuestionAnswer[]
}

export interface SupportCategory {
  name: string
  icon?: string
  mainTitle?: string
  sections: SupportSection[]
}

export interface SupportContactOption {
  type: 'contact' | 'chat' | 'call'
  label: string
  value?: string
  buttonText?: string
}

export interface SupportContactSection {
  title: string
  contactOptions: SupportContactOption[]
}

export interface SupportPage {
  _id: string
  title: string
  description: string
  searchPlaceholder?: string
  categories: SupportCategory[]
  contactSection: SupportContactSection
}

export interface InquiryFormReviewSection {
  title?: string
  privacyText?: string
  stayConnectedTitle?: string
  stayConnectedText?: string
  communicationReasons?: string[]
}

export interface InquiryFormField {
  fieldName: string
  fieldType: string
  options?: string[]
}

export interface InquiryFormAdditionalSection {
  title: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
  fields: InquiryFormField[]
}

export interface InquiryFormSection {
  name?: string
  title?: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
  fields: InquiryFormField[]
  additionalSections?: InquiryFormAdditionalSection[]
  reviewSection?: InquiryFormReviewSection
}

export interface InquiryFormHeroSection {
  name?: string
  title?: string
  contentType?: 'video' | 'image'
  videoFile?: {
    asset: {
      url: string
    }
  }
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
  primaryButton?: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
}

export interface InquiryForm {
  _id: string
  name: string
  slug: {
    current: string
  }
  heroSection?: InquiryFormHeroSection
  formSection?: InquiryFormSection
}