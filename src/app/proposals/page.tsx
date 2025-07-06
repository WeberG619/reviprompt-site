'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, FileText, Clock, DollarSign, CheckCircle, Moon, Sun, Download, Send } from 'lucide-react'
import Chatbot from '@/components/Chatbot'

export default function ProposalsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [businessType, setBusinessType] = useState('')
  const [projectType, setProjectType] = useState('')
  const [clientInfo, setClientInfo] = useState('')
  const [projectScope, setProjectScope] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProposal, setGeneratedProposal] = useState<any>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const businessTypes = [
    'Software Development',
    'Design Agency', 
    'Marketing Agency',
    'Consulting',
    'E-commerce',
    'Real Estate',
    'Healthcare',
    'Education',
    'Finance',
    'Manufacturing',
    'Construction',
    'Retail',
    'Restaurant/Food Service',
    'Professional Services',
    'Non-profit',
    'Technology Startup',
    'SaaS Company',
    'Digital Agency',
    'Content Creation',
    'Media Production',
    'Legal Services',
    'Architecture Firm',
    'Automotive',
    'Transportation',
    'Logistics',
    'Insurance',
    'Banking',
    'Travel & Tourism',
    'Fitness & Wellness',
    'Beauty & Cosmetics',
    'Fashion & Apparel',
    'Home Services',
    'IT Services',
    'Telecommunications'
  ]

  const projectTypes = {
    'Software Development': ['Website Development', 'Mobile App Development', 'Software Integration', 'E-commerce Platform', 'Custom Software'],
    'Design Agency': ['Brand Identity', 'Marketing Campaign', 'Website Development', 'UI/UX Design'],
    'Marketing Agency': ['Digital Marketing', 'SEO Campaign', 'Social Media Management', 'Content Marketing'],
    'Consulting': ['Business Consulting', 'Digital Transformation', 'Process Optimization'],
    'E-commerce': ['Online Store Setup', 'Platform Migration', 'Marketing Strategy'],
    'Real Estate': ['Property Marketing', 'CRM Setup', 'Lead Generation'],
    'Healthcare': ['Practice Management', 'Patient Portal', 'Compliance Systems'],
    'Education': ['Learning Management', 'Online Courses', 'Student Portal'],
    'Finance': ['Financial Planning', 'Investment Management', 'Risk Assessment', 'Compliance Audit'],
    'Manufacturing': ['Process Optimization', 'Quality Control', 'Supply Chain Management', 'ERP Implementation'],
    'Construction': ['Project Management', 'Cost Estimation', 'Safety Compliance', 'Resource Planning'],
    'Retail': ['Store Setup', 'Inventory Management', 'Point of Sale', 'Customer Analytics'],
    'Restaurant/Food Service': ['Menu Development', 'POS System', 'Delivery Platform', 'Kitchen Management'],
    'Professional Services': ['Service Automation', 'Client Management', 'Billing System', 'Document Management'],
    'Non-profit': ['Fundraising Campaign', 'Volunteer Management', 'Event Planning', 'Donor Database'],
    'Technology Startup': ['MVP Development', 'Market Research', 'Scaling Strategy', 'Funding Preparation'],
    'SaaS Company': ['Product Development', 'Customer Onboarding', 'Subscription Management', 'Analytics Platform'],
    'Digital Agency': ['Client Portal', 'Project Management', 'Campaign Management', 'Reporting Dashboard'],
    'Content Creation': ['Content Strategy', 'Publishing Platform', 'Audience Analytics', 'Monetization Strategy'],
    'Media Production': ['Production Management', 'Asset Management', 'Distribution Strategy', 'Rights Management'],
    'Legal Services': ['Case Management', 'Document Automation', 'Client Portal', 'Billing System'],
    'Architecture Firm': ['Project Management', 'Design Collaboration', 'Client Presentation', 'Document Control'],
    'Automotive': ['Inventory Management', 'Service Scheduling', 'Customer Management', 'Parts Ordering'],
    'Transportation': ['Fleet Management', 'Route Optimization', 'Maintenance Scheduling', 'Driver Management'],
    'Logistics': ['Warehouse Management', 'Shipping Optimization', 'Inventory Tracking', 'Supply Chain'],
    'Insurance': ['Claims Processing', 'Policy Management', 'Risk Assessment', 'Customer Portal'],
    'Banking': ['Digital Banking', 'Loan Processing', 'Risk Management', 'Customer Onboarding'],
    'Travel & Tourism': ['Booking System', 'Itinerary Planning', 'Customer Management', 'Revenue Management'],
    'Fitness & Wellness': ['Membership Management', 'Class Scheduling', 'Personal Training', 'Health Tracking'],
    'Beauty & Cosmetics': ['Appointment Booking', 'Product Catalog', 'Customer Management', 'Inventory System'],
    'Fashion & Apparel': ['Product Catalog', 'Inventory Management', 'Order Fulfillment', 'Customer Analytics'],
    'Home Services': ['Service Scheduling', 'Customer Management', 'Billing System', 'Quality Control'],
    'IT Services': ['Help Desk System', 'Asset Management', 'Service Delivery', 'Client Portal'],
    'Telecommunications': ['Network Management', 'Customer Service', 'Billing System', 'Service Provisioning']
  }

  const handleGenerate = async () => {
    if (!businessType || !projectType) {
      alert('Please select both business type and project type')
      return
    }

    setIsGenerating(true)
    
    try {
      // Import API dynamically to avoid SSR issues
      const { devCraftAPI } = await import('@/lib/api')
      
      const response = await devCraftAPI.generateProposal({
        prompt: `${projectType} for ${businessType}`,
        businessType,
        context: {
          clientInfo: clientInfo,
          projectScope: projectScope,
          projectType: projectType
        }
      })
      
      if (response.success && response.data) {
        const proposalData = {
          id: `prop_${Date.now()}`,
          sections: [
            {
              id: '1',
              title: 'Executive Summary',
              content: response.data.executiveSummary
            },
            {
              id: '2',
              title: 'Project Scope',
              content: Array.isArray(response.data.scope) ? response.data.scope.join('\n• ') : response.data.scope || projectScope
            },
            {
              id: '3',
              title: 'Timeline & Methodology',
              content: response.data.timeline?.map((phase: any) => 
                `${phase.phase}: ${phase.duration}${phase.tasks ? '\n  - ' + phase.tasks.join('\n  - ') : ''}`
              ).join('\n\n') || 'Timeline will be provided based on project requirements.'
            },
            {
              id: '4',
              title: 'Investment & Budget',
              content: response.data.budget ? 
                `Total Investment: $${response.data.budget.totalEstimate?.toLocaleString()}\n\nBreakdown:\n${response.data.budget.breakdown?.map((item: any) => `• ${item.category}: $${item.amount?.toLocaleString()} (${item.percentage}%)`).join('\n')}\n\nPayment Terms: ${response.data.budget.paymentTerms}` :
                'Investment details will be provided based on final requirements.'
            },
            {
              id: '5',
              title: 'Deliverables',
              content: Array.isArray(response.data.deliverables) ? 
                response.data.deliverables.map((item: string) => `• ${item}`).join('\n') :
                'Comprehensive deliverables package including all project components.'
            }
          ],
          estimatedBudget: response.data.budget?.totalEstimate || 25000,
          timeline: '8-12 weeks',
          createdAt: new Date().toISOString(),
          aiGenerated: true,
          confidence: response.data.confidence || 0.95
        }
        
        setGeneratedProposal(proposalData)
      } else {
        throw new Error(response.error || 'Failed to generate proposal')
      }
    } catch (error) {
      alert('Error generating proposal. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

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
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">AI Proposal Generator</div>
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

      {/* Hero Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            AI Proposal Generator
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Create professional business proposals in minutes with AI-powered content generation, detailed sections, and smart recommendations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Save 80% Time</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Generate complete proposals in minutes instead of hours</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">95% Accuracy</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">AI-powered content tailored to your industry</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Win More Deals</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Professional proposals that convert prospects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Generate Your Proposal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Business Type *
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Project Type *
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={!businessType}
                >
                  <option value="">Select project type</option>
                  {businessType && projectTypes[businessType as keyof typeof projectTypes]?.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Client Information
              </label>
              <input
                type="text"
                value={clientInfo}
                onChange={(e) => setClientInfo(e.target.value)}
                placeholder="Client name, company, contact details..."
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Project Scope & Requirements
              </label>
              <textarea
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                placeholder="Describe the project scope, specific requirements, goals, and any special considerations..."
                rows={4}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !businessType || !projectType}
              className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Proposal...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Generate Proposal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Generated Proposal */}
      {generatedProposal && (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Generated Proposal
                </h2>
                <div className="flex space-x-3">
                  <button className="btn-secondary inline-flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="btn-primary inline-flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send to Client</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {generatedProposal.sections.map((section: any) => (
                  <div key={section.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Estimated Budget</h4>
                  <p className="text-2xl font-bold text-blue-600">${generatedProposal.estimatedBudget.toLocaleString()}</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Timeline</h4>
                  <p className="text-2xl font-bold text-green-600">{generatedProposal.timeline}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Powerful Proposal Features
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Everything you need to create winning business proposals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Complete Sections</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Executive summary, project understanding, timeline, and investment details</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Industry Templates</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Tailored content for software, design, marketing, consulting, and more</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Smart Pricing</h3>
              <p className="text-neutral-600 dark:text-neutral-400">AI-generated budget estimates based on industry standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Win More Deals?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals using DevCraft Labs to create winning proposals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-white inline-flex items-center space-x-2">
              <span>View Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white inline-flex items-center space-x-2">
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="proposals" />
    </div>
  )
}