'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, BarChart3, Share2, Moon, Sun, Clock, TrendingUp, Users, Send, CheckCircle2, Circle, Plus, Edit3, Trash2, User, Target, Zap, Timer, AlertCircle, Filter, Search } from 'lucide-react'
import Chatbot from '@/components/Chatbot'

export default function TaskManagerPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [selectedAssignee, setSelectedAssignee] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [createdTask, setCreatedTask] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const businessTypes = [
    'Software Development', 'Marketing Agency', 'Design Studio', 'Consulting Firm', 'E-commerce Business',
    'Real Estate', 'Healthcare', 'Education', 'Finance', 'Manufacturing', 'Construction', 'Retail',
    'Restaurant/Food Service', 'Professional Services', 'Non-profit', 'Technology Startup', 'SaaS Company',
    'Digital Agency', 'Content Creation', 'Media Production', 'Legal Services', 'Architecture Firm'
  ]

  const priorities = [
    { id: 'urgent', name: 'Urgent', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900' },
    { id: 'high', name: 'High', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900' },
    { id: 'low', name: 'Low', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900' }
  ]

  const teamMembers = [
    { id: 'user1', name: 'John Smith', role: 'Project Manager', avatar: '/api/placeholder/32/32' },
    { id: 'user2', name: 'Sarah Johnson', role: 'Developer', avatar: '/api/placeholder/32/32' },
    { id: 'user3', name: 'Mike Chen', role: 'Designer', avatar: '/api/placeholder/32/32' },
    { id: 'user4', name: 'Emily Davis', role: 'Marketing', avatar: '/api/placeholder/32/32' },
    { id: 'user5', name: 'Alex Brown', role: 'QA Engineer', avatar: '/api/placeholder/32/32' }
  ]

  const taskTemplates = [
    {
      id: 'development',
      title: 'Development Task',
      description: 'Implement new feature or fix bug',
      priority: 'high',
      estimatedHours: 8
    },
    {
      id: 'meeting',
      title: 'Team Meeting',
      description: 'Weekly team standup or project review',
      priority: 'medium',
      estimatedHours: 1
    },
    {
      id: 'research',
      title: 'Research & Analysis',
      description: 'Market research or technical investigation',
      priority: 'medium',
      estimatedHours: 4
    },
    {
      id: 'review',
      title: 'Code Review',
      description: 'Review pull requests or design documents',
      priority: 'high',
      estimatedHours: 2
    }
  ]

  const mockTasks = [
    {
      id: 1,
      title: 'Implement user authentication',
      description: 'Add login/logout functionality with JWT tokens',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: '2024-07-10',
      progress: 65,
      tags: ['frontend', 'backend', 'security']
    },
    {
      id: 2,
      title: 'Design landing page mockups',
      description: 'Create wireframes and high-fidelity designs',
      status: 'completed',
      priority: 'medium',
      assignee: 'Mike Chen',
      dueDate: '2024-07-08',
      progress: 100,
      tags: ['design', 'ui/ux']
    },
    {
      id: 3,
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      status: 'todo',
      priority: 'urgent',
      assignee: 'John Smith',
      dueDate: '2024-07-12',
      progress: 0,
      tags: ['devops', 'automation']
    }
  ]

  const createTask = async () => {
    if (!taskTitle.trim() || !selectedProject || !selectedPriority) return
    
    setIsCreating(true)
    
    try {
      // Import API dynamically to avoid SSR issues
      const { devCraftAPI } = await import('@/lib/api')
      
      const response = await devCraftAPI.generateTask({
        prompt: `${taskTitle}: ${taskDescription}`,
        businessType: selectedProject,
        context: {
          title: taskTitle,
          description: taskDescription,
          priority: selectedPriority,
          assignee: selectedAssignee,
          dueDate: taskDueDate
        }
      })
      
      if (response.success && response.data) {
        const newTask = {
          id: Date.now(),
          title: taskTitle,
          description: taskDescription,
          project: selectedProject,
          priority: selectedPriority,
          assignee: selectedAssignee,
          dueDate: taskDueDate,
          status: 'todo',
          progress: 0,
          createdAt: new Date(),
          estimatedHours: response.data.estimatedHours || Math.floor(Math.random() * 16) + 1,
          tags: [],
          breakdown: response.data.taskBreakdown || [],
          dependencies: response.data.dependencies || [],
          resources: response.data.resources || [],
          riskAssessment: response.data.riskAssessment || [],
          aiGenerated: true
        }
        
        setCreatedTask(newTask)
        setTasks([...tasks, newTask])
      } else {
        throw new Error(response.error || 'Failed to generate task')
      }
      
      setTaskTitle('')
      setTaskDescription('')
      setTaskDueDate('')
      setShowTaskForm(false)
    } catch (error) {
      console.error('Task creation error:', error)
      alert('Error creating task. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900'
      case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900'
      case 'todo': return 'text-gray-600 bg-gray-100 dark:bg-gray-800'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    const p = priorities.find(p => p.id === priority)
    return p ? `${p.color} ${p.bg}` : 'text-gray-500 bg-gray-100 dark:bg-gray-800'
  }

  const filteredTasks = [...mockTasks, ...tasks].filter(task => 
    filterStatus === 'all' || task.status === filterStatus
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium mb-2 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Task Manager</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Intelligent project management with automated workflow optimization</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Productivity</p>
                <p className="text-2xl font-bold text-green-600">+45%</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Creation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Task</h2>
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {showTaskForm && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter task title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Describe the task..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select project type...</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select priority...</option>
                      {priorities.map(priority => (
                        <option key={priority.id} value={priority.id}>{priority.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assign To
                    </label>
                    <select
                      value={selectedAssignee}
                      onChange={(e) => setSelectedAssignee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select team member...</option>
                      {teamMembers.map(member => (
                        <option key={member.id} value={member.name}>{member.name} - {member.role}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={createTask}
                    disabled={isCreating || !taskTitle.trim() || !selectedProject || !selectedPriority}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isCreating ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Create Task</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Task Templates */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Templates</h3>
                <div className="space-y-2">
                  {taskTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setTaskTitle(template.title)
                        setTaskDescription(template.description)
                        setSelectedPriority(template.priority)
                        setShowTaskForm(true)
                      }}
                      className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{template.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
                <div className="flex items-center space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Tasks</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTasks.map(task => (
                  <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-4 h-4" />
                            <span>{task.progress}%</span>
                          </div>
                        </div>
                        {task.progress > 0 && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {createdTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Task Created Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your task "{createdTask.title}" has been created and assigned to the team.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Estimated completion:</strong> {createdTask.estimatedHours} hours</p>
                    <p><strong>AI recommendations:</strong> Automated scheduling optimization applied</p>
                    <p><strong>Resource allocation:</strong> Team capacity analyzed and balanced</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreatedTask(null)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Chatbot pageContext="task-manager" />
    </div>
  )
}