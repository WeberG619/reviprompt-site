import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const { planId, billingPeriod, customerInfo } = await request.json()

    // Define all your products with environment variable price IDs
    const productPricing = {
      'starter': {
        monthly: { price: 0, priceId: process.env.STRIPE_PRICE_STARTER_MONTHLY },
        annual: { price: 0, priceId: process.env.STRIPE_PRICE_STARTER_ANNUAL }
      },
      'professional': {
        monthly: { price: 4900, priceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY },
        annual: { price: 3900, priceId: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL }
      },
      'aec-professional': {
        monthly: { price: 7900, priceId: process.env.STRIPE_PRICE_AEC_PROFESSIONAL_MONTHLY },
        annual: { price: 6900, priceId: process.env.STRIPE_PRICE_AEC_PROFESSIONAL_ANNUAL }
      },
      'enterprise': {
        monthly: { price: 14900, priceId: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY },
        annual: { price: 11900, priceId: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL }
      }
    }

    const selectedProduct = productPricing[planId as keyof typeof productPricing]
    if (!selectedProduct) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const priceInfo = selectedProduct[billingPeriod as keyof typeof selectedProduct]
    
    // For free plans, redirect to dashboard
    if (priceInfo.price === 0) {
      return NextResponse.json({ 
        url: '/dashboard?welcome=true&plan=starter',
        free: true 
      })
    }

    // Check if we have the required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured')
      return NextResponse.json({ error: 'Payment system not configured' }, { status: 500 })
    }

    if (!priceInfo.priceId) {
      console.error(`Price ID not configured for ${planId} ${billingPeriod}`)
      return NextResponse.json({ error: 'Price not configured' }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceInfo.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      customer_email: customerInfo.email,
      metadata: {
        planId,
        billingPeriod,
        customerName: customerInfo.name,
        company: customerInfo.company || '',
      },
      subscription_data: {
        metadata: {
          planId,
          billingPeriod,
          customerName: customerInfo.name,
          company: customerInfo.company || '',
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id
    })

  } catch (error) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

/*
Real Stripe implementation would look like this:

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { planId, billingPeriod, customerInfo } = await request.json()
    
    const priceId = productPricing[planId][billingPeriod].priceId
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      customer_email: customerInfo.email,
      metadata: {
        planId,
        billingPeriod,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
*/