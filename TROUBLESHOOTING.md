# DevCraft Labs Website - Troubleshooting Guide

## 🚨 Common Issues & Solutions

## 🔧 Build Issues

### TypeScript Compilation Errors
**Problem**: Build fails with TypeScript errors
```bash
Error: Type 'string' is not assignable to type 'number'
```

**Solutions**:
```bash
# Check all TypeScript errors
npx tsc --noEmit

# Fix type issues in components
# Check /src/app/**/*.tsx files
# Verify prop types and interfaces

# Common fixes:
# 1. Add proper type annotations
# 2. Fix React component prop types
# 3. Update interface definitions
```

### ESLint Errors
**Problem**: Build fails with linting errors
```bash
Error: react/no-unescaped-entities
```

**Current Known Issues**:
- Quote escaping in multiple files
- `<a>` tag usage instead of Next.js `<Link>`

**Solutions**:
```bash
# Fix quote escaping
# Replace " with &ldquo; and &rdquo;
# Replace ' with &apos;

# Fix navigation links
# Replace <a href="/"> with <Link href="/">
# Import Link from 'next/link'

# Auto-fix available issues
npm run lint -- --fix
```

### Build Performance Issues
**Problem**: Build takes too long or times out
```bash
Build timeout after 10 minutes
```

**Solutions**:
```bash
# Check for infinite loops in components
# Verify useEffect dependencies
# Remove large unused dependencies
# Optimize image sizes

# Test build locally
npm run build
# Monitor build time and output
```

### Missing Dependencies
**Problem**: Module not found errors
```bash
Error: Cannot resolve module 'lucide-react'
```

**Solutions**:
```bash
# Install missing dependencies
npm install lucide-react

# Check package.json for correct versions
# Verify import statements
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🖥️ Development Server Issues

### Port Already in Use
**Problem**: Development server can't start
```bash
Error: Port 3000 is already in use
```

**Solutions**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001

# Or find and kill the process
ps aux | grep node
kill [process_id]
```

### Hot Reload Not Working
**Problem**: Changes don't reflect in browser
```bash
# Clear browser cache
# Restart development server
npm run dev

# Check file paths and imports
# Verify file extensions (.tsx, .ts)
# Check case sensitivity in imports
```

### Memory Issues
**Problem**: Development server crashes with memory errors
```bash
Error: JavaScript heap out of memory
```

**Solutions**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run dev

# Or modify package.json scripts
"dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev"

# Check for memory leaks in components
# Verify useEffect cleanup functions
```

## 🎨 Styling Issues

### Tailwind CSS Not Working
**Problem**: Tailwind classes not applying
```bash
# Check tailwind.config.js content paths
content: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
]

# Verify globals.css imports
@tailwind base;
@tailwind components;
@tailwind utilities;

# Restart development server
npm run dev
```

### Dark Mode Issues
**Problem**: Dark mode toggle not working
```bash
# Check localStorage persistence
# Verify class toggle on documentElement
# Check useEffect dependencies
# Test manually in browser console:
document.documentElement.classList.toggle('dark')
```

### Custom CSS Conflicts
**Problem**: Custom styles not applying
```bash
# Check CSS specificity
# Use !important sparingly
# Verify CSS order in globals.css
# Check for Tailwind purging issues
```

## 🔌 API Issues

### API Connection Failures
**Problem**: API requests failing
```bash
Error: Failed to fetch
```

**Solutions**:
```bash
# Check API base URL
export const DEVCRAFT_API_BASE = 'https://devcraft-labs-api.vercel.app'

# Verify network connectivity
curl https://devcraft-labs-api.vercel.app/health

# Check CORS configuration
# Verify API key in environment variables
echo $NEXT_PUBLIC_DEVCRAFT_API_KEY

# Test with mock responses
# Check fallback logic in api.ts
```

### Timeout Issues
**Problem**: API requests timing out
```bash
# Check timeout configuration in api.ts
const timeoutId = setTimeout(() => controller.abort(), 10000)

# Increase timeout if needed
# Check network conditions
# Verify API server status
```

### Authentication Errors
**Problem**: API authentication failing
```bash
Error: 401 Unauthorized
```

**Solutions**:
```bash
# Check API key configuration
# Verify environment variable names
# Check API key format and validity
# Test with demo-key for development
```

## 🚀 Deployment Issues

### Vercel Build Failures
**Problem**: Deployment fails on Vercel
```bash
# Check build logs in Vercel dashboard
# Test build locally first
npm run build

# Common fixes:
# 1. Fix TypeScript errors
# 2. Resolve ESLint warnings
# 3. Check environment variables
# 4. Verify file paths and imports
```

### Environment Variable Issues
**Problem**: Environment variables not available
```bash
# Verify variable names start with NEXT_PUBLIC_
# Check Vercel dashboard settings
# Redeploy after adding variables
# Test locally with .env.local
```

### Asset Loading Issues
**Problem**: Images or assets not loading
```bash
# Check public folder structure
# Verify asset paths (case-sensitive)
# Test image optimization
# Check Next.js Image component usage
```

### Performance Issues
**Problem**: Site loading slowly
```bash
# Check Core Web Vitals
# Optimize images
# Review bundle size
npm run build
npm run analyze # if analyzer is configured

