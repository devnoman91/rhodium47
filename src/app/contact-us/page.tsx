'use client'

import { useState, useEffect } from 'react'
import { getContactPage } from '@/content/queries'

const contactStyles = `
  .contact-hero {
    position: relative;
    height: 60vh;
    background: linear-gradient(135deg, #000 0%, #333 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }
  .contact-hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .contact-hero-description {
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto;
  }
  .contact-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: 4rem;
  }
  .contact-info h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .contact-item {
    margin-bottom: 2rem;
  }
  .contact-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .contact-form h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .form-group {
    margin-bottom: 1.5rem;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .form-input, .form-textarea, .form-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus {
    outline: none;
    border-color: #000;
  }
  .form-textarea {
    min-height: 120px;
    resize: vertical;
  }
  .submit-btn {
    background: #000;
    color: white;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }
  .submit-btn:hover {
    background: #333;
  }
  .submit-btn:disabled {
    background: #666;
    cursor: not-allowed;
  }
  .message {
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }
  .message.success {
    background: #d1fae5;
    color: #065f46;
  }
  .message.error {
    background: #fee2e2;
    color: #dc2626;
  }
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .contact-hero-title {
      font-size: 2rem;
    }
  }
`

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactUsPage() {
  const [contactData, setContactData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await getContactPage()
        setContactData(data)
      } catch (error) {
        console.error('Error fetching contact data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
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
          text: 'Thank you for your message! We will get back to you soon.'
        })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage({
        type: 'error',
        text: 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: contactStyles }} />
        <div className="contact-hero">
          <div>Loading...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: contactStyles }} />

      {/* Hero Section */}
      <section className="contact-hero">
        <div>
          <h1 className="contact-hero-title">
            {contactData?.heroSection?.title || 'Contact Us'}
          </h1>
          <p className="contact-hero-description">
            {contactData?.heroSection?.description || 'Get in touch with us. We\'d love to hear from you.'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="contact-content">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>{contactData?.contactInfo?.sectionTitle || 'Get in Touch'}</h3>

            {contactData?.contactInfo?.emails?.map((email: any, index: number) => (
              <div key={index} className="contact-item">
                <div className="contact-label">{email.label}</div>
                <div>{email.email}</div>
              </div>
            ))}

            {contactData?.contactInfo?.phones?.map((phone: any, index: number) => (
              <div key={index} className="contact-item">
                <div className="contact-label">{phone.label}</div>
                <div>{phone.phone}</div>
              </div>
            ))}

            {contactData?.contactInfo?.address && (
              <div className="contact-item">
                <div className="contact-label">Address</div>
                <div>
                  {contactData.contactInfo.address.street}<br />
                  {contactData.contactInfo.address.city}, {contactData.contactInfo.address.state} {contactData.contactInfo.address.zipCode}<br />
                  {contactData.contactInfo.address.country}
                </div>
              </div>
            )}

            {contactData?.contactInfo?.businessHours?.length > 0 && (
              <div className="contact-item">
                <div className="contact-label">Business Hours</div>
                {contactData.contactInfo.businessHours.map((hours: any, index: number) => (
                  <div key={index}>{hours.day}: {hours.hours}</div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>Send us a Message</h3>

            {submitMessage && (
              <div className={`message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Message *"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}