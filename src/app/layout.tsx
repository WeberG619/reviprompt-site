import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'RevitPrompt Lab - AI Tools & Prompts for AEC Professionals',
  description: 'Professional AI tools and prompts for Architecture, Engineering & Construction. Revit automation, project management, and AEC-specific content generation.',
  keywords: 'Revit automation, AEC tools, architecture AI, construction management, engineering software, Revit prompts, BIM automation, AEC productivity',
  authors: [{ name: 'RevitPrompt Lab' }],
  openGraph: {
    title: 'RevitPrompt Lab - AEC AI Tools & Revit Automation',
    description: 'Professional AI tools and prompts designed specifically for Architecture, Engineering & Construction professionals.',
    url: 'https://revipromptlab.com',
    siteName: 'RevitPrompt Lab',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RevitPrompt Lab AEC Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RevitPrompt Lab - AEC AI Tools & Prompts',
    description: 'Professional AI tools for Architecture, Engineering & Construction.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1E40AF" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}