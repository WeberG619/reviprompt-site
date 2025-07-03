import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles, CheckCircle, Star } from 'lucide-react'

export default function HomePage() {
  const products = [
    {
      name: "AI Invoice Generator",
      description: "Get paid faster with smart invoicing and automated reminders",
      status: "live",
      icon: "🧾",
      features: ["Automated reminders", "AI-powered descriptions", "7-day free trial"],
      link: "https://ai-portfolio-saas-xxx.vercel.app", // Update with your actual URL
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
    },
    {
      name: "AI Analytics Dashboard", 
      description: "See what's working with intelligent business insights",
      status: "coming-soon",
      icon: "📊",
      features: ["Predictive analytics", "Custom reports", "Real-time data"],
      link: "#",
      cta: "Join Waitlist"
    },
    {
      name: "AI Business Optimizer",
      description: "Optimize operations with AI-powered recommendations", 
      status: "coming-soon",
      icon: "🔧",
      features: ["Process automation", "Cost optimization", "Growth insights"],
      link: "#", 
      cta: "Join Waitlist"
    }
  ]

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DevCraft Labs</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#products" className="text-gray-600 hover:text-gray-900">Products</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link 
                href="https://ai-portfolio-saas-xxx.vercel.app/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Tools That Actually 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Work</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop doing busy work. Start growing your business with AI tools that handle the tedious stuff while you focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="https://ai-portfolio-saas-xxx.vercel.app"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 border border-blue-200">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
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
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg">Trusted by 500+ businesses to automate their workflows</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10hrs</div>
              <div className="text-gray-600">Saved per week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">3x</div>
              <div className="text-gray-600">Faster invoicing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
              <div className="text-gray-600">Revenue increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Customer satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete AI Business Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate your business operations with cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{product.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    {product.status === 'live' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✨ Live Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        🚀 Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={product.link}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    product.status === 'live'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses using DevCraft AI tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses already saving time and increasing revenue with DevCraft AI tools.
          </p>
          <Link
            href="https://ai-portfolio-saas-xxx.vercel.app"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-flex items-center space-x-2"
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
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">AI Invoice Generator</Link></li>
                <li><Link href="#" className="hover:text-white">AI Social Media Manager</Link></li>
                <li><Link href="#" className="hover:text-white">AI Content Creator</Link></li>
                <li><Link href="#" className="hover:text-white">AI Customer Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">API Docs</Link></li>
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