export interface Video {
  _id: string
  name: string
  subtitle?: string
  slug?: {
    current: string
  }
  videoFile: {
    asset: {
      _ref: string
      url: string
    }
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