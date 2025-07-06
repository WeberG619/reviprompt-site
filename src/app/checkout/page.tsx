'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Disable static generation for this page since it uses client-side state and search params
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Check, CreditCard, Shield, Lock, ArrowLeft, Star, Users, Zap } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })

  useEffect(() => {
    const plan = searchParams.get('plan')
    const billing = searchParams.get('billing')
    
    if (plan && ['starter', 'professional', 'aec-professional', 'enterprise'].includes(plan)) {
      setSelectedPlan(plan)
    }
    if (billing && ['monthly', 'annual'].includes(billing)) {
      setBillingPeriod(billing as 'monthly' | 'annual')
    }
  }, [searchParams])

  const plans = {
    starter: {
      name: 'Starter',
      description: 'Perfect for individuals getting started',
      price: { monthly: 0, annual: 0 },
      features: [
        '5 AI generations per month',
        '1 user account',
        'Basic templates',
        'Email support',
        'Standard security'
      ]
    },
    professional: {
      name: 'Professional',
      description: 'Best for growing businesses and agencies',
      price: { monthly: 49, annual: 39 },
      features: [
        'Unlimited AI generations',
        'Up to 5 team members',
        'All premium templates',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom branding',
        'Team collaboration'
      ]
    },
    'aec-professional': {
      name: 'AEC Professional',
      description: 'Complete AEC toolkit for Architecture, Engineering & Construction',
      price: { monthly: 79, annual: 69 },
      features: [
        'All 3 AEC Professional Tools',
        'Revit 2024, 2025, 2026 compatible',
        'ReviPrompt Lab Professional',
        'MEP Power Tools',
        'QC Professional Suite',
        'Dedicated AEC support',
        'Regular tool updates',
        '14-day free trial'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      description: 'Advanced features for large organizations',
      price: { monthly: 149, annual: 119 },
      features: [
        'Everything in Professional & AEC',
        'Unlimited team members',
        'Custom integrations',
        'Dedicated support manager',
        'SLA guarantee',
        'Advanced security',
        'Custom training',
        'On-premise deployment'
      ]
    }
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans]
  const currentPrice = currentPlan.price[billingPeriod]
  const isAnnual = billingPeriod === 'annual'
  const annualSavings = isAnnual && currentPrice > 0 ? (currentPlan.price.monthly - currentPrice) * 12 : 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Unified payment processing - redirect to single Stripe checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan,
          billingPeriod: billingPeriod,
          customerInfo: {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            company: formData.company
          }
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url // Redirect to Stripe Checkout
      } else {
        throw new Error('Payment setup failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment setup failed. Please try again or contact support.')
    } finally {
      setIsProcessing(false)
    }
  }

  const testimonials = [
    {
      quote: "DevCraft Labs transformed our workflow completely. ROI was immediate.",
      author: "Sarah Chen",
      role: "VP of Sales, TechFlow",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "The AI tools are incredible. We're serving 5x more clients now.",
      author: "Marcus Rodriguez",
      role: "Creative Director",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "Best investment we've made for our business automation.",
      author: "Emma Thompson",
      role: "Head of Marketing",
      avatar: "/api/placeholder/40/40"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/pricing"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to pricing</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Your Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of businesses transforming with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Plan Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Choose Your Plan
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(plans).map(([key, plan]) => (
                    <label
                      key={key}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPlan === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={key}
                        checked={selectedPlan === key}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {plan.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {plan.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              ${plan.price[billingPeriod]}
                            </div>
                            {plan.price[billingPeriod] > 0 && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                /{billingPeriod === 'annual' ? 'month' : 'month'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Billing Period */}
                {currentPrice > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Billing Period
                    </h3>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="billing"
                          value="monthly"
                          checked={billingPeriod === 'monthly'}
                          onChange={(e) => setBillingPeriod(e.target.value as 'monthly')}
                          className="mr-2"
                        />
                        <span className="text-gray-900 dark:text-white">Monthly</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="billing"
                          value="annual"
                          checked={billingPeriod === 'annual'}
                          onChange={(e) => setBillingPeriod(e.target.value as 'annual')}
                          className="mr-2"
                        />
                        <span className="text-gray-900 dark:text-white">
                          Annual
                          <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                            Save 20%
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Account Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {currentPrice > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Payment Information
                    </h2>
                    <Lock className="w-4 h-4 text-green-600" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Billing Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="billingAddress"
                          required
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {currentPrice === 0 ? 'Start Free Account' : `Complete Purchase - $${currentPrice}${billingPeriod === 'annual' ? '/mo' : '/mo'}`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Plan</span>
                    <span className="font-medium text-gray-900 dark:text-white">{currentPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Billing</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {billingPeriod === 'annual' ? 'Annual' : 'Monthly'}
                    </span>
                  </div>
                  {currentPrice > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {billingPeriod === 'annual' ? 'Monthly Price' : 'Price'}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${currentPrice}/month
                        </span>
                      </div>
                      {isAnnual && annualSavings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Annual Savings</span>
                          <span className="font-medium">-${annualSavings}/year</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                          <span>Total Today</span>
                          <span>
                            ${isAnnual ? currentPrice * 12 : currentPrice}
                            {isAnnual ? '/year' : '/month'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    What's included:
                  </h3>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security & Trust */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Secure & Trusted
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>5,000+ happy customers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-green-600" />
                    <span>30-day money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Customer Testimonials */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  What Our Customers Say
                </h3>
                <div className="space-y-4">
                  {testimonials.slice(0, 2).map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center space-x-2">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white">
                            {testimonial.author}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}