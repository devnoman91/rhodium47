export interface Video {
  _id: string
  name: string
  subtitle?: string
  slug?: {
    current: string
  }
  contentType: 'video' | 'image'
  videoFile?: {
    asset: {
      _ref: string
      url: string
    }
  }
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  description?: string
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
    performanceSpecs?: Array<{
      label: string
      value: string
    }>
    physicalSpecs?: Array<{
      label: string
      value: string
    }>
    warrantySpecs?: Array<{
      label: string
      value: string
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