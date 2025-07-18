'use client'
import Link from 'next/link'
import { ArrowRight, Building2, FileText, CheckCircle, Download, Star, Zap, Settings, BookOpen } from 'lucide-react'
import { useState } from 'react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function AECContentPage() {
  const [activeTab, setActiveTab] = useState('specs')

  const contentTypes = [
    {
      id: 'specs',
      name: 'Specifications',
      icon: <FileText className="w-5 h-5" />,
      description: 'Generate detailed project specifications with industry standards'
    },
    {
      id: 'notes',
      name: 'Drawing Notes',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Create comprehensive drawing notes and annotations'
    },
    {
      id: 'rfi',
      name: 'RFI Responses',
      icon: <Settings className="w-5 h-5" />,
      description: 'Generate professional RFI responses and clarifications'
    },
    {
      id: 'reports',
      name: 'Project Reports',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Create detailed project progress and quality reports'
    }
  ]

  const features = [
    {
      title: "Specification Generation",
      description: "Generate comprehensive technical specifications for architectural, structural, and MEP systems",
      benefits: ["CSI MasterFormat compliance", "Industry standard templates", "Custom section creation", "Material specifications"],
      accuracy: "98%",
      timeSaved: "20hrs/week"
    },
    {
      title: "Drawing Annotations",
      description: "Create detailed drawing notes, dimensions, and technical annotations automatically",
      benefits: ["Standard notation", "Consistent formatting", "Detail callouts", "Revision tracking"],
      accuracy: "95%",
      timeSaved: "15hrs/week"
    },
    {
      title: "RFI Management",
      description: "Generate professional RFI responses with technical accuracy and code compliance",
      benefits: ["Code references", "Technical solutions", "Visual attachments", "Response tracking"],
      accuracy: "97%",
      timeSaved: "10hrs/week"
    },
    {
      title: "Quality Reports",
      description: "Create comprehensive quality control and project progress reports",
      benefits: ["Progress tracking", "Issue identification", "Compliance checks", "Photo documentation"],
      accuracy: "99%",
      timeSaved: "12hrs/week"
    }
  ]

  const templates = [
    {
      category: "Architectural",
      items: [
        "Building envelope specifications",
        "Interior finish schedules",
        "Door and window specifications",
        "Roofing and waterproofing",
        "Accessibility compliance notes"
      ]
    },
    {
      category: "Structural",
      items: [
        "Concrete specifications",
        "Steel framing details",
        "Foundation requirements",
        "Seismic design notes",
        "Load path documentation"
      ]
    },
    {
      category: "MEP Systems",
      items: [
        "HVAC system specifications",
        "Electrical load calculations",
        "Plumbing fixture schedules",
        "Fire protection systems",
        "Energy efficiency notes"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText className="w-4 h-4 mr-2" />
                AEC Content Generator
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              AEC Content Generator
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
              Generate professional AEC documentation, specifications, and project content with AI. 
              Streamline your documentation workflow with industry-standard templates and compliance checks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pricing?plan=aec-professional" 
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Start Generating</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#demo" 
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">20hrs</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Saved per Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Content Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Code Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Professional Content Generation
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Generate industry-standard documentation for every phase of your project
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
              >
                {type.icon}
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {feature.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded">
                    {feature.accuracy} Accuracy
                  </div>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded">
                    Saves {feature.timeSaved}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Industry-Standard Templates
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Pre-built templates for every discipline and project type
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  {template.category}
                </h3>
                <ul className="space-y-2">
                  {template.items.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Watch how easy it is to generate professional AEC content
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Generate Specifications in Seconds
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">1</div>
                    <span className="text-neutral-700 dark:text-neutral-300">Select content type and project details</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">2</div>
                    <span className="text-neutral-700 dark:text-neutral-300">AI generates professional content with code compliance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">3</div>
                    <span className="text-neutral-700 dark:text-neutral-300">Review, edit, and export to your preferred format</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link 
                    href="/pricing?plan=aec-professional"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <span>Try Generator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center text-neutral-500 dark:text-neutral-400">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p>Interactive Demo</p>
                  <p className="text-sm">Live demonstration available in dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Streamline Your Documentation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Generate professional AEC content in seconds, not hours. Join thousands of professionals already saving 20+ hours per week.
          </p>
          <Link 
            href="/pricing?plan=aec-professional" 
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <span>Start Generating Content</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}