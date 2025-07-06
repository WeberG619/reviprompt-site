import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'DevCraft Labs - AI Tools That Actually Work For Your Business',
  description: 'Stop doing busy work. Start growing your business with AI tools that handle invoicing, content creation, social media, and customer support automatically.',
  keywords: 'AI tools, business automation, invoice generator, social media management, content creation, customer support, AI software',
  authors: [{ name: 'DevCraft Labs' }],
  openGraph: {
    title: 'DevCraft Labs - AI Business Automation Tools',
    description: 'AI-powered tools that help businesses work smarter with automated invoicing, content creation, and customer support.',
    url: 'https://devcraft-labs.com',
    siteName: 'DevCraft Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevCraft Labs AI Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCraft Labs - AI Tools That Actually Work',
    description: 'Stop doing busy work. Start growing with AI automation tools.',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E40AF" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}