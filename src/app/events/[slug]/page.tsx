'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getEventBySlug } from '@/content/queries'

const eventStyles = `
.event-section{
background-color: #F4F1F2;
 }
  .event-hero {
    position: relative;
    height: 60vh;
    background: linear-gradient(135deg, #000 0%, #333 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }
  .event-hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }
  .event-hero-content {
    position: relative;
    z-index: 10;
    max-width: 800px;
    padding: 0 2rem;
  }
  .event-hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .event-hero-meta {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  .event-hero-description {
   color: #000;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 55px */
  letter-spacing: -1px;
  margin-bottom: 28px;max-width:912px;
  }
  .event-content {
    max-width: 1332px;
    margin:auto;
    padding: 118px 0;
  }
  .event-details {
    // display: grid;
    // grid-template-columns: 2fr 1fr;
    // gap: 4rem;
    margin-bottom: 4rem;
  }
  .event-info h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .event-description {
    color: #111;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 27px */
    text-transform: capitalize;
     margin-bottom: 42px;max-width:1039px;
  }
  .event-meta {
    background: #f9fafb;
    padding: 2rem;
    border-radius: 12px;
  }
  .event-meta-item {
    margin-bottom: 1.5rem;
  }
    .label{
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    text-transform: capitalize;
    margin-bottom:9px;
    }
  .event-meta-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  .event-meta-value {
    color: #4b5563;
  }
  .registration-section {
  }
  .registration-title {
    color: #000;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 27.5px */
  letter-spacing: -0.5px;
      margin-bottom: 28px;
  }
  .form-group {
    margin-bottom: 1.5rem;
  }
  .form-row {
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    // gap: 1rem;
  }
  .form-input, .form-textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    background-color:#fff;
  }
    select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
         appearance: none;              /* Remove default arrow */
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 17px center;
      background-size: 17px;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus {
    outline: none;
    border-color: #000;
  }
  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }
  .checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .checkbox-group input {
    margin-top: 0.25rem;
  }
  .checkbox-group label {
    font-size: 0.875rem;
    line-height: 1.4;
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
    width: 100%;
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
  .back-link {
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
    letter-spacing: -0.24px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
    margin-bottom: 46px; display: inline-flex;
  }
  .back-link:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    .event-details {
      grid-template-columns: 1fr;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .event-hero-title {
      font-size: 2rem;
    }
  }
`

interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  region: string
  zipCode: string
  getUpdates: boolean
  consentText: string
}

export default function EventPage() {
  const params = useParams()
  const slug = params.slug as string

  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    region: '',
    zipCode: '',
    getUpdates: false,
    consentText: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventBySlug(slug)
        setEvent(eventData)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchEvent()
    }
  }, [slug])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event._id,
          ...formData
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Registration submitted successfully! We will be in touch soon.'
        })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          region: '',
          zipCode: '',
          getUpdates: false,
          consentText: ''
        })
      } else {
        throw new Error(result.error || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit registration. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: eventStyles }} />
        <div className="event-hero">
          <div>Loading...</div>
        </div>
      </>
    )
  }

  if (!event) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: eventStyles }} />
        <div className="event-hero">
          <div>Event not found</div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: eventStyles }} />

      {/* Hero Section */}
      {/* <section className="event-hero">
     
        <div className="event-hero-content">
          <h1 className="event-hero-title">{event.title}</h1>
         
          <p className="event-hero-description">{event.shortDescription}</p>
        </div>
      </section> */}

      {/* Content */}
      <section className="event-section">
       <div className="event-content">
          <div className='max-w-[1102px]'>
        
         <a href="/events" className="back-link">Back</a>
        <p className="event-hero-description">{event.shortDescription}</p>
        <div
              className="event-description"
              dangerouslySetInnerHTML={{ __html: event.detailDescription }}
            />
          {/* Registration Form */}
        {event.registrationEnabled && (
          <section className="registration-section">
            <h2 className="registration-title">Sign Up</h2>

            {submitMessage && (
              <div className={`message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
             {/* Row 1 */}
              <div className="form-row grid grid-cols-3 gap-[36px]">
                <div className="form-group flex flex-col">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="label">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-row grid grid-cols-3 gap-[36px] mt-6">
                <div className="form-group flex flex-col">
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group flex flex-col">
                  <label className="label">Region</label>
                  <select
                    name="region"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.region}
                    onChange={handleInputChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="form-group flex flex-col">
                  <label className="label">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>



              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="getUpdates"
                    id="getUpdates"
                    checked={formData.getUpdates}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="getUpdates">
                    I would like to receive updates and news from Rhodium 47
                  </label>
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="consentText"
                  className="form-textarea"
                  placeholder="Please acknowledge that you have read and agree to our terms and conditions *"
                  value={formData.consentText}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Register for Event'}
              </button>
            </form>
          </section>
        )}   
        <div className="event-details">
          <div className="event-info">
            {event.overviewText && (
              <div>
                <h3>Overview</h3>
                <p>{event.overviewText}</p>
              </div>
            )}
            {event.additionalInfo && (
              <div>
                <p>{event.additionalInfo}</p>
              </div>
            )}
          </div>

          {/* Event Meta */}
          <div className="event-meta">
            <div className="event-meta-item">
              <div className="event-meta-label">Date & Time</div>
              <div className="event-meta-value">
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
                {event.eventEndDate && (
                  <> - {new Date(event.eventEndDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}</>
                )}
              </div>
            </div>

            {event.location && (
              <div className="event-meta-item">
                <div className="event-meta-label">Location</div>
                <div className="event-meta-value">
                  {event.location.venueName}<br />
                  {event.location.address}
                  {event.location.mapLink && (
                    <><br /><a href={event.location.mapLink} target="_blank" rel="noopener noreferrer">View on Map</a></>
                  )}
                </div>
              </div>
            )}

            <div className="event-meta-item">
              <div className="event-meta-label">Category</div>
              <div className="event-meta-value">{event.category}</div>
            </div>

            {event.maxAttendees && (
              <div className="event-meta-item">
                <div className="event-meta-label">Max Attendees</div>
                <div className="event-meta-value">{event.maxAttendees}</div>
              </div>
            )}
          </div>
        </div>
       </div>
       </div>
      </section>
    </>
  )
}