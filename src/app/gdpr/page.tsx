'use client'
import Link from 'next/link'
import { useState } from 'react'

import { Shield, FileText, UserCheck, Eye, Download, Settings, Mail, Phone, MapPin, Clock } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function GDPRPage() {

  const dataTypes = [
    {
      category: 'Identity Data',
      icon: <UserCheck className="w-6 h-6" />,
      description: 'Personal information that identifies you directly',
      examples: [
        'Full name and contact details',
        'Email address and phone number',
        'Company name and job title',
        'Profile photos and avatars'
      ],
      lawfulBasis: 'Contract performance and legitimate interests',
      retention: '3 years after last interaction'
    },
    {
      category: 'Usage Data',
      icon: <Eye className="w-6 h-6" />,
      description: 'Information about how you use our services',
      examples: [
        'Website pages visited and time spent',
        'Features used and content generated',
        'Device information and IP address',
        'Browser type and operating system'
      ],
      lawfulBasis: 'Legitimate interests for service improvement',
      retention: '2 years for analytics, 30 days for logs'
    },
    {
      category: 'Communication Data',
      icon: <Mail className="w-6 h-6" />,
      description: 'Records of your communications with us',
      examples: [
        'Support tickets and chat messages',
        'Email correspondence',
        'Phone call recordings (with consent)',
        'Feedback and survey responses'
      ],
      lawfulBasis: 'Contract performance and legitimate interests',
      retention: '5 years for legal compliance'
    },
    {
      category: 'Technical Data',
      icon: <Settings className="w-6 h-6" />,
      description: 'Technical information for service delivery',
      examples: [
        'API usage logs and error reports',
        'Performance metrics and diagnostics',
        'Security logs and access records',
        'Integration configurations'
      ],
      lawfulBasis: 'Legitimate interests for security and performance',
      retention: '1 year for performance data, 3 years for security logs'
    }
  ]

  const rights = [
    {
      right: 'Right to Access',
      description: 'Request a copy of your personal data',
      howToExercise: 'Contact us with a data subject access request',
      timeline: '1 month'
    },
    {
      right: 'Right to Rectification',
      description: 'Correct inaccurate or incomplete data',
      howToExercise: 'Update your profile or contact support',
      timeline: '1 month'
    },
    {
      right: 'Right to Erasure',
      description: 'Request deletion of your personal data',
      howToExercise: 'Submit a deletion request through our portal',
      timeline: '1 month'
    },
    {
      right: 'Right to Portability',
      description: 'Receive your data in a structured format',
      howToExercise: 'Download your data from account settings',
      timeline: '1 month'
    },
    {
      right: 'Right to Object',
      description: 'Object to processing for specific purposes',
      howToExercise: 'Opt-out through preferences or contact us',
      timeline: 'Immediate for marketing, 1 month for others'
    },
    {
      right: 'Right to Restrict Processing',
      description: 'Limit how we process your data',
      howToExercise: 'Contact us with your specific restrictions',
      timeline: '1 month'
    }
  ]

  const thirdParties = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      dataShared: 'Usage data, device information, anonymized identifiers',
      location: 'United States',
      safeguards: 'Privacy Shield certification, Data Processing Agreement'
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      dataShared: 'Payment information, billing details, transaction data',
      location: 'United States',
      safeguards: 'PCI DSS compliance, Standard Contractual Clauses'
    },
    {
      name: 'Mailchimp',
      purpose: 'Email marketing and communication',
      dataShared: 'Email addresses, communication preferences, engagement data',
      location: 'United States',
      safeguards: 'Privacy Shield certification, Data Processing Agreement'
    },
    {
      name: 'Intercom',
      purpose: 'Customer support and communication',
      dataShared: 'Contact information, support history, chat messages',
      location: 'United States',
      safeguards: 'Privacy Shield certification, Data Processing Agreement'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Shield className="w-20 h-20 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            GDPR Compliance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Your privacy rights under the General Data Protection Regulation (GDPR) and how ReviPrompt Lab protects your personal data.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Applies to EU residents</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Exercise Your Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/account/data-request"
                className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Download My Data</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get a copy of your personal data</div>
                </div>
              </Link>
              <Link
                href="/account/privacy-settings"
                className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <Settings className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Privacy Settings</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Manage your data preferences</div>
                </div>
              </Link>
              <Link
                href="/contact?subject=data-protection"
                className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Contact DPO</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Speak with our Data Protection Officer</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Data We Collect */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            What Data We Collect
          </h2>
          <div className="space-y-6">
            {dataTypes.map((type) => (
              <div key={type.category} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600">
                      {type.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {type.category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {type.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          {type.examples.map((example, index) => (
                            <li key={index}>{example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Lawful Basis:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{type.lawfulBasis}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Retention Period:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{type.retention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Your Rights Under GDPR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right) => (
              <div key={right.right} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {right.right}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {right.description}
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">How to exercise: </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{right.howToExercise}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Response time: </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{right.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Third Party Sharing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Third Party Data Sharing
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Data Transfer Safeguards</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We only share your data with trusted third parties who provide adequate protection through 
                  Privacy Shield certification, Standard Contractual Clauses, or other approved mechanisms.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {thirdParties.map((party) => (
              <div key={party.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {party.name}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {party.location}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Purpose:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{party.purpose}</p>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Shared:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{party.dataShared}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Safeguards:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{party.safeguards}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Protection Officer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Data Protection Officer
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Our DPO
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our Data Protection Officer is available to help with any questions about your personal data, 
                  privacy rights, or our data processing practices.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">dpo@revipromptlab.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">ReviPrompt Lab Data Protection Office</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Supervisory Authority
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You have the right to lodge a complaint with your local data protection authority if you believe 
                  your privacy rights have been violated.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">EU Residents:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Contact your national data protection authority or visit{' '}
                    <Link href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" className="text-blue-600 hover:text-blue-700">
                      edpb.europa.eu
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Policies */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Related Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/privacy" 
              className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <FileText className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive overview of our data practices and privacy commitments
              </p>
            </Link>
            
            <Link 
              href="/cookies" 
              className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <Settings className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie Policy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Information about cookies and tracking technologies we use
              </p>
            </Link>
            
            <Link 
              href="/terms" 
              className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <Shield className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Terms and conditions governing your use of our services
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}