'use client'

import { Video } from '@/content/types'

interface VideoControlsProps {
  videos: Video[]
  currentIndex: number
  onSlideChange: (index: number) => void
}

export default function VideoControls({ videos, currentIndex, onSlideChange }: VideoControlsProps) {
  return (
    <div className="absolute bottom-8 left-8 md:left-16 flex items-center space-x-4">
      <div className="flex space-x-1">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`text-2xl font-bold transition-all ${
              index === currentIndex ? 'text-white' : 'text-white text-opacity-40'
            }`}
            aria-label={`Go to video ${index + 1}`}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="w-32 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
        />
      </div>
    </div>
  )
}