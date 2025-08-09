# Testing Playbook

Comprehensive testing procedures and playbooks for Career Topologies v1 development and quality assurance.

## Testing Overview

This playbook provides step-by-step procedures for all testing activities in the project, from development testing to production validation.

## Development Testing Procedures

### 1. Component Development Testing

#### New Component Testing Checklist

```bash
# Step 1: Create component with proper types
# File: src/components/ui/NewComponent.tsx

# Step 2: Add component to Storybook (when available)
# File: src/stories/NewComponent.stories.tsx

# Step 3: Write unit tests (when implemented)
# File: src/components/ui/__tests__/NewComponent.test.tsx

# Step 4: Manual testing procedure
pnpm dev
# Navigate to component usage and test:
# - Renders correctly
# - Props work as expected
# - Styling applied correctly
# - Responsive behavior
# - Accessibility (keyboard navigation)
```

#### Component Testing Standards

```typescript
// Component testing template
interface ComponentTestScenarios {
  // Visual rendering
  rendering: {
    defaultProps: boolean;
    withAllProps: boolean;
    withoutOptionalProps: boolean;
    withChildren: boolean;
  };

  // Interaction testing
  interactions: {
    clickEvents: boolean;
    keyboardNavigation: boolean;
    focusManagement: boolean;
    hoverStates: boolean;
  };

  // Accessibility
  accessibility: {
    screenReaderCompatible: boolean;
    keyboardAccessible: boolean;
    colorContrast: boolean;
    semanticMarkup: boolean;
  };

  // Responsive behavior
  responsive: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
    largeScreen: boolean;
  };
}
```

### 2. Page Development Testing

#### Page Testing Procedure

```bash
# Step 1: Route testing
pnpm dev
# Test all route variations:
# - /en-US/
# - /es-ES/
# - /pt-BR/

# Step 2: Metadata validation
# Check browser tab title, meta description
# Validate Open Graph tags in browser dev tools

# Step 3: Responsive testing
# Test breakpoints: 320px, 768px, 1024px, 1440px+

# Step 4: Performance testing
# Check lighthouse scores in Chrome Dev Tools
# Target: Performance >90, Accessibility >95, SEO >90
```

#### Page Quality Checklist

- [ ] All locales render correctly
- [ ] Metadata is properly set
- [ ] Images load with proper optimization
- [ ] Links work correctly
- [ ] Forms submit properly (when applicable)
- [ ] Loading states display correctly
- [ ] Error states handle gracefully
- [ ] SEO elements are present (h1, meta tags, etc.)

## End-to-End Testing Procedures

### 1. Playwright Test Execution

#### Local Testing Workflow

```bash
# Step 1: Start development server
pnpm dev
# Wait for "Ready on http://localhost:3000"

# Step 2: Install browsers (first time only)
pnpm test:e2e:install

# Step 3: Run all E2E tests
pnpm test:e2e

# Step 4: Run tests with UI (for debugging)
pnpm test:e2e:ui

# Step 5: Run specific test
pnpm test:e2e tests/example.spec.ts
```

#### E2E Test Categories

##### Smoke Tests (Critical Path)

```typescript
// Basic functionality that must always work
const smokeTests = ['Homepage loads successfully', 'Navigation menu works', 'Language switching functions', 'Core components render', 'Footer displays correctly'];
```

##### Regression Tests (Feature Stability)

```typescript
// Tests preventing regression of existing features
const regressionTests = [
  'All pages load without errors',
  'Form validations work correctly',
  'Responsive layout maintains integrity',
  'Theme switching persists correctly',
  'Internationalization displays proper content',
];
```

##### Integration Tests (Component Interaction)

```typescript
// Tests for component integration and workflows
const integrationTests = [
  'Multi-step form completion',
  'Navigation between localized pages',
  'Theme toggle affects all components',
  'Modal open/close workflows',
  'Search functionality (when implemented)',
];
```

### 2. Cross-Browser Testing

#### Browser Testing Matrix

| Browser     | Versions         | Test Scope    | Frequency |
| ----------- | ---------------- | ------------- | --------- |
| **Chrome**  | Latest, Latest-1 | Full suite    | Every PR  |
| **Firefox** | Latest, ESR      | Core features | Weekly    |
| **Safari**  | Latest, Latest-1 | Core features | Weekly    |
| **Edge**    | Latest           | Core features | Bi-weekly |

#### Cross-Browser Testing Procedure

```bash
# Step 1: Configure Playwright for all browsers
# Edit playwright.config.ts to enable all projects

# Step 2: Run cross-browser test suite
pnpm test:e2e --project=chromium
pnpm test:e2e --project=firefox
pnpm test:e2e --project=webkit

# Step 3: Document any browser-specific issues
# Add to test-results/cross-browser-report.md
```

## Performance Testing Procedures

### 1. Lighthouse Audit Workflow

#### Development Performance Testing

```bash
# Step 1: Build production version
pnpm build
pnpm start

# Step 2: Run Lighthouse audit
# Use Chrome DevTools Lighthouse tab
# Or install lighthouse CLI:
npx lighthouse http://localhost:3000 --output html

# Step 3: Analyze results
# Target scores: Performance >90, Accessibility >95, Best Practices >90, SEO >95
```

#### Performance Metrics Checklist

- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Speed Index < 3.0s

### 2. Bundle Size Analysis

#### Bundle Analysis Procedure

```bash
# Step 1: Generate bundle analysis
ANALYZE=true pnpm build

# Step 2: Review bundle composition
# Check for:
# - Unexpected large dependencies
# - Duplicate dependencies
# - Unoptimized imports

# Step 3: Optimize if necessary
# - Use dynamic imports for large components
# - Check for tree-shaking opportunities
# - Optimize image sizes and formats
```

