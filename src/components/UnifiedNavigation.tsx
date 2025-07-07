'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronDown, Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function UnifiedNavigation() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 300) // 300ms delay before closing
    setDropdownTimeout(timeout)
  }

  const handleDropdownClick = (dropdown: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout)
      }
    }
  }, [dropdownTimeout])

  const navigation = {
    products: [
      { name: 'Revit Prompt Library', href: '/revit-prompts', description: 'Professional AEC prompts for Revit automation' },
      { name: 'Revit Plugin Suite', href: '/revit-plugins', description: 'Essential plugins for AEC workflows' },
      { name: 'AEC Content Generator', href: '/aec-content', description: 'Generate AEC-specific documentation' },
      { name: 'Project Scheduler', href: '/project-scheduler', description: 'Construction project management' },
      { name: 'AI Email Generator', href: '/email-generator', description: 'Professional email automation' },
      { name: 'AI Proposal Generator', href: '/proposals', description: 'Business proposal creation' },
      { name: 'All Tools Dashboard', href: '/dashboard', description: 'Unified control center' }
    ],
    solutions: [
      { name: 'AEC Professionals', href: '/solutions/aec', description: 'Architecture & construction tools' },
      { name: 'Revit Specialists', href: '/solutions/revit', description: 'Revit automation & productivity' },
      { name: 'Construction Teams', href: '/solutions/construction', description: 'Project management & coordination' },
      { name: 'Business Tools', href: '/solutions/business', description: 'General business automation' }
    ],
    resources: [
      { name: 'Blog', href: '/blog', description: 'AI insights and best practices' },
      { name: 'Case Studies', href: '/case-studies', description: 'Customer success stories' },
      { name: 'API Documentation', href: '/docs', description: 'Developer resources' },
      { name: 'API Explorer', href: '/api-explorer', description: 'Test and explore our APIs' },
      { name: 'Support Center', href: '/support', description: 'Help and guidance' }
    ],
    company: [
      { name: 'About Us', href: '/about', description: 'Our mission and team' },
      { name: 'Careers', href: '/careers', description: 'Join our team' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
      { name: 'Security', href: '/security', description: 'Security and compliance' }
    ]
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/revitprompt-logo.png"
              alt="RevitPrompt Lab"
              width={40}
              height={32}
              className="w-10 h-8"
            />
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">RevitPrompt Lab</span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">AEC AI Tools & Prompts</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('products')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                onClick={() => handleDropdownClick('products')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'products' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-4 z-50"
                  onMouseEnter={() => handleDropdownEnter('products')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="px-4 pb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AEC AI Tools</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Professional tools for Architecture, Engineering & Construction</p>
                  </div>
                  {navigation.products.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('solutions')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                onClick={() => handleDropdownClick('solutions')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'solutions' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-4 z-50"
                  onMouseEnter={() => handleDropdownEnter('solutions')}
                  onMouseLeave={handleDropdownLeave}
                >
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Single Links */}
            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('resources')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                onClick={() => handleDropdownClick('resources')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'resources' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-4 z-50"
                  onMouseEnter={() => handleDropdownEnter('resources')}
                  onMouseLeave={handleDropdownLeave}
                >
                  {navigation.resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                onClick={() => handleDropdownClick('company')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span>Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'company' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-4 z-50"
                  onMouseEnter={() => handleDropdownEnter('company')}
                  onMouseLeave={handleDropdownLeave}
                >
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link 
              href="/login" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Products</h3>
              <div className="space-y-2">
                {navigation.products.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Solutions</h3>
              <div className="space-y-2">
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/pricing" 
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-3">
                <Link 
                  href="/login" 
                  className="block w-full text-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/dashboard" 
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}