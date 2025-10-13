import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('Event Registration API: Starting request...')
    console.log('Write token exists:', !!process.env.SANITY_API_WRITE_TOKEN)

    const body = await request.json()
    console.log('Event Registration API: Request data:', body)

    // Validate required fields
    const { eventId, firstName, lastName, email, phoneNumber, region, zipCode, consentText } = body

    if (!eventId || !firstName || !lastName || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: eventId, firstName, lastName, and email are required'
        },
        { status: 400 }
      )
    }

    // Create event registration document
    console.log('Event Registration API: Attempting to create document...')

    const eventRegistration = await writeClient.create({
      _type: 'eventRegistration',
      event: {
        _type: 'reference',
        _ref: eventId
      },
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || '',
      region: region || '',
      zipCode: zipCode || '',
      getUpdates: body.getUpdates || false,
      consentText,
      registeredAt: new Date().toISOString(),
      status: 'pending',
      notes: '',
    })

    console.log('Event Registration API: Successfully created document:', eventRegistration._id)

    return NextResponse.json({
      success: true,
      message: 'Event registration submitted successfully!',
      registrationId: eventRegistration._id,
      data: eventRegistration
    })

  } catch (error) {
    console.error('Error saving event registration:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save event registration',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}