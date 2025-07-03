'use client'
import Link from 'next/link'
import { Check, Sparkles, Zap, Crown, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PricingPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  const plans = [
    {
      name: "Starter",
      price: 0,
      period: "forever",
      description: "Perfect for trying out our software solutions",
      features: [
        "3 AI-generated invoices per month",
        "Basic email support", 
        "Standard templates",
        "7-day free trial of Pro features",
        "Access to coming soon tools"
      ],
      cta: "Get Started Free",
      href: "https://ai-portfolio-saas.vercel.app/auth/signup",
      popular: false,
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      name: "Pro",
      price: 29,
      period: "month",
      description: "Everything you need to run your business",
      features: [
        "Unlimited AI-generated invoices",
        "Automated payment reminders", 
        "AI chat assistant",
        "Custom branding",
        "Priority email support",
        "Advanced analytics",
        "Payment tracking",
        "Client portal access",
        "Early access to new tools"
      ],
      cta: "Start Free Trial",
      href: "https://ai-portfolio-saas.vercel.app/auth/signup",
      popular: true,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Enterprise",
      price: 99,
      period: "month",
      description: "For teams and growing businesses across all verticals",
      features: [
        "Everything in Pro",
        "Multi-user access (up to 10 users)",
        "API access for all tools",
        "Custom integrations",
        "Dedicated account manager",
        "Phone support",
        "Advanced reporting",
        "White-label options",
        "Custom AI training",
        "AEC & Developer tools included",
        "Priority feature requests"
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
      icon: <Crown className="w-6 h-6" />
    }
  ]

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect on your next billing cycle."
    },
    {
      question: "What's included in the free trial?",
      answer: "You get full access to all Pro features for 7 days, no credit card required. After the trial, you can choose to continue with a paid plan or use our free tier."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment no questions asked."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees, ever. You only pay the monthly subscription price for your chosen plan."
    },
    {
      question: "Can I integrate with other tools?",
      answer: "Yes! Pro and Enterprise plans include integrations with popular tools like QuickBooks, Stripe, PayPal, and more. API access is available for Enterprise customers."
    },
    {
      question: "How does the AI work?",
      answer: "Our AI uses advanced language models to generate professional invoice descriptions, automate reminders, and provide intelligent business insights. It learns from your patterns to get better over time."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-slow shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevCraft Labs
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                ← Back to Home
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your business. Start free, scale as you grow across AI, development, and AEC solutions.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="w-4 h-4" />
            <span>7-day free trial • No credit card required • Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-xl scale-105' 
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses, developers, and AEC professionals already automating their workflows with DevCraft solutions.
          </p>
          <Link
            href="https://ai-portfolio-saas.vercel.app/auth/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}