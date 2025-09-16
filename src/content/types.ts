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