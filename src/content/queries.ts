export const videoQueries = {
  getAllVideos: `*[_type == "product-video"]{
    _id,
    name,
    subtitle,
    slug,
    videoFile{
      asset->{
        _ref,
        url
      }
    },
    description
  }`,

  getVideoBySlug: (slug: string) => `*[_type == "product-video" && slug.current == "${slug}"][0]{
    _id,
    name,
    subtitle,
    slug,
    videoFile{
      asset->{
        _ref,
        url
      }
    },
    description
  }`
}