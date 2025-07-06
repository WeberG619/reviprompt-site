'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, TrendingUp, Users, Clock, Award, Star, ChevronRight, Building2, Zap, Target, BarChart3 } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Industries', count: 12 },
    { id: 'saas', name: 'SaaS', count: 4 },
    { id: 'agency', name: 'Agencies', count: 3 },
    { id: 'ecommerce', name: 'E-commerce', count: 2 },
    { id: 'consulting', name: 'Consulting', count: 3 }
  ]

  const caseStudies = [
    {
      id: 'techflow-automation',
      category: 'saas',
      title: 'TechFlow Reduces Proposal Time by 85%',
      subtitle: 'How a B2B SaaS company automated their sales process',
      company: 'TechFlow Solutions',
      industry: 'B2B SaaS',
      size: '50-100 employees',
      logo: '/api/placeholder/120/60',
      heroImage: '/api/placeholder/600/400',
      challenge: 'TechFlow was spending 15+ hours per week creating custom proposals for enterprise clients, causing delays and missed opportunities.',
      solution: 'Implemented DevCraft Labs AI Proposal Generator with custom templates and automated client data integration.',
      results: [
        { metric: '85%', description: 'Reduction in proposal creation time' },
        { metric: '3x', description: 'Increase in proposal volume' },
        { metric: '45%', description: 'Higher win rate on proposals' },
        { metric: '$2.3M', description: 'Additional revenue in first year' }
      ],
      testimonial: {
        quote: "DevCraft Labs transformed our sales process completely. What used to take our team 3 days now takes 2 hours, and the quality is consistently higher. Our close rate has improved dramatically.",
        author: "Sarah Chen",
        role: "VP of Sales",
        avatar: '/api/placeholder/64/64'
      },
      implementation: {
        timeline: '2 weeks',
        setup: 'Minimal technical setup required',
        training: '1 day team training session',
        roi: '400% ROI in first quarter'
      },
      tools: ['AI Proposal Generator', 'Task Manager', 'Dashboard'],
      featured: true
    },
    {
      id: 'creative-collective',
      category: 'agency',
      title: 'Creative Collective Scales Content Production 5x',
      subtitle: 'Digital agency automates content creation for 200+ clients',
      company: 'Creative Collective',
      industry: 'Digital Marketing Agency',
      size: '25-50 employees',
      logo: '/api/placeholder/120/60',
      heroImage: '/api/placeholder/600/400',
      challenge: 'Managing content creation for 200+ clients was overwhelming their creative team and causing quality inconsistencies.',
      solution: 'Deployed AI Content Generator and Social Scheduler to automate content creation and publishing workflows.',
      results: [
        { metric: '5x', description: 'Increase in content output' },
        { metric: '60%', description: 'Reduction in content creation costs' },
        { metric: '40%', description: 'Improvement in client satisfaction' },
        { metric: '25', description: 'New clients onboarded' }
      ],
      testimonial: {
        quote: "The AI tools have been a game-changer for our agency. We're now serving 5x more clients with the same team size, and our content quality has never been better.",
        author: "Marcus Rodriguez",
        role: "Creative Director",
        avatar: '/api/placeholder/64/64'
      },
      implementation: {
        timeline: '3 weeks',
        setup: 'Custom brand voice training',
        training: '2 day team workshop',
        roi: '300% ROI in first 6 months'
      },
      tools: ['AI Content Generator', 'Social Scheduler', 'Landing Builder'],
      featured: true
    },
    {
      id: 'retail-revolution',
      category: 'ecommerce',
      title: 'RetailRev Increases Conversion Rate by 180%',
      subtitle: 'E-commerce brand optimizes landing pages with AI',
      company: 'RetailRevolution',
      industry: 'E-commerce Fashion',
      size: '10-25 employees',
      logo: '/api/placeholder/120/60',
      heroImage: '/api/placeholder/600/400',
      challenge: 'Poor landing page performance was causing high bounce rates and low conversion rates across their product campaigns.',
      solution: 'Used AI Landing Page Builder to create optimized pages for each product category with A/B testing.',
      results: [
        { metric: '180%', description: 'Increase in conversion rate' },
        { metric: '65%', description: 'Reduction in bounce rate' },
        { metric: '320%', description: 'Improvement in ROAS' },
        { metric: '$850K', description: 'Additional revenue generated' }
      ],
      testimonial: {
        quote: "The AI-generated landing pages converted 3x better than our previous designs. The insights and optimization suggestions were incredibly valuable.",
        author: "Emma Thompson",
        role: "Head of Marketing",
        avatar: '/api/placeholder/64/64'
      },
      implementation: {
        timeline: '1 week',
        setup: 'Plug-and-play integration',
        training: '4 hours onboarding',
        roi: '650% ROI in first quarter'
      },
      tools: ['AI Landing Builder', 'Content Generator'],
      featured: false
    },
    {
      id: 'quantum-consulting',
      category: 'consulting',
      title: 'Quantum Consulting Automates Client Onboarding',
      subtitle: 'Management consultancy streamlines operations with AI',
      company: 'Quantum Consulting Group',
      industry: 'Management Consulting',
      size: '100+ employees',
      logo: '/api/placeholder/120/60',
      heroImage: '/api/placeholder/600/400',
      challenge: 'Complex client onboarding process was taking 3-4 weeks and requiring significant manual effort from senior consultants.',
      solution: 'Implemented full DevCraft Labs suite to automate proposals, task management, and client communication.',
      results: [
        { metric: '75%', description: 'Faster client onboarding' },
        { metric: '90%', description: 'Reduction in manual tasks' },
        { metric: '55%', description: 'Increase in project efficiency' },
        { metric: '200%', description: 'Growth in client capacity' }
      ],
      testimonial: {
        quote: "DevCraft Labs allowed us to scale our operations without proportionally increasing headcount. Our consultants can now focus on high-value strategic work.",
        author: "Dr. James Wilson",
        role: "Managing Partner",
        avatar: '/api/placeholder/64/64'
      },
      implementation: {
        timeline: '4 weeks',
        setup: 'Enterprise integration',
        training: '1 week comprehensive training',
        roi: '250% ROI in first year'
      },
      tools: ['All AI Tools', 'Task Manager', 'Dashboard', 'API Integration'],
      featured: true
    }
  ]

  const metrics = [
    {
      value: '850%',
      label: 'Average ROI',
      description: 'Return on investment within first year',
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      value: '2,500+',
      label: 'Hours Saved',
      description: 'Per client per month on average',
      icon: <Clock className="w-8 h-8" />
    },
    {
      value: '95%',
      label: 'Client Satisfaction',
      description: 'Net Promoter Score from case study clients',
      icon: <Award className="w-8 h-8" />
    },
    {
      value: '340%',
      label: 'Productivity Boost',
      description: 'Average increase in team productivity',
      icon: <Zap className="w-8 h-8" />
    }
  ]

  const filteredStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory)

  const featuredStudies = caseStudies.filter(study => study.featured)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Success Stories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              See how businesses across industries are transforming their operations with DevCraft Labs AI tools. 
              Real results from real customers.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>500+ Companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>850% Average ROI</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-4">
                  <div className="text-blue-600">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              In-depth looks at how our AI tools delivered exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredStudies.slice(0, 2).map((study) => (
              <div key={study.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={study.heroImage}
                    alt={study.company}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Image
                      src={study.logo}
                      alt={`${study.company} logo`}
                      width={80}
                      height={40}
                      className="bg-white rounded p-2"
                    />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                      {study.industry}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {study.size}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {study.subtitle}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.results.slice(0, 4).map((result, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {result.metric}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {result.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={study.testimonial.avatar}
                        alt={study.testimonial.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                          "{study.testimonial.quote}"
                        </p>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {study.testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {study.testimonial.role}, {study.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/case-studies/${study.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Case Studies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              All Case Studies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse success stories by industry and use case
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study) => (
              <div key={study.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={study.heroImage}
                    alt={study.company}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Image
                      src={study.logo}
                      alt={`${study.company} logo`}
                      width={60}
                      height={30}
                      className="bg-white rounded p-1"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
                      {study.industry}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {study.size}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {study.subtitle}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {study.results.slice(0, 2).map((result, index) => (
                      <div key={index} className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {result.metric}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {result.description.split(' ').slice(0, 2).join(' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/case-studies/${study.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses transforming their operations with DevCraft Labs AI tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}