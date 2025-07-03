'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Moon, Sun, Code2, Building2, Briefcase, Terminal, CheckCircle, Star, Github, ExternalLink, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const productCategories = [
    {
      id: 'ai-business',
      title: "AI Business Tools",
      description: "Enterprise-grade automation for modern businesses",
      icon: <Briefcase className="w-6 h-6" />,
      products: [
        {
          name: "AI Invoice Generator",
          description: "Intelligent invoicing with automated payment tracking and smart reminders",
          status: "live",
          features: ["Automated payment reminders", "AI-powered descriptions", "Real-time analytics", "API integration"],
          link: "https://ai-portfolio-saas.vercel.app",
          cta: "Launch App",
          metrics: { users: "2.1k+", accuracy: "99.7%", time_saved: "15hrs/week" }
        },
        {
          name: "AI Email Generator",
          description: "Professional email content generation for marketing and business communications",
          status: "coming-soon",
          features: ["Template library", "Tone customization", "A/B testing", "Analytics integration"],
          link: "#",
          cta: "Join Waitlist",
          metrics: { open_rate: "+40%", engagement: "95%", templates: "100+" }
        },
        {
          name: "AI CRM Assistant",
          description: "Intelligent customer relationship management with automated insights",
          status: "coming-soon",
          features: ["Lead scoring", "Automated follow-ups", "Performance analytics", "Integration APIs"],
          link: "#",
          cta: "Join Waitlist",
          metrics: { conversion: "+35%", efficiency: "3x faster", insights: "real-time" }
        }
      ]
    },
    {
      id: 'developer',
      title: "Developer Platform",
      description: "Professional tools for modern development workflows",
      icon: <Code2 className="w-6 h-6" />,
      products: [
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
    },
    {
      id: 'aec',
      title: "AEC Solutions",
      description: "Professional tools for Architecture, Engineering & Construction",
      icon: <Building2 className="w-6 h-6" />,
      products: [
        {
          name: "ReviPrompt Lab Professional",
          description: "AI prompts and automation tools for Revit professionals - trusted by 500+ users",
          status: "live",
          features: ["AI-powered prompts", "Sheet setup automation", "MEP coordination tools", "IBC/ADA compliance"],
          link: "https://revipromptlab.com",
          cta: "View Products",
          metrics: { users: "500+", time_saved: "60%", packs: "6 available" }
        },
        {
          name: "MEP Power Tools",
          description: "Advanced MEP coordination and calculation tools for Revit",
          status: "live",
          features: ["Load calculations", "Equipment tagging", "System validation", "Model auditing"],
          link: "https://buy.stripe.com/aFaeVc5iG6amgKveOuefC02",
          cta: "Buy Now - $39",
          metrics: { efficiency: "+45%", accuracy: "99%", tools: "5 included" }
        },
        {
          name: "QC Professional Suite",
          description: "Quality control and deliverable checking for architectural projects",
          status: "live",
          features: ["Deliverable checker", "Element counter", "Model auditor", "Report generation"],
          link: "https://buy.stripe.com/bJe9ASeTg6am9i3eOuefC03",
          cta: "Buy Now - $39",
          metrics: { errors_found: "95%", time_saved: "40%", reports: "automated" }
        }
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Solutions', icon: <Terminal className="w-5 h-5" /> },
    { id: 'ai-business', name: 'Business AI', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'developer', name: 'Developer', icon: <Code2 className="w-5 h-5" /> },
    { id: 'aec', name: 'AEC', icon: <Building2 className="w-5 h-5" /> },
  ]

  const filteredProducts = activeCategory === 'all' 
    ? productCategories 
    : productCategories.filter(cat => cat.id === activeCategory)

  const testimonials = [
    {
      text: "DevCraft's AI Invoice Generator transformed our billing process. The automation and insights are game-changing for our agency.",
      author: "Sarah Chen",
      title: "CTO, Design Forward",
      company: "Design Agency",
      rating: 5
    },
    {
      text: "Professional-grade tools with enterprise reliability. The developer experience is exceptional and the results speak for themselves.",
      author: "Marcus Rodriguez",
      title: "Lead Engineer",
      company: "TechFlow Inc",
      rating: 5
    },
    {
      text: "Finally, AI tools built by developers who understand real workflow challenges. The attention to detail is remarkable.",
      author: "Emma Thompson",
      title: "Solutions Architect",
      company: "BuildTech Pro",
      rating: 5
    }
  ]

  const stats = [
    { value: "99.9%", label: "Uptime SLA", desc: "Enterprise reliability" },
    { value: "10x", label: "Faster", desc: "Than manual processes" },
    { value: "2.1k+", label: "Active Users", desc: "Trusted by professionals" },
    { value: "50+", label: "Integrations", desc: "Seamless connectivity" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Professional Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 40 40" className="text-white">
                  <path d="M8 6h8c8.284 0 15 6.716 15 15s-6.716 15-15 15H8V6z" fill="currentColor"/>
                  <circle cx="20" cy="20" r="3" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Professional AI Tools</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#solutions" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                Solutions
              </Link>
              <Link href="/pricing" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                Pricing
              </Link>
              <Link href="/about" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/docs" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                Docs
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link 
                href="https://ai-portfolio-saas.vercel.app/auth/login"
                className="btn-primary text-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Filter */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm
                  ${activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }
                `}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <Zap className="w-4 h-4 mr-2" />
                Professional AI Tools
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              Enterprise AI Solutions
              <span className="text-blue-600"> Built by Developers</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed max-w-3xl">
              Professional-grade AI tools designed for businesses, developers, and AEC professionals. 
              Built with enterprise security, reliability, and developer experience in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="https://ai-portfolio-saas.vercel.app"
                className="btn-primary inline-flex items-center space-x-2 text-base"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#solutions"
                className="btn-secondary inline-flex items-center space-x-2 text-base"
              >
                <Terminal className="w-4 h-4" />
                <span>View Solutions</span>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center space-x-6 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{stat.label}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Professional AI Solutions
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Enterprise-grade tools built for modern workflows. Each solution is designed with security, 
              scalability, and developer experience as core principles.
            </p>
          </div>
          
          {filteredProducts.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="flex items-center space-x-4 mb-12">
                <div className="flex items-center space-x-3 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  {category.icon}
                  <span className="text-lg font-semibold">{category.title}</span>
                </div>
                <div className="text-neutral-600 dark:text-neutral-400">{category.description}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, index) => (
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
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Used by leading companies and independent professionals worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.title}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 dark:bg-neutral-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build with Professional AI?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Join thousands of professionals using DevCraft Labs to automate workflows and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://ai-portfolio-saas.vercel.app"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-all inline-flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-lg transition-all inline-flex items-center space-x-2"
            >
              <span>View Pricing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 40 40" className="text-white">
                    <path d="M8 6h8c8.284 0 15 6.716 15 15s-6.716 15-15 15H8V6z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Professional AI tools built by developers, for developers and businesses.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                  <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Solutions</h3>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <li><Link href="/solutions/ai-business" className="hover:text-neutral-900 dark:hover:text-white transition-colors">AI Business Tools</Link></li>
                <li><Link href="/solutions/developer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Developer Platform</Link></li>
                <li><Link href="/solutions/aec" className="hover:text-neutral-900 dark:hover:text-white transition-colors">AEC Solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <li><Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link></li>
                <li><Link href="/pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <li><Link href="/docs" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/docs" className="hover:text-neutral-900 dark:hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="/support" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
            <p>&copy; 2024 DevCraft Labs. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}