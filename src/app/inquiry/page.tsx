'use client'

import { useState, useEffect, useRef } from 'react'
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
    width: 100%;
    min-height: 100vh;
    background: #f8f9fa;
  }
  .inquiry-image-panel {
    flex: 1;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .inquiry-form-panel {
    flex: 1;
    background: white;
    padding: 40px;
    display: flex;
    flex-direction: column;
    max-width: 600px;
  }
  .inquiry-step-indicator {
    margin-bottom: 40px;
  }
  .inquiry-step-line {
    width: 100%;
    height: 4px;
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    background: #e5e7eb;
  }
  .inquiry-step-line-segment {
    position: absolute;
    top: 0;
    height: 100%;
    width: calc(100% / 3);
    transition: all 0.3s ease;
  }
  .inquiry-step-line-segment.completed {
    background: #111827;
  }
  .inquiry-step-line-segment.current {
    background: #3b82f6;
  }
  .inquiry-step-line-segment.remaining {
    background: repeating-linear-gradient(
      to right,
      #3b82f6 0px,
      #3b82f6 4px,
      transparent 4px,
      transparent 8px
    );
  }
  .inquiry-step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .inquiry-back-button {
    background: none;
    border: none;
    font-size: 16px;
    color: #6b7280;
    cursor: pointer;
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .inquiry-back-button:hover {
    color: #374151;
  }
  .inquiry-step-title {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 20px;
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
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: #f9fafb;
  }
  .inquiry-form-input:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  .inquiry-form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: #f9fafb;
    min-height: 100px;
    resize: vertical;
  }
  .inquiry-form-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  .inquiry-form-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: #f9fafb;
  }
  .inquiry-form-select:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  .inquiry-selection-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  .inquiry-option-button {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: #f9fafb;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #374151;
  }
  .inquiry-option-button:hover {
    border-color: #d1d5db;
    background: white;
  }
  .inquiry-option-button.selected {
    border-color: #3b82f6;
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 600;
  }
  .inquiry-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
  .inquiry-checkbox-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .inquiry-checkbox {
    width: 18px;
    height: 18px;
    accent-color: #3b82f6;
  }
  .inquiry-checkbox-label {
    font-size: 16px;
    color: #374151;
  }
  .inquiry-next-button {
    background: #111827;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: flex-start;
    margin-top: 2rem;
  }
  .inquiry-next-button:hover {
    background: #374151;
    transform: translateX(4px);
  }
  .inquiry-next-button:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
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
  .inquiry-review-section {
    background: #f9fafb;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentInquiry, setCurrentInquiry] = useState<any>(null)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [showHero, setShowHero] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<InquiryFormData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const steps = [
    currentInquiry?.formSection?.additionalSections?.[0]?.title || 'Select Body Style',
    currentInquiry?.formSection?.additionalSections?.[1]?.title || 'Select Model',
    currentInquiry?.formSection?.additionalSections?.[2]?.title || 'Personal Information'
  ]

  useEffect(() => {
    const fetchInquiryForms = async () => {
      try {
        setLoading(true)
        const data = await getAllInquiryForms()
        console.log('Inquiry forms data:', data)

        if (!data || data.length === 0) {
          setError('No inquiry forms found')
          return
        }

        const inquiry = data[0] // Use the first inquiry form
        console.log('Inquiry form data:', inquiry)
        console.log('Form section:', inquiry?.formSection)
        console.log('Additional sections:', inquiry?.formSection?.additionalSections)
        setCurrentInquiry(inquiry)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching inquiry forms:', err)
        setError('Failed to load inquiry form')
        setLoading(false)
      }
    }

    fetchInquiryForms()
  }, [])

  const handleMediaLoad = () => {
    setMediaLoaded(true)
  }

  const handleStartInquiry = () => {
    setShowHero(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSelectionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      setShowHero(true)
      setCurrentStep(0)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
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

  const isStepValid = () => {
    if (currentStep === 0) {
      return !!formData.bodyStyle // Body style must be selected
    }
    if (currentStep === 1) {
      return !!formData.model // Model must be selected
    }
    if (currentStep === 2) {
      return formData.firstName && formData.lastName && formData.email && formData.phone && formData.country
    }
    return false
  }

  const renderStep1 = () => {
    // Get first additional section (Body Style)
    const bodyStyleSection = currentInquiry?.formSection?.additionalSections?.[0]
    // Get the field names as options since that's how the data is structured
    const bodyStyleOptions = bodyStyleSection?.fields?.map((field: any) => field.fieldName) || []

    return (
      <div>
        <h2 className="inquiry-step-title">{bodyStyleSection?.title || 'Select a body style'}</h2>

        <div className="inquiry-selection-list">
          {bodyStyleOptions.map((option: string, index: number) => (
            <button
              key={index}
              type="button"
              className={`inquiry-option-button ${
                formData.bodyStyle === option ? 'selected' : ''
              }`}
              onClick={() => handleSelectionChange('bodyStyle', option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderStep2 = () => {
    // Get model options from formSection.fields (they're in the main fields, not additionalSections)
    const modelOptions = currentInquiry?.formSection?.fields?.map((field: any) => field.fieldName) || []

    return (
      <div>
        <h2 className="inquiry-step-title">{'Select a model'}</h2>

        <div className="inquiry-selection-list">
          {modelOptions.map((option: string, index: number) => (
            <button
              key={index}
              type="button"
              className={`inquiry-option-button ${
                formData.model === option ? 'selected' : ''
              }`}
              onClick={() => handleSelectionChange('model', option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => {
      const currentPreferences = prev.contactPreferences || []
      if (checked) {
        return {
          ...prev,
          contactPreferences: [...currentPreferences, value]
        }
      } else {
        return {
          ...prev,
          contactPreferences: currentPreferences.filter((pref: string) => pref !== value)
        }
      }
    })
  }

  const renderStep3 = () => {
    // Get third additional section (Personal Information) or use default
    const personalInfoSection = currentInquiry?.formSection?.additionalSections?.[2]

    return (
      <div>
        <h2 className="inquiry-step-title">{personalInfoSection?.title || 'Personal Information'}</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Please provide your contact information so we can get in touch.
        </p>

      {/* Hardcoded form fields */}
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
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Review Your Selection</h3>
        {formData.bodyStyle && (
          <div className="inquiry-review-item">
            <span className="inquiry-review-label">Body Style:</span>
            <span className="inquiry-review-value">{formData.bodyStyle}</span>
          </div>
        )}
        {formData.model && (
          <div className="inquiry-review-item">
            <span className="inquiry-review-label">Model:</span>
            <span className="inquiry-review-value">{formData.model}</span>
          </div>
        )}
      </div>

      {submitMessage && (
        <div className={`inquiry-message ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}
    </div>
    )
  }

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
                           bg-white text-black font-helvetica font-medium text-[16px]
                           border border-transparent cursor-pointer group
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                onClick={handleStartInquiry}
              >
                <span className="absolute inset-0 bg-black translate-x-full
                               transition-transform duration-500 ease-in-out rounded-full
                               group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                  Start Inquiry
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
              {currentInquiry.heroSection?.image?.asset?.url && (
                <img
                  src={currentInquiry.heroSection.image.asset.url}
                  alt="Inquiry"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Form Panel */}
            <div className="inquiry-form-panel">
              {/* Step Progress Line */}
              <div className="inquiry-step-indicator">
                <div className="inquiry-step-line">
                  {[0, 1, 2].map((segmentIndex) => (
                    <div
                      key={segmentIndex}
                      className={`inquiry-step-line-segment ${
                        segmentIndex < currentStep
                          ? 'completed'
                          : segmentIndex === currentStep
                          ? 'current'
                          : 'remaining'
                      }`}
                      style={{
                        left: `${(segmentIndex * 100) / 3}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Header */}
              <div className="inquiry-step-header">
                <button
                  type="button"
                  className="inquiry-back-button"
                  onClick={handleBack}
                >
                  ← Back
                </button>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>

              {/* Form Title */}
              {currentInquiry.formSection?.title && (
                <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  {currentInquiry.formSection.title}
                </h1>
              )}
              {currentInquiry.formSection?.subtitle && (
                <p style={{ color: '#6b7280', marginBottom: '32px' }}>
                  {currentInquiry.formSection.subtitle}
                </p>
              )}

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ flex: 1 }}
                >
                  {currentStep === 0 && renderStep1()}
                  {currentStep === 1 && renderStep2()}
                  {currentStep === 2 && renderStep3()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                {currentStep < 2 ? (
                  <button
                    className="inquiry-next-button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    className="inquiry-next-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isStepValid()}
                    style={{
                      background: isSubmitting || !isStepValid() ? '#d1d5db' : '#059669',
                      border: 'none'
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}