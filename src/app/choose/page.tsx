'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllSurveyForms } from '@/content/queries'
import { SurveyForm, SurveyFormField } from '@/content/types'

const criticalInlineStyles = `
  .survey-hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .survey-hero-content {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%) translateZ(0);
    color: white;
    max-width: 28rem;
    z-index: 10;
    contain: layout style;
  }
  .survey-hero-title {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }
  .survey-hero-subtitle {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.32px;
    margin-bottom: 30px;
  }
  .survey-hero-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .survey-wizard-container {
    display: flex;
    height: 100vh;
    background: #F4F1F2;
    padding: 40px;
    padding-top: 120px;
  }
  .survey-image-panel {
    flex: 1;
    background: #000;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
  }
  .survey-form-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
  .survey-step-header {
    color: #000;
    font-family: "Helvetica Neue";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; 
    letter-spacing: -0.24px;
    text-decoration-line: underline;
  }
  .survey-step-line-segment {
    position: absolute;
    top: 0;
    height: 100%;
    width: calc(100% / 3);
  }
  .survey-step-line-segment.completed {
    background: #111827;
  }
  .survey-step-line-segment.remaining {
    background: repeating-linear-gradient(
      to right,
      #3b82f6 0px,
      #3b82f6 4px,
      transparent 4px,
      transparent 8px
    );
  }
  .survey-back-button {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.4px;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
    cursor: pointer;
    display: block;
    width: fit-content;
  }
  a.survey-back-button {
    border: none !important;
  }
  .survey-back-button:hover {
    color: #374151;
  }
  .survey-form-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
  .survey-question-title {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.6px;
    margin-bottom: 24px;
  }
  .survey-form-field {
    margin-bottom: 1.5rem;
  }
  .survey-form-input {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: #f9fafb;
  }
  .survey-form-input:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  .survey-option-button {
    width: 100%;
    padding: 16px 20px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 20px;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    border-radius: 4px;
    border: 1px solid #D7D7D7;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .survey-option-button:hover {
    border-color: #000;
    background: #eceaeb;
  }
  .survey-option-button.selected {
    border-color: #000;
    background: #eceaeb;
  }
  .survey-next-button {
    display: flex;
    width: 200px;
    height: 48px;
    padding: 14px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: #FFF;
    text-align: center;
    font-family: "Helvetica Neue";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    border-radius: 71px;
    background: #000;
    cursor: pointer;
    transition: 0.4s ease;
  }
  .survey-next-button:hover {
    background: #374151;
    transform: translateX(4px);
  }
  .survey-next-button:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }
  .survey-message {
    padding: 16px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
  }
  .survey-message.success {
    background: #d1fae5;
    color: #059669;
    border: 2px solid #10b981;
  }
  .survey-message.error {
    background: #fee2e2;
    color: #dc2626;
    border: 2px solid #ef4444;
  }

  /* Product Showcase Styles */
  .product-showcase-container {
    width: 100%;
    height: 100vh;
    background: #F4F1F2;
    display: flex;
    flex-direction: column;
    padding: 40px;
    padding-top: 120px;
  }
  .product-showcase-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .product-card {
    display: flex;
    height: 100%;
  }
  .product-image-section {
    flex: 1;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
  }
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-info-section {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .info_inner_content {
    max-width: 500px;
    margin: 0 auto;
  }
  .product-category {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .product-name {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.6px;
    margin-bottom: 18px;
  }
  .product-description {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.28px;
    margin-bottom: 18px;
  }
  .product-price-section {
    margin-bottom: 24px;
  }
  .product-price-name {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
  .product-starting-price {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
  .product-option-item {
    margin-bottom: 20px;
  }
  .product-options-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
  }
  .product-options-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .option-name {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
  .option-price {
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
  .product-after-price {
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
  }
  .product-range-info {
    font-size: 14px;
    color: #666;
  }
  .product-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .product-btn-primary {
    background: #1a1a1a;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    width: 124px;
    height: 48px;
    padding: 14px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: #FFF;
    text-align: center;
    font-family: 'helveticaNeue';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    cursor: pointer;
  }
  .product-btn-primary:hover {
    background: #333;
    transform: translateY(-1px);
  }
  .product-btn-secondary {
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    width: 124px;
    height: 48px;
    padding: 14px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: 'helveticaNeue';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    cursor: pointer;
    border: 1px solid #1a1a1a;
  }
  .product-btn-secondary:hover {
    background: #1a1a1a;
    color: white;
  }
  .save_option{
    color: #000;
    font-family: 'helveticaNeue';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.24px;
    text-decoration-line: underline;
  }
  .product-navigation {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }
  .product-nav-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .product-nav-dot.active {
    background: white;
    transform: scale(1.2);
  }
  .product-nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.2s ease;
    z-index: 10;
  }
  .product-nav-arrow:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }
  .product-nav-arrow.left {
    left: 20px;
  }
  .product-nav-arrow.right {
    right: 20px;
  }
`

