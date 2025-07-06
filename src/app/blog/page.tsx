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
    title: 'The AI Transformation: How Businesses Are Achieving 10x Growth in 2024',
    excerpt: 'Discover the key strategies and AI tools that are driving unprecedented business growth across industries. Learn from real-world examples and actionable insights.',
    author: {
      name: 'Dr. Sarah Mitchell',
      role: 'Head of AI Research',
      avatar: '/api/placeholder/48/48'
    },
    publishedAt: '2024-07-01',
    readTime: '8 min read',
    category: 'AI Insights',
    image: '/api/placeholder/800/400',
    featured: true,
    tags: ['AI', 'Business Growth', 'Automation', 'Strategy']
  }

  const blogPosts = [
    {
      id: 'proposal-automation-guide',
      title: '5 Ways AI Proposal Generation Can Transform Your Sales Process',
      excerpt: 'Learn how leading companies are using AI to create compelling proposals faster, close more deals, and scale their sales operations.',
      author: {
        name: 'Marcus Johnson',
        role: 'Sales Strategy Expert',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-28',
      readTime: '6 min read',
      category: 'AI Insights',
      image: '/api/placeholder/600/300',
      tags: ['Sales', 'AI', 'Proposals', 'Automation']
    },
    {
      id: 'content-marketing-ai',
      title: 'The Future of Content Marketing: AI-Powered Content Creation',
      excerpt: 'Explore how AI is revolutionizing content marketing, from ideation to distribution, and learn best practices for implementation.',
      author: {
        name: 'Emily Chen',
        role: 'Content Marketing Director',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-25',
      readTime: '7 min read',
      category: 'Productivity',
      image: '/api/placeholder/600/300',
      tags: ['Content Marketing', 'AI', 'Strategy', 'Creativity']
    },
    {
      id: 'landing-page-optimization',
      title: 'Data-Driven Landing Page Optimization: A Complete Guide',
      excerpt: 'Master the art and science of landing page optimization with AI-powered insights, A/B testing strategies, and conversion best practices.',
      author: {
        name: 'Alex Rodriguez',
        role: 'Growth Marketing Lead',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-22',
      readTime: '10 min read',
      category: 'Tutorials',
      image: '/api/placeholder/600/300',
      tags: ['Landing Pages', 'Conversion', 'Optimization', 'Growth']
    },
    {
      id: 'techflow-case-study',
      title: 'Case Study: How TechFlow Reduced Proposal Time by 85%',
      excerpt: 'Deep dive into TechFlow\'s journey from manual proposal creation to AI-powered automation, including challenges, solutions, and results.',
      author: {
        name: 'Sarah Chen',
        role: 'Customer Success Manager',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-20',
      readTime: '5 min read',
      category: 'Case Studies',
      image: '/api/placeholder/600/300',
      tags: ['Case Study', 'Customer Success', 'Proposals', 'ROI']
    },
    {
      id: 'social-media-scheduling',
      title: 'Smart Social Media Scheduling: Beyond Just Posting',
      excerpt: 'Learn advanced social media scheduling strategies that go beyond basic posting to drive real engagement and business results.',
      author: {
        name: 'Jordan Park',
        role: 'Social Media Strategist',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-18',
      readTime: '6 min read',
      category: 'Productivity',
      image: '/api/placeholder/600/300',
      tags: ['Social Media', 'Scheduling', 'Engagement', 'Strategy']
    },
    {
      id: 'devcraft-product-update',
      title: 'Product Update: New AI Task Manager and Enhanced Analytics',
      excerpt: 'Announcing major updates to our platform including the new AI Task Manager, enhanced analytics dashboard, and improved integrations.',
      author: {
        name: 'DevCraft Team',
        role: 'Product Team',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-15',
      readTime: '4 min read',
      category: 'Company News',
      image: '/api/placeholder/600/300',
      tags: ['Product Update', 'Features', 'Task Manager', 'Analytics']
    },
    {
      id: 'ai-workflow-automation',
      title: 'Building Intelligent Workflows: A Step-by-Step Tutorial',
      excerpt: 'Complete tutorial on creating intelligent, automated workflows that adapt to your business needs and scale with your growth.',
      author: {
        name: 'Michael Thompson',
        role: 'Solutions Architect',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-12',
      readTime: '12 min read',
      category: 'Tutorials',
      image: '/api/placeholder/600/300',
      tags: ['Workflows', 'Automation', 'Tutorial', 'Integration']
    },
    {
      id: 'productivity-metrics',
      title: 'Measuring AI Impact: Key Productivity Metrics That Matter',
      excerpt: 'Learn which metrics to track when implementing AI tools and how to measure ROI effectively in your organization.',
      author: {
        name: 'Lisa Wang',
        role: 'Analytics Specialist',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-10',
      readTime: '8 min read',
      category: 'Productivity',
      image: '/api/placeholder/600/300',
      tags: ['Metrics', 'Analytics', 'ROI', 'Productivity']
    },
    {
      id: 'creative-collective-story',
      title: 'Customer Spotlight: Creative Collective\'s Content Revolution',
      excerpt: 'How a digital agency scaled their content production 5x while maintaining quality and creativity using DevCraft Labs AI tools.',
      author: {
        name: 'Rachel Green',
        role: 'Customer Success Lead',
        avatar: '/api/placeholder/48/48'
      },
      publishedAt: '2024-06-08',
      readTime: '7 min read',
      category: 'Case Studies',
      image: '/api/placeholder/600/300',
      tags: ['Customer Story', 'Content Creation', 'Agency', 'Scale']
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              DevCraft Labs Blog
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
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Article</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
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
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
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
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
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
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with DevCraft Labs
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest insights on AI, productivity, and business growth delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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