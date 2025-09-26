'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllInquiryForms } from '@/content/queries'

const criticalInlineStyles = `
  .inquiry-hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .inquiry-hero-content {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%) translateZ(0);
    color: white;
    max-width: 28rem;
    z-index: 10;
    contain: layout style;
  }
  .inquiry-hero-title {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin-bottom: 8px;
  }
  .inquiry-hero-subtitle {
    color: #FFF;
    font-family: 'helveticaNeue';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.32px;
    margin-bottom: 30px;
  }
  .inquiry-hero-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    contain: layout style paint;
    transform: translateZ(0);
  }
  .inquiry-wizard-container {
    display: flex;
    height: 100vh;
    background: #F4F1F2;
    padding: 40px;
    padding-top: 120px;
  }
  .inquiry-image-panel {
    flex: 1;
    background: #000;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
  }
  .inquiry-form-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
  .inquiry-step-header {
    color: #000;
    font-family: "Helvetica Neue";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.24px;
    text-decoration-line: underline;
  }
  .inquiry-back-button {
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
  }
  .inquiry-back-button:hover {
    color: #374151;
  }
  .inquiry-form-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
  .inquiry-question-title {
    color: #000;
    font-family: "Helvetica Neue";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.28px;
    margin-bottom: 25px;
  }
  .inquiry-option-button {
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
  .inquiry-option-button:hover {
    border-color: #000;
    background: #eceaeb;
  }
  .inquiry-option-button.selected {
    border-color: #000;
    background: #eceaeb;
  }
  .inquiry-next-button {
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
  .inquiry-next-button:hover {
    transform: translateX(4px);
  }
  .inquiry-next-button:disabled {
    cursor: not-allowed;
    transform: none;
    opacity: 0.6;
  }
  .inquiry-message {
    padding: 16px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
  }
  .inquiry-message.success {
    background: #d1fae5;
    color: #059669;
    border: 2px solid #10b981;
  }
  .inquiry-message.error {
    background: #fee2e2;
    color: #dc2626;
    border: 2px solid #ef4444;
  }
  .inquiry-form-group {
    margin-bottom: 24px;
  }
  .inquiry-form-row {
    display: flex;
    gap: 16px;
  }
  .inquiry-form-input {
    width: 100%;
    padding: 13px 20px;
    transition: all 0.2s ease;
    border-radius: 4px;
    border: 1px solid #D7D7D7;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "Helvetica Neue";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
  }
  .inquiry-form-input:focus {
    outline: none;
    border-color: #000;
  }
  .inquiry-form-textarea {
    width: 100%;
    padding: 13px 20px;
    transition: all 0.2s ease;
    border-radius: 4px;
    border: 1px solid #D7D7D7;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "Helvetica Neue";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    min-height: 100px;
    resize: vertical;
  }
  .inquiry-form-textarea:focus {
    outline: none;
        border-color: #000;
  }
  .inquiry-form-select {
    width: 100%;
    padding: 13px 20px;
    transition: all 0.2s ease;
    border-radius: 4px;
    border: 1px solid #D7D7D7;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "Helvetica Neue";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
  }
  .inquiry-form-select:focus {
    outline: none;
     border: 1px solid #000;
  }
 .inquiry-review-section, 
.inquiry-review-section p {
    color: #000;
    font-family: "Helvetica Neue";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.24px;
}
.inquiry-review-section p {
  margin-bottom: 12px;
}
  .inquiry-review-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  .inquiry-review-item:last-child {
    border-bottom: none;
  }
  .inquiry-review-label {
    font-weight: 500;
    color: #374151;
  }
  .inquiry-review-value {
    color: #111827;
  }
`

interface Step {
  id: string
  question: string
  field: {
    fieldName: string
    fieldType: string
    required: boolean
    options?: string[]
  }
  image?: string
}

interface InquiryFormData {
  bodyStyle?: string
  model?: string
  title?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  country?: string
  additionalComments?: string
  [key: string]: any
}