interface Step {
  id: string
  question: string
  field: SurveyFormField
  sectionIndex?: number
  image?: string
}

export default function SurveyPage() {
  const [currentSurvey, setCurrentSurvey] = useState<SurveyForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [showHero, setShowHero] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [showProductShowcase, setShowProductShowcase] = useState(false)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Product showcase navigation functions with smooth motion
  const nextProduct = () => {
    const products = currentSurvey?.postSubmissionSection?.products
    if (products && products.length > 0) {
      setCurrentProductIndex((prev) =>
        prev < products.length - 1 ? prev + 1 : 0
      )
    }
  }

  const prevProduct = () => {
    const products = currentSurvey?.postSubmissionSection?.products
    if (products && products.length > 0) {
      setCurrentProductIndex((prev) =>
        prev > 0 ? prev - 1 : products.length - 1
      )
    }
  }

  const goToProduct = (index: number) => {
    setCurrentProductIndex(index)
  }

  const closeProductShowcase = () => {
    setShowProductShowcase(false)
    setCurrentProductIndex(0)
    setFormData({})
    setCurrentStep(0)
    setShowHero(true)
    setSubmitMessage(null)
  }

  useEffect(() => {
    const fetchSurveyForms = async () => {
      try {
        setLoading(true)
        const data = await getAllSurveyForms()
        if (!data || data.length === 0) {
          setError('No survey forms found')
          return
        }
        setCurrentSurvey(data[0])

        // Create 4 steps: 1 Form Section + 3 Additional Sections
        const surveySteps: Step[] = []
        const survey = data[0]

        if (survey.formSection) {
          // Step 1: Form Section - select from its field names
          if (survey.formSection.fields && survey.formSection.fields.length > 0) {
            const fieldNames = survey.formSection.fields.map((field: any) => field.fieldName)
            surveySteps.push({
              id: 'form_section_step',
              question: survey.formSection.title || 'Select from Form Section:',
              field: {
                fieldName: 'Form Section Selection',
                fieldType: 'radio',
                required: true,
                options: fieldNames
              },
              image: survey.formSection?.image?.asset?.url
            })
          }

          // Steps 2-4: Additional Sections - select from each section's field names
          if (survey.formSection.additionalSections) {
            survey.formSection.additionalSections.forEach((section: any, index :any) => {
              if (section.fields && section.fields.length > 0) {
                const fieldNames = section.fields.map((field: any) => field.fieldName)
                surveySteps.push({
                  id: `additional_section_${index}`,
                  question: section.title || `Select from Section ${index + 1}:`,
                  field: {
                    fieldName: `Additional Section ${index + 1} Selection`,
                    fieldType: 'radio',
                    required: true,
                    options: fieldNames
                  },
                  image: section.image?.asset?.url || survey.formSection?.image?.asset?.url
                })
              }
            })
          }
        }

        setSteps(surveySteps)
      } catch (err) {
        setError('Failed to load survey forms')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSurveyForms()
  }, [])

  const handleMediaLoad = useCallback(() => {
    setMediaLoaded(true)
  }, [])

  const handleStartSurvey = () => {
    setShowHero(false)
    setSubmitMessage(null)
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }


  const saveCurrentStep = async () => {
    const currentStepData = getCurrentStepData()
    if (!currentStepData) return

    const stepValue = formData[currentStepData.id]
    if (!stepValue) return

    console.log(`✅ Step ${currentStep + 1}/${steps.length} completed:`, {
      field: currentStepData.field.fieldName,
      value: stepValue
    })
  }


  const handleNext = async () => {
    // Save current step
    await saveCurrentStep()

    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]))

    // Only advance if not on last step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      setShowHero(true)
    }
  }

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      setSubmitMessage(null)

      // Prepare all responses for submission
      const allResponses = Object.entries(formData).map(([stepId, value]) => {
        const step = steps.find(s => s.id === stepId)
        return {
          fieldName: step?.field.fieldName || stepId,
          fieldType: step?.field.fieldType || 'radio',
          value: Array.isArray(value) ? value.join(', ') : String(value),
          sectionIndex: 0
        }
      })

      // Submit to API
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses: allResponses,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log('🎉 Survey Successfully Saved to Sanity!')
        console.log('📄 Response ID:', result.responseId)
        console.log('📊 All Responses:', result.data.responses)
        console.log('📝 Form Data:', formData)
        console.log('✅ Status: Completed')

        setSubmitMessage({
          type: 'success',
          text: 'Survey submitted successfully! Thank you for your participation.'
        })

        // Show product showcase after brief delay
        setTimeout(() => {
          setShowProductShowcase(true)
        }, 1500)

        // Note: Removed auto-reset - user must manually close showcase

      } else {
        throw new Error(result.error || 'Failed to submit survey')
      }

    } catch (error) {
      console.error('❌ Error submitting survey:', error)
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit survey. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepField = (step: Step) => {
    const fieldKey = step.id
    const field = step.field

    // Only render selection options - no input fields
    return (
      <div className="space-y-3">
        {field.options?.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`survey-option-button ${formData[fieldKey] === option ? 'selected' : ''}`}
            onClick={() => {
              handleInputChange(fieldKey, option)
            }}
          >
            {option}
          </button>
        ))}
      </div>
    )
  }

  const getCurrentStepData = () => {
    if (currentStep >= steps.length) return null
    return steps[currentStep]
  }

  const isStepValid = () => {
    const step = getCurrentStepData()
    if (!step) return false

    const value = formData[step.id]
    if (step.field.required) {
      if (step.field.fieldType === 'checkbox') {
        return value && Array.isArray(value) && value.length > 0
      }
      return value !== undefined && value !== null && value !== ''
    }
    return true
  }

  const currentStepData = getCurrentStepData()

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="survey-hero-container">
          <div className="absolute inset-0 bg-black" />
          <div className="survey-hero-content">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !currentSurvey) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="survey-hero-container">
          <div className="absolute inset-0 bg-black" />
          <div className="survey-hero-content">
            <div className="text-white">{error || 'Survey form not found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <AnimatePresence mode="wait">
        {showProductShowcase ? (
          <motion.div
            key="showcase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="product-showcase-container"
          >

            {/* Content */}
            <div className="product-showcase-content">
              {currentSurvey?.postSubmissionSection?.products && currentSurvey.postSubmissionSection.products.length > 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProductIndex}
                    initial={{ opacity: 0, x: 300, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.6
                      }
                    }}
                    exit={{
                      opacity: 0,
                      x: -300,
                      scale: 0.8,
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }}
                    className="product-card"
                  >
                    {/* Product Image */}
                    <div className="product-image-section">
                      <img
                        src={currentSurvey.postSubmissionSection!.products![currentProductIndex]?.image?.asset?.url}
                        alt={currentSurvey.postSubmissionSection!.products![currentProductIndex]?.image?.alt || 'Product'}
                        className="product-image"
                      />

                      {/* Navigation Arrows */}
                      {currentSurvey.postSubmissionSection!.products!.length > 1 && (
                        <>
                          <button className="product-nav-arrow left" onClick={prevProduct}>
                            ←
                          </button>
                          <button className="product-nav-arrow right" onClick={nextProduct}>
                            →
                          </button>
                        </>
                      )}

                      {/* Navigation Dots */}
                      {currentSurvey.postSubmissionSection!.products!.length > 1 && (
                        <div className="product-navigation">
                          {currentSurvey.postSubmissionSection!.products!.map((_, index) => (
                            <div
                              key={index}
                              className={`product-nav-dot ${index === currentProductIndex ? 'active' : ''}`}
                              onClick={() => goToProduct(index)}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Product Info - Simplified */}
                    <div className="product-info-section">
                      <div className="info_inner_content">
                          <div className="survey-step-header">
                              <a href='/'
                                type="button"
                                className="survey-back-button"
                              >
                                Back
                              </a>
                          </div>
                        {/* Product Name */}
                        <h3 className="product-name">
                          {currentSurvey.postSubmissionSection!.products![currentProductIndex]?.name}
                        </h3>

                        {/* Product Description */}
                        {currentSurvey.postSubmissionSection!.products![currentProductIndex]?.description && (
                          <p className="product-description">
                            {currentSurvey.postSubmissionSection!.products![currentProductIndex].description}
                          </p>
                        )}

                        {/* Price Section - With Name and Value */}
                        {currentSurvey.postSubmissionSection!.products![currentProductIndex]?.priceSection && (
                          <div className="product-price-section">
                            <div className="product-price-name">
                              {currentSurvey.postSubmissionSection!.products![currentProductIndex].priceSection!.priceName}
                            </div>
                            <div className="product-starting-price">
                              {currentSurvey.postSubmissionSection!.products![currentProductIndex].priceSection!.priceValue}
                            </div>
                          </div>
                        )}

                        {/* Multiple Options */}
                        {currentSurvey.postSubmissionSection!.products![currentProductIndex]?.options && currentSurvey.postSubmissionSection!.products![currentProductIndex].options!.length > 0 && (
                          <div className="product-options-section">
                            <div className="product-options-list">
                              {currentSurvey.postSubmissionSection!.products![currentProductIndex].options!.map((option, index) => (
                                <div key={index} className="product-option-item">
                                  <div className="option-name">{option.optionName}</div>
                                  {option.optionPrice && (
                                    <div className="option-price">{option.optionPrice}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Simple Button */}
                        <div className="product-buttons">
                          <button className="product-btn-primary">
                            {currentSurvey.postSubmissionSection!.products![currentProductIndex]?.name || 'View Details'}
                          </button>
                           <button className="product-btn-secondary">
                            Design yours
                          </button>
                        </div>
                        <a href="#" className="save_option">Save Options</a>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        ) : showHero ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="survey-hero-container"
          >
            <div className="absolute inset-0 bg-black" />

            {/* Hero Media */}
            {currentSurvey.heroSection?.contentType === 'video' && currentSurvey.heroSection.videoFile?.asset?.url && (
              <video
                ref={videoRef}
                src={currentSurvey.heroSection.videoFile.asset.url}
                className="survey-hero-media"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleMediaLoad}
                style={{
                  opacity: mediaLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            )}

            {currentSurvey.heroSection?.contentType === 'image' && currentSurvey.heroSection.image?.asset?.url && (
              <img
                ref={imageRef}
                src={currentSurvey.heroSection.image.asset.url}
                alt={currentSurvey.heroSection.image.alt || currentSurvey.heroSection.name || 'Survey hero'}
                className="survey-hero-media"
                onLoad={handleMediaLoad}
                style={{
                  opacity: mediaLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            )}

            {/* Hero Content */}
            <div className="survey-hero-content">
              {currentSurvey.heroSection?.name && (
                <h1 className="survey-hero-title">
                  {currentSurvey.heroSection.name}
                </h1>
              )}
              {currentSurvey.heroSection?.title && (
                <p className="survey-hero-subtitle">
                  {currentSurvey.heroSection.title}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative overflow-hidden flex items-center gap-[12px] px-6 py-3 rounded-full
                           bg-white text-black font-helvetica font-medium text-[20px] leading-[24px]
                           border border-transparent cursor-pointer group
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                onClick={handleStartSurvey}
              >
                <span className="absolute inset-0 bg-black translate-x-full
                               transition-transform duration-500 ease-in-out rounded-full
                               group-hover:translate-x-0" />
                               <svg
                                  width="22"
                                  height="18"
                                  viewBox="0 0 22 18"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="relative z-10 transition-colors duration-500 ease-in-out group-hover:fill-white fill-black"
                                >
                                  <path
                                    d="M21.2441 9.61955L13.3691 17.4946C13.2049 17.6587 12.9822 17.751 12.75 17.751C12.5178 17.751 12.2951 17.6587 12.1309 17.4946C11.9668 17.3304 11.8745 17.1077 11.8745 16.8755C11.8745 16.6433 11.9668 16.4206 12.1309 16.2564L18.513 9.87549H1.375C1.14294 9.87549 0.920376 9.7833 0.756282 9.61921C0.592187 9.45511 0.5 9.23255 0.5 9.00049C0.5 8.76842 0.592187 8.54586 0.756282 8.38177C0.920376 8.21767 1.14294 8.12549 1.375 8.12549H18.513L12.1309 1.74455C11.9668 1.58036 11.8745 1.35768 11.8745 1.12549C11.8745 0.893293 11.9668 0.67061 12.1309 0.506424C12.2951 0.342238 12.5178 0.25 12.75 0.25C12.9822 0.25 13.2049 0.342238 13.3691 0.506424L21.2441 8.38142C21.3254 8.46269 21.39 8.55919 21.434 8.66541C21.478 8.77164 21.5007 8.8855 21.5007 9.00049C21.5007 9.11548 21.478 9.22934 21.434 9.33556C21.39 9.44178 21.3254 9.53829 21.2441 9.61955Z"
                                  />
                                </svg>

                <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                  Get Started
                </span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="wizard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="survey-wizard-container"
          >
            {/* Image Panel */}
            <div className="survey-image-panel">
              {currentStepData?.image && (
                <img
                  src={currentStepData.image}
                  alt="Survey step"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Form Panel */}
            <div className="survey-form-panel">
              {/* Form Content */}
              <div className="survey-form-content">
                {/* Header */}
                <div className="survey-step-header">
                  <button
                    type="button"
                    className="survey-back-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
              </div>
                {/* Success/Error Message */}
                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`survey-message ${submitMessage.type}`}
                  >
                    {submitMessage.text}
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {currentStepData && !submitMessage && (
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="survey-question-title text-black">
                        {currentStepData.question}
                      </h2>

                      {renderStepField(currentStepData)}

                      <div style={{ display: 'flex', gap: '12px', marginTop: '2rem' }}>
                        {currentStep < steps.length - 1 ? (
                          <button
                            type="button"
                            className="survey-next-button"
                            onClick={handleNext}
                            disabled={!isStepValid() || isSubmitting}
                          >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                              <path d="M15 1L19 5M19 5L15 9M19 5L1 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="survey-next-button"
                            onClick={handleFinalSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                              <path d="M15 1L19 5M19 5L15 9M19 5L1 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}