export const videoQueries = {
  getAllVideos: `*[_type == "product-video"]{
    _id,
    name,
    subtitle,
    slug,
    contentType,
    videoFile{
      asset->{
        _ref,
        url
      }
    },
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    description
  }`,

  getVideoBySlug: (slug: string) => `*[_type == "product-video" && slug.current == "${slug}"][0]{
    _id,
    name,
    subtitle,
    slug,
    contentType,
    videoFile{
      asset->{
        _ref,
        url
      }
    },
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    description
  }`
}

export const homeAboutQuery = `
  *[_type == "home-about"][0] {
    sectionLabel,
    mainHeading,
    description
  }
`

export const productDetailsQuery = `
  *[_type == "product-detail"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    description
  }
`

export const productDetailBySlugQuery = `
  *[_type == "product-detail" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    description
  }
`

export const productBlogQuery = `
  *[_type == "product-blog"][0] {
    mainSectionTitle,
    products[] {
      title,
      category,
      description,
      slug,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`

export const productShowcaseQuery = `
  *[_type == "product-showcase"] | order(_createdAt asc) {
    productName,
    title,
    description,
    buttonText,
    buttonLink,
    slug,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`

export const showcaseInnovationQuery = `
  *[_type == "showcase-innovation"][0] {
    main {
      title,
      description,
      countSection[] {
        name,
        title
      }
    },
    blogSection[] {
      title,
      description,
      slug
    }
  }
`

export const protectionQuery = `
  *[_type == "protection"][0] {
    name,
    description,
    countSection[] {
      name,
      title
    }
  }
`

export const faqQuery = `
  *[_type == "frequently-asked-questions"][0] {
    name,
    description,
    questionsSection[] {
      category,
      name,
      description
    }
  }
`

export const utilityQuery = `
  *[_type == "utility"][0] {
    name,
    description,
    section[] {
      name,
      title
    }
  }
`

export const keepExploringQuery = `
  *[_type == "keep-exploring"][0] {
    name,
    description,
    section[] {
      name,
      link
    }
  }
`

export const newsUpdatesQuery = `
  *[_type == "news-updates"][0] {
    name,
    description,
    newsSection[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      title,
      description,
      slug
    }
  }
`

export const experienceXodiumQuery = `
  *[_type == "experience-xodium-technology"][0] {
    name,
    description,
    button {
      text,
      link
    }
  }
`

export const productQuery = `
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    heroSection {
      name,
      title,
      contentType,
      videoFile {
        asset-> {
          url
        }
      },
      enableSound,
      image {
        asset-> {
          url
        },
        alt
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    aboutSection {
      name,
      description,
      images[] {
        name,
        title,
        image {
          asset-> {
            url
          },
          alt
        },
        counts[] {
          name,
          title,
          value
        }
      }
    },
    interiorSection {
      name,
      description,
      sections[] {
        name,
        title,
        contentType,
        videoFile {
          asset-> {
            url
          }
        },
        image {
          asset-> {
            url
          },
          alt
        }
      }
    },
    fullSpectrumColorSection {
      name,
      sections[] {
        name,
        description,
        image {
          asset-> {
            url
          },
          alt
        }
      }
    },
    modelSpecsSection {
      title,
      specificationSections[] {
        name,
        image {
          asset-> {
            url
          },
          alt
        },
        specifications[] {
          label,
          value
        }
      },
      othersSection {
        title,
        bulletPoints[]
      }
    },
    warrantySection {
      name,
      title
    },
    othersSection {
      name,
      title,
      bulletPoints[]
    },
    showcaseInnovation {
      main {
        title,
        description
      },
      blogSection[] {
        title,
        description,
        slug
      }
    }
  }
`

