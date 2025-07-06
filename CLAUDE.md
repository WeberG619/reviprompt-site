# DevCraft Labs Website - CLAUDE.md

## Project Overview
DevCraft Labs website - a Next.js 15 application with TypeScript and Tailwind CSS. The site features multiple pages including landing builder, solutions, pricing, and various business pages.

## Project Structure
- **Framework**: Next.js 15.0.0 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with dark mode support
- **Components**: React 18 with Lucide React icons
- **Build Tool**: Next.js built-in bundler

## Available Commands

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### TypeScript Commands
```bash
# Type check without emitting files
npx tsc --noEmit

# Type check with watch mode
npx tsc --noEmit --watch

# Show TypeScript configuration
npx tsc --showConfig
```

### ESLint Commands
```bash
# Run ESLint
npx eslint .

# Run ESLint with auto-fix
npx eslint . --fix

# Run ESLint on specific files
npx eslint src/app/**/*.tsx
```

### Next.js CLI Commands
```bash
# Get Next.js info
npx next info

# Run Next.js in development mode
npx next dev

# Build Next.js application
npx next build

# Start Next.js in production mode
npx next start

# Run Next.js linter
npx next lint
```

## Build & Deploy Process

### Local Development
1. Run `npm run dev` to start development server
2. Make changes to files in `/src` directory
3. TypeScript and ESLint will provide real-time feedback
4. Use `npm run build` to test production build locally

### Production Build
1. Run `npm run build` to create optimized production build
2. TypeScript compilation and linting are automatically run
3. Static page generation occurs for applicable routes
4. Build output is stored in `.next/` directory

### Deployment (Vercel)
- Automatically deploys from git repository
- Runs `npm run build` on deployment
- Serves static files and API routes
- Configured via `vercel.json` if present

## Code Quality Tools

### TypeScript Configuration
- **Target**: ES5 for broad compatibility
- **Strict Mode**: Enabled for type safety
- **Module**: ESNext with bundler resolution
- **JSX**: Preserve (handled by Next.js)
- **Path Mapping**: `@/*` maps to `./src/*`

### ESLint Configuration
- Uses Next.js ESLint configuration
- Includes React and React Hooks rules
- Configured for TypeScript files
- Auto-fixable issues when possible

### Tailwind CSS
- **Dark Mode**: Class-based dark mode support
- **Custom Animations**: gradient-x, float, pulse-slow
- **Content Paths**: Scans `src/` directory for classes
- **Purging**: Automatically removes unused styles

## Key Directories
- `/src/app/` - Next.js App Router pages and layouts
- `/src/app/globals.css` - Global styles and Tailwind imports
- `/public/` - Static assets (images, icons)
- `/src/app/solutions/` - Solution-specific pages (AEC, AI Business, Developer)

## Development Notes
- Uses App Router (not Pages Router)
- All pages are in `/src/app/` directory
- TypeScript strict mode enabled
- Tailwind CSS with custom animations
- Lucide React for icons
- No additional state management library

## Common Issues & Solutions
- **TypeScript Errors**: Run `npx tsc --noEmit` to check types
- **Build Failures**: Often due to TypeScript errors or missing dependencies
- **Styling Issues**: Check Tailwind class names and dark mode variants
- **Performance**: Use Next.js Image component for optimized images