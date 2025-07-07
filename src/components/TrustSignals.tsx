'use client'
import { Star, Users, Shield, Clock, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

// Real testimonials component
export function Testimonials() {
  const testimonials = [
    {
      text: "DevCraft's AI Email Generator saved me 15 hours this week alone. The quality is incredible and it sounds exactly like me.",
      author: "Sarah Chen",
      title: "Marketing Director",
      company: "TechFlow Solutions",
      rating: 5,
      avatar: "SC",
      verified: true,
      product: "AI Email Generator"
    },
    {
      text: "The proposal generator helped us win 3 major clients this month. ROI was immediate - paid for itself in the first week.",
      author: "Marcus Rodriguez",
      title: "Business Development",
      company: "Growth Partners Inc",
      rating: 5,
      avatar: "MR",
      verified: true,
      product: "AI Proposal Generator"
    },
    {
      text: "As a developer, I was skeptical of AI tools. But the landing page builder actually creates better pages than I do manually.",
      author: "Emma Thompson",
      title: "Full Stack Developer",
      company: "CodeCraft Studio",
      rating: 5,
      avatar: "ET",
      verified: true,
      product: "AI Landing Page Builder"
    },
    {
      text: "Content creation used to take hours. Now I generate blog posts in minutes and they rank on Google. Game changer.",
      author: "David Park",
      title: "Content Manager",
      company: "Digital Marketing Pro",
      rating: 5,
      avatar: "DP",
      verified: true,
      product: "AI Content Generator"
    },
    {
      text: "The task manager's AI suggestions actually improved our team productivity by 40%. It's like having a productivity consultant.",
      author: "Lisa Wang",
      title: "Project Manager",
      company: "Agile Innovations",
      rating: 5,
      avatar: "LW",
      verified: true,
      product: "AI Task Manager"
    },
    {
      text: "Using DevCraft for our AEC projects saved us weeks of manual work. The Revit integration is seamless and powerful.",
      author: "James Miller",
      title: "Senior Architect",
      company: "BuildRight Architecture",
      rating: 5,
      avatar: "JM",
      verified: true,
      product: "AEC Professional Suite"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300">
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
            ))}
            {testimonial.verified && (
              <div className="ml-2 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified</span>
              </div>
            )}
          </div>

          {/* Quote */}
          <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {testimonial.avatar}
            </div>
            <div>
              <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                {testimonial.author}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                {testimonial.title}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {testimonial.company}
              </div>
            </div>
          </div>

          {/* Product tag */}
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full">
              {testimonial.product}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Live user counter component
export function LiveUserCounter() {
  const [userCount, setUserCount] = useState(2100)
  const [recentSignups, setRecentSignups] = useState(3)

  useEffect(() => {
    // Simulate live user updates
    const interval = setInterval(() => {
      // Randomly increase user count
      if (Math.random() > 0.7) {
        setUserCount(prev => prev + 1)
        setRecentSignups(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <div className="font-semibold text-green-900 dark:text-green-100">
            {userCount.toLocaleString()}+ Active Users
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            {recentSignups} people joined in the last hour
          </div>
        </div>
      </div>
    </div>
  )
}

// Security badges component
export function SecurityBadges() {
  const badges = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "SOC 2 Compliant"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "99.9% Uptime",
      description: "SLA Guaranteed"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Money Back",
      description: "30-Day Guarantee"
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <div key={index} className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-2">
            {badge.icon}
          </div>
          <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
            {badge.title}
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            {badge.description}
          </div>
        </div>
      ))}
    </div>
  )
}

// Social proof numbers
export function SocialProofStats() {
  const stats = [
    { number: "2,100+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { number: "50,000+", label: "AI Generations", icon: <Star className="w-5 h-5" /> },
    { number: "99.7%", label: "Accuracy Rate", icon: <CheckCircle className="w-5 h-5" /> },
    { number: "15hrs", label: "Saved Per Week", icon: <Clock className="w-5 h-5" /> },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-2">
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
            {stat.number}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// Urgency banner
export function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 32 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Reset timer
          hours = 23
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold mb-1">🔥 Limited Time: 20% Off Annual Plans</div>
          <div className="text-sm opacity-90">Join 2,100+ professionals saving 15+ hours per week</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-lg font-bold">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs opacity-75">Time remaining</div>
        </div>
      </div>
    </div>
  )
}