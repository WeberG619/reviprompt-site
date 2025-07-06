'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to homepage with tools section anchor
    router.push('/#solutions')
  }, [router])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600 mx-auto mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400">Redirecting to AI Tools...</p>
      </div>
    </div>
  )
}