export const productByIdQuery = (id: string) => `
  *[_type == "product" && _id == "${id}"][0] {
    _id,
    name,
    slug,
    heroSection {
      name,
      title,
      contentType,
      videoFile {
        asset-> {
          url
        }
      },
      enableSound,
      image {
        asset-> {
          url
        },
        alt
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    aboutSection {
      name,
      description,
      images[] {
        name,
        title,
        image {
          asset-> {
            url
          },
          alt
        },
        counts[] {
          name,
          title,
          value
        }
      }
    },
    interiorSection {
      name,
      description,
      sections[] {
        name,
        title,
        contentType,
        videoFile {
          asset-> {
            url
          }
        },
        image {
          asset-> {
            url
          },
          alt
        }
      }
    },
    fullSpectrumColorSection {
      name,
      sections[] {
        name,
        description,
        image {
          asset-> {
            url
          },
          alt
        }
      }
    },
    modelSpecsSection {
      title,
      specificationSections[] {
        name,
        image {
          asset-> {
            url
          },
          alt
        },
        specifications[] {
          label,
          value
        }
      },
      othersSection {
        title,
        bulletPoints[]
      }
    },
    warrantySection {
      name,
      title
    },
    othersSection {
      name,
      title,
      bulletPoints[]
    },
    showcaseInnovation {
      main {
        title,
        description
      },
      blogSection[] {
        title,
        description,
        slug
      }
    }
  }
`

export const productBySlugQuery = (slug: string) => `
  *[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    name,
    slug,
    heroSection {
      name,
      title,
      contentType,
      videoFile {
        asset-> {
          url
        }
      },
      enableSound,
      image {
        asset-> {
          url
        },
        alt
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    aboutSection {
      name,
      description,
      images[] {
        name,
        title,
        image {
          asset-> {
            url
          },
          alt
        },
        counts[] {
          name,
          title,
          value
        }
      }
    },
    interiorSection {
      name,
      description,
      sections[] {
        name,
        title,
        contentType,
        videoFile {
          asset-> {
            url
          }
        },
        image {
          asset-> {
            url
          },
          alt
        }
      }
    },
    fullSpectrumColorSection {
      name,
      sections[] {
        name,
        description,
        image {
          asset-> {
            url
          },
          alt
        }
      }
    },
    modelSpecsSection {
      title,
      specificationSections[] {
        name,
        image {
          asset-> {
            url
          },
          alt
        },
        specifications[] {
          label,
          value
        }
      },
      othersSection {
        title,
        bulletPoints[]
      }
    },
    warrantySection {
      name,
      title
    },
    othersSection {
      name,
      title,
      bulletPoints[]
    },
    showcaseInnovation {
      main {
        title,
        description
      },
      blogSection[] {
        title,
        description,
        slug
      }
    }
  }
`

import { client } from '../sanity/lib/client'
import { Product } from './types'

export const getAllProducts = async (): Promise<Product[]> => {
  return await client.fetch(productQuery)
}

export const getProductById = async (id: string): Promise<Product> => {
  return await client.fetch(productByIdQuery(id))
}

export const getProductBySlug = async (slug: string): Promise<Product> => {
  return await client.fetch(productBySlugQuery(slug))
}

export const surveyFormQuery = `
  *[_type == "surveyForm"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    heroSection {
      name,
      title,
      contentType,
      videoFile {
        asset-> {
          url
        }
      },
      enableSound,
      image {
        asset-> {
          url
        },
        alt
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    formSection {
      name,
      title,
      image {
        asset-> {
          url
        },
        alt
      },
      fields[] {
        fieldName,
        fieldType,
        placeholder,
        required,
        options[]
      },
      additionalSections[] {
        title,
        image {
          asset-> {
            url
          },
          alt
        },
        fields[] {
          fieldName,
          fieldType,
          placeholder,
          required,
          options[]
        }
      }
    },
    postSubmissionSection {
      title,
      products[] {
        name,
        description,
        image {
          asset-> {
            url
          },
          alt
        },
        priceSection {
          priceName,
          priceValue
        },
        options[] {
          optionName,
          optionPrice
        }
      }
    }
  }
`

export const surveyFormBySlugQuery = (slug: string) => `
  *[_type == "surveyForm" && slug.current == "${slug}"][0] {
    _id,
    name,
    slug,
    heroSection {
      name,
      title,
      contentType,
      videoFile {
        asset-> {
          url
        }
      },
      enableSound,
      image {
        asset-> {
          url
        },
        alt
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    formSection {
      name,
      title,
      image {
        asset-> {
          url
        },
        alt
      },
      fields[] {
        fieldName,
        fieldType,
        placeholder,
        required,
        options[]
      },
      additionalSections[] {
        title,
        image {
          asset-> {
            url
          },
          alt
        },
        fields[] {
          fieldName,
          fieldType,
          placeholder,
          required,
          options[]
        }
      }
    },
    postSubmissionSection {
      title,
      products[] {
        name,
        description,
        image {
          asset-> {
            url
          },
          alt
        },
        priceSection {
          priceName,
          priceValue
        },
        options[] {
          optionName,
          optionPrice
        }
      }
    }
  }
`

