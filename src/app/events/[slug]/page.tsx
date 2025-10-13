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
    color: #000;
  }
  .form-input::placeholder, .form-textarea::placeholder {
    color: #9ca3af;
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
    gap:8px;
  }
  .checkbox-group input {
  border: 1px solid #ECEDED;
background: #FFF;
  }
  .checkbox-group label {
    // font-size: 0.875rem;
    // line-height: 1.4;
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
    .checkbox-group label{
    
    }
    .custom-checkbox {
  position: relative;
}

.custom-checkbox:checked::after {
  content: '✔';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: black;
  line-height: 1;
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
  const [registrationCount, setRegistrationCount] = useState<number>(0)
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

        // Fetch registration count if event has maxAttendees
        if (eventData?.maxAttendees && eventData?._id) {
          try {
            const response = await fetch(`/api/events/registrations/count?eventId=${eventData._id}`)
            const data = await response.json()
            setRegistrationCount(data.count || 0)
          } catch (error) {
            console.error('Error fetching registration count:', error)
          }
        }
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

            {/* Show remaining spots only after 10 people registered */}
            {event.maxAttendees && registrationCount >= 10 && (
              <>
                {(() => {
                  const remaining = event.maxAttendees - registrationCount
                  const isSoldOut = remaining <= 0
                  const isLowSpots = remaining > 0 && remaining <= event.maxAttendees * 0.2

                  return (
                    <div className={`mb-4 p-3 rounded ${isSoldOut ? 'bg-red-100 text-red-800' : isLowSpots ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {isSoldOut ? (
                        <p className="font-bold">⚠️ This event is SOLD OUT</p>
                      ) : (
                        <p className="font-semibold">
                          {remaining} spot{remaining !== 1 ? 's' : ''} remaining out of {event.maxAttendees}
                        </p>
                      )}
                    </div>
                  )
                })()}
              </>
            )}

            {submitMessage && (
              <div className={`message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}

            {/* Show form only if not sold out */}
            {(!event.maxAttendees || registrationCount < event.maxAttendees) ? (
            <form onSubmit={handleSubmit}>
             {/* Row 1 */}
              <div className="form-row grid grid-cols-3 gap-[36px]">
                <div className="form-group flex flex-col">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
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
                    placeholder="Enter your last name"
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
                    placeholder="Enter your phone number"
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
                    placeholder="Enter your email address"
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
                    placeholder="Enter your zip code"
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>



              <div className="form-group mt-[28px]">
                  <div className="checkbox-group mb-[19px]">
                  <input
                    type="checkbox"
                    name="getUpdates"
                    id="getUpdates"
                    className='custom-checkbox appearance-none  border border-[#ECEDED] bg-white min-w-[16px] h-[16px]  cursor-pointer checked:bg-[#0a0a0a]'
                    checked={formData.getUpdates}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="getUpdates " className='underline !text-[#747474] font-[400] text-[12px] leading-[140%] tracking-[-0.24px] font-helvetica not-italic'>
                    Get updates
                  </label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="getUpdates"
                    id="getUpdates"
                    className='custom-checkbox appearance-none border border-[#ECEDED] bg-white min-w-[16px] h-[16px]  cursor-pointer'
                    checked={formData.getUpdates}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="getUpdates " className='!text-[#747474] font-[400] text-[12px] leading-[140%] tracking-[-0.24px] font-helvetica not-italic'>
                    By clicking "Submit", I authorize to contact me about this request via the contact information I provide. I understand calls or texts may use automatic or computer-assisted dialing or pre-recorded messages. Normal message and data rates apply. I can opt out at any time in the Company Service Portal or by unsubscribing. This consent is not required to complete your request.
                  </label>
                </div>
              </div>

              {/* <div className="form-group">
                <textarea
                  name="consentText"
                  className="form-textarea"
                  placeholder="Please acknowledge that you have read and agree to our terms and conditions *"
                  value={formData.consentText}
                  onChange={handleInputChange}
                  required
                />
              </div> */}

              <button
                type="submit"
                className=" mt-[42px] mb-[59px] text-white text-center font-helvetica text-[20px] not-italic font-medium leading-[120%] tracking-[-0.4px] flex w-[196px] h-[54px] px-[50px] pt-[18px] pb-[19px] justify-center items-center shrink-0 rounded-[100px] border border-[rgba(157,192,59,0)] bg-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            ) : (
              <div className="p-6 bg-gray-100 rounded-lg text-center">
                <p className="text-lg font-bold text-gray-700">This event is now fully booked.</p>
                <p className="text-gray-600 mt-2">Please check back for future events or contact us for more information.</p>
              </div>
            )}
          </section>
        )}   
        <div className="event-details">
          <div className="event-info">
            {event.overviewText && (
              <div>
                <h3 className='mb-[18px] text-black font-helvetica text-[20px] not-italic font-bold leading-[110%] tracking-[-0.4px]'>Overview</h3>
                <p className='mb-[31px] text-[#111] font-helvetica text-[16px] not-italic font-normal leading-[150%] capitalize'>{event.overviewText}</p>
              </div>
            )}
            {event.additionalInfo && (
              <div>
                <p className='mb-[31px] text-[#111] font-helvetica text-[16px] not-italic font-normal leading-[150%] capitalize'>{event.additionalInfo}</p>
              </div>
            )}
          </div>

          {/* Event Meta */}
          <div className="event-meta">
            <div className="event-meta-item">
              <div className="mb-[18px] text-black font-helvetica text-[20px] not-italic font-bold leading-[110%] tracking-[-0.4px]">Timetable</div>
              <div className="mb-[31px] text-[#111] font-helvetica text-[16px] not-italic font-normal leading-[150%] capitalize">
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
                <div className="mb-[18px] text-black font-helvetica text-[20px] not-italic font-bold leading-[110%] tracking-[-0.4px]">Location</div>
                <div className="max-w-[221px] mb-[31px] text-[#111] font-helvetica text-[16px] not-italic font-normal leading-[150%] capitalize">
                  {event.location.venueName}<br />
                  {event.location.address}
                  {event.location.mapLink && (
                    <><br /><a href={event.location.mapLink} target="_blank" rel="noopener noreferrer" className='hidden'>View on Map</a></>
                  )}
                </div>
              </div>
            )}

            <div className="event-meta-item">
              <div className="mt-[31px] underline text-[#111] font-helvetica text-[16px] not-italic font-normal leading-[150%] capitalize">Get Directions</div>
            </div>
{/* 
            {event.maxAttendees && (
              <div className="event-meta-item">
                <div className="event-meta-label">Max Attendees</div>
                <div className="event-meta-value">{event.maxAttendees}</div>
              </div>
            )} */}
          </div>
        </div>
       </div>
       </div>
      </section>
    </>
  )
}