'use client'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle, Download, Star, Search, Filter, Settings, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import UnifiedNavigation from '@/components/UnifiedNavigation'

export default function RevitPluginsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const pluginCategories = [
    { id: 'all', name: 'All Plugins', count: 12 },
    { id: 'productivity', name: 'Productivity', count: 4 },
    { id: 'mep', name: 'MEP Tools', count: 3 },
    { id: 'documentation', name: 'Documentation', count: 3 },
    { id: 'quality', name: 'Quality Control', count: 2 }
  ]

  const plugins = [
    {
      id: 1,
      name: "MEP Coordination Pro",
      description: "Advanced MEP coordination tools with automated clash detection and resolution workflows",
      category: "mep",
      version: "2.1.4",
      compatibility: ["Revit 2024", "Revit 2025", "Revit 2026"],
      downloads: 5400,
      rating: 4.9,
      features: [
        "Automated clash detection",
        "MEP routing optimization", 
        "Coordination reports",
        "Multi-discipline workflows"
      ],
      price: "Included",
      icon: <Settings className="w-8 h-8" />
    },
    {
      id: 2,
      name: "Sheet Manager Suite",
      description: "Comprehensive sheet management with automated titleblocks, view placement, and revision tracking",
      category: "documentation",
      version: "1.8.2",
      compatibility: ["Revit 2024", "Revit 2025", "Revit 2026"],
      downloads: 7200,
      rating: 4.8,
      features: [
        "Automated sheet creation",
        "View placement automation",
        "Revision tracking",
        "Titleblock management"
      ],
      price: "Included",
      icon: <Building2 className="w-8 h-8" />
    },
    {
      id: 3,
      name: "Family Automation Tools",
      description: "Streamline family creation with parameter automation and standardized workflows",
      category: "productivity",
      version: "3.0.1",
      compatibility: ["Revit 2024", "Revit 2025", "Revit 2026"],
      downloads: 4800,
      rating: 4.7,
      features: [
        "Parameter automation",
        "Family templates",
        "Type catalog generation",
        "Shared parameter management"
      ],
      price: "Included",
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 4,
      name: "Quality Control Dashboard",
      description: "Comprehensive model checking with automated quality control reports and standards compliance",
      category: "quality",
      version: "2.3.0",
      compatibility: ["Revit 2024", "Revit 2025", "Revit 2026"],
      downloads: 3600,
      rating: 4.9,
      features: [
        "Model health checks",
        "Standards compliance",
        "Automated reporting",
        "Issue tracking"
      ],
      price: "Included",
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 5,
      name: "Project Setup Wizard",
      description: "Automated project setup with templates, standards, and team collaboration configuration",
      category: "productivity",
      version: "1.5.3",
      compatibility: ["Revit 2024", "Revit 2025", "Revit 2026"],
      downloads: 6100,
      rating: 4.8,
      features: [
        "Project templates",
        "Team setup automation",
        "Standards configuration",
        "Workflow initialization"
      ],
      price: "Included",
      icon: <Settings className="w-8 h-8" />
    },
    {
      id: 6,
      name: "Schedule Generator Pro",
      description: "Advanced scheduling tools with custom templates and automated quantity takeoffs",
      category: "documentation",
      version: "2.0.8",
      compatibility: ["Revit 2024", "Revit 2025", "Revit 2026"],
      downloads: 4200,
      rating: 4.6,
      features: [
        "Custom schedule templates",
        "Quantity takeoffs",
        "Material calculations",
        "Export automation"
      ],
      price: "Included",
      icon: <Building2 className="w-8 h-8" />
    }
  ]

  const filteredPlugins = activeCategory === 'all' 
    ? plugins 
    : plugins.filter(plugin => plugin.category === activeCategory)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <UnifiedNavigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <Settings className="w-4 h-4 mr-2" />
                12+ Essential Plugins
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Revit Plugin Suite
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
              Essential Revit plugins designed to enhance productivity, streamline workflows, and improve project delivery. 
              Compatible with Revit 2024, 2025, and 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pricing?plan=revit-professional" 
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Suite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#plugins" 
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Browse Plugins</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Why Choose Our Plugin Suite?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Built by AEC professionals for AEC professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">40% Faster Workflows</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Automate repetitive tasks and focus on design</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Enterprise Security</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Tested and approved for enterprise deployment</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Multi-Version Support</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Compatible with Revit 2024, 2025, and 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plugins Section */}
      <section id="plugins" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Professional Plugin Collection
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Essential tools for every AEC professional
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {pluginCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Plugins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlugins.map((plugin) => (
              <div key={plugin.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    {plugin.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
                      {plugin.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Version {plugin.version}
                    </p>
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {plugin.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {plugin.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Compatibility:</h4>
                  <div className="flex flex-wrap gap-1">
                    {plugin.compatibility.map((version, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded">
                        {version}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{plugin.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{plugin.downloads.toLocaleString()}</span>
                  </div>
                  <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded">
                    {plugin.price}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Download Plugin
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Easy Installation
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Get up and running in minutes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Download</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Download the plugin installer from your dashboard</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Install</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Run the installer and follow the setup wizard</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Activate</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Launch Revit and activate your plugins</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Supercharge Your Revit Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get instant access to our complete plugin suite and boost your productivity by 40%.
          </p>
          <Link 
            href="/pricing?plan=revit-professional" 
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <span>Get Plugin Suite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}