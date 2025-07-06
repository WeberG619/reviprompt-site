'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  useEffect(() => {
    // Auto-redirect to external dashboard after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://ai-portfolio-saas.vercel.app'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />
      
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Redirecting to Dashboard
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Taking you to the DevCraft Labs AI tools dashboard...
          </p>
          
          <div className="space-y-4">
            <Link 
              href="https://ai-portfolio-saas.vercel.app"
              className="btn-primary inline-flex items-center space-x-2 w-full justify-center"
              target="_blank"
            >
              <span>Go to Dashboard Now</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/pricing"
              className="btn-secondary inline-flex items-center space-x-2 w-full justify-center"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}