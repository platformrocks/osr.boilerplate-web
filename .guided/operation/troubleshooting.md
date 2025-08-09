# Troubleshooting Guide

Comprehensive troubleshooting guide for Career Topologies v1 development, deployment, and operational issues.

## Quick Reference

### Emergency Contacts

- **Project Lead**: Open Source Rocks Team
- **Repository**: https://github.com/platformrocks/osr.boilerplate-web

### System Status Check

```bash
# Quick health check commands
node --version    # Should be >= 18.0.0
pnpm --version    # Should be >= 10.0.0
git status        # Check repository state
pnpm dev          # Test development server
```

## Development Environment Issues

### 1. Installation & Setup Problems

#### Problem: `pnpm install` fails

**Symptoms:**

- Installation hangs or fails with network errors
- Permission errors on Windows
- Dependency resolution conflicts

**Solutions:**

```bash
# Solution 1: Clear pnpm cache
pnpm store prune

# Solution 2: Delete lock file and reinstall
rm pnpm-lock.yaml
rm -rf node_modules
pnpm install

# Solution 4: Check Node.js version compatibility
node --version  # Must be >= 18.0.0
```

#### Problem: TypeScript compilation errors after setup

**Symptoms:**

- Red squiggly lines in VS Code
- `tsc` command fails
- Import errors for local modules

**Solutions:**

```bash
# Solution 1: Restart TypeScript server in VS Code
# Command Palette (Ctrl+Shift+P) -> "TypeScript: Restart TS Server"

# Solution 2: Verify tsconfig.json paths
cat tsconfig.json | grep "paths"
# Should show: "@/*": ["./src/*"]

# Solution 3: Clear TypeScript cache
rm -rf .next
rm tsconfig.tsbuildinfo
pnpm dev

# Solution 4: Check for duplicate type definitions
pnpm ls @types/react  # Should only show one version
```

### 2. Development Server Issues

#### Problem: Development server won't start

**Symptoms:**

- `pnpm dev` hangs or fails
- Port 3000 already in use
- Module not found errors

**Solutions:**

```bash
# Solution 1: Kill process on port 3000
npx kill-port 3000
# or manually find and kill:
netstat -ano | findstr :3000  # Windows
lsof -ti:3000 | xargs kill    # macOS/Linux

# Solution 2: Use different port
pnpm dev -- --port 3001

# Solution 3: Check for file system issues
# On Windows, ensure proper line endings:
git config core.autocrlf true

# Solution 4: Clear Next.js cache
rm -rf .next
pnpm dev
```

#### Problem: Hot reload not working

**Symptoms:**

- Changes don't reflect in browser
- Manual refresh required
- Development server disconnects

**Solutions:**

```bash
# Solution 1: Check file watching limits (Linux/macOS)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Solution 2: Restart development server
# Stop with Ctrl+C, then:
pnpm dev

# Solution 3: Check for file permission issues
# Ensure files are not read-only
chmod -R 755 src/

# Solution 4: Browser cache issues
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS)
```

## Build & Deployment Issues

### 1. Build Failures

#### Problem: Production build fails

**Symptoms:**

- `pnpm build` exits with errors
- TypeScript compilation errors
- Missing dependencies

**Solutions:**

```bash
# Solution 1: Check for TypeScript errors
pnpm type-check
# Fix all TypeScript errors before building

# Solution 2: Clear build cache
rm -rf .next
rm -rf out
pnpm build

# Solution 3: Check for environment variable issues
# Ensure all NEXT_PUBLIC_* variables are set
echo $NEXT_PUBLIC_APP_URL

# Solution 4: Check for import/export issues
# Look for:
# - Circular imports
# - Missing default exports
# - Case sensitivity in file names
```

#### Problem: Build succeeds but pages don't load

**Symptoms:**

- Build completes successfully
- Runtime errors in production
- Blank pages or 404 errors

**Solutions:**

```bash
# Solution 1: Test production build locally
pnpm build
pnpm start
# Navigate to http://localhost:3000

# Solution 2: Check for dynamic imports issues
# Ensure all dynamic imports have proper error handling

# Solution 3: Verify static export configuration
# If using static export, check next.config.ts:
# output: 'export' should be set correctly

# Solution 4: Check browser console for errors
# Open DevTools and check for JavaScript errors
```

### 2. Performance Issues

#### Problem: Slow build times

**Symptoms:**

- `pnpm build` takes > 2 minutes
- High CPU usage during build
- Memory issues during compilation

**Solutions:**

