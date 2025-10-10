'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEventsPage, getAllEvents } from '@/content/queries'

const eventsStyles = `
  .events-container {
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 4rem;
  }

  .events-hero {
    background: white;
    padding: 4rem 2rem 3rem;
    text-align: center;
  }

  .events-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #000;
  }

  .events-description {
    font-size: 1.125rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .filters-section {
    max-width: 1400px;
    margin: 3rem auto 0;
    padding: 0 2rem;
  }

  .filters-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    background: white;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .filter-group {
    display: flex;
    flex-direction: column;
  }

  .filter-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 0.5rem;
  }

  .filter-select {
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;
  }

  .filter-select:focus {
    border-color: #000;
  }

  .events-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .event-card {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    position: relative;
  }

  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .event-image-wrapper {
    position: relative;
    width: 100%;
    height: 260px;
    overflow: hidden;
  }

  .event-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .event-content {
    padding: 1.5rem;
  }

  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .event-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #000;
    margin: 0;
    flex: 1;
  }

  .event-view-btn {
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    color: #000;
    white-space: nowrap;
    margin-left: 1rem;
  }

  .event-view-btn:hover {
    background: #000;
    color: white;
    border-color: #000;
  }

  .event-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.95rem;
    margin-top: 0.75rem;
  }

  .event-date-icon {
    font-size: 1rem;
  }

  .featured-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: #ef4444;
    color: white;
    padding: 0.375rem 0.875rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 10;
  }

  .no-events {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
    font-size: 1.125rem;
  }

  @media (max-width: 1024px) {
    .events-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters-row {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .events-title {
      font-size: 2.5rem;
    }

    .events-grid {
      grid-template-columns: 1fr;
    }

    .event-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .event-view-btn {
      margin-left: 0;
      margin-top: 0.75rem;
      width: 100%;
      text-align: center;
    }
  }
`

export default function EventsPage() {
  const [eventsPageData, setEventsPageData] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [filteredEvents, setFilteredEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('date')
  const [showEventsBy, setShowEventsBy] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageData, eventsData] = await Promise.all([
          getEventsPage(),
          getAllEvents()
        ])
        setEventsPageData(pageData)
        setEvents(eventsData)
        setFilteredEvents(eventsData)
      } catch (error) {
        console.error('Error fetching events data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (events.length === 0) return

    let filtered = [...events]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Filter by month
    if (showEventsBy !== 'all') {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      filtered = filtered.filter(event => {
        const eventDate = new Date(event.eventDate)
        if (showEventsBy === 'this-month') {
          return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
        } else if (showEventsBy === 'upcoming') {
          return eventDate > now
        } else if (showEventsBy === 'past') {
          return eventDate < now
        }
        return true
      })
    }

    // Sort events
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    } else if (sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredEvents(filtered)
  }, [selectedCategory, sortBy, showEventsBy, events])

  const categories = ['all', ...Array.from(new Set(events.map(event => event.category)))]

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: eventsStyles }} />
        <div className="events-container">
          <div className="events-hero">
            <div>Loading...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: eventsStyles }} />

      <div className="events-container">
        {/* Hero Section */}
        <section className="events-hero">
          <h1 className="events-title">
            {eventsPageData?.heroSection?.title || 'Events & Tickets'}
          </h1>
          <p className="events-description">
            {eventsPageData?.heroSection?.description || 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Donec Egestas Non Nibh Gravida Varius. Fusce Sem Ligula, Molestie Sit Amet.'}
          </p>
        </section>

        {/* Filters Section */}
        <section className="filters-section">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Select Category</option>
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Start Date (Earliest)</option>
                <option value="date-desc">Start Date (Latest)</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Show Me Events By</label>
              <select
                className="filter-select"
                value={showEventsBy}
                onChange={(e) => setShowEventsBy(e.target.value)}
              >
                <option value="all">All Month</option>
                <option value="this-month">This Month</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="events-content">
          {filteredEvents.length === 0 ? (
            <div className="no-events">
              No events found matching your filters.
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div key={event._id} className="event-card">
                  {event.featured && (
                    <div className="featured-badge">Featured</div>
                  )}

                  <div className="event-image-wrapper">
                    {event.featuredImage?.asset?.url && (
                      <img
                        src={event.featuredImage.asset.url}
                        alt={event.featuredImage.alt || event.title}
                        className="event-image"
                      />
                    )}
                  </div>

                  <div className="event-content">
                    <div className="event-header">
                      <h3 className="event-title">{event.title}</h3>
                      <Link
                        href={`/events/${event.slug.current}`}
                        className="event-view-btn"
                      >
                        VIEW
                      </Link>
                    </div>

                    <div className="event-date">
                      <span className="event-date-icon">📅</span>
                      <span>
                        {new Date(event.eventDate).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
