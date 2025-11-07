'use client'

import { useState, useEffect } from 'react'
import { getContactPage } from '@/content/queries'
import Image from 'next/image'
import letter from '../../../public/images/letter.png'
const contactStyles = `
  .contact-hero {
    position: relative;
    // height: 60vh;
    // background: linear-gradient(135deg, #000 0%, #333 100%);
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // color: white;
       text-align: center;
       padding: 170px 0 62px 0 ;

  }
  .contact-hero-title {
    color: #000;

text-align: center;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%; /* 70.4px */
letter-spacing: -1.28px;
    margin-bottom: 24px;
  }
  .contact-hero-description {
    color: #111;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 36px */
    text-transform: capitalize;
    max-width: 855px;
    margin: 0 auto;
  }
  .contact-content {

  }
  .contact-grid {
    display:flex;
    gap: 56px;
    max-width: 1332px;
    margin:0 auto; background-color:#fff;
    padding:21px 46px 21px 11px; 
    border-radius:10px;
  }
    .contact-info {
    max-width: 491px;
    width: 100%;
    padding: 33px 44px 33px 31px;
    // background: #e2e2e2;
    background: #560100;
    border-radius:10px;
}
  .contact-info h3 {
      color: #fff;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 70px;
  }
  .contact-item {
    margin-bottom: 2rem;
  }
  .contact-label {
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 30px */
    margin-bottom: 8px;
  }
  .contact-desc{
    color: var(--Secondinary-500, #A5A5A5);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; word-wrap: break-word;
  }
    .contact-form{
    max-width:728px;
    margin:0 auto;
    width:100%;
    padding-top:55px;
    }
  .contact-form h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .form-input, .form-textarea, .form-select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1.2px solid #EEE;
    background: var(--Neutral-0, #FFF);
    display: inline-flex;
    height: 48px;
    padding: 12px 0 12px 16px;
    font-size: 1rem;
    color:#A5A5A5;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus {
    outline: none;
    border-color: #000;
  }
  .form-textarea {
    min-height: 117px;
    resize: vertical;
  }
  .submit-btn {
    display: flex;
    width: 238.334px;
    height: 54px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #000;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.12);
    transition: background 0.2s;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left:auto;
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
    .contact-info-inner{
    
    }
      @media (max-width: 991px) {
  .form-row {
    grid-template-columns:1fr;
    gap:0;
  }
}
  @media (max-width: 768px) {
  .contact-hero{
  padding:170px 15px 30px 15px; 
  }
  .contact-hero-title{
  font-sie:34px;
  margin-bottom:10px;
  }
   .contact-hero-description {
    font-size: 16px;
}
    .contact-grid {
    flex-direction:column-reverse;
    gap: 10px;
    padding: 0 15px ;
    background:none;
}
    .contact-form{
    max-width:100%;
        background-color: #fff;
        border-radius: 10px;
    padding: 28px 22px 35px 22px;
}
    .contact-hero-title {
      font-size: 2rem;
    }
      .contact-info {
    max-width: 100%;
    width: 100%;
    padding: 33px 16px 20px 16px;
  }
    .submit-btn {
 margin-left:0;
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
      <section className="contact-hero bg-[#F4F1F2] font-helvetica">
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
      <section className="contact-content bg-[#F4F1F2] font-helvetica md:pb-[56px] pb-[28px]">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info relative overflow-hidden">
            <h3>{contactData?.contactInfo?.sectionTitle || 'Get in Touch'}</h3>

            <div className='relative z-[4] contact-info-inner grid grid-cols-2 gap-x-[20px]'>
              {/* Email Section */}
              {(contactData?.contactInfo?.email1 || contactData?.contactInfo?.email2) && (
              <div className="contact-item">
                <div className='mb-[31px] inline-flex items-center gap-[10px] p-[12px] rounded-[10px] border-[1.2px] border-[#EEE] bg-white'>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#292929" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.9965 11H16.0054" stroke="#292929" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.9955 11H12.0045" stroke="#292929" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.99451 11H8.00349" stroke="#292929" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className="contact-label">Email</div>
                {contactData?.contactInfo?.email1 && (
                  <div className='contact-desc'>{contactData.contactInfo.email1}</div>
                )}
                {contactData?.contactInfo?.email2 && (
                  <div className='contact-desc'>{contactData.contactInfo.email2}</div>
                )}
              </div>
              )}

              {/* Contact Us Section */}
              {(contactData?.contactInfo?.phone1 || contactData?.contactInfo?.phone2) && (
              <div className="contact-item">
                <div className='mb-[31px] inline-flex items-center gap-[10px] p-[12px] rounded-[10px] border-[1.2px] border-[#EEE] bg-white'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#292929" strokeWidth="1.5" stroke-miterlimit="10"/>
                  </svg>
                </div>
                <div className="contact-label">Contact Us</div>
                {contactData?.contactInfo?.phone1 && (
                  <div className='contact-desc'>{contactData.contactInfo.phone1}</div>
                )}
                {contactData?.contactInfo?.phone2 && (
                  <div className='contact-desc'>{contactData.contactInfo.phone2}</div>
                )}
              </div>
              )}

            {contactData?.contactInfo?.address && (
              <div className="contact-item col-span-2">
                <div className='mb-[31px] inline-flex items-center gap-[10px] p-[12px] rounded-[10px] border-[1.2px] border-[#EEE] bg-white'>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9999 13.4304C13.723 13.4304 15.1199 12.0336 15.1199 10.3104C15.1199 8.5873 13.723 7.19043 11.9999 7.19043C10.2768 7.19043 8.87988 8.5873 8.87988 10.3104C8.87988 12.0336 10.2768 13.4304 11.9999 13.4304Z" stroke="#292929" strokeWidth="1.5"/>
                  <path d="M3.6202 8.49C5.5902 -0.169998 18.4202 -0.159997 20.3802 8.5C21.5302 13.58 18.3702 17.88 15.6002 20.54C13.5902 22.48 10.4102 22.48 8.3902 20.54C5.6302 17.88 2.4702 13.57 3.6202 8.49Z" stroke="#292929" strokeWidth="1.5"/>
                  </svg>

                </div>
                <div className="contact-label">Visit Us</div>
                <div className='contact-desc'>
                  {contactData.contactInfo.address.street}<br />
                  {contactData.contactInfo.address.city}, {contactData.contactInfo.address.state} {contactData.contactInfo.address.zipCode}<br />
                  {contactData.contactInfo.address.country}
                </div>
              </div>
            )}

            {contactData?.contactInfo?.businessHours?.length > 0 && (
              <div className="contact-item col-span-2">
                <div className='mb-[31px] inline-flex items-center gap-[10px] p-[12px] rounded-[10px] border-[1.2px] border-[#EEE] bg-white'>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z" stroke="#292929" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.4098 4C18.3498 4 19.9098 5.57 19.9098 7.5C19.9098 9.39 18.4098 10.93 16.5398 11C16.4598 10.99 16.3698 10.99 16.2798 11" stroke="#292929" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.16021 14.56C1.74021 16.18 1.74021 18.82 4.16021 20.43C6.91021 22.27 11.4202 22.27 14.1702 20.43C16.5902 18.81 16.5902 16.17 14.1702 14.56C11.4302 12.73 6.92021 12.73 4.16021 14.56Z" stroke="#292929" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14" stroke="#292929" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>
                <div className="contact-label">Business Hours</div>
                {contactData.contactInfo.businessHours.map((hours: any, index: number) => (
                  <div className='contact-desc' key={index}>{hours.day}: {hours.hours}</div>
                ))}
              </div>
            )}
            </div>

            <div className="circle-small absolute bottom-[144px] right-[40px] h-[138px] w-[138px] z-[3]">
              <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" width="139" height="138" viewBox="0 0 139 138" fill="none">
                <circle cx="69.1367" cy="69" r="69" fill="#fff" fill-opacity="0.13"/>
              </svg>
            </div>
            <div className="circle-large absolute bottom-0 right-[-150px] h-[269px] z-[1]">
              <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" width="139" height="138" viewBox="0 0 139 138" fill="none">
                <circle cx="69.1367" cy="69" r="69" fill="#fff" fill-opacity="0.13"/>
              </svg>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form relative">
            {/* <h3>Send us a Message</h3> */}

            {submitMessage && (
              <div className={`message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                   <label className="label text-[var(--Neutral-500,#292929)] font-helvetica text-[16px] not-italic font-medium leading-[150%] md:mb-[16px] mb-[6px] flex capitalize">Full Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                   <label className="label text-[var(--Neutral-500,#292929)] font-helvetica text-[16px] not-italic font-medium leading-[150%] md:mb-[16px] mb-[6px] flex capitalize">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                   <label className="label text-[var(--Neutral-500,#292929)] font-helvetica text-[16px] not-italic font-medium leading-[150%] md:mb-[16px] mb-[6px] capitalize flex ">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                   <label className="label text-[var(--Neutral-500,#292929)] font-helvetica text-[16px] not-italic font-medium leading-[150%] md:mb-[16px] mb-[6px] capitalize flex">Phone #</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                 <label className="label text-[var(--Neutral-500,#292929)] font-helvetica text-[16px] not-italic font-medium leading-[150%] md:mb-[16px] mb-[6px] capitalize flex ">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Enter message subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                 <label className="label text-[var(--Neutral-500,#292929)] font-helvetica text-[16px] not-italic font-medium leading-[150%] md:mb-[16px] mb-[6px] capitalize flex ">Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your requirements or questions..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden cursor-pointer submit-btn px-[32px] py-[14px] rounded-full font-semibold text-[16px] transition-all duration-300 group
                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : '!bg-[#560100] text-white hover:bg-[]'}
                  `}
                >
                  {/* sliding overlay */}
                  {!isSubmitting && (
                    <span
                      className="absolute inset-0 bg-white translate-x-full
                                transition-transform duration-500 ease-in-out rounded-full
                                group-hover:translate-x-0"
                    />
                  )}

                  {/* text */}
                  <span
                    className={`relative z-10 transition-colors duration-500 ease-in-out ${
                      isSubmitting ? 'text-white' : 'group-hover:text-black'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </span>
                </button>

            </form>
           <div className="svg-col w-full  md:block hidden max-w-[240px] min-h-[112px] ml-auto right-[201px] absolute bottom-[-55px]">
              <Image
              className='w-full h-full'
                src={letter}
                alt="Letter icon"
                width={100}   
                height={100}  
              />
            </div>


          </div>
        </div>
      </section>

      {/* contact map section */}
      <section className='bg-[#F4F1F2] md:pb-[62px] pb-[35px] px-[15px]'>
        <div className="map-container max-w-[1332px] m-auto rounded-[20px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8933061.100748068!2d-105.84408458659767!3d39.37228836259935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1760406033891!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" className='w-full'
          ></iframe>
          </div>

      </section>
    </>
  )
}