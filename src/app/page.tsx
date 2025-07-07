'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Moon, Sun, Code2, Building2, Briefcase, Terminal, CheckCircle, Star, Github, ExternalLink, Zap, MessageCircle, X, Send, Bot } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import { LiveUserCounter, SecurityBadges, UrgencyBanner } from '@/components/TrustSignals'

// Disable static generation for this page since it uses client-side state
export const dynamic = 'force-dynamic'

interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: Date
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setChatMessages([{
      text: "Hi! I'm your RevitPrompt Lab assistant. I can help you with AEC tools, Revit automation, prompts, plugins, and construction management. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }])
  }, [])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('api') || lowerMessage.includes('documentation') || lowerMessage.includes('docs')) {
      return "Our API documentation is comprehensive and includes real examples from our AI Invoice Generator, Email Content API, Landing Page Builder, and more. You can access it at /docs with authentication examples, rate limits, and webhooks. Need an API key? I can guide you through the setup process!"
    }
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "We offer AEC-focused pricing: Revit Professional ($79/mo), Construction Team ($149/mo), and Enterprise ($299/mo). All plans include Revit plugins, prompt libraries, project management tools, and 24/7 AEC support. Check out /pricing for detailed comparisons!"
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('email generator')) {
      return "Our AI Email Generator is live with OpenAI integration! It creates professional emails with smart personalization, multiple templates, and real-time API validation. Features include 8 email types, 10 tone options, and 97% accuracy. Try it at /email-generator with full API documentation!"
    }
    
    if (lowerMessage.includes('invoice') || lowerMessage.includes('billing')) {
      return "Our AI Invoice Generator is live and trusted by 2.1k+ users! It features automated payment tracking, smart reminders, AI-powered descriptions, and real-time analytics. You can try it free at ai-portfolio-saas.vercel.app with 99.7% accuracy and saves 15hrs/week on average."
    }
    
    if (lowerMessage.includes('revit') || lowerMessage.includes('aec') || lowerMessage.includes('architecture')) {
      return "ReviPrompt Lab Professional is our AEC solution trusted by 500+ users. It includes AI-powered prompts, sheet setup automation, MEP coordination tools, and IBC/ADA compliance features. Available with live Stripe payment at revipromptlab.com with 6 professional prompt packs!"
    }
    
    if (lowerMessage.includes('developer') || lowerMessage.includes('landing page') || lowerMessage.includes('task manager')) {
      return "Our Developer Platform is LIVE! AI Landing Page Builder (60% conversion boost), AI Task Manager (45% productivity increase), and AI Social Scheduler (35% engagement growth) are all ready to use. Try them at /landing-builder, /task-manager, and /social-scheduler - all included in our $49/mo Professional plan!"
    }
    
    if (lowerMessage.includes('security') || lowerMessage.includes('enterprise')) {
      return "We provide enterprise-grade security with 99.9% uptime SLA, 24/7 support, API key authentication, webhook signature verification, and SOC 2 compliance. All data is encrypted in transit and at rest. Check /security for our complete security documentation."
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return "We offer multiple support channels: 24/7 chat support, email at support@devcraft-labs.com, comprehensive documentation at /docs, and enterprise support for pro plans. You can also visit /contact for direct access to our team or schedule a demo call!"
    }
    
    if (lowerMessage.includes('start') || lowerMessage.includes('get started') || lowerMessage.includes('trial')) {
      return "Getting started is easy! For AI Business Tools, try our Invoice Generator free at ai-portfolio-saas.vercel.app. For API access, check /docs for authentication. For AEC tools, visit revipromptlab.com. Want a personalized demo? I can help you schedule one!"
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to RevitPrompt Lab! We're AEC professionals building AI tools for Architecture, Engineering & Construction. Our tools include Revit automation, prompt libraries, project management, and construction workflows. What interests you most?"
    }
    
    return "I can help you with information about our AI tools, pricing, API documentation, security, support, or getting started. Try asking about our Invoice Generator, ReviPrompt Lab, pricing plans, API docs, or how to start a free trial. What would you like to know more about?"
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMessage = { text: chatInput, isUser: true, timestamp: new Date() }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)
    
    setTimeout(() => {
      const aiResponse = getAIResponse(chatInput)
      const aiMessage = { text: aiResponse, isUser: false, timestamp: new Date() }
      setChatMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const productCategories = [
    {
      id: 'aec-tools',
      title: "AEC Professional Tools",
      description: "Professional AI tools for Architecture, Engineering & Construction",
      icon: <Building2 className="w-6 h-6" />,
      products: [
        {
          name: "Revit Prompt Library",
          description: "Professional prompt collection for Revit automation and BIM workflows",
          status: "live",
          features: ["500+ professional prompts", "AEC-specific templates", "Revit 2024-2026 compatible", "Regular updates"],
          link: "/revit-prompts",
          cta: "Browse Prompts",
          metrics: { prompts: "500+", accuracy: "95%", time_saved: "25hrs/week" }
        },
        {
          name: "Revit Plugin Suite",
          description: "Essential plugins for enhanced Revit productivity and automation",
          status: "live",
          features: ["MEP coordination tools", "Sheet management", "Family automation", "Quality control"],
          link: "/revit-plugins",
          cta: "Download Plugins",
          metrics: { plugins: "12+", productivity: "+40%", compatibility: "3 versions" }
        },
        {
          name: "Project Manager Pro",
          description: "Construction project management with BIM integration and team collaboration",
          status: "live",
          features: ["BIM integration", "Schedule tracking", "Team collaboration", "Progress reports"],
          link: "/project-manager",
          cta: "Manage Projects",
          metrics: { efficiency: "+45%", teams: "500+", integration: "Revit/BIM" }
        },
        {
          name: "AEC Content Generator",
          description: "Generate AEC-specific documentation, specifications, and project content",
          status: "live",
          features: ["Spec generation", "Drawing notes", "RFI responses", "Code compliance"],
          link: "/aec-content",
          cta: "Generate Content",
          metrics: { accuracy: "98%", time_saved: "20hrs/week", templates: "50+" }
        }
      ]
    },
    {
      id: 'business-tools',
      title: "Business Support Tools",
      description: "Essential business tools for AEC firms and contractors",
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
          name: "AI Proposal Generator",
          description: "Professional business proposals with detailed sections and smart recommendations",
          status: "live",
          features: ["Executive summaries", "Timeline planning", "Budget estimates", "Industry templates"],
          link: "/proposals",
          cta: "Generate Proposal",
          metrics: { accuracy: "95%", time_saved: "80%", templates: "25+" }
        },
        {
          name: "AI Email Generator",
          description: "Professional email generation with personalized content, templates, and OpenAI integration",
          status: "live",
          features: ["Smart personalization", "Professional templates", "OpenAI API integration", "Real-time validation"],
          link: "/email-generator",
          cta: "Generate Email",
          metrics: { accuracy: "97%", time_saved: "12hrs/week", templates: "8+" }
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
          status: "live",
          features: ["Template library", "A/B testing", "Analytics integration", "Mobile responsive"],
          link: "/landing-builder",
          cta: "Build Landing Page",
          metrics: { conversion: "+60%", load_time: "<2s", templates: "50+" }
        },
        {
          name: "AI Social Scheduler",
          description: "Content planning and social media automation platform",
          status: "live",
          features: ["Multi-platform posting", "Content optimization", "Analytics dashboard", "Team management"],
          link: "/social-scheduler",
          cta: "Schedule Posts",
          metrics: { engagement: "+35%", reach: "2x more", platforms: "12+" }
        },
        {
          name: "AI Task Manager",
          description: "Intelligent project management with automated workflow optimization",
          status: "live",
          features: ["Smart scheduling", "Team collaboration", "Progress tracking", "Resource allocation"],
          link: "/task-manager",
          cta: "Manage Tasks",
          metrics: { productivity: "+45%", efficiency: "3x faster", automation: "80%" }
        }
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Solutions', icon: <Terminal className="w-5 h-5" /> },
    { id: 'aec-tools', name: 'AEC Tools', icon: <Building2 className="w-5 h-5" /> },
    { id: 'business-tools', name: 'Business', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'developer', name: 'Developer', icon: <Code2 className="w-5 h-5" /> },
  ]

  const filteredProducts = activeCategory === 'all' 
    ? productCategories 
    : productCategories.filter(cat => cat.id === activeCategory)

  const testimonials = [
    {
      text: "RevitPrompt Lab's prompt library transformed our design process. The AEC-specific prompts save us 25+ hours per week and improve our deliverables.",
      author: "Michael Torres",
      title: "Senior Architect",
      company: "Torres Design Group",
      rating: 5
    },
    {
      text: "The Revit plugins are game-changers for our MEP coordination. Finally, tools built by AEC professionals who understand our workflows.",
      author: "Jennifer Kim",
      title: "MEP Engineer",
      company: "BuildTech Engineering",
      rating: 5
    },
    {
      text: "Professional-grade AEC tools with incredible attention to detail. Our project delivery time improved by 40% using their suite.",
      author: "David Rodriguez",
      title: "Project Manager",
      company: "Construction Pro LLC",
      rating: 5
    }
  ]

  const stats = [
    { value: "500+", label: "AEC Prompts", desc: "Professional library" },
    { value: "12+", label: "Revit Plugins", desc: "Essential tools" },
    { value: "3.2k+", label: "AEC Users", desc: "Trusted professionals" },
    { value: "25hrs", label: "Saved/Week", desc: "Average time savings" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Unified Navigation */}
      <UnifiedNavigation />

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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 dark:opacity-60 hero-image-fade"
          style={{
            backgroundImage: "url('/developer-hero.jpg')"
          }}
        ></div>
        
        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white/70 to-blue-100/60 dark:from-neutral-900/80 dark:via-neutral-900/85 dark:to-blue-900/80"></div>
        
        {/* Additional gradient layer for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/20 to-purple-50/20 dark:from-transparent dark:via-blue-900/20 dark:to-purple-900/20"></div>
        
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 hero-pattern"></div>
        
        {/* Floating elements for depth */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400/25 rounded-full animate-float-delayed"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-600/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Additional tech-inspired elements */}
        <div className="absolute top-16 right-1/4 w-8 h-8 border border-blue-300/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 right-16 w-6 h-6 border border-blue-400/15 rotate-45 animate-float" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <Building2 className="w-4 h-4 mr-2" />
                AEC Professional Suite
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              AEC AI Tools & Prompts
              <span className="text-blue-600"> Built by Professionals</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed max-w-3xl">
              Professional AI tools, prompts, and plugins designed specifically for Architecture, Engineering & Construction professionals. 
              Built with Revit expertise, construction workflows, and AEC industry needs in mind.
            </p>
            
            {/* Code snippet preview */}
            <div className="hidden md:block mb-8 p-4 bg-neutral-100/50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 max-w-md">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono ml-2">revitpromptlab.com</span>
              </div>
              <code className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">
                <span className="text-blue-600 dark:text-blue-400">curl</span> -X POST revitpromptlab.com/api/v1<br/>
                <span className="text-neutral-500 dark:text-neutral-400"># Generate AEC prompts instantly</span>
              </code>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/checkout?plan=professional&billing=monthly"
                className="btn-primary inline-flex items-center space-x-2 text-base group"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#solutions"
                className="btn-secondary inline-flex items-center space-x-2 text-base group"
              >
                <Terminal className="w-4 h-4 transition-transform group-hover:scale-110" />
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
      <section className="py-16 bg-gradient-to-r from-neutral-50 via-blue-50/30 to-neutral-50 dark:from-neutral-800/50 dark:via-blue-900/10 dark:to-neutral-800/50 section-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/60 dark:bg-neutral-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-neutral-700/50 hover-lift-sm">
                <div className="text-3xl font-bold text-gradient-blue mb-2">{stat.value}</div>
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
                    className="group card-enhanced hover-glow p-8"
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
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-neutral-700/50 dark:to-blue-900/20 rounded-lg border border-blue-100/50 dark:border-blue-800/20">
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
      <section className="py-24 bg-gradient-to-br from-neutral-50 via-blue-50/20 to-neutral-50 dark:from-neutral-800/50 dark:via-blue-900/10 dark:to-neutral-800/50 section-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Trusted by <span className="text-gradient-blue">Professionals</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Used by leading companies and independent professionals worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-enhanced hover-glow p-8 group">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current transition-transform group-hover:scale-110" style={{transitionDelay: `${i * 50}ms`}} />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
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

      {/* Trust Signals Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Trusted by <span className="text-blue-600">2,100+ Professionals</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Join the fastest-growing AI platform for business automation
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Live user counter */}
            <div className="flex justify-center">
              <LiveUserCounter />
            </div>
            
            {/* Security badges */}
            <SecurityBadges />
            
            {/* Urgency banner */}
            <UrgencyBanner />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-animated relative overflow-hidden">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-blue-600/90"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build with <span className="text-blue-200">Professional AI?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals using DevCraft Labs to automate workflows and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout?plan=professional&billing=monthly"
              className="bg-white hover:bg-blue-50 text-blue-600 font-medium px-8 py-4 rounded-lg transition-all hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-2 group transform"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pricing"
              className="bg-blue-700/80 hover:bg-blue-800 text-white font-medium px-8 py-4 rounded-lg border border-blue-500/50 backdrop-blur-sm transition-all hover:shadow-xl hover:-translate-y-1 inline-flex items-center space-x-2 transform"
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
                <Image
                  src="/DCL-logo.png"
                  alt="DevCraft Labs Logo"
                  width={54}
                  height={32}
                />
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
                <li><Link href="/api-explorer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Live API Explorer</Link></li>
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

      {/* Chatbot Widget */}
      {mounted && (
        isChatOpen ? (
          <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col z-50">
            <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">DevCraft Assistant</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                  }`}>
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 dark:bg-neutral-700 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about our AI tools..."
                  className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )
      )}
    </div>
  )
}