```bash
# Solution 1: Analyze bundle size
ANALYZE=true pnpm build
# Check for unexpectedly large dependencies

# Solution 2: Optimize TypeScript compilation
# In tsconfig.json, ensure:
# "incremental": true
# "skipLibCheck": true (for faster builds)

# Solution 3: Check for large assets
find public/ -size +1M  # Find files > 1MB
# Optimize large images and assets

# Solution 4: Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

#### Problem: Large bundle size

**Symptoms:**

- Bundle size > 1MB gzipped
- Slow initial page load
- Poor Lighthouse performance scores

**Solutions:**

```bash
# Solution 1: Analyze bundle composition
ANALYZE=true pnpm build
# Identify largest contributors

# Solution 2: Implement code splitting
# Use dynamic imports for large components:
const HeavyComponent = dynamic(() => import('./HeavyComponent'))

# Solution 3: Optimize imports
# Use specific imports instead of full library:
import { Button } from '@/components/ui/button'  # ✅
import * from '@/components/ui'                  # ❌

# Solution 4: Remove unused dependencies
pnpm ls --depth=0  # List all dependencies
# Remove unused packages from package.json
```

## Internationalization Issues

### 1. Translation Problems

#### Problem: Missing translations or errors

**Symptoms:**

- Translation keys showing instead of text
- Console errors about missing keys
- Incorrect locale routing

**Solutions:**

```bash
# Solution 1: Verify message files exist
ls src/i18n/messages/
# Should show: en-US.json, es-ES.json, pt-BR.json

# Solution 2: Check JSON syntax
node -e "console.log(JSON.parse(require('fs').readFileSync('src/i18n/messages/en-US.json')))"

# Solution 3: Verify translation key structure
# Keys should match across all locale files

# Solution 4: Check next-intl configuration
# Verify src/i18n/routing.ts has correct locales array
```

#### Problem: Locale routing not working

**Symptoms:**

- URLs don't change with locale
- Language switcher not functional
- Default locale not applying

**Solutions:**

```bash
# Solution 1: Check middleware configuration
cat src/middleware.ts
# Should contain proper locale routing logic

# Solution 2: Verify routing configuration
cat src/i18n/routing.ts
# Check locales array and defaultLocale setting

# Solution 3: Test locale routing manually
# Navigate to:
# http://localhost:3000/en-US
# http://localhost:3000/es-ES
# http://localhost:3000/pt-BR

# Solution 4: Check browser language settings
# Clear browser cache and test with different Accept-Language headers
```

## Component & UI Issues

### 1. Styling Problems

#### Problem: Tailwind classes not applying

**Symptoms:**

- Styles not visible in browser
- Tailwind classes showing as plain text
- Components look unstyled

**Solutions:**

```bash
# Solution 1: Verify Tailwind CSS is loaded
# Check browser DevTools -> Network tab for CSS files
# Should see styles with Tailwind utilities

# Solution 2: Check PostCSS configuration
cat postcss.config.mjs
# Should contain @tailwindcss/postcss plugin

# Solution 3: Restart development server
# Tailwind sometimes needs restart after config changes
pnpm dev

# Solution 4: Check for CSS conflicts
# Look for CSS files that might override Tailwind
# Check specificity issues in browser DevTools
```

#### Problem: Component props not working

**Symptoms:**

- Props not affecting component appearance
- TypeScript errors on component usage
- Default props not applying

**Solutions:**

```bash
# Solution 1: Check prop interface definition
# Verify component props interface matches usage

# Solution 2: Verify prop forwarding
# Check if component properly uses props:
const Component = ({ variant, ...props }: ComponentProps) => {
  // Ensure props are used correctly
}

# Solution 3: Check default prop values
# Ensure default props are set correctly:
const { variant = 'default' } = props;

# Solution 4: Test component in isolation
# Create minimal test page to isolate component issues
```

### 2. Accessibility Issues

#### Problem: Keyboard navigation not working

**Symptoms:**

- Tab key doesn't navigate properly
- Focus indicators not visible
- Interactive elements not focusable

**Solutions:**

```bash
# Solution 1: Check tabIndex attributes
# Ensure proper tabIndex values (0 for focusable, -1 for programmatic focus)

# Solution 2: Verify semantic HTML elements
# Use <button> for buttons, <a> for links, etc.

# Solution 3: Test with screen reader
# Use NVDA (Windows), VoiceOver (macOS), or browser extensions

# Solution 4: Check focus management in modals/dropdowns
# Ensure focus trapping and restoration works correctly
```

## Testing Issues

### 1. Playwright Test Failures

#### Problem: E2E tests failing

**Symptoms:**

- Tests timeout
- Elements not found
- Screenshot mismatches

**Solutions:**

```bash
# Solution 1: Update Playwright browsers
pnpm test:e2e:install

# Solution 2: Run tests in headed mode for debugging
pnpm test:e2e:headed

# Solution 3: Use debug mode
pnpm test:e2e:debug

