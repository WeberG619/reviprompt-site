'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Call optional error handler
    this.props.onError?.(error, errorInfo)

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo)
    }
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
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
                onClick={this.handleRefresh}
                className="w-full inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-1 text-xs overflow-auto bg-gray-200 dark:bg-gray-700 p-2 rounded">
                      {this.state.error.stack}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 text-xs overflow-auto bg-gray-200 dark:bg-gray-700 p-2 rounded">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
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

    return this.props.children
  }
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error handled:', error, errorInfo)
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo)
    }
  }
}

// Simple error fallback component
export function ErrorFallback({ 
  error, 
  resetError 
}: { 
  error: Error
  resetError: () => void 
}) {
  return (
    <div className="min-h-96 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetError}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  )
}

// Network error component
export function NetworkError({ 
  onRetry, 
  message = "Unable to connect to our servers" 
}: { 
  onRetry?: () => void
  message?: string 
}) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Connection Problem
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {message}. Please check your internet connection and try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      )}
    </div>
  )
}

// Loading error component
export function LoadingError({ 
  onRetry, 
  resource = "content" 
}: { 
  onRetry?: () => void
  resource?: string 
}) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full mb-3">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
        Failed to load {resource}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Something went wrong while loading this {resource}.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Try again
        </button>
      )}
    </div>
  )
}

// 404 Not Found component
export function NotFound({ 
  resource = "page",
  homeLink = "/" 
}: { 
  resource?: string
  homeLink?: string 
}) {
  return (
    <div className="min-h-96 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">
          404
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {resource.charAt(0).toUpperCase() + resource.slice(1)} not found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The {resource} you're looking for doesn't exist or has been moved.
        </p>
        <a
          href={homeLink}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go Home</span>
        </a>
      </div>
    </div>
  )
}

export default ErrorBoundary