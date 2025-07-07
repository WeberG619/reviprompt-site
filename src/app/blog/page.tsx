'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// Disable static generation for this page since it uses client-side state
export const dynamic = 'force-dynamic'
import { Calendar, Clock, User, Tag, ArrowRight, Search, TrendingUp, BookOpen, Coffee, Lightbulb } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'ai-insights', name: 'AI Insights', count: 8 },
    { id: 'productivity', name: 'Productivity', count: 6 },
    { id: 'case-studies', name: 'Case Studies', count: 4 },
    { id: 'company-news', name: 'Company News', count: 3 },
    { id: 'tutorials', name: 'Tutorials', count: 3 }
  ]

  const featuredPost = {
    id: 'ai-transformation-2024',
    title: 'The AI Invoice Generator Revolution: How Small Businesses Save 15 Hours Weekly',
    excerpt: 'Discover how our AI Invoice Generator is transforming billing workflows for 2,000+ businesses. Real case studies showing 99.7% accuracy and automated payment tracking.',
    author: {
      name: 'DevCraft Labs Team',
      role: 'AI Product Research',
      avatar: '/DCL-logo.png'
    },
    publishedAt: '2024-07-01',
    readTime: '8 min read',
    category: 'AI Insights',
    image: '/img/blog/ai-invoice-generator.jpg',
    featured: true,
    tags: ['AI Invoice Generator', 'Business Automation', 'Productivity', 'Case Studies']
  }

  const blogPosts = [
    {
      id: 'proposal-automation-guide',
      title: 'DevCraft AI Proposal Generator: 5 Ways It Transforms Your Sales Process',
      excerpt: 'Learn how our AI Proposal Generator helps businesses create compelling proposals 10x faster, with automated templates, smart pricing, and professional formatting.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Product Development',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-28',
      readTime: '6 min read',
      category: 'AI Insights',
      image: '/img/blog/proposal-generator.jpg',
      tags: ['AI Proposal Generator', 'Sales', 'Automation', 'DevCraft Tools']
    },
    {
      id: 'content-marketing-ai',
      title: 'AI Content Generator: Creating Professional Blog Posts and Social Media',
      excerpt: 'Discover how our AI Content Generator helps marketers and businesses create high-quality content faster, with SEO optimization and brand voice consistency.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Content AI Research',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-25',
      readTime: '7 min read',
      category: 'Productivity',
      image: '/img/blog/content-generator.jpg',
      tags: ['AI Content Generator', 'Marketing', 'SEO', 'Productivity']
    },
    {
      id: 'landing-page-optimization',
      title: 'AI Landing Page Builder: Complete Guide to High-Converting Pages',
      excerpt: 'Master our AI Landing Page Builder with conversion optimization, A/B testing, and professional templates that boost conversions by 60%.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Growth Marketing',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-22',
      readTime: '10 min read',
      category: 'Tutorials',
      image: '/img/blog/landing-page-builder.jpg',
      tags: ['AI Landing Page Builder', 'Conversion', 'A/B Testing', 'DevCraft Tools']
    },
    {
      id: 'techflow-case-study',
      title: 'Case Study: How TechFlow Reduced Proposal Time by 85%',
      excerpt: 'Deep dive into TechFlow\'s journey from manual proposal creation to AI-powered automation, including challenges, solutions, and results.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Customer Success Manager',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-20',
      readTime: '5 min read',
      category: 'Case Studies',
      image: '/img/blog/case-study.jpg',
      tags: ['Case Study', 'Customer Success', 'Proposals', 'ROI']
    },
    {
      id: 'social-media-scheduling',
      title: 'AI Social Scheduler: Beyond Just Posting - Smart Automation',
      excerpt: 'Learn how our AI Social Scheduler transforms social media management with intelligent posting, content optimization, and engagement analytics.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Social Media AI',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-18',
      readTime: '6 min read',
      category: 'Productivity',
      image: '/img/blog/social-scheduler.jpg',
      tags: ['AI Social Scheduler', 'Social Media', 'Engagement', 'DevCraft Tools']
    },
    {
      id: 'devcraft-product-update',
      title: 'Product Update: New AI Task Manager and Enhanced Analytics',
      excerpt: 'Announcing major updates to our platform including the new AI Task Manager, enhanced analytics dashboard, and improved integrations.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Product Team',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-15',
      readTime: '4 min read',
      category: 'Company News',
      image: '/img/blog/product-update.jpg',
      tags: ['Product Update', 'AI Task Manager', 'Analytics', 'DevCraft Tools']
    },
    {
      id: 'ai-workflow-automation',
      title: 'Building Intelligent Workflows: AI Task Manager Tutorial',
      excerpt: 'Complete tutorial on creating intelligent, automated workflows with our AI Task Manager that adapt to your business needs and scale with growth.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Solutions Architect',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-12',
      readTime: '12 min read',
      category: 'Tutorials',
      image: '/img/blog/ai-workflow.jpg',
      tags: ['AI Task Manager', 'Workflows', 'Automation', 'Tutorial']
    },
    {
      id: 'productivity-metrics',
      title: 'Measuring AI Impact: Key Productivity Metrics That Matter',
      excerpt: 'Learn which metrics to track when implementing DevCraft Labs AI tools and how to measure ROI effectively in your organization.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Analytics Specialist',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-10',
      readTime: '8 min read',
      category: 'Productivity',
      image: '/img/blog/productivity-metrics.jpg',
      tags: ['Metrics', 'Analytics', 'ROI', 'Productivity']
    },
    {
      id: 'creative-collective-story',
      title: 'Customer Spotlight: Creative Collective\'s Content Revolution',
      excerpt: 'How a digital agency scaled their content production 5x while maintaining quality and creativity using DevCraft Labs AI Content Generator.',
      author: {
        name: 'DevCraft Labs Team',
        role: 'Customer Success Lead',
        avatar: '/DCL-logo.png'
      },
      publishedAt: '2024-06-08',
      readTime: '7 min read',
      category: 'Case Studies',
      image: '/img/blog/creative-collective.jpg',
      tags: ['Customer Story', 'AI Content Generator', 'Agency', 'Scale']
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase().replace(' ', '-') === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Insights': return <Lightbulb className="w-4 h-4" />
      case 'Productivity': return <TrendingUp className="w-4 h-4" />
      case 'Case Studies': return <BookOpen className="w-4 h-4" />
      case 'Company News': return <Coffee className="w-4 h-4" />
      case 'Tutorials': return <BookOpen className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-100 dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-900 section-pattern relative overflow-hidden">
        {/* Floating elements for visual interest */}
        <div className="absolute top-16 left-16 w-20 h-20 bg-blue-300/10 dark:bg-blue-400/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-32 right-24 w-16 h-16 bg-purple-300/10 dark:bg-purple-400/5 rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              DevCraft Labs <span className="text-gradient-blue">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Insights, tutorials, and stories about AI, productivity, and business transformation. 
              Stay ahead with the latest trends and best practices.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Article</h2>
            
            <div className="card-enhanced hover-glow overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent group-hover:from-blue-600/30 transition-all duration-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm">
                      {getCategoryIcon(featuredPost.category)}
                      <span>{featuredPost.category}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group/btn transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 dark:from-gray-800 dark:via-blue-900/10 dark:to-gray-800 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest <span className="text-gradient-blue">Articles</span>
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full backdrop-blur-sm">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="card-enhanced hover-glow overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded shadow-lg backdrop-blur-sm">
                      {getCategoryIcon(post.category)}
                      <span>{post.category}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {post.author.role}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium group/link transition-all duration-300"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                No articles found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-animated relative overflow-hidden">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-blue-600/90"></div>
        
        {/* Floating elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-16 right-16 w-12 h-12 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-8 left-1/3 w-10 h-10 bg-white/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with <span className="text-blue-200">DevCraft Labs</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest insights on AI tools, productivity, and business automation delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 backdrop-blur-sm bg-white/95 transition-all duration-300 focus:bg-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform">
              Subscribe
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}