# DevCraft Labs Website - Design System & Guidelines

## 🎨 Design Philosophy

### Brand Identity
DevCraft Labs positions itself as a **professional, enterprise-grade AI tools provider** with focus on:
- **Reliability** - Enterprise-level stability and performance
- **Developer-Centric** - Built by developers, for developers
- **Business-Focused** - Practical solutions for real business problems
- **Innovation** - Cutting-edge AI technology with proven results

### Visual Personality
- **Professional** - Clean, sophisticated, trustworthy
- **Technical** - Developer-friendly, code-inspired elements
- **Modern** - Contemporary design with subtle gradients
- **Accessible** - WCAG-compliant, inclusive design

## 🎯 Color System

### Primary Colors
```css
/* Brand Blue */
--blue-50: #eff6ff;
--blue-100: #dbeafe;
--blue-200: #bfdbfe;
--blue-300: #93c5fd;
--blue-400: #60a5fa;
--blue-500: #3b82f6;
--blue-600: #2563eb;  /* Primary Brand Color */
--blue-700: #1d4ed8;
--blue-800: #1e40af;  /* Primary Dark */
--blue-900: #1e3a8a;
```

### Neutral Colors (Gray Scale)
```css
/* Neutral Gray */
--neutral-50: #fafafa;
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;
--neutral-300: #d4d4d4;
--neutral-400: #a3a3a3;
--neutral-500: #737373;
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;
```

### Semantic Colors
```css
/* Success */
--green-500: #10b981;
--green-600: #059669;

/* Warning */
--yellow-500: #f59e0b;
--yellow-600: #d97706;

/* Error */
--red-500: #ef4444;
--red-600: #dc2626;

/* Info */
--blue-500: #3b82f6;
--blue-600: #2563eb;
```

