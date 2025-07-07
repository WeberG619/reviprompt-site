'use client'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle, Download, Star, Search, Filter, Copy, BookOpen } from 'lucide-react'
import { useState } from 'react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function RevitPromptsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const promptCategories = [
    { id: 'all', name: 'All Prompts', count: 500 },
    { id: 'architectural', name: 'Architectural', count: 150 },
    { id: 'structural', name: 'Structural', count: 120 },
    { id: 'mep', name: 'MEP Systems', count: 130 },
    { id: 'documentation', name: 'Documentation', count: 100 }
  ]

  const featuredPrompts = [
    {
      id: 1,
      title: "MEP Coordination Setup",
      description: "Set up MEP coordination workflows with automated clash detection and resolution protocols",
      category: "mep",
      complexity: "Advanced",
      downloads: 2400,
      rating: 4.9,
      content: "Create a comprehensive MEP coordination model with automated clash detection between architectural, structural, and MEP systems...",
      tags: ["MEP", "Coordination", "Clash Detection", "Automation"]
    },
    {
      id: 2,
      title: "Architectural Sheet Setup",
      description: "Automated architectural drawing sheet creation with standard titleblocks and view placement",
      category: "architectural",
      complexity: "Intermediate",
      downloads: 3200,
      rating: 4.8,
      content: "Generate architectural drawing sheets with automated view placement, standard titleblocks, and consistent formatting...",
      tags: ["Sheets", "Architecture", "Documentation", "Standards"]
    },
    {
      id: 3,
      title: "Structural Framing Analysis",
      description: "Generate structural framing with material optimization and load analysis integration",
      category: "structural",
      complexity: "Advanced",
      downloads: 1800,
      rating: 4.7,
      content: "Create optimized structural framing systems with automated material selection and load path analysis...",
      tags: ["Structural", "Framing", "Analysis", "Optimization"]
    },
    {
      id: 4,
      title: "Family Parameter Setup",
      description: "Standardized family parameter creation with type catalogs and shared parameters",
      category: "architectural",
      complexity: "Beginner",
      downloads: 4100,
      rating: 4.9,
      content: "Set up family parameters with standardized naming conventions, type catalogs, and shared parameter integration...",
      tags: ["Families", "Parameters", "Standards", "Templates"]
    },
    {
      id: 5,
      title: "Project Documentation",
      description: "Comprehensive project documentation with schedules, legends, and specification integration",
      category: "documentation",
      complexity: "Intermediate",
      downloads: 2800,
      rating: 4.8,
      content: "Generate complete project documentation including schedules, room legends, door/window schedules...",
      tags: ["Documentation", "Schedules", "Legends", "Specifications"]
    },
    {
      id: 6,
      title: "Quality Control Checklist",
      description: "Automated quality control checks for model accuracy and standard compliance",
      category: "documentation",
      complexity: "Advanced",
      downloads: 1500,
      rating: 4.6,
      content: "Implement comprehensive quality control workflows with automated checks for modeling standards...",
      tags: ["Quality Control", "Standards", "Automation", "Compliance"]
    }
  ]

  const filteredPrompts = featuredPrompts.filter(prompt => {
    const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // Could add toast notification here
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <BookOpen className="w-4 h-4 mr-2" />
                500+ Professional Prompts
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Revit Prompt Library
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
              Professional AI prompts designed specifically for Revit workflows. Accelerate your AEC projects with 
              tested, industry-standard prompts for architecture, engineering, and construction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pricing?plan=revit-professional" 
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Get Full Library</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#browse" 
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Browse Prompts</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Professional Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25hrs</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Saved per Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3.2k+</div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Section */}
      <section id="browse" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Browse Professional Prompts
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Find the perfect prompt for your AEC project needs
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {promptCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                      {prompt.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                      {prompt.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prompt.content)}
                    className="p-2 text-neutral-400 hover:text-blue-600 transition-colors"
                    title="Copy prompt"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{prompt.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{prompt.downloads.toLocaleString()}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    prompt.complexity === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    prompt.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {prompt.complexity}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {prompt.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Use Prompt
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Revit Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get instant access to our complete library of 500+ professional AEC prompts and save 25+ hours per week.
          </p>
          <Link 
            href="/pricing?plan=revit-professional" 
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <span>Get Full Access</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}