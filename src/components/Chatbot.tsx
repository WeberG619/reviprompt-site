'use client'
import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatbotProps {
  pageContext?: string
}

export default function Chatbot({ pageContext = 'general' }: ChatbotProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // Page-specific responses
    if (pageContext === 'proposals') {
      if (lowerMessage.includes('proposal') || lowerMessage.includes('generate') || lowerMessage.includes('business')) {
        return "I can help you create professional proposals! Our AI Proposal Generator supports 30+ business types including Software Development, Consulting, Real Estate, and more. It includes executive summaries, timeline planning, budget estimates, and industry-specific templates. What type of proposal are you looking to create?"
      }
      if (lowerMessage.includes('download') || lowerMessage.includes('pdf') || lowerMessage.includes('send')) {
        return "After generating your proposal, you can download it as a PDF, send it directly to your client, or save it for future use. The AI optimizes formatting for professional presentation and includes all necessary sections like scope, timeline, and budget."
      }
    }
    
    if (pageContext === 'content') {
      if (lowerMessage.includes('content') || lowerMessage.includes('blog') || lowerMessage.includes('social')) {
        return "Our AI Content Generator creates high-quality content in 6 formats: blog posts, social media posts, marketing copy, product descriptions, email newsletters, and press releases. It supports 30+ audience types and 10 different tones. What type of content do you need?"
      }
      if (lowerMessage.includes('seo') || lowerMessage.includes('optimization') || lowerMessage.includes('marketing')) {
        return "Yes! Our content generator includes SEO optimization, brand voice consistency, and marketing-focused copy. It can create content tailored to your specific audience and optimized for search engines and social media engagement."
      }
    }
    
    if (pageContext === 'landing-builder') {
      if (lowerMessage.includes('landing') || lowerMessage.includes('page') || lowerMessage.includes('conversion')) {
        return "Our AI Landing Page Builder creates high-converting pages for 30+ industries! It includes template libraries, A/B testing suggestions, analytics integration, and mobile-responsive designs. Users see average conversion rate improvements of 60%+. What industry are you in?"
      }
      if (lowerMessage.includes('template') || lowerMessage.includes('design') || lowerMessage.includes('mobile')) {
        return "We offer 50+ professionally designed templates that are fully mobile-responsive. Each template is optimized for conversion with strategic placement of CTAs, headlines, and social proof elements. All templates load in under 2 seconds for optimal performance."
      }
    }
    
    if (pageContext === 'social-scheduler') {
      if (lowerMessage.includes('social') || lowerMessage.includes('schedule') || lowerMessage.includes('platform')) {
        return "Our AI Social Scheduler supports 12+ platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, YouTube, Pinterest, and Discord. It includes content optimization, engagement predictions, and multi-platform posting. Users see 35% higher engagement rates on average."
      }
      if (lowerMessage.includes('engagement') || lowerMessage.includes('analytics') || lowerMessage.includes('optimization')) {
        return "The scheduler includes AI-powered content optimization that analyzes your audience, suggests optimal posting times, and predicts engagement rates. You get detailed analytics on reach, engagement, and performance across all platforms."
      }
    }
    
    if (pageContext === 'task-manager') {
      if (lowerMessage.includes('task') || lowerMessage.includes('project') || lowerMessage.includes('team')) {
        return "Our AI Task Manager offers smart scheduling, team collaboration, progress tracking, and resource allocation. It supports 22+ business types and automatically optimizes workflows for 45% better productivity. Users report 3x faster project completion with 80% automation."
      }
      if (lowerMessage.includes('collaboration') || lowerMessage.includes('schedule') || lowerMessage.includes('productivity')) {
        return "The AI automatically schedules tasks based on team availability, project priorities, and resource constraints. It includes real-time collaboration features, automated progress tracking, and smart notifications to keep projects on track."
      }
    }
    
    // General responses
    if (lowerMessage.includes('api') || lowerMessage.includes('documentation') || lowerMessage.includes('docs')) {
      return "Our API documentation is comprehensive and includes real examples from all our AI tools. You can access it at /docs with authentication examples, rate limits, and webhooks. All tools connect to our ReviPrompt Lab API at revipromptlab-api.vercel.app. Need an API key? I can guide you through the setup process!"
    }
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "We offer flexible pricing for all three solution categories: AI Business Tools (starting at $29/mo), Developer Platform ($49/mo), and AEC Solutions ($79/mo). All plans include API access, 24/7 support, and enterprise security. Check out /pricing for detailed comparisons and features!"
    }
    
    if (lowerMessage.includes('invoice') || lowerMessage.includes('billing')) {
      return "Our AI Invoice Generator is live and trusted by 2.1k+ users! It features automated payment tracking, smart reminders, AI-powered descriptions, and real-time analytics. You can try it free at ai-portfolio-saas.vercel.app with 99.7% accuracy and saves 15hrs/week on average."
    }
    
    if (lowerMessage.includes('revit') || lowerMessage.includes('aec') || lowerMessage.includes('architecture')) {
      return "ReviPrompt Lab Professional is our AEC solution trusted by 500+ users. It includes AI-powered prompts, sheet setup automation, MEP coordination tools, and IBC/ADA compliance features. Available with live Stripe payment at revipromptlab.com with 6 professional prompt packs!"
    }
    
    if (lowerMessage.includes('security') || lowerMessage.includes('enterprise')) {
      return "We provide enterprise-grade security with 99.9% uptime SLA, 24/7 support, API key authentication, webhook signature verification, and SOC 2 compliance. All data is encrypted in transit and at rest. Check /security for our complete security documentation."
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return "We offer multiple support channels: 24/7 chat support, email at support@revipromptlab.com, comprehensive documentation at /docs, and enterprise support for pro plans. You can also visit /contact for direct access to our team or schedule a demo call!"
    }
    
    if (lowerMessage.includes('start') || lowerMessage.includes('get started') || lowerMessage.includes('trial')) {
      return "Getting started is easy! For AI Business Tools, try our tools directly on this page. For API access, check /docs for authentication. For AEC tools, visit revipromptlab.com. Want a personalized demo? I can help you schedule one!"
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to ReviPrompt Lab! I'm here to help you with any questions about our AI tools, pricing, API integration, or getting started. Our tools are designed to be intelligent and connected to real-time data. What would you like to know?"
    }
    
    return "I can help you with information about our AI tools, pricing, API documentation, security, support, or getting started. All our tools are AI-powered and can research current information online to provide the best results. Try asking about specific features, pricing, or how to get started. What would you like to know more about?"
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMessage = { text: chatInput, isUser: true, timestamp: new Date() }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)
    
    setTimeout(() => {
      const aiResponse = getAIResponse(chatInput)
      const botMessage = { text: aiResponse, isUser: false, timestamp: new Date() }
      setChatMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-neutral-900 dark:text-white">ReviPrompt AI Assistant</span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 dark:bg-neutral-700 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </>
  )
}