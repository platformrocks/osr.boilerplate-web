# Technical Guardrails

## Overview

Technical guardrails are automated and manual constraints that ensure code quality, architectural consistency, and AI-friendly development practices. These guardrails prevent common issues and
maintain project standards.

## Code Quality Guardrails

### TypeScript Strictness

**Rule**: All TypeScript must pass strict mode compilation **Enforcement**: Automated via `tsc --noEmit` **Rationale**: Type safety prevents runtime errors and improves AI understanding

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

### ESLint Rules

**Rule**: All code must pass ESLint validation **Enforcement**: Automated via pre-commit hooks and CI/CD **Rationale**: Consistent code patterns and error prevention

```javascript
// Key rules enforced
- @typescript-eslint/strict
- react-hooks/rules-of-hooks
- next/core-web-vitals
- prettier integration
```

### Import Organization

**Rule**: Imports must follow standardized order and grouping **Enforcement**: Prettier plugin with import sorting **Rationale**: Predictable code structure for AI tools

```typescript
// Required import order:
1. React and Next.js imports
2. Third-party libraries
3. Internal imports (@/ alias)
4. Relative imports
5. Type-only imports
```

## File and Naming Guardrails

### JSDoc Headers

**Rule**: All .ts/.tsx files must include standardized JSDoc headers **Enforcement**: Manual review and automated checking (planned) **Rationale**: Provides context for AI tools and developers

```typescript
/**
 * File: path/to/file.ts
 * Purpose: Brief description of functionality
 * Author: platform.rocks
 * License: MIT
 */
```

### Component Naming

**Rule**: Components must use PascalCase with descriptive names **Enforcement**: ESLint rules and code review **Rationale**: Clear, searchable component identification

- ✅ `CustomButton.tsx`, `UserProfile.tsx`
- ❌ `button.tsx`, `component1.tsx`

### File Organization

**Rule**: Files must be organized by feature/purpose, not type **Enforcement**: Project structure guidelines and code review **Rationale**: Scalable organization, clear boundaries

```
src/
├── components/ui/          # UI components
├── components/forms/       # Form components
├── app/[locale]/          # Pages and layouts
├── lib/                   # Utilities
```

## Component Architecture Guardrails

### Component Interface Standards

**Rule**: All components must have explicit TypeScript interfaces **Enforcement**: TypeScript compilation and code review **Rationale**: Clear contracts for AI understanding and maintainability

```typescript
interface ComponentProps {
  /** Required prop with description */
  title: string;
  /** Optional prop with default */
  variant?: 'primary' | 'secondary';
  /** Children elements */
  children?: React.ReactNode;
}
```

### Props Validation

**Rule**: Components must validate props and provide clear error messages **Enforcement**: TypeScript types and runtime validation where needed **Rationale**: Early error detection and better
debugging experience

```typescript
// TypeScript ensures compile-time validation
// Runtime validation for dynamic data
const validateProps = (props: ComponentProps) => {
  if (!props.title.trim()) {
    throw new Error('Component requires non-empty title');
  }
};
```

### Component Composition

**Rule**: Prefer composition over inheritance and complex prop drilling **Enforcement**: Code review and architectural guidelines **Rationale**: Flexible, testable, AI-friendly component patterns

```typescript
// ✅ Good: Composition pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ Avoid: Complex prop drilling
<Card title="Title" content="Content" hasHeader={true} />
```

## Styling Guardrails

### Tailwind CSS Standards

**Rule**: Use Tailwind utility classes with semantic component variants **Enforcement**: Tailwind CSS purging and class validation **Rationale**: Consistent styling, predictable class usage

```typescript
// ✅ Good: Semantic utilities with CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      }
    }
  }
);

// ❌ Avoid: Arbitrary values and complex inline styles
<button className="bg-[#ff0000] text-[14px] p-[8px]">
```

### Responsive Design

**Rule**: All components must be mobile-first and responsive **Enforcement**: Testing guidelines and responsive breakpoint usage **Rationale**: Consistent user experience across devices

```typescript
// Mobile-first approach required
className = 'text-sm md:text-base lg:text-lg';
```

## Internationalization Guardrails

### Translation Keys

**Rule**: All user-visible text must use translation keys **Enforcement**: Code review and i18n validation **Rationale**: Maintainable internationalization, type safety

```typescript
// ✅ Good: Translation keys
const t = useTranslations('ComponentName');
return <h1>{t('title')}</h1>;

// ❌ Avoid: Hardcoded strings
return <h1>Welcome to our app</h1>;
```

