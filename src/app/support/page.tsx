'use client'

import { useState, useEffect, JSX } from 'react'
import { PortableText } from '@portabletext/react'
import { getSupportPage } from '@/content/queries'
import { getFAQData } from '@/sanity/lib/sanity'
import type { SupportPage } from '@/content/types'
import FAQSection from '@/components/supportfaq'

const supportStyles = `
  .support-container {
    background:#F4F1F2;
    min-height: 100vh;
  }

  .support-hero {
    padding: 138px 2rem 110px;
    text-align: center;
  }

  .support-title {
      color: #000;
      text-align: center;
      font-size: 64px;
      font-style: normal;
      font-weight: 500;
      line-height: 110%; /* 70.4px */
      letter-spacing: -1.28px;
      margin-bottom:24px;
  }

  .support-description {
 color: #111;
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 36px */
text-transform: capitalize;
max-width:855px;margin:auto;
  }

  .search-container {
      max-width: 506.47px;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 18px 32px;
    color: #494949;
font-size: 15.8px;
font-style: normal;
font-weight: 400;
line-height: 24px;
    border: 1px solid #CBCBCB;
    background: #FFF;
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s;
  
  }

  .search-input:focus {
    border-color: #000;
  }

  .search-icon {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
  }

  .support-content {
    max-width: 1052px;
    margin: 0 auto;
   display:flex;
    gap: 84px;
  }

  .sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
    border-right: 1px solid #CBCBCB;
        padding-top: 23px;
            max-width: 355px;
    width: 100%;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-right: 30px;
    border-radius: 0.5rem;
    margin-bottom: 54px;
    cursor: pointer;
    transition: all 0.2s;
  }

  // .category-item:hover {
  //   background: #f9fafb;
  //   border-color: #d1d5db;
  // }

  // .category-item.active {
  //   background: #000;
  //   color: white;
  //   border-color: #000;
  // }

  .category-icon {
    font-size: 1.5rem;
  }

  .category-name {
    color: #151515;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 28px;
    flex: 1;
  }

  .category-arrow {
   transform: rotate(90deg);
    border-right: 2px solid #151515;border-bottom: 2px solid #151515;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  // .category-item.active .category-arrow {
  //   transform: rotate(90deg);
  //   border-right: 2px solid #151515;border-bottom: 2px solid #151515;
  //   width: 8px;
  //   height: 8px;
  //   transform: rotate(45deg);
  //   flex-shrink: 0;
  // }

  .main-content {
    max-width:611px; width:100%;
  }
.content-body h1{
 margin-top: 47px;
 margin-bottom: 28px;
color: #000;
font-size: 36px;
font-style: normal;
font-weight: 400;
line-height: 50px;
}


  .content-body h4 {
    color: #000;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 32px; /* 133.333% */
  margin-bottom: 18px;
  }

  .content-body h5 {
    font-size: 1.125rem;
    font-weight: 600;
    // color: #000;
    margin-top: 18px;
    cursor: pointer;
    // border-bottom: 1px solid #e5e7eb;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    transition: color 0.2s;
    gap:15px;
  }

  // .content-body h5:hover {
  //   color: #494949;
  // }

  .question-toggle {
    font-size: 1.5rem;
    transition: transform 0.3s;
    flex-shrink: 0;
  }

  .question-toggle.open {
    transform: rotate(180deg);
  }

  .answer-content {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
  }

  .answer-content.open {
    opacity: 1;
    transform: translateY(0);
    transition: max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
  }

  .content-body p {
   color: #151515;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 28px;
    margin-bottom: 10px;
  }

  .content-body ul, .content-body ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .content-body li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: #4b5563;
  }

  .content-body strong {
    font-weight: 600;
    color: #000;
  }

  .content-body em {
    font-style: italic;
  }

  .content-body code {
    background: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875rem;
  }

  .content-body a {
    color: #2563eb;
    text-decoration: underline;
  }

  .contact-section {
    margin-top: 50px;
    padding-bottom: 50px;
  }

  .contact-title {
    color: #000;
font-size: 64px;
font-style: normal;
font-weight: 500;
line-height: 110%; 
letter-spacing: -1.28px;
margin-bottom:32px;
  }

  .contact-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .contact-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid #494949;
    transition: all 0.2s;
    cursor: pointer;gap:8px;
    padding:25px;
  }

  .contact-option:hover {
    border-color: #000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .contact-icon {
    font-size: 1.5rem;
  }

  .contact-label {
    color: #000;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px;
  }

  .contact-value {
    color: #000;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 125% */
text-decoration-line: underline;
text-decoration-style: solid;
text-decoration-skip-ink: auto;
text-decoration-thickness: auto;
text-underline-offset: auto;
text-underline-position: from-font;
  }

  .no-data {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
  }

  @media (max-width: 1024px) {
    .support-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .sidebar {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .contact-options {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .support-title {
      font-size: 2.5rem;
    }

    .sidebar {
      grid-template-columns: 1fr;
    }

    .main-content {
      padding: 2rem 1.5rem;
    }

    .contact-title {
      font-size: 2rem;
    }
  }
`

