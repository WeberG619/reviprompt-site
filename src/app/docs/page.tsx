'use client'
import Link from 'next/link'
import { ArrowRight, Code, Book, Zap, Terminal, ExternalLink, Copy, Moon, Sun, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DocsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('getting-started')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'quick-start', title: 'Quick Start Guide' },
      ]
    },
    {
      id: 'ai-business',
      title: 'AI Business Tools',
      items: [
        { id: 'invoice-api', title: 'Invoice Generator API' },
        { id: 'content-api', title: 'Content Engine API' },
        { id: 'support-api', title: 'Customer Intelligence API' },
      ]
    },
    {
      id: 'developer',
      title: 'Developer Platform',
      items: [
        { id: 'code-api', title: 'Code Intelligence API' },
        { id: 'testing-api', title: 'API Testing Platform' },
        { id: 'database-api', title: 'Database Optimizer API' },
      ]
    },
    {
      id: 'aec',
      title: 'AEC Solutions',
      items: [
        { id: 'revit-api', title: 'Revit Automation API' },
        { id: 'cad-api', title: 'CAD Intelligence API' },
        { id: 'bim-api', title: 'BIM Collaboration API' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 40 40" className="text-white">
                  <path d="M8 6h8c8.284 0 15 6.716 15 15s-6.716 15-15 15H8V6z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Documentation</div>
              </div>
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
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
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
                <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
                  Welcome to the DevCraft Labs API documentation. Our APIs are designed for developers who need professional-grade AI tools with enterprise reliability.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Base URL
                  </h2>
                  <code className="text-blue-800 dark:text-blue-200 font-mono">
                    https://api.devcraft-labs.com/v1
                  </code>
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  API Features
                </h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">RESTful API with JSON responses</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Rate limiting: 1000 requests/hour</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">99.9% uptime SLA</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">Comprehensive error handling</span>
                  </li>
                </ul>
              </div>
            )}

            {activeSection === 'authentication' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  Authentication
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
                  DevCraft Labs uses API keys for authentication. Include your API key in the Authorization header of all requests.
                </p>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  Getting Your API Key
                </h2>
                <ol className="list-decimal list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
                  <li>Sign up for a DevCraft Labs account</li>
                  <li>Navigate to your dashboard</li>
                  <li>Go to Settings → API Keys</li>
                  <li>Generate a new API key</li>
                </ol>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  Using Your API Key
                </h2>
                <div className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-6 mb-6">
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`curl -X GET "https://api.devcraft-labs.com/v1/invoices" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'invoice-api' && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  Invoice Generator API
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
                  Generate professional invoices with AI-powered descriptions and automated payment tracking.
                </p>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  Create Invoice
                </h2>
                <div className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-400 font-mono">POST /v1/invoices</span>
                    <button className="text-neutral-400 hover:text-neutral-200">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`{
  "client_name": "Acme Corp",
  "client_email": "billing@acme.com",
  "amount": 2500.00,
  "description": "Web development services",
  "due_date": "2024-02-15",
  "ai_enhance": true
}`}
                  </pre>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Response</h3>
                <div className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-6 mb-6">
                  <pre className="text-blue-400 font-mono text-sm overflow-x-auto">
{`{
  "id": "inv_12345",
  "status": "draft",
  "invoice_number": "INV-2024-001",
  "pdf_url": "https://api.devcraft-labs.com/v1/invoices/inv_12345/pdf",
  "ai_description": "Professional web development services including responsive design, backend development, and deployment optimization.",
  "created_at": "2024-01-15T10:30:00Z"
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* Default content for other sections */}
            {!['introduction', 'authentication', 'invoice-api'].includes(activeSection) && (
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  Coming Soon
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
                  This section is currently under development. Check back soon for comprehensive API documentation.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Want to be notified when this API is available? <Link href="/contact" className="underline">Contact us</Link> to join our early access program.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}