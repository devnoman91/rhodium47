'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      duration: 0.4,
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const accordionVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const FAQSection: React.FC<FAQSectionProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string>('General')
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<number | null>(null)

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(data.questionsSection.map(q => q.category))]
    return uniqueCategories.sort()
  }, [data.questionsSection])

  // Filter questions by active category
  const filteredQuestions = useMemo(() => {
    return data.questionsSection.filter(q => q.category === activeCategory)
  }, [data.questionsSection, activeCategory])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setExpandedQuestionIndex(null) // Always close any open item when switching categories
  }

  const toggleQuestion = (index: number) => {
    // Close if same item, otherwise open the new item (automatically closes others)
    setExpandedQuestionIndex(prev => prev === index ? null : index)
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 [25px] mb-[25px] items-start">
            {/* Left - Title */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h1 className="text-[64px] not-italic tracking-normal leading-[80px] font-medium  font-helvetica text-white mb-0">
                {data.name}
              </h1>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex items-center max-w-[450px] ml-auto"
            >
              <p className="text-[16px] leading-[25px] tracking-[0] m-0 font-normal font-helvetica opacity-80 ">
                {data.description}
              </p>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <motion.div
            variants={itemVariants}
            className="mb-[50px] w-fit"
          >
            <div className="tabs relative flex gap-2 p-1 w-fit bg-[#f4f4f5] border border-[#cfcfcf] rounded-[100px] shadow-lg">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`tab relative px-4 py-3 border-none min-w-[140px] bg-transparent rounded-[100px] text-base cursor-pointer font-medium h-fit transition-colors duration-300 font-helvetica ${
                    activeCategory === category
                      ? 'text-white z-10'
                      : 'text-[#71717a] hover:text-[#555]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 min-w-[140px] bg-black rounded-[100px] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 0.5
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="grid grid-cols-1  items-start lg:grid-cols-2 gap-[25px]">
            {filteredQuestions.map((question, index) => (
              <FAQAccordion
                key={`${activeCategory}-${index}`}
                question={question}
                index={index}
                isExpanded={expandedQuestionIndex === index}
                onToggle={() => toggleQuestion(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Simplified FAQAccordion component without React.memo to avoid stale closures
const FAQAccordion: React.FC<{
  question: FAQQuestion
  index: number
  isExpanded: boolean
  onToggle: () => void
}> = ({ question, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      variants={accordionVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05
      }}
      className="rounded-[10px] bg-[rgba(255,255,255,0.05)] overflow-hidden"
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="w-full text-left transition-colors duration-200 flex items-center justify-between group py-[32px] px-[18px] cursor-pointer"
      >
        <h3 className="text-white font-helvetica text-[20px] not-italic font-normal leading-[28px]">
          {question.name}
        </h3>

        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-6 h-6 text-white flex-shrink-0"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-[20px] pb-[20px]">
              <p className="text-[16px] leading-[130%] tracking-[0] m-0 font-light font-helvetica text-white/80">
                {question.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FAQSection