# Check for render-blocking resources
# Verify caching headers
```

## 🔍 Component-Specific Issues

### Navigation Component
**Problem**: Navigation not working correctly
```bash
# File: /src/components/UnifiedNavigation.tsx
# Check Link imports
# Verify route paths
# Test mobile menu functionality
# Check responsive breakpoints
```

### Chatbot Widget
**Problem**: Chatbot not responding
```bash
# Check useState initialization
# Verify AI response logic
# Test message handling
# Check local storage persistence
```

### Form Components
**Problem**: Forms not submitting
```bash
# Check form validation
# Verify onSubmit handlers
# Test input state management
# Check API endpoint connectivity
```

## 📱 Mobile & Browser Issues

### Mobile Responsiveness
**Problem**: Layout broken on mobile
```bash
# Check viewport meta tag
<meta name="viewport" content="width=device-width, initial-scale=1">

# Test responsive classes
# Use browser dev tools
# Check touch target sizes (minimum 44px)
# Verify mobile navigation
```

### Browser Compatibility
**Problem**: Site not working in specific browsers
```bash
# Check browser support for features
# Verify polyfills if needed
# Test in multiple browsers
# Check console for JavaScript errors
```

### iOS Safari Issues
**Problem**: Specific issues on iOS Safari
```bash
# Check -webkit- prefixes
# Verify touch events
# Test viewport height issues
# Check date/time input compatibility
```

## 🔒 Security Issues

### Content Security Policy
**Problem**: CSP violations
```bash
# Check console for CSP errors
# Verify inline scripts and styles
# Add proper nonce or hash values
# Update CSP headers
```

### HTTPS Issues
**Problem**: Mixed content warnings
```bash
# Ensure all resources use HTTPS
# Check external API URLs
# Verify image sources
# Update any HTTP links to HTTPS
```

## 🧪 Testing Issues

### Component Testing
**Problem**: Tests failing or not running
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Check test file extensions (.test.tsx)
# Verify test setup
# Check import paths
```

### E2E Testing
**Problem**: End-to-end tests failing
```bash
# Check Playwright/Cypress configuration
# Verify test selectors
# Check network conditions
# Update test data
```

## 📊 Performance Debugging

### Memory Leaks
**Problem**: Application consuming too much memory
```bash
# Check React Developer Tools
# Look for unnecessary re-renders
# Verify useEffect cleanup
# Check for event listener cleanup
```

### Bundle Size Issues
**Problem**: Large bundle size
```bash
# Analyze bundle
npm run build
npx @next/bundle-analyzer

# Check for duplicate dependencies
# Remove unused imports
# Implement code splitting
```

### Image Optimization
**Problem**: Images loading slowly
```bash
# Use Next.js Image component
import Image from 'next/image'

# Optimize image sizes
# Convert to WebP format
# Implement lazy loading
```

## 🔧 Development Tools

### VS Code Issues
**Problem**: TypeScript not working in VS Code
```bash
# Reload VS Code window
# Check TypeScript version
# Verify tsconfig.json
# Install TypeScript extension
```

### Git Issues
**Problem**: Git conflicts or issues
```bash
# Resolve merge conflicts
# Check .gitignore file
# Verify file permissions
# Clean working directory
```

## 📋 Debug Checklist

### When encountering any issue:
1. **Check Console**: Browser and terminal console for errors
2. **Verify Environment**: Development vs production environment
3. **Test Locally**: Always test locally before deploying
4. **Check Documentation**: Review relevant documentation files
5. **Clear Cache**: Browser cache, node_modules, .next folder
6. **Restart Services**: Development server, browser, terminal
7. **Check Dependencies**: Package versions and compatibility
8. **Review Recent Changes**: What changed since last working version

### Emergency Debugging
```bash
# Nuclear option - clean everything
rm -rf node_modules .next package-lock.json
npm install
npm run dev

# Check system resources
top
df -h

# Network debugging
ping google.com
curl -I https://devcraft-labs-api.vercel.app
```

## 📞 Getting Help

### Internal Resources
1. **Documentation**: Check all .md files in project root
2. **Git History**: Review recent commits and changes
3. **Issue Tracking**: Check GitHub issues (if applicable)

### External Resources
1. **Next.js Documentation**: https://nextjs.org/docs
2. **Tailwind CSS**: https://tailwindcss.com/docs
3. **TypeScript**: https://www.typescriptlang.org/docs
4. **Vercel Support**: https://vercel.com/docs

### Community Support
1. **Stack Overflow**: Search for specific error messages
2. **GitHub Discussions**: Next.js, Tailwind CSS repositories
3. **Discord/Slack**: Development communities

## 📝 Reporting New Issues

### Issue Template
```
**Description**: Brief description of the issue
**Steps to Reproduce**: 
1. Step one
2. Step two
3. Expected vs actual result

**Environment**:
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Node.js version: [run `node --version`]
- Package versions: [check package.json]

**Error Messages**: 
[Copy paste any error messages]

**Screenshots**: 
[If applicable]

**Additional Context**: 
[Any other relevant information]
```