export default function InquiryPage() {
  const [currentInquiry, setCurrentInquiry] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<InquiryFormData>({})
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [showHero, setShowHero] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const fetchInquiryForms = async () => {
      try {
        setLoading(true)
        const data = await getAllInquiryForms()
        if (!data || data.length === 0) {
          setError('No inquiry forms found')
          return
        }
        setCurrentInquiry(data[0])

        // Create 3 steps: Body Style + Model + Personal Info
        const inquirySteps: Step[] = []
        const inquiry = data[0]

        if (inquiry.formSection) {
          // Step 1: Body Style Selection from additionalSections[0]
          const bodyStyleSection = inquiry.formSection.additionalSections?.[0]
          if (bodyStyleSection?.fields?.length > 0) {
            const bodyStyleOptions = bodyStyleSection.fields.map((field: any) => field.fieldName)
            inquirySteps.push({
              id: 'bodyStyle',
              question: bodyStyleSection.title || 'Select a body style',
              field: {
                fieldName: 'bodyStyle',
                fieldType: 'radio',
                required: true,
                options: bodyStyleOptions
              },
              image: bodyStyleSection.image?.asset?.url || inquiry.formSection?.image?.asset?.url
            })
          }

          // Step 2: Model Selection from formSection.fields
          if (inquiry.formSection.fields?.length > 0) {
            const modelOptions = inquiry.formSection.fields.map((field: any) => field.fieldName)
            inquirySteps.push({
              id: 'model',
              question: 'Select a model',
              field: {
                fieldName: 'model',
                fieldType: 'radio',
                required: true,
                options: modelOptions
              },
              image: inquiry.formSection?.image?.asset?.url
            })
          }

          // Step 3: Personal Information (hardcoded)
          inquirySteps.push({
            id: 'personalInfo',
            question: 'Your preferred dealer will be in touch soon.',
            field: {
              fieldName: 'personalInfo',
              fieldType: 'form',
              required: true
            },
            image: inquiry.formSection?.image?.asset?.url
          })
        }

        setSteps(inquirySteps)
      } catch (err) {
        setError('Failed to load inquiry forms')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInquiryForms()
  }, [])

  const handleMediaLoad = useCallback(() => {
    setMediaLoaded(true)
  }, [])

  const handleStartInquiry = () => {
    setShowHero(false)
    setSubmitMessage(null)
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleNext = async () => {
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

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Inquiry submitted successfully! We will be in touch soon.'
        })

        // Reset form after delay
        setTimeout(() => {
          setFormData({})
          setCurrentStep(0)
          setShowHero(true)
          setSubmitMessage(null)
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to submit inquiry')
      }

    } catch (error) {
      console.error('Error submitting inquiry:', error)
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit inquiry. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepField = (step: Step) => {
    const fieldKey = step.id

    if (step.field.fieldType === 'form') {
      // Personal Information Form
      return (
        <div>
          <div className="inquiry-form-group">
            <select
              className="inquiry-form-select"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
            >
              <option value="">Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>

          <div className="inquiry-form-group">
            <div className="inquiry-form-row">
              <input
                type="text"
                className="inquiry-form-input"
                placeholder="First Name *"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
              <input
                type="text"
                className="inquiry-form-input"
                placeholder="Last Name *"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="inquiry-form-group">
            <div className="inquiry-form-row">
              <input
                type="email"
                className="inquiry-form-input"
                placeholder="Email *"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              <input
                type="tel"
                className="inquiry-form-input"
                placeholder="Phone Number *"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="inquiry-form-group">
            <select
              className="inquiry-form-select"
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              required
            >
              <option value="">Select Country *</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="inquiry-form-group">
            <textarea
              className="inquiry-form-textarea"
              placeholder="Additional Comments (Optional)"
              value={formData.additionalComments || ''}
              onChange={(e) => handleInputChange('additionalComments', e.target.value)}
              rows={4}
            />
          </div>

          {/* Review Section */}
          <div className="inquiry-review-section">
            <div className='inquiry-review-section_text'>
              <p>We will never sell your data, will keep your details secure and will never share your data with third parties for marketing purposes.
                For further details on how your data is used and stored please refer to our Privacy Policy</p>
                <p>Stay Connected</p>
                <p>We would like to stay in touch with you to:</p>
                <ul className='list-disc pl-5'>
                  <li>Share news.</li>
                  <li>Inform you about new products and services.</li>
                  <li>Offer you first sight of any promotions including cars, merchandise and accessories.</li>
                  <li>Invite you to join Aston Martin at events.</li>
                </ul>
            </div>
          </div>
        </div>
      )
    }

    // Selection options for Steps 1 & 2
    return (
      <div className="space-y-3">
        {step.field.options?.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`inquiry-option-button ${formData[fieldKey] === option ? 'selected' : ''}`}
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

    if (step.id === 'personalInfo') {
      return formData.firstName && formData.lastName && formData.email && formData.phone && formData.country
    }

    const value = formData[step.id]
    return value !== undefined && value !== null && value !== ''
  }

  const currentStepData = getCurrentStepData()

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="inquiry-hero-container">
          <div className="absolute inset-0 bg-black" />
          <div className="inquiry-hero-content">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !currentInquiry) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="inquiry-hero-container">
          <div className="absolute inset-0 bg-black" />
          <div className="inquiry-hero-content">
            <div className="text-white">{error || 'Inquiry form not found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <AnimatePresence mode="wait">
        {showHero ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inquiry-hero-container"
          >
            <div className="absolute inset-0 bg-black" />

            {/* Hero Media */}
            {currentInquiry.heroSection?.contentType === 'video' && currentInquiry.heroSection.videoFile?.asset?.url && (
              <video
                ref={videoRef}
                src={currentInquiry.heroSection.videoFile.asset.url}
                className="inquiry-hero-media"
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

            {currentInquiry.heroSection?.contentType === 'image' && currentInquiry.heroSection.image?.asset?.url && (
              <img
                ref={imageRef}
                src={currentInquiry.heroSection.image.asset.url}
                alt={currentInquiry.heroSection.image.alt || currentInquiry.heroSection.name || 'Inquiry hero'}
                className="inquiry-hero-media"
                onLoad={handleMediaLoad}
                style={{
                  opacity: mediaLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            )}

            {/* Hero Content */}
            <div className="inquiry-hero-content">
              {currentInquiry.heroSection?.name && (
                <h1 className="inquiry-hero-title">
                  {currentInquiry.heroSection.name}
                </h1>
              )}
              {currentInquiry.heroSection?.title && (
                <p className="inquiry-hero-subtitle">
                  {currentInquiry.heroSection.title}
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
                onClick={handleStartInquiry}
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
            className="inquiry-wizard-container"
          >
            {/* Image Panel */}
            <div className="inquiry-image-panel">
              {currentStepData?.image && (
                <img
                  src={currentStepData.image}
                  alt="Inquiry step"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Form Panel */}
            <div className="inquiry-form-panel">
              {/* Form Content */}
              <div className="inquiry-form-content">
                {/* Header */}
                <div className="inquiry-step-header">
                  <button
                    type="button"
                    className="inquiry-back-button"
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
                    className={`inquiry-message ${submitMessage.type}`}
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
                      <h2 className="inquiry-question-title">
                        {currentStepData.question}
                      </h2>

                      {renderStepField(currentStepData)}

                      <div style={{ display: 'flex', gap: '12px', marginTop: '2rem' }}>
                        {currentStep < steps.length - 1 ? (
                          <button
                            type="button"
                            className="inquiry-next-button"
                            onClick={handleNext}
                            disabled={!isStepValid() || isSubmitting}
                          >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                              <path d="M15 1L19 5M19 5L15 9M19 5L1 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inquiry-next-button"
                            onClick={handleFinalSubmit}
                            disabled={isSubmitting || !isStepValid()}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                              <path d="M15 1L19 5M19 5L15 9M19 5L1 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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