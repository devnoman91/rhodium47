'use client'

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import { getSupportPage } from '@/content/queries'
import { getFAQData } from '@/sanity/lib/sanity'
import type { SupportPage } from '@/content/types'
import FAQSection from '@/components/FAQSection'

const supportStyles = `
  .support-container {
    background: #f5f5f5;
    min-height: 100vh;
  }

  .support-hero {
    background: white;
    padding: 4rem 2rem 3rem;
    text-align: center;
  }

  .support-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #000;
  }

  .support-description {
    font-size: 1.125rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .search-container {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    border-color: #000;
  }

  .search-icon {
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
  }

  .support-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;
  }

  .sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .category-item:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  .category-item.active {
    background: #000;
    color: white;
    border-color: #000;
  }

  .category-icon {
    font-size: 1.5rem;
  }

  .category-name {
    font-weight: 500;
    font-size: 0.95rem;
    flex: 1;
  }

  .category-arrow {
    font-size: 0.875rem;
    transition: transform 0.2s;
  }

  .category-item.active .category-arrow {
    transform: rotate(90deg);
  }

  .main-content {
    background: white;
    border-radius: 0.75rem;
    padding: 3rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .content-body h1, .content-body h2, .content-body h3, .content-body h4 {
    font-weight: 700;
    color: #000;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  .content-body h1 {
    font-size: 2rem;
  }

  .content-body h2 {
    font-size: 1.75rem;
  }

  .content-body h3 {
    font-size: 1.5rem;
  }

  .content-body h4 {
    font-size: 1.25rem;
  }

  .content-body h5 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #000;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .content-body p {
    font-size: 1rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 1rem;
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
    margin-top: 5rem;
    padding: 3rem 2rem;
    background: white;
  }

  .contact-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: left;
    margin-bottom: 3rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2rem;
  }

  .contact-options {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 0 2rem;
  }

  .contact-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    transition: all 0.2s;
    cursor: pointer;
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
    font-weight: 500;
    font-size: 1rem;
  }

  .contact-value {
    font-weight: 600;
    font-size: 1rem;
    text-decoration: underline;
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

// Portable Text components
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    h4: ({ children }: any) => <h4>{children}</h4>,
    h5: ({ children }: any) => <h5>{children}</h5>,
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
    code: ({ children }: any) => <code>{children}</code>,
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

  const getCategoryIcon = (name: string) => {
    const icons: { [key: string]: string } = {
      'Purchasing': '🛒',
      'Products': '🚗',
      'Ownership': '🔑',
      'Company': '🏢'
    }
    return icons[name] || '📋'
  }

  const getContactIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'contact': '✉️',
      'chat': '💬',
      'call': '📞'
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: supportStyles }} />

      <div className="support-container">
        {/* Hero Section */}
        <section className="support-hero">
          <h1 className="support-title">{supportData.title}</h1>
          <p className="support-description">{supportData.description}</p>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={supportData.searchPlaceholder || 'How can we help?'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
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
                <span className="category-name">{category.name}</span>
                <span className="category-arrow">›</span>
              </div>
            ))}
          </aside>

          {/* Content */}
          <main className="main-content">
            {currentCategory && currentCategory.content && (
              <div className="content-body">
                <PortableText
                  value={currentCategory.content}
                  components={portableTextComponents}
                />
              </div>
            )}
            {(!currentCategory || !currentCategory.content) && (
              <div className="no-data">No content available for this category</div>
            )}
          </main>
        </div>

        {/* Contact Section */}
        {supportData.contactSection && (
          <section className="contact-section">
            <h2 className="contact-title">
              {supportData.contactSection.title || 'Get in touch'}
            </h2>

            <div className="contact-options">
              {supportData.contactSection.contactOptions?.map((option, index) => (
                <div key={index} className="contact-option">
                  <div className="contact-info">
                    <span className="contact-icon">{getContactIcon(option.type)}</span>
                    <span className="contact-label">{option.label}</span>
                  </div>
                  {option.value && (
                    <span className="contact-value">{option.value}</span>
                  )}
                  {option.buttonText && !option.value && (
                    <span className="contact-value">{option.buttonText}</span>
                  )}
                </div>
              ))}
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
