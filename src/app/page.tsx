'use client'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles, CheckCircle, Star, Moon, Sun, Code, Building2, Briefcase, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      description: "Automate your business operations with intelligent AI",
      gradient: "from-blue-500 to-cyan-500",
      products: [
        {
          name: "AI Invoice Generator",
          description: "Get paid faster with smart invoicing and automated reminders",
          status: "live",
          icon: "🧾",
          features: ["Automated reminders", "AI-powered descriptions", "7-day free trial"],
          link: "https://ai-portfolio-saas.vercel.app",
          cta: "Start Free Trial"
        },
        {
          name: "AI Social Media Manager",
          description: "Content that converts on autopilot across all platforms",
          status: "coming-soon",
          icon: "🚀",
          features: ["Auto-posting", "Content generation", "Analytics"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "AI Content Creator",
          description: "Blog posts, emails, and copy that converts automatically",
          status: "coming-soon",
          icon: "📝",
          features: ["SEO optimization", "Brand voice", "Multi-format"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "AI Customer Support",
          description: "24/7 support that actually helps your customers",
          status: "coming-soon",
          icon: "💬",
          features: ["Instant responses", "Smart routing", "Learning AI"],
          link: "#",
          cta: "Join Waitlist"
        }
      ]
    },
    {
      id: 'developer',
      title: "Developer Tools",
      description: "Powerful development utilities and automation tools",
      gradient: "from-purple-500 to-pink-500",
      products: [
        {
          name: "Code Generator Suite",
          description: "AI-powered code generation for multiple languages",
          status: "coming-soon",
          icon: "⚡",
          features: ["Multi-language support", "Best practices", "Documentation"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "API Testing Platform",
          description: "Comprehensive API testing and monitoring tools",
          status: "coming-soon",
          icon: "🔧",
          features: ["Automated testing", "Performance monitoring", "Documentation"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "Database Tools",
          description: "Smart database management and optimization utilities",
          status: "coming-soon",
          icon: "🗄️",
          features: ["Query optimization", "Schema management", "Migration tools"],
          link: "#",
          cta: "Join Waitlist"
        }
      ]
    },
    {
      id: 'aec',
      title: "AEC Solutions",
      description: "Professional tools for Architecture, Engineering & Construction",
      gradient: "from-orange-500 to-red-500",
      products: [
        {
          name: "Revit Extensions",
          description: "Powerful automation tools for Revit workflows",
          status: "coming-soon",
          icon: "🏗️",
          features: ["Family management", "Parameter automation", "Report generation"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "AutoCAD Tools",
          description: "Enhanced productivity tools for AutoCAD professionals",
          status: "coming-soon",
          icon: "📐",
          features: ["Drawing automation", "Block libraries", "Dimension tools"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "Rhino Plugins",
          description: "Advanced modeling and analysis tools for Rhino",
          status: "coming-soon",
          icon: "🦏",
          features: ["Parametric modeling", "Analysis tools", "Export utilities"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "SketchUp Extensions",
          description: "Professional extensions for SketchUp workflows",
          status: "coming-soon",
          icon: "📏",
          features: ["Modeling tools", "Rendering utilities", "Export options"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "Civil 3D Tools",
          description: "Advanced civil engineering and infrastructure tools",
          status: "coming-soon",
          icon: "🛣️",
          features: ["Site design", "Grading tools", "Infrastructure planning"],
          link: "#",
          cta: "Join Waitlist"
        },
        {
          name: "BIM 360 Integrations",
          description: "Enhanced collaboration tools for BIM 360 workflows",
          status: "coming-soon",
          icon: "☁️",
          features: ["Cloud sync", "Model coordination", "Issue tracking"],
          link: "#",
          cta: "Join Waitlist"
        }
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Solutions', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'ai-business', name: 'AI Business', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'developer', name: 'Developer', icon: <Code className="w-5 h-5" /> },
    { id: 'aec', name: 'AEC', icon: <Building2 className="w-5 h-5" /> },
  ]

  const filteredProducts = activeCategory === 'all' 
    ? productCategories 
    : productCategories.filter(cat => cat.id === activeCategory)

  const testimonials = [
    {
      text: "DevCraft's AI Invoice Generator saved me 10 hours per week. The automated reminders alone paid for itself.",
      author: "Sarah Chen",
      title: "Freelance Designer", 
      rating: 5
    },
    {
      text: "Finally, AI tools that actually work for small businesses. Simple, powerful, and worth every penny.",
      author: "Mike Rodriguez", 
      title: "Marketing Agency Owner",
      rating: 5
    },
    {
      text: "The AI chat assistant is like having a business expert available 24/7. Game changer for my consulting firm.",
      author: "Emma Thompson",
      title: "Business Consultant", 
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Enhanced Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-slow shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevCraft Labs
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#products" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                About
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link 
                href="https://ai-portfolio-saas.vercel.app/auth/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Category Tabs - Below Navigation */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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

      {/* Hero Section with Grid Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">AI Tools That</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
                Actually Work
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Stop doing busy work. Start growing your business with AI tools that handle the tedious stuff while you focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="https://ai-portfolio-saas.vercel.app"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="glass-effect text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float dark:opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000 dark:opacity-30"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">Trusted by 500+ businesses to automate their workflows</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">10hrs</div>
              <div className="text-gray-600 dark:text-gray-400">Saved per week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">3x</div>
              <div className="text-gray-600 dark:text-gray-400">Faster invoicing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">25%</div>
              <div className="text-gray-600 dark:text-gray-400">Revenue increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Customer satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section with Enhanced Design */}
      <section id="products" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Software Solutions Suite
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From AI business automation to developer tools and AEC solutions - everything you need to work smarter across industries.
            </p>
          </div>
          
          {filteredProducts.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <div className={`inline-flex items-center space-x-3 mb-4 px-6 py-3 rounded-full bg-gradient-to-r ${category.gradient} text-white`}>
                  {category.id === 'ai-business' && <Briefcase className="w-6 h-6" />}
                  {category.id === 'developer' && <Code className="w-6 h-6" />}
                  {category.id === 'aec' && <Building2 className="w-6 h-6" />}
                  <span className="text-xl font-semibold">{category.title}</span>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-white dark:bg-gray-800 m-0.5 rounded-2xl p-6 h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-4xl animate-float">{product.icon}</span>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                          {product.status === 'live' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                              ✨ Live Now
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              🚀 Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                      
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link
                        href={product.link}
                        className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all ${
                          product.status === 'live'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {product.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials with Enhanced Design */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real results from real businesses using DevCraft AI tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses already saving time and increasing revenue with DevCraft AI tools.
          </p>
          <Link
            href="https://ai-portfolio-saas.vercel.app"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 inline-flex items-center space-x-2 transform hover:scale-105 transition-all shadow-xl"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DevCraft Labs</span>
              </div>
              <p className="text-gray-400">
                AI-powered tools that help businesses work smarter, not harder.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">AI Business Tools</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Developer Tools</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">AEC Solutions</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Revit Extensions</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DevCraft Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}