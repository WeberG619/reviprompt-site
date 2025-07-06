# DevCraft Labs Website - Technical Architecture

## 🏗️ System Overview

### Technology Stack
- **Frontend**: Next.js 15.0.0 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Icons**: Lucide React
- **Deployment**: Vercel
- **API**: Custom DevCraft API with fallback mocks

## 📁 Project Structure

```
devcraft-labs-website/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles and Tailwind
│   │   ├── error.tsx           # Global error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   ├── about/              # About page
│   │   ├── pricing/            # Pricing page
│   │   ├── contact/            # Contact page
│   │   ├── solutions/          # Solution pages
│   │   │   ├── ai-business/    # AI Business tools
│   │   │   ├── developer/      # Developer platform
│   │   │   ├── aec/           # AEC solutions
│   │   │   ├── consulting/     # Consulting services
│   │   │   ├── marketing/      # Marketing tools
│   │   │   └── software/       # Software development
│   │   ├── landing-builder/    # Product pages
│   │   ├── social-scheduler/
│   │   ├── task-manager/
│   │   ├── proposals/
│   │   ├── content/
│   │   ├── dashboard/
│   │   ├── docs/              # Documentation
│   │   ├── api-explorer/      # API testing interface
│   │   ├── support/           # Support center
│   │   ├── privacy/           # Legal pages
│   │   ├── terms/
│   │   ├── security/
│   │   ├── gdpr/
│   │   ├── cookies/
│   │   ├── careers/
│   │   ├── case-studies/
│   │   ├── blog/
│   │   └── checkout/          # Payment processing
│   ├── components/            # Reusable React components
│   │   ├── UnifiedNavigation.tsx  # Main navigation
│   │   ├── ErrorBoundary.tsx      # Error handling
│   │   └── Chatbot.tsx            # Chat widget
│   └── lib/                   # Utility libraries
│       └── api.ts             # API integration layer
├── public/                    # Static assets
│   ├── DCL-logo.png          # Main logo
│   ├── favicon.ico           # Browser favicon
│   ├── favicon.svg           # SVG favicon
│   ├── apple-touch-icon.png  # iOS icon
│   ├── og-image.png          # Open Graph image
│   └── hero-background.png   # Hero section background
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment config
└── documentation/            # Project documentation
    ├── CLAUDE.md
    ├── IMPLEMENTATION.md
    ├── FEATURES.md
    ├── ARCHITECTURE.md (this file)
    ├── DESIGN.md
    ├── DEPLOYMENT.md
    ├── TROUBLESHOOTING.md
    └── CHANGELOG.md
```

## 🔧 Configuration Details

### Next.js Configuration (`next.config.js`)
```javascript
const nextConfig = {
  // Clean build configuration (removed ignore flags)
  trailingSlash: false,
  generateBuildId: () => 'build',
}
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["dom", "dom.iterable", "ES6"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "baseUrl": ".",
    "paths": {"@/*": ["./src/*"]},
    "strict": true
  }
}
```

### Tailwind Configuration (`tailwind.config.js`)
```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animations: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  }
}
```

## 🎨 Design System Architecture

### Color System
```css
:root {
  --color-primary: #1E40AF;      /* Blue 700 */
  --color-primary-hover: #1D4ED8; /* Blue 600 */
  --color-secondary: #6B7280;    /* Gray 500 */
  --color-success: #10B981;      /* Emerald 500 */
  --color-warning: #F59E0B;      /* Amber 500 */
  --color-error: #EF4444;        /* Red 500 */
}
```

### Typography Scale
- **Headings**: text-6xl, text-5xl, text-4xl, text-3xl, text-2xl, text-xl
- **Body Text**: text-base, text-lg
- **Small Text**: text-sm, text-xs
- **Font Family**: Inter (Google Fonts)

### Spacing System
- **Consistent Scale**: 4px base unit (Tailwind default)
- **Common Patterns**: p-4, p-6, p-8, p-12, p-16, p-24
- **Container**: max-w-7xl mx-auto px-6 lg:px-8

## 🔌 API Architecture

### DevCraft API Integration (`/src/lib/api.ts`)

