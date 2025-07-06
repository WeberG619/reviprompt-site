import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      <div className="min-h-screen flex items-center justify-center px-4 -mt-20">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-300 dark:text-gray-600 mb-4">
              404
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-4">Looking for something specific? Try these popular pages:</p>
            <div className="grid grid-cols-2 gap-2 text-left">
              <Link href="/proposals" className="text-blue-600 hover:text-blue-700 block">
                • AI Proposal Generator
              </Link>
              <Link href="/content" className="text-blue-600 hover:text-blue-700 block">
                • Content Generator
              </Link>
              <Link href="/landing-builder" className="text-blue-600 hover:text-blue-700 block">
                • Landing Page Builder
              </Link>
              <Link href="/social-scheduler" className="text-blue-600 hover:text-blue-700 block">
                • Social Scheduler
              </Link>
              <Link href="/task-manager" className="text-blue-600 hover:text-blue-700 block">
                • Task Manager
              </Link>
              <Link href="/pricing" className="text-blue-600 hover:text-blue-700 block">
                • Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}