### Usage Guidelines
- **Primary Actions**: Blue-600 (#2563eb)
- **Secondary Actions**: Neutral-200 border with neutral-700 text
- **Success States**: Green-500 (#10b981)
- **Warning States**: Yellow-500 (#f59e0b)
- **Error States**: Red-500 (#ef4444)
- **Text Primary**: Neutral-900 (light) / White (dark)
- **Text Secondary**: Neutral-600 (light) / Neutral-400 (dark)

## ✏️ Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Font Scale
```css
/* Display (Hero Headings) */
.text-6xl { font-size: 3.75rem; line-height: 1; }      /* 60px */
.text-5xl { font-size: 3rem; line-height: 1; }        /* 48px */

/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; } /* 36px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }   /* 24px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; } /* 20px */

/* Body Text */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */
.text-base { font-size: 1rem; line-height: 1.5rem; }   /* 16px */

/* Small Text */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1rem; }    /* 12px */
```

### Font Weights
```css
.font-light { font-weight: 300; }     /* Light */
.font-normal { font-weight: 400; }    /* Regular */
.font-medium { font-weight: 500; }    /* Medium */
.font-semibold { font-weight: 600; }  /* Semibold */
.font-bold { font-weight: 700; }      /* Bold */
```

### Typography Usage
- **Hero Headlines**: text-5xl md:text-6xl font-bold
- **Section Headers**: text-4xl font-bold
- **Card Titles**: text-xl font-semibold
- **Body Text**: text-base leading-relaxed
- **Captions**: text-sm text-neutral-600

## 📐 Spacing System

### Base Unit: 4px (Tailwind Default)
```css
/* Spacing Scale */
.p-1 { padding: 0.25rem; }  /* 4px */
.p-2 { padding: 0.5rem; }   /* 8px */
.p-3 { padding: 0.75rem; }  /* 12px */
.p-4 { padding: 1rem; }     /* 16px */
.p-6 { padding: 1.5rem; }   /* 24px */
.p-8 { padding: 2rem; }     /* 32px */
.p-12 { padding: 3rem; }    /* 48px */
.p-16 { padding: 4rem; }    /* 64px */
.p-24 { padding: 6rem; }    /* 96px */
```

### Common Patterns
- **Container Padding**: px-6 lg:px-8
- **Card Padding**: p-6 lg:p-8
- **Section Spacing**: py-16 lg:py-24
- **Element Spacing**: space-y-4, space-y-6, space-y-8
- **Grid Gaps**: gap-6, gap-8, gap-12

## 🧩 Component Design Patterns

### Button System
```css
/* Primary Button */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 transition-all duration-200 inline-flex items-center space-x-2;
}

/* Ghost Button */
.btn-ghost {
  @apply bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium px-4 py-2 rounded-lg transition-all duration-200;
}
```

### Card Design
```css
.card-base {
  @apply bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 lg:p-8;
}

.card-hover {
  @apply hover:shadow-lg hover:-translate-y-1 transition-all duration-300;
}

.card-glow {
  @apply hover:shadow-2xl hover:shadow-blue-500/10;
}
```

### Status Indicators
```css
.status-live {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400;
}

.status-coming-soon {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400;
}
```

## 🎭 Animation System

### Hover Effects
```css
.hover-lift {
  @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-lg;
}

.glow-on-hover {
  @apply hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300;
}
```

### Custom Animations
```css
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: .8; }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Loading States
```css
.loading-skeleton {
  @apply animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded;
}

.loading-dots {
  @apply animate-bounce;
}
```

## 🌓 Dark Mode Design

### Implementation Strategy
```css
/* Light Mode (Default) */
.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}

/* Dark Mode */
.dark-theme {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border-color: #374151;
}
```

### Color Adjustments
- **Backgrounds**: white → neutral-900
- **Text**: neutral-900 → white
- **Borders**: neutral-200 → neutral-700
- **Cards**: white → neutral-800
- **Shadows**: black/10 → black/30

## 📱 Responsive Design Patterns

### Breakpoint System
```css
/* Mobile First Approach */
.responsive-container {
  @apply w-full px-4;           /* Mobile: 16px padding */
  @apply sm:px-6;               /* Small: 24px padding */
  @apply md:px-8;               /* Medium: 32px padding */
  @apply lg:px-12;              /* Large: 48px padding */
  @apply xl:px-16;              /* Extra Large: 64px padding */
}

/* Grid Responsive Patterns */
.responsive-grid {
  @apply grid grid-cols-1;      /* Mobile: 1 column */
  @apply md:grid-cols-2;        /* Tablet: 2 columns */
  @apply lg:grid-cols-3;        /* Desktop: 3 columns */
  @apply xl:grid-cols-4;        /* Large: 4 columns */
}
```

### Typography Responsive
```css
.responsive-heading {
  @apply text-3xl;              /* Mobile: 30px */
  @apply md:text-4xl;           /* Tablet: 36px */
  @apply lg:text-5xl;           /* Desktop: 48px */
  @apply xl:text-6xl;           /* Large: 60px */
}
```

## 🎨 Visual Elements

### Gradients
```css
/* Brand Gradients */
.gradient-brand {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.gradient-subtle {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Hero Background */
.hero-gradient {
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.95) 0%, 
    rgba(255,255,255,0.85) 50%, 
    rgba(59,130,246,0.1) 100%
  );
}
```

### Shadows
```css
/* Shadow System */
.shadow-subtle { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); }
.shadow-medium { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.shadow-large { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.shadow-glow { box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(59, 130, 246, 0.1); }
```

### Borders
```css
/* Border Radius */
.rounded-subtle { border-radius: 0.375rem; }  /* 6px */
.rounded-medium { border-radius: 0.5rem; }    /* 8px */
.rounded-large { border-radius: 0.75rem; }    /* 12px */
.rounded-xl { border-radius: 0.75rem; }       /* 12px */
```

## 🔤 Icon System

### Lucide React Icons
```typescript
// Common Icons Used
import { 
  ArrowRight,     // CTA buttons, navigation
  CheckCircle,    // Success states, features
  Star,           // Ratings, testimonials
  Code2,          // Developer category
  Building2,      // AEC category
  Briefcase,      // Business category
  Terminal,       // Technical elements
  Zap,            // Performance, speed
  ExternalLink,   // External navigation
  Github,         // Social links
  Mail,           // Contact
  MessageCircle,  // Chat, support
  Bot,            // AI assistant
  X,              // Close, dismiss
  Send,           // Send message
  Home,           // Navigation
  AlertTriangle,  // Warnings, errors
  RefreshCw       // Retry, refresh
} from 'lucide-react'
```

### Icon Usage Guidelines
- **Size**: w-4 h-4 (16px) for inline, w-5 h-5 (20px) for buttons, w-6 h-6 (24px) for headers
- **Color**: Inherit from parent text color
- **Spacing**: mr-2 for left icons, ml-2 for right icons
- **Semantic**: Use appropriate icons for actions and states

## 📐 Layout Patterns

### Container System
```css
.container-base {
  @apply max-w-7xl mx-auto px-6 lg:px-8;
}

.container-narrow {
  @apply max-w-4xl mx-auto px-6 lg:px-8;
}

.container-wide {
  @apply max-w-screen-2xl mx-auto px-6 lg:px-8;
}
```

### Section Layout
```css
.section-padding {
  @apply py-16 lg:py-24;
}

.section-spacing {
  @apply space-y-16 lg:space-y-24;
}
```

### Grid Systems
```css
/* Product Grid */
.product-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

/* Feature Grid */
.feature-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

/* Testimonial Grid */
.testimonial-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
```

## 🎯 User Experience Patterns

### Focus States
```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}
```

### Interactive States
```css
.interactive-element {
  @apply transition-all duration-200 cursor-pointer;
}

.interactive-element:hover {
  @apply scale-105 shadow-lg;
}

.interactive-element:active {
  @apply scale-95;
}
```

### Loading States
```css
.loading-state {
  @apply opacity-50 pointer-events-none;
}

.loading-spinner {
  @apply animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent;
}
```

## 📊 Design Tokens

### Component Tokens
```javascript
const designTokens = {
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
  },
  transition: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  }
}
```

## ✅ Accessibility Guidelines

### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio

### Focus Management
- **Visible Focus**: Clear focus indicators on all interactive elements
- **Focus Order**: Logical tab order through page content
- **Skip Links**: Navigation bypass for screen readers

### Semantic HTML
- **Headings**: Proper heading hierarchy (h1 → h2 → h3)
- **Landmarks**: nav, main, footer, aside elements
- **ARIA Labels**: Descriptive labels for interactive elements
- **Alt Text**: Meaningful descriptions for images

## 🎨 Brand Guidelines

### Logo Usage
- **Primary Logo**: /public/DCL-logo.png
- **Minimum Size**: 32px height
- **Clear Space**: Logo height on all sides
- **Background**: Works on light and dark backgrounds

### Voice & Tone
- **Professional**: Enterprise-focused, reliable
- **Technical**: Developer-friendly, precise
- **Helpful**: Solution-oriented, supportive
- **Confident**: Industry expertise, proven results

### Photography Style
- **Technical**: Code, dashboards, professional tools
- **Business**: Professional environments, team collaboration
- **Clean**: Minimal, focused compositions
- **Modern**: Contemporary styling, good lighting