'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ProductModelSpecsSectionProps {
  modelSpecsSection: {
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
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const ProductModelSpecsSection: React.FC<ProductModelSpecsSectionProps> = ({ modelSpecsSection }) => {
  return (
    <section className="py-16 lg:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="text-[48px] lg:text-[64px] font-light font-helvetica leading-[110%] mb-16 lg:mb-20"
          >
            {modelSpecsSection.title || 'Model Specs'}
          </motion.h2>

          {/* Performance Specifications */}
          {modelSpecsSection.performanceSpecs && modelSpecsSection.performanceSpecs.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-12">
                {modelSpecsSection.performanceSpecs.map((spec, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-left"
                  >
                    <div className="text-[14px] lg:text-[16px] text-gray-400 font-helvetica mb-2 leading-[120%]">
                      {spec.label}
                    </div>
                    <div className="text-[16px] lg:text-[18px] text-white font-helvetica font-normal leading-[120%]">
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Horizontal divider line */}
              <motion.div
                className="h-[1px] bg-gray-600 w-full mt-12 lg:mt-16"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
            </motion.div>
          )}

          {/* Physical Specifications */}
          {modelSpecsSection.physicalSpecs && modelSpecsSection.physicalSpecs.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {modelSpecsSection.physicalSpecs.map((spec, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-left"
                  >
                    <div className="text-[14px] lg:text-[16px] text-gray-400 font-helvetica mb-2 leading-[120%]">
                      {spec.label}
                    </div>
                    <div className="text-[16px] lg:text-[18px] text-white font-helvetica font-normal leading-[120%]">
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Horizontal divider line */}
              <motion.div
                className="h-[1px] bg-gray-600 w-full mt-12 lg:mt-16"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
            </motion.div>
          )}

          {/* Warranty & Service Specifications */}
          {modelSpecsSection.warrantySpecs && modelSpecsSection.warrantySpecs.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {modelSpecsSection.warrantySpecs.map((spec, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-left"
                  >
                    <div className="text-[14px] lg:text-[16px] text-gray-400 font-helvetica mb-2 leading-[120%]">
                      {spec.label}
                    </div>
                    <div className="text-[16px] lg:text-[18px] text-white font-helvetica font-normal leading-[120%] whitespace-pre-line">
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Horizontal divider line */}
              <motion.div
                className="h-[1px] bg-gray-600 w-full mt-12 lg:mt-16"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
            </motion.div>
          )}

          {/* Others Section */}
          {modelSpecsSection.othersSection && (
            <motion.div variants={itemVariants} className="mt-12 lg:mt-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-white rounded-full" />
                <h3 className="text-[16px] lg:text-[18px] text-white font-helvetica font-normal uppercase tracking-wider">
                  {modelSpecsSection.othersSection.title || 'OTHERS'}
                </h3>
              </div>

              {modelSpecsSection.othersSection.bulletPoints && modelSpecsSection.othersSection.bulletPoints.length > 0 && (
                <div className="space-y-4">
                  {modelSpecsSection.othersSection.bulletPoints.map((point, index) => (
                    <motion.p
                      key={index}
                      variants={itemVariants}
                      className="text-[14px] lg:text-[16px] text-gray-300 font-helvetica leading-[140%] max-w-4xl"
                    >
                      {point}
                    </motion.p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ProductModelSpecsSection