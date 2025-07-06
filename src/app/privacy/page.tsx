'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Lock, Eye, Database, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

// Disable static generation for this page since it uses client-side state
export const dynamic = 'force-dynamic'

export default function PrivacyPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={54}
                height={32}
              />
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Privacy Policy</div>
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

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Privacy Commitment
                </h2>
                <p className="text-blue-800 dark:text-blue-200">
                  DevCraft Labs is committed to protecting your privacy and ensuring the security of your data. 
                  We follow industry best practices and maintain compliance with GDPR, CCPA, and other privacy regulations.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
            <Database className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Information We Collect
          </h2>
          
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Information You Provide
          </h3>
          <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
            <li>Account information (name, email address, company details)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Content you create using our AI tools</li>
            <li>Support communications and feedback</li>
            <li>Usage preferences and settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Information We Collect Automatically
          </h3>
          <ul className="list-disc list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information (operating system, device identifiers)</li>
            <li>Usage analytics (features used, time spent, performance metrics)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
            <Eye className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            How We Use Your Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Service Delivery</h3>
              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• Provide and maintain our AI tools</li>
                <li>• Process payments and billing</li>
                <li>• Deliver customer support</li>
                <li>• Send service-related communications</li>
              </ul>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Improvement & Analytics</h3>
              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• Analyze usage patterns</li>
                <li>• Improve our AI models</li>
                <li>• Develop new features</li>
                <li>• Ensure security and prevent fraud</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Data Security
          </h2>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">Enterprise-Grade Security</h3>
            <ul className="space-y-2 text-green-800 dark:text-green-200">
              <li>• End-to-end encryption for data in transit and at rest</li>
              <li>• SOC 2 Type II certified infrastructure</li>
              <li>• Regular security audits and penetration testing</li>
              <li>• Multi-factor authentication for all accounts</li>
              <li>• GDPR and CCPA compliant data handling</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Data Sharing
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            We do not sell, trade, or rent your personal information. We may share data only in these limited circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
            <li><strong>Service Providers:</strong> Trusted third parties who help us operate our service (e.g., cloud hosting, payment processing)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Consent:</strong> When you explicitly authorize us to share your information</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Your Rights
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            You have the following rights regarding your personal data:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Access & Portability</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Request a copy of your personal data in a portable format</p>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Correction</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Update or correct inaccurate personal information</p>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Deletion</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Request deletion of your personal data</p>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Opt-out</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Withdraw consent for marketing communications</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Cookies
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            We use cookies and similar technologies to improve your experience, analyze usage, and personalize content. 
            You can control cookie settings through your browser preferences. Essential cookies required for service 
            functionality cannot be disabled.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            International Transfers
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            Your data may be transferred to and processed in countries other than your country of residence. 
            We ensure appropriate safeguards are in place for international transfers, including Standard 
            Contractual Clauses approved by the European Commission.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Data Retention
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            We retain your personal data only as long as necessary to provide our services and fulfill legal obligations. 
            Account data is typically retained for the duration of your subscription plus 30 days. 
            You can request earlier deletion of your data at any time.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <p className="text-neutral-700 dark:text-neutral-300">
              <strong>Email:</strong> privacy@devcraft-labs.com<br />
              <strong>Address:</strong> 123 Innovation Drive, Tech Hub, CA 94105<br />
              <strong>Data Protection Officer:</strong> dpo@devcraft-labs.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}