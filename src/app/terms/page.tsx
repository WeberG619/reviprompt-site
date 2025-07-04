'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, Scale, AlertTriangle, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TermsPage() {
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
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Terms of Service</div>
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
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Important Notice
                </h2>
                <p className="text-amber-800 dark:text-amber-200">
                  Please read these Terms of Service carefully before using DevCraft Labs services. 
                  By accessing or using our services, you agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center">
            <Scale className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            1. Acceptance of Terms
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-6">
            These Terms of Service ("Terms") constitute a legally binding agreement between you and DevCraft Labs Inc. 
            ("Company", "we", "us", or "our") regarding your use of our AI-powered software tools and services 
            (collectively, the "Services").
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            By creating an account, accessing, or using our Services, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            2. Description of Services
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            DevCraft Labs provides AI-powered software tools designed for businesses, developers, and AEC professionals, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
            <li>AI Invoice Generator with automated payment tracking</li>
            <li>AI Content Engine for professional content creation</li>
            <li>Developer tools for code generation and testing</li>
            <li>AEC solutions for architecture and engineering workflows</li>
            <li>Related APIs, integrations, and support services</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            3. Account Registration and Eligibility
          </h2>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Eligibility Requirements</h3>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>• You must be at least 18 years old</li>
              <li>• You must have the legal authority to enter into this agreement</li>
              <li>• You must provide accurate and complete registration information</li>
              <li>• You are responsible for maintaining the security of your account</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            4. Subscription Plans and Billing
          </h2>
          
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Subscription Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Starter (Free)</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Limited usage with basic features</p>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Pro ($29/month)</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Full access to all business tools</p>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Enterprise ($99/month)</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Advanced features and priority support</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Billing Terms
          </h3>
          <ul className="list-disc list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
            <li>Subscription fees are billed monthly or annually in advance</li>
            <li>All fees are non-refundable except as expressly stated</li>
            <li>We may change pricing with 30 days advance notice</li>
            <li>Failed payments may result in service suspension</li>
            <li>You can cancel your subscription at any time from your account settings</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            5. Acceptable Use Policy
          </h2>
          
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">Prohibited Activities</h3>
            <ul className="space-y-2 text-red-800 dark:text-red-200">
              <li>• Violating any applicable laws or regulations</li>
              <li>• Infringing on intellectual property rights</li>
              <li>• Attempting to reverse engineer or hack our services</li>
              <li>• Generating harmful, illegal, or inappropriate content</li>
              <li>• Sharing account credentials with unauthorized users</li>
              <li>• Excessive API usage beyond rate limits</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            6. Intellectual Property Rights
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            <strong>Our IP:</strong> DevCraft Labs retains all rights to our software, AI models, documentation, 
            and other intellectual property. You receive a limited, non-exclusive license to use our Services.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            <strong>Your Content:</strong> You retain ownership of content you create using our Services. 
            You grant us a limited license to process and improve our AI models using aggregated, 
            anonymized data derived from your usage.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            7. Data and Privacy
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            Your privacy is important to us. Our collection, use, and protection of your data is governed by our 
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link>, 
            which is incorporated into these Terms by reference.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            8. Service Availability and Support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">Service Level Agreement</h3>
              <ul className="space-y-2 text-green-800 dark:text-green-200">
                <li>• 99.9% uptime guarantee</li>
                <li>• 24/7 monitoring and maintenance</li>
                <li>• Scheduled maintenance with advance notice</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Support Options</h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                <li>• Email support for all users</li>
                <li>• Priority support for Pro/Enterprise</li>
                <li>• Documentation and knowledge base</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, DEVCRAFT LABS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF 
            PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICES.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            10. Termination
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            Either party may terminate this agreement at any time:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
            <li><strong>By You:</strong> Cancel your subscription through your account settings</li>
            <li><strong>By Us:</strong> For violation of these Terms or non-payment of fees</li>
            <li><strong>Effect:</strong> Upon termination, your access to paid features will end, but you may retain access to free features</li>
          </ul>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            11. Changes to Terms
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-8">
            We may update these Terms from time to time. We will notify you of material changes via email 
            or through our Services. Continued use of our Services after changes become effective constitutes 
            acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            12. Contact Information
          </h2>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <p className="text-neutral-700 dark:text-neutral-300">
              For questions about these Terms of Service, please contact us:<br /><br />
              <strong>Email:</strong> legal@devcraft-labs.com<br />
              <strong>Address:</strong> DevCraft Labs Inc., 123 Innovation Drive, Tech Hub, CA 94105<br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}