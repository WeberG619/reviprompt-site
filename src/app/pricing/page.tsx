'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { Check, Star, ArrowRight, Zap, Shield, Users, Headphones, FileText, Sparkles, Rocket, Smartphone, BarChart3, Building2, Settings, CheckCircle } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function UnifiedPricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      price: { monthly: 0, annual: 0 },
      originalPrice: { monthly: 0, annual: 0 },
      popular: false,
      features: [
        '5 AI generations per month',
        '1 user account',
        'Basic templates',
        'Email support',
        'Standard security'
      ],
      tools: ['Proposal Generator', 'Content Generator'],
      cta: 'Start Free',
      ctaLink: '/dashboard?plan=starter'
    },
    {
      name: 'Professional',
      description: 'Best for growing businesses and agencies',
      price: { monthly: 49, annual: 39 },
      originalPrice: { monthly: 49, annual: 49 },
      popular: true,
      features: [
        'Unlimited AI generations',
        'Up to 5 team members',
        'All premium templates',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom branding',
        'Team collaboration'
      ],
      tools: ['All AI Tools', 'Dashboard', 'Team Management'],
      cta: 'Start 14-Day Free Trial',
      ctaLink: '/dashboard?plan=professional'
    },
    {
      name: 'AEC Professional',
      description: 'Complete AEC toolkit for Architecture, Engineering & Construction',
      price: { monthly: 79, annual: 69 },
      originalPrice: { monthly: 117, annual: 117 },
      popular: false,
      badge: 'AEC Specialists',
      features: [
        'All 3 AEC Professional Tools',
        'Revit 2024, 2025, 2026 compatible',
        'MEP coordination & calculations',
        'Quality control & auditing',
        'AI-powered prompts & automation',
        'Sheet setup automation',
        'IBC/ADA compliance tools',
        'Dedicated AEC support',
        'Regular tool updates'
      ],
      tools: ['ReviPrompt Lab Pro', 'MEP Power Tools', 'QC Professional Suite'],
      cta: 'Start AEC Trial',
      ctaLink: '/dashboard?plan=aec-professional',
      specialty: 'aec'
    },
    {
      name: 'Enterprise',
      description: 'Advanced features for large organizations',
      price: { monthly: 149, annual: 119 },
      originalPrice: { monthly: 149, annual: 149 },
      popular: false,
      features: [
        'Everything in Professional & AEC',
        'Unlimited team members',
        'Custom integrations',
        'Dedicated support manager',
        'SLA guarantee',
        'Advanced security',
        'Custom training',
        'On-premise deployment'
      ],
      tools: ['All Features', 'Custom Development', 'Priority Support'],
      cta: 'Contact Sales',
      ctaLink: '/contact?plan=enterprise'
    }
  ]

  const toolsIncluded = [
    {
      name: 'AI Proposal Generator',
      description: 'Create professional business proposals with AI',
      icon: FileText,
      starter: true,
      professional: true,
      enterprise: true
    },
    {
      name: 'AI Content Generator',
      description: 'Generate blog posts, social media content, and marketing copy',
      icon: Sparkles,
      starter: true,
      professional: true,
      enterprise: true
    },
    {
      name: 'AI Landing Page Builder',
      description: 'Build high-converting landing pages with AI optimization',
      icon: Rocket,
      starter: false,
      professional: true,
      enterprise: true
    },
    {
      name: 'AI Social Scheduler',
      description: 'Schedule and optimize social media posts across platforms',
      icon: Smartphone,
      starter: false,
      professional: true,
      enterprise: true
    },
    {
      name: 'AI Task Manager',
      description: 'Intelligent project management with automated workflows',
      icon: Zap,
      starter: false,
      professional: true,
      enterprise: true
    },
    {
      name: 'Unified Dashboard',
      description: 'Central control panel for all your AI tools and projects',
      icon: BarChart3,
      starter: false,
      professional: true,
      aecProfessional: true,
      enterprise: true
    },
    {
      name: 'ReviPrompt Lab Professional',
      description: 'AI-powered prompts and automation tools for Revit professionals',
      icon: Building2,
      starter: false,
      professional: false,
      aecProfessional: true,
      enterprise: true,
      specialty: 'aec'
    },
    {
      name: 'MEP Power Tools',
      description: 'Advanced MEP coordination and calculation tools for Revit',
      icon: Settings,
      starter: false,
      professional: false,
      aecProfessional: true,
      enterprise: true,
      specialty: 'aec'
    },
    {
      name: 'QC Professional Suite',
      description: 'Quality control and deliverable checking for architectural projects',
      icon: CheckCircle,
      starter: false,
      professional: false,
      aecProfessional: true,
      enterprise: true,
      specialty: 'aec'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      image: '/revitprompt-logo.png',
      quote: 'DevCraft Labs has transformed our content creation process. We\'re producing 3x more content in half the time.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Agency Owner',
      company: 'Creative Agency',
      image: '/revitprompt-logo.png',
      quote: 'The proposal generator alone has saved us 15 hours per week. ROI was immediate.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Consultant',
      company: 'Strategic Solutions',
      image: '/revitprompt-logo.png',
      quote: 'Professional-quality outputs that impress our clients. The AI really understands our industry.',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing.'
    },
    {
      question: 'What\'s included in the free trial?',
      answer: 'The 14-day free trial includes full access to all Professional plan features with no limitations.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and never store your generated content permanently.'
    },
    {
      question: 'Can I use the API?',
      answer: 'API access is included with Professional and Enterprise plans. We provide comprehensive documentation and SDKs.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Unified Navigation */}
      <UnifiedNavigation />
      
      {/* Hero Section */}
      <section className="pt-16 pb-12 bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-100 dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-900 section-pattern relative overflow-hidden">
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/10 dark:bg-purple-400/5 rounded-full blur-2xl animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, <span className="text-gradient-blue">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your team. All plans include our complete suite of AI tools, 
            with no hidden fees or surprise charges.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                billingPeriod === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-2 group ${
                  plan.popular
                    ? 'border-blue-500 shadow-xl hover:shadow-2xl bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20'
                    : plan.specialty === 'aec'
                    ? 'border-orange-500 shadow-lg hover:shadow-xl bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-lg hover:shadow-xl'
                } bg-white dark:bg-gray-800 backdrop-blur-sm`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {plan.badge && !plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        ${plan.price[billingPeriod]}
                      </span>
                      {plan.price[billingPeriod] > 0 && (
                        <span className="text-xl text-gray-600 dark:text-gray-400 ml-1">
                          /{billingPeriod === 'annual' ? 'month' : 'month'}
                        </span>
                      )}
                    </div>
                    {billingPeriod === 'annual' && plan.originalPrice.annual > plan.price.annual && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Save ${(plan.originalPrice.annual - plan.price.annual) * 12}/year
                      </p>
                    )}
                    {billingPeriod === 'annual' && plan.price.annual > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Billed annually (${plan.price.annual * 12}/year)
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/checkout?plan=${plan.name.toLowerCase().replace(' ', '-')}&billing=${billingPeriod}`}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group/btn ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                        : plan.specialty === 'aec'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    AI Tools included:
                  </h4>
                  <div className="space-y-2">
                    {plan.tools.map((tool) => (
                      <div key={tool} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      Features
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                      Starter
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white relative">
                      <div className="flex flex-col items-center">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                          Popular
                        </span>
                        <span>Professional</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white relative">
                      <div className="flex flex-col items-center">
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                          AEC Specialists
                        </span>
                        <span>AEC Professional</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {toolsIncluded.map((tool) => (
                    <tr key={tool.name}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                            <tool.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {tool.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {tool.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {tool.starter ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {tool.professional ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {tool.aecProfessional ? (
                          <Check className="w-5 h-5 text-orange-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {tool.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gradient-to-r from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover-lift group">
              <Shield className="w-12 h-12 text-blue-600 mb-4 icon-interactive" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                SOC 2 compliance and bank-level encryption
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover-lift group">
              <Headphones className="w-12 h-12 text-blue-600 mb-4 icon-interactive" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Always available when you need help
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover-lift group">
              <Zap className="w-12 h-12 text-blue-600 mb-4 icon-interactive" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                99.9% Uptime
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reliable service you can count on
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover-lift group">
              <Users className="w-12 h-12 text-blue-600 mb-4 icon-interactive" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                5,000+ Users
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Trusted by businesses worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 dark:from-gray-800 dark:via-blue-900/10 dark:to-gray-800 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by <span className="text-gradient-blue">thousands</span> of businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card-enhanced hover-glow p-6 group">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current transition-transform group-hover:scale-110" style={{transitionDelay: `${i * 50}ms`}} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4 ring-2 ring-blue-100 dark:ring-blue-800 group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your business with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using DevCraft Labs to automate their workflows
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout?plan=professional&billing=monthly"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}