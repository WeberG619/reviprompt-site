import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing failed:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id)
  
  // Extract metadata
  const { planId, billingPeriod, customerName, company } = session.metadata || {}
  const customerEmail = session.customer_email
  
  if (!customerEmail) {
    console.error('No customer email found in session')
    return
  }
  
  // Generate license key
  const licenseKey = generateLicenseKey(planId || 'professional', customerEmail)
  
  // Store customer and license information
  await storeCustomerLicense({
    customerId: session.customer as string,
    subscriptionId: session.subscription as string,
    customerEmail,
    customerName: customerName || '',
    company: company || '',
    planId: planId || 'professional',
    billingPeriod: billingPeriod || 'monthly',
    licenseKey,
    status: 'active'
  })
  
  // Send welcome email with license key and access instructions
  await sendWelcomeEmail({
    email: customerEmail,
    name: customerName || '',
    planId: planId || 'professional',
    licenseKey
  })
  
  console.log(`License created for ${customerEmail}: ${licenseKey}`)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id)
  
  // Update customer record with subscription details
  await updateCustomerSubscription(subscription.customer as string, {
    subscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    planId: subscription.metadata?.planId || 'professional'
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id)
  
  // Update customer subscription status
  await updateCustomerSubscription(subscription.customer as string, {
    subscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    planId: subscription.metadata?.planId || 'professional'
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id)
  
  // Deactivate customer access
  await updateCustomerSubscription(subscription.customer as string, {
    subscriptionId: subscription.id,
    status: 'canceled',
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    planId: subscription.metadata?.planId || 'professional'
  })
  
  // Send cancellation email
  const customer = await stripe.customers.retrieve(subscription.customer as string)
  if (customer && !customer.deleted && customer.email) {
    await sendCancellationEmail(customer.email)
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id)
  
  // Update customer payment status
  if (invoice.subscription) {
    await updateCustomerSubscription(invoice.customer as string, {
      subscriptionId: invoice.subscription as string,
      status: 'active',
      lastPaymentDate: new Date(invoice.created * 1000)
    })
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id)
  
  // Update customer payment status and send notification
  if (invoice.subscription) {
    await updateCustomerSubscription(invoice.customer as string, {
      subscriptionId: invoice.subscription as string,
      status: 'past_due',
      lastPaymentDate: new Date(invoice.created * 1000)
    })
  }
  
  // Send payment failed notification
  const customer = await stripe.customers.retrieve(invoice.customer as string)
  if (customer && !customer.deleted && customer.email) {
    await sendPaymentFailedEmail(customer.email, invoice.hosted_invoice_url)
  }
}

// Helper Functions

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

async function storeCustomerLicense(data: {
  customerId: string
  subscriptionId: string
  customerEmail: string
  customerName: string
  company: string
  planId: string
  billingPeriod: string
  licenseKey: string
  status: string
}) {
  // TODO: Implement database storage
  // For now, log the data
  console.log('Storing customer license:', data)
  
  // In a real implementation, you would store this in your database:
  /*
  await db.customerLicenses.create({
    data: {
      customerId: data.customerId,
      subscriptionId: data.subscriptionId,
      email: data.customerEmail,
      name: data.customerName,
      company: data.company,
      planId: data.planId,
      billingPeriod: data.billingPeriod,
      licenseKey: data.licenseKey,
      status: data.status,
      createdAt: new Date()
    }
  })
  */
}

async function updateCustomerSubscription(customerId: string, data: any) {
  // TODO: Implement database update
  console.log('Updating customer subscription:', customerId, data)
  
  // In a real implementation:
  /*
  await db.customerLicenses.update({
    where: { customerId },
    data: {
      subscriptionStatus: data.status,
      currentPeriodStart: data.currentPeriodStart,
      currentPeriodEnd: data.currentPeriodEnd,
      lastPaymentDate: data.lastPaymentDate,
      updatedAt: new Date()
    }
  })
  */
}

async function sendWelcomeEmail(data: {
  email: string
  name: string
  planId: string
  licenseKey: string
}) {
  // TODO: Implement email sending
  console.log('Sending welcome email:', data)
  
  // In a real implementation, you would send an email:
  /*
  const planNames = {
    'starter': 'Starter',
    'professional': 'Professional',
    'aec-professional': 'AEC Professional',
    'enterprise': 'Enterprise'
  }
  
  await emailService.send({
    to: data.email,
    subject: `Welcome to RevitPrompt Lab ${planNames[data.planId] || 'Professional'}!`,
    template: 'welcome',
    data: {
      name: data.name,
      planName: planNames[data.planId] || 'Professional',
      licenseKey: data.licenseKey,
      portalUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal`
    }
  })
  */
}

async function sendCancellationEmail(email: string) {
  // TODO: Implement cancellation email
  console.log('Sending cancellation email to:', email)
}

async function sendPaymentFailedEmail(email: string, invoiceUrl: string | null) {
  // TODO: Implement payment failed email
  console.log('Sending payment failed email to:', email, 'Invoice URL:', invoiceUrl)
}