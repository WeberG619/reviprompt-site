'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Mail, Zap, Target, Moon, Sun, Copy, CheckCircle, RefreshCw, Send, User, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import Chatbot from '@/components/Chatbot'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import AuthGuard from '@/components/AuthGuard'

export const dynamic = 'force-dynamic'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  type: string
}

interface GeneratedEmail {
  subject: string
  content: string
  tone: string
  type: string
  timestamp: Date
}

export default function EmailGeneratorPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailType, setEmailType] = useState('')
  const [recipient, setRecipient] = useState('')
  const [purpose, setPurpose] = useState('')
  const [tone, setTone] = useState('')
  const [context, setContext] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null)
  const [copied, setCopied] = useState(false)
  const [apiStatus, setApiStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    setApiStatus('checking')
    try {
      const response = await fetch('/api/email-generator/health', {
        method: 'GET',
      })
      
      if (response.ok) {
        setApiStatus('connected')
      } else {
        setApiStatus('error')
      }
    } catch (error) {
      setApiStatus('error')
    }
  }

  const emailTypes = [
    { id: 'business-proposal', label: 'Business Proposal', description: 'Professional business proposals and partnerships' },
    { id: 'follow-up', label: 'Follow-up Email', description: 'Following up on meetings, calls, or inquiries' },
    { id: 'cold-outreach', label: 'Cold Outreach', description: 'Initial contact with potential clients or partners' },
    { id: 'customer-service', label: 'Customer Service', description: 'Support, complaints, and service responses' },
    { id: 'marketing', label: 'Marketing Email', description: 'Promotional campaigns and newsletters' },
    { id: 'internal-team', label: 'Internal Team', description: 'Internal communications and updates' },
    { id: 'thank-you', label: 'Thank You', description: 'Appreciation and gratitude emails' },
    { id: 'meeting-request', label: 'Meeting Request', description: 'Scheduling and meeting invitations' }
  ]

  const tones = [
    'Professional', 'Friendly', 'Formal', 'Casual', 'Persuasive', 
    'Apologetic', 'Enthusiastic', 'Diplomatic', 'Direct', 'Warm'
  ]

  const generateEmail = async () => {
    if (!emailType || !recipient || !purpose) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/email-generator/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailType,
          recipient,
          purpose,
          tone,
          context
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedEmail({
          subject: data.subject,
          content: data.content,
          tone: data.tone,
          type: data.type,
          timestamp: new Date()
        })
      } else {
        throw new Error('Failed to generate email')
      }
    } catch (error) {
      console.error('Error generating email:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyFullEmail = () => {
    if (generatedEmail) {
      const fullEmail = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.content}`
      copyToClipboard(fullEmail)
    }
  }

  if (!mounted) return null

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
        <UnifiedNavigation />
        
        {/* Header */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-blue-100/50 dark:from-neutral-800 dark:via-neutral-900 dark:to-blue-900/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
                <Mail className="w-4 h-4 mr-2" />
                AI Email Generator
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                Professional Email Generation
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
                Create professional emails with AI-powered content generation, personalization, and Claude integration.
              </p>
              
              {/* API Status */}
              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="flex items-center space-x-2">
                  {apiStatus === 'checking' && (
                    <>
                      <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Checking API...</span>
                    </>
                  )}
                  {apiStatus === 'connected' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 dark:text-green-400">Claude API Connected</span>
                    </>
                  )}
                  {apiStatus === 'error' && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600 dark:text-red-400">API Connection Error</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Form */}
              <div className="space-y-8">
                <div className="card-enhanced p-8">
                  <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
                    Email Parameters
                  </h2>
                  
                  {/* Email Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                      Email Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {emailTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setEmailType(type.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            emailType === type.id
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600'
                          }`}
                        >
                          <div className="font-medium text-sm">{type.label}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {type.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recipient */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Recipient
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="e.g., John Smith, CEO of ABC Corp"
                      className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Purpose */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Purpose
                    </label>
                    <textarea
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="Describe the main purpose of this email..."
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tone */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select tone...</option>
                      {tones.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Context */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Additional Context (Optional)
                    </label>
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Any additional context or specific requirements..."
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateEmail}
                    disabled={!emailType || !recipient || !purpose || isGenerating || apiStatus !== 'connected'}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Email...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Email
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Generated Email */}
              <div className="space-y-8">
                {generatedEmail ? (
                  <div className="card-enhanced p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                        Generated Email
                      </h2>
                      <button
                        onClick={copyFullEmail}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Email Subject */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Subject
                      </label>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                        <p className="text-neutral-900 dark:text-white font-medium">
                          {generatedEmail.subject}
                        </p>
                      </div>
                    </div>

                    {/* Email Content */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Email Content
                      </label>
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                        <div className="whitespace-pre-wrap text-neutral-900 dark:text-white">
                          {generatedEmail.content}
                        </div>
                      </div>
                    </div>

                    {/* Email Metadata */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <div>
                        <span className="font-medium">Tone:</span> {generatedEmail.tone}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {generatedEmail.type}
                      </div>
                      <div>
                        <span className="font-medium">Generated:</span> {generatedEmail.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card-enhanced p-8 text-center">
                    <Mail className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Ready to Generate
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Fill in the form on the left and click "Generate Email" to create your professional email.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Powerful Email Generation Features
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300">
                Everything you need to create professional emails efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-enhanced p-6 text-center">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Claude Integration
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Powered by Anthropic's Claude for natural, contextual email generation.
                </p>
              </div>

              <div className="card-enhanced p-6 text-center">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Smart Personalization
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Automatically adapts tone and content based on recipient and context.
                </p>
              </div>

              <div className="card-enhanced p-6 text-center">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Real-time Generation
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Generate professional emails in seconds with real-time API validation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Chatbot />
      </div>
    </AuthGuard>
  )
}