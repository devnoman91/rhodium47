'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentOffers } from '@/content/queries'

const criticalInlineStyles = `
  .offers-container {
    max-width: 100%;
    margin: 0 auto;
    padding-top: 170px;
    background: #F4F1F2;
    padding-inline: calc(var(--spacing) * 12);
    padding-bottom: 60px;
  }
  .offers-hero {
    text-align: center;
    margin-bottom: 30px;
  }
  .offers-hero-title {
    text-align: center;
    color: #000;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: -1.28px;
  }
  .offers-hero-desc {
    color: #111;
    text-align: center;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
    margin-top: 4px;
  }
  .offers-grid {
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    justify-content: space-between;
  }
  .card_wrapper {
    width: calc(33% - 5px);
    min-height: 560px;
  }
  .card_wrapper:nth-child(1),
  .card_wrapper:nth-child(3) {
    width: calc(67% - 10px);
  }
  .offer-card {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
    background: #000;
    width: 100%;
    height: 100%;
  }
  .offer-content {
    padding: 18px 40% 60px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .offer-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  .offer-name {
    color: #FFF;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
    line-height: 73.19px;
    letter-spacing: -1.906px;
  }
  .offer-title {
    color: #FFF;
    font-family: 'helveticaNeue', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28.09px;
    letter-spacing: -0.562px;
    max-width: 600px;
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
          <div className="offers-hero-desc">Limited Inventory – Take Delivery Today</div>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          className="offers-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {offersData.offers.map((offer, index) => (
            <Link key={index} href={offer.link} className="card_wrapper">
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
                    <div className="offer-name">{offer.name}</div>
                    <div className="offer-title">{offer.title}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </>
  )
}