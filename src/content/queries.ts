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