export const getAllSurveyForms = async () => {
  return await client.fetch(surveyFormQuery)
}

export const getSurveyFormBySlug = async (slug: string) => {
  return await client.fetch(surveyFormBySlugQuery(slug))
}

export const inquiryFormQuery = `
  *[_type == "inquiryForm"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    heroSection {
      name,
      title,
      contentType,
      videoFile {
        asset-> {
          url
        }
      },
      enableSound,
      image {
        asset-> {
          url
        },
        alt
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      }
    },
    formSection {
      name,
      title,
      image {
        asset-> {
          url
        },
        alt
      },
      fields[] {
        fieldName,
        fieldType,
        options[]
      },
      additionalSections[] {
        title,
        image {
          asset-> {
            url
          },
          alt
        },
        fields[] {
          fieldName,
          fieldType,
          options[]
        }
      }
    }
  }
`

export const getAllInquiryForms = async () => {
  return await client.fetch(inquiryFormQuery)
}

export const currentOffersQuery = `
  *[_type == "currentOffers"][0] {
    _id,
    title,
    offers[] {
      name,
      title,
      image {
        asset-> {
          url
        },
        alt
      },
      link
    }
  }
`

export const getCurrentOffers = async () => {
  return await client.fetch(currentOffersQuery)
}

export const navbarQuery = `
  *[_type == "navbar"][0] {
    _id,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    },
    logoAlt,
    links[] | order(order asc) {
      label,
      href,
      order
    },
    ctaButton {
      text,
      link
    }
  }
`

export const getNavbar = async () => {
  return await client.fetch(navbarQuery)
}

export const footerQuery = `
  *[_type == "footer"][0] {
    _id,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    },
    logoAlt,
    contactEmail,
    description,
    learnMoreText,
    learnMoreLink,
    newsletterTitle,
    newsletterPlaceholder,
    footerSections[] {
      title,
      links[] {
        label,
        href
      }
    },
    copyrightText,
    socialLinks {
      facebook,
      twitter,
      instagram,
      linkedin
    }
  }
`

export const getFooter = async () => {
  return await client.fetch(footerQuery)
}

export const consultationQuery = `
  *[_type == "consultation"][0] {
    _id,
    heroSection {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    }
  }
`

export const getConsultation = async () => {
  return await client.fetch(consultationQuery)
}

