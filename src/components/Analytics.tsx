'use client'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Google Analytics tracking ID
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Track custom events
export const event = (action: string, {
  event_category,
  event_label,
  value,
}: {
  event_category?: string
  event_label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category,
      event_label,
      value,
    })
  }
}

// Track conversions (signup, purchase, etc.)
export const trackConversion = (conversionType: string, value?: number, currency = 'USD') => {
  event('conversion', {
    event_category: 'conversion',
    event_label: conversionType,
    value,
  })
  
  // Also track as a custom conversion event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: Date.now().toString(),
      value: value || 0,
      currency,
      items: [{
        item_id: conversionType,
        item_name: conversionType,
        category: 'subscription',
        quantity: 1,
        price: value || 0,
      }]
    })
  }
}

// Track product usage
export const trackProductUsage = (productName: string, action: string) => {
  event('product_usage', {
    event_category: 'product',
    event_label: `${productName}_${action}`,
  })
}

// Track signup flow
export const trackSignupStep = (step: string) => {
  event('signup_step', {
    event_category: 'signup_flow',
    event_label: step,
  })
}

// Google Analytics Component
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = pathname + searchParams.toString()
      pageview(url)
    }
  }, [pathname, searchParams])

  if (!GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              // Enhanced ecommerce tracking
              send_page_view: true,
              // Privacy settings
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  )
}

// Hook for easy tracking in components
export function useAnalytics() {
  return {
    trackEvent: event,
    trackConversion,
    trackProductUsage,
    trackSignupStep,
    trackPageView: pageview,
  }
}