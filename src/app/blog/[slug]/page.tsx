'use client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag } from 'lucide-react'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import { blogPosts } from '@/data/blogPosts'

// Additional blog posts for the remaining articles from the blog page
const additionalBlogPosts = {
  'social-media-scheduling': {
    id: 'social-media-scheduling',
    title: 'AI Social Scheduler: Beyond Just Posting - Smart Automation',
    excerpt: 'Learn how our AI Social Scheduler transforms social media management with intelligent posting, content optimization, and engagement analytics.',
    content: `
# AI Social Scheduler: Beyond Just Posting - Smart Automation

Social media success requires more than just posting content. Our AI Social Scheduler revolutionizes social media management through intelligent automation that adapts to your audience and maximizes engagement.

## The Social Media Challenge

Managing multiple social platforms is overwhelming:
- Different optimal posting times for each platform
- Varying audience preferences and behaviors
- Content adaptation for different formats
- Engagement monitoring and response
- Performance analysis and optimization

## Smart Scheduling Features

### 1. Optimal Timing Intelligence
Our AI analyzes your audience behavior to determine the best posting times for each platform, automatically scheduling content when your followers are most active.

### 2. Content Optimization
Each post is automatically optimized for its target platform:
- Character limits and formatting
- Hashtag recommendations
- Image sizing and cropping
- Platform-specific features

### 3. Engagement Prediction
The AI predicts which posts will perform best and suggests improvements before publishing.

## Platform-Specific Automation

### LinkedIn
- Professional tone adaptation
- Industry-specific hashtags
- Optimal posting windows for B2B engagement

### Instagram
- Visual content optimization
- Story scheduling
- Hashtag research and rotation

### Twitter/X
- Thread creation and scheduling
- Trending topic integration
- Optimal tweet timing

### Facebook
- Community engagement features
- Event promotion automation
- Local audience targeting

## Analytics and Insights

### Performance Tracking
- Engagement rates by platform
- Optimal posting time analysis
- Content type performance
- Audience growth metrics

### Competitive Analysis
- Benchmark against competitors
- Industry trend identification
- Content gap analysis

## Real Results

### Digital Marketing Agency
- **Time Savings**: 25 hours per week
- **Engagement Rate**: 180% increase
- **Client Retention**: 95% (up from 78%)

### E-commerce Brand
- **Follower Growth**: 340% in 6 months
- **Sales from Social**: $180K additional revenue
- **Content Production**: 500% increase

## Getting Started

Transform your social media presence:

1. **Connect** your social accounts
2. **Set up** your content calendar
3. **Enable** AI optimization
4. **Monitor** and adjust based on analytics

Smart social media management isn't about posting more—it's about posting better. Our AI Social Scheduler makes every post count.

---

*Ready to automate your social media success? Start your free trial today.*
    `,
    author: {
      name: 'DevCraft Labs Team',
      role: 'Social Media AI',
      avatar: '/DCL-logo.png'
    },
    publishedAt: '2024-06-18',
    readTime: '6 min read',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    tags: ['AI Social Scheduler', 'Social Media', 'Engagement', 'DevCraft Tools']
  }
  // More blog posts would be added here for complete coverage
}

// Combine all blog posts
const allBlogPosts = { ...blogPosts, ...additionalBlogPosts }

interface BlogPageProps {
  params: {
    slug: string
  }
}

export default function BlogArticlePage({ params }: BlogPageProps) {
  const post = allBlogPosts[params.slug as keyof typeof allBlogPosts]

  if (!post) {
    notFound()
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null
      
      // Handle headers
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8">{paragraph.slice(2)}</h1>
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">{paragraph.slice(3)}</h2>
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">{paragraph.slice(4)}</h3>
      }
      
      // Handle lists
      if (paragraph.startsWith('- ')) {
        return <li key={index} className="text-gray-700 dark:text-gray-300 mb-2">{paragraph.slice(2)}</li>
      }
      
      // Handle horizontal rule
      if (paragraph.trim() === '---') {
        return <hr key={index} className="my-8 border-gray-200 dark:border-gray-700" />
      }
      
      // Handle emphasis (italic text in markdown)
      if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
        return <p key={index} className="text-gray-600 dark:text-gray-400 italic mb-4">{paragraph.slice(1, -1)}</p>
      }
      
      // Regular paragraphs
      return <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{paragraph}</p>
    }).filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UnifiedNavigation />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Meta */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              <Tag className="w-3 h-3" />
              <span>{post.category}</span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center space-x-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {post.author.role}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-4">
            {formatContent(post.content)}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Actions */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bookmark className="w-4 h-4" />
              <span>Bookmark</span>
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles CTA */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore More Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Discover more insights about AI tools, productivity, and business transformation.
          </p>
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>View All Articles</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  )
}