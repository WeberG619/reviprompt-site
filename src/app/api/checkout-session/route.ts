import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription', 'line_items']
    })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Map plan IDs to user-friendly names
    const planNames = {
      'starter': 'Starter',
      'professional': 'Professional', 
      'aec-professional': 'AEC Professional',
      'enterprise': 'Enterprise'
    }

    const planId = session.metadata?.planId || 'professional'
    const billingPeriod = session.metadata?.billingPeriod || 'monthly'
    
    // Generate license key (same logic as webhook)
    const licenseKey = generateLicenseKey(planId, session.customer_email || '')

    const sessionData = {
      customerEmail: session.customer_email,
      customerName: session.metadata?.customerName || '',
      company: session.metadata?.company || '',
      planName: planNames[planId as keyof typeof planNames] || 'Professional',
      planId,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      billingPeriod,
      licenseKey,
      paymentStatus: session.payment_status,
      sessionId: session.id
    }

    return NextResponse.json({ session: sessionData })

  } catch (error) {
    console.error('Session retrieval failed:', error)
    return NextResponse.json({ 
      error: 'Failed to retrieve session data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Helper function to generate license key (same as webhook)
function generateLicenseKey(planId: string, email: string): string {
  const prefixes = {
    'starter': 'RPS',
    'professional': 'RPP', 
    'aec-professional': 'RPA',
    'enterprise': 'RPE'
  }
  
  const prefix = prefixes[planId as keyof typeof prefixes] || 'RPP'
  const timestamp = Date.now().toString(36).toUpperCase()
  const hash = Buffer.from(email).toString('base64').substring(0, 6).toUpperCase()
  
  return `${prefix}-${timestamp}-${hash}`
}