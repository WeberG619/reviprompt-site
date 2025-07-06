'use client'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
    
    // In production, you might want to log to an external service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We apologize for the inconvenience. An unexpected error occurred while loading this page.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={reset}
            className="w-full inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <a
            href="/"
            className="w-full inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <summary className="cursor-pointer font-medium text-gray-900 dark:text-white mb-2">
              Error Details (Development)
            </summary>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <div>
                <strong>Error:</strong> {error.message}
              </div>
              {error.digest && (
                <div>
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
              <div>
                <strong>Stack:</strong>
                <pre className="mt-1 text-xs overflow-auto bg-gray-200 dark:bg-gray-700 p-2 rounded max-h-40">
                  {error.stack}
                </pre>
              </div>
            </div>
          </details>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            If this problem persists, please contact our support team.
          </p>
          <a
            href="mailto:support@devcraft-labs.com"
            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Mail className="w-4 h-4" />
            <span>support@devcraft-labs.com</span>
          </a>
        </div>
      </div>
    </div>
  )
}