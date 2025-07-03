'use client'
import Link from 'next/link'
import { HelpCircle, Book, MessageCircle, Mail, Phone, Search, Moon, Sun, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SupportPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first AI invoice?",
          answer: "Sign up for an account, navigate to the Invoice Generator, fill in your client details, and let our AI enhance the description. Your professional invoice will be ready in seconds."
        },
        {
          question: "What's included in the free trial?",
          answer: "The 7-day free trial includes full access to Pro features: unlimited invoices, automated reminders, AI descriptions, and priority support."
        },
        {
          question: "How do I integrate with my existing tools?",
          answer: "DevCraft Labs offers APIs and webhooks for seamless integration with popular accounting software, CRMs, and project management tools."
        }
      ]
    },
    {
      category: "Billing & Subscriptions",
      questions: [
        {
          question: "Can I change my subscription plan?",
          answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and billing is prorated."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be canceled at any time without penalties."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and ACH transfers for Enterprise customers. All payments are processed securely through Stripe."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What are your API rate limits?",
          answer: "Free accounts have 100 requests/hour, Pro accounts have 1,000 requests/hour, and Enterprise accounts have 10,000 requests/hour with burst capacity."
        },
        {
          question: "How do I troubleshoot integration issues?",
          answer: "Check our API documentation first, then contact support with your API logs. Our technical team typically responds within 2 hours for integration issues."
        },
        {
          question: "Is there an API for all your AI tools?",
          answer: "Yes, all our AI tools offer comprehensive REST APIs with detailed documentation, SDKs for popular languages, and webhook support."
        }
      ]
    }
  ]

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM EST",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "Start Chat",
      urgent: true
    },
    {
      title: "Email Support",
      description: "Detailed technical assistance",
      availability: "Response within 4 hours",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      email: "support@devcraft-labs.com"
    },
    {
      title: "Phone Support",
      description: "Direct line for Enterprise customers",
      availability: "24/7 for critical issues",
      icon: <Phone className="w-6 h-6" />,
      action: "Call Now",
      phone: "+1 (555) 123-4567"
    }
  ]

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 40 40" className="text-white">
                  <path d="M8 6h8c8.284 0 15 6.716 15 15s-6.716 15-15 15H8V6z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Help Center</div>
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
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Get answers to your questions, troubleshoot issues, or connect with our support team.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Get Support
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Choose the best way to get help based on your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400">{channel.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 text-center">
                  {channel.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-center mb-3">
                  {channel.description}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-6">
                  {channel.availability}
                </p>
                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  channel.urgent
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'btn-primary'
                }`}>
                  {channel.action}
                </button>
                {channel.email && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-2">
                    {channel.email}
                  </p>
                )}
                {channel.phone && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-2">
                    {channel.phone}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Popular Resources
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Quick access to the most helpful resources and guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/docs" className="group bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all">
              <Book className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                API Documentation
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Complete API reference and integration guides
              </p>
            </Link>

            <div className="group bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all cursor-pointer">
              <HelpCircle className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400">
                Video Tutorials
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Step-by-step video guides for all features
              </p>
            </div>

            <div className="group bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all cursor-pointer">
              <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Community Forum
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Connect with other users and share tips
              </p>
            </div>

            <div className="group bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all cursor-pointer">
              <Book className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                Best Practices
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Learn optimization tips and workflows
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Find answers to the most common questions about DevCraft Labs.
            </p>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400">
                No FAQs found matching your search. Try a different search term or <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">contact support</Link>.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center">
                          <ChevronRight className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                          {faq.question}
                        </h4>
                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed pl-6">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Still need help?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Our support team is here to help you succeed with DevCraft Labs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
            <button className="btn-secondary inline-flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}