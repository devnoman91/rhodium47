'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEventsPage, getAllEvents } from '@/content/queries'

const eventsStyles = `
  .events-hero {
    position: relative;
    height: 50vh;
    background: linear-gradient(135deg, #000 0%, #333 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }
  .events-hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .events-hero-description {
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto;
  }
  .events-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  .event-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .event-content {
    padding: 1.5rem;
  }
  .event-category {
    display: inline-block;
    background: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .event-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #111827;
  }
  .event-date {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  .event-description {
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  .event-link {
    color: #000;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
  }
  .event-link:hover {
    text-decoration: underline;
  }
  .featured-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: #ef4444;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 10;
  }
  @media (max-width: 768px) {
    .events-hero-title {
      font-size: 2rem;
    }
    .events-grid {
      grid-template-columns: 1fr;
    }
  }
`

export default function EventsPage() {
  const [eventsPageData, setEventsPageData] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageData, eventsData] = await Promise.all([
          getEventsPage(),
          getAllEvents()
        ])
        setEventsPageData(pageData)
        setEvents(eventsData)
      } catch (error) {
        console.error('Error fetching events data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: eventsStyles }} />
        <div className="events-hero">
          <div>Loading...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: eventsStyles }} />

      {/* Hero Section */}
      <section className="events-hero">
        <div>
          <h1 className="events-hero-title">
            {eventsPageData?.heroSection?.title || 'Events'}
          </h1>
          <p className="events-hero-description">
            {eventsPageData?.heroSection?.description || 'Discover upcoming events and join our community.'}
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-content">
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              {event.featured && (
                <div className="featured-badge">Featured</div>
              )}
              {event.featuredImage?.asset?.url && (
                <img
                  src={event.featuredImage.asset.url}
                  alt={event.featuredImage.alt || event.title}
                  className="event-image"
                />
              )}
              <div className="event-content">
                <div className="event-category">{event.category}</div>
                <h3 className="event-title">{event.title}</h3>
                <div className="event-date">
                  {new Date(event.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  {event.eventEndDate && (
                    <> - {new Date(event.eventEndDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</>
                  )}
                </div>
                <p className="event-description">
                  {event.shortDescription || event.detailDescription?.substring(0, 150) + '...'}
                </p>
                <Link href={`/events/${event.slug.current}`} className="event-link">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}