'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Download, Key, Mail, ExternalLink, X } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // In a real implementation, you would verify the session with Stripe
      // and fetch the customer details
      fetchSessionData(sessionId)
    } else {
      setError('No session ID provided')
      setLoading(false)
    }
  }, [searchParams])

  const fetchSessionData = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/checkout-session?session_id=${sessionId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch session data')
      }
      
      const data = await response.json()
      setSessionData(data.session)
      setLoading(false)
    } catch (err) {
      console.error('Session verification failed:', err)
      setError('Failed to verify payment')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <UnifiedNavigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
            <Link
              href="/pricing"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Back to Pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UnifiedNavigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to RevitPrompt Lab!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your {sessionData?.planName} subscription is now active
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Payment Confirmation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Plan
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {sessionData?.planName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Amount
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${sessionData?.amount}/{sessionData?.billingPeriod === 'annual' ? 'year' : 'month'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Email
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {sessionData?.customerEmail}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                License Key
              </label>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm font-mono">
                  {sessionData?.licenseKey}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(sessionData?.licenseKey)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Check Your Email
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              We've sent you a welcome email with your license key and download links.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Check your spam folder if you don't see it.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Access Your Tools
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Visit your customer portal to download prompts and access video tutorials.
            </p>
            <Link
              href="/portal"
              className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center"
            >
              Open Portal
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Start Using Tools
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Access your AI tools dashboard and start automating your Revit workflows.
            </p>
            <Link
              href="/dashboard"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center"
            >
              Open Dashboard
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            What's included in your {sessionData?.planName} plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">500+ Professional AI Prompts</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Revit 2024-2026 Compatible</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Video Tutorials & Documentation</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Priority AEC Support</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Regular Updates & New Prompts</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Team Collaboration Tools</span>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Need Help Getting Started?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our AEC specialists are here to help you get the most out of RevitPrompt Lab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/docs"
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors inline-flex items-center justify-center"
            >
              View Documentation
            </Link>
            <Link
              href="/support"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}