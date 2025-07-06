'use client'
import Link from 'next/link'
import { ArrowRight, Code2, Rocket, Database, Zap, CheckCircle, Terminal } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Chatbot from '@/components/Chatbot'

export const dynamic = 'force-dynamic'

export default function SoftwareSolutionsPage() {
  const tools = [
    {
      name: 'AI Landing Page Builder',
      description: 'Generate high-converting landing pages with conversion optimization built-in',
      features: ['50+ templates', 'A/B testing', 'Analytics integration', 'Mobile responsive'],
      metrics: { conversion: '+60%', load_time: '<2s', templates: '50+' },
      href: '/landing-builder'
    },
    {
      name: 'AI Task Manager',
      description: 'Intelligent project management with automated workflow optimization',
      features: ['Smart scheduling', 'Team collaboration', 'Progress tracking', 'Resource allocation'],
      metrics: { productivity: '+45%', efficiency: '3x faster', automation: '80%' },
      href: '/task-manager'
    },
    {
      name: 'API Explorer & Documentation',
      description: 'Interactive API testing and comprehensive developer documentation',
      features: ['Live API testing', 'Code examples', 'SDKs available', 'Real-time docs'],
      metrics: { uptime: '99.9%', response: '<100ms', endpoints: '20+' },
      href: '/api-explorer'
    },
    {
      name: 'AI Content Generator',
      description: 'Generate technical documentation, release notes, and developer content',
      features: ['Technical writing', 'Code documentation', 'Release notes', 'API descriptions'],
      metrics: { quality: '98%', speed: '10x faster', accuracy: '95%' },
      href: '/content'
    }
  ]

  const useCases = [
    {
      title: 'SaaS Development',
      description: 'Build landing pages, manage development tasks, and create technical content for your SaaS product.',
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: 'Developer Tools',
      description: 'Create comprehensive documentation, test APIs, and manage development workflows.',
      icon: <Code2 className="w-6 h-6" />
    },
    {
      title: 'Product Management',
      description: 'Track development progress, manage team tasks, and coordinate releases efficiently.',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'Technical Writing',
      description: 'Generate high-quality technical documentation, tutorials, and developer guides.',
      icon: <Terminal className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <Code2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI Tools for Software Companies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Accelerate development, streamline workflows, and ship better products with AI-powered tools designed for software teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/api-explorer" className="btn-secondary inline-flex items-center space-x-2">
              <span>Explore APIs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Software Development Teams
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From startups to enterprise teams, streamline your development process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-600 dark:text-green-400">{useCase.icon}</div>
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

      {/* Developer Features */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Developer-First Approach
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tools built by developers, for developers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Terminal className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">API-First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Everything accessible via REST APIs with comprehensive documentation
              </p>
            </div>
            <div className="text-center">
              <Code2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SDKs Available</h3>
              <p className="text-gray-600 dark:text-gray-400">
                JavaScript, Python, and Node.js SDKs for easy integration
              </p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                99.9% uptime with &lt;100ms response times globally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Development Tools That Scale
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From prototyping to production, tools that grow with your team
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
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ship Better Software, Faster
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of developers using DevCraft Labs to accelerate their development process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-white inline-flex items-center space-x-2">
              <span>Start Building</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="btn-outline-white inline-flex items-center space-x-2">
              <span>View Documentation</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="software-solutions" />
    </div>
  )
}