## Accessibility Testing Procedures

### 1. Automated Accessibility Testing

#### axe-core Integration (Future Enhancement)

```bash
# When implemented:
pnpm test:a11y

# Manual testing with browser extensions:
# - axe DevTools (Chrome/Firefox)
# - WAVE Web Accessibility Evaluator
# - Lighthouse Accessibility audit
```

### 2. Manual Accessibility Testing

#### Keyboard Navigation Testing

```
Testing Procedure:
1. Tab through entire page
2. Verify all interactive elements are focusable
3. Check focus indicators are visible
4. Test Escape key closes modals/dropdowns
5. Verify logical tab order

Focus Management Checklist:
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Skip links are present (when needed)
- [ ] Modals trap focus correctly
- [ ] Focus returns to trigger after modal close
```

#### Screen Reader Testing

```
Testing Procedure (with NVDA/JAWS/VoiceOver):
1. Navigate page using screen reader
2. Verify all content is announced
3. Check heading structure (H1 -> H6)
4. Test form labels and instructions
5. Verify ARIA labels are meaningful

Screen Reader Checklist:
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have descriptive text
- [ ] Links describe their purpose
- [ ] Heading hierarchy is logical
```

## Internationalization Testing

### 1. Locale-Specific Testing

#### Multi-Language Testing Procedure

```bash
# Step 1: Test each supported locale
# Navigate to each language variant:
http://localhost:3000/en-US
http://localhost:3000/es-ES
http://localhost:3000/pt-BR

# Step 2: Verify content translation
# Check all UI text is properly translated
# Verify date/number formatting is correct

# Step 3: Test language switching
# Use language switcher component
# Verify URL updates correctly
# Check selected language persists across navigation
```

#### Translation Quality Checklist

- [ ] All UI text is translated
- [ ] No missing translation keys
- [ ] Text fits properly in UI elements
- [ ] Date formats are locale-appropriate
- [ ] Number formats match locale conventions
- [ ] Currency displays correctly (if applicable)

## Regression Testing Procedures

### 1. Pre-Release Testing

#### Release Candidate Testing Checklist

```bash
# Step 1: Full test suite execution
pnpm test:e2e
# All tests must pass

# Step 2: Performance audit
# Lighthouse scores must meet targets

# Step 3: Accessibility audit
# No critical accessibility issues

# Step 4: Cross-browser testing
# Core functionality works in all supported browsers

# Step 5: Mobile testing
# Responsive design works on mobile devices
```

### 2. Hotfix Testing

#### Emergency Fix Testing Procedure

```bash
# Step 1: Targeted regression tests
# Run tests related to fixed functionality

# Step 2: Smoke tests
# Verify core functionality still works

# Step 3: Performance check
# Ensure fix doesn't impact performance

# Step 4: Quick cross-browser check
# Test fix in Chrome, Firefox, Safari
```

## Quality Gates

### Development Quality Gates

- ✅ All TypeScript compilation errors resolved
- ✅ ESLint passes with zero errors
- ✅ Prettier formatting applied
- ✅ Component renders without console errors
- ✅ Basic functionality tested manually

### Pre-Commit Quality Gates

- ✅ Lint-staged passes (via Husky)
- ✅ Type checking passes
- ✅ Unit tests pass (when implemented)
- ✅ No console.log statements in production code

### Pre-Merge Quality Gates

- ✅ All E2E tests pass
- ✅ Performance metrics meet targets
- ✅ Accessibility requirements met
- ✅ Code review approved
- ✅ Documentation updated (if needed)

### Pre-Release Quality Gates

- ✅ Full test suite passes
- ✅ Cross-browser testing complete
- ✅ Performance audit passes
- ✅ Security scan clean
- ✅ Accessibility audit passes

## Test Data Management

### 1. Test Data Strategy

#### Mock Data Guidelines

```typescript
// Test data should be:
const testDataPrinciples = {
  realistic: 'Use realistic data that mimics production',
  consistent: 'Same test data across different test runs',
  isolated: 'Tests should not depend on shared data',
  cleanup: 'Clean up test data after test completion',
};
```

### 2. Environment-Specific Testing

#### Local Development

- Use local test database (when implemented)
- Mock external API calls
- Use development environment variables

#### Staging/CI Environment

- Use dedicated test database
- Mock or use test versions of external services
- Use staging environment variables

## Troubleshooting Guide

### Common Testing Issues

#### Test Environment Issues

```bash
# Issue: Tests fail due to port conflicts
# Solution: Kill processes on port 3000
npx kill-port 3000

# Issue: Playwright browsers not installed
# Solution: Reinstall browsers
pnpm test:e2e:install

# Issue: Tests timeout
# Solution: Increase timeout in playwright.config.ts
```

#### Performance Testing Issues

```bash
# Issue: Lighthouse scores inconsistent
# Solution: Run multiple times and average results
# Ensure consistent system load during testing

# Issue: Bundle size suddenly increased
# Solution: Check recent dependency changes
ANALYZE=true pnpm build
# Review bundle analyzer output
```

## Future Testing Enhancements

### Planned Additions

1. **Unit Testing**: Jest/Vitest integration for component tests
2. **Visual Regression**: Screenshot comparison testing
3. **API Testing**: Integration testing for API routes
4. **Load Testing**: Performance testing under load
5. **Security Testing**: Automated security scanning

### Continuous Improvement

- Quarterly review of test coverage
- Regular update of testing tools and procedures
- Performance baseline monitoring
- Accessibility standard updates

---

_Last Updated: August 9, 2025_ _Testing Team: Development QA_
