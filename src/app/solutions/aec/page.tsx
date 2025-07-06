'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Moon, Sun, Building2, CheckCircle, ExternalLink, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Chatbot from '@/components/Chatbot'

// Disable static generation for this page since it uses client-side state
export const dynamic = 'force-dynamic'

export default function AECPage() {
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
      name: "ReviPrompt Lab Professional",
      description: "AI prompts and automation tools for Revit professionals - trusted by 500+ users",
      status: "live",
      features: ["AI-powered prompts", "Sheet setup automation", "MEP coordination tools", "IBC/ADA compliance"],
      link: "/pricing?plan=aec-professional",
      cta: "Get AEC Professional",
      metrics: { users: "500+", time_saved: "60%", packs: "6 available" }
    },
    {
      name: "MEP Power Tools",
      description: "Advanced MEP coordination and calculation tools for Revit",
      status: "live",
      features: ["Load calculations", "Equipment tagging", "System validation", "Model auditing"],
      link: "/pricing?plan=aec-professional",
      cta: "Get AEC Professional",
      metrics: { efficiency: "+45%", accuracy: "99%", tools: "5 included" }
    },
    {
      name: "QC Professional Suite",
      description: "Quality control and deliverable checking for architectural projects",
      status: "live",
      features: ["Deliverable checker", "Element counter", "Model auditor", "Report generation"],
      link: "/pricing?plan=aec-professional",
      cta: "Get AEC Professional",
      metrics: { errors_found: "95%", time_saved: "40%", reports: "automated" }
    }
  ]

  const revitVersions = [
    { version: "Revit 2024", status: "Supported" },
    { version: "Revit 2025", status: "Supported" },
    { version: "Revit 2026", status: "Supported" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Unified Navigation */}
      <UnifiedNavigation />

      {/* Hero Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            AEC Solutions
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Professional tools for Architecture, Engineering & Construction. Streamline your Revit workflows with AI-powered automation and proven solutions.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Professional Revit Tools
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Battle-tested tools used by 500+ AEC professionals worldwide
            </p>
          </div>
          
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

      {/* Revit Compatibility */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Revit Compatibility
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Our tools support multiple Revit versions for maximum flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {revitVersions.map((item, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 text-center">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{item.version}</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Industry Solutions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Specialized tools for different AEC disciplines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Architecture</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Design validation, sheet management, code compliance
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">MEP Engineering</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Load calculations, equipment tagging, system validation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Structural</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Model coordination, analysis preparation, detailing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Construction</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Quality control, deliverable checking, project management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Simple, All-Inclusive Pricing
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Get all three professional AEC tools with one simple subscription
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl border-2 border-orange-200 dark:border-orange-700 p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                AEC Specialists
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              AEC Professional
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              Complete AEC toolkit for Architecture, Engineering & Construction
            </p>
            
            <div className="mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-neutral-900 dark:text-white">$79</span>
                <span className="text-xl text-neutral-600 dark:text-neutral-400 ml-1">/month</span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Save $38/month vs buying separately • Annual: $69/month
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">🏗️ ReviPrompt Lab Pro</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">AI prompts & automation</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">⚙️ MEP Power Tools</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">MEP coordination & calculations</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">✅ QC Professional Suite</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Quality control & auditing</p>
              </div>
            </div>
            
            <ul className="text-left space-y-2 mb-8 max-w-md mx-auto">
              <li className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Revit 2024, 2025, 2026 compatible</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Dedicated AEC support</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Regular tool updates</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>14-day free trial</span>
              </li>
            </ul>
            
            <Link 
              href="/pricing?plan=aec-professional" 
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Start AEC Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Transform Your Revit Workflow
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Join 500+ AEC professionals using DevCraft Labs tools to save hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing?plan=aec-professional" className="btn-primary inline-flex items-center space-x-2">
              <span>Start AEC Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?subject=aec" className="btn-secondary inline-flex items-center space-x-2">
              <span>Contact AEC Sales</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="aec-solutions" />
    </div>
  )
}