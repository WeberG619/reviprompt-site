'use client'
import { useState, useEffect } from 'react'
import { X, CheckCircle, ArrowRight, Play, Zap, Target, Users } from 'lucide-react'
import Link from 'next/link'
import { useAnalytics } from './Analytics'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  userType?: 'new' | 'returning'
}

export default function OnboardingModal({ isOpen, onClose, userType = 'new' }: OnboardingModalProps) {
  const { trackEvent, trackSignupStep } = useAnalytics()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (isOpen && userType === 'new') {
      trackSignupStep('onboarding_started')
    }
  }, [isOpen, userType, trackSignupStep])

  const steps = [
    {
      title: "Welcome to DevCraft Labs! 🚀",
      description: "You're now part of 2,100+ professionals using AI to automate their workflows",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🎉 You're ready to go!</h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              All 9 AI tools are live and ready to use. Let's get you started with the most popular ones.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-medium">Instant Results</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-xs font-medium">Enterprise Security</div>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
              <div className="text-2xl mb-1">📞</div>
              <div className="text-xs font-medium">24/7 Support</div>
            </div>
          </div>
        </div>
      ),
      action: "Let's Start!"
    },
    {
      title: "Choose Your First Tool",
      description: "Based on your plan, here are the most popular tools to try first:",
      content: (
        <div className="space-y-3">
          <Link href="/email-generator" className="block p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-blue-900 dark:text-blue-100">📧 AI Email Generator</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Most popular - Generate professional emails in seconds</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link href="/content" className="block p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">✍️ AI Content Generator</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Create blog posts, social media content</div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/proposals" className="block p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">📋 AI Proposal Generator</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Professional business proposals</div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      ),
      action: "Continue"
    },
    {
      title: "Pro Tips for Success",
      description: "Get the most out of your DevCraft Labs experience:",
      content: (
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-neutral-900 dark:text-white">Be Specific</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">The more details you provide, the better the AI results</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-neutral-900 dark:text-white">Try Multiple Tools</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Use different tools together for complete workflows</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-neutral-900 dark:text-white">Join the Community</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Get support and tips from other users</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-900 dark:text-green-100">Quick Win</span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              Try generating your first email in under 60 seconds. Most users save 12+ hours per week!
            </p>
          </div>
        </div>
      ),
      action: "Get Started"
    }
  ]

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    
    trackSignupStep(`step_${currentStep + 1}_completed`)
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step completed
      trackSignupStep('onboarding_completed')
      trackEvent('onboarding_complete', {
        event_category: 'user_engagement',
        event_label: 'first_time_user',
      })
      onClose()
    }
  }

  const handleSkip = () => {
    trackSignupStep('onboarding_skipped')
    onClose()
  }

  if (!isOpen) return null

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {currentStepData.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              {currentStepData.description}
            </p>
          </div>
          <button
            onClick={handleSkip}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={handleSkip}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Skip for now
          </button>
          
          <div className="flex items-center space-x-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{currentStepData.action}</span>
              {currentStep < steps.length - 1 ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook to manage onboarding state
export function useOnboarding() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('onboarding_completed')
    if (completed) {
      setHasCompletedOnboarding(true)
    } else {
      // Show onboarding for new users after a short delay
      const timer = setTimeout(() => {
        setIsOnboardingOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true')
    setHasCompletedOnboarding(true)
    setIsOnboardingOpen(false)
  }

  const startOnboarding = () => {
    setIsOnboardingOpen(true)
  }

  return {
    isOnboardingOpen,
    hasCompletedOnboarding,
    completeOnboarding,
    startOnboarding,
    closeOnboarding: () => setIsOnboardingOpen(false)
  }
}