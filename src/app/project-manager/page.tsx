'use client'
import Link from 'next/link'
import { ArrowRight, Building2, Calendar, CheckCircle, Users, BarChart3, Clock, Target, Zap, Settings } from 'lucide-react'
import { useState } from 'react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function ProjectManagerPage() {
  const [activeFeature, setActiveFeature] = useState('scheduling')

  const features = [
    {
      id: 'scheduling',
      name: 'Smart Scheduling',
      icon: <Calendar className="w-6 h-6" />,
      description: 'AI-powered project scheduling with BIM integration and critical path analysis',
      benefits: [
        'Automated schedule generation from BIM models',
        'Critical path optimization',
        'Resource conflict detection',
        'Weather and material delivery integration'
      ]
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: <Users className="w-6 h-6" />,
      description: 'Centralized team communication with role-based access and real-time updates',
      benefits: [
        'Role-based dashboard views',
        'Real-time progress updates',
        'Integrated RFI management',
        'Mobile field reporting'
      ]
    },
    {
      id: 'analytics',
      name: 'Project Analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'Comprehensive project insights with predictive analytics and performance metrics',
      benefits: [
        'Predictive delay analysis',
        'Cost variance tracking',
        'Quality metrics dashboard',
        'Performance benchmarking'
      ]
    },
    {
      id: 'integration',
      name: 'BIM Integration',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Seamless integration with Revit, Navisworks, and other BIM platforms',
      benefits: [
        'Direct Revit model sync',
        'Navisworks clash integration',
        '4D scheduling visualization',
        'Model-based quantity takeoffs'
      ]
    }
  ]

  const metrics = [
    { value: "45%", label: "Efficiency Increase", desc: "Average project efficiency improvement" },
    { value: "500+", label: "Active Teams", desc: "Construction teams using our platform" },
    { value: "25%", label: "Time Savings", desc: "Reduction in project delivery time" },
    { value: "99.8%", label: "Uptime", desc: "Platform reliability for critical projects" }
  ]

  const integrations = [
    { name: "Autodesk Revit", logo: "🏗️", description: "Direct model synchronization" },
    { name: "Navisworks", logo: "🔍", description: "Clash detection integration" },
    { name: "Microsoft Project", logo: "📊", description: "Schedule import/export" },
    { name: "Procore", logo: "🏢", description: "Construction management sync" },
    { name: "PlanGrid", logo: "📋", description: "Field drawing management" },
    { name: "Bluebeam", logo: "📄", description: "Document collaboration" }
  ]

  const useCases = [
    {
      title: "Commercial Construction",
      description: "Manage complex commercial projects with multiple trades and tight deadlines",
      features: ["Multi-trade coordination", "Milestone tracking", "Quality control", "Safety compliance"]
    },
    {
      title: "Infrastructure Projects",
      description: "Coordinate large-scale infrastructure with complex scheduling requirements",
      features: ["Long-term planning", "Resource optimization", "Environmental tracking", "Regulatory compliance"]
    },
    {
      title: "Residential Development",
      description: "Streamline residential projects with standardized workflows and automation",
      features: ["Template-based scheduling", "Material tracking", "Subcontractor management", "Progress reporting"]
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
                <Building2 className="w-4 h-4 mr-2" />
                Project Manager Pro
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Construction Project Management
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
              Intelligent project management platform designed for construction professionals. 
              Integrate BIM workflows, coordinate teams, and deliver projects on time and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pricing?plan=construction-team" 
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Start Managing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#features" 
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View Features</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{metric.label}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Comprehensive Project Management
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Everything you need to manage construction projects efficiently
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeFeature === feature.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
              >
                {feature.icon}
                <span>{feature.name}</span>
              </button>
            ))}
          </div>

          {/* Active Feature Display */}
          {features.map((feature) => (
            activeFeature === feature.id && (
              <div key={feature.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                      {feature.description}
                    </p>
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-neutral-700 dark:text-neutral-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-6 h-64 flex items-center justify-center">
                    <div className="text-center text-neutral-500 dark:text-neutral-400">
                      {feature.icon}
                      <p className="mt-4">Feature Preview</p>
                      <p className="text-sm">Interactive demo available in dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Built for Every Project Type
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Flexible platform that adapts to your project needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Connect with your existing tools and workflows
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-4 text-center hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-2">{integration.logo}</div>
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                  {integration.name}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Project Manager Pro?
            </h2>
            <p className="text-xl text-blue-100">
              Built by construction professionals for construction professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Faster Delivery</h3>
              <p className="text-blue-100">Deliver projects 25% faster with intelligent scheduling and automation</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">On Budget</h3>
              <p className="text-blue-100">Stay on budget with predictive analytics and real-time cost tracking</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Better Collaboration</h3>
              <p className="text-blue-100">Improve team coordination with centralized communication and updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Transform Your Project Management?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join 500+ construction teams already delivering projects faster and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing?plan=construction-team" 
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact" 
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Schedule Demo</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}