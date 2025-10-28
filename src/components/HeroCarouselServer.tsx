import { client } from '@/sanity/lib/client'
import { videoQueries } from '@/content/queries'
import { Video } from '@/content/types'
import HeroCarouselClient from './HeroCarouselClient'

// Server Component - Fetches data at build time or on request
export default async function HeroCarouselServer() {
  let videos: Video[] = []
  let error: string | null = null

  try {
    const fetchedVideos = await client.fetch(videoQueries.getAllVideos, {}, {
      // Enable caching for better performance
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (fetchedVideos && fetchedVideos.length > 0) {
      // Filter valid videos server-side
      videos = fetchedVideos.filter((video: Video) => {
        const hasRequiredFields = video && video.desktopName && video.contentType
        const hasValidContent =
          (video.contentType === 'video' && video.desktopVideoFile?.asset?.url) ||
          (video.contentType === 'image' && video.desktopImage?.asset?.url)
        return hasRequiredFields && hasValidContent
      })
    }

    if (videos.length === 0) {
      error = 'No valid video content available'
    }
  } catch (err) {
    console.error('Failed to fetch videos:', err)
    error = 'Failed to load videos'
  }

  // Pass data to client component
  return <HeroCarouselClient videos={videos} error={error} />
}
