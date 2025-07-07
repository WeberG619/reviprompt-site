'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Lightbulb, Users, Heart, Zap } from 'lucide-react'


export default function AboutPage() {

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "We believe AI should make work easier, not more complicated. Every tool we build focuses on real-world problems with simple solutions."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Obsessed", 
      description: "Your success is our success. We build tools that help small businesses compete with enterprise-level automation."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Built with Care",
      description: "Every feature is crafted with attention to detail, from intuitive interfaces to reliable automation that just works."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Speed & Reliability",
      description: "Fast, dependable tools that save you time every day. No complex setups, no learning curves, just results."
    }
  ]

  const milestones = [
    {
      year: "2024",
      title: "RevitPrompt Lab Founded", 
      description: "Started with a mission to make AI tools that small businesses can actually use and afford."
    },
    {
      year: "2024",
      title: "AI Invoice Generator Launch",
      description: "Our first AI tool goes live, helping businesses automate invoicing and get paid faster."
    },
    {
      year: "2024",
      title: "AEC Professional Tools Launch",
      description: "Launched comprehensive AEC professional tools, including Revit automation, prompt libraries, and construction management solutions."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/revitprompt-logo.png"
                alt="RevitPrompt Lab Logo"
                width={54}
                height={32}
              />
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">RevitPrompt Lab</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">About Us</div>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-blue-50/30 to-neutral-50 dark:from-neutral-800/50 dark:via-blue-900/10 dark:to-neutral-800/50 section-pattern relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-16 left-16 w-20 h-20 bg-blue-300/10 dark:bg-blue-400/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-32 right-24 w-16 h-16 bg-purple-300/10 dark:bg-purple-400/5 rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Building AI Tools That 
            <span className="text-gradient-blue"> Actually Work</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
            We&apos;re on a mission to make powerful AI accessible to every business, regardless of size or technical expertise. 
            Our tools are designed to save you time, increase revenue, and let you focus on what you do best.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                Most AI tools are built for tech companies with big budgets and dedicated IT teams. 
                We believe every business deserves access to intelligent automation that&apos;s simple, 
                affordable, and effective.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                That&apos;s why we created RevitPrompt Lab - to build AI tools that small businesses can 
                actually use without needing a computer science degree or a massive budget.
              </p>
            </div>
            <div className="card-enhanced hover-glow p-8 group">
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-neutral-700/50 dark:to-blue-900/20 rounded-lg hover-lift-sm">
                  <div className="text-3xl font-bold text-gradient-blue mb-2">2.1k+</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Active Users</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-neutral-700/50 dark:to-blue-900/20 rounded-lg hover-lift-sm">
                  <div className="text-3xl font-bold text-gradient-blue mb-2">500+</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">AEC Professionals</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-neutral-700/50 dark:to-blue-900/20 rounded-lg hover-lift-sm">
                  <div className="text-3xl font-bold text-gradient-blue mb-2">15hrs</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Saved per Week</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-neutral-700/50 dark:to-blue-900/20 rounded-lg hover-lift-sm">
                  <div className="text-3xl font-bold text-gradient-blue mb-2">99.9%</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-blue-50/20 to-neutral-50 dark:from-neutral-800/50 dark:via-blue-900/10 dark:to-neutral-800/50 section-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Our <span className="text-gradient-blue">Values</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              These principles guide everything we build and every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-enhanced hover-glow p-8 text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-neutral-700 dark:to-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-600 dark:text-blue-400 icon-interactive">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Key milestones in building tools that make a difference.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{milestone.year}</span>
                  </div>
                </div>
                <div className="card-enhanced hover-glow p-6 flex-grow group">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Build with Us?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Join thousands of professionals using RevitPrompt Lab to automate their workflows and grow their businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://ai-portfolio-saas.vercel.app" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Free Trial</span>
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}