export const customDesignQuery = `
  *[_type == "customDesign"][0] {
    _id,
    heroSection {
      title,
      description
    },
    designPhilosophy {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    designProcess {
      title,
      description,
      sections[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        title,
        description
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getCustomDesign = async () => {
  return await client.fetch(customDesignQuery)
}

export const maintenanceQuery = `
  *[_type == "maintenance"][0] {
    _id,
    heroSection {
      title,
      description
    },
    expertMaintenance {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    emergencyService {
      title,
      description,
      stats[] {
        value,
        label
      },
      buttonText,
      buttonLink
    },
    servicePricing {
      packages[] {
        name,
        price,
        priceDescription,
        features[],
        buttonText,
        buttonLink,
        featured
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getMaintenance = async () => {
  return await client.fetch(maintenanceQuery)
}

export const trainingQuery = `
  *[_type == "training"][0] {
    _id,
    heroSection {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description,
      bulletPoints[]
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    trainingLevels {
      title,
      description,
      cards[] {
        name,
        description
      }
    },
    trainingFacilities {
      title,
      description,
      facilities[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        title,
        description,
        bulletPoints[]
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getTraining = async () => {
  return await client.fetch(trainingQuery)
}

export const xodiumArmorQuery = `
  *[_type == "xodiumArmor"][0] {
    _id,
    heroSection {
      title,
      description
    },
    manufacturingExcellence {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    technicalSpecifications {
      title,
      countSection[] {
        name,
        value
      },
      cards[] {
        name,
        description
      }
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getXodiumArmor = async () => {
  return await client.fetch(xodiumArmorQuery)
}

export const br6ProtectionQuery = `
  *[_type == "br6Protection"][0] {
    _id,
    heroSection {
      title,
      description
    },
    internationalCertifications {
      title,
      description,
      countSection[] {
        name,
        value
      }
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    testingCertificationSlider {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    threatProtectionMatrix {
      title,
      description,
      cards[] {
        title,
        description
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getBR6Protection = async () => {
  return await client.fetch(br6ProtectionQuery)
}

export const hybridElectricQuery = `
  *[_type == "hybridElectric"][0] {
    _id,
    heroSection {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    performanceMetrics {
      title,
      description,
      countSection[] {
        name,
        value
      }
    },
    intelligentPowerManagement {
      title,
      description,
      bulletPoints[],
      cards[] {
        title,
        description
      }
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getHybridElectric = async () => {
  return await client.fetch(hybridElectricQuery)
}

export const securitySystemsQuery = `
  *[_type == "securitySystems"][0] {
    _id,
    heroSection {
      title,
      description
    },
    infoSections[] {
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      name,
      description
    },
    securityFeatures {
      title,
      description,
      bulletPoints[],
      cards[] {
        title,
        description
      }
    },
    advancedProtection {
      title,
      description,
      bulletPoints[],
      cards[] {
        title,
        description
      }
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getSecuritySystems = async () => {
  return await client.fetch(securitySystemsQuery)
}

export const aboutUsQuery = `
  *[_type == "aboutUs"][0] {
    _id,
    heroSection {
      sectionLabel,
      mainHeading
    },
    foreverStartsNowSection {
      mainName,
      mainTitle,
      slides[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        name,
        description,
        bulletPoints[]
      }
    },
    ForeversSection {
      title,
      description,
      cards[] {
        title,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        description
      }
    },
    coreValuesSection {
      title,
      description,
      cards[] {
        title,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        description
      }
    },
    leadershipTeamSection {
      title,
      description,
      cards[] {
        Name,
        title,
        description,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    internByheNumbersSection {
      title,
      description,
      countSection[] {
        name,
        value
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getAboutUs = async () => {
  return await client.fetch(aboutUsQuery)
}

export const texasFacilityQuery = `
  *[_type == "texasFacility"][0] {
    _id,
    heroSection {
      sectionLabel,
      mainHeading
    },
    manufacturingExcellence {
      title,
      description
    },
    infoSections[] {
      name,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    },
    facilityFeatures {
      title,
      description,
      cards[] {
        title,
        description,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    sliderSection {
      mainName,
      mainTitle,
      slides[] {
        name,
        description,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    designProcess {
      title,
      description,
      sections[] {
        title,
        description,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    byTheNumbersSection {
      title,
      description,
      countSection[] {
        name,
        value
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getTexasFacility = async () => {
  return await client.fetch(texasFacilityQuery)
}

export const careersQuery = `
  *[_type == "careers"][0] {
    _id,
    heroSection {
      sectionLabel,
      mainHeading
    },
    manufacturingExcellence {
      title,
      description
    },
    infoSections[] {
      name,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    },
    openPositions {
      title,
      description,
      positions[] {
        name,
        role,
        location,
        createdAt,
        salary,
        jobType,
        slug
      }
    },
    benefitsPerks {
      title,
      description,
      benefits[] {
        title,
        description,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    byTheNumbersSection {
      title,
      description,
      countSection[] {
        name,
        value
      }
    },
    callToAction {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`

export const getCareers = async () => {
  return await client.fetch(careersQuery)
}

export const customerStoriesQuery = `
  *[_type == "customerStories"][0] {
    _id,
    heroSection {
      sectionLabel,
      mainHeading
    },
    stories[] {
      title,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      slug,
      excerpt,
      content
    }
  }
`

export const getCustomerStories = async () => {
  return await client.fetch(customerStoriesQuery)
}

export const customerStoryBySlugQuery = (slug: string) => `
  *[_type == "customerStories"][0] {
    stories[slug.current == "${slug}"][0] {
      title,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      slug,
      excerpt,
      content[] {
        ...,
        _type == "image" => {
          ...,
          asset-> {
            _id,
            url
          }
        }
      }
    }
  }
`

export const getCustomerStoryBySlug = async (slug: string) => {
  return await client.fetch(customerStoryBySlugQuery(slug))
}

export const eventsPageQuery = `
  *[_type == "eventsPage"][0] {
    _id,
    heroSection {
      title,
      description
    }
  }
`

export const getEventsPage = async () => {
  return await client.fetch(eventsPageQuery)
}

export const eventsQuery = `
  *[_type == "event"] | order(eventDate desc) {
    _id,
    title,
    slug,
    category,
    featuredImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    eventDate,
    eventEndDate,
    shortDescription,
    detailDescription,
    overviewText,
    additionalInfo,
    location {
      venueName,
      address,
      mapLink
    },
    registrationEnabled,
    maxAttendees,
    featured
  }
`

export const getAllEvents = async () => {
  return await client.fetch(eventsQuery)
}

export const eventBySlugQuery = (slug: string) => `
  *[_type == "event" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    category,
    featuredImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    eventDate,
    eventEndDate,
    shortDescription,
    detailDescription,
    overviewText,
    additionalInfo,
    location {
      venueName,
      address,
      mapLink
    },
    registrationEnabled,
    maxAttendees,
    featured
  }
`

export const getEventBySlug = async (slug: string) => {
  return await client.fetch(eventBySlugQuery(slug))
}

export const featuredEventsQuery = `
  *[_type == "event" && featured == true] | order(eventDate desc) {
    _id,
    title,
    slug,
    category,
    featuredImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    eventDate,
    shortDescription,
    featured
  }
`

export const getFeaturedEvents = async () => {
  return await client.fetch(featuredEventsQuery)
}

export const eventRegistrationsQuery = `
  *[_type == "eventRegistration"] | order(registeredAt desc) {
    _id,
    event {
      _ref,
      _type
    },
    firstName,
    lastName,
    email,
    phoneNumber,
    region,
    zipCode,
    getUpdates,
    consentText,
    registeredAt,
    status,
    notes
  }
`

export const getAllEventRegistrations = async () => {
  return await client.fetch(eventRegistrationsQuery)
}

export const eventRegistrationsByEventQuery = (eventId: string) => `
  *[_type == "eventRegistration" && event._ref == "${eventId}"] | order(registeredAt desc) {
    _id,
    event {
      _ref,
      _type
    },
    firstName,
    lastName,
    email,
    phoneNumber,
    region,
    zipCode,
    getUpdates,
    consentText,
    registeredAt,
    status,
    notes
  }
`

export const getEventRegistrationsByEvent = async (eventId: string) => {
  return await client.fetch(eventRegistrationsByEventQuery(eventId))
}

export const contactPageQuery = `
  *[_type == "contactPage"][0] {
    _id,
    heroSection {
      title,
      description
    },
    contactInfo {
      sectionTitle,
      email1,
      email2,
      phone1,
      phone2,
      address {
        street,
        city,
        state,
        zipCode,
        country
      },
      businessHours[] {
        day,
        hours
      }
    }
  }
`

export const getContactPage = async () => {
  return await client.fetch(contactPageQuery)
}

export const contactFormSubmissionsQuery = `
  *[_type == "contactFormSubmission"] | order(submittedAt desc) {
    _id,
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    submittedAt,
    status,
    notes
  }
`

export const getAllContactFormSubmissions = async () => {
  return await client.fetch(contactFormSubmissionsQuery)
}

export const contactFormSubmissionsByStatusQuery = (status: string) => `
  *[_type == "contactFormSubmission" && status == "${status}"] | order(submittedAt desc) {
    _id,
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    submittedAt,
    status,
    notes
  }
`

export const getContactFormSubmissionsByStatus = async (status: string) => {
  return await client.fetch(contactFormSubmissionsByStatusQuery(status))
}

export const supportPageQuery = `
  *[_type == "support-page"][0] {
    _id,
    title,
    description,
    searchPlaceholder,
    categories[] {
      name,
      icon,
      content
    },
    contactSection {
      title,
      contactOptions[] {
        type,
        label,
        value,
        buttonText
      }
    }
  }
`

export const getSupportPage = async () => {
  return await client.fetch(supportPageQuery)
}