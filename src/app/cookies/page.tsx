'use client'
import Link from 'next/link'
import { useState } from 'react'

// Disable static generation for this page since it uses client-side state
export const dynamic = 'force-dynamic'
import { Shield, Cookie, Settings, Eye, UserCheck } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function CookiePolicyPage() {
  const [darkMode, setDarkMode] = useState(false)

  const cookieTypes = [
    {
      name: 'Strictly Necessary Cookies',
      icon: <Shield className="w-6 h-6" />,
      description: 'These cookies are essential for the website to function properly.',
      required: true,
      examples: [
        'Session cookies for user authentication',
        'Security cookies to prevent fraud',
        'Load balancing cookies for performance'
      ]
    },
    {
      name: 'Analytics Cookies',
      icon: <Eye className="w-6 h-6" />,
      description: 'Help us understand how visitors interact with our website.',
      required: false,
      examples: [
        'Google Analytics for website traffic analysis',
        'Performance monitoring cookies',
        'User behavior tracking for improvements'
      ]
    },
    {
      name: 'Functional Cookies',
      icon: <Settings className="w-6 h-6" />,
      description: 'Enable enhanced functionality and personalization.',
      required: false,
      examples: [
        'Theme preferences (dark/light mode)',
        'Language settings',
        'Customized user interface preferences'
      ]
    },
    {
      name: 'Marketing Cookies',
      icon: <UserCheck className="w-6 h-6" />,
      description: 'Used to track visitors across websites for marketing purposes.',
      required: false,
      examples: [
        'Social media tracking pixels',
        'Advertising platform cookies',
        'Conversion tracking cookies'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Cookie className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn about how DevCraft Labs uses cookies and similar technologies to improve your experience.
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Introduction */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Are Cookies?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How We Use Cookies
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            DevCraft Labs uses cookies to enhance your experience, analyze website performance, and provide personalized content. 
            We are committed to transparency about our data practices and your privacy rights.
          </p>
        </section>

        {/* Cookie Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Types of Cookies We Use
          </h2>
          
          <div className="space-y-6">
            {cookieTypes.map((type) => (
              <div key={type.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600">
                      {type.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {type.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        type.required 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {type.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {type.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {type.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Third-Party Services
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We work with trusted third-party services that may also use cookies:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Google Analytics:</strong> Helps us understand website traffic and user behavior</li>
              <li><strong>Stripe:</strong> Processes payments securely for our services</li>
              <li><strong>Vercel:</strong> Provides hosting and performance optimization</li>
              <li><strong>Social Media Platforms:</strong> Enable social sharing and embedded content</li>
            </ul>
          </div>
        </section>

        {/* Your Choices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Cookie Choices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Browser Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>View and delete existing cookies</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies (may affect functionality)</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Cookie Preferences
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You can manage your cookie preferences at any time:
              </p>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Manage Cookie Preferences
              </button>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Questions About Cookies?
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Email:</strong> privacy@devcraft-labs.com</p>
              <p><strong>Address:</strong> DevCraft Labs Privacy Team</p>
            </div>
            <div className="mt-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/privacy" 
              className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn how we collect, use, and protect your personal data
              </p>
            </Link>
            
            <Link 
              href="/terms" 
              className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Understand the terms governing your use of our services
              </p>
            </Link>
            
            <Link 
              href="/security" 
              className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Details about our security measures and practices
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}