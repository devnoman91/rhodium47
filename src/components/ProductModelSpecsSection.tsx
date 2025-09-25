'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Specification {
  label: string
  value: string
}

interface SpecificationSection {
  name: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
  specifications: Specification[]
}

interface ProductModelSpecsSectionProps {
  modelSpecsSection: {
    title?: string
    specificationSections?: SpecificationSection[]
    othersSection?: {
      name?: string
      title?: string
      bulletPoints?: string[]
    }
  }
}


const ProductModelSpecsSection: React.FC<ProductModelSpecsSectionProps> = ({ modelSpecsSection }) => {
  if (!modelSpecsSection) return null

  const { title = 'Model Specs', specificationSections = [], othersSection } = modelSpecsSection

  return (
    <section className="py-16 lg:py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h1 className="text-white font-helvetica text-[64px] font-medium leading-[80px]">
            {title}
          </h1>
        </motion.div>

        {/* Specifications Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {specificationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-[40px]">
              {/* Section specifications in grid */}
              <div className="mb-[30px] flex flex-row text-black text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] tracking-normal m-0 font-normal font-helvetica items-center uppercase">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <h4 className="text-white font-helvetica text-base font-normal leading-[120%] tracking-[-0.32px] uppercase">{section.name}</h4>

              </div>
              <div className="flex items-start gap-[60px] flex-wrap">
                {section.specifications.map((spec, specIndex) => (
                  <motion.div
                    key={specIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: specIndex * 0.1 }}
                    className="flex flex-col"
                  >
                    <div className="flex flex-col">
                      <h3 className="text-white text-base font-normal leading-[150%] capitalize font-helvetica">
                        {spec.label}
                      </h3>
                      <p className="text-white text-base font-normal leading-[150%] capitalize font-helvetica">
                        {spec.value}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Section Image */}
                {section.image?.asset?.url && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex-shrink-0 ml-auto"
                  >
                    <img
                      src={section.image.asset.url}
                      alt={section.image.alt || section.name}
                      className="max-w-full h-auto rounded-lg"
                    />
                  </motion.div>
                )}
              </div>

              {/* Separator line between sections */}
              {sectionIndex < specificationSections.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-full h-px bg-white/20 mt-[40px]"
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          ))}
    {/* Others Section */}
        {othersSection && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 lg:mt-20"
          >
            {/* Separator line before Others section */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full h-px  mb-12 lg:mb-16"
              style={{ transformOrigin: 'left' }}
            />

          {/* Other Section Content */}
          {othersSection?.title && (
            <h2 className="text-white font-helvetica text-2xl font-medium leading-tight mb-8 uppercase">
              {othersSection.title}
            </h2>
          )}

          {othersSection?.bulletPoints && othersSection.bulletPoints.length > 0 && (
            <div className="space-y-4">
              {othersSection.bulletPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white font-helvetica text-base font-normal leading-[150%]">
                    {point}
                  </p>
                </motion.div>
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