# Solution 4: Check test stability
# Run tests multiple times to identify flaky tests
for i in {1..5}; do pnpm test:e2e; done
```

#### Problem: Tests pass locally but fail in CI

**Symptoms:**

- Local tests successful
- CI pipeline failures
- Timing-related issues

**Solutions:**

```bash
# Solution 1: Increase timeouts in CI environment
# In playwright.config.ts:
use: {
  actionTimeout: 30000,  // Increased for CI
}

# Solution 2: Wait for network requests
await page.waitForLoadState('networkidle')

# Solution 3: Use explicit waits
await page.waitForSelector('[data-testid="component"]')

# Solution 4: Check for race conditions
# Ensure proper async/await usage in tests
```

## Security & Performance Issues

### 1. Security Concerns

#### Problem: Dependency vulnerabilities

**Symptoms:**

- Security audit warnings
- CVE notifications
- Outdated package warnings

**Solutions:**

```bash
# Solution 1: Audit dependencies
pnpm audit
pnpm audit --fix  # Auto-fix when possible

# Solution 2: Update dependencies
pnpm update

# Solution 3: Check specific vulnerable packages
pnpm ls [package-name]

# Solution 4: Find alternative packages
# Research secure alternatives for vulnerable packages
```

### 2. Performance Degradation

#### Problem: Application running slowly

**Symptoms:**

- Slow page loads
- High memory usage
- Poor Lighthouse scores

**Solutions:**

```bash
# Solution 1: Profile performance
# Use Chrome DevTools Performance tab
# Look for long tasks and memory leaks

# Solution 2: Check for memory leaks
# Monitor memory usage during navigation
# Look for increasing memory patterns

# Solution 3: Optimize images
# Use next/image component
# Ensure proper image formats (WebP, AVIF)

# Solution 4: Review bundle size
ANALYZE=true pnpm build
# Look for unexpected large dependencies
```

## Git & Version Control Issues

### 1. Commit and Push Problems

#### Problem: Pre-commit hooks failing

**Symptoms:**

- Git commit rejected
- Linting errors prevent commits
- Formatting issues

**Solutions:**

```bash
# Solution 1: Fix linting errors
pnpm lint
# Address all ESLint errors

# Solution 2: Format code
pnpm format

# Solution 3: Type check
pnpm type-check
# Fix all TypeScript errors

# Solution 4: Bypass hooks (emergency only)
git commit --no-verify -m "Emergency commit"
# Note: Fix issues immediately after
```

#### Problem: Merge conflicts

**Symptoms:**

- Git merge failures
- Conflicting changes in same files
- Lock file conflicts

**Solutions:**

```bash
# Solution 1: Resolve package lock conflicts
rm pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml

# Solution 2: Use merge tools
git mergetool

# Solution 3: Manual conflict resolution
# Edit files to resolve conflicts
# Remove conflict markers (<<<<<<< ======= >>>>>>>)

# Solution 4: Start fresh (last resort)
git checkout --theirs package.json  # Take their version
git checkout --ours src/components/  # Keep our version
```

## Environment-Specific Issues

### 1. Windows Development Issues

#### Problem: Path and line ending issues

**Symptoms:**

- File not found errors
- Git shows all files as changed
- Build failures on Unix systems

**Solutions:**

```bash
# Solution 1: Configure Git line endings
git config --global core.autocrlf true

# Solution 2: Use PowerShell or Git Bash
# Avoid Command Prompt for development

# Solution 3: Check file paths
# Use forward slashes in import paths
import Component from '@/components/Component'  # ✅
import Component from '@\components\Component'  # ❌

# Solution 4: WSL consideration
# Consider using Windows Subsystem for Linux for better Unix compatibility
```

### 2. macOS/Linux Specific Issues

#### Problem: File permission issues

**Symptoms:**

- Cannot write to directories
- Build failures due to permissions
- npm/pnpm installation issues

**Solutions:**

```bash
# Solution 1: Fix file permissions
chmod -R 755 src/
chmod -R 644 src/**/*.{ts,tsx,js,jsx}

# Solution 2: Check Node.js installation permissions
# Avoid using sudo with npm/pnpm
# Use Node Version Manager (nvm) instead

# Solution 3: Clear npm cache
npm cache clean --force
# or for pnpm:
pnpm store prune
```

## Getting Additional Help

### 1. Documentation Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Playwright**: https://playwright.dev/docs

### 2. Community Support

- **GitHub Issues**: Create issue in repository
- **Stack Overflow**: Tag with specific technology
- **Discord Communities**: Next.js, Tailwind CSS communities
- **Reddit**: r/nextjs, r/reactjs, r/typescript

### 3. Debug Information Collection

#### When reporting issues, include:

```bash
# System information
node --version
pnpm --version
git --version

# Project information
cat package.json | grep version
pnpm ls --depth=0

# Error logs
# Include full error messages and stack traces
# Screenshots of browser console errors
# Network tab information for API issues
```

---

_Last Updated: August 9, 2025_ _Troubleshooting Team: Development Support_
