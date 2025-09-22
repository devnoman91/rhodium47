'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeaturePoint {
  id: string
  label: string
  title: string
  details: string[]
  position: { top: string; left: string }
}

const featurePoints: FeaturePoint[] = [
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
    position: { top: '15%', left: '78%' }
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
    position: { top: '85%', left: '42%' }
  }
]

const VehicleDiagram: React.FC = () => {
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
          className="bg-black rounded-[20px] p-12 md:p-16 lg:p-24 flex justify-center items-center relative"
          style={{ width: 'fit-content' }}
        >
          {/* Vehicle Image */}
          <img
            src="/imagecar.png"
            alt="Vehicle Features Diagram"
            className="object-contain flex-shrink-0"
            style={{ width: '1200px', height: '579px' }}
          />

          {/* Point A - Seats */}
          <div
            className="absolute"
            style={{
              top: '8%',
              left: '42%',
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => handleMouseEnter('A')}
            onMouseLeave={() => handleMouseLeave('A')}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => setActivePoint(activePoint === 'A' ? null : 'A')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-gray-300 hover:border-white transition-all duration-200">
                A
              </div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap">
                Seats
              </div>
            </motion.div>

            {/* Popup for Point A */}
            <AnimatePresence>
              {activePoint === 'A' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute z-50 bg-white rounded-lg shadow-xl p-6 w-80"
                  style={{
                    top: '-100px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="relative">
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Premium Seating Configuration</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Military-grade ballistic protection integrated into seat structure</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Climate-controlled leather upholstery with heating and cooling</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Multi-position adjustment with memory settings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Emergency ejection system compatibility</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Anti-vibration technology for smooth ride experience</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Point B - Storage Space */}
          <div
            className="absolute"
            style={{
              top: '15%',
              left: '78%',
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => handleMouseEnter('B')}
            onMouseLeave={() => handleMouseLeave('B')}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => setActivePoint(activePoint === 'B' ? null : 'B')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-gray-300 hover:border-white transition-all duration-200">
                B
              </div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap">
                Storage Space
              </div>
            </motion.div>

            {/* Popup for Point B */}
            <AnimatePresence>
              {activePoint === 'B' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute z-50 bg-white rounded-lg shadow-xl p-6 w-80"
                  style={{
                    top: '-100px',
                    left: '-200px'
                  }}
                >
                  <div className="relative">
                    <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Tactical Storage Solutions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Reinforced compartments with biometric locks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">EMP-resistant electronics storage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Quick-access weapon storage systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Climate-controlled sensitive equipment bay</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Modular organization system for mission-specific gear</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Point C - Payload */}
          <div
            className="absolute"
            style={{
              top: '85%',
              left: '42%',
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => handleMouseEnter('C')}
            onMouseLeave={() => handleMouseLeave('C')}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => setActivePoint(activePoint === 'C' ? null : 'C')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-gray-300 hover:border-white transition-all duration-200">
                C
              </div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap">
                Payload
              </div>
            </motion.div>

            {/* Popup for Point C */}
            <AnimatePresence>
              {activePoint === 'C' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute z-50 bg-white rounded-lg shadow-xl p-6 w-80"
                  style={{
                    top: '-250px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="relative">
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Heavy-Duty Payload Capacity</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Advanced suspension system for maximum load capacity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Reinforced chassis with titanium reinforcement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Hydraulic loading assistance system</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Integrated tie-down points and cargo management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">All-terrain capability with full payload</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Point D - Front/Bonnet */}
          <div
            className="absolute"
            style={{
              top: '25%',
              left: '20%',
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => handleMouseEnter('D')}
            onMouseLeave={() => handleMouseLeave('D')}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => setActivePoint(activePoint === 'D' ? null : 'D')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-gray-300 hover:border-white transition-all duration-200">
                D
              </div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium whitespace-nowrap">
                Engine Bay
              </div>
            </motion.div>

            {/* Popup for Point D */}
            <AnimatePresence>
              {activePoint === 'D' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute z-50 bg-white rounded-lg shadow-xl p-6 w-80"
                  style={{
                    top: '-100px',
                    left: '50px'
                  }}
                >
                  <div className="relative">
                    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Advanced Engine & Protection</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Military-grade engine protection systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Armored bonnet with blast-resistant materials</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Advanced cooling system for extreme conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">EMP-hardened electronic systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700 leading-relaxed">Quick-release hood for field maintenance</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default VehicleDiagram