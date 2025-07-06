'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Code2, FileJson, Copy, CheckCircle } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Chatbot from '@/components/Chatbot'

export const dynamic = 'force-dynamic'

export default function APIExplorerPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('generateProposal')
  const [requestBody, setRequestBody] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const endpoints = [
    {
      id: 'generateProposal',
      name: 'Generate Proposal',
      method: 'POST',
      path: '/api/generate/proposal',
      description: 'Generate professional business proposals with AI',
      exampleRequest: {
        prompt: "Website development for e-commerce startup",
        businessType: "E-commerce",
        context: {
          clientInfo: "TechStart Inc",
          projectScope: "Full e-commerce platform with payment integration",
          projectType: "E-commerce Platform"
        }
      }
    },
    {
      id: 'generateContent',
      name: 'Generate Content',
      method: 'POST',
      path: '/api/generate/content',
      description: 'Create various types of content with AI',
      exampleRequest: {
        prompt: "Digital Marketing Strategy",
        context: {
          contentType: "blog-post",
          audience: "Business Professionals",
          tone: "Professional"
        }
      }
    },
    {
      id: 'generateLandingPage',
      name: 'Generate Landing Page',
      method: 'POST',
      path: '/api/generate/landing-page',
      description: 'Generate optimized landing pages',
      exampleRequest: {
        prompt: "SaaS product launch page",
        industry: "SaaS/Software",
        context: {
          goal: "Product Launch",
          targetAudience: "Startup founders",
          brandColors: {
            primary: "#3B82F6",
            secondary: "#10B981"
          }
        }
      }
    },
    {
      id: 'generateTasks',
      name: 'Generate Tasks',
      method: 'POST',
      path: '/api/generate/tasks',
      description: 'Create AI-powered task lists and project plans',
      exampleRequest: {
        prompt: "Launch new mobile app",
        businessType: "Software Development",
        context: {
          projectTitle: "Mobile App Launch",
          duration: "3 months",
          teamSize: 5
        }
      }
    }
  ]

  const handleSendRequest = async () => {
    setIsLoading(true)
    const endpoint = endpoints.find(e => e.id === selectedEndpoint)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockResponse = {
        success: true,
        data: {
          id: `gen_${Date.now()}`,
          type: selectedEndpoint,
          content: "Generated content based on your request...",
          metadata: {
            confidence: 0.95,
            processingTime: "1.2s",
            model: "gpt-4",
            tokensUsed: 850
          }
        },
        timestamp: new Date().toISOString()
      }
      
      setResponse(JSON.stringify(mockResponse, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({
        success: false,
        error: "Failed to process request",
        timestamp: new Date().toISOString()
      }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentEndpoint = endpoints.find(e => e.id === selectedEndpoint)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Explorer</h1>
          </div>
          <Link
            href="/docs"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <FileJson className="w-4 h-4" />
            <span>API Documentation</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Endpoints</h2>
              <div className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => {
                      setSelectedEndpoint(endpoint.id)
                      setRequestBody(JSON.stringify(endpoint.exampleRequest, null, 2))
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedEndpoint === endpoint.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{endpoint.name}</span>
                      <span className="text-xs font-mono">{endpoint.method}</span>
                    </div>
                    <div className="text-xs mt-1 opacity-80">{endpoint.path}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Endpoint Details */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentEndpoint?.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    {currentEndpoint?.method}
                  </span>
                  <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {currentEndpoint?.path}
                  </code>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {currentEndpoint?.description}
              </p>
            </div>

            {/* Request */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Request Body</h4>
                <button
                  onClick={() => copyToClipboard(requestBody)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {copied ? (
                    <span className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </span>
                  )}
                </button>
              </div>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter request body..."
              />
              <button
                onClick={handleSendRequest}
                disabled={isLoading || !requestBody}
                className="mt-4 btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>

            {/* Response */}
            {response && (
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Response</h4>
                <pre className="w-full p-4 font-mono text-sm bg-gray-50 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700 overflow-x-auto">
                  <code className={response.includes('"success": true') ? 'text-green-600' : 'text-red-600'}>
                    {response}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Chatbot pageContext="api-explorer" />
    </div>
  )
}