### Locale Structure

**Rule**: Translation files must maintain consistent structure **Enforcement**: JSON schema validation (planned) **Rationale**: Predictable translation organization

```json
{
  "ComponentName": {
    "title": "Title text",
    "actions": {
      "submit": "Submit",
      "cancel": "Cancel"
    }
  }
}
```

## Testing Guardrails

### Test Coverage

**Rule**: All new features must include E2E tests **Enforcement**: Code review and CI/CD pipeline **Rationale**: Quality assurance and regression prevention

```typescript
// Required test structure
test.describe('Feature Name', () => {
  test('should perform expected behavior', async ({ page }) => {
    // Test implementation
  });
});
```

### Test Naming

**Rule**: Tests must use descriptive, action-oriented names **Enforcement**: Code review guidelines **Rationale**: Clear test intent and debugging support

- ✅ `should display error message for invalid input`
- ❌ `test input validation`

### Test Data

**Rule**: Tests must use predictable, maintainable test data **Enforcement**: Testing guidelines and fixtures **Rationale**: Reliable test execution and AI understanding

```typescript
const testData = {
  validUser: { name: 'Test User', email: 'test@example.com' },
  invalidUser: { name: '', email: 'invalid' },
};
```

## AI-Friendly Guardrails

### Semantic Naming

**Rule**: Use descriptive, searchable names that explain purpose **Enforcement**: Code review and naming conventions **Rationale**: AI tools and developers can understand code intent

```typescript
// ✅ Good: Semantic names
const calculateTotalPrice = (items: CartItem[]) => { ... };
const isUserAuthenticated = (user: User) => { ... };

// ❌ Avoid: Generic or cryptic names
const calc = (data: any[]) => { ... };
const check = (x: any) => { ... };
```

### Pattern Consistency

**Rule**: Similar functionality must use consistent patterns **Enforcement**: Architectural review and documentation **Rationale**: Predictable code structure for AI pattern recognition

```typescript
// Consistent API pattern for all data fetchers
export async function fetchUserData(id: string): Promise<User> { ... }
export async function fetchProductData(id: string): Promise<Product> { ... }
```

### Documentation Standards

**Rule**: Complex logic must include explanatory comments **Enforcement**: Code review for complex functions **Rationale**: AI tools and developers need context for understanding

```typescript
/**
 * Calculates compound interest with quarterly compounding
 * Formula: A = P(1 + r/n)^(nt)
 */
function calculateCompoundInterest(principal: number, rate: number, time: number): number {
  const n = 4; // Quarterly compounding
  return principal * Math.pow(1 + rate / n, n * time);
}
```

## Performance Guardrails

### Bundle Size Monitoring

**Rule**: Bundle size increases must be justified and monitored **Enforcement**: Bundle analysis in CI/CD pipeline **Rationale**: Performance optimization and user experience

```bash
# Automated bundle analysis
pnpm analyze

# Alert on significant size increases
if (bundleSize > previousSize * 1.1) {
  throw new Error('Bundle size increased by more than 10%');
}
```

### Core Web Vitals

**Rule**: All pages must meet Core Web Vitals "Good" thresholds **Enforcement**: Performance testing and monitoring **Rationale**: User experience and SEO optimization

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## Security Guardrails

### Input Validation

**Rule**: All user inputs must be validated and sanitized **Enforcement**: Code review and security scanning **Rationale**: Prevention of XSS and injection attacks

```typescript
const validateInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
```

### Environment Variables

**Rule**: Sensitive data must use environment variables, not hardcoded values **Enforcement**: Code review and secret scanning **Rationale**: Security and configuration management

```typescript
// ✅ Good: Environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ Avoid: Hardcoded sensitive data
const apiKey = 'sk-1234567890abcdef'; // Never do this
```

## Automation and Enforcement

### Pre-commit Hooks

```bash
# Automated checks before commit
- TypeScript compilation
- ESLint validation
- Prettier formatting
- Basic test validation
```

### CI/CD Pipeline

```bash
# Continuous integration checks
- Full test suite execution
- Bundle size analysis
- Security dependency scanning
- Performance benchmarking
```

### Code Review Requirements

- At least one reviewer approval
- All automated checks passing
- Architectural consistency validation
- AI-friendly pattern compliance

These guardrails ensure that the OSR Boilerplate Web maintains high quality, consistency, and AI-friendly patterns as it evolves and grows.

Generated: 2025-08-08 Last Updated: 2025-08-08
