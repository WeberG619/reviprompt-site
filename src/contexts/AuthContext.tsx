'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  isTrialUser?: boolean
  trialExpiresAt?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  startTrial: (email: string) => Promise<void>
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      
      // Check if trial has expired
      if (userData.isTrialUser && userData.trialExpiresAt) {
        const expiryDate = new Date(userData.trialExpiresAt)
        if (expiryDate < new Date()) {
          localStorage.removeItem('user')
          setUser(null)
        } else {
          setUser(userData)
        }
      } else {
        setUser(userData)
      }
    }
    setIsLoading(false)
  }

  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    // For demo purposes, we'll simulate a successful login
    const userData: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isTrialUser: false
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    router.push('/dashboard')
  }

  const startTrial = async (email: string) => {
    // Set trial expiration to 7 days from now
    const trialExpiresAt = new Date()
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 7)
    
    const userData: User = {
      id: 'trial-' + Date.now(),
      email,
      name: email.split('@')[0],
      isTrialUser: true,
      trialExpiresAt: trialExpiresAt.toISOString()
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    router.push('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, startTrial, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}