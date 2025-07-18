'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Briefcase, CheckCircle, ExternalLink } from 'lucide-react'


export default function AIBusinessPage() {

  const products = [
    {
      name: "AI Invoice Generator",
      description: "Intelligent invoicing with automated payment tracking and smart reminders",
      status: "live",
      features: ["Automated payment reminders", "AI-powered descriptions", "Real-time analytics", "API integration"],
      link: "https://ai-portfolio-saas.vercel.app",
      cta: "Generate Invoice",
      metrics: { users: "2.1k+", accuracy: "99.7%", time_saved: "15hrs/week" }
    },
    {
      name: "AI Email Generator",
      description: "Professional email content generation for marketing and business communications",
      status: "live",
      features: ["Template library", "Tone customization", "A/B testing", "Analytics integration"],
      link: "/email-generator",
      cta: "Generate Emails",
      metrics: { open_rate: "+40%", engagement: "95%", templates: "100+" }
    },
    {
      name: "AI Proposal Generator",
      description: "Professional proposal creation with automated customization and templates",
      status: "live",
      features: ["Template library", "Client customization", "Automated pricing", "Document export"],
      link: "/proposals",
      cta: "Create Proposal",
      metrics: { win_rate: "+50%", time_saved: "75%", templates: "25+" }
    },
    {
      name: "AI Content Generator",
      description: "Multi-purpose content creation for marketing, blogs, and social media",
      status: "live",
      features: ["Blog writing", "Social posts", "Marketing copy", "SEO optimization"],
      link: "/content",
      cta: "Generate Content",
      metrics: { quality: "95%", speed: "10x faster", formats: "20+" }
    },
    {
      name: "AI CRM Assistant",
      description: "Intelligent customer relationship management with automated insights",
      status: "live",
      features: ["Lead scoring", "Automated follow-ups", "Performance analytics", "Integration APIs"],
      link: "/dashboard",
      cta: "Launch CRM",
      metrics: { conversion: "+35%", efficiency: "3x faster", insights: "real-time" }
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
                src="/revitprompt-logo.png"
                alt="DevCraft Labs Logo"
                width={54}
                height={32}
              />
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">AI Business Tools</div>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            AI Business Tools
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Enterprise-grade automation for modern businesses. Streamline your workflows with intelligent AI tools designed for professional use.
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

      {/* CTA Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Join thousands of businesses using DevCraft Labs AI tools to streamline operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://ai-portfolio-saas.vercel.app" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}