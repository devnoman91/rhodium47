'use client'

import React, { useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FAQ, FAQQuestion } from '@/content/types'

interface FAQSectionProps {
  data: FAQ
}

// Animation variants for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const accordionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 0.95
  }
}

const FAQSection: React.FC<FAQSectionProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string>('General')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = useMemo(() => data.description.split(' '), [data.description])

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(data.questionsSection.map(q => q.category))]
    return uniqueCategories.sort()
  }, [data.questionsSection])

  // Filter questions by active category
  const filteredQuestions = useMemo(() => {
    return data.questionsSection.filter(q => q.category === activeCategory)
  }, [data.questionsSection, activeCategory])

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
    setExpandedQuestion(null)
  }, [])

  const toggleQuestion = useCallback((questionName: string) => {
    setExpandedQuestion(current => current === questionName ? null : questionName)
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12 lg:mb-16">
            {/* Left - Title */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {data.name}
              </h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-center"
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <p
                ref={descriptionRef}
                className="text-lg lg:text-xl leading-relaxed flex flex-wrap"
              >
                {words.map((word, i) => {
                  const start = i / words.length
                  const end = (i + 1) / words.length
                  const color = useTransform(scrollYProgress, [start, end], ['#9CA3AF', '#FFFFFF'])
                  const opacity = useTransform(scrollYProgress, [start, end], [0.6, 1])
                  return (
                    <motion.span key={i} style={{ color, opacity }} className="mr-2">
                      {word}
                    </motion.span>
                  )
                })}
              </p>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mb-12 lg:mb-16"
          >
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredQuestions.map((question, index) => (
                <FAQAccordion
                  key={question.name}
                  question={question}
                  index={index}
                  isExpanded={expandedQuestion === question.name}
                  onToggle={() => toggleQuestion(question.name)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Separate FAQAccordion component for better performance
const FAQAccordion: React.FC<{
  question: FAQQuestion
  index: number
  isExpanded: boolean
  onToggle: () => void
}> = React.memo(({ question, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      layout
      variants={accordionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 lg:p-8 text-left hover:bg-gray-800/70 transition-colors duration-200 flex items-center justify-between group"
      >
        <h3 className="text-lg lg:text-xl font-bold text-white pr-4 group-hover:text-gray-100 transition-colors duration-200">
          {question.name}
        </h3>

        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-6 h-6 text-gray-400 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-8 pb-6 lg:pb-8">
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {question.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

FAQAccordion.displayName = 'FAQAccordion'

export default FAQSection