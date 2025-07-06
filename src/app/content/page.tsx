'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, FileText, Zap, Target, Moon, Sun, Copy, CheckCircle, RefreshCw } from 'lucide-react'
import Chatbot from '@/components/Chatbot'

export default function ContentPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [contentType, setContentType] = useState('')
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const contentTypes = [
    { id: 'blog-post', label: 'Blog Post', description: 'Long-form articles and tutorials' },
    { id: 'social-media', label: 'Social Media', description: 'Posts for Facebook, Twitter, LinkedIn' },
    { id: 'marketing-copy', label: 'Marketing Copy', description: 'Sales pages, ads, email campaigns' },
    { id: 'product-description', label: 'Product Description', description: 'E-commerce product listings' },
    { id: 'email-newsletter', label: 'Email Newsletter', description: 'Regular email updates' },
    { id: 'press-release', label: 'Press Release', description: 'News announcements' }
  ]

  const tones = [
    'Professional', 'Casual', 'Friendly', 'Authoritative', 'Conversational',
    'Formal', 'Persuasive', 'Educational', 'Entertaining', 'Inspiring'
  ]

  const audiences = [
    'Business Professionals', 'Small Business Owners', 'Entrepreneurs', 'Developers',
    'Marketers', 'Students', 'General Public', 'Industry Experts', 'Customers', 'Investors',
    'Healthcare Professionals', 'Educators', 'Real Estate Agents', 'Consultants', 'Designers',
    'Construction Workers', 'Retailers', 'Restaurant Owners', 'Non-profit Organizations',
    'Technology Professionals', 'Financial Advisors', 'Legal Professionals', 'Architects',
    'Manufacturing Workers', 'Transportation Workers', 'Insurance Agents', 'Travel Agents',
    'Fitness Professionals', 'Beauty Professionals', 'Fashion Professionals', 'Home Service Providers',
    'IT Professionals', 'Telecommunications Workers', 'Media Professionals', 'Content Creators'
  ]

  const handleGenerate = async () => {
    if (!contentType || !topic) {
      alert('Please select content type and enter a topic')
      return
    }

    setIsGenerating(true)
    
    try {
      // Import API dynamically to avoid SSR issues
      const { devCraftAPI } = await import('@/lib/api')
      
      const response = await devCraftAPI.generateContent({
        prompt: topic,
        context: {
          contentType,
          audience,
          tone
        },
        audience,
        tone
      })
      
      if (response.success && response.data) {
        const contentData = {
          id: `content_${Date.now()}`,
          type: contentType,
          topic: topic,
          content: response.data.content,
          createdAt: new Date().toISOString(),
          wordCount: response.data.wordCount || Math.floor(Math.random() * 500) + 200,
          readingTime: Math.ceil((response.data.wordCount || 400) / 200),
          seoScore: response.data.seoScore,
          readabilityScore: response.data.readabilityScore,
          engagementPrediction: response.data.engagementPrediction,
          aiGenerated: true
        }
        
        setGeneratedContent(contentData)
      } else {
        throw new Error(response.error || 'Failed to generate content')
      }
    } catch (error) {
      alert('Error generating content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMockContent = (type: string, topic: string, audience: string, tone: string) => {
    const templates = {
      'blog-post': `# ${topic}: A Comprehensive Guide

## Introduction

In today's rapidly evolving business landscape, understanding ${topic.toLowerCase()} has become crucial for ${audience.toLowerCase()}. This comprehensive guide will walk you through everything you need to know to master this important concept.

## What is ${topic}?

${topic} represents a fundamental shift in how we approach modern business challenges. By leveraging innovative strategies and proven methodologies, organizations can achieve remarkable results.

## Key Benefits

1. **Improved Efficiency**: Streamline your operations and reduce costs
2. **Enhanced Performance**: Achieve better results with less effort  
3. **Competitive Advantage**: Stay ahead of the competition
4. **Scalable Growth**: Build systems that grow with your business

## Best Practices

To successfully implement ${topic.toLowerCase()}, consider these proven strategies:

- Start with a clear understanding of your goals
- Invest in the right tools and technology
- Train your team properly
- Monitor progress and adjust as needed

## Conclusion

${topic} is not just a trend—it's the future of business. By implementing these strategies today, you'll be well-positioned for success tomorrow.`,

      'social-media': `🚀 Exciting news about ${topic}!

Did you know that ${topic.toLowerCase()} can transform your business in ways you never imagined? Here's what you need to know:

✨ Key benefits:
• Increased efficiency
• Better results
• Competitive edge
• Scalable growth

Ready to get started? Drop a comment below and let us know your thoughts!

#${topic.replace(/\s+/g, '')} #Business #Innovation #Growth`,

      'marketing-copy': `Transform Your Business with ${topic}

Are you ready to revolutionize the way you work? ${topic} is the game-changing solution that ${audience.toLowerCase()} have been waiting for.

🎯 Why Choose Our ${topic} Solution?

✓ Proven results with 500+ successful implementations
✓ Easy setup in under 30 minutes  
✓ 24/7 expert support included
✓ 30-day money-back guarantee

Don't let your competitors get ahead. Join thousands of satisfied customers who have already transformed their business with ${topic}.

**Limited Time Offer**: Get 50% off your first month!

[Get Started Now] [Learn More]`,

      'product-description': `${topic} - Premium Quality Solution

Experience the difference with our professionally crafted ${topic.toLowerCase()}. Designed specifically for ${audience.toLowerCase()}, this solution delivers exceptional results every time.

🌟 Features:
• High-quality materials and construction
• User-friendly design
• Reliable performance
• Comprehensive warranty

💡 Perfect for:
• Professional use
• Daily applications  
• Long-term projects
• Demanding environments

⭐ Customer Reviews: 4.9/5 stars (500+ reviews)
🚚 Free shipping on orders over $50
🔄 30-day return policy

Order now and see why ${audience.toLowerCase()} choose our ${topic.toLowerCase()} solutions!`,

      'email-newsletter': `Subject: Latest Updates on ${topic}

Hi there!

Hope you're having a great week! We wanted to share some exciting developments about ${topic} that we think you'll find valuable.

📰 This Week's Highlights:

• New research shows ${topic.toLowerCase()} can improve efficiency by 40%
• Industry leaders share their top strategies
• Upcoming webinar: "Mastering ${topic} in 2024"
• Customer success story: How [Company] achieved amazing results

🎯 Featured Resource:
Download our free guide "The Complete ${topic} Handbook" - packed with actionable tips and real-world examples.

[Download Free Guide]

Thanks for being part of our community!

Best regards,
The DevCraft Labs Team

P.S. Don't forget to follow us on social media for daily tips and insights!`,

      'press-release': `FOR IMMEDIATE RELEASE

DevCraft Labs Announces Breakthrough in ${topic}

Revolutionary solution sets new industry standards for ${audience.toLowerCase()}

[City, Date] - DevCraft Labs, a leading provider of AI-powered business solutions, today announced a major breakthrough in ${topic.toLowerCase()} technology. This innovative approach promises to transform how ${audience.toLowerCase()} approach their daily operations.

"This represents a significant leap forward in our industry," said [Spokesperson Name], [Title] at DevCraft Labs. "Our new ${topic.toLowerCase()} solution addresses the core challenges that ${audience.toLowerCase()} face every day."

Key highlights include:
• 40% improvement in efficiency
• Seamless integration with existing systems
• Enterprise-grade security and reliability
• Comprehensive support and training

The solution is now available to customers worldwide, with early adopters already reporting impressive results.

About DevCraft Labs:
DevCraft Labs specializes in AI-powered business automation tools that help organizations streamline operations and drive growth.

For more information, contact:
[Contact Information]

###`
    }

    return templates[type as keyof typeof templates] || `Generated content for ${topic} goes here...`
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={54}
                height={32}
              />
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">AI Content Generator</div>
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
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            AI Content Generator
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Create high-quality content in seconds. From blog posts to social media, marketing copy to product descriptions - AI-powered content that converts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">10x Faster</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Generate content in seconds instead of hours</p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">98% Quality</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">AI-powered content that engages and converts</p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">15+ Formats</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Blog posts, social media, emails, and more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Choose Your Content Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  contentType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}
              >
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">{type.label}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{type.description}</p>
              </button>
            ))}
          </div>

          {/* Generator Form */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Topic/Subject *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Digital Marketing Strategy, AI in Healthcare..."
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select audience</option>
                  {audiences.map(aud => (
                    <option key={aud} value={aud}>{aud}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Tone & Style
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select tone</option>
                {tones.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !contentType || !topic}
              className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Content...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Generated Content */}
      {generatedContent && (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Generated Content
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {generatedContent.wordCount} words • {generatedContent.readingTime} min read
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedContent.content, 0)}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  {copiedIndex === 0 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Content</span>
                    </>
                  )}
                </button>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-neutral-900 dark:text-white leading-relaxed">
                  {generatedContent.content}
                </pre>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={handleGenerate}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Generate New Version</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Scale Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators using DevCraft Labs to produce high-quality content at scale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-white inline-flex items-center space-x-2">
              <span>View Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline-white inline-flex items-center space-x-2">
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Chatbot pageContext="content" />
    </div>
  )
}