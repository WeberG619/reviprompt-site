'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, MessageCircle, Phone, MapPin, Clock, Send } from 'lucide-react'


export default function ContactPage() {

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
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Professional AI Tools</div>
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
            Get in <span className="text-gradient-blue">Touch</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Ready to transform your business with professional AI tools? Our team is here to help you get started.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 card-enhanced hover-glow group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-neutral-700 dark:to-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-interactive" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">Get help with technical questions and account issues</p>
              <a href="mailto:support@revipromptlab.com" className="text-blue-600 dark:text-blue-400 font-medium">
                support@revipromptlab.com
              </a>
            </div>

            <div className="text-center p-8 card-enhanced hover-glow group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-neutral-700 dark:to-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-interactive" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">Real-time support for urgent questions</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">Available 9 AM - 6 PM EST</p>
            </div>

            <div className="text-center p-8 card-enhanced hover-glow group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-neutral-700 dark:to-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-interactive" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Enterprise Sales</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">Discuss custom solutions and pricing</p>
              <a href="mailto:sales@revipromptlab.com" className="text-blue-600 dark:text-blue-400 font-medium">
                sales@revipromptlab.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Send us a Message
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form className="card-enhanced hover-glow p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Subject *
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales & Pricing</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="enterprise">Enterprise Solutions</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Message *
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your project or question..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary inline-flex items-center space-x-2 group"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                Visit Our Office
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Address</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      123 Innovation Drive<br />
                      Tech Hub, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Office Hours</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday: 10:00 AM - 2:00 PM PST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Quick Response Times
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Email Support</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">&lt; 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Enterprise Sales</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">&lt; 4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Technical Issues</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Live Chat</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}