// Portable Text components for answer content
const answerPortableTextComponents = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul>{children}</ul>,
    number: ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    underline: ({ children }: any) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      )
    },
  },
}

export default function SupportPage() {
  const [supportData, setSupportData] = useState<SupportPage | null>(null)
  const [faqData, setFaqData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const [support, faq] = await Promise.all([
          getSupportPage(),
          getFAQData()
        ])
        setSupportData(support)
        setFaqData(faq)
      } catch (error) {
        console.error('Error fetching support data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSupportData()
  }, [])

  // Toggle question accordion
  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Reset open questions when category changes
  useEffect(() => {
    setOpenQuestions(new Set())
  }, [activeCategory])

  const getCategoryIcon = (name: string) => {
    const icons: { [key: string]: string } = {
      'Purchasing': '🛒',
      'Products': '📦',
      'Ownership': '📋',
      'Company': '🏢',
      'Account': '👤',
      'Billing': '💳',
      'Technical': '⚙️',
      'General': 'ℹ️',
      'FAQ': '❓',
    }
    return icons[name] || '📋'
  }

  const getContactIcon = (type: string) => {
      const icons: { [key: string]: JSX.Element } = {
    contact: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.35825 1.04183C1.42894 1.01545 1.50966 1 1.6 1H14.4C14.4903 1 14.5711 1.01545 14.6418 1.04183L8 5.78594L1.35825 1.04183ZM1 2.01484V10.5C1 10.7129 1.21051 11 1.6 11H14.4C14.7895 11 15 10.7129 15 10.5V2.01484L8.2906 6.8073C8.1168 6.9314 7.88323 6.9314 7.70938 6.8073L1 2.01484ZM1.6 0H14.4C15.28 0 16 0.675 16 1.5V10.5C16 11.325 15.28 12 14.4 12H1.6C0.72 12 0 11.325 0 10.5V1.5C0 0.675 0.72 0 1.6 0Z"
          fill="currentColor"
        />
      </svg>
    ),
    chat: (
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.16016 2.35352C3.33173 2.35352 2.66016 3.02509 2.66016 3.85352V10.8509V10.8542V17.6098C2.66016 18.1444 3.30645 18.4121 3.68442 18.0341L8.11929 13.5992H6.70508L3.66016 16.6442V12.6438C3.65951 12.6291 3.65918 12.6142 3.65918 12.5992V9.85417C3.65885 9.85417 3.65951 9.85417 3.65918 9.85417L3.66016 3.85352C3.66016 3.57737 3.88402 3.35352 4.16016 3.35352H17.1609C17.437 3.35352 17.6609 3.57737 17.6609 3.85352V13.104C17.6609 13.3802 17.437 13.604 17.1609 13.604H8.11775L7.11775 14.604H17.1609C17.9893 14.604 18.6609 13.9325 18.6609 13.104V3.85352C18.6609 3.02509 17.9893 2.35352 17.1609 2.35352H4.16016Z"
          fill="currentColor"
        />
      </svg>
    ),
    call: (
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.2564 12.7372C5.2959 10.7737 3.83877 8.33772 2.40151 5.0021C2.1163 4.34018 2.27169 3.57596 2.776 3.07165L4.85742 0.990232C5.30013 0.547528 6.01789 0.547526 6.4606 0.990231L8.91592 3.44555C9.35862 3.88825 9.35862 4.60602 8.91592 5.04872L7.49412 6.47052C8.17266 7.46732 9.24568 8.68722 10.3866 9.81708C11.5089 10.9287 12.6613 11.9178 13.5221 12.5017L14.9455 11.0783C15.3882 10.6356 16.106 10.6356 16.5487 11.0783L19.004 13.5336C19.4467 13.9763 19.4467 14.6941 19.004 15.1368L16.9212 17.2195C16.4179 17.7229 15.6554 17.8788 14.994 17.5952C11.6511 16.1617 9.21709 14.7008 7.2564 12.7372ZM7.96404 12.0306C9.80052 13.8699 12.1076 15.2694 15.3881 16.6762C15.6665 16.7956 15.9945 16.7321 16.2141 16.5124L18.2969 14.4297C18.349 14.3775 18.349 14.2929 18.2969 14.2407L15.8416 11.7854C15.7894 11.7332 15.7048 11.7332 15.6526 11.7854L13.9441 13.4939L13.6668 13.7712L13.3315 13.568C12.3493 12.9729 10.9728 11.8051 9.68286 10.5276C8.39156 9.24875 7.14111 7.81463 6.42903 6.66734L6.21995 6.33047L6.50031 6.05012L8.20881 4.34161C8.26099 4.28943 8.26099 4.20483 8.20881 4.15265L5.75349 1.69733C5.70131 1.64515 5.61671 1.64515 5.56453 1.69733L3.48311 3.77875C3.26308 3.99878 3.19974 4.32755 3.31988 4.60639C4.7311 7.88157 6.12738 10.1912 7.96404 12.0306Z" fill="black"/>
  </svg>
    ),
  }
    return icons[type] || '📋'
  }

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: supportStyles }} />
        <div className="support-container">
          <div className="no-data">Loading...</div>
        </div>
      </>
    )
  }

  if (!supportData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: supportStyles }} />
        <div className="support-container">
          <div className="no-data">No support data available</div>
        </div>
      </>
    )
  }

  const currentCategory = supportData.categories?.[activeCategory]

  // Filter sections and questions based on search query
  const getFilteredContent = () => {
    if (!currentCategory || !searchQuery.trim()) {
      return currentCategory
    }

    const query = searchQuery.toLowerCase().trim()

    const filteredSections = currentCategory.sections
      ?.map(section => {
        const filteredQuestions = section.questions?.filter(qa =>
          qa.question.toLowerCase().includes(query)
        )

        if (filteredQuestions && filteredQuestions.length > 0) {
          return {
            ...section,
            questions: filteredQuestions
          }
        }
        return null
      })
      .filter(section => section !== null)

    return {
      ...currentCategory,
      sections: filteredSections
    }
  }

  const filteredCategory = getFilteredContent()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: supportStyles }} />

      <div className="support-container font-helvetica">
        {/* Hero Section */}
        <section className="support-hero">
          <h1 className="support-title font-helvetica">{supportData.title}</h1>
          <p className="support-description font-helvetica">{supportData.description}</p>
        </section>

        {/* Main Content */}
        <div className="support-content">
          {/* Sidebar */}
          <aside className="sidebar">
            {supportData.categories?.map((category, index) => (
              <div
                key={index}
                className={`category-item ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
              >
                <span className="category-icon">
                  {category.icon || getCategoryIcon(category.name)}
                </span>
                <span className="category-name font-helvetica">{category.name}</span>
                <span className="category-arrow"></span>
              </div>
            ))}
          </aside>

          {/* Content */}
          <main className="main-content">
            <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={supportData.searchPlaceholder || 'How can we help?'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <g clip-path="url(#clip0_587_1226)">
                <path d="M6.14901 11.9465C9.02509 11.9465 11.3566 9.61494 11.3566 6.73885C11.3566 3.86277 9.02509 1.53125 6.14901 1.53125C3.27293 1.53125 0.941406 3.86277 0.941406 6.73885C0.941406 9.61494 3.27293 11.9465 6.14901 11.9465Z" stroke="#151515" stroke-width="1.88235"/>
                <path d="M9.82129 10.4111L15.0592 15.6491" stroke="#151515" stroke-width="1.88235"/>
              </g>
              <defs>
                <clipPath id="clip0_587_1226">
                  <rect width="16" height="16" fill="white" transform="translate(0 0.589844)"/>
                </clipPath>
              </defs>
            </svg>
            </span>
          </div>
            {filteredCategory && filteredCategory.sections && filteredCategory.sections.length > 0 ? (
              <div className="content-body">
                {/* Main Category Title */}
                {filteredCategory.mainTitle && (
                  <h1>{filteredCategory.mainTitle}</h1>
                )}

                {filteredCategory.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {/* Section Title */}
                    {section.sectionTitle && (
                      <h4>{section.sectionTitle}</h4>
                    )}

                    {/* Questions & Answers */}
                    {section.questions?.map((qa, qaIndex) => {
                        const questionKey = `${sectionIndex}-${qaIndex}`;
                        const isOpen = openQuestions.has(parseInt(questionKey.replace('-', '')));

                        return (
                          <div key={qaIndex}>
                            {/* Question */}
                            <h5
                              onClick={() => toggleQuestion(parseInt(questionKey.replace('-', '')))}
                              className="flex gap-[15px] items-center cursor-pointer text"
                            >
                              <span className=" font-[400] text-[16px] text-[#151515]">{qa.question}</span>

                              {/* Toggle Icon */}
                              <span className="question-toggle text-[#151515]">
                                {isOpen ? (
                                  // Minus SVG
                                  <svg className="w-6 h-6 !text-[#000] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                                    </svg>

                                ) : (
                                  // Plus SVG
                                  <svg className="w-6 h-6 !text-[#000] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                  </svg>

                                )}
                              </span>
                            </h5>

                            {/* Answer */}
                            <div
                              className={`answer-content mt-[18px] transition-all duration-500 ease-in-out ${isOpen ? 'open' : ''}`}
                              style={{ maxHeight: isOpen ? '500px' : '0px' }}
                            >
                              {qa.answer && (
                                <PortableText
                                  value={qa.answer}
                                  components={answerPortableTextComponents}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}

                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data">
                {searchQuery.trim() ? 'No results found for your search' : 'No content available for this category'}
              </div>
            )}
          </main>
        </div>

        {/* Contact Section */}
        {supportData.contactSection && (
          <section className="contact-section">
          <div className='max-w-[1332px] m-auto'>
              <h2 className="contact-title">
                {supportData.contactSection.title || 'Get in touch'}
             </h2>

          <div className="contact-options space-y-3">
  {supportData.contactSection.contactOptions?.map((option, index) => {
    // Default link
    let link = "#";

    // Set correct link based on type and value
    if (option.type === "call" && option.value) {
      // Handle phone numbers - remove formatting for tel: link
      const phoneNumber = option.value.replace(/\s+/g, '').replace(/[()]/g, '');
      link = `tel:${phoneNumber}`;
    } else if (option.type === "chat" && option.value && option.value.includes('@')) {
      // If chat has an email, make it mailto
      link = `mailto:${option.value}`;
    } else if (option.type === "contact") {
      link = "/contact-us";
    }

    return (
      <a
        key={index}
        href={link}
        className="contact-option flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
      >
        {/* Left side — icon + label */}
        <div className="contact-info flex items-center gap-2">
          <span className="contact-icon text-xl">{getContactIcon(option.type)}</span>
          <span className="contact-label font-medium text-gray-800">
            {option.label}
          </span>
        </div>

        {/* Right side — value or button text */}
        {option.value && (
          <span className="contact-value text-gray-600">{option.value}</span>
        )}
        {option.buttonText && !option.value && (
          <span className="contact-value text-gray-600">{option.buttonText}</span>
        )}
      </a>
    );
  })}
</div>



          </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqData && (
          <FAQSection
            data={faqData}
            backgroundColor="white"
            textColor="#000"
          />
        )}
      </div>
    </>
  )
}
