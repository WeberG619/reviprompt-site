'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import { 
  FileText, 
  PenTool, 
  Calendar, 
  CheckSquare, 
  Globe, 
  Code,
  ArrowRight,
  Sparkles,
  Clock,
  User
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const tools = [
    {
      title: 'AI Proposal Generator',
      description: 'Create winning proposals in minutes',
      icon: FileText,
      href: '/proposals',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'AI Content Generator',
      description: 'Generate high-quality content instantly',
      icon: PenTool,
      href: '/content',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'AI Social Scheduler',
      description: 'Automate your social media presence',
      icon: Calendar,
      href: '/social-scheduler',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'AI Task Manager',
      description: 'Organize and track your projects',
      icon: CheckSquare,
      href: '/task-manager',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'AI Landing Page Builder',
      description: 'Build high-converting landing pages',
      icon: Globe,
      href: '/landing-builder',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'API Explorer',
      description: 'Test and integrate our APIs',
      icon: Code,
      href: '/api-explorer',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose a tool to get started
          </p>
          
          {user.isTrialUser && user.trialExpiresAt && (
            <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Trial expires: {new Date(user.trialExpiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {tool.description}
                </p>
                
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Active Tools</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">6</p>
              </div>
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Time Saved</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">15 hrs</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Account Type</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                  {user.isTrialUser ? 'Trial' : 'Pro'}
                </p>
              </div>
              <User className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}