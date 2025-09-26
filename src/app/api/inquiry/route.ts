import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('Inquiry API: Starting request...')
    console.log('Write token exists:', !!process.env.SANITY_API_WRITE_TOKEN)

    const body = await request.json()
    console.log('Inquiry API: Request data:', body)

    // Create inquiry response document with all form data
    console.log('Inquiry API: Attempting to create document...')

    const inquiryResponse = await writeClient.create({
      _type: 'inquiryResponse',
      submissionDate: new Date().toISOString(),
      bodyStyle: body.bodyStyle || '',
      model: body.model || '',
      title: body.title || '',
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      phone: body.phone || '',
      country: body.country || '',
      additionalComments: body.additionalComments || '',
      contactPreferences: body.contactPreferences || [],
      status: 'new',
    })

    console.log('Inquiry API: Successfully created document:', inquiryResponse._id)

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully!',
      responseId: inquiryResponse._id,
      data: inquiryResponse
    })

  } catch (error) {
    console.error('Error saving inquiry response:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save inquiry response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}