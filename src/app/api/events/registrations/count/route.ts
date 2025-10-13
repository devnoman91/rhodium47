import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const eventId = searchParams.get('eventId')

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    // Count registrations for this event (excluding cancelled ones)
    const query = `count(*[_type == "eventRegistration" && event._ref == $eventId && status != "cancelled"])`
    const count = await client.fetch(query, { eventId })

    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error counting registrations:', error)
    return NextResponse.json(
      { error: 'Failed to count registrations' },
      { status: 500 }
    )
  }
}
