'use client'
import Link from 'next/link'
import { ArrowRight, Briefcase, Target, Users, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Chatbot from '@/components/Chatbot'


export default function ConsultingSolutionsPage() {
  const tools = [
    {
      name: 'AI Proposal Generator',
      description: 'Create compelling, professional proposals that win more consulting engagements',
      features: ['Executive summaries', 'Scope documentation', 'Timeline planning', 'Budget estimates'],
      metrics: { accuracy: '95%', time_saved: '80%', win_rate: '+45%' },
      href: '/proposals'
    },
    {
      name: 'AI Content Generator',
      description: 'Develop thought leadership content, case studies, and client communications',
      features: ['Industry expertise', 'Client reports', 'Whitepapers', 'Case studies'],
      metrics: { quality: '98%', speed: '10x faster', formats: '15+' },
      href: '/content'
    },
    {
      name: 'AI Task Manager',
      description: 'Manage consulting projects, track deliverables, and coordinate team resources',
      features: ['Project tracking', 'Resource allocation', 'Client communication', 'Milestone management'],
      metrics: { productivity: '+45%', efficiency: '3x faster', delivery: '99%' },
      href: '/task-manager'
    },
    {
      name: 'AI Landing Page Builder',
      description: 'Build professional service pages that attract and convert prospects',
      features: ['Service templates', 'Lead capture', 'Testimonials', 'Case study showcases'],
      metrics: { conversion: '+60%', leads: '+120%', engagement: '+85%' },
      href: '/landing-builder'
    }
  ]

  const useCases = [
    {
      title: 'Business Consulting',
      description: 'Strategic planning, process optimization, and digital transformation consulting services.',
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: 'Management Consulting',
      description: 'Organizational development, change management, and operational efficiency consulting.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Strategy Consulting',
      description: 'Market analysis, competitive positioning, and growth strategy development.',
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Technology Consulting',
      description: 'Digital transformation, system integration, and technology adoption consulting.',
      icon: <BarChart3 className="w-6 h-6" />
    }
  ]

  const benefits = [
    {
      title: 'Win More Engagements',
      description: 'Professional proposals that clearly articulate value and differentiate your services',
      metric: '+45% win rate'
    },
    {
      title: 'Deliver Faster',
      description: 'Streamlined project management and automated documentation processes',
      metric: '80% time saved'
    },
    {
      title: 'Scale Your Practice',
      description: 'Efficient tools that allow you to take on more clients without increasing overhead',
      metric: '3x capacity'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <Briefcase className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI Tools for Consultants
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Win more engagements, deliver exceptional value, and scale your consulting practice with AI-powered tools built for professional services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?subject=consulting" className="btn-secondary inline-flex items-center space-x-2">
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Transform Your Consulting Practice
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Proven results from consultants using DevCraft Labs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center bg-white dark:bg-neutral-800 p-8 rounded-xl border border-gray-200 dark:border-neutral-700">
                <div className="text-3xl font-bold text-purple-600 mb-2">{benefit.metric}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Consulting Specializations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tools designed for different types of consulting practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600 dark:text-purple-400">{useCase.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Tools for Consultants
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to run a successful consulting practice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-gray-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {tool.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                  {Object.entries(tool.metrics).map(([key, value], i) => (
                    <div key={i} className="text-center">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={tool.href}
                  className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                >
                  <span>Try {tool.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <blockquote className="text-2xl font-medium text-white mb-8">
            "DevCraft Labs has transformed how we approach client engagements. Our proposal win rate increased by 45%, and we're delivering projects 80% faster."
          </blockquote>
          <div className="text-purple-200">
            <div className="font-semibold">Sarah Mitchell</div>
            <div>Principal Consultant, Strategic Solutions LLC</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Grow Your Practice?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join successful consultants using DevCraft Labs to win more engagements and deliver better results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/case-studies" className="btn-secondary inline-flex items-center space-x-2">
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="consulting-solutions" />
    </div>
  )
}