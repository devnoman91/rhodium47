import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '../../../sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, zip, source } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create subscription in Sanity
    const subscription = await writeClient.create({
      _type: 'emailSubscription',
      email: email.toLowerCase().trim(),
      zip: zip ? zip.trim() : '',
      subscribedAt: new Date().toISOString(),
      isActive: true,
      source: source || 'unknown',
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscription: {
        _id: subscription._id,
        email: subscription.email,
      }
    })

  } catch (error) {
    console.error('Subscription error:', error)

    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}