'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
      asset: {
        url: string
      }
      alt?: string
    }
    featurePoints: FeaturePoint[]
  }
}

const VehicleDiagram: React.FC<VehicleDiagramProps> = ({ data }) => {
  // Fallback data if no Sanity data is provided
  const defaultFeaturePoints: FeaturePoint[] = [
    {
      id: 'A',
      label: 'Seats',
      title: 'Premium Seating Configuration',
      details: [
        'Military-grade ballistic protection integrated into seat structure',
        'Climate-controlled leather upholstery with heating and cooling',
        'Multi-position adjustment with memory settings',
        'Emergency ejection system compatibility',
        'Anti-vibration technology for smooth ride experience'
      ],
      position: { top: '8%', left: '42%' }
    },
    {
      id: 'B',
      label: 'Storage Space',
      title: 'Tactical Storage Solutions',
      details: [
        'Reinforced compartments with biometric locks',
        'EMP-resistant electronics storage',
        'Quick-access weapon storage systems',
        'Climate-controlled sensitive equipment bay',
        'Modular organization system for mission-specific gear'
      ],
      position: { top: '15%', left: '78%' },
      popupPosition: { top: '-100px', left: '-200px' }
    },
    {
      id: 'C',
      label: 'Payload',
      title: 'Heavy-Duty Payload Capacity',
      details: [
        'Advanced suspension system for maximum load capacity',
        'Reinforced chassis with titanium reinforcement',
        'Hydraulic loading assistance system',
        'Integrated tie-down points and cargo management',
        'All-terrain capability with full payload'
      ],
      position: { top: '85%', left: '42%' },
      popupPosition: { top: '-250px', left: '50%', transform: 'translateX(-50%)' }
    },
    {
      id: 'D',
      label: 'Engine Bay',
      title: 'Advanced Engine & Protection',
      details: [
        'Military-grade engine protection systems',
        'Armored bonnet with blast-resistant materials',
        'Advanced cooling system for extreme conditions',
        'EMP-hardened electronic systems',
        'Quick-release hood for field maintenance'
      ],
      position: { top: '25%', left: '20%' },
      popupPosition: { top: '-100px', left: '50px' }
    }
  ]

  const featurePoints = data?.featurePoints || defaultFeaturePoints
  const vehicleImage = data?.vehicleImage?.asset?.url || '/imagecar.png'
  const vehicleImageAlt = data?.vehicleImage?.alt || 'Vehicle Features Diagram'
  const [activePoint, setActivePoint] = useState<string | null>(null)
  const [hoverTimeouts, setHoverTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({})

  const handleMouseEnter = (pointId: string) => {
    // Clear any existing timeout for this point
    if (hoverTimeouts[pointId]) {
      clearTimeout(hoverTimeouts[pointId])
    }
    setActivePoint(pointId)
  }

  const handleMouseLeave = (pointId: string) => {
    // Set a delay before closing to allow moving to popup
    const timeout = setTimeout(() => {
      setActivePoint(null)
    }, 300)

    setHoverTimeouts(prev => ({ ...prev, [pointId]: timeout }))
  }

  return (
    <div className="bg-white py-16 lg:py-24 px-28">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-black rounded-[20px] p-[40px] flex justify-center items-center "
          style={{ width: 'fit-content' }}
        >
          <div className="relative p-[100px] rounded-[12px] [background:linear-gradient(0deg,_#0F0F0F_0%,_#2A2A2A_100%)]">
              {/* Vehicle Image */}
              <img
                src={vehicleImage}
                alt={vehicleImageAlt}
                className="object-contain flex-shrink-0"
                style={{ width: '1200px', height: '579px' }}
              />

              {/* Dynamic Feature Points */}
              {featurePoints.map((point) => {
                const popupStyle = point.popupPosition || {}
                const defaultPopupStyle = {
                  top: popupStyle.top || '-100px',
                  left: popupStyle.left || '50%',
                  transform: popupStyle.transform || 'translateX(-50%)'
                }

                return (
                  <div
                    key={point.id}
                    className="absolute"
                    style={{
                      top: point.position.top,
                      left: point.position.left,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => handleMouseEnter(point.id)}
                    onMouseLeave={() => handleMouseLeave(point.id)}
                  >
                    <motion.div
                      className="cursor-pointer"
                      onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-gray-300 hover:border-white transition-all duration-200">
                        {point.id}
                      </div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap">
                        {point.label}
                      </div>
                    </motion.div>

                    {/* Popup */}
                    <AnimatePresence>
                      {activePoint === point.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.9 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          className="absolute z-50 bg-white rounded-lg shadow-xl p-6 w-80"
                          style={defaultPopupStyle}
                        >
                          <div className="relative">
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                            <ul className="space-y-2">
                              {point.details.map((detail, index) => (
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
              })}

          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VehicleDiagram