'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Book, Zap, Terminal, ExternalLink, Copy, Moon, Sun, ChevronRight, Key, Shield, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DocsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('introduction')
  const [copiedCode, setCopiedCode] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'rate-limits', title: 'Rate Limits' },
      ]
    },
    {
      id: 'ai-business',
      title: 'AI Business Tools',
      items: [
        { id: 'invoice-api', title: 'Invoice Generator API' },
        { id: 'email-api', title: 'Email Content API' },
        { id: 'webhooks', title: 'Webhooks' },
      ]
    },
    {
      id: 'developer',
      title: 'Developer Platform',
      items: [
        { id: 'landing-api', title: 'Landing Page Builder API' },
        { id: 'task-api', title: 'Task Manager API' },
        { id: 'social-api', title: 'Social Scheduler API' },
      ]
    },
    {
      id: 'aec',
      title: 'AEC Solutions',
      items: [
        { id: 'revit-api', title: 'ReviPrompt API' },
        { id: 'mep-api', title: 'MEP Tools API' },
        { id: 'qc-api', title: 'QC Suite API' },
      ]
    }
  ]

  const apiExamples = [
    {
      id: 'generate-invoice',
      title: 'Generate Invoice',
      method: 'POST',
      endpoint: '/api/v1/invoices/generate',
      description: 'Create a new AI-enhanced invoice with intelligent description generation',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_name": "Acme Corp",
    "client_email": "billing@acmecorp.com",
    "amount": 1500.00,
    "description": "Web development services",
    "due_date": "2024-08-15",
    "currency": "USD",
    "enhance_description": true
  }'`,
      response: `{
  "invoice_id": "inv_1234567890",
  "status": "created",
  "pdf_url": "https://invoices.devcraft-labs.com/inv_1234567890.pdf",
  "enhanced_description": "Professional web development services including responsive design, API integration, and performance optimization",
  "payment_link": "https://pay.devcraft-labs.com/inv_1234567890",
  "created_at": "2024-07-03T10:30:00Z"
}`
    },
    {
      id: 'send-email',
      title: 'Send Invoice Email',
      method: 'POST',
      endpoint: '/api/v1/invoices/send',
      description: 'Send invoice via email with automated reminder scheduling',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "invoice_id": "inv_1234567890",
    "send_reminders": true,
    "reminder_schedule": [7, 3, 1],
    "custom_message": "Thank you for your business!"
  }'`,
      response: `{
  "status": "sent",
  "email_sent_at": "2024-07-03T10:30:00Z",
  "reminder_schedule": [
    "2024-07-10T10:00:00Z",
    "2024-07-12T10:00:00Z",
    "2024-07-14T10:00:00Z"
  ],
  "delivery_status": "delivered"
}`
    },
    {
      id: 'generate-email',
      title: 'Generate Email Content',
      method: 'POST',
      endpoint: '/api/v1/content/email',
      description: 'Generate professional email content with AI-powered optimization',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/email/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "marketing",
    "tone": "professional",
    "subject": "New Product Launch",
    "key_points": ["AI automation", "Cost savings", "Easy setup"],
    "audience": "small business owners",
    "generate_variants": true
  }'`,
      response: `{
  "subject": "Transform Your Business with AI Automation - Save 40% on Setup",
  "body": "Dear Business Owner,\\n\\nWe're excited to introduce our new AI automation platform...",
  "variants": {
    "subject_alt": ["Automate Your Business Today", "AI Solutions for Small Business"],
    "tone_variants": ["casual", "urgent"]
  },
  "estimated_metrics": {
    "open_rate": "24%",
    "click_rate": "4.2%",
    "engagement_score": 8.5
  }
}`
    },
    {
      id: 'revit-prompts',
      title: 'Generate Revit Prompts',
      method: 'POST',
      endpoint: '/api/v1/revit/prompts',
      description: 'Generate intelligent Revit automation prompts for AEC workflows',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/content/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "sheet_setup",
    "discipline": "architecture",
    "project_type": "commercial",
    "revit_version": "2024",
    "complexity": "standard"
  }'`,
      response: `{
  "prompt": "Create architectural sheet set for commercial project with standard title blocks, view organization, and drawing numbering sequence",
  "commands": [
    "TB.CREATE('A1_Commercial_TB')",
    "VIEW.ORGANIZE('Arch_Plan_Template')",
    "SHEET.NUMBER('A-100')"
  ],
  "parameters": {
    "title_block": "A1_Commercial_TB",
    "view_template": "Arch_Plan_Template",
    "numbering_start": "A-100"
  },
  "estimated_time_saved": "3.5 hours",
  "difficulty": "beginner"
}`
    }
  ]

  const quickStartSteps = [
    {
      step: 1,
      title: "Get Your API Key",
      description: "Sign up for a DevCraft Labs account and generate your API key from the dashboard.",
      code: "# Your API key will look like this:\ndcl_sk_1234567890abcdef..."
    },
    {
      step: 2,
      title: "Make Your First Request",
      description: "Test your API key with a simple invoice generation request.",
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/generate \\
  -H "Authorization: Bearer dcl_sk_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"client_name": "Test Client", "amount": 100.00}'`
    },
    {
      step: 3,
      title: "Handle the Response",
      description: "Process the JSON response to get your invoice URL and payment link.",
      code: `{
  "invoice_id": "inv_test_123",
  "pdf_url": "https://invoices.devcraft-labs.com/inv_test_123.pdf",
  "payment_link": "https://pay.devcraft-labs.com/inv_test_123"
}`
    }
  ]

  const emailApiCode = `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/email/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "businessType": "SaaS/Software",
    "emailType": "Sales Pitch",
    "tone": "professional",
    "customizations": {
      "companyName": "TechCorp",
      "recipientName": "John Smith",
      "includeCTA": true
    }
  }'`

  const emailApiResponse = `{
  "templates": [
    {
      "subject": "Transform Your Business with Our SaaS/Software Solutions",
      "body": "Dear John Smith,\\n\\nI hope this email finds you well. I'm reaching out because I believe our SaaS/Software solutions can significantly benefit TechCorp.\\n\\nOur SaaS/Software solution offers:\\n• 30% increase in efficiency\\n• Seamless integration with existing systems\\n• 24/7 customer support\\n• Competitive pricing\\n\\nI'd love to schedule a quick 15-minute demo to show you exactly how this can transform your operations.\\n\\nI look forward to discussing how we can help you achieve your goals.\\n\\nBest regards,\\n[Your Name]",
      "tone": "professional",
      "estimatedOpenRate": "24%",
      "estimatedClickRate": "4.2%"
    }
  ]
}`

  const contentGeneratorCode = `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/content/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contentType": "blog",
    "prompt": "Write a blog post about sustainable fashion trends for millennials",
    "tone": "professional",
    "language": "English",
    "length": "medium",
    "keywords": ["sustainable fashion", "eco-friendly", "millennials"]
  }'`

  const contentGeneratorResponse = `{
  "content": "# The Future of AI in Content Marketing\\n\\nIn today's digital landscape, artificial intelligence is revolutionizing how businesses create and distribute content...\\n\\n## Key Benefits of AI Content Creation\\n\\n1. **Increased Efficiency**: AI can generate content 10x faster than traditional methods\\n2. **Consistency**: Maintain brand voice across all content pieces\\n3. **Personalization**: Create targeted content for specific audience segments\\n4. **Cost-Effective**: Reduce content creation costs by up to 70%",
  "metadata": {
    "wordCount": 847,
    "readingTime": "3 minutes",
    "seoScore": 85,
    "keywordDensity": {
      "sustainable fashion": 2.3,
      "eco-friendly": 1.8,
      "millennials": 1.5
    }
  },
  "suggestions": [
    "Add more subheadings for better readability",
    "Include relevant statistics and data points",
    "Consider adding a call-to-action at the end"
  ]
}`

  const landingPageCode = `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/landing/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "industry": "SaaS/Software",
    "goal": "Start Free Trial",
    "targetAudience": "small business owners",
    "brandColors": {
      "primary": "#3B82F6",
      "secondary": "#10B981"
    }
  }'`

  const landingPageResponse = `{
  "landingPage": {
    "elements": [
      {
        "id": "1",
        "type": "header",
        "content": "Transform Your Business with Cutting-Edge AI Technology",
        "styles": {
          "fontSize": "3rem",
          "fontWeight": "bold",
          "textAlign": "center"
        }
      }
    ],
    "conversionOptimizations": [
      "Remove navigation to reduce distractions",
      "Add customer logos for credibility",
      "Include money-back guarantee"
    ],
    "estimatedConversionRate": "8.5%",
    "recommendations": [
      "Use contrasting colors for CTA buttons",
      "Add social proof elements",
      "Optimize for mobile devices"
    ]
  }
}`

  const webhookExample = `{
  "event": "invoice.paid",
  "timestamp": "2024-07-03T10:30:00Z",
  "data": {
    "invoice_id": "inv_1234567890",
    "amount": 1500.00,
    "currency": "USD",
    "client_email": "billing@acmecorp.com",
    "payment_method": "stripe",
    "payment_id": "pi_3O8Xm2..."
  },
  "signature": "sha256=a8b9c7d6e5f4..."
}`

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={54}
                height={32}
              />
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                ← Back to Home
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Documentation</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <div key={section.id}>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                      {section.title}
                    </h3>
                    <ul className="space-y-1 mb-4">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              activeSection === item.id
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'introduction' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  DevCraft Labs API Documentation
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  Welcome to the DevCraft Labs API documentation. Our APIs provide powerful AI-driven automation 
                  for businesses, developers, and AEC professionals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <Key className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">RESTful APIs</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Standard HTTP methods with JSON request/response format
                    </p>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Secure Authentication</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      API key based authentication with proper request signing
                    </p>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Real-time Processing</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Fast response times with webhook support for async operations
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Base URL</h3>
                  <code className="bg-neutral-100 dark:bg-neutral-700 px-4 py-2 rounded-lg text-neutral-900 dark:text-white font-mono">
                    https://devcraft-labs-api.vercel.app/api/v1
                  </code>
                  <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <a href="https://devcraft-labs-api.vercel.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                      → Live API Explorer & Testing Interface
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'authentication' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Authentication</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  DevCraft Labs uses API keys to authenticate requests. You can generate and manage your API keys from your dashboard.
                </p>

                <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">API Key Format</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    All API keys start with <code className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">dcl_sk_</code> followed by a unique identifier.
                  </p>
                  <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                    <code className="text-neutral-900 dark:text-white font-mono">
                      Authorization: Bearer dcl_sk_1234567890abcdef...
                    </code>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Security Best Practices</h4>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>• Never expose API keys in client-side code</li>
                    <li>• Use environment variables to store keys securely</li>
                    <li>• Rotate keys regularly for enhanced security</li>
                    <li>• Monitor API usage for unusual activity</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'quick-start' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Quick Start Guide</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  Get up and running with DevCraft Labs API in just a few minutes.
                </p>

                <div className="space-y-8">
                  {quickStartSteps.map((step) => (
                    <div key={step.step} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {step.step}
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">{step.description}</p>
                      <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                        <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'rate-limits' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Rate Limits</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  API rate limits are enforced per API key to ensure fair usage and system stability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Free Tier</h3>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">100</div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">requests per hour</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Pro Plan</h3>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,000</div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">requests per hour</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Enterprise</h3>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">10,000</div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">requests per hour</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Content API */}
            {activeSection === 'email-api' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Email Content API</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  Generate professional email content with AI-powered optimization for any business type and tone.
                </p>
                
                <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        POST
                      </span>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Generate Email Content</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(emailApiCode, 'email-generate')}
                      className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <code className="text-neutral-600 dark:text-neutral-400 text-sm font-mono mb-4 block">
                    /api/v1/email/generate
                  </code>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Generate professional email templates with customizable business types, email types, and tones.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Request</h4>
                    <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 relative">
                      <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                        <code>{emailApiCode}</code>
                      </pre>
                      {copiedCode === 'email-generate' && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Response</h4>
                    <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                      <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                        <code>{emailApiResponse}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Email Types</h4>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>• Welcome Email</li>
                        <li>• Sales Pitch</li>
                        <li>• Follow-up</li>
                        <li>• Newsletter</li>
                        <li>• Product Launch</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Available Tones</h4>
                      <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                        <li>• Professional</li>
                        <li>• Friendly</li>
                        <li>• Casual</li>
                        <li>• Enthusiastic</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API Examples for different sections */}
            {['invoice-api', 'revit-api'].includes(activeSection) && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  {activeSection === 'invoice-api' && 'Invoice Generator API'}
                  {activeSection === 'revit-api' && 'ReviPrompt API'}
                </h1>
                
                <div className="space-y-8">
                  {apiExamples
                    .filter(example => {
                      if (activeSection === 'invoice-api') return ['generate-invoice', 'send-email'].includes(example.id)
                      if (activeSection === 'revit-api') return example.id === 'revit-prompts'
                      return false
                    })
                    .map((example) => (
                      <div key={example.id} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                              {example.method}
                            </span>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{example.title}</h3>
                          </div>
                          <button
                            onClick={() => copyToClipboard(example.code, example.id)}
                            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <code className="text-neutral-600 dark:text-neutral-400 text-sm font-mono mb-4 block">
                          {example.endpoint}
                        </code>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">{example.description}</p>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Request</h4>
                          <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 relative">
                            <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                              <code>{example.code}</code>
                            </pre>
                            {copiedCode === example.id && (
                              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                                Copied!
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {example.response && (
                          <div>
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Response</h4>
                            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                              <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                                <code>{example.response}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Landing Page Builder API */}
            {activeSection === 'landing-api' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Landing Page Builder API</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  Generate high-converting landing pages with AI-powered optimization for any industry and goal.
                </p>
                
                <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        POST
                      </span>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Generate Landing Page</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(landingPageCode, 'landing-generate')}
                      className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <code className="text-neutral-600 dark:text-neutral-400 text-sm font-mono mb-4 block">
                    /api/v1/landing/generate
                  </code>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Generate a complete landing page with industry-specific templates, conversion optimization tips, and estimated conversion rates.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Request</h4>
                    <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 relative">
                      <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                        <code>{landingPageCode}</code>
                      </pre>
                      {copiedCode === 'landing-generate' && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Response</h4>
                    <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                      <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                        <code>{landingPageResponse}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Supported Industries</h4>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>• SaaS/Software</li>
                        <li>• E-commerce</li>
                        <li>• Consulting</li>
                        <li>• Real Estate</li>
                        <li>• Healthcare</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Features</h4>
                      <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                        <li>• Conversion rate estimates</li>
                        <li>• Industry-specific templates</li>
                        <li>• Optimization recommendations</li>
                        <li>• Brand color customization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Webhooks Documentation */}
            {activeSection === 'webhooks' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Webhooks</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  Receive real-time notifications when events occur in your DevCraft Labs account.
                </p>

                <div className="space-y-8">
                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Setting Up Webhooks</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Configure webhook endpoints to receive notifications about invoice payments, API usage, and other events.
                    </p>
                    
                    <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 mb-6">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Webhook URL Format</h4>
                      <code className="text-sm text-neutral-900 dark:text-white font-mono">
                        POST https://your-domain.com/webhooks/devcraft
                      </code>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Supported Events</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• <code>invoice.created</code> - New invoice generated</li>
                          <li>• <code>invoice.paid</code> - Invoice payment received</li>
                          <li>• <code>invoice.failed</code> - Payment failed</li>
                          <li>• <code>subscription.created</code> - New subscription</li>
                          <li>• <code>subscription.cancelled</code> - Subscription ended</li>
                          <li>• <code>api.limit_reached</code> - Rate limit hit</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Security</h4>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <li>• HMAC-SHA256 signature verification</li>
                          <li>• Timestamps to prevent replay attacks</li>
                          <li>• IP allowlist for additional security</li>
                          <li>• Automatic retry with exponential backoff</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Example Webhook Payload</h3>
                    <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                      <pre className="text-sm text-neutral-900 dark:text-white overflow-x-auto">
                        <code>{webhookExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Coming Soon sections */}
            {['task-api', 'social-api', 'mep-api', 'qc-api'].includes(activeSection) && (
              <div className="text-center py-16">
                <Code className="w-16 h-16 text-neutral-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">Coming Soon</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                  This API documentation is being prepared and will be available soon.
                </p>
                <Link href="/contact" className="btn-primary inline-flex items-center space-x-2">
                  <span>Request Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}