'use client'
import Link from 'next/link'
import { ArrowRight, Building2, Users, Rocket, Heart, Target, Globe } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Chatbot from '@/components/Chatbot'


export default function CareersPage() {
  const openings = [
    {
      title: 'Senior Full Stack Developer',
      team: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help build our next-generation AI tools and API infrastructure',
      requirements: ['5+ years experience', 'Next.js/React expertise', 'AI/ML knowledge']
    },
    {
      title: 'AI/ML Engineer',
      team: 'AI Research',
      location: 'Remote',
      type: 'Full-time',
      description: 'Develop and optimize our AI models and machine learning pipelines',
      requirements: ['Python expertise', 'LLM experience', 'Model optimization skills']
    },
    {
      title: 'Product Designer',
      team: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive interfaces for our AI-powered business tools',
      requirements: ['3+ years UI/UX', 'Figma proficiency', 'SaaS experience']
    },
    {
      title: 'Customer Success Manager',
      team: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our customers succeed with DevCraft Labs tools',
      requirements: ['2+ years CS experience', 'Technical aptitude', 'Strong communication']
    }
  ]

  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Remote-First Culture',
      description: 'Work from anywhere in the world with flexible hours'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Growth Opportunities',
      description: 'Learning budget and career development paths'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Great Team',
      description: 'Work with talented people who love what they do'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Equity Options',
      description: 'Share in our success with competitive equity packages'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Modern Tools',
      description: 'Latest tech stack and best-in-class development tools'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join Our Mission to Transform Business with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Help us build the future of AI-powered business automation. We&apos;re looking for passionate individuals who want to make a real impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#openings" className="btn-primary inline-flex items-center space-x-2">
              <span>View Open Positions</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/about" className="btn-secondary inline-flex items-center space-x-2">
              <span>Learn About Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join DevCraft Labs?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We offer more than just a job - join a team that&apos;s passionate about innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600 dark:text-blue-400">{benefit.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Values
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Innovation First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We push boundaries and challenge the status quo. Innovation isn&apos;t just what we do - it&apos;s who we are.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Customer Obsessed
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our customers&apos; success is our success. We build tools that solve real problems and deliver real value.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Transparent & Honest
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in open communication, honest feedback, and building trust through transparency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Continuous Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We&apos;re always learning, growing, and improving. We invest in our team&apos;s development and celebrate curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openings.map((job, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                        {job.team}
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                        {job.location}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link 
                    href="/contact?subject=careers"
                    className="btn-primary text-sm"
                  >
                    Apply Now
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {job.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Requirements: {job.requirements.join(' • ')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center p-8 bg-gray-50 dark:bg-neutral-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Don&apos;t see the right role?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We&apos;re always looking for talented people. Send us your resume and tell us how you can contribute.
            </p>
            <Link href="/contact?subject=careers" className="btn-secondary inline-flex items-center space-x-2">
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="careers" />
    </div>
  )
}