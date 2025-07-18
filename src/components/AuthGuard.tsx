'use client'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, LogIn, Sparkles } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  toolName?: string
}

export default function AuthGuard({ children, toolName = 'this tool' }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You need to be logged in to use {toolName}. Start your free trial or sign in to continue.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/signup"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Free Trial</span>
              </Link>
              
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 transform"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              No credit card required • 7-day free trial
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}