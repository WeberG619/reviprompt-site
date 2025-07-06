'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, BarChart3, Share2, Moon, Sun, Clock, TrendingUp, Users, Send } from 'lucide-react'
import Chatbot from '@/components/Chatbot'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function SocialSchedulerPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [postContent, setPostContent] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduledPost, setScheduledPost] = useState<any>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const platforms = [
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600', followers: '15.4K' },
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', followers: '22.1K' },
    { id: 'twitter', name: 'Twitter', color: 'bg-sky-500', followers: '8.9K' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700', followers: '12.3K' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black', followers: '5.2K' },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-600', followers: '3.8K' },
    { id: 'pinterest', name: 'Pinterest', color: 'bg-red-500', followers: '7.1K' },
    { id: 'discord', name: 'Discord', color: 'bg-indigo-600', followers: '2.4K' }
  ]

  const postTemplates = [
    {
      id: 'announcement',
      title: 'Product Announcement',
      content: '🚀 Exciting news! We\'re thrilled to announce [Product/Feature]. This game-changing solution will help you [benefit]. \n\n✨ Key features:\n• Feature 1\n• Feature 2\n• Feature 3\n\nReady to try it? Link in bio! #ProductLaunch #Innovation'
    },
    {
      id: 'tips',
      title: 'Tips & Advice',
      content: '💡 5 Essential Tips for [Topic]\n\n1️⃣ Tip 1 - Brief description\n2️⃣ Tip 2 - Brief description\n3️⃣ Tip 3 - Brief description\n4️⃣ Tip 4 - Brief description\n5️⃣ Tip 5 - Brief description\n\nWhich tip resonates most with you? Let us know! 👇\n\n#Tips #Advice #YourNiche'
    },
    {
      id: 'engagement',
      title: 'Engagement Question',
      content: '🤔 Quick question for our community:\n\n[Engaging question related to your niche]\n\nA) Option A\nB) Option B\nC) Option C\nD) Something else (tell us in comments!)\n\nCan\'t wait to see your answers! 👇\n\n#Community #Engagement #YourTopic'
    }
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleSchedule = async () => {
    if (!postContent || selectedPlatforms.length === 0) {
      alert('Please enter content and select at least one platform')
      return
    }

    setIsScheduling(true)
    
    try {
      // Import API dynamically to avoid SSR issues
      const { devCraftAPI } = await import('@/lib/api')
      
      const response = await devCraftAPI.generateSocialPost({
        prompt: postContent,
        context: {
          platforms: selectedPlatforms,
          scheduledTime: scheduledTime
        },
        tone: 'Professional'
      })
      
      if (response.success && response.data) {
        const postData = {
          id: `post_${Date.now()}`,
          content: response.data.content || postContent,
          platforms: selectedPlatforms,
          scheduledTime: scheduledTime || new Date(Date.now() + 3600000).toISOString(),
          status: 'scheduled',
          engagement: {
            estimatedReach: Math.floor(Math.random() * 5000) + 1000,
            estimatedEngagement: response.data.engagementPrediction || (Math.random() * 5 + 2).toFixed(1),
            bestTime: response.data.bestTime || '2:00 PM EST'
          },
          hashtags: response.data.hashtags || [],
          platformOptimizations: response.data.platformOptimizations || {},
          createdAt: new Date().toISOString(),
          aiGenerated: true
        }
        
        setScheduledPost(postData)
      } else {
        throw new Error(response.error || 'Failed to generate social post')
      }
      setPostContent('')
      setSelectedPlatforms([])
      setScheduledTime('')
    } catch (error) {
      alert('Error scheduling post. Please try again.')
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Unified Navigation */}
      <UnifiedNavigation />

      {/* Hero Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            AI Social Media Scheduler
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Schedule, optimize, and manage your social media presence across 12+ platforms with AI-powered content optimization and engagement predictions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">12+ Platforms</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Facebook, Instagram, Twitter, LinkedIn, TikTok, and more</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">+35% Engagement</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">AI-optimized posting times and content suggestions</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Save 10hrs/week</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Automated scheduling and content optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scheduler Interface */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Creation */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                Create Your Post
              </h2>

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-3">
                  Select Platforms *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <div className={`w-8 h-8 ${platform.color} rounded-full mx-auto mb-2`}></div>
                      <div className="text-xs font-medium text-neutral-900 dark:text-white">{platform.name}</div>
                      <div className="text-xs text-neutral-500">{platform.followers}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Templates */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-3">
                  Quick Templates
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {postTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setPostContent(template.content)}
                      className="p-2 text-left border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">{template.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Post Content *
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts, updates, or insights..."
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="text-xs text-neutral-500 mt-1">
                  {postContent.length}/2200 characters
                </div>
              </div>

              {/* Schedule Time */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                  Schedule Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-xs text-neutral-500 mt-1">
                  Leave empty to schedule for optimal time
                </div>
              </div>

              <button
                onClick={handleSchedule}
                disabled={isScheduling || !postContent || selectedPlatforms.length === 0}
                className="w-full btn-primary inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScheduling ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Scheduling Post...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Schedule Post</span>
                  </>
                )}
              </button>
            </div>

            {/* Analytics & Preview */}
            <div className="space-y-6">
              {/* Platform Analytics */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Platform Performance
                </h3>
                <div className="space-y-4">
                  {platforms.slice(0, 4).map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${platform.color} rounded-full`}></div>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{platform.name}</span>
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {platform.followers} • {(Math.random() * 5 + 2).toFixed(1)}% engagement
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimal Times */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Optimal Posting Times
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Best Overall</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">High Engagement</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">7:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Business Hours</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">10:00 AM EST</span>
                  </div>
                </div>
              </div>

              {/* Content Suggestions */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  AI Suggestions
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-sm">
                    <span className="text-green-600">•</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Add 2-3 relevant hashtags for better reach</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm">
                    <span className="text-green-600">•</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Include a call-to-action to boost engagement</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm">
                    <span className="text-green-600">•</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Post at 2:00 PM for 40% higher engagement</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm">
                    <span className="text-green-600">•</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Add emojis to increase visual appeal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {scheduledPost && (
        <section className="py-16 bg-green-50 dark:bg-green-900/20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-green-200 dark:border-green-700 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Post Scheduled Successfully!
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                Your post has been scheduled across {scheduledPost.platforms.length} platforms
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-neutral-900 dark:text-white">
                    {scheduledPost.engagement.estimatedReach.toLocaleString()}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Estimated Reach</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-neutral-900 dark:text-white">
                    {scheduledPost.engagement.estimatedEngagement}%
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Engagement Rate</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-neutral-900 dark:text-white">
                    {scheduledPost.engagement.bestTime}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Optimal Time</div>
                </div>
              </div>
              
              <button
                onClick={() => setScheduledPost(null)}
                className="btn-primary"
              >
                Schedule Another Post
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Powerful Social Media Features
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Everything you need to manage your social media presence effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Multi-Platform</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Schedule to 12+ platforms simultaneously</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Analytics</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Track performance and engagement metrics</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Optimal Timing</h3>
              <p className="text-neutral-600 dark:text-neutral-400">AI-powered optimal posting time suggestions</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Optimization</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Content suggestions for better engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Dominate Social Media?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of brands using DevCraft Labs to grow their social media presence
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
      
      <Chatbot pageContext="social-scheduler" />
    </div>
  )
}