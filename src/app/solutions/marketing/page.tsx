'use client'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Target, Users, Zap, CheckCircle } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Chatbot from '@/components/Chatbot'


export default function MarketingSolutionsPage() {
  const tools = [
    {
      name: 'AI Content Generator',
      description: 'Create blog posts, social media content, and marketing copy at scale',
      features: ['15+ content types', 'SEO optimization', 'Brand voice matching', 'Bulk generation'],
      metrics: { quality: '98%', speed: '10x faster', formats: '15+' },
      href: '/content'
    },
    {
      name: 'AI Proposal Generator', 
      description: 'Win more clients with professional, tailored business proposals',
      features: ['Industry templates', 'Executive summaries', 'Budget estimates', 'Timeline planning'],
      metrics: { accuracy: '95%', time_saved: '80%', win_rate: '+45%' },
      href: '/proposals'
    },
    {
      name: 'AI Landing Page Builder',
      description: 'Build high-converting landing pages optimized for your campaigns',
      features: ['A/B testing', 'Conversion optimization', 'Mobile responsive', 'Analytics integration'],
      metrics: { conversion: '+60%', load_time: '<2s', templates: '50+' },
      href: '/landing-builder'
    },
    {
      name: 'AI Social Scheduler',
      description: 'Plan, schedule, and optimize your social media presence',
      features: ['Multi-platform posting', 'Content optimization', 'Analytics dashboard', 'Team management'],
      metrics: { engagement: '+35%', reach: '2x more', platforms: '12+' },
      href: '/social-scheduler'
    }
  ]

  const useCases = [
    {
      title: 'Content Marketing',
      description: 'Generate consistent, high-quality content that engages your audience and drives results.',
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Lead Generation', 
      description: 'Create compelling landing pages and proposals that convert prospects into customers.',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Social Media Management',
      description: 'Maintain active social presence with automated scheduling and content optimization.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Client Acquisition',
      description: 'Win more business with professional proposals and persuasive marketing materials.',
      icon: <Zap className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI Tools for Marketing Agencies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Scale your content creation, win more clients, and deliver exceptional results with AI-powered marketing tools designed for agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?subject=marketing" className="btn-secondary inline-flex items-center space-x-2">
              <span>Book Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Perfect for Marketing Professionals
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Streamline your workflow and deliver better results for your clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600 dark:text-blue-400">{useCase.icon}</div>
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
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Marketing Tools That Drive Results
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to create, optimize, and scale your marketing efforts
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

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of marketing agencies using DevCraft Labs to deliver exceptional results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-white inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?subject=marketing" className="btn-outline-white inline-flex items-center space-x-2">
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="marketing-solutions" />
    </div>
  )
}