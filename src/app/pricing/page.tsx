'use client'
import Link from 'next/link'
import { Check, Briefcase, Code2, Building2, Moon, Sun, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PricingPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState('ai-business')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const categories = [
    { id: 'ai-business', name: 'AI Business Tools', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'developer', name: 'Developer Platform', icon: <Code2 className="w-5 h-5" /> },
    { id: 'aec', name: 'AEC Solutions', icon: <Building2 className="w-5 h-5" /> },
  ]

  const pricingData = {
    'ai-business': {
      title: "AI Business Tools",
      description: "Enterprise-grade automation for modern businesses",
      plans: [
        {
          name: "Starter",
          price: 0,
          period: "forever",
          description: "Perfect for trying out our AI business tools",
          features: [
            "3 AI-generated invoices per month",
            "Basic email support", 
            "Standard templates",
            "7-day free trial of Pro features"
          ],
          cta: "Get Started Free",
          href: "https://ai-portfolio-saas.vercel.app/auth/signup",
          popular: false
        },
        {
          name: "Professional",
          price: 29,
          period: "month",
          description: "Everything you need to run your business",
          features: [
            "Unlimited AI-generated invoices",
            "Automated payment reminders", 
            "AI email generator access",
            "Custom branding",
            "Priority email support",
            "Advanced analytics",
            "Payment tracking",
            "Client portal access"
          ],
          cta: "Start Free Trial",
          href: "https://ai-portfolio-saas.vercel.app/auth/signup",
          popular: true
        },
        {
          name: "Enterprise",
          price: 99,
          period: "month",
          description: "Advanced features for growing teams",
          features: [
            "Everything in Professional",
            "AI CRM Assistant access",
            "Team collaboration tools",
            "Advanced integrations",
            "Dedicated account manager",
            "Phone support",
            "Custom AI training",
            "White-label options"
          ],
          cta: "Contact Sales",
          href: "/contact",
          popular: false
        }
      ]
    },
    'developer': {
      title: "Developer Platform",
      description: "Professional tools for modern development workflows",
      plans: [
        {
          name: "Free",
          price: 0,
          period: "forever",
          description: "For individual developers getting started",
          features: [
            "Basic API access",
            "Community support",
            "Standard documentation",
            "5 projects limit"
          ],
          cta: "Get Started",
          href: "/contact",
          popular: false
        },
        {
          name: "Pro Developer",
          price: 49,
          period: "month",
          description: "For professional developers",
          features: [
            "AI Landing Page Builder",
            "AI Task Manager",
            "AI Social Scheduler",
            "Priority API access",
            "Advanced documentation",
            "Email support",
            "Unlimited projects"
          ],
          cta: "Request Access",
          href: "/contact",
          popular: true
        },
        {
          name: "Team",
          price: 149,
          period: "month",
          description: "For development teams",
          features: [
            "Everything in Pro Developer",
            "Team collaboration features",
            "Advanced integrations",
            "Custom deployment options",
            "Dedicated support",
            "SLA guarantees",
            "Custom training"
          ],
          cta: "Contact Sales",
          href: "/contact",
          popular: false
        }
      ]
    },
    'aec': {
      title: "AEC Solutions",
      description: "Professional tools for Architecture, Engineering & Construction",
      plans: [
        {
          name: "Sheet Setup Starter",
          price: 29,
          period: "one-time",
          description: "Essential Revit automation for beginners",
          features: [
            "Basic sheet setup automation",
            "Standard templates",
            "Email support",
            "Revit 2024-2026 support"
          ],
          cta: "Buy Now",
          href: "https://buy.stripe.com/cNieVc3ay9myeCn8q6efC01",
          popular: false
        },
        {
          name: "Professional Pack",
          price: 149,
          period: "one-time",
          description: "Complete AEC workflow automation",
          features: [
            "MEP Power Tools ($39 value)",
            "QC Professional Suite ($39 value)",
            "ReviPrompt AI Pack",
            "Advanced automation tools",
            "Priority support",
            "Comprehensive documentation",
            "Video tutorials"
          ],
          cta: "Buy Now",
          href: "https://revipromptlab.com",
          popular: true
        },
        {
          name: "Enterprise Pack",
          price: 299,
          period: "one-time",
          description: "Advanced tools for large teams",
          features: [
            "Everything in Professional",
            "Custom Revit add-ins",
            "Team deployment tools",
            "Advanced reporting",
            "Custom training sessions",
            "Dedicated support",
            "Custom integrations"
          ],
          cta: "Buy Now",
          href: "https://buy.stripe.com/5kQ6oG4eCeGS65R5dUefC07",
          popular: false
        }
      ]
    }
  }

  const currentPlans = pricingData[activeCategory as keyof typeof pricingData]

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
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Pricing</div>
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center space-x-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all text-sm
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
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              {currentPlans.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {currentPlans.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentPlans.plans.map((plan: any, index: number) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-neutral-800 rounded-xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-blue-600 shadow-xl' 
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                Can I switch between plans?
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.
              </p>
            </div>
            
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                We offer a 30-day money-back guarantee for all subscription plans. AEC one-time purchases have a 14-day refund policy.
              </p>
            </div>
            
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                We accept all major credit cards, PayPal, and ACH transfers for Enterprise customers. All payments are processed securely through Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Join thousands of professionals using DevCraft Labs to automate their workflows.
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