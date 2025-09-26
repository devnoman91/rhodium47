'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllSurveyForms } from '@/content/queries'
import { SurveyForm, SurveyFormField } from '@/content/types'
import { client } from '@/sanity/lib/client'

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
    background: #f8f9fa;
  }
  .survey-image-panel {
    flex: 1;
    background: #000;
    position: relative;
    overflow: hidden;
  }
  .survey-form-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: white;
  }
  .survey-step-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .survey-step-indicator {
    margin-bottom: 2rem;
    padding: 0 2rem;
    position: relative;
  }
  .survey-step-line {
    width: 100%;
    height: 4px;
    position: relative;
    border-radius: 2px;
    overflow: hidden;
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
    background: none;
    border: none;
    font-size: 16px;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    font-size: 28px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 2rem;
    line-height: 1.3;
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
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: #f9fafb;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 12px;
  }
  .survey-option-button:hover {
    border-color: #d1d5db;
    background: white;
  }
  .survey-option-button.selected {
    border-color: #3b82f6;
    background: #eff6ff;
    color: #1d4ed8;
  }
  .survey-next-button {
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
  const [surveyResponseId, setSurveyResponseId] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

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
            survey.formSection.additionalSections.forEach((section, index) => {
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

        // Reset form after delay
        setTimeout(() => {
          setFormData({})
          setCurrentStep(0)
          setShowHero(true)
          setSurveyResponseId(null)
          setSubmitMessage(null)
        }, 3000)

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
        {showHero ? (
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
                           bg-white text-black font-helvetica font-medium text-[16px]
                           border border-transparent cursor-pointer group
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                onClick={handleStartSurvey}
              >
                <span className="absolute inset-0 bg-black translate-x-full
                               transition-transform duration-500 ease-in-out rounded-full
                               group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                  Start Survey
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
              {/* Step Progress Line */}
              <div className="survey-step-indicator">
                <div className="survey-step-line">
                  {[0, 1, 2].map((segmentIndex) => (
                    <div
                      key={segmentIndex}
                      className={`survey-step-line-segment ${
                        segmentIndex < currentStep || completedSteps.has(segmentIndex)
                          ? 'completed'
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
              <div className="survey-step-header">
                <button
                  type="button"
                  className="survey-back-button"
                  onClick={handleBack}
                >
                  ← Back
                </button>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {currentStep + 1} of {steps.length}
                </div>
              </div>

              {/* Form Content */}
              <div className="survey-form-content">
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
                            Next →
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="survey-next-button"
                            onClick={handleFinalSubmit}
                            disabled={isSubmitting}
                            style={{
                              background: '#059669',
                              border: 'none'
                            }}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
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