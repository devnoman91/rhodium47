import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API: Starting request...')
    console.log('Write token exists:', !!process.env.SANITY_API_WRITE_TOKEN)

    const body = await request.json()
    console.log('Contact API: Request data:', body)

    // Create contact form submission document
    console.log('Contact API: Attempting to create document...')

    const contactSubmission = await writeClient.create({
      _type: 'contactFormSubmission',
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      phone: body.phone || '',
      subject: body.subject || '',
      message: body.message || '',
      submittedAt: new Date().toISOString(),
      status: 'new',
      notes: '',
    })

    console.log('Contact API: Successfully created document:', contactSubmission._id)

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully!',
      submissionId: contactSubmission._id,
      data: contactSubmission
    })

  } catch (error) {
    console.error('Error saving contact form submission:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save contact form submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}