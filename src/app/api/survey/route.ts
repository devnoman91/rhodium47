import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('Survey API: Starting request...')
    console.log('Write token exists:', !!process.env.SANITY_API_WRITE_TOKEN)

    const body = await request.json()
    const { responses } = body

    console.log('Survey API: Request data:', { responsesCount: responses?.length })

    // Validate required fields
    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'Missing required field: responses' },
        { status: 400 }
      )
    }

    // Create simple survey response document
    console.log('Survey API: Attempting to create document...')

    // Extract answers from responses array
    const formSectionAnswer = responses.find((r: any) => r.fieldName === 'Form Section Selection')?.value || ''
    const section1Answer = responses.find((r: any) => r.fieldName === 'Additional Section 1 Selection')?.value || ''
    const section2Answer = responses.find((r: any) => r.fieldName === 'Additional Section 2 Selection')?.value || ''
    const section3Answer = responses.find((r: any) => r.fieldName === 'Additional Section 3 Selection')?.value || ''

    const surveyResponse = await writeClient.create({
      _type: 'surveyResponse',
      submissionDate: new Date().toISOString(),
      formSectionAnswer,
      section1Answer,
      section2Answer,
      section3Answer,
      status: 'completed',
    })

    console.log('Survey API: Successfully created document:', surveyResponse._id)

    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully!',
      responseId: surveyResponse._id,
      data: surveyResponse
    })

  } catch (error) {
    console.error('Error saving survey response:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save survey response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

