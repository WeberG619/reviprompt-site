'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Moon, Sun, Code2, CheckCircle, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

// Disable static generation for this page since it uses client-side state
export const dynamic = 'force-dynamic'

export default function DeveloperPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const products = [
    {
      name: "AI Landing Page Builder",
      description: "Professional landing page generation with conversion optimization",
      status: "coming-soon",
      features: ["Template library", "A/B testing", "Analytics integration", "Mobile responsive"],
      link: "#",
      cta: "Request Access",
      metrics: { conversion: "+60%", load_time: "<2s", templates: "50+" }
    },
    {
      name: "AI Task Manager",
      description: "Intelligent project management with automated workflow optimization",
      status: "coming-soon",
      features: ["Smart scheduling", "Team collaboration", "Progress tracking", "Resource allocation"],
      link: "#",
      cta: "Request Access",
      metrics: { productivity: "+45%", efficiency: "3x faster", automation: "80%" }
    },
    {
      name: "AI Social Scheduler",
      description: "Content planning and social media automation platform",
      status: "coming-soon",
      features: ["Multi-platform posting", "Content optimization", "Analytics dashboard", "Team management"],
      link: "#",
      cta: "Request Access",
      metrics: { engagement: "+35%", reach: "2x more", platforms: "10+" }
    }
  ]

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
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Developer Platform</div>
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
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Developer Platform
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Professional tools for modern development workflows. Build, deploy, and manage your applications with AI-powered automation.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover-lift glow-on-hover p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <span className={product.status === 'live' ? 'status-live' : 'status-coming-soon'}>
                      {product.status === 'live' ? '● Live' : '○ Coming Soon'}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                  {Object.entries(product.metrics).map(([key, value], i) => (
                    <div key={i} className="text-center">
                      <div className="text-sm font-semibold text-neutral-900 dark:text-white">{value}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
                
                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={product.link}
                  className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                    product.status === 'live'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Built for Developers, By Developers
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Our tools are designed with developer experience and productivity in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">API-First</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Every tool includes comprehensive APIs for seamless integration
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Open Source</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Core libraries and examples available on GitHub
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Developer Support</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Priority technical support and documentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Build the Future?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Join the developer community building with DevCraft Labs tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs" className="btn-primary inline-flex items-center space-x-2">
              <span>View Documentation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}