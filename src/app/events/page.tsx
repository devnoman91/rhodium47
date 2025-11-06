'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEventsPage, getAllEvents } from '@/content/queries'

const eventsStyles = `
  .events-container {
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 75px;
  }

  .events-hero {
    padding: 170px 15px 75px;
    text-align: center;
  }

  .events-title {
    color: #000;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 70.4px */
    letter-spacing: -1.28px;
    margin-bottom:14px;
  }

  .events-description {
   color: #111;
max-width:855px;
margin:auto;
text-align: center;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 36px */
text-transform: capitalize;
  }

  .filters-section {
    padding: 0 15px;
  }

  .filters-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width:1072px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
  }

  .filter-label {
color: #000;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 21px */
text-transform: capitalize;
    margin-bottom: 9px;
  }

  .filter-select {
    padding: 14px 21px;
    border-radius: 4px;
   color: #000;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 21px */
text-transform: capitalize;
    background: white;
    cursor: pointer;
    outline: none;
  }
    .filter-select {
      appearance: none;              /* Remove default arrow */
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 17px center;
      background-size: 17px;
    }
  .filter-select:focus {
    border-color: #000;
  }

  .events-content {
    
    padding: 44px 0 0 0 ;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 25px;
    column-gap:57px;
    max-width: 1332px;
    margin: 0 auto;
    padding:0 15px;
  }

  .event-card {
    background: white;
    position: relative;
  }

  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .event-image-wrapper {
    position: relative;
    width: 100%;
    height: 231px;
    overflow: hidden;
  }

  .event-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .event-content {
    padding: 32px 20px;
  }

  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .event-title {
   color: #111;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 27px */
  text-transform: capitalize;
    flex: 1;
  }

  .event-view-btn {
    background: white;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    color: #000;
    white-space: nowrap;
  }


  .event-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
     color:  #3F3E4B;
    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    line-height: 20px;
    margin-top: 9px;
  }

  .event-date-icon {
    font-size: 1rem;
  }

  .event-spots {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px;
    display: inline-block;
  }

  .spots-available {
    background: #d1fae5;
    color: #065f46;
  }

  .spots-low {
    background: #fed7aa;
    color: #92400e;
  }

  .spots-soldout {
    background: #fee2e2;
    color: #dc2626;
  }

  .featured-badge {
  display:none;
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

  @media (max-width: 991px) {
    .events-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters-row {
      grid-template-columns: 1fr;
      gap: 23px;
    }
  }

  @media (max-width: 767px) {
  .events-hero {
    padding: 105px 15px 29px;
}

    .events-title {
      font-size: 30px;
      morgin-bottom:10px;
    }
  .events-description{
     font-size:16px;
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
      // width: 100%;
      text-align: center;
    }
      .events-container {
    padding-bottom: 30px;
}
  }
`

export default function EventsPage() {
  const [eventsPageData, setEventsPageData] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [filteredEvents, setFilteredEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [registrationCounts, setRegistrationCounts] = useState<Record<string, number>>({})

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

        // Fetch registration counts for all events
        const counts: Record<string, number> = {}
        await Promise.all(
          eventsData.map(async (event: any) => {
            try {
              const response = await fetch(`/api/events/registrations/count?eventId=${event._id}`)
              const data = await response.json()
              counts[event._id] = data.count || 0
            } catch (error) {
              console.error(`Error fetching count for event ${event._id}:`, error)
              counts[event._id] = 0
            }
          })
        )
        setRegistrationCounts(counts)
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
         <div className='max-w-[1332px] mx-auto'>
           <div className="filters-row ">
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

                  <div className="flex gap-[27px]  justify-between event-content">
                    <div className=''>
                      <div className="event-header">
                        <h3 className="event-title">{event.title}</h3>
                      </div>

                      <div className="event-date">
                        <span className="event-date-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 3.79086 1.79086 2 4 2H14C16.2091 2 18 3.79086 18 6V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 0 16.2091 0 14V6ZM4 4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H14C15.1046 16 16 15.1046 16 14V6C16 4.89543 15.1046 4 14 4H4Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.55228 0 6 0.44772 6 1V3C6 3.55228 5.55228 4 5 4C4.44772 4 4 3.55228 4 3V1C4 0.44772 4.44772 0 5 0Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 0C13.5523 0 14 0.44772 14 1V3C14 3.55228 13.5523 4 13 4C12.4477 4 12 3.55228 12 3V1C12 0.44772 12.4477 0 13 0Z" fill="black"/>
                            <path d="M6 7C6 7.5523 5.55228 8 5 8C4.44772 8 4 7.5523 4 7C4 6.44772 4.44772 6 5 6C5.55228 6 6 6.44772 6 7Z" fill="black"/>
                            <path d="M10 7C10 7.5523 9.5523 8 9 8C8.4477 8 8 7.5523 8 7C8 6.44772 8.4477 6 9 6C9.5523 6 10 6.44772 10 7Z" fill="black"/>
                            <path d="M14 7C14 7.5523 13.5523 8 13 8C12.4477 8 12 7.5523 12 7C12 6.44772 12.4477 6 13 6C13.5523 6 14 6.44772 14 7Z" fill="black"/>
                            <path d="M6 11C6 11.5523 5.55228 12 5 12C4.44772 12 4 11.5523 4 11C4 10.4477 4.44772 10 5 10C5.55228 10 6 10.4477 6 11Z" fill="black"/>
                          </svg>
                        </span>
                        <span>
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Show registration spots only after 10 people registered */}
                      {event.maxAttendees && event.registrationEnabled && (
                        <>
                          {(() => {
                            const registered = registrationCounts[event._id] || 0
                            const remaining = event.maxAttendees - registered
                            const isSoldOut = remaining <= 0
                            const isLowSpots = remaining > 0 && remaining <= event.maxAttendees * 0.2

                            // Show spots indicator only if 10 or more people have registered
                            if (registered >= 10) {
                              return (
                                <div className={`event-spots ${isSoldOut ? 'spots-soldout' : isLowSpots ? 'spots-low' : 'spots-available'}`}>
                                  {isSoldOut
                                    ? 'SOLD OUT'
                                    : `${remaining} spot${remaining !== 1 ? 's' : ''} left`
                                  }
                                </div>
                              )
                            }
                            return null
                          })()}
                        </>
                      )}

                    </div>

                    <Link
                        href={`/events/${event.slug.current}`}
                        className="event-view-btn border-l flex items-center border-[#00000033] pl-[27px]"
                      >
                        VIEW
                      </Link>
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
