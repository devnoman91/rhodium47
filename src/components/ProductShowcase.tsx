'use client'

import React, { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShowcaseProduct } from '@/content/types'

interface ProductShowcaseProps {
  products: ShowcaseProduct[]
}

// Animation variants for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products }) => {
  return (
    <section className="py-[80px] lg:py-24 bg-white">
      <div className="mx-auto px-6 px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {products.map((product, index) => (
            <ShowcaseCard
              key={product.slug.current}
              product={product}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Separate ShowcaseCard component for better performance
const ShowcaseCard: React.FC<{ product: ShowcaseProduct; index: number }> = React.memo(({ product, index }) => {
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ['start 80%', 'end 20%']
  })
  const words = useMemo(() => (product.description || '').split(' '), [product.description])

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group bg-[#F4F1F2] rounded-[16px] transition-colors duration-300"
    >
      <div className="flex items-center gap-6 flex-row-reverse justify-between">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="relative w-[280px] h-[240px]  rounded-tl-none rounded-tr-[20px] rounded-br-[20px] rounded-bl-none overflow-hidden bg-gray-200">
            <motion.img
              src={product.image.asset.url}
              alt={product.image.alt || product.title}
              className="w-full rounded-tl-none rounded-tr-[20px] rounded-br-[20px] rounded-bl-none h-full object-cover group-hover:scale-105 transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-2 px-[50px]">
          {/* Title */}
          <h3 className="text-[22px]  leading-[32px] tracking-[0] m-0 font-medium  text-black font-helvetica">
            {product.title}
          </h3>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-[16px] leading-[20px] tracking-[0] m-0 font-normal text-black font-helvetica flex flex-wrap"
          >
            {words.map((word, i) => {
              const start = i / words.length
              const end = (i + 1) / words.length
              const color = useTransform(scrollYProgress, [start, end], ['#7F7F7F', '#161618'])
              const opacity = useTransform(scrollYProgress, [start, end], [0.6, 1])
              return (
                <motion.span key={i} style={{ color, opacity }} className="mr-1">
                  {word}
                </motion.span>
              )
            })}
          </p>

        {/* Button */}
          <motion.button
            className="relative overflow-hidden px-[22px] py-[5px] rounded-[50px]
                      border border-black text-black font-helvetica
                      text-[16px] leading-[24px] font-medium w-fit block cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (product.buttonLink) {
                if (product.buttonLink.startsWith('http')) {
                  window.open(product.buttonLink, '_blank')
                } else {
                  window.location.href = product.buttonLink
                }
              }
            }}
          >
            {/* sliding overlay */}
            <span
              className="absolute inset-0 bg-black translate-x-full 
                        transition-transform duration-500 ease-in-out rounded-[50px]
                        group-hover:translate-x-0"
            />

            {/* text */}
            <span className="relative z-10 text-sm lg:text-base transition-colors duration-500 ease-in-out group-hover:text-white">
              {product.buttonText}
            </span>
          </motion.button>

        </div>
      </div>
    </motion.div>
  )
})

ShowcaseCard.displayName = 'ShowcaseCard'

export default ProductShowcase