#### API Base Configuration
```typescript
export const DEVCRAFT_API_BASE = 'https://devcraft-labs-api.vercel.app'

interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

#### Request Handling
```typescript
class DevCraftAPI {
  private async makeRequest<T>(endpoint: string, data: any): Promise<APIResponse<T>> {
    // Timeout control (10 seconds)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    try {
      const response = await fetch(`${DEVCRAFT_API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Client': 'devcraft-labs-website'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })
      
      // Error handling for different status codes
      if (!response.ok) {
        if (response.status === 401) return authErrorResponse
        if (response.status === 429) return rateLimitResponse
        return this.getMockResponse<T>(endpoint, data)
      }
      
      return await response.json()
    } catch (error) {
      // Fallback to mock responses
      return this.getMockResponse<T>(endpoint, data)
    }
  }
}
```

#### Available Endpoints
- **POST /generate** - Content generation (proposals, content, landing pages, social posts, tasks)
- **POST /research** - Topic research and analysis
- **POST /analyze** - Data analysis and insights

#### Mock Response System
- Comprehensive fallback responses for development
- AI-powered mock content generation
- Realistic metrics and data simulation
- Industry-specific content generation

## 🧩 Component Architecture

### UnifiedNavigation Component
```typescript
// Location: /src/components/UnifiedNavigation.tsx
// Features:
// - Responsive design with mobile menu
// - Dark mode toggle
// - Active route highlighting
// - Dropdown menus for solutions
// - CTA buttons and user actions
```

### Error Boundary System
```typescript
// Location: /src/components/ErrorBoundary.tsx
// Features:
// - Global error catching
// - User-friendly error displays
// - Development vs production modes
// - Error reporting integration points
```

### Chatbot Widget
```typescript
// Location: Homepage (/src/app/page.tsx)
// Features:
// - Contextual AI responses
// - Product-specific knowledge
// - Expandable/collapsible interface
// - Message history
// - Typing indicators
```

## 🔄 Data Flow Architecture

### State Management
- **Local State**: React useState for component-level state
- **Theme State**: localStorage + document.documentElement.classList
- **Form State**: Controlled components with validation
- **API State**: Promise-based with error handling

### Event Handling
```typescript
// Navigation events
const handleCategoryFilter = (categoryId: string) => {
  setActiveCategory(categoryId)
  // Filter products based on category
}

// Chat events
const handleSendMessage = () => {
  // Add user message
  // Process with AI
  // Add AI response
}

// Theme events
const handleDarkMode = (enabled: boolean) => {
  setDarkMode(enabled)
  localStorage.setItem('darkMode', enabled.toString())
  document.documentElement.classList.toggle('dark', enabled)
}
```

## 🚀 Performance Architecture

### Rendering Strategy
- **SSG (Static Site Generation)**: Most marketing pages
- **SSR (Server Side Rendering)**: Dynamic content pages
- **CSR (Client Side Rendering)**: Interactive components
- **Force Dynamic**: Pages with real-time data

### Image Optimization
```typescript
// Next.js Image component usage
<Image
  src="/DCL-logo.png"
  alt="DevCraft Labs Logo"
  width={54}
  height={32}
  priority // For above-fold images
/>
```

### Code Splitting
- **Route-based**: Automatic Next.js page splitting
- **Component-based**: Dynamic imports for heavy components
- **Library splitting**: Separate vendor bundles

### Caching Strategy
- **Static Assets**: Long-term caching (1 year)
- **API Responses**: Short-term caching (15 minutes)
- **Images**: WebP conversion and optimization
- **Fonts**: Self-hosted with preload

## 🔐 Security Architecture

### Authentication
```typescript
// API Key management
private apiKey: string | null = null

constructor() {
  this.apiKey = process.env.NEXT_PUBLIC_DEVCRAFT_API_KEY || 'demo-key'
}
```

### Input Validation
- **Form Sanitization**: XSS prevention
- **Type Safety**: TypeScript validation
- **Error Boundaries**: Secure error handling
- **Environment Variables**: Secure configuration

### Security Headers
```javascript
// Vercel deployment security
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}
      ]
    }
  ]
}
```

## 📱 Responsive Architecture

### Breakpoint System
```css
/* Mobile First */
.responsive-grid {
  @apply grid grid-cols-1;        /* Mobile: 1 column */
  @apply md:grid-cols-2;          /* Tablet: 2 columns */
  @apply lg:grid-cols-3;          /* Desktop: 3 columns */
  @apply xl:grid-cols-4;          /* Large: 4 columns */
}
```

### Touch-Friendly Design
- **Minimum Touch Target**: 44px (iOS guidelines)
- **Hover States**: Only on non-touch devices
- **Gesture Support**: Swipe, pinch, tap
- **Keyboard Navigation**: Full accessibility

## 🔍 SEO Architecture

### Metadata Management
```typescript
// Root layout metadata
export const metadata: Metadata = {
  title: 'DevCraft Labs - AI Tools That Actually Work For Your Business',
  description: 'Professional AI tools for businesses, developers, and AEC professionals',
  keywords: 'AI tools, business automation, invoice generator',
  openGraph: {
    title: 'DevCraft Labs - AI Business Automation Tools',
    description: 'AI-powered tools that help businesses work smarter',
    url: 'https://devcraft-labs.com',
    siteName: 'DevCraft Labs',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCraft Labs - AI Tools That Actually Work',
    description: 'Stop doing busy work. Start growing with AI automation tools.',
    images: ['/og-image.png'],
  }
}
```

### Structured Data
- **Organization Schema**: Company information
- **Product Schema**: Tool descriptions
- **Review Schema**: Customer testimonials
- **FAQ Schema**: Common questions

## 🚀 Deployment Architecture

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Environment Management
- **Development**: Local .env.local
- **Staging**: Vercel preview deployments
- **Production**: Vercel production environment
- **API Keys**: Environment-specific configuration

### Build Pipeline
1. **Install Dependencies**: npm install
2. **Type Checking**: TypeScript compilation
3. **Linting**: ESLint validation
4. **Building**: Next.js build process
5. **Optimization**: Asset optimization
6. **Deployment**: Vercel deployment

## 📊 Monitoring Architecture

### Error Tracking
```typescript
// Error boundary integration
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
    // Production: logErrorToService(error)
  }, [error])
}
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: webpack-bundle-analyzer
- **Load Time**: Performance API
- **User Experience**: Real user monitoring

### Analytics Integration Points
- **Page Views**: Route change tracking
- **User Interactions**: Button clicks, form submissions
- **Conversions**: Trial signups, contact forms
- **Performance**: Page load times, error rates