'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface FeaturePoint {
  id: string
  label: string
  title: string
  details: string[]
  position: { top: string; left: string }
  popupPosition?: { top?: string; left?: string; transform?: string }
}

interface VehicleDiagramProps {
  data?: {
    name: string
    vehicleImage: {
      asset: { url: string }
      alt?: string
    }
    featurePoints: FeaturePoint[]
  }
}

const VehicleDiagram: React.FC<VehicleDiagramProps> = ({ data }) => {
  const featurePoints = data?.featurePoints
  const vehicleImage = data?.vehicleImage?.asset?.url || '/imagecar.png'
  const vehicleImageAlt = data?.vehicleImage?.alt || 'Vehicle Features Diagram'

  const [activePoint, setActivePoint] = useState<string | null>(null)
  const [hoverTimeouts, setHoverTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({})
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleMouseEnter = (pointId: string) => {
    if (hoverTimeouts[pointId]) clearTimeout(hoverTimeouts[pointId])
    setActivePoint(pointId)
  }

  const handleMouseLeave = (pointId: string) => {
    if (isMobile) return // no hover effect on mobile
    const timeout = setTimeout(() => {
      setActivePoint(null)
    }, 300)
    setHoverTimeouts(prev => ({ ...prev, [pointId]: timeout }))
  }

  return (
    <div className="bg-white py-0 px-0 lg:py-24 lg:px-28">
      <div className="flex justify-center w-full px-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#560100] rounded-[20px] p-2 sm:p-4 md:p-[20px] lg:p-[40px] flex justify-center items-center !w-full max-w-full "
          style={{ width: 'fit-content' }}
        >
          <div className="relative pl-6 pr-4 sm:p-4 md:p-6 lg:p-[100px] rounded-[12px] [background:linear-gradient(0deg,_#0F0F0F_0%,_#2A2A2A_100%)] w-full max-w-full">
            {/* Vehicle Image - Optimized with Next/Image */}
            <div className="relative w-full" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <Image
                src={vehicleImage}
                alt={vehicleImageAlt}
                width={1200}
                height={675}
                quality={85}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 1200px"
                className="object-contain w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Feature Points */}
            {featurePoints?.map((point) => {
              const popupStyle = point.popupPosition || {}
              const defaultPopupStyle = {
                top: popupStyle.top || '-100px',
                left: popupStyle.left || '50%',
                transform: popupStyle.transform || 'translateX(-50%)',
              }

              return (
                <div
                  key={point.id}
                  className="absolute"
                  style={{
                    top: point.position.top,
                    left: point.position.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => handleMouseEnter(point.id)}
                  onMouseLeave={() => handleMouseLeave(point.id)}
                >
                  <motion.div
                    className="cursor-pointer"
                    onClick={() =>
                      setActivePoint(activePoint === point.id ? null : point.id)
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="md:w-8 w-6 md:h-8 h-6 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-base sm:text-lg shadow-lg border-2 border-gray-300 hover:border-white transition-all duration-200">
                      {point.id}
                    </div>
                    <div className="absolute top-10 lg:block hidden left-1/2 transform -translate-x-1/2 text-white text-xs sm:text-sm font-medium whitespace-nowrap">
                      {point.label}
                    </div>
                  </motion.div>

                  {/* Popup */}
                  <AnimatePresence>
                    {activePoint === point.id && !isMobile && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute z-50 bg-white rounded-lg shadow-xl p-4 sm:p-6 w-64 sm:w-80"
                        style={defaultPopupStyle}
                      >
                        <div className="relative">
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rotate-45 shadow-lg"></div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                            {point.title}
                          </h3>
                          <ul className="space-y-2">
                            {point.details.map((detail, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Mobile Center Popup */}
      <AnimatePresence>
        {isMobile && activePoint && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4"
            onClick={() => setActivePoint(null)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 text-lg"
                onClick={() => setActivePoint(null)}
              >
                ✕
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {featurePoints?.find(p => p.id === activePoint)?.title}
              </h3>
              <ul className="space-y-2">
                {featurePoints
                  ?.find(p => p.id === activePoint)
                  ?.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VehicleDiagram
