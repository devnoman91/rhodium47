'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentOffers } from '@/content/queries'

const criticalInlineStyles = `
  .offers-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px 40px;
    background: #f8f9fa;
    min-height: 100vh;
  }
  .offers-hero {
    text-align: center;
    margin-bottom: 60px;
  }
  .offers-hero-title {
    font-size: 48px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 16px;
    font-family: 'helveticaNeue', sans-serif;
  }
  .offers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }
  .offer-card {
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;
    height: 400px;
  }
  .offer-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  .offer-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .offer-content {
    padding: 24px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .offer-name {
    font-size: 14px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .offer-title {
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    line-height: 1.3;
    margin-bottom: 16px;
  }
  .offer-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .offer-link:hover {
    color: #1d4ed8;
  }
  .offer-arrow {
    transition: transform 0.2s ease;
  }
  .offer-card:hover .offer-arrow {
    transform: translateX(4px);
  }
  @media (max-width: 768px) {
    .offers-grid {
      grid-template-columns: 1fr;
    }
    .offers-hero-title {
      font-size: 36px;
    }
    .offer-card {
      height: 350px;
    }
  }
`

interface CurrentOffersData {
  _id: string
  title: string
  offers: Array<{
    name: string
    title: string
    image?: {
      asset: { url: string }
      alt?: string
    }
    link: string
  }>
}

export default function CurrentOffersPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [offersData, setOffersData] = useState<CurrentOffersData | null>(null)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true)
        const data = await getCurrentOffers()
        console.log('Current offers data:', data)
        setOffersData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching current offers:', err)
        setError('Failed to load current offers')
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="offers-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading offers...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !offersData) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />
        <div className="offers-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '18px', color: '#ef4444' }}>{error || 'No offers data found'}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalInlineStyles }} />

      <div className="offers-container">
        {/* Hero Section */}
        <motion.div
          className="offers-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="offers-hero-title">{offersData.title}</h1>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          className="offers-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {offersData.offers.map((offer, index) => (
            <Link key={index} href={offer.link}>
              <motion.div
                className="offer-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {offer.image?.asset?.url && (
                  <img
                    src={offer.image.asset.url}
                    alt={offer.image.alt || offer.title}
                    className="offer-image"
                  />
                )}
                <div className="offer-content">
                  <div>
                    <div className="offer-name">{offer.name}</div>
                    <h3 className="offer-title">{offer.title}</h3>
                  </div>
                  <div className="offer-link">
                    Learn More
                    <span className="offer-arrow">→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </>
  )
}